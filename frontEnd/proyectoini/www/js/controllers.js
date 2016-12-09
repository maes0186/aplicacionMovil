angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService,VARIABLES_UTILES) {


})


.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {


 
})
.controller('ReportesCtrl',function($scope, $state, $http, $ionicPopup, AuthService) {
$scope.createInvoce=function(){
var vr = [[],[]];
var titulos=['auto', 'auto', 'auto', 'auto'];
vr.push(titulos);
console.log(vr);
//[]=AuthService.formatearValoresMoneda(AuthService.calcularCuota($scope.datos,$scope.datos.tasa));

var docDefinition = {
   pageSize: 'A5',

  // by default we use portrait, you can change it to landscape if you wish
  pageOrientation: 'landscape',

  // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
  pageMargins: [ 40, 60, 40, 60 ],
  content: [
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: ['auto', 'auto', 'auto', 'auto' ],

        body: [
          [ { text: 'VALORES PARA EL FINANCIAMIENTO', bold: true }, 
          { text: 'CUOTA', bold: true },
          { text: 'MESES', bold: true },
          { text: '% CUOTA INICIAL', bold: true },
           ],
          [1 , 'a','','' ]
        ]
      }
    }
  ]
};  
//pdfMake.createPdf(docDefinition).open();

 // print the PDF (temporarily Chrome-only)
 //pdfMake.createPdf(docDefinition).print();

 // download the PDF (temporarily Chrome-only)
 pdfMake.createPdf(docDefinition).download('creditoSimulado.pdf');
}

 
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
   if(isNaN(valor))return '$0';
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

