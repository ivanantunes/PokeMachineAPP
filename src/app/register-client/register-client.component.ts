import { CADFullClient } from './../interfaces/FullClient';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { ModalMaterialService } from 'modal-material';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
})
export class RegisterClientComponent implements OnInit {

  public isLoading = false;

  public register = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private modal: ModalMaterialService,
    private api: ApiService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      // ? Client
      cli_FULL_NAME: new FormControl('', [Validators.required]),
      cli_RG: new FormControl('', [Validators.required]),
      cli_CPF: new FormControl('', [Validators.required]),
      cli_BIRTHDAY: new FormControl('', [Validators.required]),
      // ? Telephone
      clt_TELEPHONE: new FormControl('', [Validators.required]),
      // ? Address
      cla_ZIP_CODE: new FormControl('', [Validators.required]),
      cla_ADDRESS: new FormControl('', [Validators.required]),
      cla_NUMBER: new FormControl('', [Validators.required]),
      cla_CITY: new FormControl('', [Validators.required]),
      cla_DISTRICTY: new FormControl('', [Validators.required]),
      cla_UF: new FormControl('', [Validators.required]),
      // ? Account
      acc_PASSWORD: new FormControl('', [Validators.required]),
      acc_BALANCE: new FormControl('', [Validators.required]),
      acc_TYPE: new FormControl('', [Validators.required]),
      acc_AGE_ID: new FormControl('', [Validators.required])
    });

    this.register.controls['cla_ZIP_CODE'].valueChanges.pipe(
      debounceTime(500),
      switchMap((zipCode) => {
        this.isLoading = true;
        if (zipCode === '') {
          this.controls['cla_ADDRESS'].setValue('');
          this.controls['cla_CITY'].setValue('');
          this.controls['cla_DISTRICTY'].setValue('');
          this.controls['cla_UF'].setValue('');
          return of(1);
        }

        return this.searchAddress(zipCode).pipe(
          catchError((err) => {
            this.toastr.warning('CEP Não Encontrado.', 'Alerta', { progressBar: true });
            return of(1);
          })
        );
      }),
    ).subscribe((address) => {
      this.isLoading = false;

      if (typeof address === 'object') {
        this.controls['cla_ADDRESS'].setValue(address.address);
        this.controls['cla_CITY'].setValue(address.city);
        this.controls['cla_DISTRICTY'].setValue(address.districty);
        this.controls['cla_UF'].setValue(address.uf);
      }

    }, (err) => {
      this.isLoading = false;

      this.toastr.error('Erro Interno.', 'Erro', { progressBar: true });

    });

  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.register.controls;
  }

  private searchAddress(zipCode: string): Observable<any> {
    return this.http.get<any>(`http://viacep.com.br/ws/${zipCode}/json/`).pipe(
      map((addressData) => {

        return {
          address: addressData.logradouro,
          city: addressData.localidade,
          districty: addressData.bairro,
          uf: addressData.uf
        };

      })
    );
  }

  public submit(): void {
    this.isLoading = true;

    const value = this.register.value;

    const cadFullClient: CADFullClient = {
      client: {
        cli_FULL_NAME: value.cli_FULL_NAME,
        cli_CPF: value.cli_CPF,
        cli_RG: value.cli_RG,
        cli_BIRTHDAY: new Date(value.cli_BIRTHDAY).toLocaleDateString()
      },
      clientTelephone: {
        clt_TELEPHONE: value.clt_TELEPHONE
      },
      clientAddress: {
        cla_ADDRESS: value.cla_ADDRESS,
        cla_CITY: value.cla_CITY,
        cla_DISTRICTY: value.cla_DISTRICTY,
        cla_NUMBER: value.cla_NUMBER,
        cla_UF: value.cla_UF,
        cla_ZIP_CODE: value.cla_ZIP_CODE
      },
      account: {
        acc_AGE_ID: value.acc_AGE_ID,
        acc_BALANCE: value.acc_BALANCE,
        acc_PASSWORD: value.acc_PASSWORD,
        acc_TYPE: value.acc_TYPE
      }
    }

    this.api.registerFullClient(cadFullClient).subscribe((res) => {
      this.isLoading = false;

      this.modal.mTSuccess({
        btnCloseTitle: 'Fechar',
        description: `Conta ${res.result} Criada com Sucesso!`,
        disableClose: true,
        height: 'auto',
        title: 'Sucesso',
        width: 'auto'
      });

      this.register.reset();
      this.register.markAsUntouched();

    }, (err) => {
      this.isLoading = false;

      this.modal.mTErrorLog({
        btnCloseTitle: 'Fechar',
        description: 'Falha ao Criar Conta!',
        disableClose: true,
        height: 'auto',
        title: 'Sucesso',
        width: 'auto',
        btnLogTitle: 'Detalhes',
        log: err.error.message
      })

      console.log(err)
    });

  }

}
