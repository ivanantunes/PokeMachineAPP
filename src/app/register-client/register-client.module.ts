import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterClientRoutingModule } from './register-client-routing.module';
import { RegisterClientComponent } from './register-client.component';
import { GlobalModule } from '../global.module';


@NgModule({
  declarations: [
    RegisterClientComponent
  ],
  imports: [
    CommonModule,
    RegisterClientRoutingModule,
    GlobalModule
  ]
})
export class RegisterClientModule { }
