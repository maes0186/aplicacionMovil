angular.module('starter')



.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, calculosFactory,UtilesService) {

 $scope.formatearValoresMoneda = function(valor) {
   return UtilesService.formatearValoresMoneda(valor);
 };
 
})

.controller('MainCtrl', function($scope, $state, $http, $ionicPopup, calculosFactory,UtilesService) {
$scope.datos = {};

  $scope.calcularValores = function(datos) {
    datos.cuota=calculosFactory.calcularCuota(datos,datos.tasa);
    datos.fCuota=UtilesService.formatearValoresMoneda(calculosFactory.calcularCuota(datos,datos.tasa));
    datos.valorCredito=UtilesService.formatearValoresMoneda(calculosFactory.obtenerValorCredito(datos));
    datos.vIniValorInicial=datos.vApartamento*datos.pCuotaInicial/100;
    datos.fValorInicial=UtilesService.formatearValoresMoneda(datos.vIniValorInicial);
    datos.fVApartamento=UtilesService.formatearValoresMoneda(datos.vApartamento);
    datos.fVAbono=UtilesService.formatearValoresMoneda(datos.vAbono);
    datos.fIniAbono=UtilesService.formatearValoresMoneda(datos.iniAbono);
    datos.fCuotaInicial=UtilesService.formatearValoresMoneda((datos.vIniValorInicial-datos.iniAbono)/datos.iniMeses);
    datos.fSeguros=UtilesService.formatearValoresMoneda(((datos.vIniValorInicial-datos.iniAbono)/datos.iniMeses)*2.2/100);
    datos.fCoutaSeguros=UtilesService.formatearValoresMoneda(((datos.vIniValorInicial-datos.iniAbono)/datos.iniMeses)*2.2/100+datos.cuota);
    datos.fEscrituras=UtilesService.formatearValoresMoneda(datos.vApartamento*2.5/100);
    datos.fFaltanteIni=UtilesService.formatearValoresMoneda(datos.vIniValorInicial-datos.iniAbono);
  
   // datos.tasa1=5;
  $scope.datos=datos; 
  };


}
)
.controller('CalculosCtrl', function($scope, $state, $http, $ionicPopup, calculosFactory) {

})
.controller('CompararCtrl', function($scope, $state, $http, $ionicPopup, calculosFactory,UtilesService) {
 $scope.obtenerCuota = function(datos,tasa) {
   return calculosFactory.calcularCuota(datos,tasa);
 };
 $scope.formatearValoresMoneda = function(valor) {
   return UtilesService.formatearValoresMoneda(valor);
 };


 $scope.init = function () {
 $scope.labels2 = ['Tasa1', 'Tasa2', 'Tasa3', 'Tasa4'];
 $scope.series2 = ['Tasas'];

  $scope.data2 = [
    [$scope.obtenerCuota($scope.datos,$scope.datos.tasa1),
    $scope.obtenerCuota($scope.datos,$scope.datos.tasa2),
    $scope.obtenerCuota($scope.datos,$scope.datos.tasa3),
    $scope.obtenerCuota($scope.datos,$scope.datos.tasa4)]
  ];
}

$scope.init();



})
;

