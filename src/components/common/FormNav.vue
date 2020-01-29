<template>
    <div class="nav">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                        default-active="$route.path"
                        class="el-menu-vertical-demo"
                        background-color="#00284d"
                        text-color="#fff"
                        router
                        active-text-color="#fff">
                    <menu-tree v-for="(item,index) in getMenu" :key="index" :menu="item"/>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import MenuTree from "./MenuTree";
    export default {
        name: "FormNav",
        components: {MenuTree},
        methods:{

        },
        computed:{
            getMenu(){
                return this.$store.getters.getMenu
            }
        }
    }
</script>

<style scoped>
    .nav{
        height: 100%;
        width: 230px;
    }
    .el-row{
        height: 100%;
    }
    .el-col-12 {
        width: 230px;
        height: 100%;
    }
    .el-submenu .el-menu-item {
        height: 40px;
    }
    .el-menu{
        height: 100%;
        overflow-y: auto;
    }

</style>