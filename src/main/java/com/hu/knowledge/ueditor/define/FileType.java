package com.hu.knowledge.ueditor.define;

import java.util.HashMap;
import java.util.Map;

public class FileType
{
  public static final String JPG = "JPG";
  private static final Map<String, String> types = new HashMap() { } ;

  public static String getSuffix(String key)
  {
    return (String)types.get(key);
  }

  public static String getSuffixByFilename(String filename)
  {
    return filename.substring(filename.lastIndexOf(".")).toLowerCase();
  }
}