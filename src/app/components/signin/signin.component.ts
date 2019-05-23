import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  name = new FormControl();
  password = new FormControl();

  errorMessage;
  ngOnInit() {
  }

  onSubmit(){
    let data = {
      data: {
        username: this.name.value,
        password: this.password.value,
      }
    }
    return this.api.signin(data).subscribe(
      data => this.handleResponse(data, "login"),
      error => this.handleError(error)
    );
  }
  handleResponse(data:any, type:string){
    if(typeof data.result == 'string'){
      this.errorMessage = data.result;
    } else {
      localStorage.setItem("token", data.result.password);
      localStorage.setItem("username", data.result.username);
      this.router.navigate(['establishments']);
    }
    
  }
  handleError(error: any){

  }
}
