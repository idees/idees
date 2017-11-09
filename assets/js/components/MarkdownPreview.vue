<template>
    <div>
        <button id="copy-html-btn" class="btn btn-xs btn-success">Copy HTML</button>

        <div v-bind:id="unique_id" v-html="markdown_html" class="markdown-preview"></div>
    </div>
</template>

<script>
    export default {
        created(){
            this.event_hub_obj.$on(window.VUE_CHANNEL.CODE_MIRROR.CONTENT_CHANGED, this.markdownToHtml);
        },
        mounted() {
            this.$nextTick(function() {

            });

        },
        data() {
            return {
                unique_id: 'markdown-preview-' + _.toString(_.now()) + _.toString(_.random(1000, 9999)),
                markdown_html: '',
            }
        },
        methods: {
            markdownToHtml(text){
                let html = window.md.render(text);
                html = _.replace(html, /\<table\>/g, '<table class="table table-striped">');
                this.markdown_html = html;
            },
        },
        beforeDestroy(){
            this.event_hub_obj.$off(window.VUE_CHANNEL.CODE_MIRROR.CONTENT_CHANGED, this.markdownToHtml);
        }
    }
</script>
