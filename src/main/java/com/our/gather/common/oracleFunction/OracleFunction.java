package com.our.gather.common.oracleFunction;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Types;


public class OracleFunction {

    private static Connection connection = null;
    private static Properties properties;
    
	static {
        try {
            // 클래스 로딩 시 한 번만 실행되도록 정적 블록에서 연결을 생성
            connection = DriverManager.getConnection(Properties.url, Properties.username, Properties.password);
            
        } catch (SQLException e) {
            throw new RuntimeException("Failed to initialize database connection", e);
        }
    }
	
	//getCodeName
    public static String getCodeName(String p_comm_code, String p_comd_code) throws Exception {
        
        String sql = "{ ? = call getCodeName(?, ?) }";
        return executeFunction(sql, p_comm_code, p_comd_code);
    }
    
	//getCodeName
    public static String getRelationCode(String p_user_numb, String p_folw_user) throws Exception {
        
        String sql = "{ ? = call getRelationCode(?, ?) }";
        return executeFunction(sql, p_user_numb, p_folw_user);
    }

    private static String executeFunction(String sql, String param1, String param2) throws Exception {
        try (CallableStatement stmt = connection.prepareCall(sql)) {
            stmt.registerOutParameter(1, Types.VARCHAR);
            stmt.setString(2, param1);
            stmt.setString(3, param2);
            stmt.execute();

            return stmt.getString(1);
        }
    }
}