<template>
    <div class="org">
        <com-head :title="title">
            <el-button type="primary" icon="el-icon-plus"
                       @click="addOrg">新增组织架构
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
                        prop="orgName"
                        label="组织架构名称"
                >
                </el-table-column>
                <el-table-column
                        prop="parentName"
                        label="上级组织架构名称"
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="35%">
            <div class="dialog-main">
                <el-form :model="form" label-width="130px">
                    <el-form-item label="上级组织架构名称">
                        <el-select v-model="form.parentId" placeholder="请选择" size="small">
                            <el-option v-for="item in organ" :key="item.id"
                                       :label=item.orgName :value=item.id></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组织架构名称"
                                  :rules="{ required: true, message: '请输入', trigger: 'blur' }">
                        <el-input v-model="form.orgName" palceholder="请输入"
                                  size="mini">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
        <del-dialog :del-dialog="delDialog" @cancel="cancel" @delmsg="sureDel"/>
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import DelDialog from "components/common/DelDialog";
    import {tabPages} from "@/mixin/tabMixin";
    import {getAllOrgan, getOrganData, addOrgan, getOrgan, updateOrgan, delOrgan} from "network/organ";

    export default {
        name: "SMOrgan",
        components: {ComHead, DelDialog},
        mixins: [tabPages],
        data() {
            return {
                title: '组织架构管理',
                organ: [],
                dialogTitle: '新增组织架构',
                delDialog: false,
                dialogFormVisible: false,
                form: {
                    orgName: '',
                    parentId: ''
                },
                id: 0
            }
        },
        methods: {
            getData(page, size) {
                getOrganData(page, size).then(res => {
                    let data = res.data
                    if (res.code == 200) {
                        this.list = data.list
                        this.total = data.count
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            addOrg() {
                this.dialogTitle = '新增组织架构'
                this.dialogFormVisible = true
            },
            sure() {
                if (this.dialogTitle == '新增组织架构') {
                    addOrgan(this.form.orgName, this.form.parentId).then(res => {
                        if (res.code == 200) {
                            this.dialogFormVisible = false
                            this.form.orgName = ''
                            this.getData(this.page, this.size)
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.msg);
                            this.form.orgName = ''
                            this.dialogFormVisible = false
                        }
                    })
                } else {
                    updateOrgan(this.id, this.form.orgName, this.form.parentId).then(res => {
                        if (res.code == 200) {
                            this.dialogFormVisible = false
                            this.form.orgName = ''
                            this.getData(this.page, this.size)
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.msg);
                            this.form.orgName = ''
                            this.dialogFormVisible = false
                        }
                    })
                }
            },
            handleEdit(index, row) {
                this.id = row.id
                this.dialogTitle = '修改组织架构'
                this.dialogFormVisible = true
                getOrgan(this.id).then(res => {
                    if (res.code == 200) {
                        this.form.orgName = res.data.orgName
                        this.form.parentId = res.data.parentId
                    } else {
                        return
                    }
                })
            },
            handleDel(index,row) {
                this.id = row.id
                this.delDialog = true
            },

            sureDel() {
                delOrgan(this.id).then(res=>{
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
            cancel() {
                this.delDialog = false
                this.dialogFormVisible = false
            }
        },
        created() {
            getAllOrgan().then(res => {
                this.organ = res.data
            })
        }
    }
</script>

<style scoped>
    .look {
        color: #1890ff !important;
        padding-right: 10px;
        cursor: pointer;

    }

    .dialog-main {
        padding: 30px 20px;
    }
</style>