angular.module('starter').factory('reporteFactory', ['$q','$translate', reporteFactory]);


function reporteFactory($q,$translate) {

  function createPdf(datos) {
      return $q(function (resolve, reject) {
      
      var dd = createDocumentDefinition(datos,$translate);
      var pdf = pdfMake.createPdf(dd);

      pdf.getBase64(function (output) {
        resolve(base64ToUint8Array(output));
      });
    })

  }

 
 
   return {
    createPdf: createPdf
  };
}



function datoOpcional(dato) {
  if (dato == null) {
    return "";
  }
  return dato;
}



function createDocumentDefinition(datos,$translate) {


  var vr = [[], []];
  vr[0] = [
    $translate.instant('REPORT.NAME'),
    $translate.instant('REPORT.EMAIL'),
    $translate.instant('REPORT.DESC')
  ];
  vr[1] = [
    datos.rNombre,
    datos.rEmail,
    datoOpcional(datos.rDescripcion)
  ];

  vr[2] = [
    $translate.instant('REPORT.VALOR_INMUEBLE'),
    $translate.instant('REPORT.VALOR_CREDITO'),
    $translate.instant('REPORT.MESES_CREDITO'),
    $translate.instant('REPORT.ABONO_CREDITO'),
    $translate.instant('REPORT.TASA_INTERES'),
    $translate.instant('REPORT.CUOTA')
  ];
  vr[3] = [
    datos.fVApartamento,
    datos.fValorCredito,
    datos.nMeses.toString(),
    datos.fVAbono,
    datos.tasa.toString(),
    datos.fCuota
  ];
  vr[4] = [
    $translate.instant('REPORT.PORC_CUOTA_INICIAL'),
    $translate.instant('REPORT.VAL_TOTAL_C_INICIAL'),
    $translate.instant('REPORT.ABONO_CUOTA_INCIAL'),
    $translate.instant('REPORT.VAL_CUOTA_MEN_INICIAL')
  ];
  vr[5] = [
    datos.pCuotaInicial.toString(),
    datos.fValorInicial,
    datos.fIniAbono,
    datos.fCuotaInicial
  ];
  vr[6] = [
    $translate.instant('REPORT.VAL_EST_ESCRITURAS'),
    $translate.instant('REPORT.VAL_EST_SEGURO'),
    $translate.instant('REPORT.VAL_CUOTA_SEGURO')
  ];
  vr[7] = [
    datos.fEscrituras,
    datos.fSeguros,
    datos.fCoutaSeguros
  ];

  //console.log($scope.datos);

  var dd = {

    // by default we use portrait, you can change it to landscape if you wish
    pageOrientation: 'landscape',
    content: [
      $translate.instant('REPORT.DATOS_BASICOS'),
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
      $translate.instant('REPORT.DATOS_INMUEBLE'),
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
      $translate.instant('REPORT.DATOS_CUOTA_INICIAL'),
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
      $translate.instant('REPORT.OTROS_VALORES'),
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


