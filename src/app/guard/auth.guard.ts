import { CommonModule } from '@angular/common';
import { PokebolaActionsComponent } from './../pokebola-actions/pokebola-actions.component';
import { CashMachineComponent } from './../cash-machine/cash-machine.component';
import { RegisterAccountComponent } from './../register-account/register-account.component';
import { RegisterClientComponent } from './../register-client/register-client.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (
        !this.authService.isAuthenticated &&
        route.component !== LoginComponent &&
        route.component !== RegisterClientComponent &&
        route.component !== RegisterAccountComponent &&
        route.component !== CashMachineComponent &&
        route.component !== PokebolaActionsComponent
      ) {

        console.log('Usuário Não Autenticado');

        this.router.navigate(['/cashMachine']);

        return false;

      } else if (
        this.authService.isAuthenticated &&
        (
          route.component === LoginComponent ||
          route.component === RegisterClientComponent ||
          route.component === RegisterAccountComponent ||
          route.component === CashMachineComponent ||
          route.component === PokebolaActionsComponent
        )
      ) {
        console.log('Usuário Já Está Autenticado.');

        this.router.navigate(['/dashboard']);

        return false;
      }

      return true;
  }

}
