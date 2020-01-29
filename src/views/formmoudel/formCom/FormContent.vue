<template>
    <div>
        <div class="form-content" v-for="(item,index) in list">
            <div  @click="edit(item,index)" :class="{box:currIndex === index}"  v-if="item =='label'">
                <div class="form-input">文本框：</div>
                <el-input readonly>
                </el-input>
                <el-button @click="del(index)">删除</el-button>
            </div>
            <div @click="edit(item,index)" :class="{box:currIndex === index}"  v-else-if="item =='multi_combox'">
                <div class="form-input">联级下拉:</div>
                <el-input
                        suffix-icon="el-icon-arrow-down"
                        readonly>
                </el-input>
                <el-button @click="del(index)">删除</el-button>
            </div>
            <div @click="edit(item,index)" :class="{box:currIndex === index}"  v-else-if="item =='combox'" >
                <div class="form-input">下拉:</div>
                <el-input
                        suffix-icon="el-icon-arrow-down"
                        readonly>
                </el-input>
                <el-button @click="del(index)">删除</el-button>
            </div>
            <div @click="edit(item,index)" :class="{box:currIndex === index}"  v-else-if="item =='date'">
                <div class="form-input">日期:</div>
                <el-input
                        suffix-icon="el-icon-date"
                        readonly>
                </el-input>
                <el-button @click="del(index)">删除</el-button>
            </div>
            <div @click="edit(item,index)" :class="{box:currIndex === index}"  v-else-if="item =='city'">
                <div class="form-input">城市:</div>
                <el-input
                    suffix-icon="el-icon-arrow-down"
                    readonly>
                </el-input>
                <el-button @click="del(index)">删除</el-button>
            </div>
            <div @click="edit(item,index)" :class="{box:currIndex === index}"  v-else-if="item =='image'">
                <div class="form-input">图片:</div>
                <div class="avatar-uploader">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <el-button @click="del(index)">删除</el-button>
            </div>
            <div @click="edit(item,index)" :class="{box:currIndex === index}"  v-else-if="item =='attachment'">
                <div class="form-input">附件:</div>
                    <el-button size="small" type="primary">点击上传</el-button>
                <el-button @click="del(index)">删除</el-button>
            </div>
            <div @click="edit(item,index)" :class="{box:currIndex === index}"  v-else="item =='score'">
                <div class="form-input">评分:</div><el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                </el-rate>
                <el-button @click="del(index)">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormContent",
        props:{
            list:{
                type:Array,
                default(){
                    return[]
                }
            },
            inputstate:{
                type:Boolean,
                default:false
                }
        },
        data(){
            return{
                options:'',
                value:'请选择',
                currIndex:0,
            }
        },
        methods:{
            del(index){
                this.$emit('delform',index)
            },
            edit(item,index){
                this.currIndex = index
                this.$emit('inputChoose',item)
            }
        }
    }
</script>

<style scoped>
    .form-content{
        padding: 0 30px;
    }
    .form-content>div{
        display: flex;
        padding: 10px 20px;
    }
    .box{
        border: 1px dashed #dedede;
    }
    .form-input{
        width: 100px;
        text-align: right;
        padding-right: 10px;
    }
    .el-input,.el-select{
        width: 406px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .avatar {
        width: 40px;
        height: 40px;
        display: block;
    }

</style>