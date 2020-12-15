const express = require('express');
const router = express.Router();
const dados = require('./dados');
const validador = require('express-validator');

router.get('/clientes/cadastro', async (req, res) => {
    let cli = new dados.Cliente();
    res.render('cadastro', { cliente: cli, lista: await dados.getListaClientes() });
});

router.get('/clientes', async (req, res) => {
    let lista = await dados.getListaClientes();
    res.json(lista);
});

router.get('/clientes/:id', async (req, res) => {
    let id = req.params.id;
    let cli = dados.carregarClientePorId(id);
    res.json(cli);
});

router.post('/clientes/del/:id', async (req, res) => {
    let id = req.params.id;
    await dados.deletarClientePorId(id);
    res.redirect('http://localhost:4200/lista-cliente');
});

router.post('/clientes', [
    validador.check(['id', 'nome', 'sobrenome', 'senha', 'email'], 'Campo é Obrigatório').notEmpty(),
    validador.check('email', 'E-mail Inválido').isEmail(),
    validador.check('dataNascimento', 'Data Inválida').isDate().isAfter('1900-01-01')
], async (req, res) => {
    var erros = [];
    console.log("Entrou aqui");

    erros = validador.validationResult(req).array();
    console.log(req.body);

    let cli = new dados.Cliente();
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
    if (erros.length == 0) {
        console.log("Entrou aqui 2");
        await dados.cadastrarCliente(cli);
        cli = new dados.Cliente();
    }
});

module.exports = router;