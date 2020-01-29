<template>
    <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.id+''">
        <template slot="title">
            <div @click="handleRoute(menu)">
                <i class="el-icon-menu"></i>
                <span slot="title">{{menu.authName}}</span>
            </div>
        </template>
        <menu-tree v-for="item in menu.children" :key="item.id" :menu="item"/>
    </el-submenu>
    <el-menu-item v-else :index="menu.id+''" @click="handleRoute(menu)">
        <i class="el-icon-menu"></i>
        <span slot="title">{{menu.authName}}</span>
    </el-menu-item>
</template>

<script>
    export default {
        name: 'MenuTree',
        props: {
            menu: {
                type: Object,
                required: true
            }
        },
        methods: {
            handleRoute (menu) {
                // 通过菜单URL跳转至指定路由
                this.$router.push(menu.authCode)
            }
        }
    }
</script>
<style scoped>

</style>