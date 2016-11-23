package org.aplicacion.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.aplicacion.util.BDUtil;
import org.seguridad.dto.TokenDto;

public class SeguridadDao {

	@SuppressWarnings("unchecked")
	public static List<TokenDto> obtenerTokenUsuario(String us, String pass) {
		List<TokenDto> retorno = new ArrayList<TokenDto>();
		try {

			EntityManager em = BDUtil.getEM();
			Query query = em
					.createQuery("SELECT u.nombre,r.nombreRol,u.username,u.cedula from UsuarioRol ur join ur.usuario u "
							+ "join ur.rol r where u.username=:us and u.password=:pass");
			query.setParameter("us", us);
			query.setParameter("pass", pass);
			List<Object[]> autenticados = query.getResultList();
			if (autenticados != null && autenticados.size() > 0)
				for (Object[] usuario : autenticados) {
					TokenDto tok = new TokenDto();
					tok.setNombre((String) usuario[0]);
					tok.setRol((String) usuario[1]);
					tok.setUsername((String) usuario[2]);
					tok.setCedula((String) usuario[3]);
					retorno.add(tok);

				}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return retorno;

	};

}
