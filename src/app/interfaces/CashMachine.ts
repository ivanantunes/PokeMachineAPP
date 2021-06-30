export interface CashMachine {
  csm_ID: number;
  csm_NAME: string;
  csm_STATUS: 'AT' | 'IN' | 'EM';
  csm_AVAILABLE_VALUE: number;
}
