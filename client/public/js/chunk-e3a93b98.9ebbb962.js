(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e3a93b98"],{"02eb":function(t,e,r){},"057f":function(t,e,r){var n=r("fc6a"),o=r("241c").f,i={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return o(t)}catch(e){return s.slice()}};t.exports.f=function(t){return s&&"[object Window]"==i.call(t)?a(t):o(n(t))}},"0eb4":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Toast-box"})},o=[];r("a4d3"),r("e01a"),r("d28b"),r("e260"),r("d3b7"),r("3ca3"),r("ddb0");function i(t){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}var s=r("2b0e");s["default"].prototype.$showToast=function(t){for(var e=this,r=function(r){var n=e.$children[r].$el;if(console.log("childrens ==> ",n),"Toast-box"==n.className)return n.textContent=t.message,n.style.top="0px",setTimeout((function(){n.style.top="-64px"}),t.duration||2e3),{v:void 0}},n=0;n<this.$children.length;n++){var o=r(n);if("object"===i(o))return o.v}};var a={name:"Toast"},c=a,u=(r("b054"),r("2877")),f=Object(u["a"])(c,n,o,!1,null,null,null);e["a"]=f.exports},"159b":function(t,e,r){var n=r("da84"),o=r("fdbc"),i=r("17c2"),s=r("9112");for(var a in o){var c=n[a],u=c&&c.prototype;if(u&&u.forEach!==i)try{s(u,"forEach",i)}catch(f){u.forEach=i}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,o=r("a640"),i=r("ae40"),s=o("forEach"),a=i("forEach");t.exports=s&&a?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"3ca3":function(t,e,r){"use strict";var n=r("6547").charAt,o=r("69f3"),i=r("7dd0"),s="String Iterator",a=o.set,c=o.getterFor(s);i(String,"String",(function(t){a(this,{type:s,string:String(t),index:0})}),(function(){var t,e=c(this),r=e.string,o=e.index;return o>=r.length?{value:void 0,done:!0}:(t=n(r,o),e.index+=t.length,{value:t,done:!1})}))},4160:function(t,e,r){"use strict";var n=r("23e7"),o=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},4340:function(t,e,r){},"466b":function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));var n=r("d4ec"),o=r("bee2"),i=function(){function t(){Object(n["a"])(this,t),this.data={email:{reg:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,tips:"请输入您常用的E-mail邮箱号",error:"对不起，您填写的E-mail格式不正确！正确的格式：yourname@gmail.com"},nickname:{reg:/^[\u4E00-\u9FA5A-Za-z0-9_\ ]{3,20}$/i,tips:"3~20个字符，由中文、英文字母和下划线组成",error:"对不起，用户名格式不正确。这确的格式如：“robert_yao” 或者 “创业街商户”。"},password:{reg:/^[a-zA-Z0-9\_\-\~\!\%\*\@\#\$\&\.\(\)\[\]\{\}\<\>\?\\\/\'\"]{6,20}$/,tips:"6~20个字符，由英文字母，数字和特殊符号组成。",error:"对不起，您填写的密码有误。"},verifyCode:{reg:/^\d{6}$/,tips:"请输入6位验证码",error:"验证码有误"}}}return Object(o["a"])(t,[{key:"verify",value:function(t){var e=[];for(var r in this.data){var n=this.data[r].reg.test(t[r]);e.push(n)}return console.log("res == >",e),e}},{key:"valid",value:function(t){for(var e in t)if(!this.data[e].reg.test(t[e]))return{pass:!1};return!0}}]),t}(),s=new i},6547:function(t,e,r){var n=r("a691"),o=r("1d80"),i=function(t){return function(e,r){var i,s,a=String(o(e)),c=n(r),u=a.length;return c<0||c>=u?t?"":void 0:(i=a.charCodeAt(c),i<55296||i>56319||c+1===u||(s=a.charCodeAt(c+1))<56320||s>57343?t?a.charAt(c):i:t?a.slice(c,c+2):s-56320+(i-55296<<10)+65536)}};t.exports={codeAt:i(!1),charAt:i(!0)}},"65f0":function(t,e,r){var n=r("861d"),o=r("e8b5"),i=r("b622"),s=i("species");t.exports=function(t,e){var r;return o(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!o(r.prototype)?n(r)&&(r=r[s],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"73cf":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"register"},[r("div",{staticClass:"form-area"},[r("form",{staticClass:"form-horizontal"},[r("div",{staticClass:"form-group"},[r("label",{staticClass:"col-sm-2 control-label",attrs:{for:"inputEmail3"}},[t._v("邮箱")]),r("div",{staticClass:"col-sm-10"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo.email,expression:"userInfo.email"}],staticClass:"form-control",class:[t.verifyRes[0]?"correctTips":"errorTips"],attrs:{type:"email",id:"inputEmail3",placeholder:"输入邮箱"},domProps:{value:t.userInfo.email},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"email",e.target.value)}}})])]),r("div",{staticClass:"form-group"},[r("label",{staticClass:"col-sm-2 control-label",attrs:{for:"inputUsername3"}},[t._v("昵称")]),r("div",{staticClass:"col-sm-10"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo.nickname,expression:"userInfo.nickname"}],staticClass:"form-control",class:[t.verifyRes[1]?"correctTips":"errorTips"],attrs:{type:"text",id:"inputUsername3",placeholder:"用户名"},domProps:{value:t.userInfo.nickname},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"nickname",e.target.value)}}})])]),r("div",{staticClass:"form-group"},[r("label",{staticClass:"col-sm-2 control-label",attrs:{for:"inputPassword3"}},[t._v("密码")]),r("div",{staticClass:"col-sm-10"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo.password,expression:"userInfo.password"}],staticClass:"form-control",class:[t.verifyRes[2]?"correctTips":"errorTips"],attrs:{type:"password",id:"inputPassword3",placeholder:"输入密码"},domProps:{value:t.userInfo.password},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"password",e.target.value)}}})])]),r("div",{staticClass:"form-group code"},[r("div",{staticClass:"codeInput"},[r("label",{staticClass:"col-sm-2 control-label",attrs:{for:"inputCode3"}},[t._v("验证码")]),r("div",{staticClass:"col-sm-10"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo.verifyCode,expression:"userInfo.verifyCode"}],staticClass:"form-control",class:[t.verifyRes[3]?"correctTips":"errorTips"],attrs:{type:"text",id:"inputCode3",placeholder:"验证码"},domProps:{value:t.userInfo.verifyCode},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"verifyCode",e.target.value)}}})])]),r("div",{staticClass:"getCodeBtn"},[r("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:t.getEmailCode}},[t._v(t._s(t.text))])])]),r("div",{staticClass:"form-group"},[r("div",{staticClass:"col-sm-offset-2 col-sm-10"},[r("button",{staticClass:"btn btn-default submit",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.uploadForm(t.userInfo)}}},[t._v("注册")])])]),r("div",{staticClass:"form-group"},[r("div",{staticClass:"col-sm-offset-2 col-sm-10"},[r("router-link",{attrs:{to:"/login"}},[t._v("已有账号？立即登录")])],1)])])]),r("Toast")],1)},o=[],i=(r("4160"),r("159b"),r("0eb4")),s=r("466b"),a={name:"Register",components:{Toast:i["a"]},data:function(){return{vaildForm:s["a"],userInfo:{email:"",nickname:"",password:"",verifyCode:""},text:"发送邮箱验证码",isSended:!1,verifyRes:[]}},methods:{getEmailCode:function(){var t=this,e=this,r=5;this.text="".concat(r,"s后重新发送"),this.isSend=!0;var n=setInterval((function(){0==r?(clearInterval(n),n=null,t.text="发送邮箱验证码",t.isSended=!1):(r--,t.text="".concat(r,"s后重新发送"))}),1e3);this.axios.post("/sendMail",{email:e.userInfo.email}).then((function(t){console.log("response",t)})).catch((function(t){console.log("error",t)}))},uploadForm:function(t){this.verifyRes=s["a"].verify(t);var e=this,r=!0;this.verifyRes.forEach((function(t){t||(r=!1)})),r&&this.verifyRes&&this.axios.post("/register",{email:e.userInfo.email,nickname:e.userInfo.nickname,password:e.userInfo.password,verifyCode:e.userInfo.verifyCode}).then((function(t){console.log(t.data);var r=t.data;1002==r.code?this.$showToast({message:result.data.msg}):1e3==r.code?(this.$showToast({message:result.data.msg}),setTimeout((function(){e.$router.push("/login")}),3e3)):1001==r.code&&this.$showToast({message:result.data.msg})})).catch((function(t){console.log(t)}))}}},c=a,u=(r("dc25"),r("2877")),f=Object(u["a"])(c,n,o,!1,null,"3876b326",null);e["default"]=f.exports},"746f":function(t,e,r){var n=r("428f"),o=r("5135"),i=r("e538"),s=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});o(e,t)||s(e,t,{value:i.f(t)})}},a4d3:function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("d066"),s=r("c430"),a=r("83ab"),c=r("4930"),u=r("fdbf"),f=r("d039"),l=r("5135"),d=r("e8b5"),v=r("861d"),p=r("825a"),m=r("7b0b"),b=r("fc6a"),h=r("c04e"),g=r("5c6c"),y=r("7c73"),w=r("df75"),S=r("241c"),C=r("057f"),T=r("7418"),x=r("06cf"),I=r("9bf2"),E=r("d1e7"),L=r("9112"),O=r("6eeb"),k=r("5692"),P=r("f772"),$=r("d012"),j=r("90e3"),A=r("b622"),_=r("e538"),N=r("746f"),R=r("d44e"),M=r("69f3"),F=r("b727").forEach,D=P("hidden"),V="Symbol",G="prototype",H=A("toPrimitive"),J=M.set,z=M.getterFor(V),B=Object[G],U=o.Symbol,Z=i("JSON","stringify"),q=x.f,Q=I.f,W=C.f,K=E.f,X=k("symbols"),Y=k("op-symbols"),tt=k("string-to-symbol-registry"),et=k("symbol-to-string-registry"),rt=k("wks"),nt=o.QObject,ot=!nt||!nt[G]||!nt[G].findChild,it=a&&f((function(){return 7!=y(Q({},"a",{get:function(){return Q(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=q(B,e);n&&delete B[e],Q(t,e,r),n&&t!==B&&Q(B,e,n)}:Q,st=function(t,e){var r=X[t]=y(U[G]);return J(r,{type:V,tag:t,description:e}),a||(r.description=e),r},at=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof U},ct=function(t,e,r){t===B&&ct(Y,e,r),p(t);var n=h(e,!0);return p(r),l(X,n)?(r.enumerable?(l(t,D)&&t[D][n]&&(t[D][n]=!1),r=y(r,{enumerable:g(0,!1)})):(l(t,D)||Q(t,D,g(1,{})),t[D][n]=!0),it(t,n,r)):Q(t,n,r)},ut=function(t,e){p(t);var r=b(e),n=w(r).concat(pt(r));return F(n,(function(e){a&&!lt.call(r,e)||ct(t,e,r[e])})),t},ft=function(t,e){return void 0===e?y(t):ut(y(t),e)},lt=function(t){var e=h(t,!0),r=K.call(this,e);return!(this===B&&l(X,e)&&!l(Y,e))&&(!(r||!l(this,e)||!l(X,e)||l(this,D)&&this[D][e])||r)},dt=function(t,e){var r=b(t),n=h(e,!0);if(r!==B||!l(X,n)||l(Y,n)){var o=q(r,n);return!o||!l(X,n)||l(r,D)&&r[D][n]||(o.enumerable=!0),o}},vt=function(t){var e=W(b(t)),r=[];return F(e,(function(t){l(X,t)||l($,t)||r.push(t)})),r},pt=function(t){var e=t===B,r=W(e?Y:b(t)),n=[];return F(r,(function(t){!l(X,t)||e&&!l(B,t)||n.push(X[t])})),n};if(c||(U=function(){if(this instanceof U)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=j(t),r=function(t){this===B&&r.call(Y,t),l(this,D)&&l(this[D],e)&&(this[D][e]=!1),it(this,e,g(1,t))};return a&&ot&&it(B,e,{configurable:!0,set:r}),st(e,t)},O(U[G],"toString",(function(){return z(this).tag})),O(U,"withoutSetter",(function(t){return st(j(t),t)})),E.f=lt,I.f=ct,x.f=dt,S.f=C.f=vt,T.f=pt,_.f=function(t){return st(A(t),t)},a&&(Q(U[G],"description",{configurable:!0,get:function(){return z(this).description}}),s||O(B,"propertyIsEnumerable",lt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:U}),F(w(rt),(function(t){N(t)})),n({target:V,stat:!0,forced:!c},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var r=U(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){ot=!0},useSimple:function(){ot=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!a},{create:ft,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:vt,getOwnPropertySymbols:pt}),n({target:"Object",stat:!0,forced:f((function(){T.f(1)}))},{getOwnPropertySymbols:function(t){return T.f(m(t))}}),Z){var mt=!c||f((function(){var t=U();return"[null]"!=Z([t])||"{}"!=Z({a:t})||"{}"!=Z(Object(t))}));n({target:"JSON",stat:!0,forced:mt},{stringify:function(t,e,r){var n,o=[t],i=1;while(arguments.length>i)o.push(arguments[i++]);if(n=e,(v(e)||void 0!==t)&&!at(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!at(e))return e}),o[1]=e,Z.apply(null,o)}})}U[G][H]||L(U[G],H,U[G].valueOf),R(U,V),$[D]=!0},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},b054:function(t,e,r){"use strict";var n=r("4340"),o=r.n(n);o.a},b727:function(t,e,r){var n=r("0366"),o=r("44ad"),i=r("7b0b"),s=r("50c4"),a=r("65f0"),c=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,f=4==t,l=6==t,d=5==t||l;return function(v,p,m,b){for(var h,g,y=i(v),w=o(y),S=n(p,m,3),C=s(w.length),T=0,x=b||a,I=e?x(v,C):r?x(v,0):void 0;C>T;T++)if((d||T in w)&&(h=w[T],g=S(h,T,y),t))if(e)I[T]=g;else if(g)switch(t){case 3:return!0;case 5:return h;case 6:return T;case 2:c.call(I,h)}else if(f)return!1;return l?-1:u||f?f:I}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},bee2:function(t,e,r){"use strict";function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function o(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}r.d(e,"a",(function(){return o}))},d28b:function(t,e,r){var n=r("746f");n("iterator")},d4ec:function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",(function(){return n}))},dc25:function(t,e,r){"use strict";var n=r("02eb"),o=r.n(n);o.a},ddb0:function(t,e,r){var n=r("da84"),o=r("fdbc"),i=r("e260"),s=r("9112"),a=r("b622"),c=a("iterator"),u=a("toStringTag"),f=i.values;for(var l in o){var d=n[l],v=d&&d.prototype;if(v){if(v[c]!==f)try{s(v,c,f)}catch(m){v[c]=f}if(v[u]||s(v,u,l),o[l])for(var p in i)if(v[p]!==i[p])try{s(v,p,i[p])}catch(m){v[p]=i[p]}}}},e01a:function(t,e,r){"use strict";var n=r("23e7"),o=r("83ab"),i=r("da84"),s=r("5135"),a=r("861d"),c=r("9bf2").f,u=r("e893"),f=i.Symbol;if(o&&"function"==typeof f&&(!("description"in f.prototype)||void 0!==f().description)){var l={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new f(t):void 0===t?f():f(t);return""===t&&(l[e]=!0),e};u(d,f);var v=d.prototype=f.prototype;v.constructor=d;var p=v.toString,m="Symbol(test)"==String(f("test")),b=/^Symbol\((.*)\)[^)]+$/;c(v,"description",{configurable:!0,get:function(){var t=a(this)?this.valueOf():this,e=p.call(t);if(s(l,t))return"";var r=m?e.slice(7,-1):e.replace(b,"$1");return""===r?void 0:r}}),n({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,r){var n=r("b622");e.f=n},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-e3a93b98.9ebbb962.js.map