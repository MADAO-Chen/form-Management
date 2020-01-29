<template>
    <div class="select">
        <div class="title">
            <div class="title-info">
                <span>标题</span>
                <el-checkbox checked disabled>这个是必填项</el-checkbox>
            </div>
            <div class="title-input">
                <el-input v-model="formConfig.labelName"/>
            </div>
            <div>
                <el-switch
                        v-model="formConfig.isRequire"
                        active-text="必选"
                        inactive-text="可选">
                </el-switch>
            </div>
        </div>
        <div class="content">
            <div v-if="index == 0">
                <div class="choose-text">
                    <h3>选项内容</h3>
                </div>
                <div>
                    <div style="padding-bottom: 10px">输入提示</div>
                    <el-input v-model="formConfig.tip"/>
                </div>
            </div>
            <div v-else-if="index == 1">
                <div class="choose-text">
                    <h3>选项内容</h3>
                </div>
                <div>
                    <div >下拉内容
                        <el-button class="add" @click="addDemo" type="primary" size="mini">添加</el-button></div>
                    <el-table :data="tableData" size="mini" highlight-current-row border style="width: 100%"
                              class="el-tb-edit" @current-change="handleCurrentChange"
                              ref="demoTable">       
                        <el-table-column prop="levelOne" label="一级选项名">     
                            <template scope="scope">             
                                <el-input size="mini" v-model="scope.row.levelOne"
                                          placeholder="请输入"></el-input>
                                <span>{{scope.row.levelOne}}</span>           
                            </template>
                        </el-table-column>
                        <el-table-column prop="levelTwo" label="二级选项列表">
                            <template scope="scope">
                                <el-input v-model="scope.row.levelTwo" size="mini"
                                placeholder="逗号分隔"></el-input>
                                                    <span>{{scope.row.levelTwo}}</span>
                            </template>
                                 
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope"> 
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>

                               
                    </el-table>
                </div>
            </div>
            <div v-else-if="index == 2">
                <div class="choose-text">
                    <h3>选项内容</h3>
                </div>
                <div>
                    <div style="padding-bottom: 10px">下拉选项</div>
                    <el-button class="add" @click="addDemo" type="primary" size="mini">添加</el-button>
                <el-table :data="options" size="mini" highlight-current-row border style="width: 100%"
                          class="el-tb-edit" @current-change="handleCurrentChange"
                          ref="demoTable">
                    <el-table-column
                            type="index"
                            width="50">
                    </el-table-column>      
                    <el-table-column prop="levelOne" label="选项名">     
                        <template scope="scope">             
                            <el-input size="mini" v-model="scope.row.option"
                                      placeholder="请输入"></el-input>
                            <span>{{scope.row.option}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope"> 
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
     
                </el-table>
                </div>
            </div>
            <div v-else-if="index == 3">
                <div class="choose-text">
                    <h3>选项内容</h3>
                </div>
                <div style="padding-bottom: 10px">
                    <el-checkbox v-model="formConfig.isDateRange">日期宽度</el-checkbox>
                </div>
                <div style="padding-bottom: 10px">
                    <p>日期格式(yyyy-MM-dd HH:mm:ss) </p>
                    <el-input v-model="formConfig.displayFromat" placeholder="yyyy-MM-dd HH:mm:ss"/>
                </div>
            </div>
            <div v-else-if="index == 4">
                <div class="choose-text">
                    <h3>选项内容</h3>
                </div>
                <div>
                    <div style="padding-bottom: 10px">最小级别</div>
                    <el-select v-model="formConfig.minLevel" placeholder="请选择">
                        <el-option
                                v-for="item in city"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div v-else-if="index == 5">
                <div class="choose-text">
                    <h3>选项内容</h3>
                </div>
                <div>
                    <div style="padding-bottom: 10px">图片大小（M）</div>
                    <el-input-number v-model="formConfig.imageSize"
                                     :precision="2" :step="0.1" :max="10"></el-input-number>
                    <div style="padding-bottom: 10px">图片数量</div>
                    <el-input-number v-model="formConfig.imageCount" :min="1" :max="10"></el-input-number>
                    <div style="padding-bottom: 10px">图片格式</div>
                    <p>默认为（jpg,png,gif,bmp,tiff）</p>
                    <el-input v-model="formConfig.imageExt" placeholder="jpg,png,gif,bmp,tiff"></el-input>
                </div>
            </div>
            <div v-else-if="index == 6">
                <div class="choose-text">
                    <h3>选项内容</h3>
                </div>
                <div>
                    <div style="padding-bottom: 10px">附件大小（M）</div>
                    <el-input-number v-model="formConfig.attachmentSize"
                                     :precision="2" :step="0.1" :max="10"></el-input-number>
                    <div style="padding-bottom: 10px">附件数量</div>
                    <el-input-number v-model="formConfig.attachmentCount" :min="1" :max="10"></el-input-number>
                </div>
            </div>
            <div v-else-if="index == 7">
                <div class="choose-text">
                    <h3>选项内容</h3>
                </div>
                <div>
                    <div style="padding-bottom: 10px">最大分值</div>
                    <el-input-number v-model="formConfig.maxNum" :min="1" :max="10"></el-input-number>
                </div>
            </div>
        </div>
        <div class="foot">
            <el-button  type="primary" class="sure" @click="sure">确定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputConfig",
        props:{
            index:{
                type:Number,
                default:null
            }
        },
        data(){
            return{
                options:[],
                multiOptions:[],
                city:[
                    {
                        value: '1',
                        label: '省'
                    },
                    {
                        value: '2',
                        label: '市'
                    },{
                        value: '3',
                        label: '区'
                    },
                ],
                tableData: [],
                currentRow: null,
                formConfig:{
                    controlType: "",
                    colNo:0,
                    rowNo:0,
                    operate: 'add',
                    labelName: "",
                    tip: null,
                    isRequire: true,
                    isMultiline: false,
                    options: null,
                    multiOptions: null,
                    minLevel: null,
                    attachmentSize: null,
                    attachmentCount: null,
                    imageSize: null,
                    imageCount: null,
                    imageExt: null,
                    maxNum: null,
                    isDateRange: null,
                    displayFromat: null,

                },
                linkSelect:''
            }
        },
        methods:{
            sure(){
                    switch (this.index) {
                        case 0:
                            this.formConfig.controlType='label'
                            this.formConfig.imageExt=null
                            break
                        case 1:
                            this.formConfig.controlType='multi_combox'
                            break
                        case 2:
                            this.formConfig.controlType='combox'
                            this.formConfig.options = this.comboxOps
                            break
                        case 3:
                            this.formConfig.controlType='date'
                            this.formConfig.displayFromat = 'yyyy-MM-dd HH:mm:ss'
                            break
                        case 4:
                            this.formConfig.controlType='city'
                            break
                        case 5:
                            this.formConfig.controlType='image'
                            this.formConfig.imageExt = 'jpg,png,gif,bmp,tiff'
                            break
                        case 6:
                            this.formConfig.controlType='attachment'
                            break
                        case 7:
                            this.formConfig.controlType='score'
                            this.formConfig.maxNum = 5
                            break
                    }
                    this.$emit('sure',this.formConfig)
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    })

            },
            addDemo() {
                if(this.index == 1){
                    let d = {
                        levelOne: '',
                        levelTwo: '',
                    };
                    this.tableData.push(d);
                    setTimeout(() => {
                        this.$refs.demoTable.setCurrentRow(d);
                    }, 10);
                }else if(this.index == 2){
                    let d = {
                        option: ''
                    };
                    this.options.push(d);
                    setTimeout(() => {
                        this.$refs.demoTable.setCurrentRow(d);
                    }, 10);
                }

            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            handleDelete(index, r) {
                if(this.index == 1){
                    this.tableData.splice(index, 1)
                }else if(this.index == 2){
                    this.options.splice(index, 1)
                }

            },
        },
        computed:{
            comboxOps(){
                let arr = this.options.map(item=>{
                    return item.option
                })
               let str ='['+ arr.toString() +']'
                return str
            }
        }
    }
</script>

<style scoped>
    .select{
        height: 100%;
        display: flex;
        padding: 10px 20px;
        flex-flow: column wrap;
    }
    .content{
        flex: 1;
    }
    .title{
        height: 80px;
    }
.title-info{
   display: flex;
    justify-content: space-between;
}
.choose-text{
    padding: 10px 0;
}
    .foot{
        height: 40px;
        text-align: center;
    }
    .el-tb-edit .el-input,
    .el-tb-edit .el-input-number,
    .el-tb-edit .el-select {
        display: none;
        width: 100%;
    }

    .el-tb-edit .current-row .el-input,
    .el-tb-edit .current-row .el-input-number,
    .el-tb-edit .current-row .el-select {
        display: inherit;
    }

    .el-tb-edit .current-row .el-input + span,
    .el-tb-edit .current-row .el-input-number + span,
    .el-tb-edit .current-row .el-select + span {
        display: none;
    }
</style>