(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f0d1cf60"],{"466b":function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));var a=s("d4ec"),o=s("bee2"),r=function(){function t(){Object(a["a"])(this,t),this.data={email:{reg:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,tips:"请输入您常用的E-mail邮箱号",error:"对不起，您填写的E-mail格式不正确！正确的格式：yourname@gmail.com"},nickname:{reg:/^[\u4E00-\u9FA5A-Za-z0-9_\ ]{3,20}$/i,tips:"3~20个字符，由中文、英文字母和下划线组成",error:"对不起，用户名格式不正确。这确的格式如：“robert_yao” 或者 “创业街商户”。"},password:{reg:/^[a-zA-Z0-9\_\-\~\!\%\*\@\#\$\&\.\(\)\[\]\{\}\<\>\?\\\/\'\"]{6,20}$/,tips:"6~20个字符，由英文字母，数字和特殊符号组成。",error:"对不起，您填写的密码有误。"},verifyCode:{reg:/^\d{6}$/,tips:"请输入6位验证码",error:"验证码有误"}}}return Object(o["a"])(t,[{key:"verify",value:function(t){var e=[];for(var s in this.data){var a=this.data[s].reg.test(t[s]);e.push(a)}return console.log("res == >",e),e}},{key:"valid",value:function(t){for(var e in t)if(!this.data[e].reg.test(t[e]))return{pass:!1};return!0}}]),t}(),n=new r},7736:function(t,e,s){"use strict";var a=s("f8c5"),o=s.n(a);o.a},a55b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"form-area"},[s("form",{staticClass:"form-horizontal"},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-2 control-label",attrs:{for:"inputEmail3"}},[t._v("邮箱")]),s("div",{staticClass:"col-sm-10"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo.email,expression:"userInfo.email"}],staticClass:"form-control",attrs:{type:"email",id:"inputEmail3",placeholder:"输入邮箱"},domProps:{value:t.userInfo.email},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"email",e.target.value)}}})])]),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-2 control-label",attrs:{for:"inputPassword3"}},[t._v("密码")]),s("div",{staticClass:"col-sm-10"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo.password,expression:"userInfo.password"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword3",placeholder:"输入密码"},domProps:{value:t.userInfo.password},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"password",e.target.value)}}})])]),s("div",{staticClass:"form-group"},[s("div",{staticClass:"col-sm-offset-2 col-sm-10"},[s("button",{staticClass:"btn btn-default submit",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.login(e)}}},[t._v("登录")])])]),s("div",{staticClass:"form-group"},[s("div",{staticClass:"col-sm-offset-2 col-sm-10"},[s("router-link",{attrs:{to:"/register"}},[t._v("没有账号？立即注册")])],1)])])])])},o=[],r=(s("466b"),{name:"login",data:function(){return{userInfo:{email:"",password:""}}},methods:{login:function(){var t=this,e=this;this.axios.post("/login",{email:e.userInfo.email,password:e.userInfo.password}).then((function(e){console.log("result ==> ",e),1020==e.data.code&&(t.$cookies.set("_abc",e.data.token,"5d"),console.log("登录成功"),t.$router.push({name:"Type"}))})).catch((function(t){console.log("err ==> ",t)}))}}}),n=r,i=(s("7736"),s("2877")),l=Object(i["a"])(n,a,o,!1,null,"1b8191a7",null);e["default"]=l.exports},bee2:function(t,e,s){"use strict";function a(t,e){for(var s=0;s<e.length;s++){var a=e[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function o(t,e,s){return e&&a(t.prototype,e),s&&a(t,s),t}s.d(e,"a",(function(){return o}))},d4ec:function(t,e,s){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}s.d(e,"a",(function(){return a}))},f8c5:function(t,e,s){}}]);
//# sourceMappingURL=chunk-f0d1cf60.9f746280.js.map