<template>
  <div class="fillcontain">
    <div class="contain">
      <div class="table_container">
        <el-button
          type="primary"
          @click="userVisible = true"
          icon="el-icon-plus"
          style="margin-bottom:10px"
          >添加仓库</el-button
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
          <el-table-column property="id" label="仓库编号" align="center">
          </el-table-column>
          <el-table-column property="address" label="仓库地址" align="center">
          </el-table-column>
          <el-table-column property="storeArea" label="仓库面积" align="center" sortable>
          </el-table-column>
          <el-table-column property="huojia" label="货架号" align="center" sortable>
          </el-table-column>
          <el-table-column property="cate" label="仓库类别" align="center"
          :filters="cateFilter"
          :filter-method="filterHandler"
          >
          </el-table-column>
           <el-table-column property="desc" label="仓库描述" align="center">
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
    <el-dialog title="添加仓库" :visible.sync="userVisible" width="30%">
      <el-form
        :model="addForm"
        :rules="rules"
        v-loading="addLoading"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="仓库地址" prop="address" label-width="120px">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="仓库面积" prop="storeArea" label-width="120px">
          <el-input v-model="addForm.storeArea"></el-input>
        </el-form-item>
        <el-form-item label="货架号" prop="huojia" label-width="120px">
          <el-input v-model="addForm.huojia"></el-input>
        </el-form-item>
        <el-form-item label="仓库类型" prop="cate" label-width="120px">
         <el-select
            v-model="addForm.cate"
            placeholder="请选择仓库类型"
          >
            <el-option label="私有" value="私有"></el-option>
            <el-option label="公有" value="公有"></el-option>
            <el-option label="国有" value="国有"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库描述" prop="desc" label-width="120px">
          <el-input v-model="addForm.desc"></el-input>
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
       <el-form-item label="仓库地址" prop="address" label-width="120px">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="仓库面积" prop="storeArea" label-width="120px">
          <el-input v-model="editForm.storeArea"></el-input>
        </el-form-item>
        <el-form-item label="货架号" prop="huojia" label-width="120px">
          <el-input v-model="editForm.huojia"></el-input>
        </el-form-item>
        <el-form-item label="仓库类型" prop="cate" label-width="120px">
         <el-select
            v-model="editForm.cate"
            placeholder="请选择仓库类型"
          >
            <el-option label="私有" value="私有"></el-option>
            <el-option label="公有" value="公有"></el-option>
            <el-option label="国有" value="国有"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库描述" prop="desc" label-width="120px">
          <el-input v-model="editForm.desc"></el-input>
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
import { getStoreList } from "@/api/user";
import ExportJsonExcel from "js-export-excel";
import Mock from "mockjs";
export default {
  data() {

    return {
      userEditVisible: false,
      cateFilter: [
        { text: "私有", value: "私有" },
        { text: "公有", value: "公有" },
        { text: "国有", value: "国有" }
      ],
      tableData: [],
      editForm: {
        address: "",
        storeArea: "",
        huojia: "",
        cate: "",
        desc: "",
      },
      search: "",
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
        address: "",
        storeArea: "",
        huojia: "",
        cate: "",
        desc: "",
      },
      editLoading: false,
      rules: {
        address: [
          { required: true, message: "请输入仓库地址", trigger: "blur" },
        ],
       storeArea: [
          { required: true, message: "请输入仓库面积", trigger: "blur" },
        ],
        huojia: [
          { required: true, message: "请输入货架号", trigger: "blur" },
        ],
       cate: [
            { required: true, message: '请选择仓库类别', trigger: 'change' }
          ],
       desc: [
          { required: true, message: "请输入仓库描述", trigger: "blur" },
        ],
      },
      rules2: {
         address: [
          { required: true, message: "请输入仓库地址", trigger: "blur" },
        ],
       storeArea: [
          { required: true, message: "请输入仓库面积", trigger: "blur" },
        ],
        huojia: [
          { required: true, message: "请输入货架号", trigger: "blur" },
        ],
       cate: [
            { required: true, message: '请选择仓库类别', trigger: 'change' }
          ],
       desc: [
          { required: true, message: "请输入仓库描述", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getUserList();
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
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
      getStoreList(para).then((res) => {
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
    exportExcel(){
      let option = {} 
       option.fileName = '仓库信息列表' 
       const data = this.tableData
       option.datas = [{
                sheetData: data,
                sheetHeader: [
                '供货商编号','仓库地址','仓库面积',,'货架号','仓库类别','仓库描述'
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


