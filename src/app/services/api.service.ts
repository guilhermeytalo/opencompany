import { Injectable } from '@angular/core';
import { EntidadeRegistro, Root, Estado } from '../types/company';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly urlEmpresas = 'http://localhost:3000/empresas';
  private readonly urlEntidadeRegistro =
    'http://localhost:3000/entidade-registro';
  private readonly urlEstados =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) {}

  async getEmpresas(): Promise<Root[]> {
    return firstValueFrom(this.http.get<Root[]>(this.urlEmpresas));
  }

  async getEntidadeRegistro(): Promise<EntidadeRegistro[]> {
    return firstValueFrom(
      this.http.get<EntidadeRegistro[]>(this.urlEntidadeRegistro)
    );
  }

  async getEstados(): Promise<Estado[]> {
    return firstValueFrom(this.http.get<Estado[]>(this.urlEstados));
  }

  async getBuscarEmpresa(id: number): Promise<Root> {
    return firstValueFrom(this.http.get<Root>(`${this.urlEmpresas}/${id}`));
  }

  async createEmpresa(data: Root): Promise<Root> {
    return firstValueFrom(this.http.post<Root>(this.urlEmpresas, data));
  }

  async updateEmpresa(id: string | number, data: Root): Promise<Root> {
    return firstValueFrom(
      this.http.put<Root>(`${this.urlEmpresas}/${id}`, data)
    );
  }
}