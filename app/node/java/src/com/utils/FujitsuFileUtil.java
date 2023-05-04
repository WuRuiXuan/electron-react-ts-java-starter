package com.utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

public class FujitsuFileUtil {
	public static PrintWriter writeFileAppend(String name) {
		try {
			return new PrintWriter(
					new BufferedWriter(new OutputStreamWriter(new FileOutputStream(name, true), "UTF-8")));
		} catch (IOException e) {
			return null;
		}
	}

	public static PrintWriter writeFileAppendGBK(String name) {
		try {
			return new PrintWriter(new BufferedWriter(new FileWriter(name, true)));
		} catch (IOException e) {
			return null;
		}
	}

	public static BufferedReader readFile(String name) {
		return readFile(name, "UTF-8");
	}

	public static BufferedReader readFileGB2312(String name) {
		return readFile(name, "GB2312");
	}

	public static BufferedReader readFileGBK(String name) {
		return readFile(name, "GBK");
	}

	public static BufferedReader readFile(String name, String encoding) {
		BufferedReader br = null;

		try {
			if (encoding == null || encoding.trim().length() <= 0)
				encoding = "UTF-8";
			br = new BufferedReader(new UnicodeReader(new FileInputStream(new File(name)), encoding));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return br;
	}
}
