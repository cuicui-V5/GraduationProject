import{p as G,i as ie,c as d,r as E,a as Z,b as C,g as xe,o as J,d as De,e as Se,f as Oe,h as Ye,j as se,k as We,l as A,m as s,n as re,t as q,q as ce,s as _e,u as Xe,v as Ve,w as ve,I as Ze,x as Q,y as Te,z as ee,A as te,B as D,C as je,D as qe,E as Fe,F as j,G as Ke,H as Be,J as Ue,K as Ge,L as Je,T as Qe,M as et,N as ge}from"./index.d0053bb4.js";import{u as tt,m as ae,a as N,b as Ie,c as ke,d as Ce,e as ue,f as Ee,g as Me,h as $e,V as at,i as le,j as nt,k as ot,l as lt,t as ut,n as he}from"./VListItem.428bcc22.js";import{V as it}from"./VList.ec693e54.js";const U=Symbol.for("vuetify:layout"),He=Symbol.for("vuetify:layout-item"),ye=1e3,st=G({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Le=G({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function rt(){const e=ie(U);if(!e)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function Re(e){var m;const l=ie(U);if(!l)throw new Error("[Vuetify] Could not find injected layout");const t=(m=e.id)!=null?m:`layout-item-${De()}`,o=xe("useLayoutItem");Se(He,{id:t});const a=E(!1);Oe(()=>a.value=!0),Ye(()=>a.value=!1);const{layoutItemStyles:n,layoutItemScrimStyles:c}=l.register(o,{...e,active:d(()=>a.value?!1:e.active.value),id:t});return se(()=>l.unregister(t)),{layoutItemStyles:n,layoutRect:l.layoutRect,layoutItemScrimStyles:c}}const ct=(e,l,t,o)=>{let a={top:0,left:0,right:0,bottom:0};const n=[{id:"",layer:{...a}}];for(const c of e){const m=l.get(c),b=t.get(c),y=o.get(c);if(!m||!b||!y)continue;const i={...a,[m.value]:parseInt(a[m.value],10)+(y.value?parseInt(b.value,10):0)};n.push({id:c,layer:i}),a=i}return n};function vt(e){const l=ie(U,null),t=d(()=>l?l.rootZIndex.value-100:ye),o=E([]),a=Z(new Map),n=Z(new Map),c=Z(new Map),m=Z(new Map),b=Z(new Map),{resizeRef:y,contentRect:i}=tt(),p=d(()=>{var r;const u=new Map,v=(r=e.overlaps)!=null?r:[];for(const S of v.filter(h=>h.includes(":"))){const[h,_]=S.split(":");if(!o.value.includes(h)||!o.value.includes(_))continue;const L=a.get(h),R=a.get(_),P=n.get(h),z=n.get(_);!L||!R||!P||!z||(u.set(_,{position:L.value,amount:parseInt(P.value,10)}),u.set(h,{position:R.value,amount:-parseInt(z.value,10)}))}return u}),f=d(()=>{const u=[...new Set([...c.values()].map(r=>r.value))].sort((r,S)=>r-S),v=[];for(const r of u){const S=o.value.filter(h=>{var _;return((_=c.get(h))==null?void 0:_.value)===r});v.push(...S)}return ct(v,a,n,m)}),w=d(()=>!Array.from(b.values()).some(u=>u.value)),x=d(()=>f.value[f.value.length-1].layer),$=d(()=>({"--v-layout-left":C(x.value.left),"--v-layout-right":C(x.value.right),"--v-layout-top":C(x.value.top),"--v-layout-bottom":C(x.value.bottom),...w.value?void 0:{transition:"none"}})),T=d(()=>f.value.slice(1).map((u,v)=>{let{id:r}=u;const{layer:S}=f.value[v],h=n.get(r),_=a.get(r);return{id:r,...S,size:Number(h.value),position:_.value}})),B=u=>T.value.find(v=>v.id===u),I=xe("createLayout"),k=E(!1);J(()=>{k.value=!0}),Se(U,{register:(u,v)=>{let{id:r,order:S,position:h,layoutSize:_,elementSize:L,active:R,disableTransitions:P,absolute:z}=v;c.set(r,S),a.set(r,h),n.set(r,_),m.set(r,R),P&&b.set(r,P);const V=We(He,I==null?void 0:I.vnode).indexOf(u);V>-1?o.value.splice(V,0,r):o.value.push(r);const W=d(()=>T.value.findIndex(X=>X.id===r)),O=d(()=>t.value+f.value.length*2-W.value*2),F=d(()=>{const X=h.value==="left"||h.value==="right",ne=h.value==="right",ze=h.value==="bottom",fe={[h.value]:0,zIndex:O.value,transform:`translate${X?"X":"Y"}(${(R.value?0:-110)*(ne||ze?-1:1)}%)`,position:z.value||t.value!==ye?"absolute":"fixed",...w.value?void 0:{transition:"none"}};if(!k.value)return fe;const H=T.value[W.value];if(!H)throw new Error(`[Vuetify] Could not find layout item "${r}"`);const oe=p.value.get(r);return oe&&(H[oe.position]+=oe.amount),{...fe,height:X?`calc(100% - ${H.top}px - ${H.bottom}px)`:L.value?`${L.value}px`:void 0,left:ne?void 0:`${H.left}px`,right:ne?`${H.right}px`:void 0,top:h.value!=="bottom"?`${H.top}px`:void 0,bottom:h.value!=="top"?`${H.bottom}px`:void 0,width:X?L.value?`${L.value}px`:void 0:`calc(100% - ${H.left}px - ${H.right}px)`}}),K=d(()=>({zIndex:O.value-1}));return{layoutItemStyles:F,layoutItemScrimStyles:K,zIndex:O}},unregister:u=>{c.delete(u),a.delete(u),n.delete(u),m.delete(u),b.delete(u),o.value=o.value.filter(v=>v!==u)},mainRect:x,mainStyles:$,getLayoutItem:B,items:T,layoutRect:i,rootZIndex:t});const M=d(()=>["v-layout",{"v-layout--full-height":e.fullHeight}]),g=d(()=>({zIndex:t.value,position:l?"relative":void 0,overflow:l?"hidden":void 0}));return{layoutClasses:M,layoutStyles:g,getLayoutItem:B,items:T,layoutRect:i,layoutRef:y}}const Ae=G({text:String,...ae()},"v-toolbar-title"),Ne=A()({name:"VToolbarTitle",props:Ae(),setup(e,l){let{slots:t}=l;return N(()=>{const o=!!(t.default||t.text||e.text);return s(e.tag,{class:"v-toolbar-title"},{default:()=>{var a;return[o&&s("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(a=t.default)==null?void 0:a.call(t)])]}})}),{}}}),dt=[null,"prominent","default","comfortable","compact"],Pe=G({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>dt.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...Ie(),...ke(),...Ce(),...ae({tag:"header"}),...re()},"v-toolbar"),pe=A()({name:"VToolbar",props:Pe(),setup(e,l){var f;let{slots:t}=l;const{backgroundColorClasses:o,backgroundColorStyles:a}=ue(q(e,"color")),{borderClasses:n}=Ee(e),{elevationClasses:c}=Me(e),{roundedClasses:m}=$e(e),{themeClasses:b}=ce(e),y=E(!!(e.extended||((f=t.extension)==null?void 0:f.call(t)))),i=d(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),p=d(()=>y.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return _e({VBtn:{variant:"text"}}),N(()=>{var T;const w=!!(e.title||t.title),x=!!(t.image||e.image),$=(T=t.extension)==null?void 0:T.call(t);return y.value=!!(e.extended||$),s(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},o.value,n.value,c.value,m.value,b.value],style:[a.value]},{default:()=>[x&&s("div",{key:"image",class:"v-toolbar__image"},[t.image?s(le,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):s(at,{key:"image-img",cover:!0,src:e.image},null)]),s(le,{defaults:{VTabs:{height:C(i.value)}}},{default:()=>{var B,I,k;return[s("div",{class:"v-toolbar__content",style:{height:C(i.value)}},[t.prepend&&s("div",{class:"v-toolbar__prepend"},[(B=t.prepend)==null?void 0:B.call(t)]),w&&s(Ne,{key:"title",text:e.title},{text:t.title}),(I=t.default)==null?void 0:I.call(t),t.append&&s("div",{class:"v-toolbar__append"},[(k=t.append)==null?void 0:k.call(t)])])]}}),s(le,{defaults:{VTabs:{height:C(p.value)}}},{default:()=>[s(nt,null,{default:()=>[y.value&&s("div",{class:"v-toolbar__extension",style:{height:C(p.value)}},[$])]})]})]})}),{contentHeight:i,extensionHeight:p}}});function de(){const e=E(!1);return J(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:d(()=>e.value?void 0:{transition:"none !important"}),isBooted:Xe(e)}}const mt=A()({name:"VAppBar",props:{modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...Pe(),...Le(),height:{type:[Number,String],default:64}},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const o=E(),a=Ve(e,"modelValue"),n=d(()=>{var i,p,f,w;const b=(p=(i=o.value)==null?void 0:i.contentHeight)!=null?p:0,y=(w=(f=o.value)==null?void 0:f.extensionHeight)!=null?w:0;return b+y}),{ssrBootStyles:c}=de(),{layoutItemStyles:m}=Re({id:e.name,order:d(()=>parseInt(e.order,10)),position:q(e,"location"),layoutSize:n,elementSize:n,active:a,absolute:q(e,"absolute")});return N(()=>{const[b]=pe.filterProps(e);return s(pe,ve({ref:o,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"}],style:{...m.value,height:void 0,...c.value}},b),t)}),{}}}),ft=A()({name:"VAppBarNavIcon",props:{icon:{type:Ze,default:"$menu"}},setup(e,l){let{slots:t}=l;return N(()=>s(ot,{class:"v-app-bar-nav-icon",icon:e.icon},t)),{}}}),gt=A()({name:"VAppBarTitle",props:Ae(),setup(e,l){let{slots:t}=l;return N(()=>s(Ne,ve(e,{class:"v-app-bar-title"}),t)),{}}}),ht=Q({__name:"AppBar",setup(e){const l=Te(),t=()=>{l.showDrawer=!l.showDrawer};return(o,a)=>(ee(),te(mt,{flat:"",rounded:"",elevation:5,color:"#f1f3f4"},{prepend:D(()=>[s(ft,{onClick:t})]),default:D(()=>[s(gt,null,{default:D(()=>[je(qe(o.$route.meta.title),1)]),_:1})]),_:1}))}});const yt=A()({name:"VMain",props:{scrollable:Boolean,...ae({tag:"main"})},setup(e,l){let{slots:t}=l;const{mainStyles:o}=rt(),{ssrBootStyles:a}=de();return N(()=>s(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable}],style:[o.value,a.value]},{default:()=>{var n,c;return[e.scrollable?s("div",{class:"v-main__scroller"},[(n=t.default)==null?void 0:n.call(t)]):(c=t.default)==null?void 0:c.call(t)]}})),{}}}),pt=Q({__name:"View",setup(e){return(l,t)=>{const o=Fe("router-view");return ee(),te(yt,null,{default:D(()=>[s(o)]),_:1})}}});function bt(e){let{rootEl:l,isSticky:t,layoutItemStyles:o}=e;const a=E(!1),n=E(0),c=d(()=>{const y=typeof a.value=="boolean"?"top":a.value;return[t.value?{top:"auto",bottom:"auto",height:void 0}:void 0,a.value?{[y]:C(n.value)}:{top:o.value.top}]});J(()=>{j(t,y=>{y?window.addEventListener("scroll",b,{passive:!0}):window.removeEventListener("scroll",b)},{immediate:!0})}),se(()=>{document.removeEventListener("scroll",b)});let m=0;function b(){var x;const y=m>window.scrollY?"up":"down",i=l.value.getBoundingClientRect(),p=parseFloat((x=o.value.top)!=null?x:0),f=window.scrollY-Math.max(0,n.value-p),w=i.height+Math.max(n.value,p)-window.scrollY-window.innerHeight;i.height<window.innerHeight-p?(a.value="top",n.value=p):y==="up"&&a.value==="bottom"||y==="down"&&a.value==="top"?(n.value=window.scrollY+i.top,a.value=!0):y==="down"&&w<=0?(n.value=0,a.value="bottom"):y==="up"&&f<=0&&(n.value=i.top+f,a.value="top"),m=window.scrollY}return{isStuck:a,stickyStyles:c}}const wt=100,xt=20;function be(e){const l=1.41421356237;return(e<0?-1:1)*Math.sqrt(Math.abs(e))*l}function we(e){if(e.length<2)return 0;if(e.length===2)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let l=0;for(let t=e.length-1;t>0;t--){if(e[t].t===e[t-1].t)continue;const o=be(l),a=(e[t].d-e[t-1].d)/(e[t].t-e[t-1].t);l+=(a-o)*Math.abs(a),t===e.length-1&&(l*=.5)}return be(l)*1e3}function St(){const e={};function l(a){Array.from(a.changedTouches).forEach(n=>{var m;((m=e[n.identifier])!=null?m:e[n.identifier]=new Ke(xt)).push([a.timeStamp,n])})}function t(a){Array.from(a.changedTouches).forEach(n=>{delete e[n.identifier]})}function o(a){var y;const n=(y=e[a])==null?void 0:y.values().reverse();if(!n)throw new Error(`No samples for touch id ${a}`);const c=n[0],m=[],b=[];for(const i of n){if(c[0]-i[0]>wt)break;m.push({t:i[0],d:i[1].clientX}),b.push({t:i[0],d:i[1].clientY})}return{x:we(m),y:we(b),get direction(){const{x:i,y:p}=this,[f,w]=[Math.abs(i),Math.abs(p)];return f>w&&i>=0?"right":f>w&&i<=0?"left":w>f&&p>=0?"down":w>f&&p<=0?"up":_t()}}}return{addMovement:l,endTouch:t,getVelocity:o}}function _t(){throw new Error}function Vt(e){let{isActive:l,isTemporary:t,width:o,touchless:a,position:n}=e;J(()=>{window.addEventListener("touchstart",B,{passive:!0}),window.addEventListener("touchmove",I,{passive:!1}),window.addEventListener("touchend",k,{passive:!0})}),se(()=>{window.removeEventListener("touchstart",B),window.removeEventListener("touchmove",I),window.removeEventListener("touchend",k)});const c=d(()=>["left","right"].includes(n.value)),{addMovement:m,endTouch:b,getVelocity:y}=St();let i=!1;const p=E(!1),f=E(0),w=E(0);let x;function $(g,u){return(n.value==="left"?g:n.value==="right"?document.documentElement.clientWidth-g:n.value==="top"?g:n.value==="bottom"?document.documentElement.clientHeight-g:Y())-(u?o.value:0)}function T(g){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const v=n.value==="left"?(g-w.value)/o.value:n.value==="right"?(document.documentElement.clientWidth-g-w.value)/o.value:n.value==="top"?(g-w.value)/o.value:n.value==="bottom"?(document.documentElement.clientHeight-g-w.value)/o.value:Y();return u?Math.max(0,Math.min(1,v)):v}function B(g){if(a.value)return;const u=g.changedTouches[0].clientX,v=g.changedTouches[0].clientY,r=25,S=n.value==="left"?u<r:n.value==="right"?u>document.documentElement.clientWidth-r:n.value==="top"?v<r:n.value==="bottom"?v>document.documentElement.clientHeight-r:Y(),h=l.value&&(n.value==="left"?u<o.value:n.value==="right"?u>document.documentElement.clientWidth-o.value:n.value==="top"?v<o.value:n.value==="bottom"?v>document.documentElement.clientHeight-o.value:Y());(S||h||l.value&&t.value)&&(i=!0,x=[u,v],w.value=$(c.value?u:v,l.value),f.value=T(c.value?u:v),b(g),m(g))}function I(g){const u=g.changedTouches[0].clientX,v=g.changedTouches[0].clientY;if(i){if(!g.cancelable){i=!1;return}const S=Math.abs(u-x[0]),h=Math.abs(v-x[1]);(c.value?S>h&&S>3:h>S&&h>3)?(p.value=!0,i=!1):(c.value?h:S)>3&&(i=!1)}if(!p.value)return;g.preventDefault(),m(g);const r=T(c.value?u:v,!1);f.value=Math.max(0,Math.min(1,r)),r>1?w.value=$(c.value?u:v,!0):r<0&&(w.value=$(c.value?u:v,!1))}function k(g){if(i=!1,!p.value)return;m(g),p.value=!1;const u=y(g.changedTouches[0].identifier),v=Math.abs(u.x),r=Math.abs(u.y);(c.value?v>r&&v>400:r>v&&r>3)?l.value=u.direction===({left:"right",right:"left",top:"down",bottom:"up"}[n.value]||Y()):l.value=f.value>.5}const M=d(()=>p.value?{transform:n.value==="left"?`translateX(calc(-100% + ${f.value*o.value}px))`:n.value==="right"?`translateX(calc(100% - ${f.value*o.value}px))`:n.value==="top"?`translateY(calc(-100% + ${f.value*o.value}px))`:n.value==="bottom"?`translateY(calc(100% - ${f.value*o.value}px))`:Y(),transition:"none"}:void 0);return{isDragging:p,dragProgress:f,dragStyles:M}}function Y(){throw new Error}const Tt=["start","end","left","right","top","bottom"],Bt=A()({name:"VNavigationDrawer",props:{color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[String,Boolean],default:!0},image:String,temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>Tt.includes(e)},sticky:Boolean,...Ie(),...ke(),...Le(),...Ce(),...ae({tag:"nav"}),...re()},emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,l){let{attrs:t,emit:o,slots:a}=l;const{isRtl:n}=Be(),{themeClasses:c}=ce(e),{borderClasses:m}=Ee(e),{backgroundColorClasses:b,backgroundColorStyles:y}=ue(q(e,"color")),{elevationClasses:i}=Me(e),{mobile:p}=Ue(),{roundedClasses:f}=$e(e),w=lt(),x=Ve(e,"modelValue",null,V=>!!V),{ssrBootStyles:$}=de(),T=E(),B=E(!1),I=d(()=>e.rail&&e.expandOnHover&&B.value?Number(e.width):Number(e.rail?e.railWidth:e.width)),k=d(()=>ut(e.location,n.value)),M=d(()=>!e.permanent&&(p.value||e.temporary)),g=d(()=>e.sticky&&!M.value&&k.value!=="bottom");e.expandOnHover&&e.rail!=null&&j(B,V=>o("update:rail",!V)),e.disableResizeWatcher||j(M,V=>!e.permanent&&Ge(()=>x.value=!V)),!e.disableRouteWatcher&&w&&j(w.currentRoute,()=>M.value&&(x.value=!1)),j(()=>e.permanent,V=>{V&&(x.value=!0)}),Je(()=>{e.modelValue!=null||M.value||(x.value=e.permanent||!p.value)});const{isDragging:u,dragProgress:v,dragStyles:r}=Vt({isActive:x,isTemporary:M,width:I,touchless:q(e,"touchless"),position:k}),S=d(()=>{const V=M.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):I.value;return u.value?V*v.value:V}),{layoutItemStyles:h,layoutRect:_,layoutItemScrimStyles:L}=Re({id:e.name,order:d(()=>parseInt(e.order,10)),position:k,layoutSize:S,elementSize:I,active:d(()=>x.value||u.value),disableTransitions:d(()=>u.value),absolute:d(()=>e.absolute||g.value&&typeof R.value!="string")}),{isStuck:R,stickyStyles:P}=bt({rootEl:T,isSticky:g,layoutItemStyles:h}),z=ue(d(()=>typeof e.scrim=="string"?e.scrim:null)),me=d(()=>({...u.value?{opacity:v.value*.2,transition:"none"}:void 0,..._.value?{left:C(_.value.left),right:C(_.value.right),top:C(_.value.top),bottom:C(_.value.bottom)}:void 0,...L.value}));return _e({VList:{bgColor:"transparent"}}),N(()=>{const V=a.image||e.image;return s(et,null,[s(e.tag,ve({ref:T,onMouseenter:()=>B.value=!0,onMouseleave:()=>B.value=!1,class:["v-navigation-drawer",`v-navigation-drawer--${k.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":B.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":M.value,"v-navigation-drawer--active":x.value,"v-navigation-drawer--sticky":g.value},c.value,b.value,m.value,i.value,f.value],style:[y.value,h.value,r.value,$.value,P.value]},t),{default:()=>{var W,O,F,K;return[V&&s("div",{key:"image",class:"v-navigation-drawer__img"},[a.image?(W=a.image)==null?void 0:W.call(a,{image:e.image}):s("img",{src:e.image,alt:""},null)]),a.prepend&&s("div",{class:"v-navigation-drawer__prepend"},[(O=a.prepend)==null?void 0:O.call(a)]),s("div",{class:"v-navigation-drawer__content"},[(F=a.default)==null?void 0:F.call(a)]),a.append&&s("div",{class:"v-navigation-drawer__append"},[(K=a.append)==null?void 0:K.call(a)])]}}),s(Qe,{name:"fade-transition"},{default:()=>[M.value&&(u.value||x.value)&&!!e.scrim&&s("div",{class:["v-navigation-drawer__scrim",z.backgroundColorClasses.value],style:[me.value,z.backgroundColorStyles.value],onClick:()=>x.value=!1},null)]})])}),{isStuck:R}}}),It={name:""},kt=Q({...It,setup(e){const l=Te();return(t,o)=>(ee(),te(Bt,{modelValue:ge(l).showDrawer,"onUpdate:modelValue":o[2]||(o[2]=a=>ge(l).showDrawer=a),temporary:""},{default:D(()=>[s(it,{density:"compact",nav:""},{default:D(()=>[s(he,{"prepend-icon":"mdi-view-dashboard",title:"\u6982\u89C8",value:"home",onClick:o[0]||(o[0]=a=>t.$router.push({name:"home"}))}),s(he,{"prepend-icon":"mdi-forum",title:"\u81EA\u52A8\u5316",value:"about",onClick:o[1]||(o[1]=a=>t.$router.push({name:"auto"}))})]),_:1})]),_:1},8,["modelValue"]))}});const Ct=A()({name:"VApp",props:{...st({fullHeight:!0}),...re()},setup(e,l){let{slots:t}=l;const o=ce(e),{layoutClasses:a,layoutStyles:n,getLayoutItem:c,items:m,layoutRef:b}=vt(e),{rtlClasses:y}=Be();return N(()=>{var i;return s("div",{ref:b,class:["v-application",o.themeClasses.value,a.value,y.value],style:n.value},[s("div",{class:"v-application__wrap"},[(i=t.default)==null?void 0:i.call(t)])])}),{getLayoutItem:c,items:m,theme:o}}}),Ht=Q({__name:"Default",setup(e){return(l,t)=>(ee(),te(Ct,null,{default:D(()=>[s(ht),s(kt),s(pt)]),_:1}))}});export{Ht as default};
