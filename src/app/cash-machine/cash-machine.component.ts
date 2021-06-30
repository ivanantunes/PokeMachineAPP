import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ModalMaterialService } from 'modal-material';

@Component({
  selector: 'app-cash-machine',
  templateUrl: './cash-machine.component.html',
  styleUrls: ['./cash-machine.component.scss']
})
export class CashMachineComponent implements OnInit {

  public isLoading = true;

  public currentDateTime = new Date().toLocaleString();

  public arrCashMachine: any[] = [];

  constructor(private api: ApiService, private modal: ModalMaterialService) { }

  ngOnInit(): void {

    this.api.cashMachine().subscribe((res) => {
      this.arrCashMachine = res;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;

      this.modal.mTError({
        btnCloseTitle: 'Fechar',
        description: 'Falha ao Buscar Caixa Eletrônicos.',
        disableClose: true,
        height: 'auto',
        title: 'Erro',
        width: 'auto'
      });
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
