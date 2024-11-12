import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { EntidadeRegistro, Estado, Root } from '../types/company';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch empresas', () => {
    const mockEmpresas: Root[] = [
      {
        id: 1,
        solicitante: {
          ds_responsavel: 'John Doe',
          nu_cpf: '12345678901',
          date_nascimento: '1980-01-01',
        },
        empresa: {
          ds_nome_fantasia: 'Test Company',
          co_entidade_registro: 104306,
          co_natureza_juridica: 10021,
          endereco: {
            co_cep: 14022094,
            ds_logradouro: 'Test Street',
            co_numero: '123',
            ds_complemento: 'Apt 1',
            ds_bairro: 'Test District',
            ds_municipio: 'Test City',
            co_uf: '29',
          },
        },
      },
    ];

    service.getEmpresas().then((empresas) => {
      expect(empresas).toEqual(mockEmpresas);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/empresas'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEmpresas);
  });
});
