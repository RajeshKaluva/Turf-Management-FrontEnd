import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BookingComponent } from './booking/booking.component';
import { SportsComponent } from './sports/sports.component';
import { LoginComponent } from './login/login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationComponent } from './registration/registration.component';
import { CartComponent } from './cart/cart.component';
import { AuthServiceService } from './auth-service.service';
import { userInfo } from 'os';
import { UserAuthService } from './user-auth.service';
import { UsersComponent } from './users/users.component';
import { AdminAuthService } from './admin-auth.service';

const routes: Routes = [
  
  { path: 'sports', component: SportsComponent,canActivate:[AuthServiceService,UserAuthService] },
  { path: 'booking', component: BookingComponent,canActivate:[AuthServiceService,UserAuthService] },
  {path:'home',component:HomeComponent,canActivate:[AuthServiceService,UserAuthService]},
  {path:'contact-us',component:ContactUsComponent,canActivate:[AuthServiceService,UserAuthService]},
  {path:'about',component:AboutComponent,canActivate:[AuthServiceService,UserAuthService]},
  {path:'admin',component:AdminComponent,canActivate:[AuthServiceService]},
  { path: '', component: LoginComponent},
  { path:'registration',component:RegistrationComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthServiceService,UserAuthService]},
  {path:'user',component:UsersComponent,canActivate:[AuthServiceService,AdminAuthService]}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
