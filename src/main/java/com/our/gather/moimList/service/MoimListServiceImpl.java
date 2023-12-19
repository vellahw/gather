package com.our.gather.moimList.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.our.gather.moimList.dao.MoimListDao;

@Service("MoimListService")
public class MoimListServiceImpl implements MoimListService {
	@Resource(name = "moimListDao")
	private MoimListDao moimListDao;
}
