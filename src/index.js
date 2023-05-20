import {highlightElement} from 'https://unpkg.com/@speed-highlight/core/dist/index.js';
import themeStyles from './../node_modules/@speed-highlight/core/dist/themes/dark.css';
import indexStyles from "./index.css";
import {linkCodepen} from "./codepen.js";

export async function setupCodePreview(container, scripts, titles, sourcePrefix, processor, codepenOpts, appendHTML){
    const initHTML = container.outerHTML + '\n' + (appendHTML || '');
    let sources = []
    if(!scripts){
        sources = [document.querySelector('#example-script').textContent, 'js'];
    }else {
        sources = await Promise.all(scripts.map(async src => [
            typeof src==='string' ? (await (await fetch(src)).text()).trim() : src.textContent.trimEnd(),
            typeof src==='string' ? src.split('?')[0].split('.').pop() : 'js']
        ));
    }
    const previewel = document.createElement('div')
    previewel.id = 'code-previewer';
    previewel.innerHTML = `
        <style>${themeStyles}</style>
        <style>${indexStyles}</style>
        <div class="show-code-btn"><></div>
        <div class="code-block fira">

            <div class="code-header code-header-left">
                ${titles.map((lang) => `<span>${lang}</span>`).join('&nbsp;')}
            </div>
            <div class="code-header code-header-center">
                <div id="code-head-title">${document.title}</div>
            </div>
            <div class="code-header code-header-right">
                <span id="copy-btn">copy</span>
                <span id="source-btn">source</span>
            </div>
            <div class="code-header code-header-right-2">
            </div>

            <pre class='shj-lang-js fira shj-multiline code-text'></pre>
        </div>
    `
    container.appendChild(previewel);

    const codeBlock = document.querySelector('.code-block')
    function updateState(){
        window && window.localStorage && window.localStorage.setItem('code-block-state', JSON.stringify({
            open: codeBlock.style.display !== 'none',
            fileIndex: currentIndex,
        }))
    }

    const elem = document.querySelector('.code-text');
    let currentIndex = 0;
    function loadScript(title){
        const last = document.querySelector('.code-header-left > span.active')
        last && last.classList.remove('active');

        const index = titles.findIndex(a=>a===title);
        currentIndex = index;
        const source = sources[index];
        elem.textContent = source[0]
        const lang = source[1];
        elem.classList.remove('shj-lang-'+elem.dataset.lang);
        elem.classList.add('shj-lang-'+lang);
        highlightElement(elem);
        const js = processor ? processor(elem.textContent) : elem.textContent;
        const head2 = document.querySelector('.code-header-right-2')
        head2.querySelector('#codepen-form') && head2.querySelector('#codepen-form').remove();
        if(lang === 'js' || lang === 'ts')
            head2.innerHTML += linkCodepen({
                html: initHTML,
                js: js,
                js_pre_processor: lang === 'ts' ? 'typescript' : 'none',
                ...codepenOpts,
            });
        const el = document.querySelector('.code-header-left > span:nth-child('+(index+1)+')')
        el && el.classList.add('active');
        updateState();
    }

    document.querySelector('.code-header-left').addEventListener('click', (e) => {
        if(e.target.tagName === 'SPAN'){
            loadScript(e.target.textContent);
        }
    })
    document.querySelector('#copy-btn').addEventListener('click', (e) => {
        navigator.clipboard && navigator.clipboard.writeText(elem.textContent).then(() => {
            e.target.textContent = 'copied';
            setTimeout(() => {
                e.target.textContent = 'copy';
            }, 1000)
        })
    })
    document.querySelector('#source-btn').addEventListener('click', (e) => {
        const ind = currentIndex
        if(ind >=0 && ind<sourcePrefix.length) window.open(sourcePrefix[ind], '_blank');
    })

    document.querySelector('.show-code-btn').addEventListener('click', (e) => {
        codeBlock.style.display = codeBlock.style.display === 'none' ? 'block' : 'none';
        updateState();
    })

    const localStorageState = window && window.localStorage.getItem('code-block-state');
    let open_ = false;
    let index_ = currentIndex;
    if(localStorageState){
        const state = JSON.parse(localStorageState);
        if(state.open !== undefined) open_ = state.open;
        if(state.fileIndex && state.fileIndex < titles.length) index_ = state.fileIndex;
    }
    codeBlock.style.display = open_ ? 'block' : 'none';
    loadScript(titles[index_]);

    window.addEventListener('beforeunload', () => {
        updateState();
    })

    return {
        close: () => {
            codeBlock.style.display = 'none';
            updateState();
        },
        open: () => {
            codeBlock.style.display = 'block';
            updateState();
        }
    }

}
