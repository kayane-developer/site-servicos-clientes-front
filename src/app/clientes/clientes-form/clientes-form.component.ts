import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: string[];
  id: number;

  constructor( private service : ClientesService, 
    private router : Router,
    private activatedRoute: ActivatedRoute) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if(this.id) {
        this.service
        .getClienteById(this.id)
        .subscribe(response => this.cliente = response,
          errorResponse => this.cliente = new Cliente());
      }
    })
  }

  onSubmit() {
    if (this.id) {
      this.service
      .atualizar(this.cliente)
      .subscribe(response => {
        this.errors = null;
        this.success = true;
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o cliente!']
      })
    } else {
      this.service
      .salvar(this.cliente)
      .subscribe(response => {
        this.errors = null;
        this.success = true;
        this.cliente = response;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      });
    }

  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista'])
  }

}
