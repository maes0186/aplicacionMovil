angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService,VARIABLES_UTILES) {


})


.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {


 
})

.controller('MainCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
$scope.datos = {};

  $scope.calcularValores = function(datos) {
    datos.cuota=AuthService.calcularCuota(datos,datos.tasa);
    datos.valorCredito=AuthService.formatearValoresMoneda(AuthService.obtenerValorCredito(datos));
    datos.vIniValorInicial=datos.vApartamento*datos.pCuotaInicial/100;
    datos.iniValorInicial=AuthService.formatearValoresMoneda(datos.vIniValorInicial);
  $scope.datos=datos; 
  };

 $scope.formatearValoresMoneda = function(valor) {
   return AuthService.formatearValoresMoneda(valor);
 };
}
)
.controller('CalculosCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
 $scope.formatearValoresMoneda = function(valor) {
   return AuthService.formatearValoresMoneda(valor);
 };
})
.controller('CompararCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
 $scope.obtenerCuota = function(datos,tasa) {
   return AuthService.calcularCuota(datos,tasa);
 };
 $scope.formatearValoresMoneda = function(valor) {
   return AuthService.formatearValoresMoneda(valor);
 };
})
;
