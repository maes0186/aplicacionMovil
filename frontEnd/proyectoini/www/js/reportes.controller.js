(function () {
    angular.module('starter').controller('ReportesCtrl', 
    ['$scope', '$ionicModal', 'InvoiceService','$cordovaFile' ,'$ionicPlatform','$cordovaSocialSharing',ReportesCtrl])
 
//.run(function($ionicPlatform,MessagesService) {
   // $ionicPlatform.ready(function() {

    function ReportesCtrl($scope, $ionicModal, InvoiceService,$cordovaFile,$ionicPlatform,$cordovaSocialSharing) {
     //    $ionicPlatform.ready(function() {
        
        var vm = this;

        setDefaultsForPdfViewer($scope);

        // Initialize the modal view.
        $ionicModal.fromTemplateUrl('pdf-viewer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
        });

        vm.createInvoice = function () {

            InvoiceService.createPdf($scope.datos)
                .then(function (pdf) {
                    var blob = new Blob([pdf], { type: 'application/pdf' });
                    $scope.pdfUrl = URL.createObjectURL(blob);
                    // Display the modal view
                    vm.modal.show();
                });
        };
        //  $ionicPlatform.ready(function(){
      
         vm.guardarReporte = function () {
             
            InvoiceService.createPdf($scope.datos)
                .then(function (pdf) {
                    ionic.Platform.ready(function(){
                    var blob = new Blob([pdf], { type: 'application/pdf' });
                    $scope.pdfUrl = URL.createObjectURL(blob);
                
                var pathFile = "";
                var fileName = "reporte";
                var contentFile = blob;
                var rutaCompleta="";
                var fecha=new Date();
                fileName=fileName+fecha.getDay()+fecha.getMonth()+fecha.getFullYear()+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds()+".pdf";
                if (ionic.Platform.isIOS()) {
                    var pathFile = cordova.file.documentsDirectory;
                } else {
                    var pathFile = cordova.file.externalApplicationStorageDirectory;
                }

                $cordovaFile.writeFile(pathFile, fileName, contentFile, true)
                    .then(function (success) {
                        //success
                    }, function (error) {

                        alert("Error guardando archivo"+error);

                    });
                    rutaCompleta=pathFile+fileName;

              
                   $cordovaSocialSharing
                        .shareViaEmail("Reporte analisis financiero", "Este es un reporte estimado del analisis del credito para la compra", "maes0186@hotmail.com", null, null, rutaCompleta)
                        .then(function(result) {
                     // Success!
                     }, function(err) {
                            alert("Error enviando archivo"+err);
                        });

               
                })
            }
                )
             

        };
                                   //   });

        // Clean up the modal view.
        $scope.$on('$destroy', function () {
            vm.modal.remove();
        });

         $scope.zoomIn = function() {
          pageFit = false;
          scale = parseFloat(scale) + 0.2;
          scope.renderPage(scope.pageToDisplay);
          return scale;
        };

        $scope.zoomOut = function() {
          pageFit = false;
          scale = parseFloat(scale) - 0.2;
          scope.renderPage(scope.pageToDisplay);
          return scale;
        };

        $scope.fit = function() {
          pageFit = true;
          scope.renderPage($scope.pageToDisplay);
        }


        $scope.rotate = function() {
          if (canvas.getAttribute('class') === 'rotate0') {
            canvas.setAttribute('class', 'rotate90');
          } else if (canvas.getAttribute('class') === 'rotate90') {
            canvas.setAttribute('class', 'rotate180');
          } else if (canvas.getAttribute('class') === 'rotate180') {
            canvas.setAttribute('class', 'rotate270');
          } else {
            canvas.setAttribute('class', 'rotate0');
          }
        };

        return vm;
       // });
    }


    function setDefaultsForPdfViewer($scope) {
        $scope.scroll = 0;
        $scope.loading = 'loading';

        $scope.onError = function (error) {
            console.error(error);
        };

        $scope.onLoad = function () {
            $scope.loading = '';
        };

        $scope.onProgress = function (progress) {
            console.log(progress);
        };
    }

 //})});  


})();