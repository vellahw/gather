package com.our.gather.common.contorller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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

	//좋아요 insert
  @RequestMapping("/likeInert.com")
	public String likeInert(@RequestParam(value = "LIKE_IDXX", required = false) String LIKE_IDXX, HttpSession session,
				HttpServletRequest request, CommandMap commandMap) throws Exception {

		commandMap.put("LIKE_IDXX", LIKE_IDXX);
		commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		commonService.likeInsert(commandMap.getMap(), commandMap);

		String referer = request.getHeader("Referer");
	
		return "redirect:" + referer;
	}

	//좋아요 Delete
	@RequestMapping("/likeDelete.com")
	public String likeDelete(@RequestParam List<Map<Object, String>> LIKE_IDXX, HttpSession session,
			HttpServletRequest request, CommandMap commandMap) throws Exception {
		
		for(int i = 0; i < LIKE_IDXX.size(); i++) {
		
			commandMap.put("LIKE_IDXX", LIKE_IDXX.get(i).get("LIKE_IDXX"));
			commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

		commonService.likeDelete(commandMap.getMap(), commandMap);
		
		}

		String referer = request.getHeader("Referer");
		return "redirect:" + referer;
	}
}