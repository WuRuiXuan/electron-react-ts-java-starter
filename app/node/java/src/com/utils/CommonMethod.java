package com.utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.util.Vector;

class CmdExecStream extends Thread {
	InputStream is;

	CmdExecStream(InputStream is) {
		this.is = is;
	}

	@Override
	public void run() {
		try {
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader br = new BufferedReader(isr);
			while (br.readLine() != null)
				;
			br.close();
		} catch (Exception ioe) {
		}
	}
}

public class CommonMethod {
	public static boolean bankexist = false;

	public static void waitForExec(String cmd, boolean wait) throws Exception {
		Process p = Runtime.getRuntime().exec(cmd);

		if (wait && p != null) {
			CmdExecStream errorStream = new CmdExecStream(p.getErrorStream());
			CmdExecStream outputStream = new CmdExecStream(p.getInputStream());
			errorStream.start();
			outputStream.start();

			// 等待
			p.waitFor();
		}
	}

	public static void waitForExec(String cmd) throws Exception {
		waitForExec(cmd, true);
	}

	public static void waitForExec(String cmd, String exefile) throws Exception {
		waitForExec(cmd, exefile, null);
	}

	public static void waitForExec(String cmd, String exefile, Runnable msgcb) throws Exception {
		Process p = Runtime.getRuntime().exec(cmd);

		if (p != null) {
			CmdExecStream errorStream = new CmdExecStream(p.getErrorStream());
			CmdExecStream outputStream = new CmdExecStream(p.getInputStream());
			errorStream.start();
			outputStream.start();

			// 等待
			// waitForProcessExit(exefile,msgcb);
			p.waitFor();
		}
	}

	public static BufferedReader readFileGB2312(String name) {
		return readFile(name, "GB2312");
	}

	public static BufferedReader readFileGBK(String name) {
		return readFile(name, "GBK");
	}

	public static BufferedReader readFile(String name) {
		return readFile(name, "UTF-8");
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

	public static boolean isFileExist(String name) {
		try {
			return new File(name).exists();
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

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

	public static PrintWriter writeFileUTF(String name) {
		try {
			return new PrintWriter(
					new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(name)), "UTF-8")));
		} catch (IOException e) {
			return null;
		}
	}

	public static PrintWriter writeFile(String name) {
		try {
			return new PrintWriter(new BufferedWriter(new FileWriter(name)), true);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static void writeFileByVector(String fileName, Vector<?> v) {
		PrintWriter pw = null;

		try {
			pw = CommonMethod.writeFileUTF(fileName);

			for (int i = 0; i < v.size(); i++) {
				String[] row = (String[]) v.elementAt(i);

				// 当此行为空行时
				if ((row[0] == null) || (row[0].trim().length() <= 0)) {
					if (i > 0) {
						String[] s = (String[]) v.elementAt(i - 1);

						if ((s[0] != null) && (s[0].trim().length() > 0)) {
							pw.println("");
						}
					}

					continue;
				}

				String line = Convert.appendStringSize("", row[0], 0, 20, 20);

				// 当此行是[]标注时
				if (line.trim().charAt(0) == '[') {
					if (i > 0) {
						String[] s = (String[]) v.elementAt(i - 1);

						if ((s[0] != null) && (s[0].trim().length() > 0)) {
							pw.println("");
						}
					}

					pw.println(line.trim());

					continue;
				}

				// 如果没有注释则按150位截取，否则有注释按60位截取
				if ((row.length <= 1 || row[1] == null || row[1].trim().equals(""))
						&& (row.length <= 2 || row[2] == null || row[2].trim().equals(""))) {
					line += " =";
				} else if ((row[1] == null) || row[1].trim().equals("")) {
					line += (" = " + Convert.appendStringSize("", "", 0, 60, 60));
				} else {
					int ilenth = Convert.countLength(row[1].trim());
					if (ilenth <= 60) {
						line += (" = " + Convert.appendStringSize("", row[1].trim(), 0, 60, 60));
					} else {
						line += (" = " + Convert.appendStringSize("", row[1].trim(), 0, ilenth + 10, ilenth + 10));
					}
				}

				if (row.length > 2 && (row[2] != null) && (row[2].trim().length() > 0)) {
					line += (" && " + row[2].trim());
				}

				pw.println(line);
			}
		} catch (Exception er) {
			er.printStackTrace();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}

	public static Vector<String[]> readFileByVector(String fileName) {
		BufferedReader br = null;

		br = CommonMethod.readFile(fileName);

		if (br == null) {
			return null;
		}

		Vector<String[]> v = new Vector<String[]>();
		String line;
		String[] content = null;

		try {
			while ((line = br.readLine()) != null) {
				content = new String[3];

				line = line.trim();
				/*
				 * if (line.indexOf('[') >= 0) { line = ManipulateStr.delSpecialChar(line); }
				 */
				if ((line == null) || (line.trim().length() <= 0)) {
					v.add(new String[3]);

					continue;
				}

				String[] lines = new String[2];

				if (line.indexOf("&&") < 0) {
					lines[0] = line;
					lines[1] = null;
				} else {
					lines[0] = line.substring(0, line.indexOf("&&"));
					lines[1] = line.substring(line.indexOf("&&") + 2);
				}

				if (lines[1] == null) {
					content[2] = null;
				} else {
					content[2] = lines[1].trim();
				}

				if (lines[0].indexOf("=") < 0) {
					content[0] = lines[0].trim();
					content[1] = null;
				} else {
					content[0] = lines[0].substring(0, lines[0].indexOf("=")).trim();
					content[1] = lines[0].substring(lines[0].indexOf("=") + 1).trim();
				}

				v.add(content);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null) {
					br.close();
				}
			} catch (Exception e) {
			}
		}

		return v;
	}

	public static String getValueFromVector(Vector<?> v, String attr) {
		for (int i = 0; v != null && i < v.size(); i++) {
			String[] s = (String[]) v.elementAt(i);
			if (attr.equalsIgnoreCase(s[0])) {
				return s[1];
			}
		}
		return null;
	}

	public static String readFileData(String file, String mode) {
		if (!PathFile.fileExist(file))
			return null;

		try {
			BufferedReader br = null;
			if ("GBK".equals(mode))
				br = readFileGBK(file);
			else if ("GB2312".equals(mode))
				br = readFileGB2312(file);
			else
				br = readFile(file);
			if (br == null)
				return null;

			StringBuffer data = new StringBuffer();
			String line = null;
			while ((line = br.readLine()) != null) {
				data.append(line);
				data.append("\n");
			}
			br.close();

			if (data.length() > 0)
				data.setLength(data.length() - 1);
			return data.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static void Sleep(long ms) {
		try {
			Thread.sleep(ms);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static String cutSquareBracket(String line) {
		return line.substring(line.indexOf("[") + 1, line.indexOf("]"));
	}

	public static String isNull(String base, String def) {
		if (base == null || base.trim().equals(""))
			return def;
		else
			return base;
	}

	public static boolean isNull(Object base) {
		if (base == null || base.toString().trim().equals(""))
			return true;
		else
			return false;
	}

	public static boolean noEmpty(String str) {
		if (isNull(str, "").length() <= 0)
			return false;
		else
			return true;
	}

	public static String getInsertSql(String tabname, String[] ref) {
		int i;
		String sql = "insert into " + tabname + "(";
		String line;

		// 列名
		line = "";
		for (i = 0; i < ref.length; i++) {
			line += ("," + ref[i]);
		}
		sql += line.substring(1);
		sql += ") values(";

		line = "";
		for (i = 0; i < ref.length; i++) {
			line += ",?";
		}
		sql += line.substring(1);
		sql += ")";

		return sql;
	}

	/*
	 * //打开目录对话框 public static void openDirectory(Shell shell,Text
	 * txtSourceDirectory) { //创建一个打开对话框,样式设置为SWT.OPEN DirectoryDialog dialog = new
	 * DirectoryDialog(shell,SWT.OPEN);
	 * 
	 * String str = txtSourceDirectory.getText().trim(); if (str.length() > 0) {
	 * //设置打开默认的路径 dialog.setFilterPath(str); } else { //设置打开默认的路径
	 * dialog.setFilterPath("."); }
	 * 
	 * //打开窗口,返回用户所选的文件目录 String directory = dialog.open();
	 * 
	 * if (directory != null) { txtSourceDirectory.setText(directory); } }
	 */

	/*
	 * //打开文件对话框 public static void openFileDialog(Shell shell,Text txtSourceFile) {
	 * openFileDialog(shell,txtSourceFile,new String[]{"*.ini","*.*"},new
	 * String[]{"INI Files(*.ini)","ALL Files(*.*)"}); }
	 *
	 * //打开文件对话框 public static void openFileDialog(Shell shell,Text
	 * txtSourceFile,String[] extendsvalue,String[] extenddescribe) {
	 * //创建一个打开对话框,样式设置为SWT.OPEN FileDialog dialog = new FileDialog(shell,SWT.OPEN);
	 *
	 * String str = txtSourceFile.getText().trim(); if (str.length() > 0) {
	 * //设置打开默认的路径 dialog.setFilterPath(str); } else { //设置打开默认的路径
	 * dialog.setFilterPath("."); }
	 *
	 *
	 * if (extendsvalue != null) { //设置所打开文件的扩展名
	 * dialog.setFilterExtensions(extendsvalue); //设置显示到下拉框中的扩展名的名称
	 * dialog.setFilterNames(extenddescribe); }
	 *
	 * //打开窗口,返回用户所选的文件目录 String file = dialog.open();
	 *
	 * if (file != null) { txtSourceFile.setText(file); } }
	 */
	public static String getObjectPara(Object obj, String ref) {
		if (obj == null)
			return null;

		Field field1 = null;
		Class<? extends Object> classInst = obj.getClass();

		try {
			if (ref.length() <= 0) {
				return null;
			}

			field1 = classInst.getDeclaredField(ref);

			if (field1.getType().getName().equals("char")) {
				return String.valueOf(field1.getChar(obj));
			} else if (field1.getType().getName().equals("int")) {
				return String.valueOf(field1.getInt(obj));
			} else if (field1.getType().getName().equals("double")) {
				return ManipulatePrecision.doubleToString(field1.getDouble(obj));
			} else if (field1.getType().getName().equals("float")) {
				return String.valueOf(field1.getFloat(obj));
			} else if (field1.getType().getName().equals("long")) {
				return String.valueOf(field1.getLong(obj));
			} else if (field1.getType().getName().equals("java.lang.String")) {
				String s = (String) field1.get(obj);
				if (s == null)
					s = "";
				return s;
			} else {
				String s = (String) field1.get(obj);
				if (s == null)
					s = "";
				return s;
			}
		} catch (Exception e) {
			e.printStackTrace();

			return null;
		}
	}

	// 判断IP是否合法
	public static boolean isValidIPAddress(String strip) {
		int count = 0;
		boolean isIP = true;
		String temp = strip;
		String tem = "";

		try {
			if (temp == null || (temp.charAt(0) == '.') || (temp.charAt(temp.length() - 1) == '.')
					|| (temp.length() > 15)) {
				isIP = false;
				return isIP;
			}

			temp = temp + '.'; // 下面测试用到

			for (int i = 0; i < temp.length(); i++) {
				if (temp.charAt(i) == '.') {
					count++;

					if (tem.equals("")) {
						isIP = false;

						continue;
					}

					if (Integer.parseInt(tem) > 255) {
						isIP = false;
					}

					tem = "";

					continue;
				}

				if ((temp.charAt(i) < '0') || (temp.charAt(i) > '9')) {
					isIP = false;
				}

				tem += String.valueOf(temp.charAt(i));
			}

			if (count != 4) {
				isIP = false;
			}

			return isIP;
		} catch (Exception ex) {
			ex.printStackTrace();

			return false;
		}
	}

	public static String getTraceInfo() {
		StringBuffer sb = new StringBuffer();

		StackTraceElement[] stacks = new Throwable().getStackTrace();
		sb.append("class: ").append(stacks[1].getClassName()).append("; method: ").append(stacks[1].getMethodName())
				.append("; number: ").append(stacks[1].getLineNumber());

		return sb.toString();
	}

}
