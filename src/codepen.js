// https://blog.codepen.io/documentation/prefill/
export function linkCodepen({html, css, js, ...opts}) {

    html = html.trim();
    css = css.trim();
    js = js.trim();

    const data = {
        title: document.title,
        description: "",
        html: html,
        html_pre_processor: "none",
        css: css,
        css_pre_processor: "none",
        css_starter: "neither",
        css_prefix_free: false,
        js: js,
        js_pre_processor: 'js',
        js_modernizr: false,
        js_library: "",
        html_classes: "",
        css_external: "",
        js_external: "",
        editors: "101",
        template: true,
        ...opts
    };

    const JSONstring =
        JSON.stringify(data)
            // Quotes will screw up the JSON
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");

    const form =
        '<form id="codepen-form" action="https://codepen.io/pen/define" method="POST" target="_blank">' +
        '<input type="hidden" name="data" value=\'' +
        JSONstring +
        '\'>' +
        '<input type="image" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-1/cp-arrow-right.svg" width="35" height="35" value="Create New Pen with Prefilled Data" class="codepen-mover-button">' +
        '</form>';

    return form
}
