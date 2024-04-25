import { Response } from "express";

export function formatDate(date: string) {
  var d = new Date(date);
  var final = d.toISOString().slice(0, 10);

  return final;
}

export function checkMissingField(field: any, fieldName: string) {
  if (!field) {
    throw new Error(`${fieldName} is missing`);
  }
}

export function CPFValidator(cpf: string) {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digito1 = 11 - (soma % 11);
  digito1 = digito1 > 9 ? 0 : digito1;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let digito2 = 11 - (soma % 11);
  digito2 = digito2 > 9 ? 0 : digito2;

  return cpf.endsWith(`${digito1}${digito2}`);
}