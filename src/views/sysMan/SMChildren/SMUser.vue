<template>
    <div class="user">
        <com-head :title="title">
            <el-button type="primary" icon="el-icon-plus"
                       @click="addUser">新增人员
            </el-button>
            <el-button plain>导入</el-button>
            <el-button plain>导出</el-button>
        </com-head>
        <div class="form-main">
            <div>
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item label="用户：">
                        <el-input v-model="query.userName" placeholder="请输入"
                                  clearable
                                  size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位：">
                        <el-select v-model="query.companyId" placeholder="请选择"
                                   size="small">
                            <el-option v-for="item in company" :key="item.id"
                                       :label=item.companyName :value=item.id></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属部门：">
                        <el-select v-model="query.departmentId" placeholder="请选择" size="small">
                            <el-option v-for="item in depart" :key="item.id"
                                       :label=item.departName :value=item.id></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属职位：">
                        <el-select v-model="query.jobId" placeholder="请选择" size="small">
                            <el-option v-for="item in job" :key="item.id"
                                       :label=item.jobName :value=item.id></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-table
                        :data="list"
                        height="300"
                        @select-all="selectAll"
                        @selection-change="selectionChange"
                        empty-text
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="人员"
                            width="88">
                    </el-table-column>
                    <el-table-column
                            prop="companyName"
                            label="所属单位">
                    </el-table-column>
                    <el-table-column
                            prop="departmentName"
                            label="部门">
                    </el-table-column>
                    <el-table-column
                            prop="jobName"
                            label="职位">
                    </el-table-column>
                    <el-table-column
                            prop="mobilePhone"
                            label="手机">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱">
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
        </div>
        <el-dialog width="40%"
                   :title="dialogTitle" :visible.sync="dialogFormVisible">
            <div class="loadImg">
                <el-upload
                        class="avatar-uploader"
                        action="/api/file/uploadImg"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="add.headImg" :src="add.headImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <span v-if="add.headImg" class="update">更改头像</span>
                </el-upload>

            </div>
            <el-form :model="add" label-width="80px" :rules="rules" ref="ruleForm">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="add.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sexId">
                    <el-radio-group v-model="add.sexId">
                        <el-radio :label="1" checked>男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="单位" prop="companyId">
                    <el-select v-model="add.companyId" placeholder="请选择"
                               size="small">
                        <el-option v-for="item in company" :key="item.id"
                                   :label=item.companyName :value=item.id></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="departmentId">
                    <el-select v-model="add.departmentId" placeholder="请选择" size="small">
                        <el-option v-for="item in depart" :key="item.id"
                                   :label=item.departName :value=item.id></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" prop="jobId">
                    <el-select v-model="add.jobId" placeholder="请选择" size="small">
                        <el-option v-for="item in job" :key="item.id"
                                   :label=item.jobName :value=item.id></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="固话" prop="fixPhone">
                    <el-input v-model.number="add.fixPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobilePhone">
                    <el-input v-model.number="add.mobilePhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="add.email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="确定删除用户信息吗?"
                :visible.sync="delDialog"
                width="30%">
            <span slot="footer" class="dialog-footer">
    <el-button @click="delDialog = false">取 消</el-button>
    <el-button type="primary" @click="sureDel">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import {getDepart, getCompany, getJob, getData, addUser, getUser, delUser} from "network/sys";
    import {updateUser} from "../../../network/sys";

    export default {
        name: "SMUser",
        components: {
            ComHead
        },
        data() {
            return {
                title: '用户管理',
                company: [],
                depart: [],
                job: [],
                query: {
                    userName: '',
                    companyId: '',
                    departmentId: '',
                    jobId: ''
                },
                size: 10,
                page: 1,
                total: 0,
                list: [],
                dialogFormVisible: false,
                add: {
                    userId: '',
                    userName: '',
                    headImg: '',
                    sexId: 1,
                    email: '',
                    mobilePhone: '',
                    fixPhone: '',
                    jobId: '',
                    departmentId: '',
                    companyId: '',
                    organizationId: ''
                },

                dialogTitle: '新增人员',
                delDialog: false,
                userId: '',
                rules: {
                    userName: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    sexId: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    departmentId: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    organizationId: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    companyId: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    jobId: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    fixPhone: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ],
                    mobilePhone: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            //网络请求
            getData(page, size,query = {}) {
                getData(page, size,query).then(res => {
                    let data = res.data
                    if (res.code == 200) {
                        this.total = data.count
                        this.list = data.list
                    } else {
                        this.$message.error('服务器崩了');
                    }
                })
            },
            //表格
            onSubmit() {
                this.getData(this.page, this.size, this.query)
            },
            //分页
            handleSizeChange(val) {
                this.size = val
                this.getData(this.page, val)
            },
            handleCurrentChange(val) {
                this.page = val
                this.getData(val, this.size)
            },
            prev(val) {
                this.page = val
                this.getData(val, this.size)
            },
            next(val) {
                this.page = val
                this.getData(val, this.size)
            },
            //新增
            addUser() {
                for (let key in this.add) {
                    this.add[key] = ''
                }
                this.dialogTitle = '新增人员'
                this.dialogFormVisible = true
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//都验证通过
                        if (this.dialogTitle == '新增人员') {
                            addUser(this.add).then(res => {
                                if (res.code == 200) {
                                    for (let key in this.add) {
                                        this.add[key] = ''
                                    }
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.dialogFormVisible = false
                                } else {
                                    this.$message.error('添加失败');
                                    this.dialogFormVisible = false
                                }
                            })
                        } else {
                            updateUser(this.add.userId, this.add.userName, this.add.headImg,
                                this.add.sexId, this.add.email, this.add.mobilePhone,
                                this.add.fixPhone, this.add.jobId, this.add.departmentId,
                                this.add.organizationId, this.add.companyId)
                                .then(res => {
                                    if (res.code == 200) {
                                        this.getData(this.page, this.size)
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                        for (let key in this.add) {
                                            console.log(key)
                                            this.add[key] = ''
                                        }
                                        this.dialogFormVisible = false
                                    } else {
                                        this.$message.error('修改失败');
                                        this.dialogFormVisible = false
                                    }
                                })
                        }

                    } else {//验证失败
                        return false;
                    }
                });
            },
            resetForm(formName) {//取消
                this.dialogFormVisible = false
                this.$refs[formName].resetFields();
            },

            //修改
            handleEdit(index, row) {
                let id = row.userId
                getUser(id).then(res => {
                    if (res.code == 200) {
                        let data = res.data
                        for (let key in this.add) {
                            if (data.hasOwnProperty(key)) {
                                this.add[key] = data[key]
                            }
                        }
                        this.dialogTitle = '修改用户'
                        this.dialogFormVisible = true
                    }

                })
            },
            //图片上传
            handleAvatarSuccess(res, file) {
                this.add.headImg = res
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //删除
            handleDel(index, row) {
                this.delDialog = true
                this.userId = row.userId

            },
            sureDel() {
                delUser(this.userId).then(res => {
                    if (res.code == 200) {
                        this.delDialog = false
                        this.getData(this.page, this.size)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('删除失败');
                    }
                })
            },
            //多选
            selectionChange(selection) {


            },
            //全选
            selectAll(selection) {

            }
        },
        //生命周期
        created() {
            this.getData(this.page, this.size, this.query)
            getDepart().then(res => {
                if (res.code == 200) {
                    this.depart = res.data
                }
            })
            getCompany().then(res => {
                if (res.code == 200) {
                    this.company = res.data
                }
            })
            getJob().then(res => {
                if (res.code == 200) {
                    this.job = res.data
                }
            })
        }

    }
</script>

<style scoped>
    .user {
        background-color: #fff;
    }

    .form-main {
        padding-left: 20px;
    }

    .look {
        color: #1890ff !important;
        padding-right: 10px;
        cursor: pointer;

    }

    .loadImg {
        text-align: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 8px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 64px;
        height: 64px;
        line-height: 64px;
        text-align: center;
    }

    .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
    }

    .update {
        position: relative;
        bottom: 10px;
        color: #1890ff;
        padding-left: 20px;
    }

    .el-form-item {
        margin-bottom: 16px;
    }
</style>