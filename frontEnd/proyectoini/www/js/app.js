// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngInputCurrency','chart.js'])
// bower install angular-mocks --save
// <script src="lib/angular-mocks/angular-mocks.js"></script>
// https://docs.angularjs.org/api/ngMockE2E
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    abstract: true,
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  })
  .state('main.dash', {
    url: 'main/dash',
    views: {
        'dash-tab': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
    }
  })
  .state('main.calculos', {
    url: 'main/calculos',
    views: {
        'calculos-tab': {
          templateUrl: 'templates/calculos.html',
           controller: 'CalculosCtrl'
        }
    }
  })
  .state('main.comparar', {
    url: 'main/comparar',
    views: {
        'comparar-tab': {
          templateUrl: 'templates/comparar.html',
           controller: 'CompararCtrl'
        }
    }
  });
  $urlRouterProvider.otherwise('/main/dash');
})


.run(function ($rootScope, $state, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

  });
});
