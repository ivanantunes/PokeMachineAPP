import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  public isLoading = false;

  public register = new FormGroup({});

  constructor(private fb: FormBuilder) { }

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
    console.log(this.register.value)
  }

}
