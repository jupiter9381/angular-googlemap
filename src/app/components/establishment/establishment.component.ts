import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

import { FormControl, Validators } from '@angular/forms';

declare var $:any;


@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})
export class EstablishmentComponent implements OnInit {

  establishments = [];
  constructor(private api: ApiService) { }

  // adding establishment form
  name = new FormControl();
  email = new FormControl();
  contact_name = new FormControl();
  phone = new FormControl();
  vip = new FormControl();
  featured = new FormControl();
  active = new FormControl();
  analytics = new FormControl();
  instagram = new FormControl();
  facebook = new FormControl();
  twitter = new FormControl();
  webpage = new FormControl();
  description = new FormControl();

  // edit form info
  edit_name = new FormControl();
  edit_email = new FormControl();
  edit_establishment_id = new FormControl();
  edit_contact_name = new FormControl();
  edit_phone = new FormControl();
  edit_vip = new FormControl();
  edit_featured = new FormControl();
  edit_active = new FormControl();
  edit_analytics = new FormControl();
  edit_instagram = new FormControl();
  edit_facebook = new FormControl();
  edit_twitter = new FormControl();
  edit_webpage = new FormControl();
  edit_description = new FormControl();

  
  // delete info
  del_id: any;
  del_index:any;

  // select establishment info
  establish_id: any;
  ngOnInit() {
      this.getEstablishments();
      this.name.setValue("jupiter");
      this.email.setValue("jupiter9381@gmail.com");
      this.contact_name.setValue("Anton");
      this.phone.setValue("89841542820");
      this.vip.setValue(true);
      this.featured.setValue(true);
      this.analytics.setValue(true);
      this.active.setValue(true);

      this.edit_vip.setValue(true);
      this.edit_featured.setValue(true);
      this.edit_analytics.setValue(true);
      this.edit_active.setValue(true);
      this.instagram.setValue("instagram.com/luispapas");
      this.facebook.setValue("facebook.com/luispapas");
      this.twitter.setValue("twitter.com/luispapas");
      this.webpage.setValue("luispapas.com");
      this.description.setValue("Description");

      // this.branch_name.setValue( "Luispapas" );
      // this.branch_phone.setValue("4426682688");
      // this.branch_address.setValue("55th street");
      // this.branch_email.setValue("luispapas@gamil.com");
      // this.branch_latitude.setValue("0.02323");
      // this.branch_longitude.setValue("10.2345");
      // this.branch_contact.setValue("luispapas.com");
      // this.branch_active.setValue(true);
      // this.branch_city.setValue("New York");
  }
  ngAfterView(){
    $('#establishment_table').DataTable();
    //Ladda.bind( 'button[type=submit]', { timeout: 2000 } );
  }
  getEstablishments(){
    return this.api.getEstablishments().subscribe(
      data => this.handleResponse(data, "getAll"),
      error => this.handleError(error)
    );
  }

  // Add Establishement
  onSubmit(){
    let data = {
      data: {
        name: this.name.value,
        description: this.description.value,
        phone: this.phone.value,
        active: this.active.value == true? 1: 0,
        category_id: this.featured.value == true? 1: 0,
        instagram_link: this.instagram.value,
        facebook_link: this.facebook.value,
        twitter_link: this.twitter.value,
        webpage_linke: this.webpage.value,
        is_vip: this.vip.value == true? 1 : 0,
        is_analytics: this.analytics.value == true? 1 : 0,
        email: this.email.value,
        contact_name: this.contact_name.value,
      }
    }
    
    return this.api.addEstablishment(data).subscribe(
      data => this.handleResponse(data, "add"),
      error => this.handleError(error)
    );
  }

  setEstablishmentId(id:any, index:number){
    this.del_id = id;
    this.del_index = index;
  }
  setBranch(id: any){
    this.establish_id = id;
  }
  getEstablishment(id:any){
    this.edit_establishment_id = id;
    var data = {
      data: {
        establishment_id: this.edit_establishment_id
      }
    };
    return this.api.getEstablishment(data).subscribe(
      data => this.handleResponse(data, "get"),
      error => this.handleError(error)
    );
  }
  onDeleteReview(){
    var data = {
      data: {
        establishment_id: this.del_id
      }
    }
    $("#delete-modal").modal("hide");
    this.establishments.splice(this.del_index, 1);
    return this.api.deleteEstablishment(data).subscribe(
      data => this.handleResponse(data, "delete"),
      error => this.handleError(error)
    );
  }

  onUpdateSubmit(){
    let data = {
      data: {
        name: this.edit_name.value,
        description: this.edit_description.value,
        phone: this.edit_phone.value,
        active: this.edit_active.value == true ? 1: 0,
        category_id: this.edit_featured.value == true ? 1: 0,
        instagram_link: this.edit_instagram.value,
        facebook_link: this.edit_facebook.value,
        twitter_link: this.edit_twitter.value,
        webpage_link: this.edit_webpage.value,
        is_vip: this.edit_vip.value == true ? 1: 0,
        is_analytics: this.edit_analytics.value == true ? 1: 0,
        email: this.edit_email.value,
        contact_name: this.edit_contact_name.value,
        establishment_id: this.edit_establishment_id,
      }
    }
    
    return this.api.updateEstablishment(data).subscribe(
      data => this.handleResponse(data, "update"),
      error => this.handleError(error)
    );
  }

  
  handleResponse(data:any, type:string){
    switch(type) {
      case "getAll":
        this.establishments = data.result;
        break;
      case "add":
        $("#addModal").modal("hide");
        this.establishments.push(data);
        break;
      case "delete":
        break;
      case "get":
        let item = data[0];
        this.edit_name.setValue(item['name']);
        this.edit_email.setValue(item['email']);
        this.edit_contact_name.setValue(item['contact']);
        this.edit_phone.setValue(item['phone']);
        this.edit_vip.setValue(item['is_vip']);
        this.edit_featured.setValue(item['category_id']);
        this.edit_active.setValue(item['active']);
        this.edit_analytics.setValue(item['is_analytics']);
        this.edit_instagram.setValue(item['instagram_link']);
        this.edit_facebook.setValue(item['facebook_link']);
        this.edit_twitter.setValue(item['twitter_link']);
        this.edit_webpage.setValue(item['webpage']);
        this.edit_description.setValue(item['description']);
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
