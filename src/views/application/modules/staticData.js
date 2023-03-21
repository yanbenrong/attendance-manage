let commonTip = `①请假时长超过1天且第一天是全天请假的，请假开始时间需早于或等于班次最早上班时间。
    ②请假时长超过1天，第一天请半天假且请假结束时间为班次弹性后时间的，需要按天拆开分别提交请假电子流。`
export const vacateTypeTip = {
  事假: {
    tip: commonTip,
    minUnit: '30分钟',
    uploadTip: ''
  },
  病假: {
    tip: `${commonTip}
    ③请您及时将带薪假相关证明材料及电子流编号提交至考勤专员邮箱，以免造成考勤异常，若已提交，请忽略此提醒。
    ④员工手册规定，除法定医疗期外，公司可酌情给予患病或身体不适的员工一年内额外病假期12天，但需员工事前向公司提出请假申请并经公司审批同意。`,
    minUnit: '30分钟',
    uploadTip:
      '病假需同时提供社会医疗保险指定医院或绑定的社康中心开具并盖医院（或中心）印章的病假证明及缴费凭证、病例、检查单等'
  },
  年假: {
    tip: commonTip,
    minUnit: '30分钟',
    uploadTip: ''
  },
  补休: {
    tip: commonTip,
    minUnit: '30分钟',
    uploadTip: ''
  },
  婚假: {
    tip: `${commonTip} 请您及时将带薪假相关证明材料及电子流编号提交至考勤专员邮箱，以免造成考勤异常，若已提交，请忽略此提醒。`,
    minUnit: '1天',
    uploadTip: '结婚证，需露出员工身份证号信息'
  },
  护理假: {
    tip: `${commonTip} 请您及时将带薪假相关证明材料及电子流编号提交至考勤专员邮箱，以免造成考勤异常，若已提交，请忽略此提醒。`,
    minUnit: '1天',
    uploadTip: '结婚证、准生证明、出生证明（可等孩子出生后补交）'
  },
  丧假与路程假: {
    tip: commonTip,
    minUnit: '1天',
    uploadTip: '死亡证明'
  },
  育儿假: {
    tip: `①孩子信息填写后将作为后续育儿假申请依据，请谨慎填写。\n
    ②孩子信息如需修改，请前往门户首页-个人信息进行修改。\n
    ③请您及时将带薪假相关证明材料及电子流编号提交至考勤专员邮箱，以免造成考勤异常，若已提交，请忽略此提醒。`,
    minUnit: '1天',
    uploadTip: '结婚证、出生证明（当年入职员工需提供上家单位没有休育儿假或已休育儿假天数的相关证明）'
  },
  医疗期: {
    tip: `①请您及时将带薪假相关证明材料上传，或将证明材料及电子流编号提交至考勤专员邮箱，以免造成考勤异常。
    ②医疗期相关政策请参见《企业职工患病或非因工负伤医疗期规定》。`,
    minUnit: '1天',
    uploadTip:
      '需同时提供社会医疗保险指定医院或绑定的社康中心开具并盖医院（或中心）印章的病假证明及缴费凭证、病例、检查单等'
  }
}
// 考勤专员邮箱
export const specialistMail = [
  { name: '郑蕊', role: '考勤专员', department: 'HWG其他', jobNumber: '0000059152', mail: 'zhengrui@chinasoftinc.com' },
  { name: '范世萍', role: '其他', department: '其他', jobNumber: '0000101612', mail: 'fanshiping@chinasofti.com' },
  {
    name: '陈雪爱',
    role: '考勤专员',
    department: 'HWG(技术服务业务线、流程IT业务线、网络业务线)',
    jobNumber: '0000158860',
    mail: 'chenxueai@chinasofti.com'
  },
  { name: '任杰', role: '考勤专员', department: 'ASG其他', jobNumber: '0000178544', mail: 'renjie001@chinasofti.com' },
  {
    name: '唐欢',
    role: '考勤专员',
    department: 'FBG其他',
    jobNumber: '0000274522',
    mail: 'tanghuan001@chinasofti.com'
  },
  {
    name: '赵萍萍',
    role: '考勤专员',
    department: 'ASG(BPO事业部、腾讯事业部、终端事业部)+FBG(汇丰业务线)',
    jobNumber: '0000309895',
    mail: 'zhaopingping@chinasofti.com'
  },
  { name: '王佐洋', role: '考勤专员', department: 'ABG', jobNumber: '0000327940', mail: 'wangzuoyang@chinasofti.com' }
]
// 请假类型下拉选择框option
export const typeOption = [
  { key: '1', title: '事假' },
  { key: '2', title: '病假' },
  { key: '3', title: '年假' },
  { key: '4', title: '补休' },
  { key: '5', title: '婚假' },
  { key: '6', title: '产检假' },
  { key: '7', title: '产假' },
  { key: '8', title: '哺乳假' },
  { key: '9', title: '护理假' },
  { key: '10', title: '丧假与路程假' },
  { key: '11', title: '育儿假' },
  { key: '12', title: '医疗期' }
]

