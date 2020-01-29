<template>
    <div class="work-head">
        <router-link tag="div" to="/workstation/WBToDo">
            <div class="icon"><img src="~assets/img/icon.png" alt=""></div>
            <div class="info">
                <p class="text">我的待办</p>
                <p class="num">{{workTotal.scheduleCount}}<span class="xiang">项</span></p>
            </div>
        </router-link>
        <router-link tag="div" to="/workstation/WBTrack">
            <div class="icon"><img src="~assets/img/icon.png" alt=""></div>
            <div class="info">
                <p class="text">跟踪事项</p>
                <p class="num">{{workTotal.countTrack}}<span class="xiang">项</span></p>
            </div>
        </router-link>
        <router-link tag="div" to="/workstation/WBHaveDo">
            <div class="icon"><img src="~assets/img/icon.png" alt=""></div>
            <div class="info">
                <p class="text">已办事项</p>
                <p class="num">{{workTotal.workDoneCount}}<span class="xiang">项</span></p>
            </div>
        </router-link>
        <router-link tag="div" to="/statistics">
            <div class="icon"><img src="~assets/img/icon.png" alt=""></div>
            <div class="info">
                <p class="text">表单数</p>
                <p class="num">{{workTotal.formCount}}<span class="xiang">项</span></p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "WorkHead",
        props:{
            workTotal:{
                type:Object,
                default(){
                    return{}
                }
            }
        }
    }
</script>

<style scoped>
    .work-head{
        height: 105px;
        display: flex;
        justify-content: space-between;

    }
    .work-head>div{
        width: 24%;
        display: flex;
        background-color: #fff;
        align-items: center;
        padding: 0 20px;
        cursor: pointer;
    }
    .icon{
        width: 68px;
        height: 68px;
    }
    .icon>img{
        width: 100%;
    }
    .info{
        height: 68px;
        padding-left: 20px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
    }
    .text{
        color: #dedede;
    }
    .num{
        font-size: 24px;
    }
    .num>.xiang{
        font-size: 16px;
    }
</style>