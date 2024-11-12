export interface Root {
  id: number;
  solicitante: Solicitante;
  empresa: Empresa;
}

export interface Solicitante {
  ds_responsavel: string;
  nu_cpf: string;
  date_nascimento: string;
}

export interface Empresa {
  ds_nome_fantasia: string;
  co_entidade_registro: number;
  co_natureza_juridica: number;
  endereco: Endereco;
}

export interface Endereco {
  co_cep: number;
  ds_logradouro: string;
  co_numero: string;
  ds_complemento: string | null;
  ds_bairro: string;
  ds_municipio: string;
  co_uf: string;
}

export interface EntidadeRegistro {
  id: number;
  key: string;
  value: string;
}

export interface Estado {
  id: number;
  sigla: string;
  nome: string;
}