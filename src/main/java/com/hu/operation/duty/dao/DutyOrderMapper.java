package com.hu.operation.duty.dao;

import com.hu.operation.duty.domain.DutyOrder;
import com.hu.operation.duty.domain.DutyOrderExample;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface DutyOrderMapper {
    int countByExample(DutyOrderExample paramDutyOrderExample);

    int deleteByExample(DutyOrderExample paramDutyOrderExample);

    int deleteByPrimaryKey(Integer paramInteger);

    int insert(DutyOrder paramDutyOrder);

    int insertSelective(DutyOrder paramDutyOrder);

    List<DutyOrder> selectByExample(DutyOrderExample paramDutyOrderExample);

    DutyOrder selectByPrimaryKey(Integer paramInteger);

    int updateByExampleSelective(@Param("record") DutyOrder paramDutyOrder,
                                 @Param("example") DutyOrderExample paramDutyOrderExample);

    int updateByExample(@Param("record") DutyOrder paramDutyOrder,
                        @Param("example") DutyOrderExample paramDutyOrderExample);

    int updateByPrimaryKeySelective(DutyOrder paramDutyOrder);

    int updateByPrimaryKey(DutyOrder paramDutyOrder);
}