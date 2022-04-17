const fr=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}};fr();function $e(t,e){let o=t.length;if(o!==e.length)return!1;for(let r=0;r<o;r++)if(t[r]!==e[r])return!1;return!0}let D=t=>typeof t=="function",Q=t=>typeof t=="object",{isArray:vr}=Array;function st(t,e){let{length:o}=t;for(let r=0;r<o;r++)t[r]&&Array.isArray(t[r])?st(t[r],e):e(t[r])}class br{constructor(e,o,r){this.message=o,this.target=e,this.value=r}}let ae=null,mr={true:1,"":1,1:1};function gr(t,e,o,r,n){let{type:i,reflect:a,event:l,value:c,attr:u=yr(e)}=Q(o)&&o!=ae?o:{type:o},d=!(i==Function||i==ae);Object.defineProperty(t,e,{configurable:!0,set(h){let p=this[e],{error:f,value:v}=kr(i,d&&D(h)?h(p):h);if(f&&v!=null)throw new br(this,`The value defined for prop '${e}' must be of type '${i.name}'`,v);p!=v&&(this._props[e]=v,this.update(),l&&Le(this,l),this.updated.then(()=>{a&&(this._ignoreAttr=u,wr(this,i,u,this[e]),this._ignoreAttr=null)}))},get(){return this._props[e]}}),c!=null&&(n[e]=c),r[u]={prop:e,type:i}}let Le=(t,{type:e,base:o=CustomEvent,...r})=>t.dispatchEvent(new o(e,r)),yr=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase(),wr=(t,e,o,r)=>r==null||e==Boolean&&!r?t.removeAttribute(o):t.setAttribute(o,Q(r)?JSON.stringify(r):e==Boolean?"":r),xr=(t,e)=>t==Boolean?!!mr[e]:t==Number?Number(e):t==Array||t==Object?JSON.parse(e):e,kr=(t,e)=>t==null||e==null?{value:e,error:!1}:t!=String&&e===""?{value:null,error:!1}:t==Object||t==Array||t==Symbol?{value:e,error:{}.toString.call(e)!==`[object ${t.name}]`}:e instanceof t?{value:e,error:t==Number&&Number.isNaN(e.valueOf())}:t==String||t==Number||t==Boolean?{value:e,error:t==Number?typeof e!="number"?!0:Number.isNaN(e):t==String?typeof e!="string":typeof e!="boolean"}:{value:e,error:!0},G;function dt(t,e,o){let{i:r,hooks:n}=G,i=n[r]=n[r]||{};return i[0]=t(i[0]),i[1]=e,i[2]=o,G.i++,n[r][0]}let g=t=>dt((e={current:t})=>e),L=()=>g(G.host),$t=()=>G.update;function zr(t,e){let o={};function r(a,l){for(let c in o){let u=o[c];u[a]&&(u[0]=u[a](u[0],l))}}function n(a){G={host:e,hooks:o,update:t,i:0};let l;try{l=a()}finally{G=null}return l}function i(a){return r(1,a),()=>{r(2,a),a&&(o={})}}return{load:n,cleanEffects:i}}let Lt={sheet:!!document.adoptedStyleSheets,ssr:null};function w(t,e=HTMLElement){let o={},r={},{props:n,styles:i}=t;return class extends e{constructor(){super();this._setup(),this._render=()=>t({...this._props});for(let l in r)this[l]=r[l]}static get styles(){return[super.styles,i]}async _setup(){if(this._props)return;this._props={},this.mounted=new Promise(h=>this.mount=h),this.unmounted=new Promise(h=>this.unmount=h),this.symbolId=this.symbolId||Symbol();let l=zr(()=>this.update(),this),c,u=!0,d="hydrate"in this.dataset;this.update=()=>(c||(c=!0,this.updated=(this.updated||this.mounted).then(()=>{try{const h=l.load(this._render);return h&&h.render(this,this.symbolId,u&&d),c=!1,u&&(u=!1,Sr(this)),!Lt.ssr&&l.cleanEffects()}finally{c=!1}}).then(h=>{h&&h()})),this.updated),this.update(),await this.unmounted,l.cleanEffects(!0)()}connectedCallback(){this.mount(),super.connectedCallback&&super.connectedCallback()}async disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),await this.mounted,!this.isConnected&&this.unmount()}attributeChangedCallback(l,c,u){if(o[l]){if(l===this._ignoreAttr||c===u)return;let{prop:d,type:h}=o[l];this[d]=xr(h,u)}else super.attributeChangedCallback(l,c,u)}static get props(){return{...super.props,...n}}static get observedAttributes(){let l=super.observedAttributes||[];for(let c in n)gr(this.prototype,c,n[c],o,r);return Object.keys(o).concat(l)}}}function Sr(t){let{styles:e}=t.constructor,{shadowRoot:o}=t;if(o&&e.length)if(Lt.sheet){let r=[];st(e,n=>n&&r.push(n)),o.adoptedStyleSheets=r}else st(e,r=>r&&o.appendChild(r.cloneNode(!0)))}let Ce=t=>(e,o)=>{let r=([n,i],a)=>{if(a)D(n)&&n();else return[n||e(i),i]};dt(([n,i]=[])=>((i||!i)&&(i&&$e(i,o)?n=n||!0:(D(n)&&n(),n=null)),[n,o]),t==1&&r,t==2&&r)},ht=Ce(1),N=Ce(2);function A(t){let e=L();if(t in e.current){if(!e[t]){let o=[null,r=>e.current[t]=r];e[t]=o}return e[t][0]=e.current[t],e[t]}}function tt(t,e={}){let o=L();return o[t]||(o[t]=(r=e.detail)=>Le(o.current,{type:t,...e,detail:r})),o[t]}function _(t){let e=$t();return dt((o=[])=>{if(!o[1]){let r=n=>D(n)?n(o[0]):n;o[0]=r(t),o[1]=n=>{n=r(n),o[0]!==n&&(o[0]=n,e())}}return o})}function Ct(t,e){let[o]=dt(([r,n,i=0]=[])=>((!n||n&&!$e(n,e))&&(r=t(e)),[r,e,i]));return o}let Ar={checked:1,value:1,selected:1},$r={list:1,type:1,size:1,form:1,width:1,height:1,src:1,href:1,slot:1},Lr={shadowDom:1,staticNode:1,cloneNode:1,children:1,key:1},it={},Ee=[],Cr=3,at=document;class xt extends Text{get nodeType(){return-1}}let Et=Symbol.for,Er=Et("Atomico.ID"),Mt=Et("Atomico.$$"),gt=Et("Atomico.REF");function Mr(t,e,o){return et(this,t,e,o)}function s(t,e,...o){let r=e||it,{children:n}=r;n=n??(o.length?o:Ee);let i=t?t instanceof Node?1:t.prototype instanceof HTMLElement&&2:!1;return{$$:Mt,type:t,props:r,children:n,key:r.key,shadow:r.shadowDom,static:r.staticNode,raw:i,is:r.is,clone:r.cloneNode,render:Mr}}function et(t,e,o=Er,r,n){let i;if(e&&e[o]&&e[o].vnode==t||t.$$!=Mt)return e;(t||!e)&&(n=n||t.type=="svg",i=t.type!="host"&&(t.raw==1?(e&&t.clone?e[gt]:e)!=t.type:t.raw==2?!(e instanceof t.type):e?e[gt]||e.localName!=t.type:!e),i&&t.type!=null&&(t.raw==1&&t.clone?(r=!0,e=t.type.cloneNode(!0),e[gt]=t.type):e=t.raw==1?t.type:t.raw==2?new t.type:n?at.createElementNS("http://www.w3.org/2000/svg",t.type):at.createElement(t.type,t.is?{is:t.is}:void 0)));let{vnode:a=it,cycle:l=0,fragment:c,handlers:u}=e[o]?e[o]:it,{children:d=Ee,props:h=it}=a;if(u=i?{}:u||{},t.static&&!i)return e;if(t.shadow&&!e.shadowRoot&&e.attachShadow({mode:"open"}),t.props!=h&&Rr(e,h,t.props,u,n),t.children!==d){let p=t.shadow?e.shadowRoot:e;c=Zr(t.children,c,p,o,!l&&r,n&&t.type=="foreignObject"?!1:n)}return l++,e[o]={vnode:t,handlers:u,fragment:c,cycle:l},e}function Tr(t,e){let o=new xt(""),r=new xt("");return t[e?"prepend":"append"](o),t.append(r),{markStart:o,markEnd:r}}function Zr(t,e,o,r,n,i){t=t==null?null:vr(t)?t:[t];let a=e||Tr(o,n),{markStart:l,markEnd:c,keyes:u}=a,d,h=u&&new Set,p=l;if(t&&st(t,f=>{let v=typeof f;if(f==null||v=="boolean"||v=="function"||v=="object"&&f.$$!=Mt)return;let b=f.$$&&f.key,k=u&&b!=null&&u.get(b);p!=c&&p===k?h.delete(p):p=p==c?c:p.nextSibling;let y=u?k:p,z=y;if(f.$$)z=et(f,y,r,n,i);else{let $=f+"";z.nodeType!=Cr?z=new Text($):z.data!=$&&(z.data=$)}z!=p&&(u&&h.delete(z),!y||u?(o.insertBefore(z,p),u&&p!=c&&h.add(p)):y==c?o.insertBefore(z,c):(o.replaceChild(z,y),p=z)),b!=null&&(d=d||new Map,d.set(b,z))}),p=p==c?c:p.nextSibling,e&&p!=c)for(;p!=c;){let f=p;p=p.nextSibling,f.remove()}return h&&h.forEach(f=>f.remove()),a.keyes=d,a}function Rr(t,e,o,r,n){for(let i in e)!(i in o)&&le(t,i,e[i],null,n,r);for(let i in o)le(t,i,e[i],o[i],n,r)}function le(t,e,o,r,n,i){if(e=e=="class"&&!n?"className":e,o=o??null,r=r??null,e in t&&Ar[e]&&(o=t[e]),!(r===o||Lr[e]||e[0]=="_"))if(e[0]=="o"&&e[1]=="n"&&(D(r)||D(o)))Br(t,e.slice(2),r,i);else if(e=="ref")r&&(D(r)?r(t):r.current=t);else if(e=="style"){let a=t.style;o=o||"",r=r||"";let l=Q(o),c=Q(r);if(l)for(let u in o)if(c)!(u in r)&&ce(a,u,null);else break;if(c)for(let u in r){let d=r[u];l&&o[u]===d||ce(a,u,d)}else a.cssText=r}else{let a=e[0]=="$"?e.slice(1):e;a===e&&(!n&&!$r[e]&&e in t||D(r)||D(o))?t[e]=r??"":r==null?t.removeAttribute(a):t.setAttribute(a,Q(r)?JSON.stringify(r):r)}}function Br(t,e,o,r){if(r.handleEvent||(r.handleEvent=n=>r[n.type].call(t,n)),o){if(!r[e]){let n=o.capture||o.once||o.passive?Object.assign({},o):null;t.addEventListener(e,r,n)}r[e]=o}else r[e]&&(t.removeEventListener(e,r),delete r[e])}function ce(t,e,o){let r="setProperty";o==null&&(r="removeProperty",o=null),~e.indexOf("-")?t[r](e,o):t[e]=o}let m=(t,e=at.createElement("template").content)=>et(s("host",null,t),e).children[0],ue={};function x(t,...e){let o=(t.raw||t).reduce((r,n,i)=>r+n+(e[i]||""),"");return ue[o]=ue[o]||Dr(o)}function Dr(t){if(Lt.sheet){let e=new CSSStyleSheet;return e.replaceSync(t),e}else{let e=at.createElement("style");return e.textContent=t,e}}var Me=function(t,e,o,r){var n;e[0]=0;for(var i=1;i<e.length;i++){var a=e[i++],l=e[i]?(e[0]|=a?1:2,o[e[i++]]):e[++i];a===3?r[0]=l:a===4?r[1]=Object.assign(r[1]||{},l):a===5?(r[1]=r[1]||{})[e[++i]]=l:a===6?r[1][e[++i]]+=l+"":a?(n=t.apply(l,Me(t,l,o,["",null])),r.push(n),l[0]?e[0]|=2:(e[i-2]=0,e[i]=n)):r.push(l)}return r},de=new Map;function Pr(t){var e=de.get(this);return e||(e=new Map,de.set(this,e)),(e=Me(this,e.get(t)||(e.set(t,e=function(o){for(var r,n,i=1,a="",l="",c=[0],u=function(p){i===1&&(p||(a=a.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?c.push(0,p,a):i===3&&(p||a)?(c.push(3,p,a),i=2):i===2&&a==="..."&&p?c.push(4,p,0):i===2&&a&&!p?c.push(5,0,!0,a):i>=5&&((a||!p&&i===5)&&(c.push(i,0,a,n),i=6),p&&(c.push(i,p,0,n),i=6)),a=""},d=0;d<o.length;d++){d&&(i===1&&u(),u(d));for(var h=0;h<o[d].length;h++)r=o[d][h],i===1?r==="<"?(u(),c=[c],i=3):a+=r:i===4?a==="--"&&r===">"?(i=1,a=""):a=r+a[0]:l?r===l?l="":a+=r:r==='"'||r==="'"?l=r:r===">"?(u(),i=1):i&&(r==="="?(i=5,n=a,a=""):r==="/"&&(i<5||o[d][h+1]===">")?(u(),i===3&&(c=c[0]),i=c,(c=c[0]).push(2,0,i),i=0):r===" "||r==="	"||r===`
`||r==="\r"?(u(),i=2):a+=r),i===3&&a==="!--"&&(i=4,c=c[0])}return u(),c}(t)),e),arguments,[])).length>1?e:e[0]}Pr.bind(s);function kt(t,e,o){return Promise.resolve(t).then(r=>typeof r=="function"?kt(r(o.get(),e),null,o):r&&typeof r=="object"&&typeof r.next=="function"?new Promise(n=>{function i(a){Promise.resolve(a.next(o.get())).then(({value:l,done:c})=>kt(l,null,o).then(()=>{c?n(o.get()):i(a)}))}i(r)}):(o.set(r),o.get()))}const he=t=>typeof t=="function"?t():t;class Nr{state;actions;#t;#e;#r;#o;constructor(e,{actions:o,getters:r}={}){this.#t=he(e),this.#e=o,this.#r=r,this.#o=new Set,this.state=this.createProxyState(),this.actions=this.createProxyActions()}createProxyState(){return new Proxy(this,{get:(e,o)=>this.#r&&o in this.#r?this.#r[o](this.#t):this.#t[o]})}createProxyActions(){return new Proxy(this,{get:(e,o)=>r=>kt(this.#e[o],r,{get:()=>this.#t,set:n=>{n&&(this.#t=n,this.#o.forEach(i=>i(this.#t)))}})})}on=e=>(this.#o.add(e),()=>this.#o.delete(e));clone=e=>new this.constructor({...this.#t,...he(e)},{actions:this.#e,getters:this.#r})}const Or=(t,e=300)=>new Promise(o=>setTimeout(o,e,t));async function*Ir({api:t}){return{...yield,products:await(await fetch(t)).json()}}async function*jr(t,{id:e,count:o}){const{products:r}=t,n=r.find(d=>d.id===e),i=t.cart[e]||{product:n,total:0};yield{...t,cart:{...t.cart,[e]:{...i,loading:!0}}};const a=await Or({stock:3},500);t=yield;const l=t.cart[e],c=l.total+o,u=c>=a.stock;return{...t,cart:{...t.cart,[e]:{...l,total:u?a.stock:c,disabled:u,loading:!1}}}}var _r=Object.freeze(Object.defineProperty({__proto__:null,get:Ir,calc:jr},Symbol.toStringTag,{value:"Module"}));const Hr=new Nr(()=>({api:"",cart:{},products:[]}),{actions:_r,getters:{total:({cart:t})=>Object.values(t).reduce((e,{total:o,product:r})=>e+r.price*o,0)}});function Tt(t){const e=g();return e.current=t,e}function E(t,e,o,r){const n=Tt(o);ht(()=>{const{current:i}=t;if(!(!i||!o))return Zt(i,e,a=>n.current(a),r)},[t,t?.current,e,!!o])}function Zt(t,e,o,r){return t.addEventListener(e,o,r),()=>t.removeEventListener(e,o)}const Te="store-context";function Fr(t,e){const o=L();E(o,Te,r=>{r.detail.id===e&&(r.stopImmediatePropagation(),r.detail.sync(t))})}function Wr(t,e){const[o]=_(()=>t.clone(e));return Ze(o)}function Ze(t){const e=$t();return N(()=>{if(!!t)return t.on(e)},[t]),t}function qr(t){const e=tt(Te,{bubbles:!0,composed:!0}),[o]=_(()=>{let r;return e({id:t,sync(n){r=n}}),r});return Ze(o),o}function Yr(t){const[e,o]=_(()=>({status:"",action:r=>{o(function n(i){return i.status==="pending"?i:(t(r).then(a=>o(l=>l.id===n?{...l,result:a,status:"fulfilled"}:l),a=>o(l=>l.id===n?{...l,result:a,status:"rejected"}:l)),{...i,id:n,status:"pending"})})}}));return[e.action,e.status]}var Re="fm",Xr={font:{size:"1rem",family:"unset"},border:{radius:".5rem",width:"1px"},opacity:{unselect:".25",unfocus:".5",disabled:".5"},size:{"":"4px",xl:"calc(var(--size) * 10)",l:"calc(var(--size) * 8)",m:"calc(var(--size) * 7)",s:"calc(var(--size) * 5)",xs:"calc(var(--size) * 4)",xxs:"calc(var(--size) * 3)"},color:{primary:{60:"#2C3A41",30:"transparent",10:"#fff"},action:{60:"#fff",30:"transparent",10:"var(--color-primary-60)"},toggle:{60:"var(--color-primary-60)",30:"var(--color-primary-30)",10:"var(--color-primary-10)"},layer:{60:"#fff",30:"transparent",10:"var(--color-primary-60)"},scroll:{60:"transparent",30:"transparent",10:"var(--color-neutral-10)"},input:{60:"var(--color-action-60)",30:"var(--color-action-30)",10:"var(--color-action-10)"},button:{60:"var(--color-action-60)",30:"var(--color-action-30)",10:"var(--color-action-10)"},success:{60:"#18D47C",30:"transparent",10:"#fff"},info:{60:"#0080FF",30:"transparent",10:"#fff"},warning:{60:"#F9AA33",30:"transparent",10:"#fff"},danger:{60:"#FF5B5B",30:"transparent",10:"#fff"},neutral:{60:"#D8E2EA",30:"transparent",10:"var(--color-primary-60)"}},input:{border:{width:"var(--border-width)",style:"solid","":"var(--input-border-width) var(--input-border-style) var(--color-input-30)"}},tab:{width:"100%",height:"100%",radius:"100px"},transition:{action:".2s ease all"},shadow:{layer:"0px 12px 22px rgba(0,0,0 ,.05)"},variation:{["size=small"]:{font:{size:"0.875rem"},size:{xl:"calc(var(--size) * 8)",l:"calc(var(--size) * 7)",m:"calc(var(--size) * 5)",s:"calc(var(--size) * 3.5)"}}}},Be=(t,e,o="")=>{let r="";for(let n in t)if(n=="")r+=e(t[n],o);else{let i=(o?o+"-":"")+n;typeof t[n]=="object"?r+=Be(t[n],e,i):r+=e(t[n],i)}return r},Ur=(t,e,o=t.cssRules.length)=>t.insertRule(e,o);function Gr(t,e={},o){const{variation:r,media:n,...i}=e;let a=0;const l=(u,d,h="")=>Ur(t,`${u}{${Be(d,(p,f)=>`--${f}:${o?`var(--${o}${h?"-"+h:""}--${f}, ${p})`:p};`)}}`,a++),c=":host";l(c,i);for(let u in r)l(`${c}([${u}])`,r[u],u.replace(/[^\w]+/g,"-"));return e}var Kr=(t,e)=>o=>Gr(o,t,e),Jr=(...t)=>(e,o)=>{let r=e instanceof HTMLStyleElement?e.sheet:e;return t.reduce((n,i)=>i(r,n),o),e},C=Jr(Kr(Xr,Re))(x`
    :host {
        font-size: var(--font-size);
        font-family: var(--font-family);
    }
    :host([disabled]) {
        opacity: var(--opacity-disabled);
        pointer-events: none;
    }
`),S={define(t,e,o){customElements.define(`${Re}-${t}`,e,o)}};const De=document.createElement("template");De.innerHTML='<style>*{box-sizing:border-box}:host{--fade-in-transition-duration:150ms;--fade-out-transition-duration:800ms;--fade-out-transition-delay:300ms;--fill-color-transition-duration:150ms;--viewport-overflow-x:auto;--viewport-overflow-y:auto;--viewport-scroll-snap-type:none;--viewport-scroll-behavior:auto;--viewport-overscroll-behavior:auto;--viewport-z-index:0;--scrollbar-width:16px;--scrollbar-padding:2px;--scrollbar-fill-color:transparent;--scrollbar-fill-color-hover:transparent;--scrollbar-border-width:0;--scrollbar-border-style:none;--scrollbar-border-color:#999;--scrollbar-border-radius:0;--scrollbar-box-shadow:none;--scrollbar-z-index-hover:30;--vertical-scrollbar-padding:var(--scrollbar-padding);--vertical-scrollbar-background:none;--vertical-scrollbar-background-size:auto;--vertical-scrollbar-z-index:20;--horizontal-scrollbar-padding:var(--scrollbar-padding);--horizontal-scrollbar-background:none;--horizontal-scrollbar-background-size:auto;--horizontal-scrollbar-z-index:10;--scrollbar-track-fill-color:transparent;--scrollbar-track-fill-color-hover:transparent;--scrollbar-track-border-width:0;--scrollbar-track-border-style:none;--scrollbar-track-border-color:#999;--scrollbar-track-border-radius:0;--scrollbar-track-box-shadow:none;--vertical-scrollbar-track-background:none;--vertical-scrollbar-track-background-size:auto;--horizontal-scrollbar-track-background:none;--horizontal-scrollbar-track-background-size:auto;--scrollbar-thumb-fill-color:#ccc;--scrollbar-thumb-fill-color-hover:#aaa;--scrollbar-thumb-border-width:0;--scrollbar-thumb-border-style:none;--scrollbar-thumb-border-color:#999;--scrollbar-thumb-border-radius:var(--scrollbar-width);--scrollbar-thumb-box-shadow:none;--vertical-scrollbar-thumb-background:none;--vertical-scrollbar-thumb-background-size:auto;--horizontal-scrollbar-thumb-background:none;--horizontal-scrollbar-thumb-background-size:auto;--content-padding:0;position:relative;overflow:hidden;display:grid;grid-template:1fr/1fr}.viewport{z-index:var(--viewport-z-index);display:grid;overflow-x:var(--viewport-overflow-x);overflow-y:var(--viewport-overflow-y);scrollbar-width:none;outline:0;scroll-behavior:var(--viewport-scroll-behavior);overscroll-behavior:var(--viewport-overscroll-behavior);scroll-snap-type:var(--viewport-scroll-snap-type)}.viewport::-webkit-scrollbar{width:0;height:0}.content{padding:var(--content-padding)}.content.restrict-width{width:var(--viewport-width)}.content.restrict-height{height:var(--viewport-height)}.scrollbar{user-select:none;touch-action:none;position:absolute;border-width:var(--scrollbar-border-width);border-style:var(--scrollbar-border-style);border-color:var(--scrollbar-border-color);border-radius:var(--scrollbar-border-radius);box-shadow:var(--scrollbar-box-shadow);opacity:0;transition:opacity var(--fade-out-transition-duration) ease-in-out var(--fade-out-transition-delay),background-color var(--fill-color-transition-duration) ease-out}.vertical-scrollbar{z-index:var(--vertical-scrollbar-z-index);width:var(--scrollbar-width);right:0;top:0;bottom:0;padding:var(--vertical-scrollbar-padding);background:var(--vertical-scrollbar-background);background-color:var(--scrollbar-fill-color);background-size:var(--vertical-scrollbar-background-size)}.vertical-scrollbar.left-position{left:0;right:auto}.horizontal-scrollbar{z-index:var(--horizontal-scrollbar-z-index);height:var(--scrollbar-width);left:0;right:0;bottom:0;padding:var(--horizontal-scrollbar-padding);background:var(--horizontal-scrollbar-background);background-color:var(--scrollbar-fill-color);background-size:var(--horizontal-scrollbar-background-size)}.horizontal-scrollbar.top-position{top:0;bottom:auto}.scrollbar:hover,.scrollbar.scrolling-with-thumb,.viewport:hover~.scrollbar,.viewport:not(:focus):focus-within~.scrollbar,.viewport.touch~.scrollbar{opacity:1;transition:opacity var(--fade-in-transition-duration) ease-in-out 0s,background-color var(--fill-color-transition-duration) ease-out}.viewport.scrollbar-visible~.scrollbar{opacity:1;transition:none}.scrollbar:hover,.scrollbar.scrolling-with-thumb{z-index:var(--scrollbar-z-index-hover);background-color:var(--scrollbar-fill-color-hover)}.scrollbar.hidden{display:none}.scrollbar .scrollbar-track{height:100%;width:100%;border-width:var(--scrollbar-track-border-width);border-style:var(--scrollbar-track-border-style);border-color:var(--scrollbar-track-border-color);border-radius:var(--scrollbar-track-border-radius);box-shadow:var(--scrollbar-track-box-shadow);transition:background-color var(--fill-color-transition-duration) ease-out}.vertical-scrollbar .scrollbar-track{background:var(--vertical-scrollbar-track-background);background-color:var(--scrollbar-track-fill-color);background-size:var(--vertical-scrollbar-track-background-size)}.horizontal-scrollbar .scrollbar-track{background:var(--horizontal-scrollbar-track-background);background-color:var(--scrollbar-track-fill-color);background-size:var(--horizontal-scrollbar-track-background-size)}.scrollbar-track:hover,.scrollbar.scrolling-with-thumb .scrollbar-track{background-color:var(--scrollbar-track-fill-color-hover)}.scrollbar .scrollbar-thumb{height:100%;width:100%;border-width:var(--scrollbar-thumb-border-width);border-style:var(--scrollbar-thumb-border-style);border-color:var(--scrollbar-thumb-border-color);border-radius:var(--scrollbar-thumb-border-radius);transform:translate3d(0,0,0);box-shadow:var(--scrollbar-thumb-box-shadow);transition:background-color var(--fill-color-transition-duration) ease-out}.vertical-scrollbar .scrollbar-thumb{background:var(--vertical-scrollbar-thumb-background);background-color:var(--scrollbar-thumb-fill-color);background-size:var(--vertical-scrollbar-thumb-background-size)}.horizontal-scrollbar .scrollbar-thumb{background:var(--horizontal-scrollbar-thumb-background);background-color:var(--scrollbar-thumb-fill-color);background-size:var(--horizontal-scrollbar-thumb-background-size)}.scrollbar .scrollbar-thumb:hover,.scrollbar.scrolling-with-thumb .scrollbar-thumb{background-color:var(--scrollbar-thumb-fill-color-hover)}</style><div class="viewport" tabindex="-1"><div class="content"><slot></slot></div></div><div class="scrollbar vertical-scrollbar hidden"><div class="scrollbar-track"><div class="scrollbar-thumb"></div></div></div><div class="scrollbar horizontal-scrollbar hidden"><div class="scrollbar-track"><div class="scrollbar-thumb"></div></div></div>';const zt=Symbol("vertical"),Pe=Symbol("horizontal"),U=[{key:zt,name:"vertical",size:"height",o:"offsetHeight",l:"scrollHeight",position:"top",t:"scrollTop",i:"overflow-y",h:"clientY",v:"pageY"},{key:Pe,name:"horizontal",size:"width",o:"offsetWidth",l:"scrollWidth",position:"left",t:"scrollLeft",i:"overflow-x",h:"clientX",v:"pageX"}];class Ne extends HTMLElement{constructor(){super(),this.u(),this.p(),this.g()}static get observedAttributes(){return["scrollbar-visibility","vertical-scrollbar-position","horizontal-scrollbar-position"]}connectedCallback(){this.k(),this.m(),this.S()}attributeChangedCallback(e,o,r){e==="scrollbar-visibility"?this.viewport.classList.toggle("scrollbar-visible",r==="always"):e==="vertical-scrollbar-position"?this.elements[zt].C.classList.toggle("left-position",r==="left"):e==="horizontal-scrollbar-position"&&this.elements[Pe].C.classList.toggle("top-position",r==="top")}u(){this.viewport,this.content,this.elements={},this.cache={},this.T={},this.$=null;for(let e of U)this.elements[e.key]={C:null,W:null,T:null},this.cache[e.key]={A:!1,F:!1,M:0,O:0,P:1},this.T[e.key]={q:!0,L:1,R:{v:0,t:0}}}p(){this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(De.content.cloneNode(!0)),this.viewport=this.shadowRoot.querySelector(".viewport"),this.content=this.viewport.querySelector(".content");for(let e of U){const o=this.elements[e.key];o.C=this.shadowRoot.querySelector(`.${e.name}-scrollbar`),o.W=o.C.querySelector(".scrollbar-track"),o.T=o.W.querySelector(".scrollbar-thumb")}}g(){const e=new ResizeObserver(()=>{this.H()});e.observe(this.viewport),e.observe(this.content);for(let o of U){const r=this.elements[o.key];e.observe(r.W),r.W.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),this.D(o,i)});const n=i=>{this.X(o,i)};r.T.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),r.T.addEventListener("pointermove",n,{passive:!0}),r.T.setPointerCapture(i.pointerId),this.Y(o,i)}),r.T.addEventListener("pointerup",i=>{r.T.removeEventListener("pointermove",n,{passive:!0}),r.T.releasePointerCapture(i.pointerId),this.j(o)},{passive:!0})}this.viewport.addEventListener("scroll",()=>{this.B()},{passive:!0}),this.viewport.addEventListener("touchstart",()=>{this.G()},{passive:!0}),this.viewport.addEventListener("touchend",()=>{this.I()},{passive:!0})}D(e,o){const r=this.elements[e.key],n=this.cache[e.key],i=r.W.getBoundingClientRect(),a=r.T.getBoundingClientRect(),l=o[e.h]-i[e.position]-a[e.size]/2,c=n.O/i[e.size],u=l/n.P*c;requestAnimationFrame(()=>{this.viewport.scrollTo({[e.position]:u,behavior:"smooth"}),this.viewport.focus({preventScroll:!0})})}Y(e,o){const r=this.elements[e.key],n=this.T[e.key],i=r.W.getBoundingClientRect();n.q=!0,n.L=this.cache[e.key].O/i[e.size],n.R.v=o.touches?o.touches[0][e.v]:o[e.v],n.R.t=this.viewport[e.t],requestAnimationFrame(()=>{this.viewport.classList.add(`scrolling-with-${e.name}-thumb`),r.C.classList.add("scrolling-with-thumb"),this.viewport.focus({preventScroll:!0})})}X(e,o){const r=this.T[e.key];if(r.q){const n=((o.touches?o.touches[0][e.v]:o[e.v])-r.R.v)/this.cache[e.key].P*r.L,i=r.R.t+n;this.viewport[e.t]=i}}j(e){const o=this.T[e.key];o.q&&(o.q=!1,this.viewport.classList.remove(`scrolling-with-${e.name}-thumb`),this.elements[e.key].C.classList.remove("scrolling-with-thumb"))}G(){this.viewport.classList.add("touch")}I(){this.viewport.classList.remove("touch")}B(){this.$===null&&(this.$=requestAnimationFrame(()=>{this.S(),this.$=null}))}H(){this.k(),this.$===null&&(this.$=requestAnimationFrame(()=>{this.m(),this.S(),this.$=null}))}k(){const e=getComputedStyle(this.viewport);for(let o of U){const r=this.cache[o.key];r.F=e.getPropertyValue(o.i).trim()==="hidden",r.M=Math.floor(10*this.viewport[o.o])/10,r.O=Math.floor(10*this.elements[o.key].W[o.o])/10,r.P=r.O/this.viewport[o.l],r.A=!r.F&&this.viewport[o.l]>Math.ceil(r.M)}}m(){for(let e of U){const o=this.elements[e.key],r=this.cache[e.key];if(this.shadowRoot.host.style.setProperty(`--viewport-${e.size}`,`${r.M}px`),this.content.classList.toggle(`restrict-${e.size}`,r.F),o.C.classList.toggle("hidden",!r.A),r.A){const n=r.M*r.P;o.T.style[e.size]=`${n}px`}}}S(){for(let e of U){const o=this.cache[e.key];if(o.A){const r=this.viewport[e.t]*o.P;this.elements[e.key].T.style.transform=e.key===zt?`translate3D(0, ${r}px, 0)`:`translate3D(${r}px, 0, 0)`}}}}window.customElements.define("scrollable-component",Ne);function Rt({width:t,height:e}){return s("host",{shadowDom:!0},s("style",null,`:host{
            ${t?`--width: ${t}`:""}
            ${e?`--height: ${e}`:""}
        }`))}Rt.props={width:{type:String},height:{type:String}};Rt.styles=[C,x`
        :host {
            width: var(--width, 100%);
            height: var(--height, 100%);
            --scrollbar-width: calc(var(--size) * 2);
        }
    `];var Bt=w(Rt,Ne);S.define("scroll",Bt);function Dt(){return s("host",{shadowDom:!0},s("span",{class:"tab-action"},s("slot",null)),s("div",{class:"tab-mark"},s("div",{part:"mark",class:"tab-mark-solid"})))}Dt.props={active:{type:Boolean,reflect:!0},position:{type:String,reflect:!0,value:"bottom"}};Dt.styles=[C,x`
        :host {
            --mark-opacity: 0;
            --template: "tab" auto "mark" 2px / auto;
            --padding: 0 var(--size-s);
            display: grid;
            align-items: center;
            position: relative;
            grid-template: var(--template);
        }
        :host([position="top"]),
        :host([position="bottom"]) {
        }
        :host([position="top"]) {
            --template: "mark" 2px "tab" auto / auto;
        }
        :host([position="right"]) {
            --template: "tab mark" auto/ auto 2px;
        }
        :host([position="left"]) {
            --template: "mark tab" auto/ 2px auto;
        }

        :host([position="left"]),
        :host([position="right"]) {
            --padding: calc(var(--size) * 2) 0;
        }

        :host([active]) {
            --mark-opacity: 1;
        }
        .tab-action {
            grid-area: tab;
        }
        .tab-mark {
            width: 100%;
            height: 100%;
            grid-area: mark;
            box-sizing: border-box;
            position: relative;
            padding: var(--padding);
            display: flex;
            place-content: center;
        }
        .tab-mark-solid {
            width: var(--tab-width);
            height: var(--tab-height);
            background: var(--color-primary-60);
            transition: 0.3s ease all;
            border-radius: var(--tab-radius);
            opacity: var(--mark-opacity);
        }
    `];var Oe=w(Dt);S.define("tab",Oe);function M(t){const[e,o]=_([]);return N(()=>{const{current:r}=t;if(!r)return;const n=()=>o(r.assignedNodes().filter(i=>!(i instanceof xt)));return n(),Zt(r,"slotchange",n)},[]),e}function Qr(t){const e=L(),o=M(t),[r,n]=_(o),i=a=>a.parentElement===e.current;return N(()=>{!o.length||n([...r,...o].filter(i))},o),N(()=>{if(!r.length)return;const a=new Set(r.map(c=>c.assignedSlot));a.delete(t.current);const l=[...a].map(c=>Zt(c,"slotchange",()=>n(u=>{const d=u.filter(i);return u.length===d.length?u:d})));return()=>l.map(c=>c())},r),r}function Pt({position:t}){const[e,o]=A("value"),r=g(),n=Qr(r);return n.forEach(i=>i.ghost=!0),s("host",{shadowDom:!0},s("slot",{ref:r}),s("div",{class:"tabs"},n.map((i,a)=>s(Oe,{active:i.value===e,position:t,onclick:()=>o(i.value)},s("slot",{name:i.slot=`tab-${a}`})))))}Pt.props={name:String,value:{type:String,event:{type:"change"}},position:{type:String,reflect:!0}};Pt.styles=x`'
    :host{
        --flow: row nowrap;
    }
    :host([position="left"]),
    :host([position="right"]){
        --flow: column;
    }
    [name="mark"] {
        display: none;
    }
    .tabs {
        display: flex;
        flex-flow: var(--flow);
    }

`;var Vr=w(Pt);S.define("tabs",Vr);function Ie(){return s("host",{shadowDom:!0},s("slot",null))}Ie.styles=C;var to=w(Ie);S.define("theme",to);var pt=[C,x`
        :host {
            width: 100%;

            display: block;
            ---line-opacity: var(--input-opacity-unfocus);
            --space-x: var(--size-s);
        }

        .input-row {
            width: 100%;
            height: 100%;
            display: grid;
            align-items: center;
            grid-template-columns: var(--columns);
            position: relative;
            box-sizing: border-box;
            gap: var(--size-xs);
            min-height: var(--size-xl);
        }

        .input-line {
            width: 100%;
            height: var(--input-border-width);
            position: absolute;
            bottom: calc(var(--input-border-width) * -1);
            left: 0px;
            background: var(--color-input-10);
            opacity: var(---line-opacity);
            transition: var(--transition-action);
        }

        .input {
            width: 100%;
            height: 100%;
            border: var(--input-border);
            border-radius: var(--border-radius);
            padding: 0 var(--space-x);
            background: var(--color-input-60);
            box-sizing: border-box;
            position: relative;
            min-height: var(--size-xl);
        }

        :host([focused]) {
            ---line-opacity: 1;
        }

        ::slotted([slot="input"]) {
            width: 100%;
            height: 100%;
            font: unset;
            background: transparent;
            border: none;
            letter-spacing: unset;
            color: unset;
            outline: none;
            position: relative;
            z-index: 1;
            line-height: unset;
            text-align: var(--text-align);
            border: none;
            padding: 0;
        }
    `],eo={formilk:m(s("svg",{viewBox:"0 0 16 16",style:"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"},s("path",{d:"M.8 16a3.999 3.999 0 0 0 4-4v4h-4Zm4-7.6h3.199v4.4A3.2 3.2 0 0 1 4.8 16V8.4Z",style:"fill:#02d365;fill-rule:nonzero",transform:"translate(2)"}),s("path",{d:"M1.6 14.4a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z",style:"fill:#02d365;fill-rule:nonzero",transform:"translate(2)"}),s("path",{d:"M8.4 8.4H4.8V12a3.6 3.6 0 0 1 3.6-3.6ZM12 4.8H8.4a3.6 3.6 0 0 0-3.6 3.6h3.6A3.6 3.6 0 0 0 12 4.8Z",style:"fill:#333",transform:"translate(2)"}),s("path",{d:"M4 4v4c0-1.061.421-2.078 1.171-2.829A4.003 4.003 0 0 1 8 4a4.006 4.006 0 0 0 3.695-2.469A4.006 4.006 0 0 0 12 0H8a4 4 0 0 0-4 4Z",style:"fill:#333",transform:"translate(2)"}))),check:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-74.05-527.28l-4.243-4.243a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l3.536,3.536,8.486-8.486a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.415l-9.193,9.192a1,1,0,0,1-.707.293A1,1,0,0,1-74.05-527.28Z",transform:"translate(79 540.594)"}))),down:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-77.757-523.514a1,1,0,0,1,0-1.414l5.657-5.657-5.657-5.657a1,1,0,0,1,0-1.415,1,1,0,0,1,1.415,0l6.364,6.364a1,1,0,0,1,.293.707,1,1,0,0,1-.293.707l-6.364,6.364a1,1,0,0,1-.707.293A1,1,0,0,1-77.757-523.514Z",transform:"translate(-522.439 81.898) rotate(90)"}))),up:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M.293.293a1,1,0,0,0,0,1.414L5.949,7.364.293,13.021a1,1,0,0,0,1.415,1.415L8.072,8.072a1,1,0,0,0,0-1.415L1.708.293a1,1,0,0,0-1.415,0Z",transform:"translate(0.782 12.212) rotate(-90)"}))),left:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-69.979-523.514a1,1,0,0,0,0-1.414l-5.657-5.657,5.657-5.657a1,1,0,0,0,0-1.415,1,1,0,0,0-1.415,0l-6.364,6.364a1,1,0,0,0-.293.707,1,1,0,0,0,.293.707l6.364,6.364a1,1,0,0,0,.707.293A1,1,0,0,0-69.979-523.514Z",transform:"translate(82.014 538.615)"}))),right:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-77.757-523.514a1,1,0,0,1,0-1.414l5.657-5.657-5.657-5.657a1,1,0,0,1,0-1.415,1,1,0,0,1,1.415,0l6.364,6.364a1,1,0,0,1,.293.707,1,1,0,0,1-.293.707l-6.364,6.364a1,1,0,0,1-.707.293A1,1,0,0,1-77.757-523.514Z",transform:"translate(82.014 538.615)"}))),alert:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-3363.46-72.913h-10.972a2.478,2.478,0,0,1-2.2-1.3,2.48,2.48,0,0,1,.075-2.55l5.487-8.7a2.5,2.5,0,0,1,2.122-1.17,2.5,2.5,0,0,1,2.122,1.17l5.486,8.7a2.477,2.477,0,0,1,.075,2.55A2.477,2.477,0,0,1-3363.46-72.913Zm-5.486-6.591a.933.933,0,0,0-.932.932v2.485a.933.933,0,0,0,.932.932.933.933,0,0,0,.932-.932v-2.485a.933.933,0,0,0-.936-.928Zm0-3.106a.933.933,0,0,0-.932.932.933.933,0,0,0,.932.932.933.933,0,0,0,.932-.932.932.932,0,0,0-.275-.66.933.933,0,0,0-.661-.272Z",transform:"translate(3376.948 87.773)"}))),closed:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-60.443-518.378l-4.243-4.243-4.243,4.243a1,1,0,0,1-1.414,0,1,1,0,0,1,0-1.414l4.243-4.243-4.243-4.243a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l4.243,4.243,4.243-4.243a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.414l-4.243,4.243,4.243,4.243a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-60.443-518.378Z",transform:"translate(72.636 531.984)"}))),avatar:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-29.9,246.564A6.006,6.006,0,0,1-31.918,243h11.835a6,6,0,0,1-2.022,3.564A6,6,0,0,1-26,248,6,6,0,0,1-29.9,246.564ZM-22,236a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1-22,236Zm-12,0a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1-34,236Z",transform:"translate(34 -233)"}))),menu:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-34,246a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z",transform:"translate(35 -232)"}))),lock:m(s("svg",{viewBox:"0 0 16 16"},s("g",{transform:"translate(-280 -1823)"},s("path",{d:"M-34,250a1,1,0,0,1-1-1v-8a1,1,0,0,1,1-1h2v-2a4,4,0,0,1,4-4,4,4,0,0,1,4,4v2h2a1,1,0,0,1,1,1v8a1,1,0,0,1-1,1Zm4-6a2.009,2.009,0,0,0,1,1.732V247a1,1,0,0,0,1,1,1,1,0,0,0,1-1v-1.268A2.005,2.005,0,0,0-26,244a2,2,0,0,0-2-2A2,2,0,0,0-30,244Zm4-4v-2a2,2,0,0,0-2-2,2,2,0,0,0-2,2v2Z",transform:"translate(316 1589)"})))),video:m(s("svg",{viewBox:"0 0 16 16"},s("g",{transform:"translate(-208 -1856)"},s("path",{d:"M-17,248a1,1,0,0,1-1-1V235a1,1,0,0,1,1-1H-3a1,1,0,0,1,1,1v12a1,1,0,0,1-1,1Zm13-2V236H-16v10Z",transform:"translate(226 1623)"}),s("path",{d:"M2.636,1.481a1,1,0,0,1,1.728,0L6.123,4.5A1,1,0,0,1,5.259,6H1.741A1,1,0,0,1,.877,4.5Z",transform:"translate(219.5 1860.5) rotate(90)"})))),image:m(s("svg",{viewBox:"0 0 16 16"},s("g",{transform:"translate(-208 -1856)"},s("path",{d:"M-14.1,245a1,1,0,0,1-.823-1.566l3.6-5.235a1,1,0,0,1,1.648,0l3.6,5.235A1,1,0,0,1-6.9,245Zm-2.9-9.5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-17,235.5Z",transform:"translate(229 1626)",opacity:"0.75"}),s("path",{d:"M-10.164,242H-15a.994.994,0,0,1-.894-.553A1,1,0,0,1-15.8,240.4l2.5-3.334a.993.993,0,0,1,.8-.4.991.991,0,0,1,.8.4l1.613,2.151-.836,1.216a.985.985,0,0,0-.061,1.033.977.977,0,0,0,.82.532Z",transform:"translate(225 1629)",opacity:"0.5"}),s("path",{d:"M-17,248a1,1,0,0,1-1-1V235a1,1,0,0,1,1-1H-3a1,1,0,0,1,1,1v12a1,1,0,0,1-1,1Zm13-2V236H-16v10Z",transform:"translate(226 1623)"})))),audio:m(s("svg",{viewBox:"0 0 16 16"},s("g",{transform:"translate(-208 -1856)"},s("rect",{width:"4",height:"9",rx:"2",transform:"translate(214 1857)"}),s("path",{d:"M-13,241v-1.1a5.009,5.009,0,0,1-4-4.9,1,1,0,0,1,1-1,1,1,0,0,1,1,1c0,.012,0,.023,0,.034a2.985,2.985,0,0,0,.88,2.086A2.98,2.98,0,0,0-12,238a3,3,0,0,0,3-3,1,1,0,0,1,1-1,1,1,0,0,1,1,1,5.008,5.008,0,0,1-4,4.9V241a1,1,0,0,1-1,1A1,1,0,0,1-13,241Z",transform:"translate(228 1629)",opacity:"0.75"})))),config:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-72-524.8c-.1,0-.2,0-.3-.008a8.585,8.585,0,0,0-2.2-1.716,8.73,8.73,0,0,0-2.553-1.041,6.022,6.022,0,0,1-.319-.564A8.732,8.732,0,0,0-77-530.852a8.727,8.727,0,0,0-.372-2.724,6.026,6.026,0,0,1,.319-.564,8.694,8.694,0,0,0,2.553-1.042,8.6,8.6,0,0,0,2.2-1.715c.1-.005.2-.008.3-.008s.2,0,.3.007a8.587,8.587,0,0,0,2.2,1.715,8.692,8.692,0,0,0,2.553,1.042,6.025,6.025,0,0,1,.32.564A8.716,8.716,0,0,0-67-530.852a8.734,8.734,0,0,0,.372,2.726,6.024,6.024,0,0,1-.32.564,8.7,8.7,0,0,0-2.553,1.041,8.6,8.6,0,0,0-2.2,1.716C-71.8-524.8-71.9-524.8-72-524.8Zm0-8.054a2,2,0,0,0-2,2,2,2,0,0,0,2,2,2,2,0,0,0,2-2A2,2,0,0,0-72-532.851Z",transform:"translate(80 538.851)"}))),options:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M2 10.5A1.503 1.503 0 0 1 3.5 12 1.503 1.503 0 0 1 2 13.5 1.503 1.503 0 0 1 .5 12 1.503 1.503 0 0 1 2 10.5Zm0-5A1.503 1.503 0 0 1 3.5 7 1.503 1.503 0 0 1 2 8.5 1.503 1.503 0 0 1 .5 7 1.503 1.503 0 0 1 2 5.5Zm0-5A1.503 1.503 0 0 1 3.5 2 1.503 1.503 0 0 1 2 3.5 1.503 1.503 0 0 1 .5 2 1.503 1.503 0 0 1 2 .5Z",transform:"translate(6 1)"}))),copy:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-75-525a1,1,0,0,1-1-1v-8a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v8a1,1,0,0,1-1,1Zm1-2h6v-6h-6Zm-5-2v-8a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-7v7a1,1,0,0,1-1,1A1,1,0,0,1-79-529Z",transform:"translate(81 540)"}))),dash:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M1,0H13a1,1,0,0,1,0,2H1A1,1,0,0,1,1,0Z",transform:"translate(1 6.952)"}))),plus:m(s("svg",{viewBox:"0 0 16 16.001"},s("path",{d:"M-2032.95,115.051v-6h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6v-6a1,1,0,0,1,1-1,1,1,0,0,1,1,1v6h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-2032.95,115.051Z",transform:"translate(116.051 2039.95) rotate(90)"}))),asterisk:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-74.3-527v-3.267l-2.83,1.634A1,1,0,0,1-78.5-529a1,1,0,0,1,.365-1.366L-75.3-532l-2.83-1.634A1,1,0,0,1-78.5-535a1,1,0,0,1,1.366-.365l2.83,1.634V-537a1,1,0,0,1,1-1,1,1,0,0,1,1,1v3.268l2.83-1.633a1,1,0,0,1,1.366.365,1,1,0,0,1-.366,1.366L-71.3-532l2.83,1.634A1,1,0,0,1-68.107-529a1,1,0,0,1-1.366.366l-2.83-1.634V-527a1,1,0,0,1-1,1A1,1,0,0,1-74.3-527Z",transform:"translate(81.634 540)"}))),eye:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-76-532a3,3,0,0,1-3-3,3,3,0,0,1,3-3,3,3,0,0,1,3,3A3,3,0,0,1-76-532Zm0-4a1,1,0,0,0-1,1,1,1,0,0,0,1,1,1,1,0,0,0,1-1A1,1,0,0,0-76-536Z",transform:"translate(84 542.348)"}),s("path",{d:"M-71-528a9.152,9.152,0,0,1-5.657-2.5A16.432,16.432,0,0,1-79-533l0-.006a16.341,16.341,0,0,1,2.339-2.494A9.152,9.152,0,0,1-71-538a9.152,9.152,0,0,1,5.657,2.5A16.258,16.258,0,0,1-63-533l0,.007a16.364,16.364,0,0,1-2.339,2.493A9.152,9.152,0,0,1-71-528Zm0-7.992c-2.912,0-5.314,2.963-5.338,2.992.023.029,2.43,2.992,5.338,2.992s5.314-2.962,5.338-2.992C-65.685-533.029-68.091-535.992-71-535.992Z",transform:"translate(79 541)"}))),search:m(s("svg",{viewBox:"0 0 15.586 15.586"},s("path",{d:"M-65.121-522.707l-3.535-3.535-.011-.011A6.465,6.465,0,0,1-72.5-525a6.507,6.507,0,0,1-6.5-6.5,6.507,6.507,0,0,1,6.5-6.5,6.507,6.507,0,0,1,6.5,6.5,6.465,6.465,0,0,1-1.253,3.833l.011.011,3.535,3.535a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-65.121-522.707ZM-77-531.5a4.505,4.505,0,0,0,4.5,4.5,4.505,4.505,0,0,0,4.5-4.5,4.505,4.505,0,0,0-4.5-4.5A4.505,4.505,0,0,0-77-531.5Z",transform:"translate(79 538)"}))),file:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-72-531h-6a1,1,0,0,1-1-1v-6h1l6,6v1Z",transform:"translate(86 538.5)"}),s("path",{d:"M-69-523h-8a2,2,0,0,1-2-2v-11a2,2,0,0,1,2-2h3v2h-2.5a.5.5,0,0,0-.5.5v10a.5.5,0,0,0,.5.5h7a.5.5,0,0,0,.5-.5V-531h2v6A2,2,0,0,1-69-523Zm.054-15h-1.72L-69-538h.054Z",transform:"translate(81 538.499)",opacity:"0.75"}))),drag:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M-74-526.5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-74-526.5Zm-5,0a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-79-526.5Zm5-5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-74-531.5Zm-5,0a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-79-531.5Zm5-5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-74-536.5Zm-5,0a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-79-536.5Z",transform:"translate(83 539.5)"}))),home:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M3.341 15.384a1.4 1.4 0 0 1-1.361-1.431V7.39a1.468 1.468 0 0 1 .4-1.012l4.76-5.01c.261-.243.606-.375.962-.368.354.003.696.134.962.368l4.759 5.01c.258.273.402.636.4 1.012v6.562a1.398 1.398 0 0 1-1.36 1.432H3.341Zm.64-7.788v5.788h8.24V7.596L8.1 3.26 3.981 7.596Z",transform:"translate(-.102 -.192)"}),s("path",{opacity:"0.75",d:"M6.746 8.4h2.709v4.993H6.746z",transform:"translate(-.102 -.192)"}))),love:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"m8 12.745 5.258-5.737a3.035 3.035 0 0 0 0-3.975 2.078 2.078 0 0 0-2.459-.541 2.078 2.078 0 0 0-.712.541L8 5.309 5.914 3.033a2.078 2.078 0 0 0-3.172 0 3.037 3.037 0 0 0 0 3.976L8 12.746v-.001Zm0 2.961L1.268 8.36a5.028 5.028 0 0 1 0-6.678A4.085 4.085 0 0 1 4.328.3a4.07 4.07 0 0 1 3.06 1.382L8 2.35l.612-.668A4.085 4.085 0 0 1 11.672.3a4.07 4.07 0 0 1 3.06 1.382 5.032 5.032 0 0 1 0 6.678L8 15.706Z",transform:"translate(0 -.003)"}))),clock:m(s("svg",{viewBox:"0 0 16 16",style:"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"},s("path",{d:"M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Zm6-8a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z"}),s("path",{d:"M9 4a1 1 0 0 0-2 0v4a1 1 0 0 0 2 0V4Z"}),s("path",{d:"M10.64 9.724a1 1 0 0 0 .517-1.932l-2.898-.776a.998.998 0 1 0-.517 1.931l2.898.777Z",opacity:"0.75"}))),profile:m(s("svg",{viewBox:"0 0 16 16",style:"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"},s("path",{d:"M5.72 8.45C6.403 8.802 7.179 9 8 9v1-1c.821 0 1.597-.198 2.28-.55A6.003 6.003 0 0 1 14 14v.73A1.27 1.27 0 0 1 12.73 16H3.27A1.27 1.27 0 0 1 2 14.73V14a6.003 6.003 0 0 1 3.72-5.55ZM12 14H4c0-1.061.421-2.078 1.172-2.828a3.995 3.995 0 0 1 5.656 0A3.995 3.995 0 0 1 12 14ZM8 0c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4Zm0 2a2 2 0 1 1-.001 4.001A2 2 0 0 1 8 2Z"}))),dragX:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M3.088 7.34.132 4.315A.45.45 0 0 1 0 4c0-.117.047-.229.132-.316L3.088.659a.528.528 0 0 1 .266-.145.573.573 0 0 1 .31.017.518.518 0 0 1 .243.174A.439.439 0 0 1 4 .974v6.051a.454.454 0 0 1-.153.336.55.55 0 0 1-.369.139.537.537 0 0 1-.39-.16ZM6.912.66l2.956 3.025A.45.45 0 0 1 10 4a.451.451 0 0 1-.132.316L6.912 7.341a.528.528 0 0 1-.266.145.573.573 0 0 1-.31-.017.518.518 0 0 1-.243-.174A.439.439 0 0 1 6 7.026V.975c0-.126.055-.247.153-.336A.55.55 0 0 1 6.522.5a.537.537 0 0 1 .39.16Z",transform:"translate(3 4)"}))),dragXToLeft:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"M3.088 7.34.132 4.315A.45.45 0 0 1 0 4c0-.117.047-.229.132-.316L3.088.659a.528.528 0 0 1 .266-.145.573.573 0 0 1 .31.017.518.518 0 0 1 .243.174A.439.439 0 0 1 4 .974v6.051a.454.454 0 0 1-.153.336.55.55 0 0 1-.369.139.537.537 0 0 1-.39-.16Z",transform:"translate(3 4)"}))),dragXToRight:m(s("svg",{viewBox:"0 0 16 16"},s("path",{d:"m6.912.66 2.956 3.025A.45.45 0 0 1 10 4a.451.451 0 0 1-.132.316L6.912 7.341a.528.528 0 0 1-.266.145.573.573 0 0 1-.31-.017.518.518 0 0 1-.243-.174A.439.439 0 0 1 6 7.026V.975c0-.126.055-.247.153-.336A.55.55 0 0 1 6.522.5a.537.537 0 0 1 .39.16Z",transform:"translate(3 4)"})))};function Nt({type:t,size:e,status:o}){const{current:{constructor:r}}=L(),n=r[t];return s("host",{shadowDom:!0},s(n,{cloneNode:!0}),s("style",null,e&&`:host{--width: var(--size-${e});}`,o&&`:host{--color-status: var(--color-status-${o});}`))}Nt.props={type:{type:String,reflect:!0,value:()=>"check"},size:{type:String,reflect:!0,value:"xs"},define:{type:String,reflect:!0},status:{type:String,reflect:!0}};Nt.styles=[C,x`
        :host {
            width: var(--width);
            display: inline-flex;
            align-items: center;
            justify-items: center;
        }
        svg {
            width: 100%;
            margin: auto;
        }
        path {
            fill: var(
                --color-status,
                var(--color-current-contrast, currentColor)
            );
        }
        :host([define]) {
            display: none;
        }
    `];var T=Object.assign(w(Nt),eo);S.define("icon",T);var Y={name:{type:String,reflect:!0},required:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0},value:null,size:{type:String,reflect:!0},focused:{type:Boolean,reflect:!0},focusable:{type:Boolean,reflect:!0,value:!0}};function ro({pageX:t,pageY:e,currentTarget:o}){const r=o.getBoundingClientRect();return{x:t,y:e,offset:{x:t-r.left,y:e-r.top}}}function je(){const[t,e]=_();return s("host",{shadowDom:!0,setEvent:o=>{const{offset:r}=ro(o);e(n=>n?.pending?n:{offset:r,pending:!0})}},s("div",{style:t?.offset?`--x:${t?.offset?.x}px; --y:${t?.offset?.y}px`:"",class:t?.pending?"show":"",onanimationend:()=>e({})}))}je.styles=x`
    :host {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        display: block;
        overflow: hidden;
        --background: rgba(0, 0, 0, 0.05);
    }
    div {
        width: 10px;
        height: 10px;
        position: absolute;
        top: calc(var(--y) - 5px);
        left: calc(var(--x) - 5px);
        opacity: 0;
        background: var(--background);
        border-radius: 100%;
    }
    .show {
        transform: scale(2);
        opacity: 1;
        animation: scale 0.5s ease 1;
    }
    @keyframes scale {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(10);
            opacity: 0;
        }
    }
`;var _e=w(je);S.define("button-active",_e);const oo=s("host");function pe(t){return t&&typeof t=="object"?(t=t.type=="host"?t:s("host",null,t),t):oo}function X(t,e){const o=L();o.id=o.id||Symbol(),Ct(()=>et(pe(t()),o.current,o.id),e),N(()=>()=>et(pe(),o.current,o.id),[])}function He(t,e){const o=no(e);return Ct(()=>({current:o.find(r=>r.matches&&r.matches(t))}),[t])}function no(t){const e=L();return Ct(()=>{const o=[];let{current:r}=e;for(;r=r.parentNode||t&&r.host;)o.push(r);return o},[t])}function io(t,e,o){const r=Tt(e);N(()=>{if(!t.current)return;const n=new MutationObserver(i=>r.current(i));return n.observe(t.current,o),()=>n.disconnect()},[t,t?.current])}const fe=t=>t.hasAttribute("disabled");function O(t="fieldset"){const e=He(t),[o,r]=A("disabled");return io(e,n=>n.filter(i=>i.attributeName=="disabled").map(i=>{r(fe(i.target))}),{attributes:!0}),ht(()=>{const{current:n}=e;n&&r(fe(n))},[]),o}const so=(t,e,o)=>{const{currentTarget:r}=e,{shadowRoot:n}=r,i=e.composedPath();if(i.includes(t))return;const a=i.indexOf(r),l=i.slice(0,a).find(c=>c instanceof ShadowRoot);!o&&l!==n||(e.preventDefault(),e.stopImmediatePropagation(),t.dispatchEvent(new e.constructor(e.type,e)))};function J(t,e,o,{capture:r=!0,composed:n=!0}={}){E(t,o,i=>{const{current:a}=e;a&&so(a,i,n)},{capture:r})}var yt=t=>t?1:0;function Ot({type:t,name:e,value:o,href:r,tabIndex:n,justify:i,color:a}){const l=g(),c=g(),u=g(),d=g(),h=g(),p=g(),f=M(c),v=M(u),b=M(d).filter(z=>z instanceof Text?z.textContent?.trim():!0),k=O(),[,y]=A("active");return X(()=>r?s("a",{slot:"button",tabindex:"-1",href:r,ref:h}):s("button",{type:t||"submit",name:e,value:o,ref:h,slot:"button",tabindex:"-1",disabled:k}),[t,e,o,r]),J(p,h,"click"),s("host",{shadowDom:!0,shape:f.length&&!b.length?"square":null,ref:p,onclick:z=>{l.current?.setEvent&&l.current.setEvent(z)}},s("button",{disabled:k,tabIndex:n,class:"button",onmousedown:()=>y(!0),onmouseup:()=>y(!1),style:i?`--justify:${i}`:""},s("div",{class:"button-bg"},s("slot",{name:"background"},s(_e,{class:"button-fx",ref:l}))),s("div",{class:"button-row",style:`--columns:${yt(v.length)+yt(f.length)+yt(b.length)}`},s("slot",{ref:c,name:"prefix"}),s("slot",{ref:d}),s("slot",{ref:u,name:"suffix"}))),s("style",null,a&&`
                    :host{
                        --color-button-60: var(--color-${a}-60) !important;
                        --color-button-30: var(--color-${a}-30) !important;
                        --color-button-10: var(--color-${a}-10) !important;
                    }
                `))}Ot.props={...Y,ghost:{type:Boolean,reflect:!0},active:{type:Boolean,reflect:!0},type:{type:String,reflect:!0,value:"submit"},justify:{type:String,reflect:!0},status:{type:String,reflect:!0},shape:{type:String,reflect:!0},href:{type:String,reflect:!0},rounded:{type:Boolean,reflect:!0},tabIndex:{type:Number,value:0},color:{type:String,reflect:!0}};Ot.styles=[C,x`
        :host {
            --width: auto;
            --min-width: auto;
            --padding: 0 var(--size-s);
            --justify: center;
            width: var(--width);
            display: inline-flex;
            min-height: var(--size-xl);
            color: var(--color-button-10);
        }

        :host([disabled]) {
            opacity: var(--input-opacity-disabled);
            pointer-events: none;
        }

        :host([rounded]) {
            --border-radius: 100px;
        }

        :host([shape="square"]) {
            --padding: 0;
            --width: var(--size-xl);
        }

        :host([ghost]:not([color])) {
            --color-button-60: transparent;
        }

        :host([justify]) {
            --width: 100%;
            --min-width: 100%;
        }

        .button {
            width: var(--width);
            min-width: var(--min-width);
            border-radius: var(--border-radius);
            padding: var(--padding);
            box-sizing: border-box;
            font: unset;
            border: none;
            position: relative;
            background: none;
            cursor: pointer;
            color: unset;
        }
        .button-row {
            display: grid;
            place-content: center var(--justify);
            grid-template-columns: repeat(var(--columns), auto);
            gap: var(--size-xs);
            position: relative;
            z-index: 1;
            min-height: 100%;
        }
        .button-bg {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border: var(--button-border);
            border-radius: var(--border-radius);
            box-sizing: border-box;
            transition: var(--transition-action);
            background: var(--color-button-60);
        }
        .button-fx {
            border-radius: var(--border-radius);
        }
    `];var Z=w(Ot);S.define("button",Z);function It({multiple:t,accept:e}){const o=g(),r=g(),n=g(),[i]=M(n),[a,l]=A("files"),c=O();return X(()=>s("input",{slot:"input",type:"file",ref:o,multiple:t,disabled:c,accept:e,onchange:u=>{if(u.currentTarget.files?.length){const d=Array.from(u.currentTarget.files);l(d)}}})),J(r,o,"click"),s("host",{shadowDom:!0},s("slot",{name:"preview",ref:n,class:"hidden"}),s("div",{class:"input"},s("div",{class:"input-file-header"},s("div",{class:"input-file-item",ref:r},s("div",null,s("slot",null)),s(Z,{size:"small",ghost:!0},s(T,{slot:"prefix",type:"plus"})),!!a?.length&&s("div",{class:"input-line"},s("div",{class:"input-line-fill"})))),a?.map(u=>s("div",{class:"input-file-row"},s("div",{class:"input-file-item"},s("span",{class:"input-file-name"},u.name),s(Z,{size:"small",ghost:!0,onclick:()=>{const d=new DataTransfer;a.filter(h=>h!=u).map(h=>d.items.add(h)),o.current.files=d.files,l(Array.from(d.files))}},s(T,{slot:"prefix",type:"closed"}))),i&&s(i,{cloneNode:!0,file:u})))))}It.props={...Y,files:{type:Array,value:()=>[]},accept:String,multiple:{type:Boolean,reflect:!0}};It.styles=[pt,x`
        .input {
            padding: 0;
            overflow: hidden;
        }

        .input-file-header,
        .input-file-row .input-file-item {
            padding: 0 var(--space-x);
        }

        .input-file-item {
            min-height: var(--size-xl);
            display: grid;
            grid-template-columns: auto auto;
            place-content: center space-between;
            position: relative;
        }
    `];var ao=w(It);S.define("input-file",ao);function lo(){return He("form")}function St(t,e,o){E(lo(),t,e,o)}function co(t){const e=g(),[o,r]=A("checked"),[n]=A("name");return St("change",({currentTarget:i,target:a})=>{if(!(a instanceof HTMLInputElement))return;const l=i.elements[n];l instanceof RadioNodeList&&[...l].forEach(c=>{c.checked=a===c}),r(a===e.current)}),St("reset",()=>r(!1)),X(()=>({...t,props:{...t.props,ref:e,type:"radio",name:n,checked:o}})),E(e,"change",i=>{r(i.target.checked)}),N(()=>{r(e.current.checked)},[]),e}function Fe(t){const[e]=A("name"),[o]=A("value"),[r,n]=A("checked"),i=g();return St("reset",()=>n(!1)),X(()=>s("input",{type:t,name:e,value:o,ref:i,checked:r,onchange:({currentTarget:{checked:a}})=>n(a)}),[r,e,t]),i}function jt({tabIndex:t}){const e=L(),o=Fe("checkbox"),r=O();return J(e,o,"click"),s("host",{shadowDom:!0},s("button",{class:"checkbox",disabled:r,tabIndex:r?-1:t},s("div",{class:"checkbox-state"},s(T,{type:"check"}))))}jt.props={...Y,value:{type:null,value:"on"},tabIndex:{type:Number},checked:{type:Boolean,reflect:!0},id:String};jt.styles=[C,x`
        :host {
            --color-input-30: var(--color-input-10);
            ---state-opacity: 0;
            ---state-size: 100%;
            cursor: pointer;
        }

        :host([disabled]) {
            opacity: var(--opacity-disabled);
            pointer-events: none;
        }

        :host([checked]) {
            ---state-opacity: 1;
        }

        .checkbox {
            width: var(--size-m);
            height: var(--size-m);
            padding: 0;
            background: var(--color-input-60);
            border-radius: var(--border-radius);
            border: var(--input-border);
            overflow: hidden;
            cursor: unset;
            font: unset;
            display: flex;
        }

        .checkbox-state {
            width: var(---state-size);
            height: var(---state-size);
            background: var(--color-input-10);
            opacity: var(---state-opacity);
            margin: auto;
            border-radius: var(---state-radius);
            transform: var(---state-transform);
            display: flex;
            place-content: center;
        }

        .checkbox-state * {
            color: var(--color-input-60);
        }

        .checkbox,
        .checkbox-state {
            transition: var(--transition-action);
        }
    `];var _t=w(jt);S.define("input-checkbox",_t);function We({value:t}){const e=L(),o=O(),r=co(s("input",{value:t}));return J(e,r,"click"),s("host",{shadowDom:!0},s("button",{class:"checkbox",disabled:o},s("div",{class:"checkbox-state"})))}We.styles=x`
    :host {
        --border-radius: 100%;
        ---state-size: var(--size-s);
        ---state-radius: 100%;
    }
`;var uo=w(We,_t);S.define("input-radio",uo);function Ht({name:t,placeholder:e}){const o=g(),r=M(o),n=O(),i=$t(),[a,l]=A("value"),[,c]=A("focused");return X(()=>s("select",{slot:"input",class:"reset",name:t,disabled:n,onchange:({currentTarget:{value:u}})=>l(u),onfocus:()=>c(!0),onblur:()=>c(!1)},e&&s("option",{value:"",disabled:!0,selected:!0},e),r.map(function u(d){return d?.options?.length?s("optgroup",{label:d.label},d?.options.map(u)):s("option",{value:d.value,selected:a===d.value||d.selected},d.label||d.value)}))),s("host",{shadowDom:!0,onOptionChange:i},s("slot",{name:"option",ref:o}),s("div",{class:"input"},s("slot",{name:"input"}),s("div",{class:"input-space"},s("div",{className:"input-row"},s(T,{type:"down"}),s("div",{class:"input-line"},s("div",{class:"input-line-fill"}))))))}Ht.props={...Y,placeholder:String,narrow:{type:Boolean,reflect:!0},ghost:{type:Boolean,reflect:!0}};Ht.styles=[pt,x`
        ::slotted([slot="input"]) {
            height: var(--size-xl);
            position: relative;
            padding: 0 calc(var(--space-x) + var(--size-xxs) + var(--size-xs)) 0
                var(--space-x);
            appearance: none;
            z-index: 1;
        }
        .input-space {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            padding: 0 var(--size-s);
            box-sizing: border-box;
            z-index: 0;
        }
        .input-row {
            justify-content: end;
        }
        .input {
            padding: 0;
        }
    `];var ho=w(Ht);S.define("input-select",ho);function qe(){const t=g(),e=M(t);return s("host",{shadowDom:!0,options:e},s("slot",{ref:t,name:"option"}))}var wt={type:"OptionChange",bubbles:!0};qe.props={slot:{type:String,reflect:!0,value:"option"},value:{type:String,event:wt},label:{type:String,event:wt},options:{type:Array,event:wt},selected:Boolean};var po=w(qe);S.define("input-select-option",po);function Ye(){const t=L(),e=Fe("checkbox"),o=O();return J(t,e,"click"),s("host",{shadowDom:!0},s("button",{class:"checkbox",disabled:o},s("div",{class:"checkbox-state"},s("slot",{name:"icon"}))))}Ye.styles=x`
    :host {
        --border-radius: 100px;
        ---state-opacity: 0.25;
        ---width: calc((var(--size-s) * 2) + (var(--size-m) - var(--size-s)));
        ---state-size: var(--size-s);
        ---state-radius: 100%;
        ---state-transform: translateX(-50%);
    }
    :host([checked]) {
        ---state-transform: translateX(50%);
    }
    .checkbox {
        width: var(---width);
    }
`;var fo=w(Ye,_t);S.define("input-switch",fo);function Ft(t){const[e,o]=A("value"),[,r]=A("focused");X(()=>s("input",{type:"text",slot:"input",maxLength:t.maxLength,minLength:t.minLength,required:t.required,value:t.value,name:t.name}));const n=O();return s("host",{shadowDom:!0},s("div",{class:"input"},s("div",{class:"input-content input-proxy",textContent:(e||"").split(/(\n)/).map(i=>i===`
`?`${i} `:i).join("")}),s("slot",{name:"input"}),s("textarea",{value:t.value,rows:t.rows,cols:t.cols,placeholder:t.placeholder,onfocus:()=>r(!0),onblur:()=>r(!1),maxLength:t.maxLength,minLength:t.minLength,class:"input-content input-layer",oninput:({currentTarget:i})=>o(i.value),onkeydown:i=>n&&i.preventDefault()}),s("div",{class:"input-group"},s("div",{class:"input-line"},s("div",{class:"input-line-fill"})))))}Ft.props={...Y,cols:Number,placeholder:{type:String,reflect:!0},minLength:Number,maxLength:Number,rows:{type:Number,value:1}};Ft.styles=[pt,x`
        :host {
            --resize: vertical;
            --space-top: 0.25em;
            min-width: 100%;
        }
        :host([size="small"]) {
            --space-top: 0;
        }
        .input-content {
            overflow: hidden;
            grid-gap: 0;
            padding-top: var(--space-top);
        }

        .input-proxy {
            opacity: 0;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .input-content {
            width: 100%;
            background: none;
            border: none;
            font: unset;
            resize: var(--resize);
            box-sizing: border-box;
            margin: 0px;
            outline: none;
        }

        .input-layer {
            position: absolute;
            height: 100%;
            top: 0;
            left: 0;
            min-height: 100%;
            max-height: 100%;
            z-index: 1;
            padding-left: var(--space-x);
            padding-right: var(--space-x);
        }

        .input-group {
            width: 100%;
            position: bottom;
            padding: 0 var(--space-x);
            box-sizing: border-box;
            bottom: 0;
            left: 0;
            position: absolute;
        }

        .input-line {
            position: relative;
        }

        ::slotted([slot="input"]) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            border: none;
        }
    `];var vo=w(Ft);S.define("textarea",vo);let W=(...t)=>t.filter(e=>e).join(" ");var bo={current:null};function Wt({disableReflect:t}){const e=g(),o=g(),r=g(),n=g(),i=g(),a=M(e),l=M(o),c=M(n),u=Tt(l[0]);return J(r,t?bo:u,"click"),s("host",{shadowDom:!0},s("div",{className:"label-header"},s("div",{class:"label-row"},s("div",{class:`label-center label-prefix ${a.length?"":"hidden"}`},s("slot",{ref:e,name:"prefix"})),s("div",{ref:r,class:"label-center label-content"},s("slot",null))),s("div",{ref:i,class:W("label-center label-action",!l.length&&"hidden")},s("slot",{ref:o,name:"action"})),s("style",null,`:host{--columns-row: ${W(a.length&&"auto","1fr")}`)),s("div",{class:W("label-footer",!c.length&&"hidden")},s("slot",{name:"message",ref:n})))}Wt.props={disableReflect:{type:Boolean},reverse:{type:Boolean,reflect:!0},vertical:{type:Boolean,reflect:!0}};Wt.styles=[C,x`
        :host {
            width: 100%;
            display: grid;
            --columns: 1fr auto;
            --gap: var(--size-xs);
            min-height: var(--size-xl);
            box-sizing: border-box;
        }

        :host,
        .label-header,
        .label-row {
            display: grid;
            grid-gap: var(--gap);
        }

        .label-header {
            grid-template-columns: var(--columns);
            min-height: var(--size-min);
        }

        .label-row {
            grid-template-columns: var(--columns-row);
        }

        .label-center {
            display: flex;
            align-items: center;
            min-height: var(--size-min);
        }

        .label-prefix,
        .label-action {
            max-height: var(--size-min);
        }

        :host([reverse]) .label-action {
            order: -1;
        }

        :host([reverse]) .label-prefix {
            order: 1;
        }

        .hidden {
            display: none;
        }

        ::slotted([slot="action"]) {
            cursor: pointer;
        }
        :host([vertical]) {
            --columns: 1fr;
            --gap: var(--space-y);
        }
    `];var mo=w(Wt);S.define("label",mo);function qt({width:t,color1:e,color2:o,contrast:r}){return e=r?"#fff":e,s("host",{shadowDom:!0},s("svg",{viewBox:"0 0  220 70.841",width:t},s("path",{d:"M61.111 70.841a15.678 15.678 0 0 1-7.859-1.994 14.053 14.053 0 0 1-5.515-5.538 16.957 16.957 0 0 1-1.969-8.308 16.977 16.977 0 0 1 2.02-8.31 15.235 15.235 0 0 1 5.624-5.594 16.449 16.449 0 0 1 7.917-1.938 16.449 16.449 0 0 1 7.917 1.938 14.842 14.842 0 0 1 5.624 5.594 16.4 16.4 0 0 1 2.02 8.307 16.423 16.423 0 0 1-2.075 8.307 14.822 14.822 0 0 1-5.678 5.538 16.3 16.3 0 0 1-8.026 1.998Zm0-6.757a7.762 7.762 0 0 0 3.931-1.052 7.058 7.058 0 0 0 2.894-3.046 10.808 10.808 0 0 0 1.092-4.984 9.572 9.572 0 0 0-2.239-6.757 7.529 7.529 0 0 0-5.569-2.326 7.206 7.206 0 0 0-5.46 2.326 9.572 9.572 0 0 0-2.239 6.757c0 2.935.71 5.151 2.184 6.7a6.874 6.874 0 0 0 5.406 2.382ZM90.158 44.423a11.2 11.2 0 0 1 3.877-3.821 10.356 10.356 0 0 1 5.405-1.385v8.141h-2.02c-2.4 0-4.2.554-5.405 1.717-1.256 1.163-1.856 3.157-1.856 5.981v15.286h-7.645V39.66h7.644ZM142.138 39.217a12.268 12.268 0 0 1 9.009 3.434c2.239 2.326 3.385 5.538 3.385 9.692v18h-7.648V53.395a7.838 7.838 0 0 0-1.8-5.538 6.413 6.413 0 0 0-4.914-1.883 6.619 6.619 0 0 0-4.969 1.883 7.838 7.838 0 0 0-1.8 5.538v16.947h-7.643V53.395a7.838 7.838 0 0 0-1.8-5.538 6.413 6.413 0 0 0-4.914-1.883 6.457 6.457 0 0 0-4.969 1.883 7.614 7.614 0 0 0-1.856 5.538v16.947h-7.646V39.66h7.644v3.711a10.009 10.009 0 0 1 3.822-3.046 11.783 11.783 0 0 1 5.078-1.108 13.226 13.226 0 0 1 6.334 1.5 11.006 11.006 0 0 1 4.313 4.373 10.745 10.745 0 0 1 4.313-4.264 12.107 12.107 0 0 1 6.061-1.609ZM165.672 36.006a4.45 4.45 0 0 1-3.331-1.329 4.144 4.144 0 0 1-1.365-3.212 4.144 4.144 0 0 1 1.365-3.212 4.45 4.45 0 0 1 3.331-1.329 4.662 4.662 0 0 1 3.385 1.329 4.291 4.291 0 0 1 1.31 3.212 4.291 4.291 0 0 1-1.31 3.212 4.662 4.662 0 0 1-3.385 1.329Zm3.767 3.655v30.682h-7.644V39.661ZM176.974 29.359h7.644v40.983h-7.644zM210.064 70.342l-10.267-13.07v13.07h-7.644V29.363h7.644v23.316l10.156-13.016h9.937l-13.326 15.393 13.435 15.286Z",fill:e}),s("path",{d:"M3.492 69.842a17.461 17.461 0 0 0 12.346-5.114 17.459 17.459 0 0 0 5.114-12.346v17.46Zm17.46-33.175h13.967v19.207a13.967 13.967 0 0 1-4.091 9.876 13.966 13.966 0 0 1-9.876 4.091Z",fill:o}),s("circle",{cx:"6.984",cy:"6.984",r:"6.984",transform:"translate(0 48.889)",fill:o}),s("path",{d:"M36.666 36.667H20.952v15.714a15.713 15.713 0 0 1 15.714-15.714Zm15.715-15.715H36.666a15.713 15.713 0 0 0-15.714 15.714h15.715a15.713 15.713 0 0 0 15.714-15.714Z",fill:e,"fill-rule":"evenodd"}),s("path",{d:"M17.46 17.46v17.46a17.46 17.46 0 0 1 17.46-17.46A17.46 17.46 0 0 0 52.381 0H34.92a17.46 17.46 0 0 0-17.46 17.46Z",fill:e,"fill-rule":"evenodd"})))}qt.props={width:{type:String,value:"220px"},color1:{type:String,value:"#333"},color2:{type:String,value:"#02d365"},contrast:{type:Boolean}};qt.styles=x`
    svg {
        max-width: 100%;
        display: block;
    }
`;var go=w(qt);S.define("formilk",go);function Yt({type:t,status:e,...o}){const[,r]=A("value"),[,n]=A("focused"),i=g(),a=g(),l=g(),c=L(),u=g(),d=M(i).filter(f=>f instanceof Text?f.textContent?.trim():!0),h=M(a),p=M(l);return X(()=>s("input",{onfocus:()=>n(!0),onblur:()=>n(!1),type:t,slot:"input",class:"reset",ref:u,...o})),O(),s("host",{shadowDom:!0,oninput:()=>r(u.current.value),onclick:f=>{let{target:v}=f;for(;v&&v!=c.current;){if(v?.hasAttribute("focusable"))return;v=v.parentElement}u.current.focus()}},s("div",{class:"input-row input"},s("div",{class:"input-row",style:`--columns:${W(h.length&&"auto",d.length&&"auto","1fr",p.length&&"auto",o.required&&"auto")}`},s("slot",{ref:a,name:"prefix",class:W(!h.length&&"hidden")}),s("div",{class:W(!d.length&&"hidden")},s("slot",{ref:i})),s("slot",{name:"input"}),s("slot",{ref:l,name:"suffix",class:W(!p.length&&"hidden")}),s("div",{class:"input-line"},s("div",{class:"input-line-fill"})))),s("style",null))}Yt.props={...Y,type:String,list:String,pattern:String,min:Number,max:Number,minLength:Number,maxLength:Number,placeholder:String,checked:Boolean,status:{type:String,reflect:!0},narrow:{type:Boolean,reflect:!0},ghost:{type:Boolean,reflect:!0},step:Number,color:{type:String}};Yt.styles=[pt,x`
        .hidden {
            display: none;
        }
    `];var Xe=w(Yt);S.define("input",Xe);const Ue=t=>t.replace(/([^\w\_\-])/g,"\\$1"),yo=({cssText:t,selectorText:e},o)=>`${e.split(/\s*,\s*/).map(r=>(r.startsWith(":")?r:":host "+r).replace(/(:host)\((.+)\)/,"$1$2").replace(/::slotted\((.+)\)/,":host > $1").replace(/:host/g,o))}${t.replace(e,"").replace(/(animation(?:-name){0,1}\s*:\s*)([^;}]+)/g,"$1$2-"+Ue(o))}`;function Ge(t,e){const{cssRules:o}=t;let r=[];for(let n=0;n<o.length;n++){const i=o[n];if(i instanceof CSSStyleRule)r.push(yo(i,e));else if(i instanceof CSSKeyframesRule){const{cssText:a}=i;r.push(a.replace(/\s+([^\s{]+)/," $1-"+Ue(e)))}else if(i instanceof CSSMediaRule){const{conditionText:a}=i;r.push(`@media ${a}{${Ge(i,e)}}`)}}return r}let wo=0;function xo(t){const e=L();ht(()=>{const o=document.createElement("style"),{current:r}=e;return r.dataset.sheet||(r.dataset.sheet=wo++),r.appendChild(o),(Array.isArray(t)?t.flat(100):[t]).forEach(n=>n&&Ge(n,r.localName+`[data-sheet="${r.dataset.sheet}"]`).forEach(i=>o.sheet.insertRule(i,o.sheet.cssRules.length))),()=>o.remove()},[t])}function ve(t,e,o=.9,r=24){const n=g(),i=c=>c.type.startsWith("touch"),a=c=>{let u=i(c);if(u&&(n.touches=!0),!n.current&&(n.touches?u:!0)){n.current=!0;const d=h=>{h=r>h?r:h,n.current&&(n.timeout=setTimeout(()=>{n.current&&(e(),d(h*o))},h))};d(200)}},l=c=>{let u=i(c);n.touches&&!u||(n.timeout&&n.current&&(clearInterval(n.timeout),e()),n.current=!1)};E(t,"mousedown",a),E(t,"touchstart",a),E(t,"keydown",c=>c.code==="Space"&&a(c)),E(t,"mouseup",l),E(t,"mouseleave",l),E(t,"touchend",l),E(t,"touchmove",l),E(t,"keyup",c=>l(c))}var ko=x`
    :host {
        display: block;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
`;function Ke({name:t,ghost:e,narrow:o,min:r,max:n,step:i,size:a}){xo(ko);const l=tt("input",{bubbles:!0}),c=i||1,[u,d]=A("value"),h=g(),p=g();let f=b=>{d(k=>{let y=(k||0)+c*b;return y=r!=null?y>r?y:r:y,y=n!=null&&y>n?n:y,y}),l()};ve(p,()=>f(-1)),ve(h,()=>f(1));const v=O();return s("host",null,s(Xe,{name:t,type:"number",style:"--text-align: center; --gap: 0px;",value:u,oninput:({currentTarget:b})=>{d(Number(b.value))},disabled:v,ghost:e,narrow:o,min:r,max:n,step:i,size:a},s(Z,{disabled:v,slot:"prefix",ghost:!0,ref:p,onclick:b=>b.preventDefault(),size:"small"},s(T,{slot:"prefix",type:"dash"})),s(Z,{disabled:v,slot:"suffix",ghost:!0,ref:h,onclick:b=>b.preventDefault(),size:"small"},s(T,{slot:"prefix",type:"plus"}))))}Ke.props={...Y,value:{type:Number,value:0},ghost:{type:Boolean,reflect:!0},narrow:{type:Boolean,reflect:!0},min:Number,max:Number,step:Number};var zo=w(Ke);S.define("input-counter",zo);function Xt({file:t}){const e=t&&URL.createObjectURL(t);return s("host",{shadowDom:!0},t&&(/^video/.test(t.type)?s("video",{class:"media",src:e,controls:!0}):/^image/.test(t.type)?s("img",{class:"media",src:e}):/^audio/.test(t.type)?s("audio",{class:"media",src:e,controls:!0}):null))}Xt.props={slot:{type:String,reflect:!0,value:"preview"},file:File};Xt.styles=x`
    :host {
        display: flex;
        align-items: center;
    }
    .media {
        max-width: 100%;
        display: block;
        margin: auto;
    }
`;var So=w(Xt);S.define("input-file-preview",So);function Ut({src:t,size:e,transform:o}){return s("host",{shadowDom:!0},s("button",{class:"avatar-mask",part:"avatar-mask"},s("div",{class:"avatar-inner",part:"avatar-inner"},s("slot",null,t?s("img",{class:"avatar-img",src:t}):s(T,{type:"avatar"})))),s("style",null,!!e&&`:host{--size:var(--size-${e});}`,!!o&&`:host{--transform:${o};}`))}Ut.props={src:String,size:{type:String,reflect:!0},transform:{type:String,reflect:!0}};Ut.styles=[C,x`
        .avatar-mask {
            width: var(--size-xl);
            height: var(--size-xl);
            overflow: hidden;
            border-radius: var(--border-radius);
            background: var(--color-layer-60);
            border: none;
            padding: 0px;
            cursor: unset;
            margin: auto;
        }
        .avatar-inner {
            width: 100%;
            height: 100%;
            transform: var(--transform);
            place-content: center;
            display: flex;
        }
        ::slotted(*),
        .avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    `];var Ao=w(Ut);S.define("avatar",Ao);var be=t=>t.getFullYear()+"-"+t.getMonth();function $o(t,e=1){let o=new Date(t.getFullYear(),t.getMonth()),r=o.getDay(),n=0,i=[],a=[],l=be(o);for(o.setDate((r-e)*-1+1);;){if(Number.isInteger(n/7)){if(l<be(o))break;a.push(i=[])}i.push(new Date(o)),o.setDate(o.getDate()+1),n++}return a}function Gt(){const t=$o(new Date(2022,1)),[e]=t,[o,r]=A("day");return s("host",{shadowDom:!0},s("table",null,s("tr",null,e.map(n=>s("td",{class:"td"},n.toLocaleDateString(void 0,{weekday:"short"}).replace(".","")))),t.map(n=>s("tr",null,n.map(i=>s("td",{class:"td"},s(Z,{size:"small",class:"button",ghost:i.getTime()!==o?.getTime(),onclick:a=>{r(i),console.log(i)}},s("strong",{slot:"prefix"},i.getDate()))))))))}Gt.props={day:Date};Gt.styles=x`
    :host {
        display: block;
    }
    .td {
        text-align: center;
    }
`;var Lo=w(Gt);S.define("input-calendar",Lo);class Co extends Event{#t=new me;#e=new me;constructor(e,o,r=!1){super(o,{bubbles:!0,composed:r});this.host=e}cast(e){this.#t.emit(this.castDown=e)}connect(e){e&&(this.observe=e),this.host.dispatchEvent(this);const o=r=>{r instanceof this.constructor&&r.type==this.type&&(r.stopPropagation(),r._sync(this))};this.host.addEventListener(this.type,o),this.#e.add(()=>{delete this.observe,this.host.removeEventListener(this.type,o)})}disconnect(){this.#e.emit()}_sync(e){const o=r=>{this.castUp=r,this.observe&&this.observe(r),!("castDown"in this)&&this.#t.emit(r)};this.#e.add(e.#t.add(o)),"castDown"in e?o(e.castDown):"castUp"in e&&o(e.castUp)}}class me extends Set{add=e=>super.add(e)&&(()=>this.delete(e));emit=e=>this.forEach(o=>o(e))}function Eo(t){const e=L(),[o,r]=_();return ht(()=>{const n=new Co(e.current,t,!0);return e.channel=n,n.connect(r),()=>n.disconnect()},[t]),[o,n=>e.channel.cast(n)]}function ft(t){return t.split("-")[0]}function Je(t){return t.split("-")[1]}function Kt(t){return["top","bottom"].includes(ft(t))?"x":"y"}function Qe(t){return t==="y"?"height":"width"}function ge(t,e,o){let{reference:r,floating:n}=t;const i=r.x+r.width/2-n.width/2,a=r.y+r.height/2-n.height/2,l=Kt(e),c=Qe(l),u=r[c]/2-n[c]/2,d=l==="x";let h;switch(ft(e)){case"top":h={x:i,y:r.y-n.height};break;case"bottom":h={x:i,y:r.y+r.height};break;case"right":h={x:r.x+r.width,y:a};break;case"left":h={x:r.x-n.width,y:a};break;default:h={x:r.x,y:r.y}}switch(Je(e)){case"start":h[l]-=u*(o&&d?-1:1);break;case"end":h[l]+=u*(o&&d?-1:1)}return h}const Mo=async(t,e,o)=>{const{placement:r="bottom",strategy:n="absolute",middleware:i=[],platform:a}=o,l=await(a.isRTL==null?void 0:a.isRTL(e));let c=await a.getElementRects({reference:t,floating:e,strategy:n}),{x:u,y:d}=ge(c,r,l),h=r,p={};for(let f=0;f<i.length;f++){const{name:v,fn:b}=i[f],{x:k,y,data:z,reset:$}=await b({x:u,y:d,initialPlacement:r,placement:h,strategy:n,middlewareData:p,rects:c,platform:a,elements:{reference:t,floating:e}});u=k??u,d=y??d,p={...p,[v]:{...p[v],...z}},$&&(typeof $=="object"&&($.placement&&(h=$.placement),$.rects&&(c=$.rects===!0?await a.getElementRects({reference:t,floating:e,strategy:n}):$.rects),{x:u,y:d}=ge(c,h,l)),f=-1)}return{x:u,y:d,placement:h,strategy:n,middlewareData:p}};function To(t){return typeof t!="number"?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(t):{top:t,right:t,bottom:t,left:t}}function lt(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function Ve(t,e){var o;e===void 0&&(e={});const{x:r,y:n,platform:i,rects:a,elements:l,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:h="floating",altBoundary:p=!1,padding:f=0}=e,v=To(f),b=l[p?h==="floating"?"reference":"floating":h],k=lt(await i.getClippingRect({element:(o=await(i.isElement==null?void 0:i.isElement(b)))==null||o?b:b.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(l.floating)),boundary:u,rootBoundary:d,strategy:c})),y=lt(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({rect:h==="floating"?{...a.floating,x:r,y:n}:a.reference,offsetParent:await(i.getOffsetParent==null?void 0:i.getOffsetParent(l.floating)),strategy:c}):a[h]);return{top:k.top-y.top+v.top,bottom:y.bottom-k.bottom+v.bottom,left:k.left-y.left+v.left,right:y.right-k.right+v.right}}const Zo=Math.min,Ro=Math.max;function ye(t,e,o){return Ro(t,Zo(e,o))}const Bo={left:"right",right:"left",bottom:"top",top:"bottom"};function ct(t){return t.replace(/left|right|bottom|top/g,e=>Bo[e])}function Do(t,e,o){o===void 0&&(o=!1);const r=Je(t),n=Kt(t),i=Qe(n);let a=n==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[i]>e.floating[i]&&(a=ct(a)),{main:a,cross:ct(a)}}const Po={start:"end",end:"start"};function we(t){return t.replace(/start|end/g,e=>Po[e])}const No=["top","right","bottom","left"];No.reduce((t,e)=>t.concat(e,e+"-start",e+"-end"),[]);const Oo=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o;const{placement:r,middlewareData:n,rects:i,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:h,fallbackStrategy:p="bestFit",flipAlignment:f=!0,...v}=t,b=ft(r),k=h||(b===a||!f?[ct(a)]:function(B){const H=ct(B);return[we(B),H,we(H)]}(a)),y=[a,...k],z=await Ve(e,v),$=[];let ot=((o=n.flip)==null?void 0:o.overflows)||[];if(u&&$.push(z[b]),d){const{main:B,cross:H}=Do(r,i,await(l.isRTL==null?void 0:l.isRTL(c.floating)));$.push(z[B],z[H])}if(ot=[...ot,{placement:r,overflows:$}],!$.every(B=>B<=0)){var oe,ne;const B=((oe=(ne=n.flip)==null?void 0:ne.index)!=null?oe:0)+1,H=y[B];if(H)return{data:{index:B,overflows:ot},reset:{placement:H}};let nt="bottom";switch(p){case"bestFit":{var ie;const se=(ie=ot.slice().sort((hr,pr)=>hr.overflows.filter(F=>F>0).reduce((F,mt)=>F+mt,0)-pr.overflows.filter(F=>F>0).reduce((F,mt)=>F+mt,0))[0])==null?void 0:ie.placement;se&&(nt=se);break}case"initialPlacement":nt=a}if(r!==nt)return{reset:{placement:nt}}}return{}}}};function Io(t){return t==="x"?"y":"x"}const jo=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:r,placement:n}=e,{mainAxis:i=!0,crossAxis:a=!1,limiter:l={fn:k=>{let{x:y,y:z}=k;return{x:y,y:z}}},...c}=t,u={x:o,y:r},d=await Ve(e,c),h=Kt(ft(n)),p=Io(h);let f=u[h],v=u[p];if(i){const k=h==="y"?"bottom":"right";f=ye(f+d[h==="y"?"top":"left"],f,f-d[k])}if(a){const k=p==="y"?"bottom":"right";v=ye(v+d[p==="y"?"top":"left"],v,v-d[k])}const b=l.fn({...e,[h]:f,[p]:v});return{...b,data:{x:b.x-o,y:b.y-r}}}}};function tr(t){return t&&t.document&&t.location&&t.alert&&t.setInterval}function I(t){if(t==null)return window;if(!tr(t)){const e=t.ownerDocument;return e&&e.defaultView||window}return t}function rt(t){return I(t).getComputedStyle(t)}function P(t){return tr(t)?"":t?(t.nodeName||"").toLowerCase():""}function R(t){return t instanceof I(t).HTMLElement}function K(t){return t instanceof I(t).Element}function Jt(t){return t instanceof I(t).ShadowRoot||t instanceof ShadowRoot}function vt(t){const{overflow:e,overflowX:o,overflowY:r}=rt(t);return/auto|scroll|overlay|hidden/.test(e+r+o)}function _o(t){return["table","td","th"].includes(P(t))}function xe(t){const e=navigator.userAgent.toLowerCase().includes("firefox"),o=rt(t);return o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].includes(o.willChange)||e&&o.willChange==="filter"||e&&!!o.filter&&o.filter!=="none"}function er(){return!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}const ke=Math.min,V=Math.max,ut=Math.round;function q(t,e,o){var r,n,i,a;e===void 0&&(e=!1),o===void 0&&(o=!1);const l=t.getBoundingClientRect();let c=1,u=1;e&&R(t)&&(c=t.offsetWidth>0&&ut(l.width)/t.offsetWidth||1,u=t.offsetHeight>0&&ut(l.height)/t.offsetHeight||1);const d=K(t)?I(t):window,h=!er()&&o,p=(l.left+(h&&(r=(n=d.visualViewport)==null?void 0:n.offsetLeft)!=null?r:0))/c,f=(l.top+(h&&(i=(a=d.visualViewport)==null?void 0:a.offsetTop)!=null?i:0))/u,v=l.width/c,b=l.height/u;return{width:v,height:b,top:f,right:p+v,bottom:f+b,left:p,x:p,y:f}}function j(t){return(e=t,(e instanceof I(e).Node?t.ownerDocument:t.document)||window.document).documentElement;var e}function bt(t){return K(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function rr(t){return q(j(t)).left+bt(t).scrollLeft}function Ho(t,e,o){const r=R(e),n=j(e),i=q(t,r&&function(c){const u=q(c);return ut(u.width)!==c.offsetWidth||ut(u.height)!==c.offsetHeight}(e),o==="fixed");let a={scrollLeft:0,scrollTop:0};const l={x:0,y:0};if(r||!r&&o!=="fixed")if((P(e)!=="body"||vt(n))&&(a=bt(e)),R(e)){const c=q(e,!0);l.x=c.x+e.clientLeft,l.y=c.y+e.clientTop}else n&&(l.x=rr(n));return{x:i.left+a.scrollLeft-l.x,y:i.top+a.scrollTop-l.y,width:i.width,height:i.height}}function or(t){return P(t)==="html"?t:t.assignedSlot||t.parentNode||(Jt(t)?t.host:null)||j(t)}function ze(t){return R(t)&&getComputedStyle(t).position!=="fixed"?t.offsetParent:null}function At(t){const e=I(t);let o=ze(t);for(;o&&_o(o)&&getComputedStyle(o).position==="static";)o=ze(o);return o&&(P(o)==="html"||P(o)==="body"&&getComputedStyle(o).position==="static"&&!xe(o))?e:o||function(r){let n=or(r);for(Jt(n)&&(n=n.host);R(n)&&!["html","body"].includes(P(n));){if(xe(n))return n;n=n.parentNode}return null}(t)||e}function Se(t){if(R(t))return{width:t.offsetWidth,height:t.offsetHeight};const e=q(t);return{width:e.width,height:e.height}}function nr(t){const e=or(t);return["html","body","#document"].includes(P(e))?t.ownerDocument.body:R(e)&&vt(e)?e:nr(e)}function ir(t,e){var o;e===void 0&&(e=[]);const r=nr(t),n=r===((o=t.ownerDocument)==null?void 0:o.body),i=I(r),a=n?[i].concat(i.visualViewport||[],vt(r)?r:[]):r,l=e.concat(a);return n?l:l.concat(ir(a))}function Ae(t,e,o){return e==="viewport"?lt(function(r,n){const i=I(r),a=j(r),l=i.visualViewport;let c=a.clientWidth,u=a.clientHeight,d=0,h=0;if(l){c=l.width,u=l.height;const p=er();(p||!p&&n==="fixed")&&(d=l.offsetLeft,h=l.offsetTop)}return{width:c,height:u,x:d,y:h}}(t,o)):K(e)?function(r,n){const i=q(r,!1,n==="fixed"),a=i.top+r.clientTop,l=i.left+r.clientLeft;return{top:a,left:l,x:l,y:a,right:l+r.clientWidth,bottom:a+r.clientHeight,width:r.clientWidth,height:r.clientHeight}}(e,o):lt(function(r){var n;const i=j(r),a=bt(r),l=(n=r.ownerDocument)==null?void 0:n.body,c=V(i.scrollWidth,i.clientWidth,l?l.scrollWidth:0,l?l.clientWidth:0),u=V(i.scrollHeight,i.clientHeight,l?l.scrollHeight:0,l?l.clientHeight:0);let d=-a.scrollLeft+rr(r);const h=-a.scrollTop;return rt(l||i).direction==="rtl"&&(d+=V(i.clientWidth,l?l.clientWidth:0)-c),{width:c,height:u,x:d,y:h}}(j(t)))}function Fo(t){const e=ir(t),o=["absolute","fixed"].includes(rt(t).position)&&R(t)?At(t):t;return K(o)?e.filter(r=>K(r)&&function(n,i){const a=i==null||i.getRootNode==null?void 0:i.getRootNode();if(n!=null&&n.contains(i))return!0;if(a&&Jt(a)){let l=i;do{if(l&&n===l)return!0;l=l.parentNode||l.host}while(l)}return!1}(r,o)&&P(r)!=="body"):[]}const Wo={getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:r,strategy:n}=t;const i=[...o==="clippingAncestors"?Fo(e):[].concat(o),r],a=i[0],l=i.reduce((c,u)=>{const d=Ae(e,u,n);return c.top=V(d.top,c.top),c.right=ke(d.right,c.right),c.bottom=ke(d.bottom,c.bottom),c.left=V(d.left,c.left),c},Ae(e,a,n));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:o,strategy:r}=t;const n=R(o),i=j(o);if(o===i)return e;let a={scrollLeft:0,scrollTop:0};const l={x:0,y:0};if((n||!n&&r!=="fixed")&&((P(o)!=="body"||vt(i))&&(a=bt(o)),R(o))){const c=q(o,!0);l.x=c.x+o.clientLeft,l.y=c.y+o.clientTop}return{...e,x:e.x-a.scrollLeft+l.x,y:e.y-a.scrollTop+l.y}},isElement:K,getDimensions:Se,getOffsetParent:At,getDocumentElement:j,getElementRects:t=>{let{reference:e,floating:o,strategy:r}=t;return{reference:Ho(e,At(o),r),floating:{...Se(o),x:0,y:0}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>rt(t).direction==="rtl"},qo=(t,e,o)=>Mo(t,e,{platform:Wo,...o});function Qt({width:t,showWithOver:e}){const o=L(),r=g(),n=g(),i=g(),[a,l]=A("show"),[c,u]=_(!1);E({current:window},"click",a&&!c&&(()=>l(!1)));const[d,h]=Eo("DropdownShowWithOver");e=d||e,N(()=>{h(e)},[e]);const p=f=>{let{target:v}=f;for(;v;){if(v?.hasAttribute("dropdown-ignore"))return;if(v===o.current)break;v=v.parentElement}qo(o.current,n.current,{middleware:[Oo({fallbackPlacements:["top","bottom"]}),jo()]}).then(({x:b,y:k})=>{n.current.style=`--left: ${b}px; --top:${k}px`}),l(!0)};return p.capture=!0,s("host",{shadowDom:!0,onmouseover:()=>u(!0),onmouseleave:()=>{u(!1),e&&l(!1)}},s("slot",{onclick:p,onmouseover:e?p:null,ref:r,name:"action"}),s("div",{class:"dropdown-mask",ref:n},s("div",{class:"dropdown",ref:i},s("slot",null))),s("style",null,t&&`:host{--tooptip-width:var(--tooptip-parent-width,${t})};`))}Qt.props={show:{type:Boolean,reflect:!0},showWithOver:{type:Boolean,reflect:!0},width:String,widthFull:{type:Boolean,reflect:!0}};Qt.styles=[C,x`
        :host {
            --transform: none;
            --left: auto;
            --top: auto;
            --bottom: auto;
            --visibility: hidden;
            --transition: 0.25s ease all;
            position: relative;
            z-index: 2;
        }
        :host([show]) {
            --visibility: visible;
        }
        .dropdown-mask {
            transform: var(--transform);
            left: var(--left);
            top: var(--top);
            bottom: var(--bottom);
            position: absolute;
            visibility: var(--visibility);
            padding: var(--size-xxs) 0;
            box-sizing: border-box;
        }
        .dropdown {
            --tooptip-parent-width: var(--tooptip-width);
            width: var(--tooptip-width);
            display: grid;
            background: var(--color-layer-60);
            border-radius: var(--border-radius);
            padding: var(--size) 0;
            box-sizing: border-box;
            transform: translateY(calc(var(--size-xxs) * var(--dir)));
            transition: var(--transition);
            opacity: 0;
            border: var(--border-width) solid var(--color-layer-30);
            box-shadow: var(--shadow-layer);
        }
        :host([show]) .dropdown {
            transform: translateY(0px);
            opacity: 1;
        }
    `];var sr=w(Qt);S.define("dropdown",sr);function Vt(){return s("host",{shadowDom:!0},s("slot",null))}Vt.props={show:{type:Boolean,reflect:!0}};Vt.styles=x`
  :host {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    z-index: 2;
    backdrop-filter: blur(10px);
    visibility: hidden;
    transition: 0.5s ease all;
    background: repeating-linear-gradient(45deg, #ab1cff, transparent);
    opacity: 0;
    display: grid;
    place-content: center;
    color: white;
  }
  :host([show]) {
    visibility: visible;
    opacity: 1;
  }
`;const te=w(Vt);customElements.define("my-loading",te);function ee({image:t,uid:e,title:o,price:r,loading:n}){const i=tt("Increment");return s("host",{shadowDom:!0},s("img",{class:"product-image",src:t}),s("div",{class:"product-detail"},s("h4",{class:"product-title"},o),s("div",{class:"product-actions"},s(Z,{size:"small",color:"neutral",rounded:!0,onclick:()=>i(e)},s(T,{type:"plus",slot:"prefix"})),s("strong",null,"$ ",r))),s(te,{show:n},"Checking stock"))}ee.props={uid:Number,image:String,title:String,price:Number,description:String,loading:Boolean,disabled:{type:Boolean,reflect:!0}};ee.styles=[C,x`
    :host {
      width: 100%;
      display: grid;
      gap: var(--size-s);
      background: white;
      grid-template-columns: 1fr;
      border-radius: var(--border-radius);
      overflow: hidden;
      position: relative;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    .product-detail {
      display: grid;
      gap: var(--size-s);
      padding: var(--size-s);
    }

    .product-detail p {
      margin: 0;
    }

    .product-title {
      margin: 0;
    }
    .product-image {
      width: 70%;
      height: 200px;
      object-fit: contain;
      margin: auto;
      padding: var(--size-s);
    }
    .product-actions {
      display: flex;
      align-items: center;
      gap: var(--size-s);
    }
    .product-counter {
      width: 180px;
    }
  `];const ar=w(ee);customElements.define("my-product",ar);function re({total:t,loading:e,image:o}){const r=tt("Increment"),n=tt("Decrement");return s("host",{shadowDom:!0},s("img",{class:"product-thumb_image",src:o}),s("div",{class:"product-thumb_actions"},s(Z,{color:"neutral",rounded:!0,size:"small",onclick:r,class:"product-thumb_increment"},s(T,{type:"plus",slot:"prefix"})),s("strong",null,t),s(Z,{color:"neutral",rounded:!0,size:"small",onclick:n,class:"product-thumb_decrement"},s(T,{type:"dash",slot:"prefix"}))),s(te,{show:e},"Checking stock"))}re.props={total:Number,title:String,image:String,loading:Boolean,disabled:{type:Boolean,reflect:!0},disabledIncrement:{type:Boolean,reflect:!0}};re.styles=[C,x`
    :host {
      display: grid;
      padding: var(--size-xxs);
      justify-content: center;
      grid-template-columns: 80px auto;
      gap: var(--size-xs);
      position: relative;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-sizing: border-box;
    }
    :host([disabled-increment]) .product-thumb_increment {
      opacity: 0.5;
      pointer-events: none;
    }
    .product-thumb_image {
      width: 100%;
      height: 80px;
      object-fit: cover;
    }
    .product-thumb_title {
      margin: 0;
    }
    .product-thumb_actions {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: var(--size-xs);
      align-items: center;
      justify-content: space-between;
    }
  `];const lr=w(re);customElements.define("my-product-thumb",lr);function cr(){const t=qr();return s("host",{shadowDom:!0},s("div",{class:"cart-products"},s(Bt,null,s("div",{class:"cart-products_grid"},Object.entries(t.state.cart).map(([e,{product:o,total:r,loading:n,disabled:i}])=>s(lr,{title:o.name,image:o.image,loading:n,disabledIncrement:i,onIncrement:()=>{t.actions.calc({id:e,count:1})},onDecrement:()=>{t.actions.calc({id:e,count:-1})},total:r}))))),s("footer",{class:"cart-footer"},"Total : $ ",t.state.total))}cr.styles=[C,x`
    :host {
      min-width: 280px;
      min-height: 100%;
      display: grid;
      padding: 0px var(--size);
      box-sizing: border-box;
      grid-template: 300px 40px/ 1fr;
    }
    .cart-products_grid {
      display: grid;
      gap: var(--size);
    }
    .cart-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-neutral-60);
      border-radius: var(--border-radius);
    }
  `];const ur=w(cr);customElements.define("my-cart",ur);function dr(){const t=Wr(Hr,{api:"https://gist.githubusercontent.com/UpperCod/88f8ca5d8a43a59632124ebaf3aa08df/raw/db019d98c63d7310e8fb1444eb45cc1ffd46c698/canopy.json",cart:{},products:[]});Fr(t);const[e,o]=Yr(t.actions.get);return N(e,[]),s("host",{shadowDom:!0},s("header",{class:"app-header"},s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"81",height:"30",staticNode:!0},s("path",{d:"M2.5 0A2.5 2.5 0 0 1 5 2.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 2.5 0ZM25 5a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5m0-5a10 10 0 1 1-10 10A10 10 0 0 1 25 0Z",fill:"#fd2c88"}),s("g",{fill:"#fd2c88"},s("path",{d:"M48 30h-5a2.5 2.5 0 0 1 0-5h5a5.006 5.006 0 0 0 5-5v-3.125A8.532 8.532 0 0 0 56.5 10c0-.166 0-.334-.014-.5h1.5c.014.174.014.342.014.5v10a10.012 10.012 0 0 1-10 10Z"}),s("path",{d:"M48 5a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5m0-5a10 10 0 1 1-10 10A10 10 0 0 1 48 0Z"})),s("path",{d:"M71 5a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5m0-5a10 10 0 1 1-10 10A10 10 0 0 1 71 0ZM12 17.5A2.5 2.5 0 0 1 9.5 20h-7a2.5 2.5 0 0 1 0-5h7a2.5 2.5 0 0 1 2.5 2.5Z",fill:"#fd2c88"})),s(sr,{showWithOver:!0},s(Z,{slot:"action",color:"primary",rounded:!0},"Cart (",Object.values(t.state.cart).reduce((r,{total:n})=>r+n,0),")"),s(ur,null))),s(Bt,null,s("div",{class:"app-grid"},t.state.products.map(r=>s(ar,{title:r.name,image:r.image,uid:r.id,price:r.price,onIncrement:()=>{t.actions.calc({id:r.id,count:1})},disabled:!!t.state.cart?.[r.id]?.disabled,loading:!!t.state.cart?.[r.id]?.loading})))))}dr.styles=[C,x`
    :host {
      display: grid;
      position: relative;
      height: 100%;
      grid-template: 80px 1fr/ 1fr;
    }
    .app-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10%;
      box-sizing: border-box;
    }
    .app-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--size-s);
      padding: 0px 10%;
      box-sizing: border-box;
    }
  `];customElements.define("my-app",w(dr));
