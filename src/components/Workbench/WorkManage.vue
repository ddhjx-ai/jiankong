<template>
  <div id="workManage">
    <div class="main">
      <div>
        <ul>
          <li @click="active = 1" :class="{ 'shownow':active == 1 }">
            <i class="el-icon-search"></i>自动搜索
          </li>
          <li @click="active = 2" :class="{ 'shownow':active == 2 }">
            <i class="el-icon-plus"></i>添加设备
          </li>
          <li @click="active = 3" :class="{ 'shownow':active == 3 }">
            <i class="el-icon-folder-add"></i>添加分组
          </li>
          <li @click="delete_item">
            <i class="el-icon-delete"></i>删除
          </li>
          <li @click="active = 5" :class="{ 'shownow':active == 5 }">
            <i class="el-icon-upload2"></i>导出
          </li>
          <li @click="active = 6" :class="{ 'shownow':active == 6 }">
            <i class="el-icon-download"></i>导入
          </li>
        </ul>
        <div>
          <span>设备总数：{{test_data.length}}</span>
          <span>在线总数：{{onlinNum}}</span>
        </div>
      </div>
      <p>所有设备</p>
      <table style="width:100%">
        <thead>
          <tr>
            <th>
              <span>
                <input type="checkbox" v-model="checked" />
              </span>
              <span>序号</span>
            </th>
            <th>名称</th>
            <th>IP/域名</th>
            <th>端口</th>
            <th>通道数</th>
            <th>在线状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in test_data" :key="i">
            <td>
              <span>
                <input type="checkbox" v-model="checked" />
              </span>
              <span>{{i+1}}</span>
            </td>
            <td>{{item.test_name}}</td>
            <td>{{item.test_ip}}</td>
            <td>{{item.test_prot}}</td>
            <td>{{item.test_ways ? item.test_ways : 'N/A'}}</td>
            <td class="statu">
              <span :class="item.test_statu ? 'now' : ''"></span>
              {{item.test_statu ? '在线' : '离线'}}
            </td>
            <td>
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <autoSearch v-if="active == 1" @changeActive="changeActive" />
    <addEquipment v-if="active == 2" @changeActive="changeActive" />
    <addGroups v-if="active == 3" @changeActive="changeActive" />
    <setout v-if="active == 5" @changeActive="changeActive" />
    <setInsert v-if="active == 6" @changeActive="changeActive" />
  </div>
</template>

<script>
import setout from '../Workcategory/Setout'
import setInsert from '../Workcategory/SetInsert'
import addGroups from '../Workcategory/AddGroups'
import addEquipment from '../Workcategory/AddEquipment'
import autoSearch from '../Workcategory/AutoSearch'
export default {
  name: 'WorkManage',
  data() {
    return {
      checked: true,
      active: 0,
      test_data: [
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_prot: '22222',
          test_ways: '',
          test_statu: true
        },
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_prot: '22222',
          test_ways: '',
          test_statu: true
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    outSet() {
      console.log(12)
    },

    changeActive(num) {
      this.active = num
    },

    // 获取所有设备列表
    getList() {
      this.$http.post('/device/get/param').then(res => {
        console.log(res.data)
      })
    },

    // 删除指定序号
    async delete_item() {
      // 弹窗提示
      let confirm = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      console.log(confirm)
    }
  },
  computed: {
    // 在线总数
    onlinNum() {
      let onLineArr = this.test_data.filter(item => item.test_statu)
      return onLineArr.length
    }
  },
  components: {
    setout,
    setInsert,
    addGroups,
    addEquipment,
    autoSearch
  }
}
</script>

<style lang='' scoped>
#workManage {
  width: 100%;
  min-height: 100%;
  background-color: #3a3e43;
  padding-top: 52px;
  box-sizing: border-box;
}
ul {
  margin: 0;
  padding: 0;
}
ul > li {
  float: left;
  list-style: none;
  cursor: pointer;
}
.main {
  padding: 0 10px;
}
.main > div {
  height: 45px;
  display: flex;
  justify-content: space-between;
  line-height: 45px;
  color: rgba(229, 229, 229, 1);
}
.main > div li {
  width: 100px;
  height: 45px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
}
.main > div li:active {
  background-color: #222;
  border-radius: 3px;
  /* box-shadow: 0px 0px 2px 1px #000 inset; */
}
.main > div li.shownow {
  background-color: #222;
  border-radius: 3px;
  color: #fff;
}
.main > div li:hover {
  color: #fff;
  text-shadow: 0px 0px #fff;
}
.main > div li i {
  font-size: 20px;
  margin-right: 5px;
}
.main > div span {
  margin-right: 20px;
}
.main > p {
  margin: 0;
  height: 40px;
  background-color: #000;
  color: #fff;
  line-height: 40px;
  padding-left: 20px;
}
table {
  color: #abb2bd;
  font-size: 14px;
  /* table-layout : fixed; */
}
table > thead {
  height: 30px;
  line-height: 30px;
  background-color: #3f4348;
}
table > tbody {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
table > tbody td.statu span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ddd;
}
table > tbody td.statu span.now {
  background-color: greenyellow;
}
table > tbody > tr:nth-of-type(odd) {
  background-color: #35393e;
}
table > tbody > tr:nth-of-type(even) {
  background-color: #3f4348;
}
table tr td:nth-of-type(1),
table tr th:nth-of-type(1) {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
table tr td:nth-of-type(1) span,
table tr th:nth-of-type(1) span {
  display: inline-block;
  width: 50%;
}
</style>
