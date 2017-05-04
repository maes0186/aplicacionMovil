angular.module('starter')



  .controller('DashCtrl', function ($scope, calculos) {

    $scope.formatearValoresMoneda = function (valor) {
      return calculos.formatearValoresMoneda(valor);
    };

  })

  .controller('MainCtrl', function ($scope, calculos) {
    $scope.datos = {};

    $scope.calcularValores = function (datos) {
      datos = calculos.obtenerDatos(datos);
      $scope.datos = datos;
    };


  }
  )
  .controller('CalculosCtrl', function ($scope, calculos) {

  })
  .controller('CompararCtrl', function ($scope, calculos) {
    $scope.obtenerCuota = function (datos, tasa) {
      return calculos.calcularCuota(datos, tasa);
    };
    $scope.formatearValoresMoneda = function (valor) {
      return calculos.formatearValoresMoneda(valor);
    };


    $scope.init = function () {
      $scope.labels2 = ['Tasa1', 'Tasa2', 'Tasa3', 'Tasa4'];
      $scope.series2 = ['Tasas'];

      $scope.data2 = [
        [$scope.obtenerCuota($scope.datos, $scope.datos.tasa1),
        $scope.obtenerCuota($scope.datos, $scope.datos.tasa2),
        $scope.obtenerCuota($scope.datos, $scope.datos.tasa3),
        $scope.obtenerCuota($scope.datos, $scope.datos.tasa4)]
      ];
    }

    $scope.init();



  })
  ;

