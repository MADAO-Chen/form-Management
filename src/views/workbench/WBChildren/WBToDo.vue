<template>
    <div class="work-todo">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的待办" name="first">
                <keep-alive>
                    <el-table
                            :data="toDoList"
                            height="400"
                            border
                            empty-text
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                label="序号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="templateName"
                                label="标题"
                                width="420">
                        </el-table-column>
                        <el-table-column
                                prop="createName"
                                label="发起人">
                        </el-table-column>
                        <el-table-column
                                prop="createDate"
                                label="发起时间">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <span  class="look" @click="lookInfo(scope.$index, scope.row)">查看详情</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </keep-alive>
            </el-tab-pane>
            <el-tab-pane label="我的审批" name="second">
               <keep-alive>
                   <el-table empty-text
                             :data="auditList"
                             height="400"
                             border
                             style="width: 100%">
                       <el-table-column
                               type="index"
                               label="序号"
                               width="100">
                       </el-table-column>
                       <el-table-column
                               prop="templateName"
                               label="标题"
                               width="420">
                       </el-table-column>
                       <el-table-column
                               prop="createName"
                               label="发起人">
                       </el-table-column>
                       <el-table-column
                               prop="createDate"
                               label="发起时间"
                               width="200">
                       </el-table-column>
                       <el-table-column
                               label="状态"
                               :class="{'ispass':ispass}">
                              
                           <template slot-scope="scope">
                                           
                               <div :style="{'color':scope.row.state=='unfinished'?'#ffd748':''}"
                               >
                                   {{scope.row.state | bmiFormatter}}
                               </div>
                                  
                           </template>
                       </el-table-column>
                       <el-table-column
                               label="操作">
                           <template slot-scope="scope">
                               <span class="look" @click="handleEdit(scope.$index, scope.row)">编辑</span>
                           </template>
                       </el-table-column>
                   </el-table>
               </keep-alive>

            </el-tab-pane>
        </el-tabs>
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
</template>

<script>
    import {getToDoData, getAuditData} from "network/workStation";

    export default {
        name: "WBToDo",
        data() {
            return {
                activeName: 'first',
                size: 10,
                page: 1,
                toDoTotal: 0,
                toDoList: [],
                auditTotal: 0,
                auditList: [],
                total: 0,
                ispass: false,
                tab:0
            };
        },
        methods: {
            //网络请求
            getToDo(page, size) {
                getToDoData(page, size, {}).then(res => {
                    let data = res.data
                    if (res.code == 200) {
                        this.toDoTotal = data.count
                        this.toDoList = data.list
                    }
                })
            },
            getAudit(page, size) {
                getAuditData(page, size, {}).then(res => {
                    let data = res.data
                    if (res.code == 200) {
                        this.auditTotal = data.count
                        this.auditList = data.list
                    }
                })
            },
            handleClick(tab) {
                this.tab = tab.index
                if ( this.tab == 1) {
                    this.total = this.auditTotal
                } else {
                    this.total = this.toDoTotal
                }
            },
            lookInfo(index,row){
                this.$router.push('/workflow/FPAudit?tepId='+row.id)
            },
            handleSizeChange(val) {
                if(this.tab == 0){
                    this.getToDo(this.page,val)
                }else{
                    this.getAudit(this.page,val)
                }
            },
            handleCurrentChange(val) {
                if(this.tab == 0){
                    this.getToDo(val,this.size)
                }else{
                    this.getAudit(val,this.size)
                }
            },
            handleEdit(index,row){
                console.log(row)
                this.$router.push({
                    path:'/template/formInstance',
                    query:{
                        formInId:row.id,
                        state:row.state
                    }
                })
            },
            prev(val) {
                if(this.tab == 0){
                    this.getToDo(val,this.size)
                }else{
                    this.getAudit(val,this.size)
                }
            },
            next(val) {
                if(this.tab == 0){
                    this.getToDo(val,this.size)
                }else{
                    this.getAudit(val,this.size)
                }
            },
        },
        filters: {
            bmiFormatter(value) {
                switch (value) {
                    case 'unfinished':
                        return '未审批'
                    case 'close':
                        return '已过期'
                    case 'finished':
                        return '已审批'
                }
            }
        },
        computed: {},
        created() {
            this.getToDo(this.page, this.size)
            this.getAudit(this.page, this.size)
            this.tab = 0
            this.total =this.toDoTotal
        }
    }
</script>

<style scoped>
    .ispass {
        color: #ffd748;
    }
    .look{
        color: #1890ff;
        cursor: pointer;
    }
</style>