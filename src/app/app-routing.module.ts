import { ManageprovidersComponent } from './manageproviders/manageproviders.component';

import { ManageusersComponent } from './manageusers/manageusers.component';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

  },
  {
  path: 'login',
  component: LoginComponent,
  canActivate:[GuestGuard]
},
{
  path: 'register',
  component: RegisterComponent,
  canActivate:[GuestGuard]
},
{
  path: 'login-register',
  component: RegisterComponent,
  canActivate:[GuestGuard]
},
{
  path: 'register-login',
  component: LoginComponent,
  canActivate:[GuestGuard]
},
{
  path: 'admin-dashboard',
  component: AdminDasboardComponent,
 canActivate:[AuthGuard]
},
{
  path: 'admin-dashboard/manageuser',
  component: ManageusersComponent,
  canActivate:[AuthGuard]
},
{
  path: 'admin-dashboard/managecustomers',
  component:ManageprovidersComponent,
  canActivate:[AuthGuard]
},

{
  path: 'admin-dashboard/manageproduct',
  component: ManageproductsComponent,
  canActivate:[AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
