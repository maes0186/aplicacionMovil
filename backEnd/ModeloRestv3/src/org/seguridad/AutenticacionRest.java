package org.seguridad;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.aplicacion.servicios.SeguridadService;
import org.seguridad.dto.TokenDto;

@Path("/autenticacion")
public class AutenticacionRest {

	@GET
	@Path("/getToken")
	@Produces(MediaType.APPLICATION_JSON)
	public Response obtenerServio(@QueryParam("us") String us,
			@QueryParam("pass") String pass) {
		List<TokenDto> retorno = null;
		try {
			retorno = SeguridadService.obtenerToken(us, pass);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok(retorno).header("Access-Control-Allow-Origin", "*")
				.build();

	}
}
