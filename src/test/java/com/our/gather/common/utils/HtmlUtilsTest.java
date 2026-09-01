package com.our.gather.common.utils;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class HtmlUtilsTest {
	@Test
	public void removesExecutableMarkupAndKeepsFormatting() {
		String sanitized = HtmlUtils.sanitizeRichText(
				"<p><strong>게더</strong><script>alert(1)</script><a href=\"javascript:alert(2)\">link</a></p>");
		assertTrue(sanitized.contains("<strong>게더</strong>"));
		assertFalse(sanitized.contains("<script"));
		assertFalse(sanitized.contains("javascript:"));
	}
}
