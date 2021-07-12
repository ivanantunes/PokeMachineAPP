import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalMaterialService } from 'modal-material';
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

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private modal: ModalMaterialService
  ) { }

  ngOnInit(): void {
    this.session = this.auth.currentSession;
  }

  public logout(): void {
    this.api.logout().subscribe((res) => {

      this.auth.destroyCurrentSession();
      window.location.href = '/cashMachine';

    }, (err) => {
      this.modal.mTErrorLog({
        btnCloseTitle: 'Fechar',
        btnLogTitle: 'Detalhes',
        description: 'Falha ao Efeturar Sair.',
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

}
