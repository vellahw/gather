package com.our.gather.userJoinPage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.CommonDao;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.userJoinPage.dao.JoinDao;

@Service("JoinService")
public class JoinServiceImpl implements JoinService {

	@Resource(name = "CommonDao")
	private CommonDao commonDao;

	@Resource(name = "JoinDao")
	private JoinDao joinDao;

	@Resource(name = "fileUtils")
	private FileUtils fileUtils;

	@Override
	public void userJoin(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request,
			HttpSession session) throws Exception {

		try {
			
			map.put("FILE_IDXX",map.get("USER_NUMB"));
			
			List<Map<String, Object>> flist = fileUtils.fileInsert(map, request, session);

			for (int i = 0, size = flist.size(); i < size; i++) {

				if (flist.get(i).get("FILE_SEQC") == null) {

					map.put("FILE_SVNM", flist.get(i).get("FILE_SVNM"));

				}
			}

		} catch (Exception e) {
			System.out.println("userJoin 오류 발생! " + e.getMessage());

		}

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
	public String makeUserNumb() throws Exception {

		return joinDao.makeUserNumb();

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