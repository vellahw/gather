package com.our.gather.common;

import static org.junit.Assert.assertTrue;

import java.io.InputStream;

import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.session.Configuration;
import org.junit.Test;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

public class MapperXmlTest {

	@Test
	public void loadsEveryMapper() throws Exception {
		Configuration configuration = new Configuration();
		Resource[] resources = new PathMatchingResourcePatternResolver()
				.getResources("classpath*:mapper/**/*_SQL.xml");
		assertTrue("No mapper XML files found", resources.length > 0);
		for (Resource resource : resources) {
			try (InputStream input = resource.getInputStream()) {
				new XMLMapperBuilder(input, configuration, resource.getDescription(),
						configuration.getSqlFragments()).parse();
			}
		}
	}
}
