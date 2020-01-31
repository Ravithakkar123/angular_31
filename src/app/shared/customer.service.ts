import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  readonly url: string = "https://localhost:44330/api";
  constructor(private http: HttpClient) { }
  formData: Customer;
  updCustomer: Customer;
  GetCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url + '/customer');
  }

  GetCustomerById(id: number): Observable<Customer> {
    if (id === 0) {
      return of(this.emptyCustomer());
    }
    return this.http.get<Customer>(this.url + '/customer/' + id)
      .pipe(
         catchError(this.handleError)
      );
  }

  private emptyCustomer(): Customer {
    return {
      customerId: null,
      customerName: '',
      customerNum: null,
      customerEmail: '',
      gender: 'Male',
      ratting: null,
      addresses: []
    };
  }

  postCustomer(formData: Customer): Observable<Customer> {

    return this.http.post<Customer>(this.url + '/customer', formData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        map(() => formData),
        catchError(this.handleError));
  }


  PutCustomer(id: number, c: Customer) {

    return this.http.put<Customer>(this.url + '/customer/' + id, c, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        map(() => Customer),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(console.error());
  }

  DeleteCustomer(id: number): Observable<{}> {
    return this.http.delete(this.url + "/customer/" + id);
  }


}