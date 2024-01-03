package com.our.gather.login.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.our.gather.common.utils.FileUtils;
import com.our.gather.login.dao.LoginDao;

@Service("LoginService")
public class LoginServiceImpl implements LoginService {

    @Resource(name = "loginDao")
    private LoginDao loginDao;

    @Resource(name = "fileUtils")
    private FileUtils fileUtils;

    //로그인
    @Override
    public Map<String, Object> login(Map<String, Object> map) throws Exception {
    	
       return loginDao.login(map);
    }
    
    //로그인
    @Override
    public List<Map<String, Object>> loginBackImg(Map<String, Object> map) throws Exception {
    	
       return loginDao.loginBackImg(map);
    }

} 