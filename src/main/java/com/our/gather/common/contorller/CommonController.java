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
import com.our.gather.notify.service.NotifyService;
import com.our.gather.scheduler.service.SchedulerService;

@Controller
public class CommonController {

	@Resource(name = "CommonService")
	private CommonService commonService;
	
	@Resource(name = "NotifyService")
	private NotifyService notifyService;
	
	@Resource(name = "SchedulerService")
	private SchedulerService schedulerService;

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
				
				commandMap.put("MOIM_IDXX", item.get("LIKE_IDXX"));
				List<Map<String, Object>> memList = schedulerService.getGatherMemberForSD(commandMap.getMap(), commandMap);
				
				for (int i = 0; i < memList.size(); i++) {
					
					if(memList.get(i).get("MAST_YSNO").equals("Y")) { //본인이 아닌 방장에게 전송
						
						if(!session.getAttribute("USER_NUMB").equals(memList.get(i).get("USER_NUMB"))) {
							
							commandMap.put("BOAD_IDXX", item.get("LIKE_IDXX"));
							commandMap.put("SEND_USER", (String) session.getAttribute("USER_NUMB"));
							commandMap.put("USER_NUMB", (String) memList.get(i).get("USER_NUMB"));
							commandMap.put("NOTI_CODE", "A05");
							
							notifyService.insertNotify(commandMap.getMap(), commandMap);
						}
						
					}

				}

			} else {

				commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
				commandMap.put("LIKE_IDXX", item.get("LIKE_IDXX"));
				commonService.likeDelete(commandMap.getMap(), commandMap);
			}
		}

		return ResponseEntity.ok("success");
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
	    	
	    	if(folwCode.equals("FI")) {
	    		
	        	commonService.unfollow(commandMap.getMap(), commandMap);
	        	
	    	} else {
	    	
	    		commonService.follow(commandMap.getMap(), commandMap);
	    	
	    	}
	
	    	return ResponseEntity.ok("success");
	    	
	            
	    } catch(Exception e) {
	    	
	    	
	    	System.out.println("error : " + e.getMessage());       
	    	return ResponseEntity.ok("fail");    	
	    }
	}

}