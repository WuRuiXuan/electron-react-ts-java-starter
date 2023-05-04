package com.utils;

public class Ascii {

	public static byte NUL = 0;

	public static byte SOH = 1;

	public static byte STX = 2;

	public static byte ETX = 3;

	public static byte EOT = 4;

	public static byte ENQ = 5;

	public static byte ACK = 6;

	public static byte BEL = 7;

	public static byte BS = 8;

	public static byte HT = 9;

	public static byte LF = 10;

	public static byte VT = 11;

	public static byte FF = 12;

	public static byte CR = 13;

	public static byte SO = 14;

	public static byte SI = 15;

	public static byte DLE = 16;

	public static byte DC1 = 17;

	public static byte DC2 = 18;

	public static byte DC3 = 19;

	public static byte DC4 = 20;

	public static byte NAK = 21;

	public static byte SYN = 22;

	public static byte ETB = 23;

	public static byte CAN = 24;

	public static byte EM = 25;

	public static byte SUB = 26;

	public static byte ESC = 27;

	public static byte FS = 28;

	public static byte GS = 29;

	public static byte RS = 30;

	public static byte US = 31;

	public static byte SPC = 32;

	public static byte DEL = 127;

	public static byte Xon = DC1;

	public static byte Xoff = DC3;

	/**
	 * 将byte转换为一个长度为8的byte数组，数组每个值代表bit
	 */
	public static byte[] getBooleanArray(byte b) {
		byte[] array = new byte[8];
		for (int i = 0; i < 8; i++) {
			array[i] = (byte) (b & 1);
			b = (byte) (b >> 1);
		}
		return array;
	}
}
