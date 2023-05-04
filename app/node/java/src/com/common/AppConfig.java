package com.common;

import com.utils.MyAnnotation;

public class AppConfig {
	
	/**
	 * Config.ini 1-20
	 */
	@MyAnnotation(1)
	public static String ServerIP;
	
	@MyAnnotation(2)
	public static int ServerPort;

	@MyAnnotation(3)
	public static String ServerPath;

	@MyAnnotation(4)
	public static int ReceiveTimeout;
	
	@MyAnnotation(5)
	public static String TerminalNo;
	
	@MyAnnotation(6)
	public static String ShopId;
	
	@MyAnnotation(7)
	public static String CompanyId;
	
	@MyAnnotation(8)
	public static String PrintTemplate;
	
	@MyAnnotation(9)
	public static String CDKey;
	
	/**
	 * DeviceConfig.ini 21-40
	 */
	@MyAnnotation(21)
	public static String Scanner;
	
	@MyAnnotation(22)
	public static String CashBox;
	
	@MyAnnotation(23)
	public static String ElectronicScale;

	@MyAnnotation(24)
	public static String Keyboard;
	
	@MyAnnotation(25)
	public static String ICCard;
	
	@MyAnnotation(26)
	public static String Printer;
	
	@MyAnnotation(27)
	public static String MSR;

	@MyAnnotation(28)
	public static String LineDisplay;

	@MyAnnotation(29)
	public static String Integrator;
	
	/**
	 * DeviceParams.ini 41-60
	 */
	@MyAnnotation(41)
	public static String ScannerParams;
	
	@MyAnnotation(42)
	public static String CashBoxParams;
	
	@MyAnnotation(43)
	public static String ElectronicScaleParams;

	@MyAnnotation(44)
	public static String KeyboardParams;
	
	@MyAnnotation(45)
	public static String ICCardParams;
	
	@MyAnnotation(46)
	public static String PrinterParams;
	
	@MyAnnotation(47)
	public static String MSRParams;

	@MyAnnotation(48)
	public static String LineDisplayParams;

	@MyAnnotation(49)
	public static String IntegratorParams;

	/**
	 * Getters and Setters
	 */
	public static String getServerIP() {
		return ServerIP;
	}

	public static void setServerIP(String serverIP) {
		ServerIP = serverIP;
	}

	public static int getServerPort() {
		return ServerPort;
	}

	public static void setServerPort(int serverPort) {
		ServerPort = serverPort;
	}

	public static String getServerPath() {
		return ServerPath;
	}

	public static void setServerPath(String serverPath) {
		ServerPath = serverPath;
	}

	public static int getReceiveTimeout() {
		return ReceiveTimeout;
	}

	public static void setReceiveTimeout(int receiveTimeout) {
		ReceiveTimeout = receiveTimeout;
	}

	public static String getTerminalNo() {
		return TerminalNo;
	}

	public static void setTerminalNo(String terminalNo) {
		TerminalNo = terminalNo;
	}

	public static String getShopId() {
		return ShopId;
	}

	public static void setShopId(String shopId) {
		ShopId = shopId;
	}

	public static String getCompanyId() {
		return CompanyId;
	}

	public static void setCompanyId(String companyId) {
		CompanyId = companyId;
	}

	public static String getPrintTemplate() {
		return PrintTemplate;
	}

	public static void setPrintTemplate(String printTemplate) {
		PrintTemplate = printTemplate;
	}

	public static String getCDKey() {
		return CDKey;
	}

	public static void setCDKey(String cDKey) {
		CDKey = cDKey;
	}

	public static String getScanner() {
		return Scanner;
	}

	public static void setScanner(String scanner) {
		Scanner = scanner;
	}

	public static String getCashBox() {
		return CashBox;
	}

	public static void setCashBox(String cashBox) {
		CashBox = cashBox;
	}

	public static String getElectronicScale() {
		return ElectronicScale;
	}

	public static void setElectronicScale(String electronicScale) {
		ElectronicScale = electronicScale;
	}

	public static String getKeyboard() {
		return Keyboard;
	}

	public static void setKeyboard(String keyboard) {
		Keyboard = keyboard;
	}

	public static String getICCard() {
		return ICCard;
	}

	public static void setICCard(String iCCard) {
		ICCard = iCCard;
	}

	public static String getPrinter() {
		return Printer;
	}

	public static void setPrinter(String printer) {
		Printer = printer;
	}

	public static String getMSR() {
		return MSR;
	}

	public static void setMSR(String mSR) {
		MSR = mSR;
	}

	public static String getLineDisplay() {
		return LineDisplay;
	}

	public static void setLineDisplay(String lineDisplay) {
		LineDisplay = lineDisplay;
	}

	public static String getIntegrator() {
		return Integrator;
	}

	public static void setIntegrator(String integrator) {
		Integrator = integrator;
	}

	public static String getScannerParams() {
		return ScannerParams;
	}

	public static void setScannerParams(String scannerParams) {
		ScannerParams = scannerParams;
	}

	public static String getCashBoxParams() {
		return CashBoxParams;
	}

	public static void setCashBoxParams(String cashBoxParams) {
		CashBoxParams = cashBoxParams;
	}

	public static String getElectronicScaleParams() {
		return ElectronicScaleParams;
	}

	public static void setElectronicScaleParams(String electronicScaleParams) {
		ElectronicScaleParams = electronicScaleParams;
	}

	public static String getKeyboardParams() {
		return KeyboardParams;
	}

	public static void setKeyboardParams(String keyboardParams) {
		KeyboardParams = keyboardParams;
	}

	public static String getICCardParams() {
		return ICCardParams;
	}

	public static void setICCardParams(String iCCardParams) {
		ICCardParams = iCCardParams;
	}

	public static String getPrinterParams() {
		return PrinterParams;
	}

	public static void setPrinterParams(String printerParams) {
		PrinterParams = printerParams;
	}

	public static String getMSRParams() {
		return MSRParams;
	}

	public static void setMSRParams(String mSRParams) {
		MSRParams = mSRParams;
	}

	public static String getLineDisplayParams() {
		return LineDisplayParams;
	}

	public static void setLineDisplayParams(String lineDisplayParams) {
		LineDisplayParams = lineDisplayParams;
	}

	public static String getIntegratorParams() {
		return IntegratorParams;
	}

	public static void setIntegratorParams(String integratorParams) {
		IntegratorParams = integratorParams;
	}
}
