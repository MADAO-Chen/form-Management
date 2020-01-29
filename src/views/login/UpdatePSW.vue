<template>
    <div class="login">
        <el-form :model="ruleForm" label-width="80px" class="sign" :rules="rules">
            <h3 class="title">修改密码</h3>
            <el-form-item label="旧密码" prop="oldPsw">
                <el-input placeholder="请输入旧密码" v-model="ruleForm.oldPsw" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码"  prop="newPSW">
                <el-input placeholder="请输入新密码" v-model="ruleForm.newPSW" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码"  prop="oncePsw">
                <el-input placeholder="请输入密码" v-model="ruleForm.oncePsw" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="onSubmit">确定</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {updatePSW} from "network/login";
    export default {
        name: "UpdatePSW",
        data() {
            return {
                autoLogin: false,
                ruleForm: {
                    oldPsw: '',
                    newPSW:'',
                    oncePsw:''
                },
                rules: {
                    oldPsw: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    newPSW: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    oncePsw: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            onSubmit(){
                if(this.newPSW !== this.oncePsw){
                    this.newPSW = this.oncePsw = ''
                    this.$message.error('两次密码输入不一致，请重新输入')
                }else{
                    updatePSW(this.oldPsw,this.newPSW).then(res=>{
                        if(res.code == 200){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .login {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #fff;
    }

    .title {
        text-align: center;
        line-height: 3;
    }

    .updata-psw {
        float: right;
        color: #1890ff;
    }

    .sign {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -150px 0 0 -175px;
    }
</style>