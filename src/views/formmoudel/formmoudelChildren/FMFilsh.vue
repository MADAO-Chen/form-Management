<template>
    <div>
        <com-head :title="title"/>
        <div class="search">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="表单类型：">
                    <el-select v-model="query.templateName" placeholder="请选择">
                        <el-option
                                v-for="item in allKind"
                                :key="item.id"
                                :label="item.templateName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                    :data="list"
                    height="400"
                    empty-text
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="formTemplateName"
                        label="表单类型">
                </el-table-column>
                <el-table-column
                        label="状态">
                    label="操作">
                    <template slot-scope="scope">
                        <span :class="{templatestate : scope.row.state == 'reject'}">{{scope.row.state | formState}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <span class="look" @click="handleEdit(scope.$index, scope.row)">查看详情</span>
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
    </div>

</template>

<script>
    import ComHead from "components/common/ComHead";
    import {tabPages} from "@/mixin/tabMixin";
    import {getTemplateFilshList,getAllTemplateKind} from "network/template";

    export default {
        name: "FMFilsh",
        mixins:[tabPages],
        components:{
            ComHead
        },
        data(){
            return{
                title:'已填写表单列表',
                query:{
                    templateName:''
                },
                allKind:[]
            }
        },
        methods:{
            getData(page,size,query={}){
                getTemplateFilshList(page,size,query).then(res=>{
                    console.log(res)
                    if (res.code == 200) {
                        let data = res.data
                        this.total = data.count
                        this.list = data.list
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    this.$message.error(err)
                })
            },
            onSubmit(){

            },
            handleEdit(index,row){
                this.$router.push('/template/formInstance?formInId='+row.id)
            }
        },
        filters:{
            formState(val){
                switch (val) {
                    case 'end':
                        return '结束'
                    case 'fill':
                        return '已下发'
                    case 'init':
                        return '不知道'
                    case 'reject':
                        return '被退回'
                    case 'pass':
                        return '通过'
                }
            }
        },
        created() {
            getAllTemplateKind().then(res=>{
                if(res.code == 200){
                    this.allKind = res.data
                }
            })
        }
    }
</script>

<style scoped>
.templatestate{
    color: #ffd748;
}
.search{
    background-color: #fff;
    padding: 20px 0 0 20px;
}
    .look{
        color: #1890ff;
        cursor: pointer;
    }
</style>