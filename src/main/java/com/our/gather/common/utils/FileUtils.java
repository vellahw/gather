package com.our.gather.common.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Component("fileUtils")
public class FileUtils {
	private static final String filePath = "/resources/img/";

	
	public List<Map<String, Object>> fileInsert(Map<String, Object> map, HttpServletRequest request) throws Exception {

		String realPath = "";
		String savePath = filePath;

		realPath = request.getRealPath(savePath);

		MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;

		Iterator<String> iterator = multipartHttpServletRequest.getFileNames();

		MultipartFile multipartFile = null;
		String originalFileName = null;
		String originalFileExtension = null;
		String storedFileName = null;

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> listMap = null;

		while (iterator.hasNext()) {
			multipartFile = multipartHttpServletRequest.getFile(iterator.next());
			if (multipartFile.isEmpty() == false) {

				originalFileName = multipartFile.getOriginalFilename();
				originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
				storedFileName = CommonUtils.getRandomString() + originalFileExtension;

				listMap = new HashMap<String, Object>();
				
				if (map.get("USER_NAME") != null) {
					
					File file = new File(realPath + "upload/profile/" + map.get("USER_NAME") + "/" + storedFileName);
					multipartFile.transferTo(file); // 프로필폴더에 업로드 처리
					
					// 배경 이미지는 input type = "file" name = "wallPaper" 로
					if (multipartFile.getName().equals("wallPaper")) {
						listMap.put("FILE_SEQC", "XXX");
					} else {
						listMap.put("FILE_SEQC", null);
					}
					
					listMap.put("FILE_IDXX", map.get("USER_NAME"));
					
				} else if (map.get("GATH_IDXX") != null) {
					
					File file = new File(realPath + "upload/gather/" + map.get("GATH_IDXX") + "/" + storedFileName);
					multipartFile.transferTo(file); // 게더폴더에 업로드 처리
					
					listMap.put("FILE_IDXX", map.get("GATH_IDXX"));

				} else if (map.get("CLUB_IDXX") != null) {
					
					File file = new File(realPath + "upload/club/" + map.get("CLUB_IDXX")+ "/" + storedFileName);
					multipartFile.transferTo(file); // 게더폴더에 업로드 처리
					
					listMap.put("FILE_IDXX", map.get("CLUB_IDXX"));
					
				} else if (map.get("CHAL_IDXX") != null) {
									
					File file = new File(realPath + "upload/challenge/" + map.get("CHAL_IDXX") + "/" + storedFileName);
					multipartFile.transferTo(file); // 게더폴더에 업로드 처리
					
					listMap.put("FILE_IDXX", map.get("GATH_IDXX"));
				
				} 
				
				listMap.put("FILE_OGNM", originalFileName);
				listMap.put("FILE_SVNM", storedFileName);
				listMap.put("FILE_SIZE", multipartFile.getSize());
				list.add(listMap);

			}
		}
		return list;
	}
}
