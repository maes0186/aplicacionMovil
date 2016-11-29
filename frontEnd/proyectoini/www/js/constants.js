angular.module('starter')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('VARIABLES_UTILES', {
  tokenKey: 'tokenKey',
  AUTENTICACION_SATISFACTORIA : 'Autenticación Satisfactoria',
  AUTENTICACION_FALLIDA : 'Autenticación Fallida',
  PROBLEMAS_CONEXION : 'Se han presentado problemas de conexión por favor intente mas tarde',
  SIN_PRIVILEGIOS: 'Tu no tienes los priviligios para acceder a esta sección',
  NO_AUTORIZADO: 'No autorizado!',
  SESION_PERDIDA: 'Session Perdida!',
  FAVOR_VOLVER_LOGIN: 'Por favor, vuelve a loguearte',
  TITULO_FALLO_LOGIN: 'Fallo Login!'
})

.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
});


