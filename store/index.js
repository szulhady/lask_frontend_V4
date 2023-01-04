import {SummaryCard, status, status2} from '~/src/utils/class'
export const state = ()=>({
  attempts:0,
  summaryCard:[
    new SummaryCard('mdi-account', '', '', 'firstIcon'),
    // new SummaryCard('mdi-percent-outline', 'OVERALL', '90%', 'firstIcon'),
    new SummaryCard('mdi-clipboard-text-multiple-outline', 'SESSIONS', "", 'secondIcon'),
    new SummaryCard('mdi-needle', 'ATTEMPTS', "", 'fourthIcon'),
    new SummaryCard('mdi-bullseye', 'ACCURACY', "", 'thirdIcon')
  ],
  summaryCardLecturer:[
    new SummaryCard('mdi-account', '', '', 'firstIcon'),
    new SummaryCard('mdi-clipboard-text-multiple-outline', 'CLASS', "", 'secondIcon'),
    new SummaryCard('mdi-account-multiple', 'STUDENTS', "", 'fourthIcon'),
    // new SummaryCard('mdi-bullseye', 'ACCURACY', "", 'thirdIcon')
  ],
  openDialogTraining:false,
  countAccurate:0,
  countAcceptable:0,
  countUnacceptable:0,
  reset:false,
  forceArray:[],
  timeArray:[],
  headers: [
    {
      text: "Date",
      align: "start",
      sortable: false,
      value: "date",
    },
    { text: "Good Injection", align: 'center', value: "goodinjection" },
    { text: "Bad Injection", align: 'center', value: "badinjection" },
    { text: "Fail Injection", align: 'center', value: "failinjection" },
    { text: "Success Rate", align: 'center', value: "rate" },
    { text: "Attempts",  align: 'center',value: "attempts" },
    { text: "Accurate",  align: 'center',value: "accurate" },
    { text: "Acceptable",  align: 'center',value: "acceptable" },
    { text: "Fail", align: 'center', value: "fail" },
    { text: "Good Force", align: 'center', value: "goodforce" },
    { text: "Exceed Force", align: 'center', value: "exceedforce" },
    
  ],
  headers2: [
    { text: "Name", value: "fullname" , class:"custom-class2"},
    { text: "Student Id", value: "user_id"  },
  ],
  status: [
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
    new status('10/01/2022', 60,20,20,20,'20%'),
  ],
  status2: [
    new status2("Ali bin dasdhjakhdajhdjadadasdasdasdasdshdjkashdashdkj",2012123456),
    new status2("Abu",2012123456),
    new status2("Ali",2012123456),
    new status2("Ali",2012123456),
    new status2("Ali",2012123456),
    new status2("Ali",2012123456),
    new status2("Ali",2012123456),
    new status2("Ali",2012123456),
    new status2("Ali",2012123456),
    new status2("Ali",2012123456),

  ],
  fetchDataAcceptable:0,
  fetchDataAccurate:0,
  fetchDataAttempts:0,
  fetchDataCount:0,
  fetchDataFail:0,
  fetchDataPass:0,
  fetchDataGoodInjection: 0,
  fetchDataBadInjection :0,
  fetchDataGoodForce :0,
  fetchDataExceedForce:0,
  classs:[],
  students:[],
  arraySessionStudent:[],
  activeStudentName:"",
  submitButton:false,
  id:null,
  stateGoodInjection:0,
  stateBadInjection:0,
  stateFailInjection:0,
  stateAccuratePoint:0,
  stateAcceptablePoint:0,
  stateFailPoint:0,
  stateGoodForce:0,
  stateExceedForce:0,
})

export const mutations = {

  setUser(state,payload){
  state.summaryCard[0].text = payload.username
  state.summaryCard[0].data = payload.user_id
  },
  setUserLecturer(state,payload){
  state.summaryCardLecturer[0].text = payload.username
  state.summaryCardLecturer[0].data = payload.user_id
  },
  setCardLecturerClass(state,payload){
  state.summaryCardLecturer[1].data = payload
  },
  setCardLecturerStudents(state,payload){
  state.summaryCardLecturer[2].data = payload
  },
  setSummaryCard(state,payload){
    if(payload == null){
      state.summaryCard[1].data = 0
      state.summaryCard[2].data = 0
      state.summaryCard[3].data = 0
      state.attempts = 0
    }else{
      state.attempts =  payload.attempts
      state.summaryCard[1].data = payload.count
      state.summaryCard[2].data = payload.attempts
      state.summaryCard[3].data = (parseFloat(payload.pass/payload.attempts *100)).toFixed(2)
    }
  },


  setFetchData(state, payload){
    // console.log(payload)
    state.fetchDataAcceptable = payload.acceptable
    state.fetchDataAccurate = payload.accurate
    state.fetchDataAttempts = payload.attempts
    state.fetchDataCount = payload.count
    state.fetchDataFail = payload.fail
    state.fetchDataPass = payload.pass
    state.fetchDataGoodInjection = payload.goodInjection
    state.fetchDataBadInjection = payload.badInjection
    state.fetchDataGoodForce = payload.goodForce
    state.fetchDataExceedForce = payload.exceedForce
  },

  setOpenDialogTraining(state, payload){
    state.openDialogTraining=payload
  },
  setClasss(state, payload){
    state.classs=payload
  },

  setStudents(state,payload){
    state.students=payload
    console.log(state.students)
  },
  setArraySessionStudent(state,payload){
    state.arraySessionStudent=payload
  },
  setActiveStudentName(state,payload){
    state.activeStudentName = payload
  },
  setClear(state){
    state.fetchDataAcceptable=0
    state.fetchDataAccurate=0
    state.fetchDataAttempts=0
    state.fetchDataCount=0
    state.fetchDataFail=0
    state.fetchDataPass=0
    state.fetchDataGoodInjection= 0
    state.fetchDataBadInjection =0
    state.fetchDataGoodForce =0
    state.fetchDataExceedForce=0
    state.classs=[]
    state.students=[]
    state.arraySessionStudent=[]
    state.activeStudentName=""
    state.attempts=0
    state.countAccurate=0
    state.countAcceptable=0
    state.countUnacceptable=0

    state.stateGoodInjection=0
    state.stateBadInjection=0
    state.stateFailInjection=0
    state.stateAccuratePoint=0
    state.stateAcceptablePoint=0
    state.stateFailPoint=0
    state.stateGoodForce=0
    state.stateExceedForce=0
  },
  setClearStudent(state){
    state.arraySessionStudent=[]
    state.activeStudentName=""
  },
  setSubmitButton(state, payload){
    state.submitButton = payload
  },
  setId(state, payload){
    state.id = payload
    console.log(state.id)
  },

  setStateGoodInjection(state, payload){
    state.stateGoodInjection = payload
  },
  setStateBadInjection(state, payload){
    state.stateBadInjection = payload
  },
  setStateFailInjection(state, payload){
    state.stateFailInjection = payload
  },
  setStateAccuratePoint(state, payload){
    state.stateAccuratePoint = payload
  },
  setStateAcceptablePoint(state, payload){
    state.stateAcceptablePoint = payload
  },
  setStateFailPoint(state, payload){
    state.stateFailPoint = payload
  },
  setStateGoodForce(state, payload){
    state.stateGoodForce = payload
  },
  setStateExceedForce(state, payload){
    state.stateExceedForce = payload
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
    // return {username:"ali"}
  },

}