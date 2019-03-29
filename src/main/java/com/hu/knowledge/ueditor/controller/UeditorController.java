package com.hu.knowledge.ueditor.controller;

import com.hu.knowledge.ueditor.ActionEnter;
import com.hu.sysManagement.common.controller.BaseController;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin
public class UeditorController extends BaseController {

	@Value("${web.upload-path}")
	private String basePath;

	@RequestMapping({ "/ueditor" })
	public void config(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException, JSONException {
		response.setContentType("application/json");
		try {
			request.getContextPath();
			ActionEnter actionEnter = new ActionEnter(request, this.basePath);
			String exec = actionEnter.exec();
			PrintWriter writer = response.getWriter();
			writer.write(exec);
			writer.flush();
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}