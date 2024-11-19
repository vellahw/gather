package com.our.gather.common.interceptor;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import com.our.gather.notify.service.NotifyService;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * &#64;FileName : NoticeInterceptor
 * &#64;Date : 2024-11-18
 * &#64;author 강승현
 * &#64;History :
 * </pre>
 * <p>
 * <p>
 * Copyright (C) 2019 by Bluewaves All right reserved.
 */
public class NoticeInterceptor implements HandlerInterceptor {

    @Resource(name = "NotifyService")
    private NotifyService notifyService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();

        // 로그인된 사용자만 알림 처리
        if (session.getAttribute("USER_NUMB") != null) {
            CommandMap commandMap = new CommandMap();
            commandMap.putAll(request.getParameterMap());

            // 알림 데이터를 가져옴
            List<Map<String, Object>> notify = notifyService.getNotify(commandMap.getMap(), commandMap, session);

            // 알림 데이터와 개수를 요청 속성에 추가
            request.setAttribute("notify", notify);
            request.setAttribute("notiCount", notify.size());
        }

        return true; // 요청 처리를 계속 진행
    }
}
