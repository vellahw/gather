<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GATHER | 투게더? 게더!</title>
<link rel="stylesheet" href="/resources/css/common/nav.css">
<link rel="stylesheet" href="/resources/css/common/variable.css">
<link rel="stylesheet" href="/resources/css/common/category.css">
<link rel="stylesheet" href="/resources/css/common/swal.css">
<script src="/resources/js/common/nav.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/common/sweetalert.min.js"></script>
<script src="/resources/js/common/naveridlogin_js_sdk_2.0.2.js"></script>
<link rel="icon" href="/resources/img/logo/favicon.ico">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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