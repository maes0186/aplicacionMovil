angular.module('starter').config(['calculosProvider','TIPO_CALCULO_CONSTANTE',function(calculosProvider,TIPO_CALCULO_CONSTANTE){
calculosProvider.setTipoCalculo(TIPO_CALCULO_CONSTANTE);
}]);