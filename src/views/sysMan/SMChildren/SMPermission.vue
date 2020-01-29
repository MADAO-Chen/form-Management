<template>
    <div class="permission">
        <com-head :title="title">
            <el-button type="primary" icon="el-icon-plus"
                       @click="addAuth">新增权限
            </el-button>
        </com-head>
        <div>
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
                        prop="authName"
                        label="一级权限名称"
                >
                </el-table-column>
                <el-table-column
                        prop="childNames"
                        label="二级权限名称"
                >
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
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="65%">
            <el-form :model="form" inline ref="form" :rules="formRules" inline label-width="80px">
                <el-form-item label="一级名称" prop="authName">
                    <el-input v-model="form.authName" palceholder="请输入权限名" size="mini">
                    </el-input>
                </el-form-item>
                <el-form-item label="一级编码" prop="authCode">
                    <el-input v-model="form.authCode" palceholder="请输入路径名" size="mini">
                    </el-input>
                </el-form-item>
                <el-form-item label="序号" prop="sort">
                    <el-input v-model="form.sort" palceholder="请输入" size="mini">
                    </el-input>
                </el-form-item>
                <div>二级权限
                    <el-button class="add" @click="addDemo" type="primary" size="mini">添加</el-button>
                </div>
                    <el-table :data="tableData" size="mini" highlight-current-row border style="width: 100%"
                              class="el-tb-edit" @current-change="handleCurrentChange"
                              ref="demoTable">       
                        <el-table-column prop="authName" label="名称">     
                            <template scope="scope">             
                                <el-input size="mini" v-model="scope.row.authName"
                                          placeholder="请输入"></el-input>
                                <span>{{scope.row.authName}}</span>           
                            </template>
                        </el-table-column>
                        <el-table-column prop="authCode" label="编码">
                            <template scope="scope">
                                <el-input v-model="scope.row.authCode" size="mini"></el-input>
                                                    <span>{{scope.row.authCode}}</span>
                            </template>
                                 
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope"> 
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>

                               
                    </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="sureUpdate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import {getAuthData, getAllAuth,addAuth,getAuth,updateAuth,delAuth} from "network/permission";
    import {tabPages} from "@/mixin/tabMixin";

    export default {
        name: "SMPermission",
        components: {
            ComHead
        },
        mixins: [tabPages],
        data() {
            return {
                title: '权限管理',
                dialogTitle: '新增权限',
                dialogFormVisible: false,
                form: {
                    authName: '',
                    authCode: '',
                    sort: 0,
                    state:null
                },
                formRules: {
                    authName: [{required: true, message: '请输入菜单名', trigger: 'blur'}],
                    authCode: [
                        {required: true, message: '请输入路径', trigger: 'blur'},
                    ]
                },
                tableData: [],
                currentRow: null,
                id:0
            }
        },
        methods: {
            getData(page, size) {
                getAuthData(page, size).then(res => {
                    let data = res.data
                    if (res.code == 200) {
                        this.list = data.list
                        this.total = data.count
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //新增
            addAuth() {
                this.dialogTitle = '新增权限'
                this.dialogFormVisible = true
            },
            //编辑
            handleEdit(index,row) {
                this.id = row.id
                this.dialogTitle = '修改权限'
                this.dialogFormVisible = true
                getAuth(this.id).then(res => {
                    if(res.code == 200){
                        let data = res.data
                        this.form = data.auth
                        this.tableData = data.authF
                    }
                })
            },
            sureUpdate() {
                if(this.dialogTitle == '新增权限'){
                    addAuth(this.form,this.tableData).then(res => {
                        if (res.code == 200) {
                            this.dialogFormVisible = false
                            this.tableData = []
                            this.getData(this.page, this.size)
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.msg);
                            this.tableData = []
                            this.dialogFormVisible = false
                        }
                    })
                }else {
                    updateAuth(this.form,this.tableData).then(res => {
                        if (res.code == 200) {
                            this.dialogFormVisible = false
                            this.tableData = []
                            this.getData(this.page, this.size)
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.msg);
                            this.tableData = []
                            this.dialogFormVisible = false
                        }
                    })
                }

            },
            cancel(){
                this.dialogFormVisible = false
                this.tableData = []
            },
            //删除
            handleDel(index,row) {
                this.id = row.id
                delAuth(this.id).then(res=>{
                    if (res.code == 200) {
                        this.getData(this.page, this.size)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            addDemo() {
                let d = {
                    authName: '',
                    authCode: '',
                    sort:null,
                    state:null
                };
                this.tableData.push(d);
                setTimeout(() => {
                    this.$refs.demoTable.setCurrentRow(d);
                }, 10);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            handleDelete(index, r) {
                this.tableData.splice(index, 1)
            },
        },
        created() {
        }
    }
</script>

<style scoped>
    .look {
        color: #1890ff !important;
        padding-right: 10px;
        cursor: pointer;

    }

    .el-tb-edit .el-input,
    .el-tb-edit .el-input-number,
    .el-tb-edit .el-select {
        display: none;
        width: 100%;
    }

    .el-tb-edit .current-row .el-input,
    .el-tb-edit .current-row .el-input-number,
    .el-tb-edit .current-row .el-select {
        display: inherit;
    }

    .el-tb-edit .current-row .el-input + span,
    .el-tb-edit .current-row .el-input-number + span,
    .el-tb-edit .current-row .el-select + span {
        display: none;
    }

</style>