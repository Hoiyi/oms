package com.hu.sysManagement.common.controller;

import com.hu.sysManagement.common.domain.Platform;
import com.hu.sysManagement.common.service.PlatformService;
import com.hu.sysManagement.common.utils.BeanFilter;
import com.hu.sysManagement.common.utils.PageUtils;
import com.hu.sysManagement.common.utils.Query;
import com.hu.sysManagement.common.utils.Result;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping({"/common/platform"})
public class PlatformController extends BaseController {

    @Autowired
    private PlatformService platformService;

    @Autowired
    private BeanFilter<Platform> filter;
    private String prefix = "sysManagement/common/platform";

    @GetMapping
    @RequiresPermissions({"common:platform:platform"})
    String platform() {
        return this.prefix + "/platform";
    }

    @ResponseBody
    @GetMapping({"/list"})
    @RequiresPermissions({"common:platform:platform"})
    public PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<Platform> platformList = this.platformService.list(query);
        int total = this.platformService.count(query);
        PageUtils pageUtils = new PageUtils(platformList, total);
        return pageUtils;
    }

    @ResponseBody
    @GetMapping({"/platList"})
    @RequiresPermissions({"common:platform:platform"})
    public List<Platform> platList(@RequestParam Map<String, Object> params) {
        List<Platform> platformList = this.platformService.list(new HashMap<>());

        return platformList;
    }

    @ResponseBody
    @PostMapping({"/save"})
    @RequiresPermissions({"common:platform:add"})
    public Result save(Platform platform) {
        this.filter.clearSpace(platform);
        if (this.platformService.save(platform) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @PostMapping({"/update"})
    @RequiresPermissions({"common:platform:edit"})
    public Result update(Platform platform) {
        this.filter.clearSpace(platform);
        if (this.platformService.update(platform) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @GetMapping({"/remove/{platId}"})
    @RequiresPermissions({"common:platform:remove"})
    public Result remove(@PathVariable("platId") Long platId) {
        return this.platformService.remove(platId);
    }

    @PostMapping({"/exist"})
    @ResponseBody
    boolean exist(@RequestParam Map<String, Object> params) {
        return this.platformService.count(BeanFilter.clearSpace(params)) <= 0;
    }
}