<template>
    <div id="work">
        <work-head :workTotal="workTotal"/>
        <work-list :templatelist="templateList" :todolist="toDoList"/>
    </div>
</template>

<script>
    import {getWorkStationData} from "network/workStation";
    import WorkHead from "./workcpm/WorkHead";
    import WorkList from "./workcpm/WorkList";
    export default {
        name: "WorkBench",
        components:{
            WorkHead,
            WorkList
        },
        data(){
            return{
                workTotal:{},
            }
        },
        methods:{

        },
        computed:{
          templateList(){
              return this.workTotal.formTemplateList
          },
            toDoList(){
                return this.workTotal.scheduleDtoList
            }
        },
        created(){
            getWorkStationData().then(res =>{
                this.workTotal = res.data
            })
        }
    }
</script>

<style scoped>
    #work{

    }
</style>