/**
 * @license
 * example-code-previewer v0.1.0
 * Copyright 2022-2023 repalash <palash@shaders.app>
 * MIT License
 */
import{highlightElement as e}from"https://unpkg.com/@speed-highlight/core/dist/index.js";async function o(o,n,t,s,r,a,c){const d=o.outerHTML+"\n"+(c||"");let i=[];i=n?await Promise.all(n.map((async e=>["string"==typeof e?(await(await fetch(e)).text()).trim():e.textContent.trimEnd(),"string"==typeof e?e.split("?")[0].split(".").pop():"js"]))):[document.querySelector("#example-script").textContent,"js"];const l=document.createElement("div");l.id="code-previewer",l.innerHTML=`\n        <style>[class*=shj-lang-]{white-space:pre;margin:10px 0;border-radius:10px;padding:30px 20px;background:white;color:#112;box-shadow:0 0 5px #0001;text-shadow:none;font:18px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;line-height:24px;box-sizing:border-box;max-width:min(100%,100vw)}.shj-inline{margin:0;padding:2px 5px;display:inline-block;border-radius:5px}[class*=shj-lang-]::selection,[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{flex:1;outline:none}.shj-numbers{padding-left:5px;counter-reset:line}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;display:block;content:counter(line);opacity:.5;text-align:right;margin-right:5px;counter-increment:line}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-numbers,.shj-syn-cmnt{color:#999}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{background:#25f;color:#fff;padding:5px 7px;border-radius:5px}.shj-multiline.shj-mode-header{padding:20px}.shj-multiline.shj-mode-header:before{content:attr(data-lang);color:#58f;display:block;padding:10px 20px;background:#58f3;border-radius:5px;margin-bottom:20px}[class*=shj-lang-]{color:#f8f8f2;background:#1a1a1c}[class*=shj-lang-]:before{color:#6f9aff}.shj-syn-deleted,.shj-syn-err,.shj-syn-var{color:#ff5261}.shj-syn-section,.shj-syn-kwd{color:#ff7cc6}.shj-syn-class{color:#eab07c}.shj-numbers,.shj-syn-cmnt{color:#7d828b}.shj-syn-insert,.shj-syn-type,.shj-syn-func,.shj-syn-bool{color:#71d58a}.shj-syn-num{color:#b581fd}.shj-syn-oper{color:#80c6ff}.shj-syn-str{color:#4dacfa}</style>\n        <style>.code-block{display:block;margin:0;padding:0;position:absolute;top:3rem;left:3rem;z-index:100;width:min-content;height:min-content;font:14px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;}.code-header{position:absolute;top:20px;color:#58f;display:flex;padding:6px 6px;background:#58f3;border-radius:5px;user-select:none;}.show-code-btn{top:1rem;user-select:none;left:1rem;position:absolute;z-index:100;width:min-content;height:min-content;padding:10px;background:#1a1a1cdd;border-radius:50%;box-shadow:0 0 5px #0001;cursor:pointer;color:#eeeeee;transition:background-color 0.2s ease-in-out;font:18px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;}.show-code-btn:hover{background-color:#1a1a1c;}.code-text{padding-top:60px;padding-bottom:20px;max-width:100%;max-height:100%;height:100%;display:block;overflow-y:scroll;background-color:#1a1a1cdd;transition:background-color 0.2s ease-in-out;}.code-block:hover > .code-text{background-color:#1a1a1c;}.code-text > div{max-height:70vh;max-width:80vw;min-width:500px;resize:both;opacity:1;}.code-header > span{display:flex;cursor:pointer;border-radius:4px;padding:5px 10px;transition:color 0.2s ease-in-out,background 0.2s ease-in-out;}.code-header > span:hover{background:#58f3;color:#fff;}.code-header > span.active{background:#58f3;color:#fff;}.code-header-left{left:12px;}.code-header-right{right:60px;}.code-header-right-2{right:12px;display:flex;padding:0;background-color:transparent;}.code-header-right > span {}.btn-icon{width:20px;height:20px;}.code-header-center{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;background-color:transparent;padding:5px 0;color:#71d58a;cursor:text;font-size:16px!important;}#code-head-title{padding:5px 10px;background-color:transparent;}[class*=shj-lang-]{font-size:16px!important;}</style>\n        <div class="show-code-btn"><></div>\n        <div class="code-block fira">\n\n            <div class="code-header code-header-left">\n                ${t.map((e=>`<span>${e}</span>`)).join("&nbsp;")}\n            </div>\n            <div class="code-header code-header-center">\n                <div id="code-head-title">${document.title}</div>\n            </div>\n            <div class="code-header code-header-right">\n                <span id="copy-btn">copy</span>\n                <span id="source-btn">source</span>\n            </div>\n            <div class="code-header code-header-right-2">\n            </div>\n\n            <pre class='shj-lang-js fira shj-multiline code-text'></pre>\n        </div>\n    `,o.appendChild(l);const p=document.querySelector(".code-block");function h(){window&&window.localStorage&&window.localStorage.setItem("code-block-state",JSON.stringify({open:"none"!==p.style.display,fileIndex:g}))}const u=document.querySelector(".code-text");let g=0;function m(o){const n=document.querySelector(".code-header-left > span.active");n&&n.classList.remove("active");const s=t.findIndex((e=>e===o));g=s;const c=i[s];u.textContent=c[0];const l=c[1];u.classList.remove("shj-lang-"+u.dataset.lang),u.classList.add("shj-lang-"+l),e(u);const p=r?r(u.textContent):u.textContent,m=document.querySelector(".code-header-right-2");m.querySelector("#codepen-form")&&m.querySelector("#codepen-form").remove(),"js"!==l&&"ts"!==l||(m.innerHTML+=function({html:e,css:o,js:n,...t}){e=e.trim(),o=o.trim(),n=n.trim();const s={title:document.title,description:"",html:e,html_pre_processor:"none",css:o,css_pre_processor:"none",css_starter:"neither",css_prefix_free:!1,js:n,js_pre_processor:"js",js_modernizr:!1,js_library:"",html_classes:"",css_external:"",js_external:"",editors:"101",template:!0,...t};return'<form id="codepen-form" action="https://codepen.io/pen/define" method="POST" target="_blank"><input type="hidden" name="data" value=\''+JSON.stringify(s).replace(/"/g,"&quot;").replace(/'/g,"&apos;")+'\'><input type="image" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-1/cp-arrow-right.svg" width="35" height="35" value="Create New Pen with Prefilled Data" class="codepen-mover-button"></form>'}({html:d,js:p,js_pre_processor:"ts"===l?"typescript":"none",...a}));const f=document.querySelector(".code-header-left > span:nth-child("+(s+1)+")");f&&f.classList.add("active"),h()}document.querySelector(".code-header-left").addEventListener("click",(e=>{"SPAN"===e.target.tagName&&m(e.target.textContent)})),document.querySelector("#copy-btn").addEventListener("click",(e=>{navigator.clipboard&&navigator.clipboard.writeText(u.textContent).then((()=>{e.target.textContent="copied",setTimeout((()=>{e.target.textContent="copy"}),1e3)}))})),document.querySelector("#source-btn").addEventListener("click",(e=>{const o=g;o>=0&&o<s.length&&window.open(s[o],"_blank")})),document.querySelector(".show-code-btn").addEventListener("click",(e=>{p.style.display="none"===p.style.display?"block":"none",h()}));const f=window&&window.localStorage.getItem("code-block-state");let x=!1,y=g;if(f){const e=JSON.parse(f);void 0!==e.open&&(x=e.open),e.fileIndex&&e.fileIndex<t.length&&(y=e.fileIndex)}return p.style.display=x?"block":"none",m(t[y]),window.addEventListener("beforeunload",(()=>{h()})),{close:()=>{p.style.display="none",h()},open:()=>{p.style.display="block",h()}}}export{o as setupCodePreview};
//# sourceMappingURL=index.js.map