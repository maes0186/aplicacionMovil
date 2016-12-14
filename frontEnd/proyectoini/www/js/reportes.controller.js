(function () {
    angular.module('starter').controller('ReportesCtrl', 
    ['$scope', '$ionicModal', 'InvoiceService','$cordovaFile' ,'$ionicPlatform',ReportesCtrl])
 
//.run(function($ionicPlatform,MessagesService) {
   // $ionicPlatform.ready(function() {

    function ReportesCtrl($scope, $ionicModal, InvoiceService,$cordovaFile,$ionicPlatform) {
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
                var fileName = "report.pdf";
                var contentFile = blob;

                if (ionic.Platform.isIOS()) {
                    var pathFile = cordova.file.documentsDirectory
                } else {
                    var pathFile = cordova.file.externalDataDirectory
                }

                $cordovaFile.writeFile(pathFile, fileName, contentFile, true)
                    .then(function (success) {
                        //success
                    }, function (error) {

                        alert("errore nella creazione del report")

                    });
                

                    // Display the modal view
                    vm.modal.show();
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