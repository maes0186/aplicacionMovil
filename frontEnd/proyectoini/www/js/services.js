angular.module('starter')

  .service('AuthService', function ($q, $http,VARIABLES_UTILES) {
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;
    

    var formatearValoresMoneda=function (numero) {
      return '$'+numero.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return {
      formatearValoresMoneda:formatearValoresMoneda
      
    };
  })
