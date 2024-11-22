package com.our.gather.moimMainPage.service;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.utils.FileUtils;
import com.our.gather.moimModifyPage.dao.MoimDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * &#64;FileName : moimMainPageServiceImpl
 * &#64;Date : 2024-11-22
 * &#64;author 강승현
 * &#64;History :
 * </pre>
 * <p>
 * <p>
 * Copyright (C) 2019 by Bluewaves All right reserved.
 */
@Service("moimMainPageService")
public class moimMainServiceImpl implements moimMainService {

    @Resource(name = "MoimDao")
    private MoimDao moimDao;

    @Resource(name = "fileUtils")
    private FileUtils fileUtils;

    // 모임 메인리스트
    @Override
    public List<Map<String, Object>> mainPageMoim(Map<String, Object> map, HttpSession session, CommandMap commandMap)
            throws Exception {
        // TODO Auto-generated method stub

        if (session.getAttribute("USER_NUMB") != null) {

            commandMap.put("USER_NUMB", session.getAttribute("USER_NUMB"));

        } else {
            commandMap.put("USER_NUMB", null);
        }

        return moimDao.mainPageMoim(map, commandMap, session);
    }
}
