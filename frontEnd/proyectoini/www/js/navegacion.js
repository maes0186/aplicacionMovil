angular.module('starter')

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
  })
  .state('main.reportes', {
    url: 'main/reportes',
    views: {
        'reportes-tab': {
          templateUrl: 'templates/reportes.html',
           controller: 'ReportesCtrl'
        }
    }
  });
  $urlRouterProvider.otherwise('/main/dash');
})