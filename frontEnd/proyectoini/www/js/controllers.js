angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService,VARIABLES_UTILES) {


})


.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {

 $scope.formatearValoresMoneda = function(valor) {
   return AuthService.formatearValoresMoneda(valor);
 };
 
})
.controller('ReportesCtrl',function($scope, $state, $http, $ionicPopup, AuthService) {
$scope.crearReporte=function(){
var vr = [[],[]];
vr[0]=[ 
   'VALOR DEL INMUEBLE',
   'VALOR DEL CREDITO',
   'MESES DEL CREDITO',
   'ABONO AL CREDITO',
   'TASA DE INTERES (%)'
];
vr[1]=[ 
   $scope.datos.fVApartamento,
   $scope.datos.valorCredito,
   $scope.datos.nMeses.toString(),
   $scope.datos.fVAbono,
   $scope.datos.tasa.toString()
];
vr[2]=[ 
   'CUOTA INICIAL (%)',
   'VALOR TOTAL CUOTA INICIAL',
   'ABONO A LA CUOTA INICIAL',
   'VALOR DE LA CUOTA MENSUAL DE LA INCIAL'
];
vr[3]=[ 
    $scope.datos.pCuotaInicial.toString(),
   $scope.datos.fValorInicial,
   $scope.datos.fIniAbono,
   $scope.datos.fCuotaInicial
];
vr[4]=[ 
   'VALOR ESTIMADO DE LAS ESCRITURAS',
   'VALOR ESTIMADO DEL SEGURO',
   'VALOR DE LA CUOTA CON SEGURO'
];
vr[5]=[ 
    $scope.datos.fEscrituras,
   $scope.datos.fSeguros,
   $scope.datos.fCoutaSeguros
];

console.log($scope.datos);

var docDefinition = {

  // by default we use portrait, you can change it to landscape if you wish
  pageOrientation: 'landscape',
  content: [
    'DATOS DEL INMBUEBLE',
    ' ',
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        body: [
          vr[0],
          vr[1]
        ]
      }
    },
    ' ',
    'DATOS DE LA CUOTA INICIAL',
    ' ',
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        body: [
          vr[2],
          vr[3]
        ]
      }
    },
    ' ',
    'OTROS VALORES',
    ' ',
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        body: [
          vr[4],
          vr[5]
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

