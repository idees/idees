<template>
    <div id="index">
        <div class="container-fluid main-container">
            <div class="row main-body">
                <div class="col-xs-3 col-md-3 col-lg-2 body-left">
                    <div class="btn-group title-btn">
                        <button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{current_disk_driver.driver_string}} <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li v-for="(value, key) in disk_driver_arr"><a v-on:click="changeDiskDriver(key)" href="javascript: void(0);">{{value.name}}</a></li>
                        </ul>
                    </div>
                    <div class="list-group article-list" v-bind:style="style_body">
                        <a v-show="is_search" v-for="article in search_article_arr" v-on:click="selectArticle(article)" href="javascript: void(0);" v-bind:class="articleClass(article)">
                            <h6 class="list-group-item-heading"><i v-show="String(article.basename).length <= 0" class="fa fa-spin fa-spinner"></i>{{String(article.basename).split('___')[0]}}</h6>
                            <p class="list-group-item-text"><i v-show="String(article.content).length <= 0" class="fa fa-spin fa-spinner"></i>{{String(article.content).substr(0, 40)}}</p>
                        </a>
                        <a v-show="!is_search" v-for="article in article_arr" v-on:click="selectArticle(article)" href="javascript: void(0);" v-bind:class="articleClass(article)">
                            <h6 class="list-group-item-heading"><i v-show="String(article.basename).length <= 0" class="fa fa-spin fa-spinner"></i>{{String(article.basename).split('___')[0]}}</h6>
                            <p class="list-group-item-text"><i v-show="String(article.content).length <= 0" class="fa fa-spin fa-spinner"></i>{{String(article.content).substr(0, 40)}}</p>
                        </a>
                    </div>
                </div>
                <div class="col-xs-4 col-md-4 col-lg-5 body-center">
                    <code-mirror v-bind:style="style_body"></code-mirror>
                </div>
                <div class="col-xs-5 col-md-5 col-lg-5 body-right">
                    <markdown-preview></markdown-preview>
                </div>
            </div>
            <div class="row footer">
                <div class="col-xs-3 col-md-3 col-lg-2 footer-left">
                    <input v-on:keyup.enter="searchArticle" v-on:keyup.delete="searchArticle" v-model="article_search_text" type="text" class="form-control" placeholder="Search">
                </div>
                <div class="col-xs-9 col-md-9 col-lg-10 footer-right">
                    <span>File Size: {{current_article.size/1024}} KB</span>
                    <span>Last Mod: {{getTimeString(current_article.lastmod)}}</span>
                </div>
            </div>
        </div>

        <v-dialog />
    </div>
</template>

<script>

    export default {
        created(){
            this.event_hub_obj.$on(window.VUE_CHANNEL.CODE_MIRROR.SAVE_CONTENT, this.saveArticle);
        },
        mounted() {
            this.$nextTick(function() {
                this.inputEncryptionKey();

                const height_string = _.toString(window.innerHeight-30)+'px';
                $('.CodeMirror, .markdown-preview').css({height: height_string});

                ipcRenderer.on('window-resize', ()=>{
                    this.style_body = {height: _.toString(window.innerHeight-50)+'px'};
                    $('.CodeMirror, .markdown-preview').css({height: _.toString(window.innerHeight-30)+'px'});
                });
                ipcRenderer.on('new-article', this.newArticle);
                ipcRenderer.on('save-article', this.emitSaveArticle);
                ipcRenderer.on('toggle-left', this.toggleLeft);
                ipcRenderer.on('toggle-right', this.toggleRight);
                ipcRenderer.on('open-local-folder', this.openLocalFolder);

                this.newArticle();
            });
        },
        data() {
            return {
                encryption_key: null,

                disk_driver_arr: window.disk_class.driver_arr,
                current_disk_driver: {
                    driver: 'local',
                    driver_string: _.get(window.disk_class.driver_arr, 'local').name,
                    remote_url: _.get(window.disk_class.driver_arr, 'local').remote_url,
                },
                disk_driver_config: {
                    remote_url: '',
                    username: '',
                    password: '',
                },
                disk_obj: null,
                style_body: {height: _.toString(window.innerHeight-50)+'px'},
                article_arr: [],
                search_article_arr: [],
                current_article: {
                    filename: null,
                    basename: null,
                    content: '',
                    size: 0,
                    type: 'file',
                    lastmod: _.now(),
                },
                is_search: false,
                article_search_text: '',

                const_body_side_class: {
                    left: {
                        xs: 3,
                        md: 3,
                        lg: 2,
                    },
                    center: {
                        xs: 4,
                        md: 4,
                        lg: 5,
                    },
                    right: {
                        xs: 5,
                        md: 5,
                        lg: 5,
                    },
                },
            }
        },
		methods: {
            articleClass(article){
                if(article.basename == this.current_article.basename){
                    return 'list-group-item active';
                }
                return 'list-group-item';
            },
            openLocalFolder(){
                if(this.encryption_key === null){
                    alert('password doesn\'t exist');
                    return false;
                }
                let disk_config_obj = window.helpers.get_disk_driver_config('local', this.encryption_key);
                return window.helpers.open_folder(window.helpers.combine_filename(disk_config_obj.remote_url, window.CONFIG.DEFAULT_PATH));
            },
            getTimeString(utc_timestamp){
                let date = new Date(utc_timestamp);
                return date.toLocaleString();
            },

            inputEncryptionKey(){
                swal({
                    content: {
                        element: "input",
                        attributes: {
                            placeholder: "Type your password to protect your data",
                            type: "password",
                        },

                    }
                })
                    .then((value)=>{
                        if(String(value).length <= 0 || !this.encryptionKeyValidation(value)){
                            alert('invalid password');
                            this.inputEncryptionKey();
                            return false;
                        }
                        this.encryption_key = value;

                        // trigger disk driver change
                        this.changeDiskDriver(this.current_disk_driver.driver);
                        return true;
                    });
            },
            encryptionKeyValidation(encryption_key){
                const validation_hash = 'de024ef52640e52d82bdb7e6433d37e3';
                if(!config_store.has('encryption_validate')){
                    config_store.set('encryption_validate', window.helpers.string_encrypt(validation_hash, encryption_key));
                    return true;
                }
                try {
                    if (validation_hash != window.helpers.string_decrypt(config_store.get('encryption_validate'), encryption_key)) {
                        return false;
                    }
                }catch(e){
                    return false;
                }
                return true;
            },

            toggleLeft(){
                let body_side_class = _.toPlainObject(this.const_body_side_class);

                let left = $('.body-left').is(':visible');
                let center = $('.body-center').is(':visible');
                let right = $('.body-right').is(':visible');

                if(!left){
                    body_side_class.left = {
                        xs: 0,
                        md: 0,
                        lg: 0,
                    };
                    $('.body-left').show();
                }else{
                    $('.body-left').hide();
                }
                if(right){
                    body_side_class.right = {
                        xs: 0,
                        md: 0,
                        lg: 0,
                    };
                }

                //_left = left;
                //_right = !right;

                $('.body-center').attr('class', 'col-xs-'+String(body_side_class.left.xs+body_side_class.center.xs+body_side_class.right.xs)+' col-md-'+String(body_side_class.left.md+body_side_class.center.md+body_side_class.right.md)+' col-lg-'+String(body_side_class.left.lg+body_side_class.center.lg+body_side_class.right.lg)+' body-center');

            },
            toggleRight(){
                let body_side_class = _.toPlainObject(this.const_body_side_class);

                let left = $('.body-left').is(':visible');
                let center = $('.body-center').is(':visible');
                let right = $('.body-right').is(':visible');

                if(!right){
                    body_side_class.right = {
                        xs: 0,
                        md: 0,
                        lg: 0,
                    };
                    $('.body-right').show();
                }else{
                    $('.body-right').hide();
                }
                if(left){
                    body_side_class.left = {
                        xs: 0,
                        md: 0,
                        lg: 0,
                    };
                }
                $('.body-center').attr('class', 'col-xs-'+String(body_side_class.left.xs+body_side_class.center.xs+body_side_class.right.xs)+' col-md-'+String(body_side_class.left.md+body_side_class.center.md+body_side_class.right.md)+' col-lg-'+String(body_side_class.left.lg+body_side_class.center.lg+body_side_class.right.lg)+' body-center');

            },

            changeDiskDriver(driver){
                this.current_disk_driver = {
                    driver: driver,
                    driver_string: _.get(this.disk_driver_arr, driver).name,
                    remote_url: _.get(this.disk_driver_arr, driver).remote_url,
                };
            },
            saveCurrentDiskDriverConfig(){
                let remote_url = $('.J_disk_driver_config_remote_url').val();
                let username = null;
                let password = null;
                if(this.current_disk_driver.driver != 'local'){
                    username = $('.J_disk_driver_config_username').val();
                    password = $('.J_disk_driver_config_password').val();
                }
                this.disk_driver_config = {
                    remote_url: remote_url,
                    username: username,
                    password: password,
                };

                if(String(this.disk_driver_config.remote_url).length <= 0 || String(this.disk_driver_config.username).length <= 0 || String(this.disk_driver_config.password).length <= 0){
                    return false;
                }
                window.helpers.set_disk_driver_config(this.current_disk_driver.driver, remote_url, username, password, this.encryption_key);
                this.testDiskDriver(this.current_disk_driver.driver,
                    (file)=>{
                        //this.$modal.hide('disk-driver-config');
                        this.$modal.hide('dialog');
                        this.initDirectory(this.current_disk_driver.driver);
                    },
                    (e)=>{
                        window.helpers.delete_disk_driver_config(this.current_disk_driver.driver);
                        console.log(e);
                        alert('Cannot connect server through this configuration');
                    });
            },
            testDiskDriver(driver, success_handler, error_handler){
                let disk_config = window.helpers.get_disk_driver_config(driver, this.encryption_key);
                let disk_obj = new window.disk_class(driver, disk_config.remote_url, disk_config.username, disk_config.password);
                disk_obj.getStat('/',
                    (file)=>{
                        success_handler(file);
                    },
                    (e)=>{
                        error_handler(e);
                    }
                );
            },

			initDirectory(driver){
                let disk_config_obj = window.helpers.get_disk_driver_config(driver, this.encryption_key);
                this.disk_obj = new window.disk_class(driver, disk_config_obj.remote_url, disk_config_obj.username, disk_config_obj.password);

                this.disk_obj.getStat(window.CONFIG.DEFAULT_PATH,
                    (file)=>{
                        //console.log(file);
                        //alert('welcome');
                        this.getArticleList();
                    },
                    (e)=>{
                        this.disk_obj.createDirectory(window.CONFIG.DEFAULT_PATH,
                            ()=>{
                                alert('idees directory init successfully!');
                                this.getArticleList();
                            },
                            (e)=>{
                                console.log(e);
                                alert('Oops, there\'s something bad happened.');
                            }
                        )
                    }
                );
			},
			getArticleList(){
				this.disk_obj.getDirectoryContents(window.CONFIG.DEFAULT_PATH,
                    (file_arr)=>{
                        this.article_arr = [];
                        // add files to article arr
                        _.each(file_arr, (value, i)=>{
                            let basename_tmp_arr = String(value.basename).split('.');
                            let file_extension = basename_tmp_arr[basename_tmp_arr.length-1];
                            if(value.type == 'file' && file_extension == 'md'){
                                this.article_arr.push(value);
                            }
                        });
                        // get file content
                        _.each(this.article_arr, (value, i)=>{
                            this.article_arr[i].content = '';
                            this.disk_obj.getFileContent(value.filename,
                                (content)=>{
                                    let article_tmp = this.article_arr[i];
                                    article_tmp.content = content;
                                    this.$set(this.article_arr, i, article_tmp);
                                },
                                (e)=>{
                                    alert('Sorry, I\'m stucking at getting one file content. Help!');
                                }
                            );
                        });
                    },
                    (e)=>{
                        alert('Getting article list failed.');
                    }
                );
			},
            updateArticle(article){
                this.disk_obj.getFileContent(article.filename,
                    (content)=>{
                        // update
                        for(let i=0; i<this.article_arr.length; i++){
                            if(this.article_arr[i].filename == article.filename){
                                let article_tmp = this.article_arr[i];
                                article_tmp.content = content;
                                this.$set(this.article_arr, i, article_tmp);
                                return true;
                            }
                        }
                        // new
                        let article_tmp = article;
                        article_tmp.content = content;
                        this.article_arr.push(article_tmp);
                        return true;
                    },
                    (e)=>{
                        alert('Oops, update article error.');
                    }
                );
            },
            setCurrentArticle(article){
                this.current_article = article;
                this.event_hub_obj.$emit(window.VUE_CHANNEL.CODE_MIRROR.CHANGE_CONTENT, this.current_article.content);
            },
            selectArticle(article){
                this.setCurrentArticle(article);
            },
            newArticle(){
                let content = '';
                if(this.article_arr.length <= 0){
                    content = window.CONFIG.DEFAULT_ARTICLE;
                }
                this.setCurrentArticle({
                    filename: null,
                    basename: null,
                    content: content,
                    size: 0,
                    type: 'file',
                    lastmod: _.now(),
                });
            },
            emitSaveArticle(){
                this.event_hub_obj.$emit(window.VUE_CHANNEL.CODE_MIRROR.EMIT_SAVE_CONTENT, this.current_article.content);
            },
            generateArticleBaseName(content){
                let first_line_md = String(content).split("\n")[0];
                let first_line_html = window.md.render(first_line_md);
                let first_line_text = $(first_line_html).text();
                return first_line_text + '___' + _.now();
            },
            saveArticle(content){
                let current_article = this.current_article;
                current_article.content = content;
                if(current_article.filename === null && current_article.basename === null){
                    // new article
                    current_article.basename = this.generateArticleBaseName(current_article.content);
                    current_article.filename = window.CONFIG.DEFAULT_PATH + '/' + current_article.basename + '.md';
                }

                this.disk_obj.putFileContent(current_article.filename, current_article.content,
                    ()=>{
                        alert('Congratulations! article saved successfully!');
                        this.updateArticle(current_article);
                    },
                    (e)=>{
                        alert('There\'s something bad happened while saving this article.');
                    }
                );
            },
            searchArticle(){
                this.is_search = (String(this.article_search_text).length > 0);
                if(!this.is_search){
                    return false;
                }
                this.search_article_arr = [];
                for(let i=0; i<this.article_arr.length; i++){
                    if(
                        String(this.article_arr[i].basename).search(this.article_search_text) >= 0
                        || String(this.article_arr[i].content).search(this.article_search_text) >= 0
                    ){
                        this.search_article_arr.push(this.article_arr[i]);
                    }
                }
                return true;
            },
		},
        watch: {
            current_disk_driver(new_val, old_val){
                if(!window.helpers.has_disk_driver('disk.'+new_val.driver)) {
                    //this.$modal.show('disk-driver-config');
                    let user_authentication = '' +
                        '                <div class="form-group">\n' +
                        '                    <div class="col-md-12">\n' +
                        '                        <input v-model="disk_driver_config.username" type="text" class="J_disk_driver_config_username form-control" placeholder="Please enter username">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="form-group">\n' +
                        '                    <div class="col-md-12">\n' +
                        '                        <input v-model="disk_driver_config.password" type="password" class="J_disk_driver_config_password form-control" placeholder="Please enter password">\n' +
                        '                    </div>\n' +
                        '                </div>\n';
                    if(new_val.driver == 'local'){
                        user_authentication = '';
                    }
                    this.$modal.show('dialog', {
                        title: 'Add ' + new_val.driver_string + ' Login Information',
                        text: '' +
                        '            <form class="form-horizontal">\n' +
                        '                <div class="form-group">\n' +
                        '                    <div class="col-md-12">\n' +
                        '                        <input v-model="disk_driver_config.remote_url" type="url" class="J_disk_driver_config_remote_url form-control" placeholder="Please enter remote url" value="'+new_val.remote_url+'">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        user_authentication +
                        '            </form>',
                        buttons: [
                            {
                                title: 'ADD',
                                handler: ()=>{
                                    this.saveCurrentDiskDriverConfig();
                                },
                            },
                            {
                                title: 'CANCEL'
                            },
                        ]
                    })
                }else{
                    this.initDirectory(new_val.driver);
                }
            }
        },
		beforeDestroy(){

		}

    }
</script>
