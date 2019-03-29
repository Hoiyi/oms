package com.hu.knowledge.ueditor.define;

import com.hu.knowledge.ueditor.Encoder;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class BaseState
        implements State {
    private boolean state = false;
    private String info = null;

    private Map<String, String> infoMap = new HashMap();

    public BaseState() {
        this.state = true;
    }

    public BaseState(boolean state) {
        setState(state);
    }

    public BaseState(boolean state, String info) {
        setState(state);
        this.info = info;
    }

    public BaseState(boolean state, int infoCode) {
        setState(state);
        this.info = AppInfo.getStateInfo(infoCode);
    }

    @Override
    public boolean isSuccess() {
        return this.state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public void setInfo(int infoCode) {
        this.info = AppInfo.getStateInfo(infoCode);
    }

    @Override
    public String toJSONString() {
        return toString();
    }

    @Override
    public String toString() {
        String key = null;
        String stateVal = isSuccess() ? AppInfo.getStateInfo(0) : this.info;

        StringBuilder builder = new StringBuilder();

        builder.append("{\"state\": \"" + stateVal + "\"");

        Iterator<String> iterator = this.infoMap.keySet().iterator();

        while (iterator.hasNext()) {
            key = (String) iterator.next();

            builder.append(",\"" + key + "\": \"" + (String) this.infoMap.get(key) + "\"");
        }

        builder.append("}");

        return Encoder.toUnicode(builder.toString());
    }

    @Override
    public void putInfo(String name, String val) {
        this.infoMap.put(name, val);
    }

    @Override
    public void putInfo(String name, long val) {
        putInfo(name, val);
    }
}