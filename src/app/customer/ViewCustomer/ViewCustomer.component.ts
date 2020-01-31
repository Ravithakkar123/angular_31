import { Component, OnInit, ɵConsole } from '@angular/core';
import { RecursiveAstVisitor } from '@angular/compiler/src/output/output_ast';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { NgStyle } from '@angular/common';
import {  NavigationExtras  ,Router, ActivatedRoute} from '@angular/router';
@Component({
  templateUrl: './viewcustomer.component.html',
  styles: []
})
export class ViewCustomerComponent {

  pageTitle: string = 'Customer List';

  customer: Customer[] = [];
  id: number;
  constructor(private customerService: CustomerService, private router : ActivatedRoute , private route : Router) {
    let x = this.customer.length;
  }

  ngOnInit(): void {
  this.GetCustomer();
  }

  GetCustomer() {
    this.customerService.GetCustomer()
      .subscribe(data => {
      this.customer = data
      });
  }

  Delete(id:number) {
   var ans = confirm("Are you sure want to delete   " + id);
     if (ans) {
       this.customerService.DeleteCustomer(id).subscribe(
        res => {
          this.GetCustomer();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
