package com.our.gather.common.utils;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class PasswordUtilsTest {
	@Test
	public void hashesAndVerifiesPassword() {
		String hash = PasswordUtils.hash("Gather!234");
		assertTrue(hash.startsWith("PBKDF2$"));
		assertTrue(PasswordUtils.matches("Gather!234", hash));
		assertFalse(PasswordUtils.matches("wrong-password", hash));
	}

	@Test
	public void recognizesLegacyPasswordForMigration() {
		assertTrue(PasswordUtils.matches("legacy-password", "legacy-password"));
		assertTrue(PasswordUtils.needsUpgrade("legacy-password"));
	}
}
