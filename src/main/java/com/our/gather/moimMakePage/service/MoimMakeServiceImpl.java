package com.our.gather.moimMakePage.service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.moimMakePage.dao.MoimMakeDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Service("MoimMakeService")
public class MoimMakeServiceImpl implements MoimMakeService {

   @Resource(name = "MoimMakeDao")
   private MoimMakeDao moimMakeDao;

   @Resource(name = "fileUtils")
   private FileUtils fileUtils;

    // 모임 번호 채번
	@Override
	@Transactional(isolation = Isolation.SERIALIZABLE)
	public String makeMoimNumb(Map<String, Object> map, CommandMap commandMap) throws Exception {
		return moimMakeDao.makeMoimNumb(map, commandMap);
	}

	// 모임 개설
	@Transactional
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

		moimMakeDao.makeMoim(map, commandMap);

	}

	@Override
	@Transactional(isolation = Isolation.SERIALIZABLE)
	public void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception {
		moimMakeDao.moimJoin(map, commandMap);
	}

   
}