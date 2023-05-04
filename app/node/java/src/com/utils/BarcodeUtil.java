/**   
 * Copyright © 2019 e-future. All rights reserved.
 * 
 * @Title: BarcodeUtil.java 
 * @Prject: java
 * @Package: com.utils 
 * @Description: TODO
 * @author: yincan   
 * @date: 2019年8月7日 上午10:49:15 
 * @version: V1.0   
 */
package com.utils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.krysalis.barcode4j.HumanReadablePlacement;
import org.krysalis.barcode4j.impl.code128.Code128Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;

/**
 * @Description: TODO
 * @author: yincan
 * @date: 2019年8月7日 上午10:49:15
 */
public class BarcodeUtil {

	/**
	 * 生成文件
	 *
	 * @param msg
	 * @param path
	 * @return
	 */
	public static File generateFile(String msg, String path, int height, float width, int dpiPara, int quietZone,
			int fontSize) {
		File file = new File(path);
		FileOutputStream out = null;
		try {
			out = new FileOutputStream(file);
			generate(msg, out, height, width, dpiPara, quietZone, fontSize);
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				if (out != null) {
					out.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return file;
	}

	/**
	 * 生成字节
	 *
	 * @param msg
	 * @return
	 */
	public static byte[] generate(String msg, int height, float width, int dpiPara, int quietZone, int fontSize) {
		ByteArrayOutputStream ous = new ByteArrayOutputStream();
		generate(msg, ous, height, width, dpiPara, quietZone, fontSize);
		return ous.toByteArray();
	}

	/**
	 * 
	 * @Title: generate
	 * @Description: TODO
	 * @param ms--打印数据
	 * @param ous--输出文件流
	 * @param height--条码高度
	 * @param width--条码宽度
	 * @param dpiPara--精度
	 * @param quietZone--条码外层空白区
	 * @param fontSize--字体大小
	 * @return: void
	 * @author: yincan
	 * @date: 2019年9月2日 下午3:45:29
	 */
	public static void generate(String msg, OutputStream ous, int height, float width, int dpiPara, int quietZone,
			int fontSize) {
		if (StringUtils.isEmpty(msg) || ous == null) {
			return;
		}
		// Create the barcode bean
		Code128Bean bean = new Code128Bean();
		// 值越大条码越长，分辨率越高。
		final int dpi = dpiPara;

		// UnitConv 是barcode4j 提供的单位转换的实体类，用于毫米mm,像素px,英寸in,点pt之间的转换
		bean.setBarHeight(height);
		bean.setModuleWidth(width);
		// 设置是否需要白色边框
		bean.doQuietZone(true);
		bean.setQuietZone(quietZone);// 两边空白区
		// 设置字体大小
		bean.setFontSize(fontSize);
		// 设置条码字体可读内容位置
		bean.setMsgPosition(HumanReadablePlacement.HRP_BOTTOM);
		String format = "image/bmp";
		try {

			// 输出到流
			BitmapCanvasProvider canvas = new BitmapCanvasProvider(ous, format, dpi, BufferedImage.TYPE_BYTE_BINARY,
					false, 0);
			// 生成条形码
			bean.generateBarcode(canvas, msg);

			// 结束绘制
			canvas.finish();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static void main(String[] args) {
		String msg = "2019082314562288888";
		String path = "D:\\DevTool\\GitWorkspace\\WindowsPos\\app\\node\\java\\barcode.bmp";
		generateFile(msg, path, 15, 0.315f, 150, 10, 3);
	}

}
