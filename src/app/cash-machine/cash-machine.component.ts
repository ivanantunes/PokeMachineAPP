import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-machine',
  templateUrl: './cash-machine.component.html',
  styleUrls: ['./cash-machine.component.scss']
})
export class CashMachineComponent implements OnInit {

  public currentDateTime = new Date().toLocaleString();

  public arrCashMachine = [
    { id: 1, name: 'Caixa Eletrônico - 1', available: 10000, status: true },
    { id: 2, name: 'Caixa Eletrônico - 2', available: 5400, status: false },
    { id: 3, name: 'Caixa Eletrônico - 3', available: 12847, status: true },
    { id: 4, name: 'Caixa Eletrônico - 4', available: 1200, status: false },
    { id: 5, name: 'Caixa Eletrônico - 5', available: 0, status: true },
  ];

  constructor() { }

  ngOnInit(): void { }

  // ? Formmaters
  public formatterCash(value: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formatter.format(value);
  }

}
