package com.our.gather.userLoginPage.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.our.gather.common.utils.PasswordUtils;
import com.our.gather.userLoginPage.dao.LoginDao;

@Service("LoginService")
public class LoginServiceImpl implements LoginService {

    @Resource(name = "loginDao")
    private LoginDao loginDao;

    //로그인
    @Override
    public Map<String, Object> login(Map<String, Object> map) throws Exception {
	   Map<String, Object> user = loginDao.login(map);
	   if (user == null) {
		   return null;
	   }
	   String supplied = String.valueOf(map.get("PASS_WORD"));
	   String stored = String.valueOf(user.remove("STORED_PASSWORD"));
	   if (!PasswordUtils.matches(supplied, stored)) {
		   return null;
	   }
	   if (PasswordUtils.needsUpgrade(stored)) {
		   java.util.HashMap<String, Object> upgrade = new java.util.HashMap<>();
		   upgrade.put("USER_IDXX", map.get("USER_IDXX"));
		   upgrade.put("PASS_WORD", PasswordUtils.hash(supplied));
		   loginDao.updatePassword(upgrade);
	   }
	   return user;
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
