package com.utils;

import java.lang.reflect.Field;

/**
 * Created by wuruixuan on 2018/8/9.
 */

public class MyAnnotationProcessor {
	public int getSequence(Field field) {
		if (field.isAnnotationPresent(MyAnnotation.class)) {
			MyAnnotation myAnnotation = (MyAnnotation) field.getAnnotation(MyAnnotation.class);
			return myAnnotation.value();
		}
		return 0;
	}
}
