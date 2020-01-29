<template>
    <div class="track">
        <div class="head"><h3>跟踪事项</h3></div>
        <el-table
                :data="list"
                height="400"
                border
                empty-text
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="templateName"
                    label="标题"
                    width="420">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="发起时间">
            </el-table-column>
            <el-table-column
                    label="操作"
                    >
                <template slot-scope="scope">
                    <span class="look" @click="handleEdit(scope.$index, scope.row)">查看流程</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click='prev'
                    @next-click='next'
                    :current-page="page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getTrackData} from "network/workStation";

    export default {
        name: "WBTrack",
        data(){
            return{
                size:10,
                page:1,
                total:0,
                list:[]
            }
        },
        methods:{
            getData(page,size){
                getTrackData(page,size,{}).then(res=>{
                    if(res.code == 200){
                        let data= res.data
                        this.total = data.count
                        this.list = data.list
                    }
                })
            },
            handleEdit(index,row){
                this.$router.push('/workflow/FPWidth?id='+row.id)
            },
            handleSizeChange(val) {
                this.getData(this.page,val)
            },
            handleCurrentChange(val) {
                this.getData(val,this.size)
            },
            prev(val) {
                this.getData(val,this.size)
            },
            next(val) {
                this.getData(val,this.size)
            },
        },
        created() {
            this.getData(this.page,this.size)
        }
    }
</script>

<style scoped>
.head{
    border-bottom: 1px solid #dedede;
    padding-left: 30px;
    line-height: 60px;
    background-color: #fff;
}
    .look{
        color: #1890ff !important;
        cursor: pointer;
    }
</style>