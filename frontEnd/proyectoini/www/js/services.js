angular.module('starter').service('UtilesService',function(){
 this.formatearValoresMoneda=function (numero) {
       if(isNaN(numero))return '$0';
      return '$'+numero.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
}
)
