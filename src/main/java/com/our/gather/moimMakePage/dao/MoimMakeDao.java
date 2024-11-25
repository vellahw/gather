package com.our.gather.moimMakePage.dao;

import com.our.gather.common.common.CommandMap;
import com.our.gather.common.dao.AbstractDao;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository("MoimMakeDao")
public class MoimMakeDao extends AbstractDao {

    //모임 번호 채번
    public String makeMoimNumb(Map<String, Object> map, CommandMap commandMap) throws Exception {
        return (String) selectOne("moim.makeMoimNumb", map);
    }

    // 모임참여
    public void moimJoin(Map<String, Object> map, CommandMap commandMap) throws Exception {
        insert("moim.moimJoin", map);
    }

    //게더 개설
    public void makeMoim(Map<String, Object> map, CommandMap commandMap) throws Exception {
        insert("moim.makeMoim", map);
    }

}