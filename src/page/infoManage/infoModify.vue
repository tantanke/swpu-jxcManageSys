<template>
    <div class="fillcontain" ref="fillcontain">
        <div class="info_container" ref="info_container">
            <el-row class="info_row row" :gutter="10">

            <el-col :span="12">
                <div class="area" v-loading='changepass'>
                    <div class="pwdarea">
                        <p class="title">修改密码</p>
                            <el-form class="form"  :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px">
                            <el-form-item label="原密码" prop="password">
                                <el-input type="password" v-model="pwdForm.password" auto-complete="off" size="mini" placeholder="请输入原密码"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newpassword">
                                <el-input type="password" v-model="pwdForm.newpassword" auto-complete="off" size="mini" placeholder="请输入新密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码" prop="surepassword">
                                <el-input type="password" v-model="pwdForm.surepassword" auto-complete="off" size="mini" placeholder="请输入确认新密码"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="confirmChar">
                                <el-input type="password" v-model="pwdForm.confirmChar" auto-complete="off" size="mini" placeholder="请输入您收到的验证码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
                                <el-button :disabled='emailTag' type="warning" @click="getconfirmChar">{{leftTime}}</el-button>
                                <el-button @click="resetForm('pwdForm')">重置</el-button>
                            </el-form-item>
                            </el-form>
                    </div>
                </div>
            </el-col>

        
            </el-row>
        </div>
    </div>
</template>

<script>
   import * as mutils from '@/utils/mUtils'
	import axios from 'axios'
    export default {
        data(){
             // 附带callback(),是在明确通过验证的情况下去掉输入框上的loading

            // validateField:对部分表单字段进行校验的方法
            let validateNewpassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.pwdForm.surepassword !== '') {
                        this.$refs.pwdForm.validateField('surepassword');
                    }
                    callback();
                }
            };
            let validateSurepassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.pwdForm.newpassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                   callback();
                }
            };
            return {
               pwdForm:{
                   password:'',
                   newpassword:'',
                   surepassword:'',
                   confirmChar:''
               },
               changepass:false,
               leftTime:'获取验证码',
               emailTag:false,
               pwdRules: {
                    password: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                    ],
                    confirmChar: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                    newpassword: [
                        { required: true, validator:validateNewpassword, trigger: 'blur' },
                    ],
                    surepassword: [
                        { required: true, validator:validateSurepassword, trigger: 'blur' },
                    ],
               },

          
            };
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            showUsername(){
                let userinfo = mutils.getStore('userinfo');
                this.infoForm.username = userinfo.username;
            },
            getconfirmChar(){
                axios.get('http://s34bk0g5.dongtaiyuming.net/sendEmail?email=1552832259@qq.com').then(res => {
				console.log(res)
			})
                let leftTimes = 60
                this.emailTag = true
                let timer = setInterval(()=>{
                    leftTimes--
                    this.leftTime = `${leftTimes}s后重发`
                    if(leftTimes<=0) {
                        clearInterval(timer)
                        this.emailTag = false
                    }
                    
                    
                },1000)

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.changepass = true
                        setTimeout(()=>{
                            this.changepass = false
                            this.showMessage('success','修改密码成功~');
                        },500)
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style lang="less" scoped>
    .info_container{
       padding: 20px;
       background: #fff;
       box-sizing: border-box;
       overflow: auto;
    }
     .title{
        text-align:center;
        width:100%;
        height:30px;
        line-height:30px;
        cursor: pointer;
        background-color: #3bc5ff;
        border:1px solid #3bc5ff;
        color: white;
        display: block;
    }
   .info_row{
        .area{
           border:1px solid #dfdfdf;
           height:100%;
           font-size:14px;
           padding:10px;
           .form{
               width:90%;
               margin-top:20px;
           }
        }
   }
</style>


