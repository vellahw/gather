package com.our.gather.notify.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.our.gather.common.common.CommandMap;
import com.our.gather.notify.service.NotifyService;

@Controller
public class NotifyController {

	@Resource(name = "NotifyService")
	private NotifyService notifyService;

	// 알림 insert
	@ResponseBody
	@RequestMapping("/insertNotify.com")
	public ResponseEntity<String> insertNotify(@RequestBody Map<String, String> map, HttpSession session,
			HttpServletRequest request, CommandMap commandMap) throws Exception {

		commandMap.put("USER_NUMB", map.get("POST_USER"));
		commandMap.put("SEND_USER", session.getAttribute("USER_NUMB"));
		commandMap.put("BOAD_IDXX", map.get("BOAD_IDXX"));
		commandMap.put("NOTI_CODE", map.get("NOTI_CODE"));
		notifyService.insertNotify(commandMap.getMap(), commandMap);

		return ResponseEntity.ok("Success");
	}

}