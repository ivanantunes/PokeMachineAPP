import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of, timer } from 'rxjs';
import { debounce, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
})
export class RegisterClientComponent implements OnInit {

  public isLoading = false;

  public register = new FormGroup({});

  constructor(private fb: FormBuilder, private http: HttpClient) { }

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

    this.register.valueChanges.pipe(
      debounce(() => timer(500)),
      switchMap((data) => {
        if (data.cla_ZIP_CODE)  {

          return this.http.get<any>(`https://viacep.com.br/ws/${data.cla_ZIP_CODE}/json/`).pipe(
            map((addressData) => {
              this.register.setValue({
                ...this.register.value,
                cla_ADDRESS: addressData.logradouro,
                cla_CITY: addressData.localidade,
                cla_DISTRICTY: addressData.bairro,
                cla_UF: addressData.uf
              })

            })
          );

        }
        return of(data);
      })
    ).subscribe((data) => {

    }, (err) => {
      console.log(typeof err === 'object' ? err.error : err);
    })

  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.register.controls;
  }

  public submit(): void {
    console.log(this.register.value)
  }

}
