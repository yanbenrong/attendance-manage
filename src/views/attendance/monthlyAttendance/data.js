export const column = {
  first: [
    { label: '当月应该出勤(天)', key: 'attendanceDays' },
    { label: '工作日天数', key: 'workDays' },
    { label: '节假日天数', key: 'vacationDays' },
    { label: '当月实际出勤(天)', key: 'realityAttendanceDays' },
    { label: '事假、迟到、早退、旷工、擅自离岗、工时缺失汇总小时', key: 'deficiencyHours' },
    { label: '事假(小时)', key: 'personalLeaveHours' },
    { label: '事假(天)', key: 'personalLeaveDays' },
    { label: '病假(小时)', key: 'sickLeaveHours' },
    { label: '病假(天)', key: 'sickLeaveDays' },
    { label: '婚假(天)', key: 'marriageLeaveDays' },
    { label: '产假(天)', key: 'maternityLeaveDays' },
    { label: '护理假(天)', key: 'nursingLeaveDays' },
    { label: '育儿(天)', key: 'childcareLeaveDays' },
    { label: '医疗期(天)', key: 'medicalTreatmentDays' },
    { label: '产检假(小时)', key: 'prenatalLeaveHours' },
    { label: '哺乳假(小时)', key: 'breastfeedingLeaveHours' },
    { label: '丧假+路程假(天)', key: 'funeralLeaveDays' },
    { label: '晚餐补助(次)', key: 'dinnerCount' }
  ],
  second: [
    {
      label: '迟到次数',
      key: 'lateCount'
    },
    {
      label: '迟到总小时',
      key: 'lateHours'
    }
  ],
  third: [
    {
      label: '早退次数',
      key: 'leaveEarlyCount'
    },
    {
      label: '早退总小时',
      key: 'leaveEarlyHours'
    }
  ],
  fourth: [
    {
      label: '擅自离岗次数',
      key: 'leaveJobCount'
    },
    {
      label: '擅自离岗总小时',
      key: 'leaveJobHours'
    }
  ],
  fifth: [
    {
      label: '旷工次数',
      key: 'absenteeismCounts'
    },
    {
      label: '旷工总小时',
      key: 'absenteeismHours'
    }
  ],
  sixth: [
    {
      label: '月忘打卡次数',
      key: 'resignCounts'
    },
    {
      label: '本月新增法定假日加班小时数',
      key: 'absenteeismHours'
    },
    {
      label: '本月新增可补休数(小时)',
      key: 'leaveOvertimeHours'
    },
    {
      label: '本月已补休(小时)',
      key: 'alCompensatoryHours'
    },
    {
      label: '本月已休年休假(天)',
      key: 'alAnnualDays'
    },
    {
      label: '月工时缺失小时数',
      key: 'mdeficiencyHours'
    },
    {
      label: 'MNC补休资源池 (小时)',
      key: 'mncCompensatoryHours'
    },
    {
      label: '当月平均日标准工时',
      key: 'maverageHours'
    }
  ]
}

