<template>
    <div class="head">
        <div class="left"><h2>{{title}}</h2></div>
        <div class="right"><slot></slot></div>
    </div>
</template>

<script>
    export default {
        name: "ComHead",
        props:{
            title:{
                type:String,
                default:''
            }
        }
    }
</script>

<style scoped>
.head{
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #dedede;
}
    .left{
        width: 400px;
        padding-left: 20px;
    }
    .right{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 40px;
    }
</style>