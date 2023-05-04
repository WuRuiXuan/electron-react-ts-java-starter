package com.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

//这个类是用来操作日期时间的类
public class ManipulateDateTime {
	Runtime runtime = null;
	Calendar calendar = null;

	public ManipulateDateTime() {
		runtime = Runtime.getRuntime();

		calendar = Calendar.getInstance();
	}

	public static String getDateTimeAll() {
		Date myDate = new Date(System.currentTimeMillis());

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss:SSS");
		return sdf.format(myDate);
	}

	public static String getDateTimeAllNO() {
		return getDateTimeAll().replace("/", "").replace(":", "").replace(" ", "");
	}

	public static String getDateTimeByClock() {
		Calendar calendar = Calendar.getInstance();

		//
		String year = String.valueOf(calendar.get(Calendar.YEAR));
		String month = String.valueOf(calendar.get(Calendar.MONTH) + 1);

		if (month.length() < 2) {
			month = "0" + month;
		}

		String day = String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));

		if (day.length() < 2) {
			day = "0" + day;
		}

		String houre = String.valueOf(calendar.get(Calendar.HOUR_OF_DAY));

		if (houre.length() < 2) {
			houre = "0" + houre;
		}

		String minute = String.valueOf(calendar.get(Calendar.MINUTE));

		if (minute.length() < 2) {
			minute = "0" + minute;
		}

		String second = String.valueOf(calendar.get(Calendar.SECOND));

		if (second.length() < 2) {
			second = "0" + second;
		}

		StringBuffer sb = new StringBuffer();
		sb.append(year);
		sb.append("-");
		sb.append(month);
		sb.append("-");
		sb.append(day);
		sb.append(" ");
		sb.append(houre);
		sb.append(":");
		sb.append(minute);
		sb.append(":");
		sb.append(second);
		sb.append(" ");
		sb.append(getDayOfWeek(calendar.get(Calendar.DAY_OF_WEEK)));

		return sb.toString();
	}

	public static String getDayOfWeek(int dayOfWeek) {
		String week = null;

		switch (dayOfWeek) {
		case 1:
			week = "日";
			break;
		case 2:
			week = "一";
			break;
		case 3:
			week = "二";
			break;
		case 4:
			week = "三";
			break;
		case 5:
			week = "四";
			break;
		case 6:
			week = "五";
			break;
		case 7:
			week = "六";
			break;
		}

		return week;
	}

	public static String staticGetDateBySlash() {
		Calendar calendar = Calendar.getInstance();

		String year = String.valueOf(calendar.get(Calendar.YEAR));
		String month = String.valueOf(calendar.get(Calendar.MONTH) + 1);

		if (month.length() < 2) {
			month = "0" + month;
		}

		String day = String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));

		if (day.length() < 2) {
			day = "0" + day;
		}

		return year + "/" + month + "/" + day;
	}

	public static String getCurrentDate() {
		return new ManipulateDateTime().getDateBySlash();
	}

	public static String getCurrentDateBySign() {
		return new ManipulateDateTime().getDateBySign();
	}

	public static String getCurrentTime() {
		return new ManipulateDateTime().getTime();
	}

	public static String getCurrentDateTime() {
		return new ManipulateDateTime().getDateTimeString();
	}

	/*
	 * public void setDateTime(String datetime) { try { if
	 * (System.getProperties().getProperty("os.name").substring(0, 5)
	 * .equals("Linux")) { setLinuxTime(datetime); } else { setWindowTime(datetime);
	 * } } catch (Exception ex) { ex.printStackTrace(); } }
	 */
	// public void setDateTime(TimeDate dt)
	// {
	// try
	// {
	// if (System.getProperties().getProperty("os.name").substring(0, 5)
	// .equals("Linux"))
	// {
	// setLinuxTime(dt.mm + dt.dd + dt.hh + dt.min + dt.cc + dt.yy +
	// "." + dt.ss);
	// }
	// else
	// {
	// setWindowTime(dt.fullTime);
	// }
	// }
	// catch (Exception ex)
	// {
	// ex.printStackTrace();
	// }
	// }

	// public void setDateTime(String date, String time)
	// {
	// try
	// {
	// if (System.getProperties().getProperty("os.name").substring(0, 5)
	// .equals("Linux"))
	// {
	// TimeDate dt = new TimeDate(date, time);
	// setLinuxTime(dt.mm + dt.dd + dt.hh + dt.min + dt.cc + dt.yy +
	// "." + dt.ss);
	// dt = null;
	// }
	// else
	// {
	// setWindowTime(date + " " + time);
	// }
	// }
	// catch (Exception ex)
	// {
	// ex.printStackTrace();
	// }
	// }

	// private boolean setWindowTime(String date) {
	// try {
	// String d[] = date.split(" ");
	//
	// String os = System.getProperties().getProperty("os.name");
	// if (os.indexOf("XP") >= 0 || os.indexOf("2000") >= 0) {
	// Process p = null;
	// p = runtime.exec("cmd /c date" + " " + d[0]);
	// if (p != null) p.waitFor();
	// p = runtime.exec("cmd /c time" + " " + d[1]);
	// if (p != null) p.waitFor();
	// } else {
	// // WIN98/WINME,调用VC写的程序设置,用command设置的时间无效
	// Process p = null;
	// date = date.replaceAll("-", "/");
	// p = runtime.exec("setdatetime.exe " + date);
	// if (p != null) p.waitFor();
	// }
	//
	// //
	// calendar = Calendar.getInstance();
	//
	// return true;
	// } catch (Exception ex) {
	// ex.printStackTrace();
	//
	// return false;
	// }
	// }

	// private boolean setLinuxTime(String timer) {
	// try {
	// Process p = null;
	// p = runtime.exec("date " + timer);
	// if (p != null) p.waitFor();
	//
	// //
	// calendar = Calendar.getInstance();
	//
	// return true;
	// } catch (Exception ex) {
	// ex.printStackTrace();
	//
	// return false;
	// }
	// }

	public Date getDateTime() {
		return calendar.getTime();
	}

	public String getDateTimeString() {
		return getDateBySlash() + " " + getTime();
	}

	public int getDateWeek() {
		return calendar.get(Calendar.DAY_OF_WEEK);
	}

	public String getDateBySlash() {
		String year = String.valueOf(calendar.get(Calendar.YEAR));
		String month = String.valueOf(calendar.get(Calendar.MONTH) + 1);

		if (month.length() < 2) {
			month = "0" + month;
		}

		String day = String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));

		if (day.length() < 2) {
			day = "0" + day;
		}

		return year + "/" + month + "/" + day;
	}

	public String getDateByEmpty() {
		String year = String.valueOf(calendar.get(Calendar.YEAR));
		String month = String.valueOf(calendar.get(Calendar.MONTH) + 1);

		if (month.length() < 2) {
			month = "0" + month;
		}

		String day = String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));

		if (day.length() < 2) {
			day = "0" + day;
		}

		return year + month + day;
	}

	public String getDateBySign() {
		String year = String.valueOf(calendar.get(Calendar.YEAR));
		String month = String.valueOf(calendar.get(Calendar.MONTH) + 1);

		if (month.length() < 2) {
			month = "0" + month;
		}

		String day = String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));

		if (day.length() < 2) {
			day = "0" + day;
		}

		return year + "-" + month + "-" + day;
	}

	public String getDateByChinese() {
		String year = String.valueOf(calendar.get(Calendar.YEAR));
		String month = String.valueOf(calendar.get(Calendar.MONTH) + 1);

		if (month.length() < 2) {
			month = "0" + month;
		}

		String day = String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));

		if (day.length() < 2) {
			day = "0" + day;
		}

		return year + "年" + month + "月" + day + "日";
	}

	public String getTime() {
		String houre = String.valueOf(calendar.get(Calendar.HOUR_OF_DAY));

		if (houre.length() < 2) {
			houre = "0" + houre;
		}

		String minute = String.valueOf(calendar.get(Calendar.MINUTE));

		if (minute.length() < 2) {
			minute = "0" + minute;
		}

		String second = String.valueOf(calendar.get(Calendar.SECOND));

		if (second.length() < 2) {
			second = "0" + second;
		}

		return houre + ":" + minute + ":" + second;
	}

	public String getTimeByEmpty() {
		String houre = String.valueOf(calendar.get(Calendar.HOUR_OF_DAY));

		if (houre.length() < 2) {
			houre = "0" + houre;
		}

		String minute = String.valueOf(calendar.get(Calendar.MINUTE));

		if (minute.length() < 2) {
			minute = "0" + minute;
		}

		String second = String.valueOf(calendar.get(Calendar.SECOND));

		if (second.length() < 2) {
			second = "0" + second;
		}

		return houre + minute + second;
	}

	// 比较两个时间差额;第一个参数代表第一个时间日期,第二个参数代表第二个时间日期
	public long getDisDateTime(String sjone, String sjtwo) {
		String year1 = null;
		String year2 = null;
		String mon1 = null;
		String mon2 = null;
		String day1 = null;
		String day2 = null;
		String hour1 = null;
		String hour2 = null;
		String min1 = null;
		String min2 = null;
		String sec1 = null;
		String sec2 = null;
		int indexa = -1;
		int indexb = -1;
		int indexc = -1;
		int indexd = -1;
		int indexe = -1;
		String sj1, sj2;

		sj1 = sjone.replace('-', '/');
		sj2 = sjtwo.replace('-', '/');

		if (sj1 != null) {
			indexa = sj1.indexOf("/");
			indexb = sj1.lastIndexOf("/");
			indexc = sj1.indexOf(":");
			indexd = sj1.lastIndexOf(":");
			indexe = sj1.indexOf(" ");
			year1 = sj1.substring(0, indexa);
			mon1 = sj1.substring(indexa + 1, indexb);
			day1 = sj1.substring(indexb + 1, indexe);

			hour1 = sj1.substring(indexe + 1, indexc);
			min1 = sj1.substring(indexc + 1, indexd);
			sec1 = sj1.substring(indexd + 1);
		}

		if (sj2 != null) {
			indexa = sj2.indexOf("/");
			indexb = sj2.lastIndexOf("/");
			indexc = sj2.indexOf(":");
			indexd = sj2.lastIndexOf(":");
			indexe = sj2.indexOf(" ");

			year2 = sj2.substring(0, indexa);
			mon2 = sj2.substring(indexa + 1, indexb);
			day2 = sj2.substring(indexb + 1, indexe);
			hour2 = sj2.substring(indexe + 1, indexc);
			min2 = sj2.substring(indexc + 1, indexd);
			sec2 = sj2.substring(indexd + 1);
		}

		GregorianCalendar gc1 = new GregorianCalendar(Integer.parseInt(year1), Integer.parseInt(mon1),
				Integer.parseInt(day1), Integer.parseInt(hour1), Integer.parseInt(min1), Integer.parseInt(sec1));
		GregorianCalendar gc2 = new GregorianCalendar(Integer.parseInt(year2), Integer.parseInt(mon2),
				Integer.parseInt(day2), Integer.parseInt(hour2), Integer.parseInt(min2), Integer.parseInt(sec2));
		long tim = gc2.getTimeInMillis() - gc1.getTimeInMillis();
		long margin = tim / (3600 * 24 * 1000);

		return margin;
	}

	public long getDisDateTimeByMS(String sjone, String sjtwo) {
		long timeDis = getDisDateTime(sjone, sjtwo);
		timeDis = timeDis * 3600 * 24;
		return timeDis;
	}

	public long compareTimeDS(String date1, String date2) {
		String[] times = date1.split(":");
		String[] times1 = date2.split(":");

		GregorianCalendar gc1 = new GregorianCalendar(0, 0, 0, Integer.parseInt(times[0]), Integer.parseInt(times[1]),
				Integer.parseInt(times[2]));
		GregorianCalendar gc2 = new GregorianCalendar(0, 0, 0, Integer.parseInt(times1[0]), Integer.parseInt(times1[1]),
				Integer.parseInt(times1[2]));
		long tim = gc1.getTimeInMillis() - gc2.getTimeInMillis();

		return tim;
	}

	public long compareDate(String date1, String date2) {
		int indexa = date1.indexOf("-");
		int indexb = date1.indexOf("/");
		String[] times = null;

		if (indexa != -1) {
			times = date1.split("-");
		} else if (indexb != -1) {
			times = date1.split("/");
		} else {
			times = new String[3];
			times[0] = date1.substring(0, 4);
			times[1] = date1.substring(4, 6);
			times[2] = date1.substring(6, 8);
		}

		indexa = date2.indexOf("-");
		indexb = date2.indexOf("/");

		String[] times1 = null;

		if (indexa != -1) {
			times1 = date2.split("-");
		} else if (indexb != -1) {
			times1 = date2.split("/");
		} else {
			times1 = new String[3];
			times1[0] = date2.substring(0, 4);
			times1[1] = date2.substring(4, 6);
			times1[2] = date2.substring(6, 8);
		}
		GregorianCalendar gc1 = new GregorianCalendar(Integer.parseInt(times[0]), Integer.parseInt(times[1]),
				Integer.parseInt(times[2]), 0, 0, 0);
		GregorianCalendar gc2 = new GregorianCalendar(Integer.parseInt(times1[0]), Integer.parseInt(times1[1]),
				Integer.parseInt(times1[2]), 0, 0, 0);
		long tim = gc1.getTimeInMillis() - gc2.getTimeInMillis();
		long margin = tim / (3600 * 24 * 1000);

		return margin;
	}

	// time1>time2 1
	// time1<time2 -1
	// time1=time2 0 the format of time must be 00:00:00
	public int compareTime(String time1, String time2) {
		if (time1.compareTo(time2) > 0) {
			return 1;
		} else if (time1.equals(time2)) {
			return 0;
		} else {
			return -1;
		}
	}

	// 检查日期,传入参数代表,一个日期
	public static boolean checkDate(String rq) {
		try {
			if (rq.length() < 8) {
				return false;
			}

			if (((rq.charAt(4) == '-') && ((rq.charAt(6) == '-') || (rq.charAt(7) == '-')))
					|| ((rq.charAt(4) == '/') && ((rq.charAt(6) == '/') || (rq.charAt(7) == '/')))) {
				if (Integer.parseInt(rq.substring(0, 4)) > 1900) {
					int index = rq.lastIndexOf("/");

					if (index == -1) {
						index = rq.lastIndexOf("-");
					}

					if ((Integer.parseInt(rq.substring(5, index)) >= 1)
							&& (Integer.parseInt(rq.substring(5, index)) <= 12)) {
						if ((Integer.parseInt(rq.substring(index + 1)) >= 1)
								&& (Integer.parseInt(rq.substring(index + 1)) <= 31)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch (Exception ex) {
			ex.printStackTrace();

			return false;
		}
	}

	// 检查时间合法性,传入参数代表,一个时间
	public static boolean checkTime(String tm) {
		try {
			int indexbegin = tm.indexOf(":");
			int indexend = tm.lastIndexOf(":");

			if ((indexbegin > 0) && (indexbegin < indexend) && (indexend < (tm.length() - 1))) {
				if ((Integer.parseInt(tm.substring(0, indexbegin)) >= 0)
						&& (Integer.parseInt(tm.substring(0, indexbegin)) <= 23)) {
					if ((Integer.parseInt(tm.substring(indexbegin + 1, indexend)) >= 0)
							&& (Integer.parseInt(tm.substring(indexbegin + 1, indexend)) <= 59)) {
						if ((Integer.parseInt(tm.substring(indexend + 1)) >= 0)
								&& (Integer.parseInt(tm.substring(indexend + 1)) <= 59)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch (Exception ex) {
			return false;
		}
	}

	// 负向前进一天,0不变,正向后加一天,返回日期
	public String skipDate(String rq, int step) {
		try {
			int indexa = rq.indexOf("-");
			int indexb = rq.indexOf("/");
			String[] times = null;

			if (indexa != -1) {
				times = rq.split("-");
			} else if (indexb != -1) {
				times = rq.split("/");
			} else {
				times = new String[3];
				times[0] = rq.substring(0, 4);
				times[1] = rq.substring(4, 6);
				times[2] = rq.substring(6, 8);
			}

			calendar.set(Calendar.YEAR, Integer.parseInt(times[0]));
			calendar.set(Calendar.MONTH, Integer.parseInt(times[1]) - 1);
			calendar.set(Calendar.DAY_OF_MONTH, Integer.parseInt(times[2]));

			calendar.add(Calendar.DATE, step);

			return getDateBySlash();
		} catch (Exception er) {
			return null;
		}
	}

	// 将数字转换成标准的日期格式
	public static String getConversionDate(String date) {
		try {
			if (date.length() < 8 || date.length() > 8) {
				return null;
			}

			return date.substring(0, 4) + "/" + date.substring(4, 6) + "/" + date.substring(6, 8);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	// 将数字转换标准的时间格式
	public static String getConversionTime(String time) {
		try {
			if (time.length() < 6 || time.length() > 6) {
				return null;
			}

			return time.substring(0, 2) + ":" + time.substring(2, 4) + ":" + time.substring(4, 6);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public void setTimeInMill(long time) {
		calendar.setTimeInMillis(time);
	}

}
