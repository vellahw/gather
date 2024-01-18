package com.our.gather.mainPage.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.our.gather.mainPage.dao.MainDao;

@Service("MainService")
public class MainServiceImpl implements MainService {

	@Resource(name = "MainDao")
	private MainDao mainDao;



}