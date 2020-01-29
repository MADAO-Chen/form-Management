<template>
    <div class="form-header">
        <div class="el-icon-s-fold"></div>
        <div class="user-info">
            <i class="el-icon-search search"></i>
            <i class="el-icon-bell bell"></i>
            <img class="user-img" :src="getImg" alt="">
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link user-name">
            {{getName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
                <el-dropdown-item command="updatePsw">修改密码</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            <div>

                <span class=""></span>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "FormHeader",
        computed:{
            getImg(){
                return this.$store.getters.getUser.headImg
            },
            getName(){
                return this.$store.getters.getUser.userName
            }
        },
        methods:{
            handleCommand(command){
                if(command == 'loginout'){
                    this.$cookies.remove('token')
                    this.$router.replace('/login')
                }else{
                    this.$router.replace('/login/update')
                }

            },
        }
    }
</script>

<style scoped>
    .form-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        width: 100%;
        text-align: center;
    }
    .form-header>div:first-child{
        width: 40px;
    }
    .form-header>div:last-child{
        width: 180px;
        display: flex;
        justify-content: space-around;
        padding-right: 40px;
        line-height: 44px;
    }
    .el-icon-s-fold:before,
    .el-icon-search:before,
    .el-icon-bell:before{
        font-size: 20px;
        line-height: 44px;
    }
    .user-img{
        vertical-align: middle;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        margin:10px 10px 0 10px;

    }
    .el-dropdown-link {
        cursor: pointer;
    }
</style>