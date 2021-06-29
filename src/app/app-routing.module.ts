import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // ? Home
  {
    path: '',
    loadChildren: () => import('./pokebola-actions/pokebola-actions.module').then(m => m.PokebolaActionsModule)
  },

  // ? Register - Client
  {
    path: 'register/client',
    loadChildren: () => import('./register-client/register-client.module').then(m => m.RegisterClientModule)
  },

  // ? Register - Account
  {
    path: 'register/account',
    loadChildren: () => import('./register-account/register-account.module').then(m => m.RegisterAccountModule)
  },


  // ? Login
  {
    path: 'login/:id',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },

  // ? CashMachine

  {
    path: 'cashMachine',
    loadChildren: () => import('./cash-machine/cash-machine.module').then(m => m.CashMachineModule)
  },

  // ? Dashboard
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
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
