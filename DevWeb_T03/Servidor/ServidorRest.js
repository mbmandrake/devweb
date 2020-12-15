const express = require('express');
const bodyParser = require("body-parser");
const dadosAPI = require('./DadosAPI');
const cors = require('cors');
const servidor = express();

servidor.use(bodyParser.json());    
servidor.use(cors());

// -- Metodos
servidor.get('/', (req,res) => {
    res.status(200).json('Serviço Funcionando!');
});

servidor.get('/clientes', async (req,res) => {
    let lista = await dadosAPI.GetListaClientes();
    res.json(lista);
});

servidor.get('/clientes/:id', async (req,res) => {
    let cli = await dadosAPI.CarregaClientePorCodigo(req.params.id);
    res.json(cli);
});

servidor.post('/clientes', async (req,res) => {
    let cli = new dadosAPI.Cliente();
    cli.id = req.body.id;
    cli.nome = req.body.nome;
    cli.sobrenome = req.body.sobrenome;
    cli.senha = req.body.senha;
    cli.email = req.body.email;
    cli.sexo = req.body.sexo;
    cli.cpf = req.body.cpf;
    cli.rg = req.body.rg;
    cli.telefone = req.body.telefone;
    cli.dataNascimento = req.body.dataNascimento;
    cli.estadoCivil = req.body.estadoCivil;
    cli.cep = req.body.cep;
    cli.endereco = req.body.endereco;

    await dadosAPI.AddClientes(cli);
    res.status(200).json(cli);
});

servidor.delete('/clientes/:id', async (req,res) => {
    await dadosAPI.DeletaClientePorCodigo(req.params.id);
    res.end();
});

servidor.listen(3000,()=>{ console.log('Rodando Servidor Rest...'); })