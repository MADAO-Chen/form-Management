<template>
    <div class="log">
        <com-head :title="title"/>
        <div class="log-main">
            <div class="search">
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item label="用户：">
                        <el-input v-model="query.userName" placeholder="请输入"
                                  clearable
                                  size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="登录时间：">
                        <el-date-picker
                                v-model="query.createDate"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="登录端：">
                        <el-select v-model="query.operType" placeholder="请选择" size="small">
                            <el-option label='网页端' value='web'></el-option>
                            <el-option label='小程序端' value='wx_mini'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="log-tab">
                <el-table
                        :data="list"
                        height="400"
                        empty-text
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户">
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            label="登录时间">
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            label="登录IP">
                    </el-table-column>
                    <el-table-column
                            label="登录端">
                        <template slot-scope="scope">
                            {{scope.row.accessType | loginType}}
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
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import {getLogData} from "network/record";

    export default {
        name: "SMLog",
        components:{
            ComHead
        },
        data(){
            return{
                title:'日志管理',
                size:10,
                page:1,
                total:0,
                list:[],
                query:{
                    userName:'',
                    operType:'',
                    accessType:'',
                    createDate:''
                }
            }
        },
        methods:{
            getData(page,size){
                getLogData(page,size,{}).then(res=>{
                    if(res.code == 200){
                        let data= res.data
                        this.total = data.count
                        this.list = data.list
                    }
                })
            },
            //查询
            onSubmit(){

            },
            handleEdit(index,row){

            },
            handleSizeChange(val) {
                this.getData(this.page,val)
            },
            handleCurrentChange(val) {
                this.getData(val,this.size)
            },
            prev(val) {
                this.getData(val,this.size)
            },
            next(val) {
                this.getData(val,this.size)
            },
        },
        filters:{
            loginType(val){
                if(val == 'web'){
                    return 'WEB'
                }else{
                    return '小程序'
                }
            }
        },
        created() {
            this.getData(this.page,this.size)
        }
    }
</script>

<style scoped>
    .search{
        background-color: #fff;
        padding: 20px 0 0 20px;
    }
</style>