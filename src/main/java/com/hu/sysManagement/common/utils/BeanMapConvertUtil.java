package com.hu.sysManagement.common.utils;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DoubleConverter;
import org.apache.commons.beanutils.converters.IntegerConverter;
import org.apache.commons.beanutils.converters.LongConverter;
import org.apache.commons.beanutils.converters.ShortConverter;

public class BeanMapConvertUtil<T> {
    private Class clazz;

    public BeanMapConvertUtil(Class clazz) {
        this.clazz = clazz;
    }

    public List<T> convert(List<Map<String, Object>> list) {
        List beans = new ArrayList();
        try {
            for (Map map : list) {
                ConvertUtils.register(new LongConverter(null), Long.class);
                ConvertUtils.register(new ShortConverter(null), Short.class);
                ConvertUtils.register(new IntegerConverter(null), Integer.class);
                ConvertUtils.register(new DoubleConverter(null), Double.class);
                ConvertUtils.register(new BigDecimalConverter(null), BigDecimal.class);
                Object bean = this.clazz.newInstance();
                BeanUtils.populate(bean, map);
                beans.add(bean);
            }
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return beans;
    }

    public T convert(Map<String, Object> map, Class<?> clazz) {
        Object bean = null;
        try {
            ConvertUtils.register(new LongConverter(null), Long.class);
            ConvertUtils.register(new ShortConverter(null), Short.class);
            ConvertUtils.register(new IntegerConverter(null), Integer.class);
            ConvertUtils.register(new DoubleConverter(null), Double.class);
            ConvertUtils.register(new BigDecimalConverter(null), BigDecimal.class);
            bean = clazz.newInstance();
            BeanUtils.populate(bean, map);
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return (T) bean;
    }
}