package com.hu.knowledge.ueditor.define;

import java.util.HashMap;
import java.util.Map;

public class MIMEType
{
  public static final Map<String, String> types = new HashMap() { } ;

  public static String getSuffix(String mime)
  {
    return (String)types.get(mime);
  }
}