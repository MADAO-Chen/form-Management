<template>
    <div id="look-flow">
        <com-head :title="title"/>
        <el-steps :active="active" align-center>
            <el-step v-for="(item,index) in list" :key="index"
                    :title="item.title" icon="el-icon-more"
                     :description="item.userName"
            ></el-step>
        </el-steps>
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import {getFlow} from "network/flow";

    export default {
        name: "FTInfo",
        components:{
            ComHead
        },
        data(){
            return{
                title:'查看流程',
                list:[]
            }
        },
        methods:{
            getData(){
                getFlow(this.$route.query.id).then(res=>{
                    if(res.code == 200){
                        this.list = res.data.workflowItemInstDtoList
                    }
                })
            }
        },
        computed:{
            active(){
              let index = this.list.findIndex(item =>{
                   return item.state == 'unfinished'
               })
                if(!index){
                    return this.list.length
                }else{
                    return index
                }
            }
        },
        created() {
            this.getData()
        }

    }
</script>

<style scoped>
#look-flow{
    height: 100%;
    width: 100%;
    background-color: #fff;
}
    .el-steps{
        padding-top: 30px;
       position: absolute;
        top: 59px;
        left: 20px;
        right: 20px;
        bottom: 0;
        background-color: #fff;
    }
</style>