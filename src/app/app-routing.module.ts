import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashMachineComponent } from './cash-machine/cash-machine.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { PokebolaActionsComponent } from './pokebola-actions/pokebola-actions.component';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { RegisterClientComponent } from './register-client/register-client.component';

const routes: Routes = [

  // ? Home
  {
    path: '',
    component: PokebolaActionsComponent,
    canActivate: [AuthGuard]
  },

  // ? Register - Client
  {
    path: 'register/client',
    component: RegisterClientComponent,
    canActivate: [AuthGuard]
  },

  // ? Register - Account
  {
    path: 'register/account',
    component: RegisterAccountComponent,
    canActivate: [AuthGuard]
  },


  // ? Login
  {
    path: 'login/:id',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },

  // ? CashMachine

  {
    path: 'cashMachine',
    component: CashMachineComponent,
    canActivate: [AuthGuard]
  },

  // ? Dashboard
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },

  // ? Redirect
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
