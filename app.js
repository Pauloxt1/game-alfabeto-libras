'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let vencedor = {filme: 'paulo', imagem: 'american.jpg'};

io.on('connection', (socket) => {
    io.emit('comecar jogo', vencedor.filme);

    socket.on('achar palavra', (palavra) => {
        if(palavra === vencedor.filme){
            vencedor.nome = socket.nome;
            io.emit('vencedor',vencedor);
            vencedor = {filme: false, imagem: ''}
        }
    });

    socket.on('salvar nome', (nome) => {
      socket.nome = nome;
    });

});

http.listen(3000, () => {
  console.log('Servidor rodando na 3000');
});
