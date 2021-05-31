import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomerComponent } from './customer/customer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SalesComponent } from './sales/sales.component';
import { AuthGuard } from './_service/AuthGuard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component : LoginComponent, },
  { path:'homepage', component : HomepageComponent,canActivate:[AuthGuard]},
  { path:'customer',component : CustomerComponent,canActivate:[AuthGuard]},
  {path:'sales',component : SalesComponent,canActivate:[AuthGuard]},
  {path:'aboutUs',component : AboutUsComponent,canActivate:[AuthGuard]},
  {path:'contactUs',component : ContactUsComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
