"use strict";(self.webpackChunkhealth=self.webpackChunkhealth||[]).push([[101],{2461:(e,r,n)=>{n.d(r,{A:()=>i});n(5043);var s=n(8387);const t={inputContainer:"Input_inputContainer__QZk4R",input:"Input_input__MJJzI",inputCenter:"Input_inputCenter__pFBIS",inputInfo:"Input_inputInfo__z+ueb"};var a=n(579);function i(e){let{type:r,placeholder:n,required:i,variant:o="",className:l,name:c,handleChange:d,width:u,value:p,paddingLeft:m,autoComplete:h,handleBlur:_}=e;return(0,a.jsx)("div",{style:{width:u||"auto"},className:t.inputContainer,children:(0,a.jsx)("input",{autoComplete:h||"off",style:{paddingLeft:m||"0px"},onChange:d,name:c||"",className:(0,s.A)(t.input,l,"center"===o?t.inputCenter:t.input),type:r||"text",placeholder:n||"",required:i||!1,value:p||"",onBlur:_})})}},2870:(e,r,n)=>{n.d(r,{A:()=>t});var s=n(5043);const t=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const[r,n]=(0,s.useState)(Object.keys(e).reduce(((e,r)=>(e[r]=!1,e)),{}));return{touched:r,handleBlur:e=>()=>{n((r=>({...r,[e]:!0})))}}}},1313:(e,r,n)=>{n.d(r,{A:()=>t});var s=n(5043);const t=(e,r)=>{const[n,t]=(0,s.useState)(e),[a,i]=(0,s.useState)({});return{fields:n,setFields:t,errors:a,validateFields:()=>{const e=r(n);return i(e),0===Object.keys(e).length}}}},5101:(e,r,n)=>{n.r(r),n.d(r,{default:()=>w});var s=n(5043),t=n(1870),a=n(3003),i=n(5475),o=n(2461),l=n(8838),c=n(3910),d=n(7929),u=n(1036),p=(n(2342),n(5659)),m=n(5340),h=n(1313);const _=e=>{const r={};return e.email||(r.email="Email is required"),e.password||(r.password="Password is required"),r};var g=n(2870),v=n(6276),x=n(8387);const f={form:"LoginForm_form__gPEx5",inputWrapper:"LoginForm_inputWrapper__jO1zg",inputIcon:"LoginForm_inputIcon__GDKJZ",inputError:"LoginForm_inputError__cPf0D",eyeIcon:"LoginForm_eyeIcon__UzGhv",errorCont:"LoginForm_errorCont__MHL+1",error:"LoginForm_error__012y+",buttonsContainer:"LoginForm_buttonsContainer__bkTpy"};var j=n(579);const y=function(){const{fields:e,setFields:r,validateFields:n}=(0,h.A)({email:"",password:""},_),{user:y,isLoggedIn:C}=(0,v.A)(),{touched:w,handleBlur:N}=(0,g.A)(e),[L,I]=(0,s.useState)(""),A=(0,a.wA)(),[b,k]=(0,s.useState)("password"),[F,E]=(0,m.A)(!0),[P,q]=(0,m.A)(!1);return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)("form",{onSubmit:async s=>{if(s.preventDefault(),n())try{await A((0,t.E8)(e)).unwrap()}catch(a){r((e=>({...e,errorMessage:I("You have entered an invalid username or password.")}))),u.oR.error("Email or password wrong ! Please try again !")}},className:f.form,children:[(0,j.jsxs)("div",{className:f.inputContainer,children:[(0,j.jsxs)("div",{className:f.inputWrapper,children:[(0,j.jsx)(c.g,{icon:d.y_8,className:f.inputIcon}),(0,j.jsx)(o.A,{autoComplete:"on",paddingLeft:"53.5px",width:"100%",type:"email",value:e.email,handleChange:n=>{r({...e,email:n.target.value})},handleBlur:N("email"),placeholder:"Email *",required:!0})]}),w.email&&!e.email&&(0,j.jsx)("p",{className:f.inputError,children:"Required"})]}),(0,j.jsxs)("div",{styles:f.inputContainer,children:[(0,j.jsxs)("div",{className:f.inputWrapper,children:[(0,j.jsx)(c.g,{icon:d.DW4,className:f.inputIcon}),F&&(0,j.jsx)(p.gZ8,{onClick:()=>{E(),q(),k("text")},size:"24px",className:f.eyeIcon}),P&&(0,j.jsx)(p.iWd,{onClick:()=>{E(),q(),k("password")},size:"24px",className:f.eyeIcon}),(0,j.jsx)(o.A,{autoComplete:"on",paddingLeft:"53.5px",width:"100%",type:b,value:e.password,handleChange:n=>{r({...e,password:n.target.value})},handleBlur:N("password"),placeholder:"Password",required:!0})]}),w.password&&e.password.length<6&&(0,j.jsx)("p",{className:f.inputError,children:"Password must be at least 6 characters!"})]}),(0,j.jsxs)("div",{className:f.buttonsContainer,children:[(0,j.jsx)(l.A,{variant:"colored",type:"submit",children:"Log in"}),L&&(0,j.jsx)("p",{className:f.error,children:L}),(0,j.jsxs)(l.A,{type:"button",children:[(0,j.jsx)(i.N_,{to:"/register",className:f.navLink,children:"Register"})," "]}),L&&(0,j.jsx)("p",{className:f.error,children:L})]}),null!==y&&!C&&(0,j.jsxs)("div",{className:f.errorCont,children:[(0,j.jsx)("p",{className:f.error,children:"It seems that your email is not verified! Please click the Verify button to be redirected to verify email page !"}),(0,j.jsx)(l.A,{children:(0,j.jsx)(i.N_,{to:"/verify-email",className:(0,x.A)(f.navLink,f.link),children:"Verify"})})]})]})})},C={section:"LoginPage_section__pqfrr",title:"LoginPage_title__RBt-o"};function w(){const{isLoggedIn:e,user:r}=(0,v.A)();return(0,s.useEffect)((()=>{(e||null!==r&&void 0!==r&&r.verify)&&u.oR.success("Login successful!")}),[e,null===r||void 0===r?void 0:r.verify]),(0,j.jsxs)("section",{className:C.section,children:[(0,j.jsx)("h2",{className:C.title,children:"Log In"}),(0,j.jsx)(y,{}),(0,j.jsx)(u.N9,{})]})}}}]);
//# sourceMappingURL=101.d3083851.chunk.js.map