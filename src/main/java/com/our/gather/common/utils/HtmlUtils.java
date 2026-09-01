package com.our.gather.common.utils;

import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;

public final class HtmlUtils {

	private static final PolicyFactory RICH_TEXT = Sanitizers.FORMATTING
			.and(Sanitizers.BLOCKS)
			.and(Sanitizers.LINKS)
			.and(Sanitizers.IMAGES);

	private HtmlUtils() {
	}

	public static String sanitizeRichText(String html) {
		return html == null ? "" : RICH_TEXT.sanitize(html);
	}
}
