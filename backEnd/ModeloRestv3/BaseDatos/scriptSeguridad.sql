-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.16-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para user_app_schema
DROP DATABASE IF EXISTS `user_app_schema`;
CREATE DATABASE IF NOT EXISTS `user_app_schema` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `user_app_schema`;

-- Volcando estructura para tabla user_app_schema.rol
DROP TABLE IF EXISTS `rol`;
CREATE TABLE IF NOT EXISTS `rol` (
  `idrol` int(11) NOT NULL AUTO_INCREMENT,
  `nombreRol` varchar(45) NOT NULL,
  PRIMARY KEY (`idrol`),
  UNIQUE KEY `nombreRol_UNIQUE` (`nombreRol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla user_app_schema.rol: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`idrol`, `nombreRol`) VALUES
	(2, 'admin_role'),
	(1, 'public_role');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;

-- Volcando estructura para tabla user_app_schema.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `cedula` varchar(45) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `una_UNIQUE` (`username`),
  UNIQUE KEY `dos_UNIQUE` (`password`),
  UNIQUE KEY `tres_UNIQUE` (`nombre`),
  UNIQUE KEY `cuatro_UNIQUE` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla user_app_schema.usuario: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`idusuario`, `username`, `password`, `nombre`, `cedula`) VALUES
	(1, 'usuario1', '122b738600a0f74f7c331c0ef59bc34c', 'Mario Esteban Ortega Garces', '1'),
	(2, 'usuario2', '2fb6c8d2f3842a5ceaa9bf320e649ff0', 'Pepe Perez', '2');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Volcando estructura para tabla user_app_schema.usuario_rol
DROP TABLE IF EXISTS `usuario_rol`;
CREATE TABLE IF NOT EXISTS `usuario_rol` (
  `idUsuario` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idUsuarioRol` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idUsuarioRol`),
  KEY `fkRol_idx` (`idRol`),
  KEY `fkUsuario_idx` (`idUsuario`),
  CONSTRAINT `fkRol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idrol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fkUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla user_app_schema.usuario_rol: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` (`idUsuario`, `idRol`, `idUsuarioRol`) VALUES
	(1, 1, 1),
	(2, 2, 2);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
