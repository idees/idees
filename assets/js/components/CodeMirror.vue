<template>
    <textarea v-bind:id="unique_id"></textarea>
</template>

<script>
    export default {
        created(){
            this.event_hub_obj.$on(window.VUE_CHANNEL.CODE_MIRROR.CHANGE_CONTENT, this.changeContent);
            this.event_hub_obj.$on(window.VUE_CHANNEL.CODE_MIRROR.EMIT_SAVE_CONTENT, this.saveContent);
        },
        mounted() {
            this.$nextTick(function() {
                this.code_mirror_obj = window.code_mirror.fromTextArea(document.getElementById(this.unique_id), {
                    mode: 'gfm',
                    lineNumbers: false,
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    showCursorWhenSelecting: true,
                    lineWrapping: true,  // 长句子折行
                    styleActiveLine: true,
                    theme: "base16-light",
                    keyMap: 'sublime',
                    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
                });
                this.code_mirror_obj.on('change', (code_mirror_obj, change_obj)=>{
                    this.event_hub_obj.$emit(window.VUE_CHANNEL.CODE_MIRROR.CONTENT_CHANGED, code_mirror_obj.doc.getValue());
                });
                this.code_mirror_obj.addKeyMap({"Cmd-S": this.saveContent});
                this.code_mirror_obj.addKeyMap({"Cmd-N": ()=>{
                    this.event_hub_obj.$emit(window.VUE_CHANNEL.CODE_MIRROR.NEW_CONTENT);
                }});
            });

        },
        data() {
            return {
                unique_id: 'code-mirror-' + _.toString(_.now()) + _.toString(_.random(1000, 9999)),
                code_mirror_obj: null,
            }
        },
        methods: {
            changeContent(content){
                this.code_mirror_obj.getDoc().setValue(content);
            },
            saveContent(){
                this.event_hub_obj.$emit(window.VUE_CHANNEL.CODE_MIRROR.SAVE_CONTENT, this.code_mirror_obj.doc.getValue());
            }
        },
        beforeDestroy(){
            this.event_hub_obj.$off(window.VUE_CHANNEL.CODE_MIRROR.CHANGE_CONTENT, this.changeContent);
            this.event_hub_obj.$off(window.VUE_CHANNEL.CODE_MIRROR.EMIT_SAVE_CONTENT, this.saveContent);
        }
    }
</script>
