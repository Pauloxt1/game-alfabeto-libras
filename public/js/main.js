$(document).ready(function(){
  var Socket = io('http://192.168.43.75:3000/');

  $('form[name="save-name"]').submit(function(){
    var nome = $('#input-modal').val();
    $('#modal-nome').fadeOut('fast');
    Socket.emit('salvar nome', nome);
    return false;
  });

    $('form[name="palavra"]').submit(function(){
      var palavra = $('#palavra-form').val();
      Socket.emit('achar palavra', palavra.toLowerCase());
      $('#palavra-form').val('');
      return false;
    });

  Socket.on('comecar jogo', function(retorno){
    var divImagens = $('div#imgs');
    divImagens.html('');
    $('section.sucesso').fadeOut('fast');
    if(retorno){
      var palavra = retorno.toLowerCase();
      var letters = palavra.toLowerCase().split('');

      letters.forEach((letter) => {
        if(letter != ' '){
          divImagens.append('<img src="imgs/libras/'+letter+'.png" class="gesto">');
        }
      });
    }
    divImagens.fadeIn('fast');
  });

  Socket.on('vencedor', function(retorno){
      var titulo = retorno.titulo;
      var imagem = retorno.imagem;
      var pessoaVenceu = retorno.nome;

      $('section.sucesso > img').attr('src', 'imgs/titulos/'+imagem);
      $('section.sucesso > img').attr('title', titulo);
      $('span.movie-title').html(titulo);
      $('span#quem-venceu').html(pessoaVenceu);

      $('section.sucesso').fadeIn('slow');
      $('div#imgs').hide();
  });

  Socket.on('desligar', function(){
    $('section.sucesso').hide();
    $('div#imgs').hide();
  });

});
