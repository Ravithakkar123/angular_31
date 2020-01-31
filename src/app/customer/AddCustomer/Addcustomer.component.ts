import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { NgForm, ValidatorFn, AbstractControl, FormArray, Form } from '@angular/forms';
import { Customer } from 'src/app/shared/customer.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}
@Component({
  templateUrl: './Addcustomer.component.html'
})

export class AddCustomerComponent implements OnInit {
  pageTitle: string = 'Add customer';
  customerForm: FormGroup;
  addtype: number
  condition = false;
  customershow: Customer;
  isButtonVisible = true;
  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  constructor(private customerservice: CustomerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let cid = +this.route.snapshot.paramMap.get('id');
    this.customerById(cid);
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      customerNum: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      customerEmail: ['', [Validators.required, Validators.email]],
      gender: '',
      ratting: [null, [ratingRange(1, 5),Validators.required]],
      addresses: this.fb.array([] , Validators.required)
    });
  }

  resetAddress(i: number) {
    this.addresses.removeAt(i);
  }

  customerById(id: number) {
    this.customerservice.GetCustomerById(id).subscribe({
      next: (cust1: Customer) => this.showCustomer(cust1)
    });
  }

  showCustomer(cust1: Customer) {
    this.customershow = cust1;
    if (this.customershow.customerId === 0) {
      this.pageTitle = "Add New Customer";
    }
    else {
      if (this.customershow.customerId != null) {
        this.customerForm.patchValue({

          customerName: this.customershow.customerName,
          customerNum: this.customershow.customerNum,
          customerEmail: this.customershow.customerEmail,
          gender: this.customershow.gender,
          ratting: this.customershow.ratting
        });
        this.condition = true;
        this.isButtonVisible = false;
        this.customershow.addresses.forEach(add => {
          (this.customerForm.controls.addresses as FormArray).push(
            this.fb.group({
              addressId:add.addressId,
              addressType: add.addressType,
              street1: add.street1,
              street2: add.street2,
              city: add.city,
              district: add.district,
              pinCode: add.pinCode
            })
          )
        });
      }
    }
  }

  onclick() {
    const c = { ...this.customershow, ...this.customerForm.value };
    if (this.customershow.customerId == null) {
      this.customerservice.postCustomer(this.customerForm.value).subscribe(result => {
        this.router.navigate(['/viewcustomer']);
      } , errorResponse => {});
       
    }
    else {
       let id = +this.route.snapshot.paramMap.get('id');
      this.customerservice.PutCustomer(id, c)
        .subscribe( result => {
          this.router.navigate(['/viewcustomer']);        
        }, errorResponse =>   {});
  }}


  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }


  buildAddress(): FormGroup {
    return this.fb.group({
      addressId : [0],
      addressType: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      street2: [''],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pinCode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]+')]]
    });
  }
}
