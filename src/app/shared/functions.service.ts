import { Injectable } from '@angular/core';

@Injectable()
export class FunctionsService {

  constructor() { }

  public treatsErrorMessage(msg: string = '', err): string {
    // Tratar erros HTTP do HttpClient
    if (err && err.error) {
      err = err.error; // Extrair o erro real
    }
    
    // Tratar ProgressEvent (erro de requisição)
    if (err && err.name === 'ProgressEvent') {
      msg = 'Erro ao conectar com o servidor. Verifique sua conexão.';
      return msg;
    }
    
    if (typeof err.additionalFriendly === 'object') {
      msg = err.message ? err.message + '<br/>' : '';
      for (const i of err.additionalFriendly) {
        msg = msg + '<li><i class=\'mdi mdi-alert-outline\'></i> ' + i + '</li>';
      }
      msg = (msg === '' ? '' : '<ul>' + msg + '</ul>');
    } else if (typeof err.additionalFriendly === 'string') {
      msg = err.message + '<br/>' + err.additionalFriendly;
    } else if (err && err.message) {
      msg = err.message;
    } else {
      msg = 'Erro desconhecido, por favor informar ao Administrador do sistema. cód: m_esid-987';
    }

    return msg;
  }

  /**
  * Convert base64 to Blob
  */
  public b64toBlob(b64Data, contentType = '', sliceSize = 512): Blob {
    if (!b64Data || typeof b64Data !== 'string') {
      return new Blob([], { type: contentType });
    }
    let fileData = b64Data.split(',')[1];

    if (!fileData) {
      fileData = b64Data;
    }

    const byteCharacters = atob(fileData);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  public validateCPF(_cpf) {
    let value = _cpf;
    if (!value || value === true) {
      return
    }

    if (typeof value === 'number') {
      value = String(value);
    }

    const cleanCPF = value.replace(/[^0-9]/g, '');
    const firstNineDigits = cleanCPF.substring(0, 9);
    const checker = cleanCPF.substring(9, 11);

    if (cleanCPF.length !== 11) {
      return false;
    }

    // Checking if all digits are equal
    for (let i = 0; i < 10; i++) {
      if ('' + firstNineDigits + checker === Array(12).join(String(i))) {
        return false;
      }
    }

    let sum = null;
    for (let j = 0; j < 9; ++j) {
      sum += firstNineDigits.toString().charAt(j) * (10 - j);
    }

    const lastSumChecker1 = sum % 11;
    const checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;

    const cpfWithChecker1 = (firstNineDigits + checker1);
    sum = null;
    for (let k = 0; k < 10; ++k) {
      sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
    }

    const lastSumChecker2 = sum % 11;
    const checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;

    if (checker.toString() === checker1.toString() + checker2.toString()) {
      return true;
    } else {
      return false;
    }
  }

  public validateCNPJ(_cnpj) {
    const cnpj = _cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') {
      return false;
    }

    if (cnpj.length != 14) {
      return false;
    }

    // Eliminates known invalid CNPJs
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999") {
      return false;
    }

    // Validate DVs
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result != digits.charAt(0)) {
      return false;
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result != digits.charAt(1)) {
      return false;
    }

    return true;
  }

  public validateEmail(_email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regExp2 = /[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ]/;

    return regExp.test(String(_email).toLowerCase()) && !regExp2.test(String(_email).toLowerCase());
  }

  public validateNameFull(_name) {
    if (_name) {
      const exp = _name.split(' ');
      return exp.length <= 1 ? false : true;
    } else {
      return false;
    }
  }

  public validateZipCode(_zipCode) {
    return (_zipCode && _zipCode.length === 8);
  }

  public validatePhone(_phone) {
    return _phone && (_phone.length === 10 || _phone.length === 11);
  }

  public validateStrongPassword(_password) {
    if (!_password) {
      return false
    }

    const seq = ['012', '123', '234', '345', '456', '567', '678', '789']
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{6,}/;

    let strong = true

    if (!_password.match(/[\w+]/)) {
      strong = false
    } else if (!_password.match(/[\d+]/)) {
      strong = false
    }

    seq.forEach(s => {
      if (_password.indexOf(s) > -1) {
        strong = false
      }
    })

    if (_password?.length < 6) {
      strong = false
    }

    if (!regExp.test(_password)) {
      strong = false
    }

    return strong
  }

  public convertFirstLetterWord(text: string) {
    if (!text) return '';

    let convert = '';
    const splitText = text.split(' ');

    splitText.forEach(word => {
      word = word.toLowerCase();

      if (!['', 'a', 'o', 'e', 'as', 'os', 'à', 'aos', 'às', 'ou', 'de', 'do', 'da', 'dos', 'das', 'um', 'uma', 'uns', 'umas', 'em', 'no', 'na', 'né', 'nos',
        'nas', 'num', 'numa', 'nuns', 'numas', 'dum', 'duma', 'duns', 'dumas', 'por', 'pela', 'pelo', 'pelos', 'pelas', 'para', 'pra',
      ].includes(word)) {
        convert += ` ${word.charAt(0).toUpperCase() + word.substr(1)} `;

      } else if (word) {
        convert += ` ${word} `;
      }
    });

    return convert.trim();
  }

}