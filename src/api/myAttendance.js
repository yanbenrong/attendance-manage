import { postAction, getAction } from '@/api/manage'

// 日考勤详情
export const getDailyAttendance = params => postAction('/attendance/kqAttendanceSign/queryByDate', params)
// 查看日考勤数据
export const getDailyPunchData = params => getAction('/attendance/kqAttendanceSign/list', params)
// 月考勤详情
export const getMonthlyAttendance = params => postAction('/attendance/kqAttendanceSummary/queryByDate', params)
// 月考勤异常
export const getMonthlyAbnormalList = params => getAction('/attendance/kqAttendanceAbnormal/abnormalList', params)
// 请假详情
export const getAttendanceLeave = params => postAction('/attendance/kqAttendanceLeave/queryByDate', params)

// 补签申请
export const attendanceResign = params => postAction('attendance/kqAttendanceResign/add', params)
// 公出申请
export const attendanceOut = params => postAction('attendance/kqAttendanceOut/add', params)

// 假期池
export const getLeavePool = params => getAction('/attendance/kqLeavePool/list', params)
