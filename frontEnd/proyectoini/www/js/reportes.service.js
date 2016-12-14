(function () {
    angular.module('starter').factory('InvoiceService', ['$q', InvoiceService]);

    function InvoiceService($q) {
        function createPdf(datos) {
            return $q(function (resolve, reject) {
                var dd = createDocumentDefinition(datos);
                var pdf = pdfMake.createPdf(dd);

                pdf.getBase64(function (output) {
                    resolve(base64ToUint8Array(output));
                });
            });
        }

        return {
            createPdf: createPdf
        };
    }

    function createDocumentDefinition(datos) {


        var vr = [[],[]];
vr[0]=[ 
   'USUARIO',
   'ASESOR',
   'DESCRIPCION'
];
vr[1]=[ 
   datos.rUsuario,
   datos.rAsesor,
   datos.rDescripcion
];

vr[2]=[ 
   'VALOR DEL INMUEBLE',
   'VALOR DEL CREDITO',
   'MESES DEL CREDITO',
   'ABONO AL CREDITO',
   'TASA DE INTERES (%)'
];
vr[3]=[ 
   datos.fVApartamento,
   datos.valorCredito,
   datos.nMeses.toString(),
   datos.fVAbono,
   datos.tasa.toString()
];
vr[4]=[ 
   'CUOTA INICIAL (%)',
   'VALOR TOTAL CUOTA INICIAL',
   'ABONO A LA CUOTA INICIAL',
   'VALOR DE LA CUOTA MENSUAL DE LA INCIAL'
];
vr[5]=[ 
   datos.pCuotaInicial.toString(),
   datos.fValorInicial,
   datos.fIniAbono,
   datos.fCuotaInicial
];
vr[6]=[ 
   'VALOR ESTIMADO DE LAS ESCRITURAS',
   'VALOR ESTIMADO DEL SEGURO',
   'VALOR DE LA CUOTA CON SEGURO'
];
vr[7]=[ 
   datos.fEscrituras,
   datos.fSeguros,
   datos.fCoutaSeguros
];

//console.log($scope.datos);

var dd = {

  // by default we use portrait, you can change it to landscape if you wish
  pageOrientation: 'landscape',
  content: [
    'DATOS BASICOS',
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
    'DATOS DEL INMBUEBLE',
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
    'DATOS DE LA CUOTA INICIAL',
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
          vr[6],
          vr[7]
        ]
      }
    }
  ]
};  
        return dd;
    }

    function base64ToUint8Array(base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }
})();