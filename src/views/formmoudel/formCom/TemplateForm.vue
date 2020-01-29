<template>
    <div class="template-form">
        <el-form label-width="80px" size="small ">
            <div v-for="(item,index) in list" :key="index">
                <el-form-item v-if="item.controlType == 'text_description'"
                              :label="item.labelName"
                              :rules="{ required: item.isRequire}">
                    <el-input :value="item.content" disabled></el-input>
                </el-form-item>
                <el-form-item v-else-if="item.controlType == 'label'"
                              :label="item.labelName"
                              :rules="{ required: item.isRequire}">
                    <el-input :placeholder="item.tip"></el-input>
                </el-form-item>
                <el-form-item v-else-if="item.controlType == 'combox'"
                              :label="item.labelName"
                              :rules="{ required: item.isRequire}">
                    <el-select>
                        <el-option v-for="list in JSON.parse(item.options)" :label="list" :value="list"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.controlType == 'date'"
                              :label="item.labelName"
                              :rules="{ required: item.isRequire}">
                    <el-date-picker v-if="item.isDateRange"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :value-format="item.displayFromat">
                    </el-date-picker>
                    <el-date-picker
                            v-else
                            type="datetime"
                            placeholder="选择日期时间"
                            :value-format="item.displayFromat">
                    </el-date-picker>
                </el-form-item>
                <el-form-item v-else-if="item.controlType == 'image_show'"
                              :label="item.labelName"
                              :rules="{ required: item.isRequire}">
                    <el-image v-for="urlItem in JSON.parse(item.imgUrl)" :key="urlItem.name"
                              style="width: 100px; height: 100px"
                              :src="urlItem.url"
                              fit="fill"></el-image>
                </el-form-item>
                <el-form-item v-else-if="item.controlType == 'image'"
                              :label="item.labelName"
                              :rules="{ required: item.isRequire}">
                    <el-upload
                            class="upload-demo"
                            action="/api/file/uploadImg"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="item.imageCount"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传{{item.imageExt}}文件，且不超过{{item.imageSize}}M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item v-else-if="item.controlType == 'attachment'"
                              :label="item.labelName"
                              :rules="{ required: item.isRequire}">
                    <el-upload
                            class="upload-demo"
                            action="/api/file/uploadAttachmentFile"
                            :on-preview="filePreview"
                            :on-remove="fileRemove"
                            :before-remove="fileBeforeRemove"
                            multiple
                            :limit="item.attachmentCount"
                            :on-exceed="fileExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">
                            只能上传{{item.attachmentCount}}文件，且不超过{{item.attachmentSize}}M
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item v-else-if="item.controlType == 'score'"
                              :label="item.labelName"
                              :rules="{ required: item.isRequire}">
                    <el-rate :value="item.maxNum" :max="item.maxNum"></el-rate>
                </el-form-item>
            </div>
        </el-form>
        <div class="bottom">
            <el-button>取消</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "TemplateForm",
        props: {
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                fileList:[]
            }
        },
        computed: {
            imgUrl() {
                let query = this.list.find(item => item.controlType == 'image_show')
                if (!query) {
                    return false
                } else {
                    return JSON.parse(query.imgUrl)
                }
            }
        },
        methods: {
            handleRemove(file, fileList) {

            },
            handlePreview(file) {

            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            fileRemove(file, fileList) {

            },
            filePreview(file) {

            },
            fileExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            fileBeforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            onSubmit() {

            }
        }

    }
</script>

<style scoped>
    .template-form {
        height: 100%;
        background-color: #fff;
    }

    .el-form {
        height: 500px;
        overflow-y: auto;
        display: flex;
        flex-flow: column wrap;
    }

    .el-form > div {
        width: 50%;
        padding: 0 30px;
    }
    .bottom{
        text-align: right;
        padding-right: 50px;
    }
</style>