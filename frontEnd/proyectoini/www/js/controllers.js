angular.module('starter')



.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {

 $scope.formatearValoresMoneda = function(valor) {
   return AuthService.formatearValoresMoneda(valor);
 };
 
})

.controller('MainCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
$scope.datos = {};

  $scope.calcularValores = function(datos) {
    datos.cuota=AuthService.calcularCuota(datos,datos.tasa);
    datos.fCuota=AuthService.formatearValoresMoneda(AuthService.calcularCuota(datos,datos.tasa));
    datos.valorCredito=AuthService.formatearValoresMoneda(AuthService.obtenerValorCredito(datos));
    datos.vIniValorInicial=datos.vApartamento*datos.pCuotaInicial/100;
    datos.fValorInicial=AuthService.formatearValoresMoneda(datos.vIniValorInicial);
    datos.fVApartamento=AuthService.formatearValoresMoneda(datos.vApartamento);
    datos.fVAbono=AuthService.formatearValoresMoneda(datos.vAbono);
    datos.fIniAbono=AuthService.formatearValoresMoneda(datos.iniAbono);
    datos.fCuotaInicial=AuthService.formatearValoresMoneda((datos.vIniValorInicial-datos.iniAbono)/datos.iniMeses);
    datos.fSeguros=AuthService.formatearValoresMoneda(((datos.vIniValorInicial-datos.iniAbono)/datos.iniMeses)*2.2/100);
    datos.fCoutaSeguros=AuthService.formatearValoresMoneda(((datos.vIniValorInicial-datos.iniAbono)/datos.iniMeses)*2.2/100+datos.cuota);
    datos.fEscrituras=AuthService.formatearValoresMoneda(datos.vApartamento*2.5/100);
    datos.fFaltanteIni=AuthService.formatearValoresMoneda(datos.vIniValorInicial-datos.iniAbono);
  
   // datos.tasa1=5;
  $scope.datos=datos; 
  };


}
)
.controller('CalculosCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {

})
.controller('CompararCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
 $scope.obtenerCuota = function(datos,tasa) {
   return AuthService.calcularCuota(datos,tasa);
 };
 $scope.formatearValoresMoneda = function(valor) {
   return AuthService.formatearValoresMoneda(valor);
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

