<template>
    <div class="palyer">
        <com-head :title="title">
            <el-button type="primary" icon="el-icon-plus"
                       @click="addRole">新增角色
            </el-button>
        </com-head>
        <div>
            <div class="query">
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item label="角色名称：">
                        <el-input v-model="query.roleName" placeholder="请输入"
                                  clearable
                                  size="small"></el-input>
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
                            type="index"
                            label="序号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="roleName"
                            label="角色名称"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="authNames"
                            label="权限名称"
                            width="700">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <span class="look" @click="handleEdit(scope.$index, scope.row)">编辑</span>
                            <span class="look" @click="handleDel(scope.$index, scope.row)">删除</span>
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible"
                    width="30%">
            <el-form :model="add" label-width="100px">
                <el-form-item label="角色名称" >
                    <el-input v-model="add.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限名称：">
                    <div v-for="(level,index) in auth" :key="index">
                        <el-checkbox v-model="level.checkAll"
                                     @change="TemplateCheckAll(index)">{{level.authName}}</el-checkbox >
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="level.checked" @change="TemplateCheckedItem(index)">
                            <el-checkbox v-for="item in level.authList" :key="item.authId"
                                         :label="item.authId" >{{item.authName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAdd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="确定删除用户信息吗?"
                :visible.sync="delDialog"
                width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="delDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureDel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import ComHead from "components/common/ComHead";
    import {getRoleData,getAuth,addRole,getRoleMes,updateRole,delRole} from "network/role";
    import {tabPages} from "@/mixin/tabMixin";

    export default {
        name: "SMplayer",
        components: {
            ComHead
        },
        mixins: [tabPages],
        data() {
            return {
                title: '角色管理',
                query: {
                    roleName: ''
                },
                dialogFormVisible:false,
                delDialog:false,
                dialogTitle:'新增人员',
                add:{
                    roleName:'',
                    authList:[]
                },
                auth:[],
                roleId : 0,
                currRole:{
                    name:'',
                    list:[]
                },
                updateRole:{
                    roleName:'',
                    updateList:[]
                }
            }
        },
        methods: {
            //网络请求
            getData(page, size) {
                getRoleData(page, size, {}).then(res => {
                    if (res.code == 200) {
                        let data = res.data
                        this.total = data.count
                        this.list = data.list
                    }else{
                        this.$message.error('数据获取失败')
                    }
                }).catch(err =>{
                    this.$message.error(err)
                })
            },
            //添加
            addRole(){
              this.dialogTitle = '新增人员'
              this.dialogFormVisible = true
            },
            //计算选中框，格式化请求列表
            comQuery(){
                let query = []
                this.auth.forEach(item => {
                    if(!item.authList.length){//没有子菜单
                        if(item.checkAll){//选择
                            let obj = {
                                id:null,
                                operate:'',
                                authId:item.id,
                                authName:item.authName
                            }
                            query.push(obj)
                        }
                    }else{//有子菜单
                        if(item.checked.length){//有选择菜单
                            // query.push({
                            //     id:null,
                            //     operate:'',
                            //     authId:item.id,
                            //     authName:item.authName
                            // })
                            item.authList.forEach(list =>{
                                let flag =item.checked.some(checkedItem => list.authId == checkedItem)
                                if(flag){
                                    let obj = {
                                        id:null,
                                        operate:'',
                                        authId:list.authId,
                                        authName:list.authName
                                    }
                                    query.push(obj)
                                }
                            })
                        }
                    }
                })
                return query
            },
            sureAdd(){
                this.add.authList =  this.comQuery()
                if(this.dialogTitle == '新增人员'){
                    addRole(this.add.roleName, this.add.authList).then(res=>{
                        if(res.code == 200){
                            this.getData(this.page,this.size)
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                            this.add.authList = []
                        }else{
                            this.$message.error('添加失败');
                            this.dialogFormVisible = false
                            this.add.authList = []
                        }
                    })
                }else {
                    this.flagBeforeUpdate()
                    updateRole(this.roleId,this.updateRole.roleName,this.updateRole.updateList).then(res=>{
                        if(res.code == 200){
                            console.log( this.updateRole.updateList)
                            this.getData(this.page,this.size)
                            this.updateRole.updateList=[]
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                        }else{
                            this.updateRole.updateList=[]
                            this.$message.error('修改失败');
                            this.dialogFormVisible = false
                        }
                    })


                }

            },
            //查询
            onSubmit() {

            },
            //获得当前角色选中框
            getChecked(){
              this.auth.forEach(list =>{
                  if(!list.authList.length){//没有子级菜单
                      list.checkAll = this.currRole.list.some(item => item.authId == list.id)
                  }else{
                      list.authList.forEach(listItem =>{
                         let item = this.currRole.list.find(currItem =>listItem.authId === currItem.authId)
                          if(item){
                              list.checked.push(item.authId)
                          }
                      })
                      list.checkAll = list.checked.length === list.authList.length

                  }
              })
            },
            //修改
            handleEdit(index,row) {
                this.roleId = row.id
                this.dialogTitle = '修改角色信息'
                getRoleMes(this.roleId).then(res=>{
                   if(res.code == 200){
                       this.currRole.name=res.data.roleName
                       this.currRole.list = res.data.authList
                       this.getChecked()
                       this.updateRole.roleName = this.currRole.name
                   }
                })
                this.dialogFormVisible = true
            },

            //跟一开始权限表做对比
            flagBeforeUpdate(){
               let list = this.comQuery()
                //如果是删除
                this.currRole.list.forEach(item => {
                    let flag = list.some(checked => checked.authId === item.authId)
                    if(!flag){
                        item.operate = 'delete'
                        this.updateRole.updateList.push(item)
                    }
                })
                //如果是添加
                list.forEach(item => {
                    let flag = this.currRole.list.some(checked => checked.authId === item.authId)
                    if(!flag){
                        item.operate = 'add'
                        this.updateRole.updateList.push(item)
                    }
                })
            },
            //删除
            handleDel(index,row) {
                this.roleId =row.id
                this.delDialog = true
            },
            sureDel(){
                delRole(this.roleId).then(res =>{
                    if (res.code == 200) {
                        this.delDialog = false
                        this.getData(this.page, this.size)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(res.msg);
                        this.delDialog = false
                    }
                })
            },
            //计算全选全不选
            TemplateCheckAll(index) {
                if(this.auth[index].checkAll){
                    this.auth[index].checked = this.auth[index].authList.map(res =>res.authId)
                }else{
                    this.auth[index].checked = []
                }

            },
            TemplateCheckedItem(index) {
               this.auth[index].checkAll =  this.auth[index].checked.length ==  this.auth[index].authList.length
            }

        },
        created() {
            getAuth().then(res=>{
                if(res.code == 200){
                    let data = res.data
                    this.auth = data.map(item => {
                        item.checkAll = false
                        item.checked = []
                        return item
                    })
                }

            })
        }
    }
</script>

<style scoped>
    .query {
        background-color: #fff;
        padding: 20px 0 0 20px;
    }

    .look {
        color: #1890ff !important;
        padding-right: 10px;
        cursor: pointer;

    }
</style>