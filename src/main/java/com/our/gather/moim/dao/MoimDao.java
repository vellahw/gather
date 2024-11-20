package com.our.gather.moim.dao;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;
import com.our.gather.common.oracleFunction.OracleFunction;
import com.our.gather.common.service.CommonService;
import com.our.gather.moim.service.MoimService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("MoimDao")
public class MoimDao extends AbstractDao {

    @Resource(name = "CommonService")
    private CommonService commonService;

    // 로그인시 메인 게더
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> mainPageMoim(Map<String, Object> map, CommandMap commandMap, HttpSession session)
            throws Exception {

        List<Map<String, Object>> mainGather = (List<Map<String, Object>>) selectList("moim.mainPageMoim", map);

        for (int i = 0; i < mainGather.size(); i++) {
            Map<String, Object> hash = new HashMap<>();
            hash.put("HASH_IDXX", mainGather.get(i).get("MOIM_IDXX"));

            List<Map<String, Object>> HashTag = (List<Map<String, Object>>) selectList("common.hashTag", hash);

            List<Object> hashTag = new ArrayList<>();

            if (!HashTag.isEmpty()) {

                for (Map<String, Object> tag : HashTag) {

                    hashTag.add(tag.get("HASH_TAGG"));

                }

                mainGather.get(i).put("HASH_TAGG", hashTag);
            }

            if (session.getAttribute("USER_NUMB") != null) {

                String userId = mainGather.get(i).get("USER_NUMB").toString();

                String me = session.getAttribute("USER_NUMB").toString();

                String folwCode = OracleFunction.getRelationCode(me, userId);

                String folwBtn = OracleFunction.getCodeName("FOLW_CODE", folwCode);

                mainGather.get(i).put("FOLW_CODE", folwCode);

                mainGather.get(i).put("FOLW_BTNN", folwBtn);

            }

        }

        return mainGather;
    }

    // 게더추출
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getMoimList(Map<String, Object> map, CommandMap commandMap, HttpSession session)
            throws Exception {

        List<Map<String, Object>> getGatherList = (List<Map<String, Object>>) selectList("moim.getMoim", map);

        for (int i = 0; i < getGatherList.size(); i++) {
            Map<String, Object> hash = new HashMap<>();
            hash.put("HASH_IDXX", getGatherList.get(i).get("MOIM_IDXX"));

            List<Map<String, Object>> HashTag = (List<Map<String, Object>>) selectList("common.hashTag", hash);

            List<Object> hashTag = new ArrayList<>();

            if (!HashTag.isEmpty()) {

                for (Map<String, Object> tag : HashTag) {

                    hashTag.add(tag.get("HASH_TAGG"));

                }

                getGatherList.get(i).put("HASH_TAGG", hashTag);
            }

            if (session.getAttribute("USER_NUMB") != null) {

                commonService.makeFollowBtn(getGatherList, session);

            }

        }

        return getGatherList;
    }

    // 게더 상세보기
    @SuppressWarnings("unchecked")
    public Map<String, Object> getMoimDetail(Map<String, Object> map, CommandMap commandMap, HttpSession session)
            throws Exception {

        Map<String, Object> getGatherDetail = (Map<String, Object>) selectOne("moim.getMoim", map);

        if (session.getAttribute("USER_NUMB") != null) {

            commonService.makeFollowBtn(getGatherDetail, session);

        }

        return getGatherDetail;
    }

    // 게더맴버
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getMoimMember(Map<String, Object> map, CommandMap commandMap,
                                                     HttpSession session) throws Exception {

        List<Map<String, Object>> getGatherMember = (List<Map<String, Object>>) selectList("moim.getMoimMember",
                map);

        for (int i = 0; i < getGatherMember.size(); i++) {

            if (session.getAttribute("USER_NUMB") != null) {

                commonService.makeFollowBtn(getGatherMember, session);

            }

        }

        return getGatherMember;
    }

    // 게더 이미지 불러오기
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getMoimImg(Map<String, Object> map, CommandMap commandMap) throws Exception {

        List<Map<String, Object>> getGatherImg = (List<Map<String, Object>>) selectList("gather.getGatherImg", map);

        return getGatherImg;
    }

    public int getMoimCount(Map<String, Object> map, CommandMap commandMap) throws Exception {
        return Integer.parseInt(selectOne("gather.getMoimCount", map).toString());
    }

    // 로그인 맴버 현재 상태
    @SuppressWarnings("unchecked")
    public Map<String, Object> getMoimYourState(Map<String, Object> map, CommandMap commandMap, HttpSession session)
            throws Exception {

        Map<String, Object> getGatherYourState = (Map<String, Object>) selectOne("moim.getMoimMember", map);

        return getGatherYourState;
    }

    //게더 개설
    public void makeMoim(Map<String, Object> map, CommandMap commandMap) throws Exception {
        insert("moim.makeMoim", map);
    }

    // 모임마감
    public void setMoimEnd(Map<String, Object> map) throws Exception {
        update("moim.setMoimEnd", map);
    }
}