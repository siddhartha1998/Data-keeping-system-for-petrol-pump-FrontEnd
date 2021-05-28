import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomerComponent } from './customer/customer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component : LoginComponent},
  { path:'homepage', component : HomepageComponent},
  { path:'customer',component : CustomerComponent},
  {path:'sales',component : SalesComponent},
  {path:'aboutUs',component : AboutUsComponent},
  {path:'contactUs',component : ContactUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
