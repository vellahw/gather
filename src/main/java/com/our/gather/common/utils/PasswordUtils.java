package com.our.gather.common.utils;

import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public final class PasswordUtils {

	private static final String PREFIX = "PBKDF2";
	private static final int ITERATIONS = 210_000;
	private static final int KEY_LENGTH = 256;
	private static final SecureRandom RANDOM = new SecureRandom();

	private PasswordUtils() {
	}

	public static String hash(String password) {
		if (password == null || password.length() < 8 || password.length() > 128) {
			throw new IllegalArgumentException("Password must be between 8 and 128 characters");
		}
		byte[] salt = new byte[16];
		RANDOM.nextBytes(salt);
		byte[] derived = derive(password.toCharArray(), salt, ITERATIONS);
		return PREFIX + "$" + ITERATIONS + "$"
				+ Base64.getUrlEncoder().withoutPadding().encodeToString(salt) + "$"
				+ Base64.getUrlEncoder().withoutPadding().encodeToString(derived);
	}

	public static boolean matches(String password, String stored) {
		if (password == null || stored == null) {
			return false;
		}
		if (!stored.startsWith(PREFIX + "$")) {
			return MessageDigest.isEqual(password.getBytes(java.nio.charset.StandardCharsets.UTF_8),
					stored.getBytes(java.nio.charset.StandardCharsets.UTF_8));
		}
		try {
			String[] parts = stored.split("\\$");
			if (parts.length != 4) {
				return false;
			}
			int iterations = Integer.parseInt(parts[1]);
			byte[] salt = Base64.getUrlDecoder().decode(parts[2]);
			byte[] expected = Base64.getUrlDecoder().decode(parts[3]);
			byte[] actual = derive(password.toCharArray(), salt, iterations);
			return MessageDigest.isEqual(expected, actual);
		} catch (RuntimeException e) {
			return false;
		}
	}

	public static boolean needsUpgrade(String stored) {
		return stored == null || !stored.startsWith(PREFIX + "$" + ITERATIONS + "$");
	}

	private static byte[] derive(char[] password, byte[] salt, int iterations) {
		PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, KEY_LENGTH);
		try {
			return SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
		} catch (GeneralSecurityException e) {
			throw new IllegalStateException("PBKDF2 is unavailable", e);
		} finally {
			spec.clearPassword();
		}
	}
}
