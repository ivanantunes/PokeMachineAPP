export interface CADAccount {
  client: {
    cli_RG: string;
    cli_CPF: string;
  },
  account: {
    acc_AGE_ID: number;
    acc_PASSWORD: string;
    acc_BALANCE: number;
    acc_TYPE: string;
  }
}
