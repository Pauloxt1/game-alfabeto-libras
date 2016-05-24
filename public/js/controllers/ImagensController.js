angular.module('miniGame').controller('ImagensController', function($scope, Socket){

  $scope.hideForm = false;


    $scope.salvarNome = function(){
      $scope.hideForm = true;
      Socket.emit('salvar nome', $scope.nome);
    }

    $scope.submitPalavra = function(){
      Socket.emit('achar palavra', $scope.acharPalavra.toLowerCase());
      delete $scope.acharPalavra;
    }


    $scope.toLower = function(){
      if($scope.texto){
        var letters = $scope.texto.toLowerCase().split('');
        $scope.imagens = [];

        letters.forEach((letter) => {
          if(letter != ' '){
            $scope.imagens.push(letter+'.png');
          }
        });
      }
    }

    Socket.on('imagens', function(retorno){
      if(retorno){
        var palavra = retorno.toLowerCase();
        $scope.palavra = palavra;
        var letters = palavra.toLowerCase().split('');
        $scope.imagens = [];

        letters.forEach((letter) => {
          if(letter != ' '){
            $scope.imagens.push(letter+'.png');
          }
        });
      }
    });

    Socket.on('vencedor', function(vencedor){
      $scope.imagens = [];
      $scope.vencedor = vencedor;
      $scope.$apply();
    });
});
