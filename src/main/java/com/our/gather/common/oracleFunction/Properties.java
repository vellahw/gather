package com.our.gather.common.oracleFunction;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Properties {
	
	public static String url;
    public static String username;
    public static String password;
    
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
}