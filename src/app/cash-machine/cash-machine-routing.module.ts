import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashMachineComponent } from './cash-machine.component';

const routes: Routes = [{ path: '', component: CashMachineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashMachineRoutingModule { }
