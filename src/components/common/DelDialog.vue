<template>
    <el-dialog
            title="确定删除该条数据吗?"
            :visible.sync="delDialog"
            width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="sureDel">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "DelDialog",
        props:{
            delDialog:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            sureDel(){
                this.$emit('delmsg')
            },
            cancel(){
                this.$emit('cancel')
            }
        }
    }
</script>

<style scoped>

</style>