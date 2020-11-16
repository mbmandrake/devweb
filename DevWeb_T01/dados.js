const fs = require('fs');
const util = require('util');
const NOME_ARQUIVO = 'lista.json';

function Cliente() {
    this.id = 0,
    this.nome = '',
    this.sobrenome = '',
    this.senha = '',
    this.email = '',
    this.sexo = '',
    this.cpf = '',
    this.rg = '',
    this.telefone = '',
    this.dataNascimento = '',
    this.estadoCivil = 1,
    this.cep = '',
    this.endereco = ''
}

var lista = [];

async function getListaClientes() {
    await carregarArquivo();
    return lista;
}

async function cadastrarCliente(cliente) {
    let existe = false;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == cliente.id) {
            lista[i] = cliente;
            existe = true;
            break;
        }
    }
    if (!existe)
        lista.push(cliente);
    await salvarArquivo();
}

async function salvarArquivo() {
    let data = JSON.stringify(lista);
    await util.promisify(fs.writeFile)(NOME_ARQUIVO, data);
}

async function carregarArquivo() {

    try {
        let stat = await util.promisify(fs.stat)(NOME_ARQUIVO);
        if (stat.isFile) {
            let data = await util.promisify(fs.readFile)(NOME_ARQUIVO);
            lista = JSON.parse(data.toString());
        }
    } catch (error) {
    }
}

function carregarClientePorId(id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == id) {
            return lista[i];
        }
    }
    return new Cliente();
}

async function deletarClientePorId(id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == id) {
            lista.splice(i, 1);
            await salvarArquivo();
            break;
        }
    }
}

module.exports.Cliente = Cliente;
module.exports.getListaClientes = getListaClientes;
module.exports.cadastrarCliente = cadastrarCliente;
module.exports.carregarClientePorId = carregarClientePorId;
module.exports.deletarClientePorId = deletarClientePorId;