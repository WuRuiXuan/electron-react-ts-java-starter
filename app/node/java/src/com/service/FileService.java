package com.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import com.common.App;
import com.utils.CommonMethod;
import com.utils.Convert;
import com.utils.LinkedJsonObject;
import com.utils.Logger;
import com.utils.MyAnnotationProcessor;
import com.utils.PathFile;

public class FileService {
	
	public static boolean init() {
		FileService fileService = new FileService();
		if (!fileService.initSysPath() 
				|| !fileService.loadConfigFile("Config.ini") 
				|| !fileService.loadConfigFile("DeviceConfig.ini")
				|| !fileService.loadConfigFile("DeviceParams.ini")) {
			return false;
		}
		return true;
	}

	public boolean initSysPath() {
		try {
			App.rootDir = PathFile.getAppPath();
			App.configPath = App.rootDir + File.separator + "config" + File.separator;
			App.logPath = App.rootDir + File.separator + "..\\deviceLogs" + File.separator;

			// 检查相关的目录是否存在，若不存在，则创建
			if (!PathFile.fileExist(App.configPath))
				return false;

			if (!PathFile.fileExist(App.logPath))
				if (!PathFile.createDir(App.logPath))
					return false;

			// 初始化日志系统
			App.logger = new Logger();
			App.logger.initLogger();

			return true;
		} catch (Exception e) {

			e.printStackTrace();
			return false;
		}
	}

	public boolean loadConfigFile(String fileName) {
		BufferedReader config;
		try {
			config = PathFile.readFile(App.configPath + fileName);

			if (config == null)
				return false;

			String line;
			String[] sp;
			Class<?> cls = Class.forName("com.common.AppConfig");
			Object obj = cls.getConstructor().newInstance();

			while ((line = config.readLine()) != null) {
				if ((line == null) || (line.length() <= 0)) {
					continue;
				}

				String[] lines = line.split("&&");
				sp = lines[0].split("=");
				if (sp.length < 2)
					continue;

				String key = sp[0].trim().substring(0, 1).toUpperCase() + sp[0].trim().substring(1);
				String value = sp[1].trim();

				Field f = cls.getField(key);
				String type = f.getGenericType().toString();
				if (type.equals("class java.lang.String")) {
					f.set(obj, value);
				} else if (type.equals("int") && !value.isEmpty()) {
					f.set(obj, Integer.valueOf(value).intValue());
				}
			}
			config.close();

			return true;
		} catch (Exception e) {
			e.printStackTrace();
			App.logger.writeExceptionLog(e);
			return false;
		}
	}

	public static boolean saveConfigFile(String fileName, String data) {
		PrintWriter pw = null;

		try {
			String[] dataAll = data.split(",");
			if (dataAll.length > 0) {
				pw = CommonMethod.writeFileUTF(App.configPath + fileName);

				for (int i = 0; i < dataAll.length; i++) {
					String rowValue = (String) dataAll[i];
					String row[] = rowValue.split(":");
					String line = Convert.appendStringSize("", row[0].trim(), 0, 20, 20);

					if (line.charAt(0) != '[') {
						line += " = ";
					}

					if (null == row[1]) {
						line += Convert.appendStringSize("", "", 0, 60, 60);
					} else {
						String value = row[1].trim().toString();
						int ilenth = Convert.countLength(row[1].trim());

						if (ilenth <= 60) {
							line += ("" + Convert.appendStringSize("", value, 0, 60, 60));
						} else {
							line += ("" + Convert.appendStringSize("", value, 0, ilenth + 10, ilenth + 10));
						}
					}

					pw.println(line);
				}

				return true;
			}

			return false;
		} catch (Exception e) {
			e.printStackTrace();
			App.logger.writeExceptionLog(e);
			return false;
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}

	public static void changeConfigItem(String keyName, Object value) {
		try {
			String configStr = FileService.readConfigFile();
			org.json.JSONObject config = new org.json.JSONObject(configStr);
			config.put(keyName, value);

			if (configStr == null || configStr == "" || configStr.length() < 2)
				return;
			configStr = configStr.toString().substring(1, configStr.length() - 1);

			configStr = configStr.replaceAll("\"", "");
			FileService.saveConfigFile("config.ini", configStr);
		} catch (Exception e) {
			App.logger.writeExceptionLog(e);
		}
	}
	
	public static String readConfigFile() {
		LinkedJsonObject data = new LinkedJsonObject();
		try {
			Class<?> cls = Class.forName("com.common.AppConfig");
			Object obj = cls.getConstructor().newInstance();
			Field[] fieldArray = cls.getFields();
			List<Field> fieldList = new ArrayList<>(Arrays.asList(fieldArray));
			final MyAnnotationProcessor processor = new MyAnnotationProcessor();
			Collections.sort(fieldList, new Comparator<Field>() {
				@Override
				public int compare(Field m1, Field m2) {
					return processor.getSequence(m1) - processor.getSequence(m2);
				}
			});
			for (Field f : fieldList) {
				String firstLetter = f.getName().substring(0, 1).toUpperCase();
				String getter = "get" + firstLetter + f.getName().substring(1);
				Method method = cls.getMethod(getter, new Class[] {});
				Object value = method.invoke(obj, new Object[] {});
				data.put(f.getName(), value);
			}
		} catch (Exception e) {
			e.printStackTrace();
			App.logger.writeExceptionLog(e);
			return e.getMessage();
		}
		return data.toString();
	}
}
