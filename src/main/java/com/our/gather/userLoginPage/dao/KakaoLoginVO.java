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
	
	private final static String KAKAO_REDIRECT_URI = "http://localhost:8080/gather/kakaoLoginDo.com"; // Redirect URL
	private final static String SESSION_STATE = "kakao_oauth_state";
	private final static String PROFILE_API_URL = "https://kapi.kakao.com/v2/user/me";

	public String getAuthorizationUrl(HttpSession session) {
		
		String state = generateRandomString();
		setSession(session, state);
		
		OAuth20Service oauthService = new ServiceBuilder()
			.apiKey(KAKAO_CLIENT_ID)
			.apiSecret(KAKAO_CLIENT_SECRET)
			.callback(KAKAO_REDIRECT_URI)
			.state(state)
			.build(KakaoLoginApi.instance());
		
		return oauthService.getAuthorizationUrl();
	}

	public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws Exception {

		OAuth20Service oauthService = new ServiceBuilder()
			.apiKey(KAKAO_CLIENT_ID)
			.apiSecret(KAKAO_CLIENT_SECRET)
			.callback(KAKAO_REDIRECT_URI)
			.state(state)
			.build(KakaoLoginApi.instance());
		
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

}