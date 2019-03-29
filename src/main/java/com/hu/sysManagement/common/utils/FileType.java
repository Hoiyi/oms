package com.hu.sysManagement.common.utils;

public class FileType {
    public static int fileType(String fileName) {
        if (fileName == null) {
            fileName = "文件名为空！";
            return 500;
        }

        String fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length()).toLowerCase();

        String[] img = {"bmp", "jpg", "jpeg", "png", "tiff", "gif", "pcx", "tga", "exif", "fpx", "svg", "psd",
                "cdr", "pcd", "dxf", "ufo", "eps", "ai", "raw", "wmf"};
        for (int i = 0; i < img.length; i++) {
            if (img[i].equals(fileType)) {
                return 0;
            }

        }

        String[] document = {"txt", "doc", "docx", "xls", "htm", "html", "jsp", "rtf", "wpd", "pdf", "ppt"};
        for (int i = 0; i < document.length; i++) {
            if (document[i].equals(fileType)) {
                return 1;
            }
        }

        String[] video = {"mp4", "avi", "mov", "wmv", "asf", "navi", "3gp", "mkv", "f4v", "rmvb", "webm"};
        for (int i = 0; i < video.length; i++) {
            if (video[i].equals(fileType)) {
                return 2;
            }
        }

        String[] music = {"mp3", "wma", "wav", "mod", "ra", "cd", "md", "asf", "aac", "vqf", "ape", "mid", "ogg",
                "m4a", "vqf"};
        for (int i = 0; i < music.length; i++) {
            if (music[i].equals(fileType)) {
                return 3;
            }

        }

        return 99;
    }
}