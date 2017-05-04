package org.aplicacion.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class BDUtil {
	private static final String PERSISTENCE_UNIT_NAME = "seguridadU";
	private static EntityManagerFactory factory;

	public static EntityManager getEM() {
		factory = getFactory();
		EntityManager em = factory.createEntityManager();
		return em;

	}

	public static EntityManagerFactory getFactory() {
		EntityManagerFactory factory = Persistence
				.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		return factory;

	}

}
