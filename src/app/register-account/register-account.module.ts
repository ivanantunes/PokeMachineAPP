import { GlobalModule } from './../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAccountRoutingModule } from './register-account-routing.module';
import { RegisterAccountComponent } from './register-account.component';


@NgModule({
  declarations: [
    RegisterAccountComponent
  ],
  imports: [
    CommonModule,
    RegisterAccountRoutingModule,
    GlobalModule
  ]
})
export class RegisterAccountModule { }
