import{af as Q,p as R,I as L,l as A,t as v,c as P,m as f,X as Y,Z as ee,w as $,ag as g,ah as j,n as te,q as ne,s as ae,r as E}from"./index.d0053bb4.js";import{o as se,m as w,p as ie,q as le,a as F,i as re,j as ue,r as oe,s as q,v as ce,n as O,w as de,b as fe,x as ve,y as me,c as pe,d as ye,z as ge,e as be,f as he,A as Ce,B as Ie,g as Pe,h as Ve,C as ke}from"./VListItem.428bcc22.js";const Se=Q({name:"VListGroupActivator",setup(e,n){let{slots:t}=n;return se(),()=>{var a;return(a=t.default)==null?void 0:a.call(t)}}}),xe=R({activeColor:String,color:String,collapseIcon:{type:L,default:"$collapse"},expandIcon:{type:L,default:"$expand"},prependIcon:L,appendIcon:L,fluid:Boolean,subgroup:Boolean,value:null,...w()},"v-list-group"),N=A()({name:"VListGroup",props:{title:String,...xe()},setup(e,n){let{slots:t}=n;const{isOpen:a,open:r,id:u}=ie(v(e,"value"),!0),o=P(()=>`v-list-group--id-${String(u.value)}`),i=le();function c(p){r(!a.value,p)}const C=P(()=>({onClick:c,class:"v-list-group__header",id:o.value})),m=P(()=>a.value?e.collapseIcon:e.expandIcon);return F(()=>f(e.tag,{class:["v-list-group",{"v-list-group--prepend":i==null?void 0:i.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":a.value}]},{default:()=>[t.activator&&f(re,{defaults:{VListItem:{active:a.value,activeColor:e.activeColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&m.value,appendIcon:e.appendIcon||!e.subgroup&&m.value,title:e.title,value:e.value}}},{default:()=>[f(Se,null,{default:()=>[t.activator({props:C.value,isOpen:a.value})]})]}),f(ue,null,{default:()=>{var p;return[Y(f("div",{class:"v-list-group__items",role:"group","aria-labelledby":o.value},[(p=t.default)==null?void 0:p.call(t)]),[[ee,a.value]])]}})]})),{}}}),Le=A()({name:"VListSubheader",props:{color:String,inset:Boolean,sticky:Boolean,title:String,...w()},setup(e,n){let{slots:t}=n;const{textColorClasses:a,textColorStyles:r}=oe(v(e,"color"));return F(()=>{const u=!!(t.default||e.title);return f(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},a.value],style:{textColorStyles:r}},{default:()=>{var o,i;return[u&&f("div",{class:"v-list-subheader__text"},[(i=(o=t.default)==null?void 0:o.call(t))!=null?i:e.title])]}})}),{}}}),K=A()({name:"VListChildren",props:{items:Array},setup(e,n){let{slots:t}=n;return q(),()=>{var a,r,u;return(u=(a=t.default)==null?void 0:a.call(t))!=null?u:(r=e.items)==null?void 0:r.map(o=>{var S,V,k,I;let{children:i,props:c,type:C,raw:m}=o;if(C==="divider")return(V=(S=t.divider)==null?void 0:S.call(t,{props:c}))!=null?V:f(ce,c,null);if(C==="subheader")return(I=(k=t.subheader)==null?void 0:k.call(t,{props:c}))!=null?I:f(Le,c,{default:t.subheader});const p={subtitle:t.subtitle?l=>{var s;return(s=t.subtitle)==null?void 0:s.call(t,{...l,item:m})}:void 0,prepend:t.prepend?l=>{var s;return(s=t.prepend)==null?void 0:s.call(t,{...l,item:m})}:void 0,append:t.append?l=>{var s;return(s=t.append)==null?void 0:s.call(t,{...l,item:m})}:void 0,default:t.default?l=>{var s;return(s=t.default)==null?void 0:s.call(t,{...l,item:m})}:void 0,title:t.title?l=>{var s;return(s=t.title)==null?void 0:s.call(t,{...l,item:m})}:void 0},[B,T]=N.filterProps(c);return i?f(N,$({value:c==null?void 0:c.value},B),{activator:l=>{let{props:s}=l;return t.header?t.header({props:{...c,...s}}):f(O,$(c,s),p)},default:()=>f(K,{items:i},t)}):t.item?t.item(c):f(O,c,p)})}}}),Ae=R({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean},"item");function z(e,n){var i;const t=g(n,e.itemTitle,n),a=e.returnObject?n:g(n,e.itemValue,t),r=g(n,e.itemChildren),u=e.itemProps===!0?typeof n=="object"&&n!=null&&!Array.isArray(n)?"children"in n?j(n,["children"])[1]:n:void 0:g(n,e.itemProps),o={title:t,value:a,...u};return{title:String((i=o.title)!=null?i:""),value:o.value,props:o,children:Array.isArray(r)?H(e,r):void 0,raw:n}}function H(e,n){const t=[];for(const a of n)t.push(z(e,a));return t}function De(e){const n=P(()=>H(e,e.items));function t(r){return r.map(u=>z(e,u))}function a(r){return r.map(u=>{let{props:o}=u;return o.value})}return{items:n,transformIn:t,transformOut:a}}function Be(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"}function we(e,n){const t=g(n,e.itemType,"item"),a=Be(n)?n:g(n,e.itemTitle),r=g(n,e.itemValue,void 0),u=g(n,e.itemChildren),o=e.itemProps===!0?j(n,["children"])[1]:g(n,e.itemProps),i={title:a,value:r,...o};return{type:t,title:i.title,value:i.value,props:i,children:t==="item"&&u?U(e,u):void 0,raw:n}}function U(e,n){const t=[];for(const a of n)t.push(we(e,a));return t}function Fe(e){return{items:P(()=>U(e,e.items))}}const Ge=A()({name:"VList",props:{activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,lines:{type:[Boolean,String],default:"one"},nav:Boolean,...de({selectStrategy:"single-leaf",openStrategy:"list"}),...fe(),...ve(),...me(),...pe(),itemType:{type:String,default:"type"},...Ae(),...ye(),...w(),...te(),...ge({variant:"text"})},emits:{"update:selected":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:select":e=>!0},setup(e,n){let{slots:t}=n;const{items:a}=Fe(e),{themeClasses:r}=ne(e),{backgroundColorClasses:u,backgroundColorStyles:o}=be(v(e,"bgColor")),{borderClasses:i}=he(e),{densityClasses:c}=Ce(e),{dimensionStyles:C}=Ie(e),{elevationClasses:m}=Pe(e),{roundedClasses:p}=Ve(e),{open:B,select:T}=ke(e),S=P(()=>e.lines?`v-list--${e.lines}-line`:void 0),V=v(e,"activeColor"),k=v(e,"color");q(),ae({VListGroup:{activeColor:V,color:k},VListItem:{activeClass:v(e,"activeClass"),activeColor:V,color:k,density:v(e,"density"),disabled:v(e,"disabled"),lines:v(e,"lines"),nav:v(e,"nav"),variant:v(e,"variant")}});const I=E(!1),l=E();function s(d){I.value=!0}function W(d){I.value=!1}function X(d){var y;!I.value&&!(d.relatedTarget&&((y=l.value)==null?void 0:y.contains(d.relatedTarget)))&&b()}function Z(d){if(!!l.value){if(d.key==="ArrowDown")b("next");else if(d.key==="ArrowUp")b("prev");else if(d.key==="Home")b("first");else if(d.key==="End")b("last");else return;d.preventDefault()}}function b(d){var _,D,G;if(!l.value)return;const y=[...l.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(h=>!h.hasAttribute("disabled")),J=y.indexOf(document.activeElement);if(!d)l.value.contains(document.activeElement)||(_=y[0])==null||_.focus();else if(d==="first")(D=y[0])==null||D.focus();else if(d==="last")(G=y.at(-1))==null||G.focus();else{let h,x=J;const M=d==="next"?1:-1;do x+=M,h=y[x];while((!h||h.offsetParent==null)&&x<y.length&&x>=0);h?h.focus():b(d==="next"?"first":"last")}}return F(()=>f(e.tag,{ref:l,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav},r.value,u.value,i.value,c.value,m.value,S.value,p.value],style:[o.value,C.value],role:"listbox","aria-activedescendant":void 0,onFocusin:s,onFocusout:W,onFocus:X,onKeydown:Z},{default:()=>[f(K,{items:a.value},t)]})),{open:B,select:T,focus:b}}});export{Ge as V,Le as a,Ae as m,De as u};
