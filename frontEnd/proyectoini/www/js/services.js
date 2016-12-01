angular.module('starter')

  .service('AuthService', function ($q, $http, USER_ROLES,VARIABLES_UTILES) {
    var LOCAL_TOKEN_KEY = VARIABLES_UTILES.tokenKey;
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;
    
    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    var formatearValoresMoneda=function (numero) {
      return '$'+numero.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    function useCredentials(token) {
      role = token[0].rol;
      isAuthenticated = true;
      authToken = token[0];

      // Set the token as header for your requests!
      $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['X-Auth-Token'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var login = function (name, pw) {
      return $q(function (resolve, reject) {


        var someData = [];
        $http.get('http://desktop-d4s7vsd:8091/ModeloRestv3/rest/autenticacion/getToken?us=' + name + '&pass=' + pw)
          .success(function (posts) {

            if (posts.length == 1) {
              storeUserCredentials(posts);
              resolve(VARIABLES_UTILES.AUTENTICACION_SATISFACTORIA);
            }
            else {
              console.log("Problemas de login");
              reject(VARIABLES_UTILES.AUTENTICACION_FALLIDA);
            }

          }).error(function (data, status){
                console.log("Error status : " + status);
                reject(VARIABLES_UTILES.PROBLEMAS_CONEXION);
            });
      });
    };

    var logout = function () {
      destroyUserCredentials();
    };

    var isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    return {
      login: login,
      logout: logout,
      isAuthorized: isAuthorized,
      isAuthenticated: function () { return isAuthenticated; },
      authToken: function () { return authToken; },
      formatearValoresMoneda:formatearValoresMoneda
      
    };
  })


  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
