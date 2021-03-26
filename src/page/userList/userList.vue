<template>
  <div class="fillcontain">
    <div class="contain">
      <div class="table_container">
        <el-button
          type="primary"
          @click="userVisible = true"
          icon="el-icon-plus"
          style="margin-bottom:10px"
          >添加用户</el-button
        >
        <el-table
          v-loading="loading"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.username.toLowerCase().includes(search.toLowerCase())
            )
          "
          border
          stripe
          highlight-current-row
          header-cell-class-name="table-header-class"
          style="width:100%"
        >
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">
              <span
                >{{
                  scope.$index +
                    (paginations.pageIndex - 1) * paginations.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column property="username" label="用户姓名" align="center">
          </el-table-column>
          <el-table-column property="email" label="邮箱地址" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
            <template slot-scope="scope">
              <el-button @click="userEditVisible = true" type="warning"
                >编辑</el-button
              >
              <el-button @click="deleteUser(scope.row)" type="danger"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="8">
            <div class="pagination">
              <el-pagination
                v-if="paginations.total > 0"
                :page-size="paginations.pageSize"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page="paginations.pageIndex"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="添加用户" :visible.sync="userVisible" width="30%">
      <el-form
        :model="addForm"
        :rules="rules"
        v-loading="addLoading"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input v-model="addForm.confirmPass"></el-input>
        </el-form-item>
        <el-form-item label="邮箱号" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="userEditVisible" width="30%">
      <el-form
        :model="editForm"
        :rules="rules2"
        v-loading="editLoading"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="新用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPass">
          <el-input v-model="editForm.confirmPass"></el-input>
        </el-form-item>
        <el-form-item label="新邮箱号" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱！"));
      } else if (!re.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      userEditVisible: false,
      tableData: [],
      editForm: {
        username: "",
        password: "",
        email: "",
        confirmPass: "",
      },
      search: "",
      loading: true,
      //需要给分页组件传的信息
      userVisible: false,
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 10, // 1页显示多少条
        layout: "total, prev, pager, next", // 翻页属性
      },
      addLoading: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        confirmPass: "",
      },
      editLoading: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPass: [
          ,
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPass: [
          ,
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getUserList();
  },
  methods: {
    addUser() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.addLoading = true;
          setTimeout(() => {
            this.tableData = [...this.tableData, this.addForm];
            this.paginations.total++;
            this.userVisible = false;
            this.addLoading = false;
            this.$message.success("添加成功");
          }, 500);
        } else {
          this.$message.error("请输入正确的表单！");
          return false;
        }
      });
    },
    editUser() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.editLoading = true;
          setTimeout(() => {
            this.tableData.pop();
            this.tableData.push(this.editForm);
            this.userEditVisible = false;
            this.editLoading = false;
            this.$message.success("添加成功");
          }, 500);
        } else {
          this.$message.error("请输入正确的表单！");
          return false;
        }
      });
    },
    deleteUser(data) {
      this.$alert("确定删除该用户吗？", "删除用户", {
        confirmButtonText: "确定",
        callback: (action) => {
          if (action === "confirm") {
              this.loading = true
            setTimeout(() => {
              this.$message({
                type: "success",
                message: `删除成功`,
              });
              this.tableData.pop();
              this.loading = false
            }, 500);
          } else {
            this.$message({
              type: "warning",
              message: `删除取消`,
            });
          }
        },
      });
    },
    getUserList() {
      let para = {
        limit: this.paginations.pageSize,
        page: this.paginations.pageIndex,
      };
      getUserList(para).then((res) => {
        this.loading = false;
        this.paginations.total = res.data.total;
        this.tableData = res.data.userList;
      });
    },
    // 每页多少条切换
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getUserList();
    },
  },
};
</script>

<style lang="less" scoped>
.fillcontain {
  padding-bottom: 0;
}
.contain {
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
}
.pagination {
  padding: 10px 20px;
  text-align: right;
}
</style>
