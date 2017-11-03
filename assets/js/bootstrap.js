window._ = require('lodash');
window.Vue = require('vue');

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap-sass');
} catch (e) {}

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.swal = require('sweetalert');

window.webdav = {
    connect: require('webdav'),
};
window.disk_class = require('./libs/disk.class').default;

window.cryptojs = require("crypto-js");

window.code_mirror = require('codemirror');

require('codemirror/addon/edit/continuelist');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/selection/active-line');
require('codemirror/addon/search/match-highlighter');

require('codemirror/addon/dialog/dialog');
require('codemirror/addon/comment/comment');
require('codemirror/addon/wrap/hardwrap');
require('codemirror/addon/search/search');
require('codemirror/addon/search/searchcursor');

require('codemirror/keymap/sublime');

require('codemirror/mode/gfm/gfm');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/go/go');
require('codemirror/mode/css/css');
require('codemirror/mode/sass/sass');
require('codemirror/mode/shell/shell');
require('codemirror/mode/swift/swift');
require('codemirror/mode/toml/toml');
require('codemirror/mode/vue/vue');
require('codemirror/mode/yaml/yaml');
require('codemirror/mode/xml/xml');
require('codemirror/mode/sql/sql');
require('codemirror/mode/dockerfile/dockerfile');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/php/php');
require('codemirror/mode/htmlmixed/htmlmixed');

window.hljs = require('highlight.js');
window.md = require('markdown-it')({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                // This is only for full CommonMark compatibility.
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                // useful for external highlighters.
    linkify:      true,        // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer:  true,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: (str, lang)=>{
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
})
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-toc'));

window.interact = require('interact.js');
window.mousetrap = require('mousetrap');
/*
let token = document.head.querySelector('meta[name="csrf-token"]');
//
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
*/



//

//window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: window.location.hostname + ':6001'
// });

// window.Tether = require('tether');
// require('./material.min');
// require('./theme-plugins');
// require('./main');
// require('./swiper.jquery.min');
// require('./Chart.min');
//require('./mediaelement-and-player.min');
//require('./mediaelement-playlist-plugin.min');

window.VUE_CHANNEL = {
    CODE_MIRROR: {
        NEW_CONTENT: 'code_mirror::new_content',
        EMIT_SAVE_CONTENT: 'code_mirror::emit_save_content',
        SAVE_CONTENT: 'code_mirror::save_content',
        CHANGE_CONTENT: 'code_mirror::change_content',
        CONTENT_CHANGED: 'code_mirror::content_changed',
    }
};

window.helpers = require('./libs/helpers');