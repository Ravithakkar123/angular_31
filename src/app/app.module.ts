import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewCustomerComponent } from './customer/ViewCustomer/ViewCustomer.component';
import { AddCustomerComponent } from './customer/AddCustomer/Addcustomer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { MenuComponent } from './menu/menu.component';
import { IndianmenuComponent } from './menu/indianmenu/indianmenu.component';
import { ChineseComponent } from './menu/chinese/chinese.component';
import { StarterComponent } from './menu/starter/starter.component';
import { RiceComponent } from './menu/indianmenu/rice/rice.component';
import { DalComponent } from './menu/indianmenu/dal/dal.component';
import { RotiComponent } from './menu/indianmenu/roti/roti.component';
import { NoodlesComponent } from './menu/chinese/noodles/noodles.component';
import { ManchoorianComponent } from './menu/chinese/manchoorian/manchoorian.component';
import { ChinesebhelComponent } from './menu/chinese/chinesebhel/chinesebhel.component';
import { SpringroalComponent } from './menu/starter/springroal/springroal.component';
import { CheeseballComponent } from './menu/starter/cheeseball/cheeseball.component';
import { BreadkachoriComponent } from './menu/starter/breadkachori/breadkachori.component';
import { OrderComponent } from './order/order.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,

    ViewCustomerComponent,
    AddCustomerComponent,
    WelcomeComponent,
    CustomerDetailComponent,

    MenuComponent,
    IndianmenuComponent,
    ChineseComponent,
    StarterComponent,
    RiceComponent,
    DalComponent,
    RotiComponent,
    NoodlesComponent,
    ManchoorianComponent,
    ChinesebhelComponent,
    SpringroalComponent,
    CheeseballComponent,
    BreadkachoriComponent,
    OrderComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: 'addcustomer', component: AddCustomerComponent },
      { path: 'viewcustomer/:id',  component: ViewCustomerComponent },
      { path: 'viewcustomer', component: ViewCustomerComponent },
      { path: 'viewcustomer/:id/edit', component: AddCustomerComponent },
      { path: 'order', component: OrderComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  entryComponents: [NoodlesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
