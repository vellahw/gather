package com.our.gather.moimModifyPage.service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.moimModifyPage.dao.MoimDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Service("MoimService")
public class MoimServiceImpl implements MoimService {

   @Resource(name = "MoimDao")
   private MoimDao moimDao;

   @Resource(name = "fileUtils")
   private FileUtils fileUtils;
   
	// 모임 리스트
	@Override
	public List<Map<String, Object>> getMoimList(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		} else {
			commandMap.put("USER_NUMB", null);
		}


		return moimDao.getMoimList(map, commandMap, session);
	}

	// 모임 상세보기
	@Override
	public Map<String, Object> getMoimDetail(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return moimDao.getMoimDetail(map, commandMap, session);
	}

	// 모임 이미지
	@Override
	public List<Map<String, Object>> getMoimImg(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return moimDao.getMoimImg(map, commandMap);
	}

	// 모임 맴버 리스트
	@Override
	@Transactional(isolation = Isolation.READ_COMMITTED)
	public List<Map<String, Object>> getMoimMember(Map<String, Object> map, CommandMap commandMap,
			HttpSession session) throws Exception {
		// TODO Auto-generated method stub

		return moimDao.getMoimMember(map, commandMap, session);
	}

	// 로그인 한 회원의 모임 참여 상황.
	@Override
	public Map<String, Object> getMoimYourState(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return moimDao.getMoimYourState(map, commandMap, session);
	}

	// 모임 개설
	@Override
	public void makeMoim(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request,
			HttpSession session) throws Exception {

		try {

			map.put("FILE_IDXX", map.get("MOIM_IDXX"));
			
			String moimCntt = (String) map.get("MOIM_CNTT");
			
			moimCntt = moimCntt.replaceAll("src=\"data:image/[a-zA-Z0-9]+;base64,[^\"]+\"", "");// 기존 base64 형태의 src 를 replaceAll

			List<Map<String, Object>> flist = fileUtils.fileInsert(map, request, session);

			for (int i = 0, size = flist.size(); i < size; i++) {

				String originalFileName = (String) flist.get(i).get("FILE_OGNM");
				String dataFileName= "data-filename=\"" + originalFileName + "\""; 
				String newSrc = "src=\"" + flist.get(i).get("FILE_PATH").toString() + "\"";

				if (moimCntt.contains(dataFileName)) {

					moimCntt = moimCntt.replaceAll(dataFileName, newSrc); //기존 data-filename을 현src로 변경

				}
				
				if (flist.get(i).get("MAIN_YSNO").equals("Y")) {
					
					map.put("FILE_SVNM", flist.get(i).get("FILE_SVNM"));
					
				}
				
			}
			
			map.put("MOIM_CNTT", moimCntt);

		} catch (Exception e) {

			System.out.println("userJoin 오류 발생! " + e.getMessage());

		}

		moimDao.makeMoim(map, commandMap);

	}

	// 게더 갯수 return
	public int getMoimCount(Map<String, Object> map, CommandMap commandMap) throws Exception {

		return moimDao.getMoimCount(map, commandMap);
	}

	// 게더 마감
	@Override
	@Transactional(isolation = Isolation.SERIALIZABLE)
	public void setMoimEnd(Map<String, Object> map) throws Exception {
		moimDao.setMoimEnd(map);
	}
   
}