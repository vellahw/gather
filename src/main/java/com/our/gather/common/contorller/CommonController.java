package com.our.gather.common.contorller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

	//좋아요 update
	@RequestMapping("/likeUpdate.com")
	public ResponseEntity<String> likeUpdate(@RequestBody List<Map<String, String>> jsonArray, HttpSession session,
				HttpServletRequest request, CommandMap commandMap) throws Exception {
		
		for (Map<String, String> item : jsonArray) {
            String clikeYsno = item.get("CLIKE_YSNO");
            if ("1".equals(clikeYsno)) {

            	commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
            	commandMap.put("LIKE_IDXX", item.get("CLIKE_YSNO"));
            	commonService.likeInsert(commandMap.getMap(), commandMap);
		
            } else {
                
            	commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
            	commandMap.put("LIKE_IDXX", item.get("CLIKE_YSNO"));
            	commonService.likeDelete(commandMap.getMap(), commandMap);
            }
        }
	
		return ResponseEntity.ok("Success");
	}

}