package com.utils;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;

@Target({ FIELD })
@Retention(RetentionPolicy.RUNTIME)

/**
 * Created by wuruixuan on 2018/8/9.
 */

public @interface MyAnnotation {
	int value() default 0;
}
