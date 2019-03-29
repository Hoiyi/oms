package com.hu.knowledge.ueditor.define;

import com.hu.knowledge.ueditor.Encoder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class MultiState implements State {
    private boolean state = false;
    private String info = null;
    private Map<String, Long> intMap = new HashMap<String, Long>();
    private Map<String, String> infoMap = new HashMap<String, String>();
    private List<String> stateList = new ArrayList<String>();

    public MultiState(boolean state) {
        this.state = state;
    }

    public MultiState(boolean state, String info) {
        this.state = state;
        this.info = info;
    }

    public MultiState(boolean state, int infoKey) {
        this.state = state;
        this.info = AppInfo.getStateInfo(infoKey);
    }

    @Override
    public boolean isSuccess() {
        return this.state;
    }

    public void addState(State state) {
        this.stateList.add(state.toJSONString());
    }

    @Override
    public void putInfo(String name, String val) {
        this.infoMap.put(name, val);
    }

    @Override
    public String toJSONString() {
        String stateVal = isSuccess() ? AppInfo.getStateInfo(0) : this.info;

        StringBuilder builder = new StringBuilder();

        builder.append("{\"state\": \"" + stateVal + "\"");

        Iterator iterator = this.intMap.keySet().iterator();

        while (iterator.hasNext()) {
            stateVal = (String) iterator.next();

            builder.append(",\"" + stateVal + "\": " + this.intMap.get(stateVal));
        }

        iterator = this.infoMap.keySet().iterator();

        while (iterator.hasNext()) {
            stateVal = (String) iterator.next();

            builder.append(",\"" + stateVal + "\": \"" + (String) this.infoMap.get(stateVal) + "\"");
        }

        builder.append(", list: [");

        iterator = this.stateList.iterator();

        while (iterator.hasNext()) {
            builder.append((String) iterator.next() + ",");
        }

        if (this.stateList.size() > 0) {
            builder.deleteCharAt(builder.length() - 1);
        }

        builder.append(" ]}");

        return Encoder.toUnicode(builder.toString());
    }

    @Override
    public void putInfo(String name, long val) {
        this.intMap.put(name, Long.valueOf(val));
    }
}