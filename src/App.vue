<template>
    <div id="app">
        <div class="sidenav">
            <form-nav :menulist="$store.getters.getMenuList"/>
        </div>
        <div class="main">
            <div class="header">
                <form-header/>
            </div>
            <div class="router-view">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
    import FormNav from "components/common/FormNav";
    import FormHeader from "./components/common/FormHeader";
    export default {
        name: 'app',
        components: {
            FormHeader,
            FormNav
        }
    }

</script>
<style>
    @import "assets/css/base.css";
  #app{
    display: flex;
    height: 100%;
      width: 100%;
  }
  .sidenav{
      width: 230px;
      height: 100%;
  }
  .main{
        flex: 1;
      display: flex;
      flex-flow: column nowrap;
      background-color: rgba(240, 242, 245, 1);
  }
  .header{
      height: 64px;
      background-color: #fff;
      margin-bottom: 20px;
  }
    .router-view{
        flex: 1;
        padding: 0 20px;
        position: relative;
        background-color: rgba(240, 242, 245, 1);
    }
    .sidenav .is-active {
        background-color: #1890ff !important;
    }
    .el-dialog__body{
        padding: 6px 20px!important;
    }
    .el-dialog__header{
        border-bottom: 1px solid #dedede;
    }
    .el-step__description{
        color: rgba(0, 0, 0, 0.35) !important;
        line-height: 22px;
    }
</style>
