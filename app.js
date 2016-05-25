'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const alternativas = [
  // Titulos somente em minusculo
  {titulo: 'jogos vorazes', imagem: 'jogosvorazes.jpg'},
  {titulo: 'harry potter', imagem: 'harry.jpg'},
  {titulo: 'guerra civil', imagem: 'guerracivil.jpg'},
  {titulo: 'deadpool', imagem: 'deadpool.jpg'},
  {titulo: 'batman vs superman', imagem: 'batmanvs.jpg'},
  {titulo: 'mad max', imagem: 'madmax.jpg'},
  {titulo: 'game of thrones', imagem: 'gameofthrones.jpg'},
  {titulo: 'clube da luta', imagem: 'clubedaluta.jpg'},
  {titulo: 'truque de mestre', imagem: 'truque.jpg'},
  {titulo: 'star wars', imagem: 'starwars.jpg'},
  {titulo: 'breaking bad', imagem: 'breaking.jpg'},
  {titulo: 'demolidor', imagem: 'demolidor.jpg'},
  {titulo: 'avatar', imagem: 'avatar.jpg'},
  {titulo: 'fuga das galinhas', imagem: 'fugadasgalinha.jpg'},
  {titulo: 'marley e eu', imagem: 'marleyeeu.jpg'},
  {titulo: 'divergente', imagem: 'divergente.jpg'},
  {titulo: '007', imagem: '007.jpg'},
  {titulo: '300', imagem: '300.jpg'},
  {titulo: 'naruto', imagem: 'naruto.jpg'},
  {titulo: 'dragon ball z', imagem: 'dragonboll.jpg'},
  {titulo: 'the walking dead', imagem: 'thewalking.jpg'}
]

app.use(express.static('public'));

let selecionado = false;

io.on('connection', (socket) => {
  if(selecionado){
    socket.emit('comecar jogo', selecionado.titulo);
  }

    socket.on('achar palavra', (palavra) => {
        if(selecionado && palavra === selecionado.titulo){
            selecionado.nome = socket.nome;
            io.emit('vencedor',selecionado);
            selecionado = false;
        }
    });

    socket.on('salvar nome', (nome) => {
      socket.nome = nome;
    });

    socket.on('join admin', function(){
      const room = io.sockets.adapter.rooms['admin'];
      if(!room){
        socket.join('admin');
      }
    });

    socket.on('ligar', function(){
        const room = io.sockets.adapter.rooms['admin'];
        let admin = getAdmin(room);
        if(admin == socket.id){
          const filtrado = alternativas.filter((obj) => {
              return obj.titulo != selecionado.titulo;
          });
          const numeroIndice = filtrado.length-1;
          const novo = alternativas[Math.floor(Math.random()*numeroIndice)];
          selecionado = novo;
          io.emit('comecar jogo', selecionado.titulo);
          socket.emit('iniciado', selecionado.titulo);
        }
    });

    socket.on('desligar', function(){
      const room = io.sockets.adapter.rooms['admin'];
      let admin = getAdmin(room);
      if(admin == socket.id){
        selecionado = false;
        io.emit('desligar');
      }
    });

});

function getAdmin(room){
  if(room){
    for (let i in room.sockets){
        return i;
        break;
    }
  }
  return false;
}

http.listen(3000, () => {
  console.log('Servidor rodando na 3000');
});
