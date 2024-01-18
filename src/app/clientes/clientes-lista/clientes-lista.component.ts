import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemErro: string;
  mensagemSucesso: string;

  constructor(private service: ClientesService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe(response => this.clientes = response);
  }

  novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.service
    .deletar(this.clienteSelecionado)
    .subscribe(response => {
      this.ngOnInit();
      this.mensagemSucesso = 'Cliente deletado com sucesso.'
    }, 
    erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.')
  }

}
