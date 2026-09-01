package com.our.gather.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class AuthenticationInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (request.getSession(false) != null
				&& request.getSession(false).getAttribute("USER_NUMB") != null) {
			return true;
		}
		String accept = request.getHeader("Accept");
		if ("GET".equalsIgnoreCase(request.getMethod()) && accept != null && accept.contains("text/html")) {
			response.sendRedirect(request.getContextPath() + "/gather/login.com");
			return false;
		}

		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write("{\"error\":\"authentication_required\"}");
		return false;
	}
}
