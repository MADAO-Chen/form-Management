<template>
    <div class="track">
        <com-head :title="headTitle">
            <el-button @click="newMoudel">新建模板</el-button>
        </com-head>
        <div class="search">
            <el-form :inline="true" :model="title" class="demo-form-inline">
                <el-form-item label="模板名称：">
                    <el-input v-model="title.name" placeholder="请输入模板"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit"
                               :keyup.enter="onSubmit">查询
                    </el-button>
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
                    label="模板名称">
            </el-table-column>
            <el-table-column
                    label="状态">
                <template slot-scope="scope">
                    <span
                    >{{scope.row.state | useState}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <span class="look" @click="updateTemplate(scope.$index, scope.row)">修改</span>
                    <span class="look" @click="sendTemplate(scope.$index, scope.row)">下发</span>
                    <span class="look" @click="submitTemplate(scope.$index, scope.row)">提交</span>
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
    import {getTemplateList,getTemplate,sendTempalte} from "network/template";
    import ComHead from "components/common/ComHead";
    export default {
        name: "FormMoudel",
        components:{
            ComHead
        },
        data() {
            return {
                size: 10,
                page: 1,
                total: 0,
                list: [],
                title: {
                    name: ''
                },
                headTitle:'表单管理模板列表',
                id:0
            }
        },
        filters:{
            useState(val){
                switch (val) {
                    case 'use':
                        return '已下发'
                    case 'end':
                        return '结束'
                    case 'lock':
                        return '已发布'
                    case 'free':
                        return '已提交'
                    case 'null':
                        return '已失效'
                }
            }
        },
        methods: {
            getData(page, size) {
                getTemplateList(page, size, {}).then(res => {
                    if (res.code == 200) {
                        let data = res.data
                        this.total = data.count
                        this.list = data.list
                    }
                })
            },
            onSubmit() {
                this.getData(this.page, this.size, this.title.name)
            },

            updateTemplate(index,row){
                this.id = row.id
                this.$router.push('/template/templateList/update?id='+this.id)
            },
            sendTemplate(index,row){

            },
            submitTemplate(index,row){
                sendTempalte(row.id).then(res=>{
                    if(res.code == 200 ){
                        this.getData(this.page,this.size)
                    }
                })
            },
            newMoudel(){
              this.$router.push('/template/templateList/newMoudel')
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
            this.getData(this.page, this.size,{})
        }
    }
</script>

<style scoped>
    .search{
        background-color: #fff;
        padding: 20px 0 0 20px;
    }
.look{
    color: #1890ff;
    cursor: pointer;
    padding-right: 20px;
}

</style>