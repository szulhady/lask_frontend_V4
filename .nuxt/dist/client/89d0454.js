(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{524:function(t,e,n){var content=n(579);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(44).default)("4d19bbf0",content,!0,{sourceMap:!1})},578:function(t,e,n){"use strict";n(524)},579:function(t,e,n){var r=n(43)(!1);r.push([t.i,"\n.row-pointer:hover {\r\n  cursor: pointer;\n}\nhr {\r\n  margin: 0 20px;\n}\n.custom-class2 {\r\n  width: 50px;\n}\n.text-start {\r\n  text-overflow: ellipsis !important;\r\n  overflow: hidden !important;\r\n  white-space: nowrap !important;\n}\n.v-application--is-ltr .v-data-footer__select .v-select {\r\n  display: none;\r\n  color: transparent;\n}\n.v-data-footer__select {\r\n  /* display: none; */\r\n  color: transparent;\n}\r\n/* Table */\n.v-data-table.table-font.theme--dark {\r\n  background-color: transparent !important;\r\n  border-radius: 10px;\r\n  overflow: hidden;\n}\ntr {\r\n  /* background-color: rgb(162, 216, 224); */\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  padding: 0px !important;\r\n  font-size: 0.9em;\r\n  height: 5vh !important;\r\n  width: 100%;\n}\ntbody tr:nth-of-type(even) {\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n  /* background-color: red; */\r\n  /* background-color: rgb(255, 255, 255); */\r\n  padding: 0px !important;\r\n  color: #eee;\r\n  height: 5vh !important;\n}\n.v-data-table > .v-data-table__wrapper > table > thead > tr > th {\r\n  font-size: 0.9em !important;\r\n  height: 5.3vh !important;\n}\n.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {\r\n  font-size: 0.9em !important;\r\n  height: 5.3vh !important;\n}\ntbody tr:nth-of-type(odd) {\r\n  background-color: rgba(0, 0, 0, 0.3);\r\n  /* background-color: rgb(230, 242, 244); */\r\n  padding: 0px !important;\r\n  color: #eee;\r\n  height: 5vh !important;\n}\n.v-data-table__wrapper {\r\n  border-bottom-left-radius: 8px;\r\n  border-bottom-right-radius: 8px;\r\n  /* text-overflow: ellipsis !important;\r\n  overflow: hidden !important;\r\n  white-space: nowrap !important; */\n}\r\n/* End of table */\r\n\r\n/* Pixel 2/ Iphone 6/7/8 Plus */\n@media (max-width: 500px) {\n.v-data-table__mobile-row__header {\r\n    font-size: 0.8rem;\n}\n.v-data-table__mobile-row__cell {\r\n    font-size: 0.8rem;\n}\nth {\r\n    background-color: rgb(255, 255, 255);\n}\n.v-data-table__mobile-row:nth-of-type(odd) {\r\n    background-color: rgb(230, 242, 244);\n}\n}\r\n/* MOTO G4/ Galaxy S5*/\n@media (max-width: 360px) {\n.v-data-table__mobile-row__header {\r\n    font-size: 0.8rem;\n}\n.v-data-table__mobile-row__cell {\r\n    font-size: 0.8rem;\n}\n}\r\n\r\n/* Iphone 5/SE */\n@media (max-width: 320px) {\n.v-data-table__mobile-row__header {\r\n    font-size: 0.7rem;\n}\n.v-data-table__mobile-row__cell {\r\n    font-size: 0.7rem;\n}\n}\r\n\r\n/* Galaxy Fold */\n@media (max-width: 300px) {\n.v-data-table__mobile-row__header {\r\n    font-size: 0.65rem;\n}\n.v-data-table__mobile-row__cell {\r\n    font-size: 0.65rem;\n}\n}\r\n",""]),t.exports=r},616:function(t,e,n){"use strict";n.r(e);var r=n(840),o=(n(30),n(22),n(28),n(13),n(35),n(29),n(36),n(7)),d=(n(54),n(206),n(110));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={data:function(){return{arraySessions:[]}},components:{},computed:l({},Object(d.d)({headers:function(t){return t.headers2},status:function(t){return t.status2},students:function(t){return t.students}})),mounted:function(){},methods:l({getStudentDataButton:function(t,e){this.getStudentData(t),this.setActiveStudentName(e)},getStudentData:function(t){var e=this;this.$axios.$get("http://143.198.82.254:8000/api/data/details",{params:{id:t}}).then((function(t){if(console.log(t),t.length<1)return e.setArraySessionStudent([]),null;t[0],e.arraySessions=[];for(var i=0;i<t.length;i++)e.arraySessions.push({date:t[i].timestamp.slice(0,10),attempts:t[i].attempts,accurate:t[i].accuratepoint,acceptable:t[i].acceptablepoint,fail:t[i].failpoint,goodforce:t[i].goodforce,exceedforce:t[i].exceedforce,goodinjection:t[i].goodinjection,badinjection:t[i].badinjection,failinjection:t[i].failinjection,rate:(t[i].pass/t[i].attempts*100).toFixed(2)});e.setArraySessionStudent(e.arraySessions)})).catch((function(t){console.log(t)}))}},Object(d.c)({setStudents:"setStudents",setArraySessionStudent:"setArraySessionStudent",setActiveStudentName:"setActiveStudentName"}))},f=(n(578),n(78)),component=Object(f.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticStyle:{width:"100%"}},[e(r.a,{staticClass:"table-font elevation-10 mx-5",attrs:{headers:t.headers,items:t.students,"items-per-page":4},scopedSlots:t._u([{key:"item",fn:function(n){var r=n.item;return[e("tr",{staticClass:"row-pointer",staticStyle:{width:"10% !important"},on:{click:function(e){t.getStudentDataButton(r.id,r.fullname.toUpperCase())}}},[e("td",{staticStyle:{width:"70%"}},[e("div",{staticClass:"text-truncate",staticStyle:{"max-width":"300px"}},[t._v("\r\n              "+t._s(r.fullname.toUpperCase())+"\r\n            ")])]),t._v(" "),e("td",{staticStyle:{width:"30%"}},[t._v(t._s(r.user_id))])])]}}])})],1)}),[],!1,null,null,null);e.default=component.exports}}]);