// ? Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ? Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// ? Ngx
import { NgxMaskModule } from 'ngx-mask';

// ? Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    // * Angular
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    // * Export Components
    HeaderComponent,
    FooterComponent,

    // * Export Ngx
    NgxMaskModule,

    // * Export Modules
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  imports: [
    // * Angular
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,

    // * Ngx
    NgxMaskModule.forRoot(),

    // * Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})

export class GlobalModule { }
