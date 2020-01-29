<template>
    <div class="track">
        <div class="head"><h3>已办事项</h3></div>
        <div>
            <el-form :inline="true" :model="title" class="demo-form-inline">
                <el-form-item label="标题：">
                    <el-input v-model="title.name" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit"
                               :keyup.enter="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
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
                    prop="createName"
                    label="发起人"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="发起时间">
            </el-table-column>
            <el-table-column
                    prop="endDate"
                    label="处理完成时间">
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
    import {getEndData} from "network/workStation";

    export default {
        name: "WBHaveDo",
        data() {
            return {
                size: 10,
                page: 1,
                total: 0,
                list: [],
                title:{
                    name:''
                }
            }
        },
        methods: {
            getData(page, size) {
                getEndData(page, size, {}).then(res => {
                    if (res.code == 200) {
                        let data = res.data
                        this.total = data.count
                        this.list = data.list
                    }
                })
            },
            onSubmit(){
                this.getData(this.page,this.size,this.title.name)
            },
            handleClick(tab) {

            },
            handleSizeChange(val) {

            },
            handleCurrentChange(val) {

            },
            prev(val) {

            },
            next(val) {

            },
        },
        created() {
            this.getData(this.page, this.size)
        }
    }
</script>

<style scoped>

</style>