package com.our.gather.common.filter;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class CsrfFilter implements Filter {

	public static final String SESSION_ATTRIBUTE = "CSRF_TOKEN";
	private static final SecureRandom RANDOM = new SecureRandom();

	@Override
	public void init(FilterConfig filterConfig) {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String path = httpRequest.getRequestURI().substring(httpRequest.getContextPath().length());
		if (path.startsWith("/resources/") || path.startsWith("/uploads/")) {
			chain.doFilter(request, response);
			return;
		}
		HttpSession session = httpRequest.getSession(true);

		String sessionToken = (String) session.getAttribute(SESSION_ATTRIBUTE);
		if (sessionToken == null) {
			byte[] bytes = new byte[32];
			RANDOM.nextBytes(bytes);
			sessionToken = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
			session.setAttribute(SESSION_ATTRIBUTE, sessionToken);
		}

		if (isUnsafe(httpRequest.getMethod())) {
			String requestToken = httpRequest.getHeader("X-CSRF-TOKEN");
			if (!constantTimeEquals(sessionToken, requestToken)) {
				httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
				httpResponse.setContentType("application/json;charset=UTF-8");
				httpResponse.getWriter().write("{\"error\":\"invalid_csrf_token\"}");
				return;
			}
		}

		chain.doFilter(request, response);
	}

	private boolean isUnsafe(String method) {
		return "POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method)
				|| "PATCH".equalsIgnoreCase(method) || "DELETE".equalsIgnoreCase(method);
	}

	private boolean constantTimeEquals(String expected, String actual) {
		if (expected == null || actual == null || expected.length() != actual.length()) {
			return false;
		}
		int difference = 0;
		for (int i = 0; i < expected.length(); i++) {
			difference |= expected.charAt(i) ^ actual.charAt(i);
		}
		return difference == 0;
	}

	@Override
	public void destroy() {
	}
}
