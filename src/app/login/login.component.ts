import { switchMap } from 'rxjs/operators';
import { ModalMaterialService } from 'modal-material';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading = false;

  public login = new FormGroup({});

  private cashID: number | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private api: ApiService,
    private modal: ModalMaterialService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {

      this.cashID = Number(params.get('id'));

    })

    this.login = this.fb.group({
      // ? Account
      acc_CODE: new FormControl('', [Validators.required]),
      acc_PASSWORD: new FormControl('', [Validators.required]),
    });

  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }

  public submit(): void {
    this.isLoading = true;

    const object = {
      acc_CODE: this.login.value.acc_CODE,
      acc_PASSWORD: this.login.value.acc_PASSWORD,
      csm_ID: this.cashID,
      token: uuid.v4()
    }

    this.authService.login(object).pipe(
      switchMap(() => this.api.accountInfo(object.token))
    ).subscribe((res) => {
      this.isLoading = false;

      this.authService.startSession({...res.result, token: object.token});

      this.router.navigate(['/dashboard']);
    }, (err) => {
      this.isLoading = false;
      this.modal.mTErrorLog({
        btnCloseTitle: 'Fechar',
        description: 'Falha ao Efeturar Login.',
        disableClose: true,
        title: 'Erro',
        height: 'auto',
        width: 'auto',
        btnLogTitle: 'Detalhes',
        log: err.error.message
      })
    })

  }

}
