<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GATHER | 게더? 투게더!</title>
<link rel="stylesheet" href="/resources/css/common/nav.css">
<link rel="stylesheet" href="/resources/css/common/variable.css">
<link rel="icon" href="/resources/img/logo/favicon.ico">
</head>
<body>
<header>
  <tiles:insertAttribute name="header"/>
</header>
	
<tiles:insertAttribute name="body"/>

<footer>
  <tiles:insertAttribute name="footer"/>
</footer>	
</body>
</html>