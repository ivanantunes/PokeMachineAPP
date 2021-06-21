import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading = false;

  public login = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

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
    console.log(this.login.value);
  }

}
