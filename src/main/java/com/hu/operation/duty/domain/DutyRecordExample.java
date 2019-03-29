package com.hu.operation.duty.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DutyRecordExample {
    protected String orderByClause;
    protected boolean distinct;
    protected List<Criteria> oredCriteria;

    public DutyRecordExample() {
        this.oredCriteria = new ArrayList();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return this.orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return this.distinct;
    }

    public List<Criteria> getOredCriteria() {
        return this.oredCriteria;
    }

    public void or(Criteria criteria) {
        this.oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        this.oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (this.oredCriteria.size() == 0) {
            this.oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        this.oredCriteria.clear();
        this.orderByClause = null;
        this.distinct = false;
    }

    public static class Criteria extends GeneratedCriteria {
    }

    public static class Criterion {
        private String condition;
        private Object value;
        private Object secondValue;
        private boolean noValue;
        private boolean singleValue;
        private boolean betweenValue;
        private boolean listValue;
        private String typeHandler;

        public String getCondition() {
            return this.condition;
        }

        public Object getValue() {
            return this.value;
        }

        public Object getSecondValue() {
            return this.secondValue;
        }

        public boolean isNoValue() {
            return this.noValue;
        }

        public boolean isSingleValue() {
            return this.singleValue;
        }

        public boolean isBetweenValue() {
            return this.betweenValue;
        }

        public boolean isListValue() {
            return this.listValue;
        }

        public String getTypeHandler() {
            return this.typeHandler;
        }

        protected Criterion(String condition) {
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if ((value instanceof List))
                this.listValue = true;
            else
                this.singleValue = true;
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }

    protected static abstract class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            this.criteria = new ArrayList();
        }

        public boolean isValid() {
            return this.criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return this.criteria;
        }

        public List<Criterion> getCriteria() {
            return this.criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            this.criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            this.criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if ((value1 == null) || (value2 == null)) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            this.criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdIsNull() {
            addCriterion("duty_emp_id is null");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdIsNotNull() {
            addCriterion("duty_emp_id is not null");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdEqualTo(Long long1) {
            addCriterion("duty_emp_id =", long1, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdNotEqualTo(Integer value) {
            addCriterion("duty_emp_id <>", value, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdGreaterThan(Integer value) {
            addCriterion("duty_emp_id >", value, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("duty_emp_id >=", value, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdLessThan(Integer value) {
            addCriterion("duty_emp_id <", value, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdLessThanOrEqualTo(Integer value) {
            addCriterion("duty_emp_id <=", value, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdIn(List<Integer> values) {
            addCriterion("duty_emp_id in", values, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdNotIn(List<Integer> values) {
            addCriterion("duty_emp_id not in", values, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdBetween(Integer value1, Integer value2) {
            addCriterion("duty_emp_id between", value1, value2, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyEmpIdNotBetween(Integer value1, Integer value2) {
            addCriterion("duty_emp_id not between", value1, value2, "dutyEmpId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdIsNull() {
            addCriterion("duty_type_id is null");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdIsNotNull() {
            addCriterion("duty_type_id is not null");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdEqualTo(Integer value) {
            addCriterion("duty_type_id =", value, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdNotEqualTo(Integer value) {
            addCriterion("duty_type_id <>", value, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdGreaterThan(Integer value) {
            addCriterion("duty_type_id >", value, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("duty_type_id >=", value, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdLessThan(Integer value) {
            addCriterion("duty_type_id <", value, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdLessThanOrEqualTo(Integer value) {
            addCriterion("duty_type_id <=", value, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdIn(List<Integer> values) {
            addCriterion("duty_type_id in", values, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdNotIn(List<Integer> values) {
            addCriterion("duty_type_id not in", values, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdBetween(Integer value1, Integer value2) {
            addCriterion("duty_type_id between", value1, value2, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andDutyTypeIdNotBetween(Integer value1, Integer value2) {
            addCriterion("duty_type_id not between", value1, value2, "dutyTypeId");
            return (Criteria) this;
        }

        public Criteria andStartdateIsNull() {
            addCriterion("startdate is null");
            return (Criteria) this;
        }

        public Criteria andStartdateIsNotNull() {
            addCriterion("startdate is not null");
            return (Criteria) this;
        }

        public Criteria andStartdateEqualTo(Date value) {
            addCriterion("startdate =", value, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateNotEqualTo(Date value) {
            addCriterion("startdate <>", value, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateGreaterThan(Date value) {
            addCriterion("startdate >", value, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateGreaterThanOrEqualTo(Date value) {
            addCriterion("startdate >=", value, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateLessThan(Date value) {
            addCriterion("startdate <", value, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateLessThanOrEqualTo(Date value) {
            addCriterion("startdate <=", value, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateIn(List<Date> values) {
            addCriterion("startdate in", values, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateNotIn(List<Date> values) {
            addCriterion("startdate not in", values, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateBetween(Date value1, Date value2) {
            addCriterion("startdate between", value1, value2, "startdate");
            return (Criteria) this;
        }

        public Criteria andStartdateNotBetween(Date value1, Date value2) {
            addCriterion("startdate not between", value1, value2, "startdate");
            return (Criteria) this;
        }

        public Criteria andEnddateIsNull() {
            addCriterion("enddate is null");
            return (Criteria) this;
        }

        public Criteria andEnddateIsNotNull() {
            addCriterion("enddate is not null");
            return (Criteria) this;
        }

        public Criteria andEnddateEqualTo(Date value) {
            addCriterion("enddate =", value, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateNotEqualTo(Date value) {
            addCriterion("enddate <>", value, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateGreaterThan(Date value) {
            addCriterion("enddate >", value, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateGreaterThanOrEqualTo(Date value) {
            addCriterion("enddate >=", value, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateLessThan(Date value) {
            addCriterion("enddate <", value, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateLessThanOrEqualTo(Date value) {
            addCriterion("enddate <=", value, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateIn(List<Date> values) {
            addCriterion("enddate in", values, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateNotIn(List<Date> values) {
            addCriterion("enddate not in", values, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateBetween(Date value1, Date value2) {
            addCriterion("enddate between", value1, value2, "enddate");
            return (Criteria) this;
        }

        public Criteria andEnddateNotBetween(Date value1, Date value2) {
            addCriterion("enddate not between", value1, value2, "enddate");
            return (Criteria) this;
        }
    }
}