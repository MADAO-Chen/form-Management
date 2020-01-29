<template>
    <div>
        <com-head :title="title">
            <el-button type="primary" icon="el-icon-plus"
                       @click="addDep">新增部门
            </el-button>
        </com-head>
        <div>
            <div class="query">
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item label="部门名称：">
                        <el-input v-model="query.departName" placeholder="请输入"
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
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="departName"
                            label="部门名称"
                            width="700">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <span class="look" @click="handleEdit(scope.$index, scope.row)">编辑</span>
                            <span class="look" @click="handleDel(scope.$index, scope.row)">删除</span>
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
                <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%">
                    <el-form :model="form" inline label-width="80px">
                        <el-form-item label="部门名称"
                                      :rules="{ required: true, message: '请输入', trigger: 'blur' }">
                            <el-input v-model="form.departName" palceholder="请输入部门名"
                                      size="mini">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="sure">确 定</el-button>
                    </div>
                </el-dialog>
                <del-dialog :del-dialog="delDialog" @cancel="cancel" @delmsg="sureDel"/>
            </div>
        </div>
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import DelDialog from "components/common/DelDialog";
    import {getDepData,addDep,getDep,updateDep,delDep} from "network/department";
    import {tabPages} from "@/mixin/tabMixin";

    export default {
        name: "SMDepartment",
        components:{
            DelDialog,
            ComHead
        },
        mixins:[tabPages],
        data(){
            return{
                title:'部门管理',
                dialogTitle:'新增部门',
                query:{
                    departName:'',
                },
                delDialog :false,
                dialogFormVisible:false,
                id:0,
                form:{
                    departName:''
                }
            }
        },
        methods:{
            getData(page,size,query={}){
                getDepData(page,size,query).then(res =>{
                    if (res.code == 200) {
                        let data = res.data
                        this.total = data.count
                        this.list = data.list
                    }else{
                        this.$message.error('数据获取失败')
                    }
                }).catch(err=>{
                    this.$message.error(err)
                })
            },
            addDep(){
                this.dialogTitle = '新增部门'
                this.dialogFormVisible = true
            },
            sure(){
                if(this.dialogTitle == '新增部门'){
                    addDep(this.form.departName).then(res=>{
                        if (res.code == 200) {
                            this.dialogFormVisible = false
                            this.form.departName = ''
                            this.getData(this.page, this.size)
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.msg);
                            this.form.departName = ''
                            this.dialogFormVisible = false
                        }
                    })
                }else{
                    updateDep(this.id,this.form.departName).then(res=>{
                        if (res.code == 200) {
                            this.dialogFormVisible = false
                            this.form.departName = ''
                            this.getData(this.page, this.size)
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.msg);
                            this.form.departName = ''
                            this.dialogFormVisible = false
                        }
                    })
                }
            },
            //查询
            onSubmit(){
                this.getData(this.page,this.size,this.query)
            },
            //修改
            handleEdit(index,row){
                this.id = row.id
                this.dialogTitle = '修改部门'
                this.dialogFormVisible = true
                getDep(this.id).then(res=>{
                    if(res.code == 200){
                        this.form.departName = res.data.departName
                    }else{
                        return
                    }
                })
            },
            //删除
            handleDel(index,row){
                this.id = row.id
                this.delDialog = true
            },
            sureDel(){
                delDep(this.id).then(res=>{
                    if (res.code == 200) {
                        this.getData(this.page, this.size)
                        this.delDialog = false
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.delDialog = false
                        this.$message.error(res.msg);
                    }
                })
            },
            //取消
            cancel(){
                this.delDialog = false
                this.dialogFormVisible = false
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .query{
        background-color: #fff;
        padding: 20px 0 0 20px;
    }
    .look {
        color: #1890ff !important;
        padding-right: 10px;
        cursor: pointer;

    }
</style>