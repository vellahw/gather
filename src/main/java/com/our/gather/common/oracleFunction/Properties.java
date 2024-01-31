package com.our.gather.common.oracleFunction;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Properties {
	
	public static String url;
    public static String username;
    public static String password;
    public static String NaverClientId;
    public static String NaverClientSecret;
    
    @Value("${spring.datasource.url}")
	public void setUrl(String url) {
    	Properties.url = url;
	}

    @Value("${spring.datasource.username}")
	public void setUsername(String username) {
    	Properties.username = username;
	}

    @Value("${spring.datasource.password}")
	public void setPassword(String password) {
    	Properties.password = password;
	}
    
    @Value("${app.naver.clientId}")
	public void setNaverClientId(String NaverClientId) {
    	Properties.NaverClientId = NaverClientId;
	}

    @Value("${app.naver.clientSecret}")
	public void setNaverClientSecret(String NaverClientSecret) {
    	Properties.NaverClientSecret = NaverClientSecret;
	}
}