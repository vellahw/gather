package com.our.gather.login.service;

import java.util.List;
import java.util.Map;

public interface LoginService {

   // 로그인
   Map<String, Object> login(Map<String, Object> map) throws Exception;
   
   // 로그인 배너이미지
   List<Map<String, Object>> loginBackImg(Map<String, Object> map) throws Exception;

   

}