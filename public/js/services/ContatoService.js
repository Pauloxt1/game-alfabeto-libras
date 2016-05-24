angular.module('miniGame').factory('Socket', function(){

  var Socket = io('http://localhost:3000');

    return Socket;
});
