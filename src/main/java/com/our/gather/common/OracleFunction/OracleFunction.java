package com.our.gather.common.OracleFunction;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Types;

public class OracleFunction {

    private static Connection connection = null;

    static {
        try {
            // 클래스 로딩 시 한 번만 실행되도록 정적 블록에서 연결을 생성
            String jdbcUrl = "jdbc:oracle:thin:@localhost:1521:XE";
            String user = "GATHER";
            // 직접 비밀번호 입력
            String password = "get4everything";
            connection = DriverManager.getConnection(jdbcUrl, user, password);
        } catch (SQLException e) {
            throw new RuntimeException("Failed to initialize database connection", e);
        }
    }

    public static String getCodeName(String p_comm_code, String p_comd_code) throws Exception {
        // SQL 문을 getCodeName 함수의 SQL 문으로 변경
        String sql = "{ ? = call getCodeName(?, ?) }";
        return executeFunction(sql, p_comm_code, p_comd_code);
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