package com.our.gather.userLoginPage.service;

import org.springframework.stereotype.Component;

import com.github.scribejava.core.builder.api.DefaultApi20;

@Component
public class GoogleLoginApi extends DefaultApi20 {
    protected GoogleLoginApi() {
    }

    private static class InstanceHolder {
        private static final GoogleLoginApi INSTANCE = new GoogleLoginApi();
    }

    public static GoogleLoginApi instance() {
        return InstanceHolder.INSTANCE;
    }

    @Override
    public String getAccessTokenEndpoint() {
        return "https://oauth2.googleapis.com/token";
    }

    @Override
    protected String getAuthorizationBaseUrl() {
        return "https://accounts.google.com/o/oauth2/v2/auth";
    }
}