angular.module('starter')

  .service('AuthService', function ($q, $http,VARIABLES_UTILES) {
    var formatearValoresMoneda=function (numero) {
       if(isNaN(numero))return '$0';
      return '$'+numero.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    };
    var calcularCuota=function (datos,tasa) {
      var valorCredito=obtenerValorCredito(datos);
      var i=tasa/1200;
    var comun=Math.pow(1+i,datos.nMeses);
    var numerador=valorCredito*comun*i;
    var denominador=comun-1;
    var cuota=numerador/denominador;
      return cuota;
    };
    var obtenerValorCredito=function(datos){
       var pCredito=100-datos.pCuotaInicial;
       var valorCredito=datos.vApartamento*pCredito/100-datos.vAbono;
       return valorCredito;
    };
    return {
      formatearValoresMoneda:formatearValoresMoneda,
      calcularCuota:calcularCuota,
      obtenerValorCredito:obtenerValorCredito
      
    };
  })
