package com.our.gather.join.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.aspectj.weaver.patterns.IfPointcut.IfFalsePointcut;
import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.CommonDao;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.join.dao.JoinDao;

@Service("JoinService")
public class JoinServiceImpl implements JoinService {

	@Resource(name = "CommonDao")
	private CommonDao commonDao;

	@Resource(name = "JoinDao")
	private JoinDao joinDao;

	@Resource(name = "fileUtils")
	private FileUtils fileUtils;

	@Override
	public void userJoin(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request) throws Exception {

		String userNumbString = joinDao.makeUserNumb();
		map.put("USER_NUMB", userNumbString);
		commandMap.put("USER_NUMB", userNumbString);
		
		if(map.get("FILE_SVNM") == null) {

			try {
				
				List<Map<String, Object>> flist = fileUtils.fileInsert(map, request);
	
				for (int i = 0, size = flist.size(); i < size; i++) {
	
					commonDao.comFileInsert(flist.get(i));
	
					if (!flist.get(i).get("FILE_SEQC").equals("XXX")) {
	
						map.put("FILE_SVNM", flist.get(i).get("FILE_SVNM"));
						
					}
				}
	
			} catch (Exception e) {
				
	
			}
		}

		map.put("FILE_SVNM", "profile.jpg");//파일 준비 된다면 지워주세
		
		joinDao.joinUs(map, commandMap);

	}

	// 선호 카테고리 저장
	@Override
	public void inertCate(Map<String, Object> map, CommandMap commandMap) throws Exception {

		Map<String, Object> hsMap = new HashMap<>();

		hsMap.put("CATE_IDXX", map.get("CATE_IDXX"));
		hsMap.put("USER_NUMB", map.get("USER_NUMB"));

		int result = joinDao.checkCategoryIsin(hsMap);

		if (result == 0) {

			joinDao.inertCate(map, commandMap);

		} else {

			joinDao.updateNewstCate(map, commandMap);
		}

	}

	// 선호 카테고리 저장
	@Override
	public void insertRegi(Map<String, Object> map, CommandMap commandMap) throws Exception {

		joinDao.insertRegi(map, commandMap);

	}

	// 아이디 중복 검사
	@Override
	public Map<String, Object> checkId(Map<String, Object> map) throws Exception {
		return joinDao.checkId(map);
	}

	// 닉네임 중복 검사
	@Override
	public Map<String, Object> checkNick(Map<String, Object> map) throws Exception {
		return joinDao.checkNick(map);
	}

}
