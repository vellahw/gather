package com.our.gather.loginPage.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.our.gather.common.utils.FileUtils;
import com.our.gather.loginPage.dao.LoginDao;

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
    
    @Override
    public int loginCheck(Map<String, Object> map) throws Exception {
          return loginDao.loginCheck(map);
    }
    
    //로그인
    @Override
    public List<Map<String, Object>> loginBackImg(Map<String, Object> map) throws Exception {
    	
       return loginDao.loginBackImg(map);
    }

} 