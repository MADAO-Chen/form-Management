<template>
    <div>
        <com-head :title="title">
            <el-button type="primary" icon="el-icon-plus"
                       @click="addFlow">新增流程
            </el-button>
        </com-head>
        <div class="search">
            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="表单流程：">
                    <el-input v-model="query.tempName" placeholder="请输入"
                              clearable
                              size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                    :data="list"
                    height="400"
                    empty-text
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="tempName"
                        label="表单名称"
                        width="280">
                </el-table-column>
                <el-table-column
                        prop="workflowName"
                        label="流程名称"
                        width="530">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <span class="look" @click="handleEdit(scope.$index, scope.row)">查看流程</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        @prev-click='prev'
                        @next-click='next'
                        :current-page="page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="新增流程" :visible.sync="dialogFormVisible">
            <el-form >
                <el-form-item label="模板名称" label-width="80px">
                    <el-select v-model="templateName" placeholder="请选择">
                        <el-option v-for="item in templateList" :key="item.id"
                                :label="item.templateName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import {getFlowList} from "network/flow";
    import {getLockTemplate} from "network/support";
    import {tabPages} from "@/mixin/tabMixin";

    export default {
        name: "FormProcess",
        mixins:[tabPages],
        components:{
            ComHead
        },
        data(){
            return{
                title:"表单流程管理",
                query:{
                    tempName:''
                },
                id:0,
                dialogFormVisible:false,
                templateName:'',
                templateList:[]
            }
        },
        methods:{
            getData(page,size,query = {}){
                getFlowList(page,size,query).then(res=>{
                    if (res.code == 200) {
                        let data = res.data
                        this.total = data.count
                        this.list = data.list
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    this.$message.error(err)
                })
            },
            getTemplateList(){
                getLockTemplate().then(res=>{
                    if(res.code == 200 ){
                        this.templateList = res.data
                    }
                })
            },
            onSubmit(){
                this.getData(this.page,this.size,this.query)
            },
            handleEdit(index,row){
                this.$router.push('/workflow/FPWidth?id='+row.id)
            },
            //新建
            addFlow(){
                this.dialogFormVisible = true
            },
            addSure(){
                this.dialogFormVisible = false
                this.$router.push('/workflow/FLAdd?id='+this.templateName)
            }
        },
        created() {
            this.getTemplateList()
        }
    }
</script>

<style scoped>
    .search{
        background-color: #fff;
        padding: 20px 0 0 20px;
    }
    .look {
        color: #1890ff !important;
        padding-right: 10px;
        cursor: pointer;

    }
</style>