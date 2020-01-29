<template>
    <div class="login">
        <el-form :model="ruleForm" label-width="80px" class="sign" :rules="rules">
            <h3 class="title">登录</h3>
            <el-form-item label="用户名"  prop="name">
                <el-input v-model.number="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="psw">
                <el-input placeholder="请输入密码" v-model="ruleForm.psw" show-password></el-input>
            </el-form-item>
            <el-form-item label="自动登录">
                <el-switch v-model="autoLogin"
                           active-value="true"
                           inactive-value="false"></el-switch>
                <router-link to="/login/updataPs"  class="updata-psw">修改密码</router-link>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="onSubmit">立即登录</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login,getList} from "network/login";

    export default {
        name: "Login",
        data() {
            return {
                autoLogin: false,
                ruleForm: {
                    name: '',
                    psw: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    psw: [
                        { required: true, message: '请输入正确密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                login(this.ruleForm.name,this.ruleForm.psw,this.autoLogin).then( res => {
                    console.log(res)
                    if(res.code == 200){
                        this.$cookies.set('token',res.data.token)
                        this.$store.commit('setToken',res.data.token)
                        let userInfo = res.data.userInfo
                        this.$store.dispatch('updateUserInfo',userInfo)

                        getList().then(res=>{
                            if(res.code == 200){
                                this.$store.dispatch('menuObj',res.data)
                                this.$router.replace('/workstation')
                            }else{

                            }
                        }).catch(err=>{

                        })
                    }else{

                    }

                }).catch(err=>{

                })
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
    .title{
        text-align: center;
        line-height: 3;
    }
    .updata-psw{
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