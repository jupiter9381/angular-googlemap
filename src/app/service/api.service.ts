import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class ApiService {

    private baseURL = 'https://us-central1-napifydev.cloudfunctions.net/';

	constructor(
		private http: HttpClient
	) { }

	signin(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}login`, data, httpOptions);
	}

	getEstablishments(){
		const httpOptions = {
			// headers: new HttpHeaders({
			// 	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
			// })
		}
		return this.http.get(`${this.baseURL}establishments`, httpOptions);
	}
	
	addEstablishment(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}saveEstablishment`, data, httpOptions);
	}

	deleteEstablishment(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}deleteEstablishment`, data, httpOptions);
	}
	updateEstablishment(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}updateEstablishment`, data, httpOptions);
	}
	getEstablishment(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}getEstablishment`, data, httpOptions);
	}
	
	addBranch(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}saveBranch`, data, httpOptions);
	}

	getBranches(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}branches`, data, httpOptions);
	}

	deleteBranch(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}deleteBranch`, data, httpOptions);
	}
	getBranch(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}getBranch`, data, httpOptions);
	}

	updateBranch(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}updateBranch`, data, httpOptions);
	}

	addZone(data:any){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this.http.post(`${this.baseURL}saveZone`, data, httpOptions);
	}
}
