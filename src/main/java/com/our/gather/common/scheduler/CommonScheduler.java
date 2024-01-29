package com.our.gather.common.scheduler;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.our.gather.common.common.CommandMap;
import com.our.gather.moimGather.service.GatherService;
import com.our.gather.notify.service.NotifyService;

@Component
public class CommonScheduler {

	@Resource(name = "GatherService")
	private GatherService gatherService;
	
	@Resource(name = "NotifyService")
	private NotifyService notifyService;

	//게더 스케줄러
	@Scheduled(fixedRate = 6000000) //현재 1시간마다 실행 -- 배포 시 5초로 변경.
	public void updateMoimStatus() throws Exception {
		
	    java.util.Date date = new java.util.Date();
	    SimpleDateFormat dateFormat = new SimpleDateFormat("yy/MM/dd HH:mm");
	    String currentDateString = dateFormat.format(date);

	    try {
	        // 현재 날짜 이전에 마감되지 않은 게더 가져오기
	        List<Map<String, Object>> gathList = gatherService.getEndedGahter(currentDateString);

	        if (!gathList.isEmpty()) {
	            // 가져온 게더에 대해 'ENDD_YSNO' 값을 업데이트
	            for (Map<String, Object> gathMap : gathList) {

	                String gathIdxx = (String) gathMap.get("GATH_IDXX");

	                // Map에 필요한 로직 수행
	                Map<String, Object> paramMap = new HashMap<>();
	                paramMap.put("GATH_IDXX", gathIdxx);

	                System.out.println("AUTO_ENDED for GATH_IDXX: " + gathIdxx + "when: " + currentDateString);
	                gatherService.setGatherEnd(paramMap);

	                CommandMap commandMap = new CommandMap();

	                commandMap.put("MOIM_IDXX", gathIdxx);
	                List<Map<String, Object>> memList = gatherService.getGatherMember(commandMap.getMap(), commandMap);

	                if (!memList.isEmpty()) {

	                    for (int i = 0; i < memList.size(); i++) {

	                        if (memList.get(i).get("MAST_YSNO").equals("N") && memList.get(i).get("WAIT_YSNO").equals("N") && memList.get(i).get("BANN_YSNO").equals("N")) {

	                            commandMap.put("BOAD_IDXX", memList.get(i).get("MOIM_IDXX"));
	                            commandMap.put("USER_NUMB", memList.get(i).get("USER_NUMB"));
	                            commandMap.put("SEND_USER", "null");
	                            commandMap.put("NOTI_CODE", "013");
	                            notifyService.insertNotify(commandMap.getMap(), commandMap);

	                        }

	                    }

	                }
	            }
	        }

	    } catch (Exception e) {
	        // 예외 처리 로직 추가
	        e.printStackTrace();
	    }
	}
}