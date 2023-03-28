import { postAction, getAction, putAction } from '@/api/manage'

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
// 请假申请
export const attendanceLeave = params => postAction('attendance/kqAttendanceLeave/add', params)
// 公出申请
export const attendanceOut = params => postAction('attendance/kqAttendanceOut/add', params)
// 获取全部部门树形数据
export const getQueryTreeList = params => getAction('/sys/sysDepart/queryTreeList', params)
// 获取我的部门树形数据
export const getQueryMyTreeList = params => getAction('/sys/sysDepart/queryMyDeptTreeList', params)
// 根据部门查询用户
export const getUserByDepid = params => getAction('/sys/user/queryUserByDepId', params)

// 审批列表
export const getExamineList = params => getAction('/attendance/kqFlowMainProcess/examineList', params)
// id查审批详情
export const getExamineInfoById = params => getAction('/attendance/kqFlowMainProcess/queryById', params)
// id查审批详情
export const putExamine = params => putAction('/attendance/kqFlowMainProcess/examine', params)
// 假期池
export const getLeavePool = params => getAction('/attendance/kqLeavePool/list', params)

