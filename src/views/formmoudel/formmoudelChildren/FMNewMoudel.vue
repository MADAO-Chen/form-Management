<template>
    <div class="newNoudel">
        <com-head :title="title"/>
        <div class="title">
            <i class="el-icon-s-order"></i>
            <el-input class="title-input" v-model="templateName" placeholder="请输入模板标题"
                      :disabled="isAble"
            ></el-input>
            <i class="el-icon-edit edit" @click="isAble=!isAble"></i>
        </div>
        <div class="choose">
            <div class="coose-item" v-for="(item,index) in list" :key="index"
                @click="chooseInput(index)">
                <i class="el-icon-s-order"></i>
                <span>{{item}}</span>
            </div>
        </div>
        <div class="form-main">
            <div class="content">
                <form-content :list="formList" @delform="delForm" @inputChoose="inputChoose"/>
                <div class="createForm">
                    <el-button type="primary" @click="createForm">创建表单</el-button>
                </div>
            </div>
            <div class="config">
                <input-config :index="index" @sure="inputSure"/>
            </div>

        </div>
    </div>
</template>

<script>
    import InputConfig from "../formCom/InputConfig";
    import ComHead from "components/common/ComHead";
    import FormContent from "../formCom/FormContent";
    import {addTemplate} from "network/template";

    export default {
        name: "FMNewMoudel",
        components: {InputConfig,ComHead,FormContent},
        data(){
            return{
                list:['文本框','多级下拉','下拉','日期时间','城市','图片上传','附件','评分'],
                title:'新建表单模板',
                templateName:'',
                isAble:true,
                controlList:[],
                formList:[],
                index:null,
            }
        },
        methods:{
            chooseInput(index){
                    this.index = index
                    switch (index) {
                        case 0:
                            this.formList.push('label')
                            break
                        case 1:
                            this.formList.push('multi_combox')
                            break
                        case 2:
                            this.formList.push('combox')
                            break
                        case 3:
                            this.formList.push('date')
                            break
                        case 4:
                            this.formList.push('city')
                            break
                        case 5:
                            this.formList.push('image')
                            break
                        case 6:
                            this.formList.push('attachment')
                            break
                        case 7:
                            this.formList.push('score')
                            break
                    }
            },
            inputChoose(item){
                switch (item) {
                    case 'label':
                       this.index = 0
                        break
                    case 'multi_combox':
                        this.index = 1
                        break
                    case 'combox':
                        this.index = 2
                        break
                    case 'date':
                        this.index =3
                        break
                    case 'city':
                        this.index =4
                        break
                    case 'image':
                        this.index =5
                        break
                    case 'attachment':
                        this.index =6
                        break
                    case 'score':
                        this.index =7
                        break
                }
            },
            delForm(index){
                this.formList.splice(index,1)
                this.controlList.splice(index,1)
            },
            inputSure(config){
                let obj = {}
                for(let key in config){
                    obj[key] = config[key]
                }
                this.controlList.push(obj)
            },
            createForm(){
              for(let i = 0; i<this.controlList.length ; i++){
                  this.controlList[i].rowNo = i+1
              }
                addTemplate(this.templateName,this.controlList).then(res=>{
                   if(res.code == 200 ){
                       this.$message({
                           message: '新建模板成功',
                           type: 'success'
                       });
                   }else{
                       this.$message.error(res.msg)
                   }
                })
            }
        }
    }
</script>

<style scoped>
    .newNoudel{
        background-color: #fff;
        overflow-y: auto;
    }
.title{
    width: 400px;
    display: flex;
    align-items: center;
    padding: 20px;
}
    .title-input{
        margin: 0 10px;
    }
    .edit{
        cursor: pointer;
    }
    .choose{
        display: flex;
    }
    .coose-item{
        cursor: pointer;
        background-color: #fff;
        margin: 0 20px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        height: 60px;
        text-align: center;
        width:80px;
    }
    .form-main{
        display: flex;
        height: 500px;
    }
    .content{
        flex: 1;
        position: relative;
    }
    .createForm{
        position: absolute;
        bottom: 20px;
        width: 100px;
        left: 50%;
        margin-left: -50px;
    }
    .config{
        width: 400px;
    }
</style>