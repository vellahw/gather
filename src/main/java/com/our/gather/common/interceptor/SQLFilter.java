package com.our.gather.common.interceptor;

import org.apache.log4j.spi.Filter;
import org.apache.log4j.spi.LoggingEvent;

public class SQLFilter extends Filter {
	
	@Override
	public int decide(LoggingEvent event) {
		String message = event.getMessage().toString();
		if (message.contains("NOT_SQL_LOG")) {
			return DENY;
		} else {
			return NEUTRAL;
		}
	}
}
