const express = require('express');
const router = express.Router();
const dados = require('./dados');
const validador = require('express-validator');

router.get('/clientes', async (req, res) => {
    let cli = new dados.Cliente();
    res.render('home', { cliente: cli, lista: await dados.getListaClientes() });
});

router.get('/clientes/:id', async (req, res) => {
    let id = req.params.id;
    let cli = dados.carregarClientePorId(id);
    res.render('home', { cliente: cli, lista: await dados.getListaClientes() });
});

router.post('/clientes/del/:id', async (req, res) => {
    let id = req.params.id;
    await dados.deletarClientePorId(id);
    res.redirect('/clientes');
});

router.post('/clientes', [
    validador.check(['id', 'nome', 'sobrenome', 'senha', 'email'], 'Campo é Obrigatório').notEmpty(),
    validador.check('email', 'E-mail Inválido').isEmail(),
    validador.check('dataNascimento', 'Data Inválida').isDate().isAfter('1900-01-01')
], async (req, res) => {
    var erros = [];

    erros = validador.validationResult(req).array();

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
        await dados.cadastrarCliente(cli);
        cli = new dados.Cliente();
    }
    res.render('home', { cliente: cli, lista: await dados.getListaClientes(), erros: erros });
});

module.exports = router;