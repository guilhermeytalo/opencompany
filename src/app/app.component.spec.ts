import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { Empresa, Endereco, Root, Solicitante } from './types/company';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule, HttpClientModule, NgbModule],
      providers: [ApiService],
    }).compileComponents();
  
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form when changeStatusToForm() is called', () => {
    component.changeStatusToForm();
    expect(component.registerForm.pristine).toBe(true);
    expect(component.registerForm.untouched).toBe(true);
  });

  it('should update the form when editPedido() is called', () => {
    const solicitante: Solicitante = {
      ds_responsavel: 'John Doe',
      nu_cpf: '12345678901',
      date_nascimento: '1980-01-01',
    };

    const endereco: Endereco = {
      co_cep: 14022094,
      ds_logradouro: 'Test Street',
      co_numero: '123',
      ds_complemento: 'Apt 1',
      ds_bairro: 'Test District',
      ds_municipio: 'Test City',
      co_uf: '29',
    };

    const empresa: Empresa = {
      ds_nome_fantasia: 'Test Company',
      co_entidade_registro: 104306,
      co_natureza_juridica: 10021,
      endereco: endereco,
    };

    const detalhesPedido: Root = {
      id: 1,
      solicitante: solicitante,
      empresa: empresa,
    };

    component.detalhesPedido = detalhesPedido;
    component.editPedido();

    expect(component.registerForm.value.solicitante.ds_responsavel).toBe(
      'John Doe'
    );
    expect(component.registerForm.value.empresa.ds_nome_fantasia).toBe(
      'Test Company'
    );
  });
});