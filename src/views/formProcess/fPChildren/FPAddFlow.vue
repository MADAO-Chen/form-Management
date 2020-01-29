<template>
   <div class="add-flow">
       <com-head :title="title"></com-head>
        <div class="btn-list">
            <el-button-group>
                <el-button type="primary" @click="addAudit">添加审核</el-button>
                <el-button type="primary" @click="delListItem">删除节点</el-button>
                <el-button type="primary" @click="updatePersonnel">修改人员</el-button>
                <el-button type="primary" @click="saveFlow">保存流程</el-button>
            </el-button-group>
        </div>
       <div class="add-main">
            <div class="flow-item">
                <div class="item-text" @dblclick="dialogFormVisible = true">
                    <div class="cir-item">填写</div>
                    <div>
                        <p class="item-name">填写</p>
                        <p class="item-info">时间</p>
                    </div>
                </div>
                <div class="line"></div>
            </div>
           <div class="flow-item" v-for="(item,index) in list" @click="choose=index">
               <div class="item-text" :class="{'isActive':choose == index}">
                   <div class="cir-item">{{item}}</div>
                   <div>
                       <p class="item-name">{{item}}节</p>
                       <p class="item-info">点{{index+1}}</p>
                   </div>
               </div>
               <div class="line"></div>
           </div>
           <div class="flow-item">
               <div class="item-text">
                   <div class="cir-item">结束</div>
                   <div>
                       <p class="item-name">结束</p>
                       <p class="item-info">时间</p>
                   </div>
               </div>
           </div>
       </div>
       <div>
           <el-dialog title="修改人员" :visible.sync="dialogFormVisible">
               <div>
                   <el-button-group>
                       <el-button type="primary" :plain="!plain" @click="chooseDep">部门</el-button>
                       <el-button type="primary" :plain="plain" @click="chooseJob">人员</el-button>
                   </el-button-group>
               </div>
                   <tree-transfer   v-show="!plain"
                                    :from_data='depList'
                                    :to_data='toDepData'
                                    @addBtn='depadd'
                                    @removeBtn='depremove'
                                    height='540px'
                                    filter
                                    openAll>
                   </tree-transfer>
                   <tree-transfer   v-show="plain"
                                    :from_data='jobList'
                                    :to_data='toJobData'
                                    @addBtn='jobadd'
                                    @removeBtn='jobremove'
                                    height='540px'
                                    filter
                                    openAll>
                   </tree-transfer>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="dialogFormVisible = false">取 消</el-button>
                   <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
               </div>
           </el-dialog>
       </div>
   </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import treeTransfer from 'el-tree-transfer' // 引入
    import {getDepPer,getJobPer} from "network/support";

    export default {
        name: "FPAddFlow",
        components:{
            ComHead,
            treeTransfer
        },
        data(){
            return {
                title:'新建流程',
                jobList:[],
                depList:[],
                list:[],
                choose:NaN,
                dialogFormVisible:false,
                toDepData:[],
                toJobData:[],
                plain:true,
            }
        },
        methods:{
            //网络请求
            getJobList(){
                getJobPer().then(res=>{
                    if(res.code == 200 ){
                        this.jobList = this.updateList(res.data)
                    }
                })
            },
            getDepList(){
                getDepPer().then(res=>{
                    if(res.code == 200 ){
                        this.depList = this.updateList(res.data)
                    }
                })
            },
            //格式化人员数据
            updateList(list){
                let arr=[]
                list.forEach((item,index)=>{
                    item.id = index+1
                    item.pid = 0
                    let newObj={}
                    let obj = {}
                    if(item.hasOwnProperty('departName')){
                        obj = JSON.parse(JSON.stringify(item).replace(/departName/g,"label"));
                        newObj = JSON.parse(JSON.stringify(obj).replace(/userList/g,"children"));
                        arr.push(newObj)
                    }else{
                        obj = JSON.parse(JSON.stringify(item).replace(/jobName/g,"label"));
                        newObj = JSON.parse(JSON.stringify(obj).replace(/userList/g,"children"));
                        arr.push(newObj)
                    }
                })
                arr.forEach(item=>{
                   let newArr = item.children.map((ele,i)=>{
                       ele.pid = item.id
                       ele.id = item.id+'-'+(i+1)
                        return JSON.parse(JSON.stringify(ele).replace(/userName/g,"label"));
                    })
                    item.children = newArr
                })
                return arr
            },
            //添加审核
            addAudit(){
                this.list.push('审核')
            },
            //删除节点
            delListItem(){
                if(isNaN(this.choose)){
                    this.$message.error('先选择节点')
                    return
                }else{
                    this.list.splice(this.choose,1)
                }
            },
            //修改人员
            updatePersonnel(){

            },
            //保存流程
            saveFlow(){

            },
            //树
            changeMode() {
                if (this.mode == "transfer") {
                    this.mode = "addressList";
                } else {
                    this.mode = "transfer";
                }
            },
            // 监听穿梭框组件添加
            depadd(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
            },
            // 监听穿梭框组件移除
            depremove(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
            },
            // 监听穿梭框组件添加
            jobadd(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
            },
            // 监听穿梭框组件移除
            jobremove(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
            },
            chooseDep(){
                this.plain = ! this.plain
            },
            chooseJob(){
                this.plain = ! this.plain
            }
        },
        created() {
            this.getJobList()
            this.getDepList()
        }
    }
</script>

<style scoped>
.btn-list{
    padding: 10px 0;
    border-bottom: 1px solid #dedede;
}
    .add-flow{
        background-color: #fff;
    }
    .add-main{
        display: flex;
        padding: 60px 30px;
    }
    .flow-item{
        display: flex;
        flex-flow: column nowrap;
        position: relative;
        width: 290px;
        cursor: pointer;
    }
    .item-text{
        width: 60px;
        text-align: center;
    }
    .cir-item{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #1890ff;
        line-height: 50px;
        text-align: center;
        margin: 30px 5px;
        color: #fff;
    }
    .item-name{
        font-weight: 700;
        line-height: 30px;
    }
    .item-info{
        font-size: 12px;
        color: #8b8b8b;
    }
    .line{
        height: 4px;
        width: 230px;
        background-color: #b4b4b4;
        position: absolute;
        top: 55px;
        right: 0;
    }
    .isActive{
        border: 1px solid red;
    }
</style>