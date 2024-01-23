package com.our.gather.moimGather.scheduler;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.our.gather.moimGather.service.GatherService;

@Component
public class GatherScheduler {

	@Resource(name = "GatherService")
	private GatherService gatherService;

	//게더 스케줄러
	@Scheduled(fixedRate = 6000000) //현재 1시간마다 실행 -- 배포 시 5초로 변경.
	public void updateMoimStatus() throws Exception {
		// 현재 날짜 및 시간을 얻어오는 로직
		java.util.Date Date = new java.util.Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yy/MM/dd HH:mm");
		String currentDateString = dateFormat.format(Date);

		 try {
		        // 현재 날짜 이전에 마감되지 않은 게더 가져오기
		        List<Map<String, Object>> gathList = gatherService.getEndedGahter(currentDateString);

		        if (!gathList.isEmpty()) {
		            // 가져온 게더에 대해 'ENDD_YSNO' 값을 업데이트하는 로직
		            for (Map<String, Object> gathMap : gathList) {
		            	
		                String gathIdxx = (String) gathMap.get("GATH_IDXX");
		                
		                // Map에 필요한 로직 수행
		                Map<String, Object> paramMap = new HashMap<>();
		                paramMap.put("GATH_IDXX", gathIdxx);
		                
		                System.out.println("AUTO_ENDED for GATH_IDXX: " + gathIdxx + "when: "+ currentDateString);
		                gatherService.setGatherEnd(paramMap);
		            }
		        }
		        
		    } catch (Exception e) {
		        // 예외 처리 로직 추가
		        e.printStackTrace();
		    }
	}
}