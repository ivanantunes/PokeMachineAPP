import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashMachineRoutingModule } from './cash-machine-routing.module';
import { CashMachineComponent } from './cash-machine.component';
import { GlobalModule } from '../global.module';


@NgModule({
  declarations: [
    CashMachineComponent
  ],
  imports: [
    CommonModule,
    CashMachineRoutingModule,
    GlobalModule
  ]
})
export class CashMachineModule { }
