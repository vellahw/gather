package com.our.gather.main.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.our.gather.common.common.CommandMap;



public interface mainService {
	List<Map<String, Object>> menuList(Map<String, Object> map, HttpSession session, CommandMap commandMap) throws Exception;
}