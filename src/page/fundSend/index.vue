<template>
  <div class="fillcontain">
    <div class="contain">
      <div class="table_container">
        <el-button
          type="primary"
          @click="userVisible = true"
          icon="el-icon-plus"
          style="margin-bottom:10px"
          >添加销售信息</el-button
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
          <el-table-column property="id" label="销售编号" align="center">
          </el-table-column>
         <el-table-column property="name" label="商品名称" align="center">
          </el-table-column>
          <el-table-column property="number" label="销售数量" align="center">
          </el-table-column>
          <el-table-column property="price" label="销售单价" align="center">
          </el-table-column>
          <el-table-column property="total" label="销售总价" align="center">
            <template slot-scope="scope">
              {{scope.row.number * scope.row.price}}
            </template>
          </el-table-column>
          <el-table-column property="dateTime" label="销售日期" align="center">
          </el-table-column>
          <el-table-column property="phoneNumber" label="买家手机" align="center">
          </el-table-column>
          <el-table-column property="email" label="买家邮箱" align="center">
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
        <el-form-item label="商品名称" prop="name">
          <el-select v-model="addForm.name" placeholder="请选择供货商类别">
            <el-option label="手工艺品" value="手工艺品"></el-option>
            <el-option label="口红" value="口红"></el-option>
            <el-option label="眼霜" value="眼霜"></el-option>
            <el-option label="洗面奶" value="洗面奶"></el-option>
            <el-option label="精华" value="精华"></el-option>
            <el-option label="显卡" value="显卡"></el-option>
            <el-option label="手机" value="手机"></el-option>
            <el-option label="耳机" value="耳机"></el-option>
            <el-option label="笔记本" value="笔记本"></el-option>
            <el-option label="茶叶" value="茶叶"></el-option>
            <el-option label="水杯" value="水杯"></el-option>
            <el-option label="衣服" value="衣服"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售数量" prop="number">
          <el-input v-model="addForm.number"></el-input>
        </el-form-item>
        <el-form-item label="销售单价" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="销售日期" prop="dateTime">
          <el-date-picker
              v-model="addForm.dateTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="买家手机" prop="phoneNumber">
          <el-input v-model="addForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="买家邮箱" prop="email">
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
        <el-form-item label="商品名称" prop="name">
          <el-select v-model="editForm.name" placeholder="请选择供货商类别">
            <el-option label="手工艺品" value="手工艺品"></el-option>
            <el-option label="口红" value="口红"></el-option>
            <el-option label="眼霜" value="眼霜"></el-option>
            <el-option label="洗面奶" value="洗面奶"></el-option>
            <el-option label="精华" value="精华"></el-option>
            <el-option label="显卡" value="显卡"></el-option>
            <el-option label="手机" value="手机"></el-option>
            <el-option label="耳机" value="耳机"></el-option>
            <el-option label="笔记本" value="笔记本"></el-option>
            <el-option label="茶叶" value="茶叶"></el-option>
            <el-option label="水杯" value="水杯"></el-option>
            <el-option label="衣服" value="衣服"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售数量" prop="number">
          <el-input v-model="editForm.number"></el-input>
        </el-form-item>
        <el-form-item label="销售单价" prop="price">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="销售日期" prop="dateTime">
          <el-date-picker
              v-model="editForm.dateTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="买家手机" prop="phoneNumber">
          <el-input v-model="editForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="买家邮箱" prop="email">
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
import { getSentList } from "@/api/user";
import Mock from "mockjs";
export default {
  data() {
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
        id:"",
        total:"",
        name: "",
        number: "",
        price: "",
        dateTime: "",
        phoneNumber:'',
        email:''
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
        id:"",
        total:"",
        name: "",
        number: "",
        price: "",
        dateTime: "",
        phoneNumber:'',
        email:''
      },
      editLoading: false,
      rules: {
        phoneNumber: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入商品单价", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
         name: [
            { required: true, message: '请选择商品名称', trigger: 'change' }
          ],
          dateTime: [
            { required: true, message: '请选择销售日期', trigger: 'change' }
          ],
      },
      rules2: {
        phoneNumber: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入商品单价", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
         name: [
            { required: true, message: '请选择商品名称', trigger: 'change' }
          ],
          dateTime: [
            { required: true, message: '请选择销售日期', trigger: 'change' }
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
          this.addForm.id = Mock.Random.guid()
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
            let uid = this.tableData.pop().id;
            this.editForm.id = uid
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
      getSentList(para).then((res) => {
          console.log(res)
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