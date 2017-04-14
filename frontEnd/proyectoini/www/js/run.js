angular.module('starter')

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

    });
  })
  .run(['$window','$translate',function($window,$translate){
    var language=($window.navigator.userLanguage||$window.navigator.language).indexOf('en')==0?'en-us':'es-es';
      $translate.use(language);
  }])
