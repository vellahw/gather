package com.our.gather.common.interceptor;

import org.apache.log4j.spi.Filter;
import org.apache.log4j.spi.LoggingEvent;

public class SQLFilter extends Filter {

    private String excludedKeyword;

    public String getExcludedKeyword() {
        return excludedKeyword;
    }

    public void setExcludedKeyword(String excludedKeyword) {
        this.excludedKeyword = excludedKeyword;
    }

    @Override
    public int decide(LoggingEvent event) {
        if (event.getMessage() != null && event.getMessage().toString().contains(excludedKeyword)) {
            // 특정 키워드가 포함된 경우 거부
            return Filter.DENY;
        } else {
            // 특정 키워드가 포함되지 않은 경우 허용
            return Filter.ACCEPT;
        }
    }
}