var $=Object.defineProperty;var G=(t,e,n)=>e in t?$(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var V=(t,e,n)=>G(t,typeof e!="symbol"?e+"":e,n);import{r as m,a as U,j as s,B as W,c as H,R as K,C as z,t as J}from"./vendor-C9OKsIch.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();var M={center:0,top:-16,bottom:16},d=t=>({in:{opacity:1,transform:"scale(1)"},out:{opacity:0,transform:`scale(var(--transition-preset-pop-in-${t}-scale, 0.9)) translateY(var(--transition-preset-pop-in-${t}, ${M[t]}px))`},transitionProperty:"transform, opacity"}),E={fade:{in:{opacity:1},out:{opacity:0},transitionProperty:"opacity"},"fade-up":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(var(--transition-preset-fade-up, -16px))"},transitionProperty:"opacity, transform"},"fade-down":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(var(--transtion-preset-fade-down, 16px)"},transitionProperty:"opacity, transform"},"fade-left":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(var(--transition-preset-fade-left, -16px))"},transitionProperty:"opacity, transform"},"fade-right":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(var(--transition-preset-fade-right, 16px)"},transitionProperty:"opacity, transform"},scale:{in:{opacity:1,transform:"scale(1)"},out:{opacity:0,transform:"scale(0)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"scale-y":{in:{opacity:1,transform:"scaleY(1)"},out:{opacity:0,transform:"scaleY(0)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"scale-x":{in:{opacity:1,transform:"scaleX(1)"},out:{opacity:0,transform:"scaleX(0)"},common:{transformOrigin:"left"},transitionProperty:"transform, opacity"},"skew-up":{in:{opacity:1,transform:"translateY(0) skew(0deg, 0deg)"},out:{opacity:0,transform:"translateY(var(--transition-preset-skew-up, -20px)) skew(var(--transition-preset-skew-up-deg, -10deg, -5deg))"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"skew-down":{in:{opacity:1,transform:"translateY(0) skew(0deg, 0deg)"},out:{opacity:0,transform:"translateY(var(--transition-preset-skew-down, 20px)) skew(var(--transition-preset-skew-down-deg, -10deg, -5deg))"},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"rotate-left":{in:{opacity:1,transform:"translateY(0) rotate(0deg)"},out:{opacity:0,transform:"translateY(var(--transition-preset-rotate-left, 20px)) rotate(var(--transition-preset-rotate-left-deg, -5deg))"},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"rotate-right":{in:{opacity:1,transform:"translateY(0) rotate(0deg)"},out:{opacity:0,transform:"translateY(var(--transition-preset-rotate-right, 20px)) rotate(var(--transition-preset-rotate-right-deg, 5deg))"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"slide-down":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(100%)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"slide-up":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(-100%)"},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"slide-left":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(-100%)"},common:{transformOrigin:"left"},transitionProperty:"transform, opacity"},"slide-right":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(100%)"},common:{transformOrigin:"right"},transitionProperty:"transform, opacity"},pop:{...d("center"),common:{transformOrigin:"center center"}},"pop-top":{...d("top"),common:{transformOrigin:"top center"}},"pop-bottom":{...d("bottom"),common:{transformOrigin:"bottom center"}},"pop-left":{...d("center"),common:{transformOrigin:"center left"}},"pop-right":{...d("center"),common:{transformOrigin:"center right"}},"pop-bottom-left":{...d("bottom"),common:{transformOrigin:"bottom left"}},"pop-bottom-right":{...d("bottom"),common:{transformOrigin:"bottom right"}},"pop-top-left":{...d("top"),common:{transformOrigin:"top left"}},"pop-top-right":{...d("top"),common:{transformOrigin:"top right"}}},F={entering:"in",entered:"in",exiting:"out",exited:"out","pre-exiting":"out","pre-entering":"out"};function Q({transition:t,state:e,duration:n,timingFunction:i}){const r={transitionDuration:`${n}ms`,transitionTimingFunction:i};return typeof t=="string"?t in E?{transitionProperty:E[t].transitionProperty,...r,...E[t].common,...E[t][F[e]]}:{}:{transitionProperty:t.transitionProperty,...r,...t.common,...t[F[e]]}}function Z(t,e){const n={...t};for(const i in e)e[i]!==void 0&&(n[i]=e[i]);return n}var _={transition:"fade",duration:150,keepMounted:!1,enterDelay:0,exitDelay:0,timingFunction:"ease",initial:!1,reduceMotion:!1},D,X=(D=class{static getConfig(){return this.config}static setConfig(t){this.config=this.merge(t)}static merge(t){const e=Z(this.config,t);return e.exitDuration===void 0&&(e.exitDuration=e.duration),e}},V(D,"config",_),D);function tt(t){X.setConfig(t)}var et={some:0,all:1};function rt(t){return typeof t=="string"?t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}function nt(t,e,{root:n,margin:i,amount:r="some"}={}){const o=rt(t),a=new WeakMap,p=l=>{l.forEach(c=>{const g=a.get(c.target);if(c.isIntersecting!==!!g)if(c.isIntersecting){const w=e(c);typeof w=="function"?a.set(c.target,w):u.unobserve(c.target)}else g&&(g(c),a.delete(c.target))})},u=new IntersectionObserver(p,{root:n,rootMargin:i,threshold:typeof r=="number"?r:et[r]});return o.forEach(l=>u.observe(l)),()=>u.disconnect()}function ot(t,{root:e,margin:n,amount:i="some",once:r=!1}={},o){const[a,p]=m.useState(!1),{enable:u}=o;return m.useEffect(()=>{if(!u||!t.current||r&&a)return;const l=()=>(p(!0),r?void 0:()=>p(!1)),c={root:e&&e.current||void 0,margin:n,amount:i};return nt(t.current,l,c)},[e,t,n,r,i]),a}var it=typeof window<"u"&&typeof window.document<"u",C=it?m.useLayoutEffect:m.useEffect;function at(t,e){const{initialMounted:n,deps:i}=e,r=m.useRef(n);C(()=>()=>{r.current=n},[]),C(()=>{if(r.current){t();return}r.current=!0},i)}function st({duration:t,initial:e,exitDuration:n,timingFunction:i,mounted:r,reduceMotion:o,onEnter:a,onExit:p,onEntered:u,onExited:l,enterDelay:c,exitDelay:g}){const[w,I]=m.useState(o?0:t),[S,v]=m.useState(()=>r?e?"pre-entering":"entered":"exited"),O=m.useRef(-1),T=m.useRef(-1),y=m.useRef(-1),P=f=>{const h=f?a:p,x=f?u:l;window.clearTimeout(O.current);const j=o?0:f?t:n;I(j),j===0?(typeof h=="function"&&h(),typeof x=="function"&&x(),v(f?"entered":"exited")):y.current=requestAnimationFrame(()=>{U.flushSync(()=>{v(f?"pre-entering":"pre-exiting")}),y.current=requestAnimationFrame(()=>{typeof h=="function"&&h(),v(f?"entering":"exiting"),O.current=window.setTimeout(()=>{typeof x=="function"&&x(),v(f?"entered":"exited")},j)})})},k=f=>{if(window.clearTimeout(T.current),typeof(f?c:g)!="number"){P(f);return}T.current=window.setTimeout(()=>{P(f)},f?c:g)};return at(()=>{k(r)},{deps:[r],initialMounted:e}),C(()=>()=>{window.clearTimeout(O.current),cancelAnimationFrame(y.current)},[]),{transitionDuration:w,transitionStatus:S,transitionTimingFunction:i||"ease"}}var ct=({mounted:t,children:e,onExit:n,onEntered:i,onEnter:r,onExited:o,viewport:a,unsafe_alwaysMounted:p,...u})=>{const{duration:l,enterDelay:c,exitDelay:g,exitDuration:w,initial:I,keepMounted:S,timingFunction:v,transition:O,reduceMotion:T}=X.merge(u),y=t==="whileInView",P=m.useRef(null),k=ot(P,a,{enable:y}),f=y?k:t,{transitionDuration:h,transitionStatus:x,transitionTimingFunction:j}=st({mounted:f,initial:I,exitDuration:w,duration:l,timingFunction:v,onExit:n,onEntered:i,onEnter:r,onExited:o,enterDelay:c,exitDelay:g,reduceMotion:T}),R=(Y,{mounted:A})=>{let b;if(A||S?typeof e=="function"?b=e(Y):m.isValidElement(e)?b=m.cloneElement(e,{style:Y}):b=e:b=null,!y)return b;const{placeholder:L,attributes:q}=a||{},B=L||"div";return s.jsx(B,{ref:P,...q,children:b})},N=({mounted:Y})=>R(Q({transition:O,duration:h,state:x,timingFunction:j}),{mounted:Y});return x==="exited"?p?N({mounted:!1}):R({display:"none"},{mounted:!1}):N({mounted:!0})};function ft(t){const{transition:e}=t,[n,i]=m.useState(!0),r=[{mounted:n},{mounted:"whileInView",desc:"whileInView"}];return s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(W,{className:"mr-2",onClick:()=>i(o=>!o),children:e}),s.jsx("div",{className:"flex gap-x-4",children:r.map((o,a)=>s.jsx("div",{className:"relative h-40 w-40",children:s.jsx(ct,{transition:e,mounted:o.mounted,keepMounted:!1,children:p=>s.jsx("div",{style:p,className:"absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-blue-400 text-white",children:s.jsx("div",{children:o.desc||e})})})},a))})]})}tt({duration:150});function mt(){const t=Object.keys(E).map(e=>s.jsx("div",{children:s.jsx(ft,{transition:e})},e));return s.jsxs("div",{className:"flex w-screen flex-col items-center justify-center p-10",children:[s.jsx("h1",{className:"mb-8 text-4xl font-bold",children:s.jsx("a",{href:"https://github.com/hemengke1997/react-transition-preset",children:"React Transition Preset"})}),s.jsx("div",{className:"flex flex-col gap-2",children:t})]})}H.createRoot(document.querySelector("#root")).render(s.jsx(K.StrictMode,{children:s.jsx(z,{theme:{cssVar:!0,algorithm:[J.darkAlgorithm]},children:s.jsx(mt,{})})}));