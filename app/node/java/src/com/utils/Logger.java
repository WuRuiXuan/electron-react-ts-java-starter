package com.utils;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringWriter;

import com.common.App;

public class Logger {
	private String logDate;
	private String logDir;
	private boolean enable;

	public void initLogger() {
		try {
			logDate = new ManipulateDateTime().getDateByEmpty();

			if (logDate != null && logDate.length() == 8) {
				if (PathFile.fileExist(App.logPath)) {
					// linux下的文件夹符号是向左斜
					if (!PathFile.fileExist(App.logPath + logDate))
						PathFile.createDir(App.logPath + logDate);

					logDir = App.logPath + logDate + "/";
					enable = true;
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void writeTaskLog(String log) {
		writeLog(log, "task.log");
	}

	public void writeSystemLog(String log) {
		writeLog(log, "system.log");
	}

	public void writeNetLog(String log) {
		writeLog(log, "network.log");
	}

	public void writeNeedTimeLog(String log) {
		writeLog(log, "needTime.log");
	}

	public void writeBusinessLog(String log) {
		writeLog(log, "business.log");
	}

	public void writeBankLog(String log) {
		writeLog(log, "bank.log");
	}

	public void writePayLog(String log) {
		writeLog(log, "pay.log");
	}

	// 现场临时记录
	public void outPutLog(String log) {
		writeLog(log, "outPut.log");
	}

	public void writeExceptionLog(Exception e) {
		writeLog(getException(e), "exception.log");
	}

	public void writeDeviceLog(String log) {
		writeLog(log, "device.log");
		System.out.println(log);
	}

	public void writeLog(String log, String file) {
		if (!enable)
			return;

		PrintWriter pw = null;

		try {
			String logDate = "[" + ManipulateDateTime.getDateTimeAll() + "]: ";

			pw = writeFileAppend(logDir + file);
			pw.print(logDate + log);
			pw.print("\r\n");
			pw.flush();

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (pw != null)
				pw.close();
			pw = null;
		}
	}

	public String getException(Exception exception) {
		StringWriter stringWriter = null;
		PrintWriter printWriter = null;

		try {
			stringWriter = new StringWriter();
			printWriter = new PrintWriter(stringWriter);
			exception.printStackTrace(printWriter);

			return stringWriter.toString();
		} catch (Exception ex) {
			return "unknown exception";
		} finally {
			if (printWriter != null)
				printWriter.close();

			printWriter = null;
		}
	}

	public static String getTraceInfo() {
		StringBuffer sb = new StringBuffer();

		StackTraceElement[] stacks = new Throwable().getStackTrace();
		sb.append("class: ").append(stacks[1].getClassName()).append("; method: ").append(stacks[1].getMethodName())
				.append("; number: ").append(stacks[1].getLineNumber());

		return sb.toString();
	}

	public static PrintWriter writeFileAppend(String name) {
		try {
			return new PrintWriter(
					new BufferedWriter(new OutputStreamWriter(new FileOutputStream(name, true), "UTF-8")));
		} catch (IOException e) {
			return null;
		}
	}
}
