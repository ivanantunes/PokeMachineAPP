import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokebolaActionsComponent } from './pokebola-actions.component';

const routes: Routes = [{ path: '', component: PokebolaActionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokebolaActionsRoutingModule { }
