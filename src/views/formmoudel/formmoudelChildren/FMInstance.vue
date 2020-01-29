<template>
    <div>
        <com-head :title="title">
            <el-button type="primary">导出</el-button>
        </com-head>
        <div class="title">
            <h3>{{templateName}}</h3>
            <p>
                <span>申请人：{{createName}}</span>
                <span>申请事件：{{createDate}}</span>

            </p>
        </div>
        <div class="template-form">
            <el-form label-width="80px" size="small ">
                <div v-for="(item,index) in list" :key="index">
                    <el-form-item v-if="item.controlType == 'text_description'"
                                  :label="item.labelName">
                        <el-input readonly :value="item.content"></el-input>
                    </el-form-item>
                    <el-form-item v-else-if="item.controlType == 'label'"
                                  :label="item.labelName"
                                  >
                        <el-input readonly :value="item.value"></el-input>
                    </el-form-item>
                    <el-form-item v-else-if="item.controlType == 'combox'"
                                  :label="item.labelName"
                                  disabled>
                        <el-input readonly :value="item.value"></el-input>
                    </el-form-item>
                    <el-form-item v-else-if="item.controlType == 'date'"
                                  :label="item.labelName">
                        <div v-if="item.isDateRange">
                            <el-input readonly :value="item.value | beginTime"></el-input>
                            <span>至</span>
                            <el-input readonly :value="item.value | endTime"></el-input>
                        </div>
                        <div v-else>
                            <el-input readonly :value="item.value | formattingTime"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item v-else-if="item.controlType == 'image_show'"
                                  :label="item.labelName">
                        <el-image v-for="(urlItem,index) in JSON.parse(item.imgUrl)" :key="index"
                                  style="width: 100px; height: 100px"
                                  :src="urlItem.url"
                                  fit="fill"></el-image>
                    </el-form-item>
                    <el-form-item v-else-if="item.controlType == 'image'"
                                  :label="item.labelName">
                    <el-image v-for="(listUrl,index) in JSON.parse(item.value)" :key="index"
                              style="width: 100px; height: 100px"
                              :src="listUrl.url"
                              fit="fill"></el-image>
                    </el-form-item>
                    <el-form-item v-else-if="item.controlType == 'attachment'"
                                  :label="item.labelName">
                        <i class="el-icon-paperclip"></i>
                        <span class="file" v-for="(list,index) in JSON.parse(item.value)" :key="index">
                           {{list.name}}
                        </span>
                    </el-form-item>
                    <el-form-item v-else-if="item.controlType == 'score'"
                                  :label="item.labelName"
                                  :rules="{ required: item.isRequire}">
                        <el-rate :value="item.maxNum" :max="item.maxNum"></el-rate>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div v-if="state == 'unfinished'" class="bottom">
            <el-button class="unpass" @click="unPass">不通过</el-button>
            <el-button type="primary" @click="pass">通过</el-button>
        </div>
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import {getTemplateInstance,getWkfInst} from "network/template";
    import {passForm,unpassForm} from "network/workStation";

    export default {
        name: "FMInstance",
        components: {ComHead},
        data(){
            return{
                title:'表单详情',
                list:[],
                fileList:[],
                templateName:'',
                createDate:'',
                createName:'',
                state:'',
                id:0,
                tempId:0,
                wkfId:0,
                wkfInstId:0
            }
        },
        filters:{
          beginTime(val){
              let begin = val.split(',')
               let d = new Date(begin[0]);
               let datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
               return datetime
          },
            endTime(val){
                let begin = val.split(',')
                let d = new Date(begin[1]);
                let datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                return datetime
            },
            formattingTime(val){
                let d = new Date(val);
                let datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                return datetime
            }
        },
        methods:{
            getInfo(id){
                getTemplateInstance(id).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        let data = res.data
                        this.templateName = data.templateName
                        this.createName = data.createName
                        this.createDate = data.createDate
                        this.list = data.controlList
                    }

                })
            },
            getAllId(id){
                getWkfInst(id).then(res=>{
                    if(res.code == 200){
                        let data = res.data
                        this.tempId = data.tempId
                        this.wkfId = data.wkfId
                        this.wkfInstId = data.wkfInstId
                    }

                })
            },
            unPass(){
                unpassForm(this.wkfInstId,this.wkfId,this.formInstId).then(res=>{
                    if(res.code == 200 ){
                        this.$message({
                            message: '审核不通过',
                            type: 'success'
                        });
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
            pass(){
                passForm(this.wkfInstId,this.wkfId,this.formInstId).then(res=>{
                    if(res.code == 200 ){
                        this.$message({
                            message: '审核通过',
                            type: 'success'
                        });
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        created() {
            this.state =  this.$route.query.state ? this.$route.query.state : ''
           this.id = this.$route.query.formInId
           this.getInfo(this.id)
            this.getAllId(this.id)
        }
    }
</script>

<style scoped>
.title{
    text-align: center;
    padding: 30px 0;
    background-color: #fff;
}
.title h3{
    font-weight: 400;
    padding: 20px 0;
}
.title span{
    padding-right: 20px;
}
.template-form {
    height: 100%;
    background-color: #fff;
}

.el-form {
    height: 500px;
    overflow-y: auto;
    display: flex;
    flex-flow: column wrap;
}

.el-form > div {
    width: 50%;
    padding: 0 30px;
}
    .file{
        color: #1890ff;
        cursor: pointer;
        padding-left: 10px;
    }
    .bottom{
        text-align: right;
        padding-right: 50px;
    }
    .unpass{
        margin-right: 20px;
    }
</style>