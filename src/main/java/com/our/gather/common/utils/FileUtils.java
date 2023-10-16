package com.our.gather.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

@Component("fileUtils")
public class FileUtils {
	 private static final String filePath = "/resources/img/";
	   
	 public Map<String,Object> profileInsert(Map<String,Object> map, HttpServletRequest request) throws Exception{
	     String realPath = "";
	     String savePath = filePath;
	      
	     realPath = request.getRealPath(savePath);
	      
	     File baseFile;
	      
	     if(map.get("GenderCheck").toString().equals("1")
	    		 ||
	    	map.get("GenderCheck").toString().equals("3")) {
	         baseFile = new File(realPath+"profile/base_m.png");
	     } else {
	         baseFile = new File(realPath+"profile/base_w.png");
	     }
	      
	     String fileExtension = CommonUtils.getRandomString();
	     File file2 = new File(realPath+"upload/"+fileExtension+".png");

	      
         long fsize1 = baseFile.length(); // 원본 파일 크기 변환
	        
	     FileInputStream fis = new FileInputStream(baseFile);
	     FileOutputStream fos = new FileOutputStream(file2);
	        
	     int input=0, count=0;
	        
	     byte[] data = new byte[1024];
	        
	     while((input = fis.read(data)) != -1){
	         fos.write(data, 0, input);
	         count+=input; 
	     }
	      
	     Map<String,Object> profile = new HashMap<>();
	      
	     profile.put("M_IDX", map.get("M_IDX"));
	     profile.put("F_ARTICLE", map.get("F_ARTICLE"));
	     profile.put("F_OGNAME",baseFile.getName());
	     profile.put("F_SVNAME", fileExtension+".png");
	     profile.put("F_SIZE", count/fsize1);
	         
	     return profile;
	 } 
}