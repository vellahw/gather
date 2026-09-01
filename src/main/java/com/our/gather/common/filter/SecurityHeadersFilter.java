package com.our.gather.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SecurityHeadersFilter implements Filter {
	@Override
	public void init(FilterConfig filterConfig) {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		httpResponse.setHeader("X-Content-Type-Options", "nosniff");
		httpResponse.setHeader("X-Frame-Options", "DENY");
		httpResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
		httpResponse.setHeader("Permissions-Policy", "geolocation=(self), camera=(), microphone=()");
		httpResponse.setHeader("Content-Security-Policy",
				"object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");
		if (httpRequest.isSecure()) {
			httpResponse.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
	}
}
