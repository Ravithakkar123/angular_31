import { Address } from './address.model';

export class Customer {
    
    customerId : number
    customerName : string;
    customerNum : number;
    customerEmail : string;
    gender : string;
    ratting : number;
    addresses : Array<Address>;
    }