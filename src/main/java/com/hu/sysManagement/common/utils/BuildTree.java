package com.hu.sysManagement.common.utils;

import com.hu.sysManagement.common.config.Constant;
import com.hu.sysManagement.common.domain.Tree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BuildTree {
    public static <T> Tree<T> build(List<Tree<T>> nodes) {
        if (nodes == null) {
            return null;
        }
        List topNodes = new ArrayList();
        for (Tree children : nodes) {
            String pid = children.getParentId();
            if ((pid == null) || ("0".equals(pid))) {
                topNodes.add(children);
            } else {
                for (Tree parent : nodes) {
                    String id = parent.getId();
                    if ((id != null) && (id.equals(pid))) {
                        parent.getChildren().add(children);
                        children.setHasParent(true);
                        parent.setChildren(true);
                    }
                }
            }
        }

        Tree root = new Tree();

        root.setId("-1");
        root.setParentId("");
        root.setHasParent(false);
        root.setChildren(true);
        root.setChecked(true);
        root.setChildren(topNodes);
        root.setText(Constant.companyName);
        Object state = new HashMap(16);
        ((Map) state).put("opened", Boolean.valueOf(true));
        root.setState((Map) state);

        return root;
    }

    public static <T> List<Tree<T>> buildList(List<Tree<T>> nodes, String idParam) {
        if (nodes == null) {
            return null;
        }
        List topNodes = new ArrayList();
        for (Tree children : nodes) {
            String pid = children.getParentId();
            if ((pid == null) || (idParam.equals(pid))) {
                topNodes.add(children);
            } else {
                for (Tree parent : nodes) {
                    String id = parent.getId();
                    if ((id != null) && (id.equals(pid))) {
                        parent.getChildren().add(children);
                        children.setHasParent(true);
                        parent.setChildren(true);
                    }
                }
            }
        }

        return topNodes;
    }
}