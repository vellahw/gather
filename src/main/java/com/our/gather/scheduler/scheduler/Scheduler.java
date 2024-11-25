package com.our.gather.scheduler.scheduler;

import com.our.gather.common.common.CommandMap;
import com.our.gather.moimDetailPage.service.MoimDetailService;
import com.our.gather.notify.service.NotifyService;
import com.our.gather.scheduler.service.SchedulerService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class Scheduler {

	@Resource(name = "SchedulerService")
	private SchedulerService schedulerService;

	@Resource(name = "NotifyService")
	private NotifyService notifyService;

	@Resource(name = "MoimDetailService")
	private MoimDetailService moimDetailService;
	// 모임시간이 지난 게더 마감 후 알림 전송
	@Scheduled(fixedRate = 6000000) // 현재 1시간마다 실행 -- 배포 시 5초로 변경.
	public void updateGatherEnd() throws Exception {

		CommandMap commandMap = new CommandMap();

		try {
			// 현재 날짜 이전에 마감되지 않은 게더 가져오기
			List<Map<String, Object>> gathList = schedulerService.getEndedGahter();

			if (!gathList.isEmpty()) {
				// 가져온 게더에 대해 'ENDD_YSNO' 값을 업데이트
				for (Map<String, Object> gathMap : gathList) {

					String gathIdxx = (String) gathMap.get("MOIM_IDXX");

					// Map에 필요한 로직 수행
					Map<String, Object> paramMap = new HashMap<>();
					paramMap.put("MOIM_IDXX", gathIdxx);

					moimDetailService.setMoimEnd(paramMap);

					commandMap.put("MOIM_IDXX", gathIdxx);
					List<Map<String, Object>> memList = schedulerService.getGatherMemberForSD(commandMap.getMap(),
							commandMap);

					if (!memList.isEmpty()) {

						for (int i = 0; i < memList.size(); i++) {
							
							if(memList.get(i).get("MAST_YSNO").equals("N") ) { //방장은 제외하고 전송

								commandMap.put("BOAD_IDXX", memList.get(i).get("MOIM_IDXX"));
								commandMap.put("USER_NUMB", memList.get(i).get("USER_NUMB"));
								commandMap.put("SEND_USER", "null");
								commandMap.put("NOTI_CODE", "B05");
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

	// 모임시간 하루남은 게더 알림 전송
	@Scheduled(fixedRate = 6000000) // 1시간마다 실행
	public void updateGatherWithNoti() throws Exception {

		CommandMap commandMap = new CommandMap();

		try {
			// 모임시간 하루남은 
			List<Map<String, Object>> gathList = schedulerService.getOneDayLeft();

			if (!gathList.isEmpty()) {

				for (Map<String, Object> gathMap : gathList) {

					String gathIdxx = (String) gathMap.get("MOIM_IDXX");

					// Map에 필요한 로직 수행
					Map<String, Object> paramMap = new HashMap<>();
					paramMap.put("MOIM_IDXX", gathIdxx);

					commandMap.put("MOIM_IDXX", gathIdxx);
					List<Map<String, Object>> memList = schedulerService.getGatherMemberForSD(commandMap.getMap(),commandMap);

					if (!memList.isEmpty()) {

						for (int i = 0; i < memList.size(); i++) {

							commandMap.put("BOAD_IDXX", memList.get(i).get("MOIM_IDXX"));
							commandMap.put("USER_NUMB", memList.get(i).get("USER_NUMB"));
							commandMap.put("SEND_USER", "null");
							commandMap.put("NOTI_CODE", "C01");
							notifyService.insertNotify(commandMap.getMap(), commandMap);

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