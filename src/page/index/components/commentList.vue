<template>
    <div class="commentContainer cflex">
        <div class="comment rflex" v-for="(item,index) in commentData" :key="index">
            <div class="right cflex wflex">
               <p class="username">{{item.username}}</p>
               <p class="content">{{item.commentContent}}</p>
               <p class="dateTime"><icon-svg icon-class="icontime" />{{item.role}}</p>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name:'commentList',
    data() {
      return {
        commentData: [{
          username:'谭达科',
          commentContent:'负责前端项目的构建，前端页面的开发以及页面权限控制等',
          role:'西柚之鑫组员'
        },{
          username:'苏杰鑫',
          commentContent:'负责后端项目的构建，数据库的搭建等',
          role:'西柚之鑫组员'
        },{
          username:'沈俊源',
          commentContent:'对项目的需求文档进行分析，设计系统',
          role:'西柚之鑫组员'
        }],
      }
    },
    mounted(){
    },
    methods:{
        // 获取列表数据
        
    }
  }
</script>

<style lang="less" scoped>
 .commentContainer{
   background: #fff;
   padding: 10px;
   box-sizing: border-box;
   height: 407px;
   max-height: 407px;
   overflow: hidden;
   border-radius: 6px;
   justify-content: space-between;
   .comment{
       border-bottom: 1px solid #e8e8e8;
       padding-bottom: 5px;
      .left{
         width:80px;
         text-align: center;
         .userImg{
           width:50px;
           border-radius: 50%;
         }
      }
      .right{
           justify-content: space-between;
           height: 120px;
          .username{
            font-size: 14px;
            font-weight: bold;
          }
          .content{
            font-size: 13px;
            line-height: 20px;
          }
          .dateTime{
             text-align: right;
             font-size: 13px;
             color:#87DE75;
             .svg-icon{
               margin-right: 5px;
             }
          }

      }
   }
 }
</style>