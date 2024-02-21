package com.our.gather.common.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Component("fileUtils")
public class FileUtils {

	private static final String filePath = "/resources/img/upload/";

	public List<Map<String, Object>> fileInsert(Map<String, Object> map, HttpServletRequest request,
			HttpSession session) throws Exception {

		String realPath = "";
		String savePath = filePath;

		realPath = request.getServletContext().getRealPath(savePath);

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
				
				listMap.put("FILE_IDXX", map.get("FILE_IDXX"));

				String fileType = ((String) map.get("FILE_IDXX")).substring(0, 2);

				if (fileType.equals("UR")) {

					String profileFolderPath = realPath + "profile/" + map.get("FILE_IDXX") + "/";

					File profileFolder = new File(profileFolderPath);

					if (!profileFolder.exists()) {
						profileFolder.mkdirs(); //
					}

					File file = new File(profileFolderPath + storedFileName);

					multipartFile.transferTo(file);

					if (multipartFile.getName().equals("wallPaper")) {

						listMap.put("FILE_SEQC", "XXX");

					} else {

						listMap.put("FILE_SEQC", null);

					}

					
					listMap.put("USER_NUMB", map.get("FILE_IDXX"));
					listMap.put("FILE_PATH", filePath + "profile/" + map.get("FILE_IDXX") + "/" + storedFileName);

				} else if (fileType.equals("GT")) {
					
					System.out.println("파일명 :" + multipartFile.getName());

					String profileFolderPath = realPath + "gather/" + map.get("FILE_IDXX") + "/";

					File profileFolder = new File(profileFolderPath);

					if (!profileFolder.exists()) {
						profileFolder.mkdirs();
					}

					File file = new File(profileFolderPath + storedFileName);
					multipartFile.transferTo(file);

					listMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
					listMap.put("FILE_PATH", filePath + "gather/" + map.get("FILE_IDXX") + "/" + storedFileName);

				} else if (fileType.equals("CB")) {

					String profileFolderPath = realPath + "club/" + map.get("CLUB_IDXX") + "/";
					File profileFolder = new File(profileFolderPath);
					if (!profileFolder.exists()) {
						profileFolder.mkdirs();
					}
					File file = new File(profileFolderPath + storedFileName);
					multipartFile.transferTo(file);

					listMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
					listMap.put("FILE_PATH", filePath + "club/" + map.get("FILE_IDXX") + "/" + storedFileName);

				} else if (fileType.equals("CH")) {

					String profileFolderPath = realPath + "challenge/" + map.get("FILE_IDXX") + "/";
					File profileFolder = new File(profileFolderPath);
					if (!profileFolder.exists()) {
						profileFolder.mkdirs();
					}
					File file = new File(profileFolderPath + storedFileName);
					multipartFile.transferTo(file);

					listMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
					listMap.put("FILE_PATH", filePath + "challenge/" + map.get("FILE_IDXX") + "/" + storedFileName);
				}
			}

			if (multipartFile.getName().equals("mainImage")) {

				listMap.put("MAIN_YSNO", "Y");

			} else {

				listMap.put("MAIN_YSNO", "N");

			}

			listMap.put("FILE_OGNM", originalFileName);
			listMap.put("FILE_SVNM", storedFileName);
			listMap.put("FILE_SIZE", multipartFile.getSize());

			list.add(listMap);

		}

		return list;
	}
}
