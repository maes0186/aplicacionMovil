package org.aplicacion.servicios;

import java.util.List;

import org.aplicacion.dao.SeguridadDao;
import org.seguridad.dto.TokenDto;

public class SeguridadService {
	
	public static List<TokenDto> obtenerToken(String us,String pass){
		return SeguridadDao.obtenerTokenUsuario(us, pass);
	}
	
	

}
