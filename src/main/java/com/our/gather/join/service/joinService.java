package com.our.gather.join.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface joinService {

	// 회원PK채번
	Map<String, Object> getUserPK(Map<String, Object> map) throws Exception;

	// 회원가입
	void userJoin(Map<String, Object> map ,HttpServletRequest request) throws Exception;

}
