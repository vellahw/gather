package com.our.gather.moimGather.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.CommonDao;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.moimGather.dao.GatherDao;

@Service("GatherService")
public class GatherServiceImpl implements GatherService {

	@Resource(name = "CommonDao")
	private CommonDao commonDao;

	@Resource(name = "GatherDao")
	private GatherDao gatherDao;

	@Resource(name = "fileUtils")
	private FileUtils fileUtils;

	// 게더 메인리스트
	@Override
	public List<Map<String, Object>> mainGather(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return gatherDao.mainGather(map, commandMap, session);
	}

	// 게더리스트
	@Override
	public List<Map<String, Object>> getGatherList(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
		}

		return gatherDao.getGatherList(map, commandMap, session);
	}

	// 게더 상세보기
	@Override
	public Map<String, Object> getGatherDetail(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return gatherDao.getGatherDetail(map, commandMap, session);
	}

	// 게더 이미지
	@Override
	public List<Map<String, Object>> getGatherImg(Map<String, Object> map, CommandMap commandMap) throws Exception {
		// TODO Auto-generated method stub

		return gatherDao.getGatherImg(map, commandMap);
	}

	// 게더 맴버 리스트
	@Override
	@Transactional(isolation = Isolation.READ_COMMITTED)
	public List<Map<String, Object>> getGatherMember(Map<String, Object> map, CommandMap commandMap,
			HttpSession session) throws Exception {
		// TODO Auto-generated method stub

		return gatherDao.getGatherMember(map, commandMap, session);
	}

	// 로그인 한 회원의 게더 참여 상황.
	@Override
	public Map<String, Object> getGatherYourState(Map<String, Object> map, HttpSession session, CommandMap commandMap)
			throws Exception {
		// TODO Auto-generated method stub

		if (session.getAttribute("USER_NUMB") != null) {

			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		}

		return gatherDao.getGatherYourState(map, commandMap, session);
	}

	// 게더 개설
	@Override
	public void makeGather(Map<String, Object> map, CommandMap commandMap, HttpServletRequest request,
	        HttpSession session) throws Exception {

	    try {
	        
	        map.put("FILE_IDXX", map.get("MOIM_IDXX"));
	        
	        List<Map<String, Object>> flist = fileUtils.fileInsert(map, request, session);

	        for (int i = 0, size = flist.size(); i < size; i++) {
	            
	            // commonDao.comFileInsert(flist.get(i)); // 이 부분은 이미지를 DB에 저장하는 부분인데 여기서 파일 저장하는 로직을 추가합니다.

	            if (flist.get(i).get("MAIN_YSNO").equals("Y")) {

	                map.put("FILE_SVNM", flist.get(i).get("FILE_SVNM"));

	            }

	            // fileUtils에서 생성된 경로로 변경된 파일 이름을 Map에 다시 설정
	            String originalFileName = (String) flist.get(i).get("FILE_OGNM");
	            String filenameFromBase64 = extractFilenameFromBase64(originalFileName);

	            // MOIM_CNTT에서 해당 base64 이미지 파일 찾아서 FILE_PATH 변경
	            Map<String, String> moimCnttMap = (Map<String, String>) map.get("MOIM_CNTT");
	            for (Map.Entry<String, String> entry : moimCnttMap.entrySet()) {
	                String base64Image = entry.getValue();
	                if (base64Image.contains(filenameFromBase64)) {
	                    moimCnttMap.put(entry.getKey(), originalFileName);
	                    break;
	                }
	            }
	        }

	    } catch (Exception e) {
	        
	        System.out.println("userJoin 오류 발생! " + e.getMessage());

	    }
	    
	    gatherDao.makeGather(map, commandMap); // 파일 처리 이후에 실행

	}

	// base64 데이터에서 파일 이름 추출하는 메서드
	private String extractFilenameFromBase64(String base64String) {
	    int startIndex = base64String.indexOf("data-filename=\"") + 15;
	    int endIndex = base64String.indexOf("\"", startIndex);
	    return base64String.substring(startIndex, endIndex);
	}
	
	// 게더 번호 채번
	public String makeGatherNumb() throws Exception {

		return gatherDao.makeGatherNumb();
	}

	// 게더 갯수 return
	public int getGatherCount(Map<String, Object> map, CommandMap commandMap) throws Exception {

		return gatherDao.getGatherCount(map, commandMap);
	}

	// 게더 마감
	@Override
	@Transactional(isolation = Isolation.SERIALIZABLE)
	public void setGatherEnd(Map<String, Object> map) throws Exception {
		gatherDao.setGatherEnd(map);
	}
}
