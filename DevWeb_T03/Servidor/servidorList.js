const express = require('express');
const path = require('path');
const clientes = require('./Clientes');
const dadosAPI = require('./dados');
const bodyParser = require('body-parser');

const servidor = express();

const cors = require('cors');
servidor.use(cors());

servidor.use(bodyParser.urlencoded({ extended: true }));

servidor.use(clientes);

servidor.listen(3000, () => { console.log('Rodando o Servidor 3000'); })