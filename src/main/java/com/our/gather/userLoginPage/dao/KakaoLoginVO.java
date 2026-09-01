package com.our.gather.userLoginPage.dao;

import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.our.gather.userLoginPage.service.KakaoLoginApi;

public class KakaoLoginVO {

	@Value("${app.kakao.clientId}")
	private String KAKAO_CLIENT_ID;

	@Value("${app.kakao.clientSecret}")
	private String KAKAO_CLIENT_SECRET;

	@Value("${app.base-url}")
	private String baseUrl;
	
	private final static String SESSION_STATE = "kakao_oauth_state";
	private final static String PROFILE_API_URL = "https://kapi.kakao.com/v2/user/me";

	public String getAuthorizationUrl(HttpSession session) {
		
		String state = generateRandomString();
		setSession(session, state);
		
		OAuth20Service oauthService = new ServiceBuilder()
			.apiKey(KAKAO_CLIENT_ID)
			.apiSecret(KAKAO_CLIENT_SECRET)
			.callback(baseUrl + "/gather/kakaoLoginDo.com")
			.state(state)
			.build(KakaoLoginApi.instance());
		
		return oauthService.getAuthorizationUrl();
	}

	public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws Exception {
		Object expected = session.getAttribute(SESSION_STATE);
		session.removeAttribute(SESSION_STATE);
		if (expected == null || !expected.equals(state)) {
			throw new IllegalArgumentException("Invalid OAuth state");
		}

		OAuth20Service oauthService = new ServiceBuilder()
			.apiKey(KAKAO_CLIENT_ID)
			.apiSecret(KAKAO_CLIENT_SECRET)
			.callback(baseUrl + "/gather/kakaoLoginDo.com")
			.state(state)
			.build(KakaoLoginApi.instance());
		
		OAuth2AccessToken accessToken = oauthService.getAccessToken(code);
		
		return accessToken;

	}

	public String getUserProfile(OAuth2AccessToken oauthToken) throws Exception {
		
		OAuth20Service oauthService = new ServiceBuilder()
				.apiKey(KAKAO_CLIENT_ID)
				.apiSecret(KAKAO_CLIENT_SECRET)
				.callback(baseUrl + "/gather/kakaoLoginDo.com")
				.build(KakaoLoginApi.instance());
		
		OAuthRequest request = new OAuthRequest(Verb.GET, PROFILE_API_URL, oauthService);
		oauthService.signRequest(oauthToken, request);
		Response response = request.send();
		if (response.getCode() < 200 || response.getCode() >= 300) {
			throw new IllegalStateException("Kakao profile request failed");
		}
		return response.getBody();
	}

	private String generateRandomString() {
		return UUID.randomUUID().toString();
	}

	private void setSession(HttpSession session, String state) {
		session.setAttribute(SESSION_STATE, state);
	}

}
