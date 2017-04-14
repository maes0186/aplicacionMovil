angular.module('starter').config(['calculosProvider', 'TIPO_FINANCIACION', function (calculosProvider, TIPO_FINANCIACION) {
    calculosProvider.setTipoCalculo(TIPO_FINANCIACION.PESOS);
}]);