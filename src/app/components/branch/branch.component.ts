import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';



import { ApiService } from '../../service/api.service';

declare var $:any;
declare const google:any;

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  line1:string;
  line2:string;
  postal_code:string;
  country:string;
  city:string;

  public lat: number;
  public lng: number;
  public zoom: number;

  public edit_lat: number;
  public edit_lng: number;
  
  @ViewChild('search') public searchElementRef: ElementRef;
  addressArray: google.maps.GeocoderAddressComponent[];

  // branch form info
  branch_name = new FormControl();
  branch_phone = new FormControl();
  branch_address = new FormControl();
  branch_email = new FormControl();
  branch_latitude = new FormControl();
  branch_longitude = new FormControl();
  branch_city = new FormControl();
  branch_active = new FormControl();
  branch_contact = new FormControl();
  establishment_id: any;

  // edit branch form info
  edit_branch_name = new FormControl();
  edit_branch_phone = new FormControl();
  edit_branch_address = new FormControl();
  edit_branch_email = new FormControl();
  edit_branch_latitude = new FormControl();
  edit_branch_longitude = new FormControl();
  edit_branch_city = new FormControl();
  edit_branch_active = new FormControl();
  edit_branch_contact = new FormControl();
  edit_branch_id: any;
  branches = [];

  del_id: any;
  del_index: any;

  edit_id:any;
  edit_index:any;

  private geoCoder;

  constructor(private api: ApiService, private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.zoom = 10;
    this.lat = 47.1625;
    this.lng = 19.5033;

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    this.establishment_id= this.route.snapshot.params.id;

    this.branch_name.setValue( "Luispapas" );
    this.branch_phone.setValue("4426682688");
    this.branch_address.setValue("55th street");
    this.branch_email.setValue("luispapas@gamil.com");
    this.branch_latitude.setValue("47.1625");
    this.branch_longitude.setValue("19.5033");
    this.branch_contact.setValue("luispapas.com");
    this.branch_active.setValue(true);
    this.branch_city.setValue("New York");


    this.getBranches();
  }

  retriveAddressComponents(type: any) {
    let res =  this.addressArray.find(address_components => address_components.types[0] === type);
    
    switch(type) {
      case "postal_code":
        this.postal_code = res.long_name;
        break;
      case "country":
        this.country = res.long_name;
        break;
      case "locality":
        this.city = res.long_name;
      default:
        // code block
    }
  }
  
  getBranches(){
    let data = {
      data: {
        establishment_id: this.establishment_id,
      }
    }
    return this.api.getBranches(data).subscribe(
      data => this.handleResponse(data, "getAll"),
      error => this.handleError(error)
    );
  }
  onBranchSubmit(){
    let data = {
      data: {
        name: this.branch_name.value,
        phone: this.branch_phone.value,
        address: this.branch_address.value,
        active: this.branch_active.value == true ? 1: 0,
        email: this.branch_email.value,
        latitude: this.branch_latitude.value,
        longitude: this.branch_longitude.value,
        city: this.branch_city.value,
        contact_name: this.branch_contact.value,
        establishment_id: this.establishment_id,
      }
    }
    return this.api.addBranch(data).subscribe(
      data => this.handleResponse(data, "add_branch"),
      error => this.handleError(error)
    );
  }

  setBranchToDel(branch_id:any, index:any){
    this.del_id = branch_id;
    this.del_index = index;
  }
  onDeleteBranch(){
    let data = {
      data: {
        establishment_id: this.establishment_id,
        branch_id: this.del_id
      }
    }
    $("#delete-modal").modal("hide");
    this.branches.splice(this.del_index, 1);
    return this.api.deleteBranch(data).subscribe(
      data => this.handleResponse(data, "delete"),
      error => this.handleError(error)
    );
  }
  
  getBranch(branch_id:any, index:any){
    this.edit_id = branch_id;
    this.edit_index = index;

    let data = {
      data: {
        establishment_id: this.establishment_id,
        branch_id: branch_id
      }
    }
    return this.api.getBranch(data).subscribe(
      data => this.handleResponse(data, "get"),
      error => this.handleError(error)
    );
  }

  onUpdateBranchSubmit(){
    let data = {
      data: {
        name: this.edit_branch_name.value,
        phone: this.edit_branch_phone.value,
        address: this.edit_branch_address.value,
        active: this.edit_branch_active.value == true ? 1: 0,
        email: this.edit_branch_email.value,
        latitude: this.edit_branch_latitude.value,
        longitude: this.edit_branch_longitude.value,
        city: this.edit_branch_city.value,
        contact_name: this.edit_branch_contact.value,
        establishment_id: this.establishment_id,
        branch_id: this.edit_id
      }
    }
    return this.api.updateBranch(data).subscribe(
      data => this.handleResponse(data, "update_branch"),
      error => this.handleError(error)
    );
  }
  handleResponse(data:any, type:string){
    switch(type) {
      case "getAll":
        this.branches = data.result;
        break;
      case 'add_branch':
        $("#addBranchModal").modal("hide");
        this.branches.push(data);
        break;
      case "get":
        this.edit_branch_name.setValue(data[0]['name']);
        this.edit_branch_phone.setValue(data[0]['phone']);
        this.edit_branch_address.setValue(data[0]['address']);
        this.edit_branch_email.setValue(data[0]['email']);
        this.edit_branch_latitude.setValue(data[0]['latitude']);
        this.edit_branch_longitude.setValue(data[0]['longitude']);
        this.edit_branch_city.setValue(data[0]['city']);
        this.edit_branch_active.setValue(data[0]['active']);
        this.edit_branch_contact.setValue(data[0]['contact_name']);
        this.edit_lat = this.edit_branch_latitude.value;
        this.edit_lng = this.edit_branch_longitude.value;
        break;
      case "update_branch":
        $("#editBranchModal").modal("hide");
        this.branches[this.edit_index]['name'] = this.edit_branch_name.value;  
        this.branches[this.edit_index]['phone'] = this.edit_branch_phone.value;    
        this.branches[this.edit_index]['address'] = this.edit_branch_address.value;    
        this.branches[this.edit_index]['latitude'] = this.edit_branch_latitude.value;    
        this.branches[this.edit_index]['longitude'] = this.edit_branch_longitude.value;    
        this.branches[this.edit_index]['city'] = this.edit_branch_city.value;    
        this.branches[this.edit_index]['active'] = this.edit_branch_active.value;    
        this.branches[this.edit_index]['contact_name'] = this.edit_branch_contact.value; 
        this.branches[this.edit_index]['id'] = this.edit_id;  
      //this.ngOnInit();
        break;
      default:
    }
  }

  handleError(error: any){

  }


  changeLocation(event:any, type:any){
    if(type == "add"){
      this.branch_latitude.setValue(event.coords.lat);
      this.branch_longitude.setValue(event.coords.lng);
    } else {
      this.edit_branch_latitude.setValue(event.coords.lat);
      this.edit_branch_longitude.setValue(event.coords.lng);
    }
    
    this.getAddress(event.coords.lat, event.coords.lng, type);
  }

  getAddress(latitude, longitude, type) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          if(type == "add"){
            this.branch_address.setValue( results[0].formatted_address );
          } else {
            this.edit_branch_address.setValue( results[0].formatted_address );
          }
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
