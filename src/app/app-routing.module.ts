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
