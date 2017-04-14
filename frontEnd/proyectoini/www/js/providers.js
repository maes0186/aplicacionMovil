angular.module('starter').provider('calculos', ['TIPO_FINANCIACION', function (TIPO_FINANCIACION) {
  var TIPO_CALCULO = '';
  this.setTipoCalculo = function (TCALCULO) {
    TIPO_CALCULO = TCALCULO;
  };

  this.$get = function () {
    var calcularCuota = null;
    var obtenerValorCredito = null;

//Funciones globales
    var formatearValoresMoneda = function (numero) {
      if (isNaN(numero)) return '$0';
      return '$' + numero.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

//Calculos para solo pesos
    if (TIPO_CALCULO == TIPO_FINANCIACION.PESOS) {
      var calcularCuota = function (datos, tasa) {
        var valorCredito = obtenerValorCredito(datos);
        var i = tasa / 1200;
        var comun = Math.pow(1 + i, datos.nMeses);
        var numerador = valorCredito * comun * i;
        var denominador = comun - 1;
        var cuota = numerador / denominador;
        return cuota;
      };
      var obtenerValorCredito = function (datos) {
        var pCredito = 100 - datos.pCuotaInicial;
        var valorCredito = datos.vApartamento * pCredito / 100 - datos.vAbono;
        return valorCredito;
      };
      var obtenerDatos = function (datos) {
        datos.cuota = calcularCuota(datos, datos.tasa);
        datos.vIniValorInicial = datos.vApartamento * datos.pCuotaInicial / 100;
        datos.fValorInicial = formatearValoresMoneda(datos.vIniValorInicial);
        datos.fVApartamento = formatearValoresMoneda(datos.vApartamento);
        datos.fVAbono = formatearValoresMoneda(datos.vAbono);
        datos.fIniAbono = formatearValoresMoneda(datos.iniAbono);
        datos.fCuotaInicial = formatearValoresMoneda((datos.vIniValorInicial - datos.iniAbono) / datos.iniMeses);
        datos.fSeguros = formatearValoresMoneda(((datos.vIniValorInicial - datos.iniAbono) / datos.iniMeses) * 2.2 / 100);
        datos.fCoutaSeguros = formatearValoresMoneda(((datos.vIniValorInicial - datos.iniAbono) / datos.iniMeses) * 2.2 / 100 + datos.cuota);
        datos.fEscrituras = formatearValoresMoneda(datos.vApartamento * 2.5 / 100);
        datos.fFaltanteIni = formatearValoresMoneda(datos.vIniValorInicial - datos.iniAbono);
        datos.fValorCredito = formatearValoresMoneda(obtenerValorCredito(datos));
        datos.fCuota = formatearValoresMoneda(datos.cuota);
        return datos;
      }
    }



    return {
      calcularCuota: calcularCuota,
      obtenerValorCredito: obtenerValorCredito,
      obtenerDatos: obtenerDatos,
      formatearValoresMoneda: formatearValoresMoneda

    };
  };

}]);