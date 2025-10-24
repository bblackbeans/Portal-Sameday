import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class BankDataService {

  constructor(
    private _http: HttpService,
    private _settings: SettingsService,
  ) { }

  // Listar contas bancárias do usuário
  public getUserBankAccounts(userId: string) {
    const url = this._settings.getEndPoint('portal') + '/user-bank/list';
    return this._http.get(url, { idUser: userId });
  }

  // Criar conta bancária
  public createBankAccount(bankData: any) {
    const url = this._settings.getEndPoint('portal') + '/user-bank';
    return this._http.post(url, bankData);
  }

  // Atualizar conta bancária
  public updateBankAccount(id: string, bankData: any) {
    const url = this._settings.getEndPoint('portal') + `/user-bank/${id}`;
    return this._http.put(url, bankData);
  }

  // Deletar conta bancária
  public deleteBankAccount(id: string) {
    const url = this._settings.getEndPoint('portal') + `/user-bank/${id}`;
    return this._http.delete(url);
  }

  // Validar dados bancários
  public validateBankData(bankData: any) {
    const validation = {
      isValid: true,
      errors: []
    };

    // Validar campos obrigatórios
    if (!bankData.accountType) {
      validation.errors.push('Tipo de conta é obrigatório');
      validation.isValid = false;
    }

    if (!bankData.bank) {
      validation.errors.push('Banco é obrigatório');
      validation.isValid = false;
    }

    if (!bankData.agency) {
      validation.errors.push('Agência é obrigatória');
      validation.isValid = false;
    }

    if (!bankData.account) {
      validation.errors.push('Conta é obrigatória');
      validation.isValid = false;
    }

    if (!bankData.accountDigit) {
      validation.errors.push('Dígito da conta é obrigatório');
      validation.isValid = false;
    }

    if (!bankData.cpf) {
      validation.errors.push('CPF é obrigatório');
      validation.isValid = false;
    }

    if (!bankData.fullName) {
      validation.errors.push('Nome completo é obrigatório');
      validation.isValid = false;
    }

    // Validar formato do CPF
    if (bankData.cpf && !this.validateCPF(bankData.cpf)) {
      validation.errors.push('CPF inválido');
      validation.isValid = false;
    }

    return validation;
  }

  // Validar CPF
  private validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  // Obter lista de bancos
  public getBanksList() {
    return [
      { code: '001', name: 'Banco do Brasil' },
      { code: '104', name: 'Caixa Econômica Federal' },
      { code: '341', name: 'Itaú Unibanco' },
      { code: '033', name: 'Santander' },
      { code: '237', name: 'Bradesco' },
      { code: '422', name: 'Banco Safra' },
      { code: '260', name: 'Nu Pagamentos' },
      { code: '336', name: 'Banco C6' },
      { code: '290', name: 'PagSeguro' },
      { code: '323', name: 'Mercado Pago' }
    ];
  }

  // Obter tipos de conta
  public getAccountTypes() {
    return [
      { value: 'checking', label: 'Conta Corrente' },
      { value: 'savings', label: 'Conta Poupança' }
    ];
  }
}
