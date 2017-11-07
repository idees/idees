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

window.CONFIG = {
    DEFAULT_ARTICLE: '# idees\n' +
    'A markdown editor which support several cloud file storage backends.\n' +
    '\n' +
    '---\n' +
    '\n' +
    '![idees](https://github.com/idees/idees/blob/master/_images/idees.png?raw=true)  \n' +
    '\n' +
    '---\n' +
    '\n' +
    '@[TOC]\n' +
    '\n' +
    '\n' +
    '## 0x01 What is Idees?\n' +
    'In our daily life, we have so many idées to write down, and many of us are suffering from the work of complicated text formatting.  \n' +
    '[Makrdown](https://github.com/topics/markdown) is a lightweight markup language which is a great way to save us from it.   \n' +
    '  \n' +
    'We usually save our data on many cloud file storage service, such as Dropbox, Google drive, 百度云, and so on. But what has happened did prove that these cloud storage is not reliable.  \n' +
    'They would  \n' +
    '* **peep your files**,   \n' +
    '* **block you download** your files due to their policy,   \n' +
    '* **delete your files**,   \n' +
    '* **leak out your secure files**.  \n' +
    '\n' +
    'So we need a **self deployed file storage service**, like [Owncloud](https://github.com/owncloud/core), [Nextcloud](https://github.com/nextcloud/server)  \n' +
    '  \n' +
    '[Idees](https://github.com/idees/idees) is a **markdown editor** and support these **self deployed file storage services**.  \n' +
    'It named as idees which is the translate of ideas in French.  \n' +
    'It can catch your idées directly.  \n' +
    '\n' +
    '## 0x02 Features\n' +
    '1. Full [Makrdown](https://github.com/topics/markdown) language support\n' +
    '2. Several cloud file backend: [Webdav](https://en.wikipedia.org/wiki/WebDAV), [Owncloud](https://github.com/owncloud/core), [Nextcloud](https://github.com/nextcloud/server), [坚果云](https://www.jianguoyun.com/), and so on.  \n' +
    '3. Real time preview\n' +
    '4. Content searching\n' +
    '\n' +
    '## 0x03 How to use\n' +
    '1. You should add a master password, which will secure your all configuration, and you\'ll be asked for this at anytime you open idees.  \n' +
    '![input password](https://github.com/idees/idees/blob/master/_images/BD11AE50A432A1EBAEC04ABD21B6764D.jpg?raw=true)\n' +
    '2. Select a file storage service, such as [坚果云](https://www.jianguoyun.com/).   \n' +
    '![select file storage](https://github.com/idees/idees/blob/master/_images/C2EFB1D39AA74C0CDC90843328996222.jpg?raw=true)\n' +
    '3. Fill in the `remote_url`, `username` and `passowrd` you have in [坚果云](https://www.jianguoyun.com/).    \n' +
    '![input remote_url username password](https://github.com/idees/idees/blob/master/_images/33D8F38059583C899CD847FD0F1E93D8.jpg?raw=true)  \n' +
    '![username password valid](https://github.com/idees/idees/blob/master/_images/A9ECE53B18AF7A45507913637DF9AA1C.jpg?raw=true)  \n' +
    '4. Press `CMD + N` to new a file.  \n' +
    '![new a file](https://github.com/idees/idees/blob/master/_images/A5DF4A5E23AD9BA95523A7673FD76E75.jpg?raw=true)  \n' +
    '5. Insert file content.  \n' +
    '![insert content](https://github.com/idees/idees/blob/master/_images/6FB97487F1C22556DF812F4DD2D99C72.jpg?raw=true)  \n' +
    '6. Press `CMD + S` to save the content.  \n' +
    '![save content](https://github.com/idees/idees/blob/master/_images/2F77B550C0D542F23B49375DB54CC6F2.jpg?raw=true)  \n' +
    '![select content](https://github.com/idees/idees/blob/master/_images/5B903DC8A8ACA59C74D29935A6E55ADB.jpg?raw=true)  \n' +
    '\n' +
    '---  \n' +
    '\n' +
    '## Article quotes\n' +
    '> * Accessing [Nextcloud](https://github.com/nextcloud/server) Files Using WebDAV\n' +
    '> [https://docs.nextcloud.com/server/9/user_manual/files/access_webdav.html](https://docs.nextcloud.com/server/9/user_manual/files/access_webdav.html)\n' +
    '> * Accessing [Owncloud](https://github.com/owncloud/core) Files Using WebDAV  \n' +
    '> [https://doc.owncloud.org/server/latest/user_manual/files/access_webdav.html](https://doc.owncloud.org/server/latest/user_manual/files/access_webdav.html)',
};

window.helpers = require('./libs/helpers');