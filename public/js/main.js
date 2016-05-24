$(document).ready(function(){
  var Socket = io('http://localhost:3000');

  $('form[name="save-name"]').submit(function(){
    var nome = $('#input-modal').val();
    $('#modal-nome').fadeOut('fast');
    Socket.emit('salvar nome', nome);
    return false;
  });

    $('form[name="palavra"]').submit(function(){
      var palavra = $('#palavra-form').val();
      Socket.emit('achar palavra', palavra);
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
  });

  Socket.on('vencedor', function(retorno){
      var titulo = retorno.filme;
      var imagem = retorno.imagem;
      var pessoaVenceu = retorno.nome;

      $('section.sucesso > img').attr('src', 'imgs/filmes/'+imagem);
      $('section.sucesso > img').attr('title', titulo);
      $('span.movie-title').html(titulo);
      $('span#quem-venceu').html(pessoaVenceu);

      $('section.sucesso').fadeIn('slow');
  });

});
