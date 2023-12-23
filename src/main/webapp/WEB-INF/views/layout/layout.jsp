<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
<!-- header -->
<tiles:insertAttribute name="header"/>
	
<!-- body -->
<tiles:insertAttribute name="body"/>
	
<!-- footer --> 
<tiles:insertAttribute name="footer"/>
</body>
</html>