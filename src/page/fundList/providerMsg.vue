<template>
  <div class="fillcontain">
    <div class="contain">
      <div class="table_container">
        <el-button
          type="primary"
          @click="userVisible = true"
          icon="el-icon-plus"
          style="margin-bottom:10px"
          >添加供货商</el-button
        >
        <el-button
          type="success"
          icon="el-icon-download"
          style="margin-bottom:10px"
          @click="exportExcel"
          >导出数据</el-button
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
          <el-table-column property="id" label="供货商编号" align="center">
          </el-table-column>
          <el-table-column
            property="providerName"
            label="供货商类别"
            align="center"
            :filters="cateFilter"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column
            property="username"
            label="供货商代理人"
            align="center"
          >
          </el-table-column>
          <el-table-column property="sex" label="性别" sortable align="center">
          </el-table-column>
          <el-table-column property="phoneNumber" label="手机号" align="center">
          </el-table-column>
          <el-table-column property="email" label="邮件地址" align="center">
          </el-table-column>
          <el-table-column property="eviName" label="证件类型" align="center">
          </el-table-column>
          <el-table-column property="eviNumber" label="证件号码" align="center">
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
    <el-dialog title="添加供货商信息" :visible.sync="userVisible" width="30%">
      <el-form
        :model="addForm"
        :rules="rules"
        v-loading="addLoading"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供货商代理人" prop="username" label-width="130px">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="供货商类别" prop="providerName" label-width="130px">
          <el-select
            v-model="addForm.providerName"
            placeholder="请选择供货商类别"
          >
            <el-option label="供货商1" value="供货商1"></el-option>
            <el-option label="供货商2" value="供货商2"></el-option>
            <el-option label="供货商3" value="供货商3"></el-option>
            <el-option label="供货商4" value="供货商4"></el-option>
            <el-option label="供货商5" value="供货商5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理人性别" prop="sex" label-width="130px">
          <el-radio-group v-model="addForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber" label-width="130px">
          <el-input v-model="addForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮件地址" prop="email" label-width="130px">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="eviName" label-width="130px">
         <el-select
            v-model="addForm.eviName"
            placeholder="请选择证件类型"
          >
            <el-option label="身份证" value="身份证"></el-option>
          </el-select>
          </el-form-item>
        <el-form-item label="证件号码" prop="email" label-width="130px">
          <el-input v-model="addForm.eviNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑供货商信息" :visible.sync="userEditVisible" width="30%">
      <el-form
        :model="editForm"
        :rules="rules2"
        v-loading="editLoading"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
         <el-form-item label="供货商代理人" prop="username" label-width="130px">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="供货商类别" prop="providerName" label-width="130px">
          <el-select
            v-model="editForm.providerName"
            placeholder="请选择供货商类别"
          >
            <el-option label="供货商1" value="供货商1"></el-option>
            <el-option label="供货商2" value="供货商2"></el-option>
            <el-option label="供货商3" value="供货商3"></el-option>
            <el-option label="供货商4" value="供货商4"></el-option>
            <el-option label="供货商5" value="供货商5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理人性别" prop="sex" label-width="130px">
          <el-radio-group v-model="editForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber" label-width="130px">
          <el-input v-model="editForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮件地址" prop="email" label-width="130px">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="eviName" label-width="130px">
         <el-select
            v-model="editForm.eviName"
            placeholder="请选择证件类型"
          >
            <el-option label="身份证" value="身份证"></el-option>
          </el-select>
          </el-form-item>
        <el-form-item label="证件号码" prop="email" label-width="130px">
          <el-input v-model="editForm.eviNumber"></el-input>
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
import { getProviderList,getAllProviderList } from "@/api/user";
import ExportJsonExcel from "js-export-excel";
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
        providerName: "",
        username: "",
        sex: "",
        phoneNumber: "",
        email: "",
        eviName: "",
        eviNumber: "",
      },
      search: "",
      cateFilter: [
        { text: "供货商1", value: "供货商1" },
        { text: "供货商2", value: "供货商2" },
        { text: "供货商3", value: "供货商3" },
        { text: "供货商4", value: "供货商4" },
        { text: "供货商5", value: "供货商5" },
      ],
      loading: true,
      //需要给分页组件传的信息
      userVisible: false,
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        layout: "total, prev, pager, next", // 翻页属性
      },
      addLoading: false,
      addForm: {
        providerName: "",
        username: "",
        sex: "",
        phoneNumber: "",
        email: "",
        eviName: "",
        eviNumber: "",
      },
      editLoading: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        eviNumber: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          { min: 18, max: 18, message: "请输入正确的身份证", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的11位手机号", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
        providerName: [
            { required: true, message: '请选择供货商类别', trigger: 'change' }
          ],
          eviName: [
            { required: true, message: '请选择请选择证件类型', trigger: 'change' }
          ],
           sex: [
            { required: true, message: '请选择代理人性别', trigger: 'change' }
          ],
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        eviNumber: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          { min: 18, max: 18, message: "请输入正确的身份证", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的11位手机号", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
        providerName: [
            { required: true, message: '请选择供货商类别', trigger: 'change' }
          ],
          eviName: [
            { required: true, message: '请选择请选择证件类型', trigger: 'change' }
          ],
           sex: [
            { required: true, message: '请选择代理人性别', trigger: 'change' }
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
            this.tableData = [...this.tableData, {...this.addForm}];
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
            this.loading = true;
            setTimeout(() => {
              this.$message({
                type: "success",
                message: `删除成功`,
              });
              this.tableData.pop();
              this.loading = false;
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
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    getUserList() {
      let para = {
        limit: this.paginations.pageSize,
        page: this.paginations.pageIndex,
      };
      getProviderList(para).then((res) => {
        console.log(res);
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
    exportExcel(){
       let option = {} 
       option.fileName = '供货商信息列表' 
       const data = this.tableData
       option.datas = [{
                sheetData: data,
                sheetHeader: [
                '供货商编号','供货商代理人','性别','手机号','邮件地址','证件类型','供货商类别','证件号码',
                ]
            }];
    // 导出数据
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();     
    }
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
