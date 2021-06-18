import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokebolaActionsRoutingModule } from './pokebola-actions-routing.module';
import { PokebolaActionsComponent } from './pokebola-actions.component';
import { GlobalModule } from '../global.module';


@NgModule({
  declarations: [
    PokebolaActionsComponent
  ],
  imports: [
    CommonModule,
    PokebolaActionsRoutingModule,
    GlobalModule
  ]
})
export class PokebolaActionsModule { }
