package com.our.gather.loginPage.dao;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.our.gather.loginPage.service.GoogleLoginApi;

public class GoogleLoginVO {

	@Value("${app.naver.clientId}")
	private String GOOGLE_CLIENT_ID;

	@Value("${app.naver.clientSecret}")
	private String GOOGLE_CLIENT_SECRET;

	private final static String REDIRECT_URI = "http://localhost:8080/gather/googleLoginDo.com";
	private final static String SESSION_STATE = "oauth_state";
	private final static String PROFILE_API_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

	public String getAuthorizationUrl(HttpSession session) {
			
			String state = generateRandomString();
			setSession(session, state);
	
			OAuth20Service oauthService = new ServiceBuilder()
					
				.apiKey(GOOGLE_CLIENT_ID)
				.apiSecret(GOOGLE_CLIENT_SECRET)
				.callback(REDIRECT_URI)
				.state(state) 
				.build(GoogleLoginApi.instance());
	
			return oauthService.getAuthorizationUrl();
	
	}

	public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws IOException {
		
		OAuth20Service oauthService = new ServiceBuilder()
			.apiKey(GOOGLE_CLIENT_ID)
			.apiSecret(GOOGLE_CLIENT_SECRET)
			.callback(REDIRECT_URI)
			.state(state)
			.build(GoogleLoginApi.instance());
			
		OAuth2AccessToken accessToken = oauthService.getAccessToken(code);
			
		return accessToken;
		
	}

	public String getUserProfile(OAuth2AccessToken oauthToken) throws IOException {
		
		OAuth20Service oauthService = new ServiceBuilder()
				.apiKey(GOOGLE_CLIENT_ID)
				.apiSecret(GOOGLE_CLIENT_SECRET)
				.callback(REDIRECT_URI)
				.build(GoogleLoginApi.instance());
		
		OAuthRequest request = new OAuthRequest(Verb.GET, PROFILE_API_URL, oauthService);
		oauthService.signRequest(oauthToken, request);
		Response response = request.send();
		return response.getBody();
	}
	
	private String generateRandomString() {

		return UUID.randomUUID().toString();

	}

	/* session에 데이터 저장 */
	private void setSession(HttpSession session, String state) {
		session.setAttribute(SESSION_STATE, state);

	}


}
