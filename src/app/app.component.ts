import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from './services/api.service';
import { Root, EntidadeRegistro, Estado } from './types/company';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatCpf, formatCep } from './utils/formatters';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('successModal') successModal!: TemplateRef<any>;

  registerForm: FormGroup = new FormGroup({});
  logoPath: string = '../assets/logo.jpeg';
  title = 'openCompany';
  requests: Root[] = [];
  detalhesPedido: Root | undefined;
  entidadesRegistro: EntidadeRegistro[] = [];
  estados: Estado[] = [];
  isEditing = false;
  isOnForm = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      solicitante: this.fb.group({
        ds_responsavel: ['', Validators.required],
        nu_cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        date_nascimento: ['', Validators.required],
      }),
      empresa: this.fb.group({
        ds_nome_fantasia: ['', Validators.required],
        co_entidade_registro: ['', Validators.required],
        co_natureza_juridica: ['10021'],
        endereco: this.fb.group({
          co_cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
          ds_logradouro: ['', Validators.required],
          co_numero: ['', Validators.required],
          ds_complemento: [''],
          ds_bairro: ['', Validators.required],
          ds_municipio: ['', Validators.required],
          co_uf: ['', Validators.required],
        }),
      }),
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      const [empresas, entidades, estados] = await Promise.all([
        this.apiService.getEmpresas(),
        this.apiService.getEntidadeRegistro(),
        this.apiService.getEstados(),
      ]);

      this.requests = empresas;
      this.entidadesRegistro = entidades;
      this.estados = estados;
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }

  async getDetalhesPedidos(id: number) {
    try {
      this.detalhesPedido = await this.apiService.getBuscarEmpresa(id);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  }

  editPedido() {
    if (this.detalhesPedido) {
      this.isEditing = true;
      this.isOnForm = true;

      this.registerForm.patchValue({
        solicitante: {
          ds_responsavel: this.detalhesPedido.solicitante.ds_responsavel,
          nu_cpf: this.detalhesPedido.solicitante.nu_cpf,
          date_nascimento: this.detalhesPedido.solicitante.date_nascimento,
        },
        empresa: {
          ds_nome_fantasia: this.detalhesPedido.empresa.ds_nome_fantasia,
          co_entidade_registro:
            this.detalhesPedido.empresa.co_entidade_registro,
          co_natureza_juridica:
            this.detalhesPedido.empresa.co_natureza_juridica,
          endereco: {
            co_cep: this.detalhesPedido.empresa.endereco.co_cep,
            ds_logradouro: this.detalhesPedido.empresa.endereco.ds_logradouro,
            co_numero: this.detalhesPedido.empresa.endereco.co_numero,
            ds_complemento: this.detalhesPedido.empresa.endereco.ds_complemento,
            ds_bairro: this.detalhesPedido.empresa.endereco.ds_bairro,
            ds_municipio: this.detalhesPedido.empresa.endereco.ds_municipio,
            co_uf: this.detalhesPedido.empresa.endereco.co_uf,
          },
        },
      });
    }
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        const formData = this.registerForm.value;

        if (this.isEditing && this.detalhesPedido) {
          await this.apiService.updateEmpresa(this.detalhesPedido.id, formData);
          await this.loadInitialData();
          await this.getDetalhesPedidos(this.detalhesPedido.id);
        } else {
          await this.apiService.createEmpresa(formData);
          await this.loadInitialData();
        }
        this.modalService
          .open(this.successModal, {
            centered: true,
            backdrop: 'static',
            keyboard: false,
          })
          .result.then(
            () => {
              this.resetForm();
              this.isOnForm = false;
            },
            () => {
              this.resetForm();
              this.isOnForm = false;
            }
          );
      } catch (error) {
        console.error('Error saving form:', error);
      }
    }
  }

  changeStatusToForm(): void {
    this.isOnForm = !this.isOnForm;
    this.resetForm();
  }

  resetForm() {
    this.registerForm.reset();
    this.isEditing = false;
    this.detalhesPedido = undefined;
  }

  protected readonly formatCpf = formatCpf;
  protected readonly formatCep = formatCep;
}
