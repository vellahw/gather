package com.our.gather.notify.service;

import java.util.Map;

import com.our.gather.common.common.CommandMap;

public interface NotifyService {

	
	//게더마감
	void insertNotify(Map<String, Object> map, CommandMap commondMap) throws Exception;
	
}
