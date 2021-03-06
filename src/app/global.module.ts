import { CashMachineComponent } from './cash-machine/cash-machine.component';
import { LoginComponent } from './login/login.component';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { PokebolaActionsComponent } from './pokebola-actions/pokebola-actions.component';
// ? Angular
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ? Services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';


// ? Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// ? Ngx
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

// ? My Lib
import { ModalMaterialModule } from 'modal-material';

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { RegisterClientComponent } from './register-client/register-client.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HeaderComponent,
    FooterComponent,
    PokebolaActionsComponent,
    RegisterClientComponent,
    RegisterAccountComponent,
    LoginComponent,
    CashMachineComponent
  ],
  exports: [
    // * Angular
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    // * Export Components
    HeaderComponent,
    FooterComponent,
    PokebolaActionsComponent,
    RegisterClientComponent,
    RegisterAccountComponent,
    LoginComponent,
    CashMachineComponent,

    // * Export Ngx
    NgxMaskModule,
    ToastrModule,

    // * My Lib
    ModalMaterialModule,

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
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule
  ],
  imports: [
    // * Angular
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,

    // * Ngx
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),


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
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule
  ],
  providers: [
    ApiService,
    AuthService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})

export class GlobalModule { }
