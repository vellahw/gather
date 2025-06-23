package com.our.gather.common.interceptor;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.service.CommonService;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * &#64;FileName : CategoryInterceptor
 * &#64;Date : 2024-11-18
 * &#64;author 강승현
 * &#64;History :
 * </pre>
         * <p>
         * <p>
         * Copyright (C) 2019 by Bluewaves All right reserved.
 */
    @Component
    public class CategoryInterceptor implements HandlerInterceptor {

        @Resource(name = "CommonService")
        private CommonService commonService;

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            // CommandMap 객체 생성 (요청 파라미터를 처리)
            CommandMap commandMap = new CommandMap();
            commandMap.putAll(request.getParameterMap());

            // 부모 카테고리와 자식 카테고리 조회
            List<Map<String, Object>> parentsCate = commonService.getParentsCate(commandMap.getMap(), commandMap);
            List<Map<String, Object>> childCate = commonService.getChildCate(commandMap.getMap(), commandMap);

            // 요청 속성에 카테고리 데이터 저장
            request.setAttribute("pCate", parentsCate);
            request.setAttribute("cCate", childCate);

            return true; // 다음 단계로 진행
    }
}
