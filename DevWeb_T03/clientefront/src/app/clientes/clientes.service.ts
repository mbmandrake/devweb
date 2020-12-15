import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Cliente{
    id : number = 0;
    nome : string = '';
    sobrenome : string = '';
    senha : string = '';
    email : string = '';
    sexo : string = 'M';
    cpf : string = '';
    rg : string = '';
    telefone : string = '';
    dataNascimento : string = '';
    estadoCivil : number = 1;
    cep : string = '';
    endereco : string = '';
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  constructor(private http : HttpClient) { }

  async getClientes(){
    return await this.http.get<Cliente[]>('http://localhost:3000/clientes').toPromise();
  }
  
  async getCliente(id : number){
    return await this.http.get<Cliente>('http://localhost:3000/clientes/' + id).toPromise();
  }

  async salvar(cliente : Cliente){
    console.log(cliente);
    return await this.http.post<Cliente>('http://localhost:3000/clientes/', cliente).toPromise();
  }

  async excluir(cliente : Cliente){
    return await this.http.delete('http://localhost:3000/clientes/' + cliente.id).toPromise();
  }
}
