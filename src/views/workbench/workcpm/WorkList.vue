<template>
    <div id="workList">
        <div class="form-list">
            <div class="list-head">
                <h3>表单模板</h3>
                <router-link to="'/">更多</router-link>
            </div>
            <ul class="list-body">
                <li v-for="item in templatelist" :key="item.id" @click="watchTemplate(item.id)">
                    <div>{{item.templateName}}</div>
                </li>
            </ul>
        </div>
        <div class="todo-list">
            <div class="list-head">
                <h3>待办事项</h3>
                <router-link to="'/">更多</router-link>
            </div>
            <ul class="todo-body">
                <li class="todo-item" v-for="item in todolist" :key="item.id">
                    <div>{{item.templateName}}</div>
                    <div>{{item.modifyDate}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WorkList",
        props: {
            templatelist: {
                type: Array,
                default() {
                    return []
                }
            },
            todolist: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        methods:{
            watchTemplate(id){
                this.$router.push('/template/templateList?tepId='+id)
            }
        }
    }
</script>

<style scoped>
    #workList {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        margin-top: 10px;
    }

    #workList > div {
        padding: 0 20px;
    }
    .form-list{
        width: 724px;
    }
    .todo-list{
        flex: 1
    }
    .list-head{
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
    }
    .list-body{
        display: flex;
        flex-flow: column wrap;
        height: 378px;
    }
    .list-body>li{
        width: 50%;
        line-height: 54px;
        cursor: pointer;
        height: 54px;
        border-bottom: 1px solid #dedede;
    }
    .todo-body .todo-item{
        display: flex;
        justify-content: space-between;
        line-height: 54px;
        cursor: pointer;
        height: 54px;
        border-bottom: 1px solid #dedede;
    }
</style>