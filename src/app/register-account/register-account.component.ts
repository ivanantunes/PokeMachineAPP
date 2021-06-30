import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalMaterialService } from 'modal-material';
import { CADAccount } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  public isLoading = false;

  public register = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modal: ModalMaterialService,
    private api: ApiService) { }

  ngOnInit(): void {

    this.register = this.fb.group({
      // ? Client
      cli_RG: new FormControl('', [Validators.required]),
      cli_CPF: new FormControl('', [Validators.required]),
      // ? Account
      acc_PASSWORD: new FormControl('', [Validators.required]),
      acc_BALANCE: new FormControl('', [Validators.required]),
      acc_TYPE: new FormControl('', [Validators.required]),
      acc_AGE_ID: new FormControl('', [Validators.required])
    });

  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.register.controls;
  }

  public submit(): void {

    this.isLoading = true;

    const value = this.register.value;

    const cad: CADAccount = {
      client: {
        cli_RG: value.cli_RG,
        cli_CPF: value.cli_CPF
      },
      account: {
        acc_AGE_ID: value.acc_AGE_ID,
        acc_BALANCE: value.acc_BALANCE,
        acc_PASSWORD: value.acc_PASSWORD,
        acc_TYPE: value.acc_TYPE
      }
    };

    this.api.registerAccount(cad).subscribe((res) => {
      this.isLoading = false;

      this.modal.mTSuccess({
        btnCloseTitle: 'Fechar',
        description: 'Conta Criada com Sucesso!',
        disableClose: true,
        height: 'auto',
        title: 'Sucesso',
        width: 'auto'
      });

      setInterval(() => {
        window.location.href = '/';
      }, 1500);

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

    console.log(this.register.value)
  }

}
