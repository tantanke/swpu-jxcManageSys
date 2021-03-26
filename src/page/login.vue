<template>
  	<div class="login_page">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer">
			     <div class='titleArea rflex'>
					<img class="logo" :src="logo" alt="小爱admin">
					<span class='title'>进销存管理系统</span>
				</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
					<el-form-item prop="username" class="login-item">
					    <span class="loginTips"><icon-svg icon-class="iconuser" /></span>
						<el-input @keyup.enter.native ="submitForm('loginForm')"  class="area" type="text" placeholder="用户名" v-model="loginForm.username" ></el-input>
					</el-form-item>
					<el-form-item prop="password" class="login-item"> 
					    <span class="loginTips"><icon-svg icon-class="iconLock" /></span>
						<el-input @keyup.enter.native ="submitForm('loginForm')" class="area" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item > 
						<el-input  type="text" placeholder="请输入验证码" v-model="email"></el-input>
						<el-button :disabled='disabled' type="warning" @click='subEmail' class="emailBtn">{{text}}</el-button>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import logoImg from "@/assets/img/shiyou.jpg";
	import { login } from "@/api/user";
    import { setToken } from '@/utils/auth'
	import axios from 'axios'

	export default {
	    data(){
			return {
				logo:logoImg,
				loginForm: {
					username: '',
					password: ''
				},
				email:'',
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				text:'确定发送',
				disabled:false

			}
		},
		mounted(){
			
		},
		methods: {
			loginByWechat(){
			},
			subEmail(){
				this.disabled = true
				if(this.loginForm.username === 'admin'){
                   axios.get('http://s34bk0g5.dongtaiyuming.net/sendEmail?email=1552832259@qq.com').then(res => {
				console.log(res)
			})
				} else{
					 axios.get('http://s34bk0g5.dongtaiyuming.net/sendEmail?email=tandake2000@163.com').then(res => {
				console.log(res)
			})
				}
				
			let time = 60
			
			this.text = `${time}s后重发`
			let timer = setInterval(()=>{
				this.text = `${time}s后重发`
				
				time--
				if(time<=0){
					clearInterval(timer)
					this.disabled = false
				}
			},1000)
			},
			showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
		    submitForm(loginForm) {
				this.$refs[loginForm].validate((valid) => {
					if (valid) {
						let userinfo = this.loginForm;
						if(this.email.length<=0){
							this.$message.warning('请输入正确的验证码')
							return
						}
						login(userinfo).then(res => {
							let userList = res.data.userList;
							setToken("Token",userList.token)
							this.$router.push({ path: '/' })
							this.$store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态
						})
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.login_page{
		position: absolute;
		width: 100%;
		height: 100%;
		background: url(../assets/img/bg9.jpg) no-repeat center center;
		background-size: 100% 100%;
	}
	.form_contianer{
		position: absolute;
		top: 50%;
        left: 50%;
		transform: translate(-50%,-50%);
		background: #fff;
		width:370px;
		border-radius: 5px;
		padding: 25px;
		text-align: center;
		.titleArea{
			justify-content: center;
   			align-items: center;
			text-transform: uppercase;
			font-size: 22px;
			width: 100%;
			padding-bottom: 20px;
			.logo{
				width: 40px;
    			margin-right: 10px;
			}
			.title{
				i{
				   color: #FF6C60;
				}
			}
		}
	
		.loginForm{
			.submit_btn{
				width: 100%;
				padding:13px 0;
				font-size: 16px;
			}
			.loginTips{
				position: absolute;
				left: 10px;
				z-index: 20;
				// color: #FF7C1A;
				font-size: 18px;
				top: 50%;
				transform: translateY(-50%);
			}
	    }
	}

	.manage_tip{
		margin-bottom:20px;
		.title{
			font-family: cursive;
			font-weight: bold;
			font-size: 26px;
			color:#fff;
		}
		.logo{
			width:60px;
			height:60px;
		}
	}
	
	.tiparea{
		text-align:left;
		font-size: 12px;
		color: #4cbb15;
		padding: 10px 0;
		.tip{
			margin-left: 54px;
		}
	}
	
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
	.loginForm{
		.el-button--primary{
			background-color:#FF7C1A;
			border:1px solid #FF7C1A;
		}
	}
	.emailBtn{
		position: relative;
		top: -36px;
		height: 36px;
		left: 158px;
	}
	.sanFangArea{
		border-top: 1px solid #DCDFE6;
		padding: 10px 0;
		display: none;
		.title{
			font-size: 14px;
			color: #8b9196;
			margin-bottom: 10px;
		}
		ul{
			li{
				flex:1;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				.svg-icon{
					font-size: 24px;
				}
			}
		}
	}
</style>
