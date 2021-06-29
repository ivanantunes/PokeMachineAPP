export interface CADFullClient {
  client: {
    cli_FULL_NAME: string;
    cli_RG: string;
    cli_CPF: string;
    cli_BIRTHDAY: string;
  },
  clientTelephone: {
    clt_TELEPHONE: string;
  },
  clientAddress: {
    cla_ZIP_CODE: string;
    cla_ADDRESS: string;
    cla_NUMBER: number;
    cla_DISTRICTY: string;
    cla_CITY: string;
    cla_UF: string;
  },
  account: {
    acc_AGE_ID: number;
    acc_PASSWORD: string;
    acc_BALANCE: number;
    acc_TYPE: string;
  }
}
