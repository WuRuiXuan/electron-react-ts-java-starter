package com.utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;

/**
 * 
 * ClassName: SocketUtil <br/>
 * Resume: socket工具 <br/>
 * date: 2018-8-23 上午10:36:02 <br/>
 *
 * @author yincan
 * @version
 * @since JDK 1.6
 */
public class SocketUtil {

	// 发送数据
	public static void Send(String obj, Socket socket) throws Exception {
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream(), "UTF-8"));
		writer.append(obj);
		writer.newLine();
		writer.flush();
	}

	// 接受数据
	public static String Accept(Socket socket) throws IOException {
		// 读取客户端数据
		BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream(), "UTF-8"));
		String line = reader.readLine();
		return line;
	}

}
