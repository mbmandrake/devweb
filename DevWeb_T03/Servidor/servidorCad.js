const express = require('express');
const path = require('path');
const clientes = require('./Clientes');
const bodyParser = require('body-parser');

const servidor = express();

servidor.use(bodyParser.urlencoded({ extended: true }));

servidor.use(express.static(path.join(__dirname, 'public')));

servidor.set('view engine', 'ejs');

servidor.use(clientes);

servidor.get('/', (req, res) => {
    res.redirect('/clientes/cadastro');
});

servidor.listen(8081, () => { console.log('Rodando o Servidor 8081'); })