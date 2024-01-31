package com.our.gather.loginPage.dao;

import java.util.UUID;

import javax.servlet.http.HttpSession;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.our.gather.loginPage.service.KakaoLoginApi;

public class KakaoLoginVO {

	// 카카오 로그인 정보
	private final static String KAKAO_CLIENT_ID = "7d515e888ba6e720cb19a43a8f397583";
	private final static String KAKAO_CLIENT_SECRET = "5DbsOOvIYvyYzpg9JnL4WDjLQp45Hgom";
	private final static String KAKAO_REDIRECT_URI = "http://localhost:8080/gather/kakaoLoginDo.com"; //Redirect URL
	private final static String SESSION_STATE = "kakao_oauth_state";
	private final static String PROFILE_API_URL = "https://kapi.kakao.com/v2/user/me";

	public String getAuthorizationUrl(HttpSession session) {
		String state = generateRandomString();
		setSession(session, state);
		OAuth20Service oauthService = new ServiceBuilder()
				.apiKey(KAKAO_CLIENT_ID)
				.apiSecret(KAKAO_CLIENT_SECRET)
				.callback(KAKAO_REDIRECT_URI)
				.state(state).build(KakaoLoginApi.instance());
		return oauthService.getAuthorizationUrl();
	}

	public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws Exception {
		
		OAuth20Service oauthService = new ServiceBuilder()
				.apiKey(KAKAO_CLIENT_ID)
				.apiSecret(KAKAO_CLIENT_SECRET)
				.callback(KAKAO_REDIRECT_URI)
				.state(state).build(KakaoLoginApi.instance());
		OAuth2AccessToken accessToken = oauthService.getAccessToken(code);
		return accessToken;
	
	
	}

	public String getUserProfile(OAuth2AccessToken oauthToken) throws Exception {
		OAuth20Service oauthService = new ServiceBuilder()
				.apiKey(KAKAO_CLIENT_ID)
				.apiSecret(KAKAO_CLIENT_SECRET)
				.callback(KAKAO_REDIRECT_URI)
				.build(KakaoLoginApi.instance());
		OAuthRequest request = new OAuthRequest(Verb.GET, PROFILE_API_URL, oauthService);
		oauthService.signRequest(oauthToken, request);
		Response response = request.send();
		return response.getBody();
	}
	
	private String generateRandomString() {
		return UUID.randomUUID().toString();
	}

	private void setSession(HttpSession session, String state) {
		session.setAttribute(SESSION_STATE, state);
	}

	private String getSession(HttpSession session) {
		return (String) session.getAttribute(SESSION_STATE);
	}
}