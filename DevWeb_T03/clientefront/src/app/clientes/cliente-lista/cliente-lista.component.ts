import { Component, OnInit } from '@angular/core';
import { Cliente, ClientesService } from '../clientes.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  lista : Cliente[] = [];

  constructor(private clientesService : ClientesService) { }

  ngOnInit(): void {
    this.clientesService.getClientes().then((data) => {
      this.lista = data;
    })
  }

}
