package com.our.gather.common.contorller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;

@Controller
public class CommonController {

	@Resource(name = "CommonService")
	private CommonService commonService;

	@ResponseBody
	@RequestMapping(value = "/cateGory.get", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> getCategory(HttpSession session, CommandMap commandMap) throws Exception {

		List<Map<String, Object>> getCategroy = commonService.getCategory(commandMap.getMap(), commandMap);

		return getCategroy;
	}

	// 좋아요 update
	@Transactional
	@RequestMapping("/likeUpdate.com")
	public ResponseEntity<String> likeUpdate(@RequestBody List<Map<String, String>> jsonArray, HttpSession session,
			HttpServletRequest request, CommandMap commandMap) throws Exception {

		for (Map<String, String> item : jsonArray) {
			String clikeYsno = item.get("CLIKE_YSNO");
			if ("1".equals(clikeYsno)) {

				commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
				commandMap.put("LIKE_IDXX", item.get("LIKE_IDXX"));
				commonService.likeInsert(commandMap.getMap(), commandMap);

			} else {

				commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
				commandMap.put("LIKE_IDXX", item.get("LIKE_IDXX"));
				commonService.likeDelete(commandMap.getMap(), commandMap);
			}
		}

		return ResponseEntity.ok("Success");
	}

	// 좋아요 update
	@Transactional
	@RequestMapping("/followUpdate.com")
	public ResponseEntity<String> followUpdate(@RequestBody Map<String, String> responseMap, HttpSession session,
			HttpServletRequest request, CommandMap commandMap) throws Exception {

		String folwCode = responseMap.get("folwCode");
		String folwUser = responseMap.get("folwUser");
		
		commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
		commandMap.put("FOLW_USER", folwUser);
	
	    try {
	    	
	    	if(folwCode.equals("FW")) {
	    		
	        	commonService.follow(commandMap.getMap(), commandMap);
	        	
	    	} else {
	    	
	    		commonService.unfollow(commandMap.getMap(), commandMap);
	    	
	    	}
	
	    	return ResponseEntity.ok("Success");
	    	
	            
	    } catch(Exception e) {
	    	
	    	
	    	System.out.println("error : " + e.getMessage());       
	    	return ResponseEntity.ok("fail");    	
	    }
	}

}