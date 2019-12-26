<template>
  <div id="gatewayInto">
    <el-form :inline="true" :model="search_from" class="form-inline">
      <el-form-item label="接入项目名称:">
        <el-input placeholder="请输入项目名称" v-model="search_from.name"></el-input>
      </el-form-item>
      <el-form-item label="访问路径:" class="visit_path">
        <el-input placeholder="请输入访问路径" v-model="search_from.path"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="gateways">
      <div class="buttons">
        <el-button type="primary" @click="active = 1">新增网关</el-button>
        <el-button type="primary">删除网关</el-button>
      </div>
      <table class="bg_table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in 15" :key="index">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>接入系统名称</th>
            <th>IP</th>
            <th>端口号</th>
            <th>协议</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in test_list" :key="index">
            <td>{{item.system_name}}</td>
            <td>{{item.ip_code}}</td>
            <td>{{item.port_code}}</td>
            <td>{{item.http}}</td>
            <td>{{item.remarks}}</td>
            <td>
              <el-button type='text' size='small'>修改</el-button>
              <el-button type='text' size='small'>删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <addGateway v-if="active == 1" @changeActive='changeActive'/>
  </div>
</template>

<script>
import addGateway from '../Workcategory/AddGateway'
export default {
  name: 'GatewayInto',
  data () {
    return {
      active: 0,

      test_list: [
        {
          system_name: '网络视频监控网关接入',
          ip_code: '10.0.1.112',
          port_code: '8000',
          http: 'HTTP',
          remarks: '网关接入'
        },
        {
          system_name: '网络视频监控网关接入',
          ip_code: '10.0.1.112',
          port_code: '8000',
          http: 'HTTP',
          remarks: '网关接入'
        }
      ],

      search_from: {
        name: '',
        path: ''
      }
    }
  },
  methods: {
    changeActive (num) {
      this.active = num
    }
  },
  components: {
    addGateway
  }
}
</script>

<style lang="less" scoped>
  #gatewayInto {
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
.form-inline {
  padding-left: 20px;
  // margin-top: 10px;
  display: flex;
  justify-items: center;
  justify-content: flex-start;
  color: #ddd;
  .visit_path{
    margin-left: 50px;
  }
  /deep/.el-form-item__label {
    color: #fff;
  }
  /deep/.el-form-item__content {
    .el-input {
      input.el-input__inner {
        font-size: 12px;
        height: 26px;
        line-height: 26px;
        width: 180px;
        border-radius: 2px;
        background-color: #1f2124;
        outline: 0;
        border: 1px solid #666;
        color: #ddd;
      }
    }
    .el-button {
      height: 24px;
      width: 60px;
      padding: 0;
      margin-left: 60px;
      border-radius: 2px;
      font-size: 12px;
      border: rgba(166, 166, 166, 1) solid 1px;
    }
  }
}

.gateways{
  .buttons{
    margin-left: 10px;
    button{
      width: 58px;
      height: 24px;
      padding: 0;
      font-size: 12px;
      border-radius: 2px;
      border: rgba(166, 166, 166, 1) solid 1px;
    }
  }
  table{
    width: 100%;
    border-collapse:collapse;
    border-spacing: 0px;
    background-color: rgba(42, 46, 51, 1);
    margin-top: 10px;
    position: relative;
    table-layout : fixed;
    tr{
      th,td{
        height: 30px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        border: 0.5px solid #666;
      }
    }
  }
  .bg_table{
    position: absolute;
    z-index: 0;
  }
}
</style>
