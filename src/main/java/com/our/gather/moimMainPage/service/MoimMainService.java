package com.our.gather.moimMainPage.service;

import com.our.gather.common.common.CommandMap;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * &#64;FileName : moimMainPageService
 * &#64;Date : 2024-11-22
 * &#64;author 강승현
 * &#64;History :
 * </pre>
 * <p>
 * <p>
 * Copyright (C) 2019 by Bluewaves All right reserved.
 */
public interface MoimMainService {

    // 메인 게더
    List<Map<String, Object>> mainPageMoim(Map<String, Object> map, HttpSession session, CommandMap commandMap)
            throws Exception;
}
