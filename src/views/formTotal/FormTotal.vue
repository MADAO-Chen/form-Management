<template>
    <div>
        <com-head :title="title">
            <el-button type="primary" @click="addFlow">导出</el-button>
        </com-head>
        <div class="search">
            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="表单类型：">
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
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="templateName"
                        label="表单类型">
                </el-table-column>
                <el-table-column
                        prop="createName"
                        label="创建人">
                </el-table-column>
                    <el-table-column
                            prop="createDate"
                            label="创建日期">
                    </el-table-column>
                    <el-table-column
                            prop="useNum"
                            label="使用次数">
                    </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <span class="look" @click="handleEdit(scope.$index, scope.row)">查看</span>
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
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import {getTotalData} from "network/total";
    import {tabPages} from "@/mixin/tabMixin";

    export default {
        name: "FormTotal",
        mixins:[tabPages],
        components:{
            ComHead
        },
        data(){
            return{
                title:"表单统计",
                query:{
                    tempName:''
                },
                id:0
            }
        },
        methods:{
            getData(page,size,query = {}){
                getTotalData(page,size,query).then(res=>{
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
            onSubmit(){
                this.getData(this.page,this.size,this.query)
            },
            handleEdit(index,row){
                this.$router.push('/statistics/FTInfo?id='+row.id)
            },
            //新建
            addFlow(){

            }
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