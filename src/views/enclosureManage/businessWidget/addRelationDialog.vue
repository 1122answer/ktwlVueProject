<template>
    <v-modal title="第一个 Modal" :visible="visible" @ok="handleOk" @cancel="handleCancel">
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
    </v-modal>
</template>

<script >
import { mapState } from "vuex";

    export default {
        props: ["visible"],
        data () {
            return {
                visible: false
            }
        },

        methods: {

            handleOk () {
                this.visible = false;
            },

            handleCancel () {
                this.visible = false;
            }
        }
    }
</script>