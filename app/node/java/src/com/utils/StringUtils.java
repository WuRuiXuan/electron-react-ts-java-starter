package com.utils;

public class StringUtils {

	public static boolean isEmpty(Object str) {
		return (str == null || "".equals(str));
	}

	public static boolean isNotEmpty(Object str) {
		return (str != null && !"".equals(str));
	}

}
