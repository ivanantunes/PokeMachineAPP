import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalMaterialService } from 'modal-material';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public card?: any;
  public session: any;

  public operator = new FormGroup({});
  public formTransfer = new FormGroup({});

  public isCredit = false;
  public isDebit = false;
  public isTransfer = false;
  public isLoading = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private modal: ModalMaterialService
  ) { }

  ngOnInit(): void {

    this.session = this.auth.currentSession;

    this.operator = this.fb.group({
      valueOperator: new FormControl('', [Validators.required]),
    });

    this.formTransfer = this.fb.group({
      account_code: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });

  }

  public logout(): void {
    this.api.logout().subscribe((res) => {

      this.auth.destroyCurrentSession();
      window.location.href = '/cashMachine';

    }, (err) => {
      this.modal.mTErrorLog({
        btnCloseTitle: 'Fechar',
        btnLogTitle: 'Detalhes',
        description: 'Falha ao Efeturar Saída.',
        disableClose: true,
        height: 'auto',
        log: err.error.message,
        title: 'Erro',
        width: 'auto'
      })
    });
  }

  // ? Formmaters
  public formatterCash(value: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formatter.format(value);
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.operator.controls;
  }

  public get controlsTransfer(): { [key: string]: AbstractControl } {
    return this.formTransfer.controls;
  }

  public submit(type: 'credit' | 'debit' | 'transfer'): void {
    this.isLoading = true;
    let message = '';

    (new Observable<any>((obs) => {
      obs.next();
      obs.complete();
    })).pipe(
      switchMap(() => {
        switch(type) {
          case 'credit':
            return this.api.credit(this.operator.value.valueOperator).pipe(
              tap((r) => message = r.message),
              catchError((err) => {
                message = 'Falha ao Efetuar Operação';
                return throwError(err.error.message);
              })
            );
          case 'debit':
            return this.api.debit(this.operator.value.valueOperator).pipe(
              tap((r) => message = r.message),
              catchError((err) => {
                message = 'Falha ao Efetuar Operação';
                return throwError(err.error.message);
              })
            );
          case 'transfer':
            return this.api.transfer(this.formTransfer.value).pipe(
              tap((r) => message = r.message),
              catchError((err) => {
                message = 'Falha ao Efetuar Transferência';
                return throwError(err.error.message);
              })
            );
        }
      }),
      switchMap(() => this.api.accountInfo(this.auth.currentSession.token).pipe(
        tap((val) => {
          this.session = { ...val.result, token: this.auth.currentSession.token }
        }),
        catchError((err) => {
          message = 'Falha ao Pegar Informações Atualizadas da Conta.';
          return throwError(err.error.message);
        })
      ))
    ).subscribe((res) => {
      this.isLoading = false;

      this.operator.reset();
      this.modal.mTSuccess({
        btnCloseTitle: 'Fechar',
        disableClose: true,
        height: 'auto',
        title: 'Sucesso',
        width: 'auto',
        description: message
      })

    }, (err) => {
      this.isLoading = false;

      this.modal.mTErrorLog({
        btnCloseTitle: 'Fechar',
        btnLogTitle: 'Detalhes',
        description: message,
        disableClose: true,
        height: 'auto',
        log: err,
        title: 'Erro',
        width: 'auto'
      })

    });

  }

  public setStatus(type: 'credit' | 'debit' | 'transfer'): void {
    this.isCredit = false;
    this.isDebit = false;
    this.isTransfer = false;

    switch(type) {
      case 'credit':
        this.isCredit = true;
        break;
      case 'debit':
        this.isDebit = true;
        break;
      case 'transfer':
        this.isTransfer = true;
        break;
    }

  }
}
