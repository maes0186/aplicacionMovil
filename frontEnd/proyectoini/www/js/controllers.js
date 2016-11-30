angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS,VARIABLES_UTILES) {
  $scope.tokenUsuario=AuthService.authToken();
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: VARIABLES_UTILES.NO_AUTORIZADO,
      template: VARIABLES_UTILES.SIN_PRIVILEGIOS
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: VARIABLES_UTILES.SESION_PERDIDA,
      template: VARIABLES_UTILES.FAVOR_VOLVER_LOGIN
    });
  });
  $scope.setCurrentToken = function(token) {
    $scope.tokenUsuario = token;
  };

})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService,md5,VARIABLES_UTILES) {
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, md5.createHash(data.password)).then(function(authenticated) {
        $scope.setCurrentToken(AuthService.authToken());
       $state.go('main.dash', {}, {reload: true});
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: VARIABLES_UTILES.TITULO_FALLO_LOGIN,
        template: err
      });
    });
  };
})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

 

 
});
