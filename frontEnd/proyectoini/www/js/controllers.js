angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.tokenUsuario=AuthService.authToken();
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'No autorizado!',
      template: 'Tu no tienes los proviligios para acceder a esta sección'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Perdida!',
      template: 'Por favor, vuleve a loguearte'
    });
  });
  $scope.setCurrentToken = function(token) {
    $scope.tokenUsuario = token;
  };

})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService,md5) {
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, md5.createHash(data.password)).then(function(authenticated) {
        $scope.setCurrentToken(AuthService.authToken());
       $state.go('main.dash', {}, {reload: true});
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Fallo Login!',
        template: 'Por favor verifique sus credenciales!'
      });
    });
  };
})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
      function(result) {
        $scope.response = result;
      });
  };

  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };

  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
});
