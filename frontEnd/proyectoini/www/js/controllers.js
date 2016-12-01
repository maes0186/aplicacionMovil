angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService,VARIABLES_UTILES) {


})


.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {


 
})

.controller('MainCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
$scope.datos = {};

  $scope.calcularValores = function(datos) {
    var pCredito=100-datos.pCuotaInicial;
    var valorCredito=datos.vApartamento*pCredito/100-datos.vAbono;
    var i=datos.tasa/1200;
    var meses=datos.nMeses;
    var comun=Math.pow(1+i,meses);
    var numerador=valorCredito*comun*i;
    var denominador=comun-1;
    datos.cuota=numerador/denominador;
    datos.cuota=datos.cuota;
    datos.valorCredito=AuthService.formatearValoresMoneda(valorCredito);
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

;
