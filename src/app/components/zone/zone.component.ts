import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

import { FormControl, Validators } from '@angular/forms';

declare const google: any;
declare var $:any;

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  
  name = new FormControl();
  points = new FormControl();
  active = new FormControl();

  locations = [];

  constructor(private api: ApiService) { }
  ngOnInit(){
    this.active.setValue(true);
    //throw new Error("Method not implemented.");
  }

  center: any = {
    lat: 33.5362475,
    lng: -111.9267386
  };

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        var vertices = event.overlay.getPath();
        
        for(let i = 0; i < vertices.length; i++){
          let item = {lat: vertices.getAt(i).lat(), lng: vertices.getAt(i).lng()};
          this.locations.push(item);
        }
        let checkInvolved = this.pointInPolygon(vertices, {lat: 33.5362475, lng: -111.9267386});
      }
    });

  }

  pointInPolygon(polygonPath, coordinates) {
    let numberOfVertexs = polygonPath.length - 1;
    let inPoly = false;
    let { lat, lng } = coordinates;

    let x = lat, y = lng;

    let inside = false;
    for (var i = 0, j = polygonPath.length - 1; i < polygonPath.length; j = i++) {
        let xi = polygonPath.getAt(i).lat(), yi = polygonPath.getAt(i).lng();
        let xj = polygonPath.getAt(j).lat(), yj = polygonPath.getAt(j).lng();

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
  } 


  onSubmit(){
    let data = {
      data: {
        name: this.name.value,
        points: this.points.value,
        active: this.active.value == true? 1: 0,
        location: this.locations
      }
    }

    return this.api.addZone(data).subscribe(
      data => this.handleResponse(data, "add"),
      error => this.handleError(error)
    );
  }

  handleResponse(data:any, type:string){
    switch(type) {
      case "getAll":
        break;
      case "add":
        $("#addModal").modal("hide");
        break;
      case "delete":
        break;
      case "update":
        $("#editModal").modal("hide");
        this.ngOnInit();
        break;
      default:
        // code block
    }
    
  }

  handleError(error: any){

  }
}
