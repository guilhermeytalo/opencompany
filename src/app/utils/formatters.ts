export function formatCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCep(cep: number): string {
  return cep.toString().replace(/(\d{5})(\d{3})/, '$1-$2');
}
