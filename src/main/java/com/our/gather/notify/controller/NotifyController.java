package com.our.gather.notify.controller;

import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.our.gather.common.common.CommandMap;
import com.our.gather.moimDetailPage.service.MoimDetailService;
import com.our.gather.notify.service.NotifyService;

@Controller
public class NotifyController {

	@Resource(name = "NotifyService")
	private NotifyService notifyService;

	@Resource(name = "MoimDetailService")
	private MoimDetailService moimDetailService;

	private static final Set<String> CLIENT_NOTIFICATION_CODES = Set.of(
			"A01", "A02", "A03", "A07", "B01", "B02", "B03", "B04");

	// 알림 insert
	@ResponseBody
	@RequestMapping(value = "/insertNotify.com", method = RequestMethod.POST)
	public ResponseEntity<String> insertNotify(@RequestBody Map<String, String> map, HttpSession session,
			HttpServletRequest request, CommandMap commandMap) throws Exception {

		String sender = String.valueOf(session.getAttribute("USER_NUMB"));
		String receiver = map.get("POST_USER");
		String moimId = map.get("BOAD_IDXX");
		String code = map.get("NOTI_CODE");
		if (receiver == null || moimId == null || !moimId.startsWith("GT")
				|| !CLIENT_NOTIFICATION_CODES.contains(code)
				|| !moimDetailService.isMoimRelatedUser(moimId, sender)
				|| !moimDetailService.isMoimRelatedUser(moimId, receiver)) {
			return ResponseEntity.status(403).body("Forbidden");
		}

		commandMap.put("USER_NUMB", receiver);
		commandMap.put("SEND_USER", sender);
		commandMap.put("BOAD_IDXX", moimId);
		commandMap.put("NOTI_CODE", code);
		notifyService.insertNotify(commandMap.getMap(), commandMap);

		return ResponseEntity.ok("Success");
	}

	//알림 읽음 처리
	@ResponseBody
	@RequestMapping(value = "/updateReadNoti.com", method = RequestMethod.POST)
	public ResponseEntity<String> updateReadNoti(@RequestBody Map<String, String> map, HttpSession session,
			HttpServletRequest request, CommandMap commandMap) throws Exception {

		commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));
		
		if(map.get("NOTI_SEQC") != null) {
			
			commandMap.put("NOTI_SEQC", map.get("NOTI_SEQC"));
			
		}
		
		notifyService.updateReadNoti(commandMap.getMap(), commandMap);

		return ResponseEntity.ok("Success");
	}

}
