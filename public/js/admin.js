$(document).ready(function(){
  var Socket = io('http://192.168.43.75:3000/');

  $('.btn-normal').click(function(){
    Socket.emit('ligar');
  });

  $('.btn-waring').click(function(){
    Socket.emit('desligar');
  });

  Socket.on('iniciado', function(nome){
      $('span#game').html(nome);
      $('h1#name-game').fadeIn('fast');
  });

  Socket.on('desligar', function(){
    alert('Jogo desligado');
    $('h1#name-game').hide();
  });

  Socket.on('vencedor', function(){
    $('h1#name-game').hide();
  });

  Socket.emit('join admin');
});
