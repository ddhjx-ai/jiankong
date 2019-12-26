<template>
  <div id="admin">
    <el-container class="container">
      <el-aside width="220px">
        <p class="title">用户/角色</p>
        <div class="userSet">
          <el-button type="primary">新增员工</el-button>
          <el-button type="primary">新增角色</el-button>
          <el-button type="primary">删除</el-button>
          <i class="el-icon-search"></i>
        </div>
        <el-input v-model="userSearch" placeholder="搜索..."></el-input>
        <div class="users">
          <el-tree :data="users" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
        </div>
      </el-aside>

      <el-main>
        <p class="title">角色信息</p>
        <el-form label-width="120px" :model="userForm">
          <el-form-item label="用户名:">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色:">
            <el-select v-model="value" placeholder="默认分组">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input type="password" v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:">
            <el-input type="password" v-model="userForm.psdagain"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" :rows="2" maxlength="100" v-model="userForm.remarks"></el-input>
          </el-form-item>
          <el-form-item label="菜单权限:">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="通道权限:">
            <el-container class="passageway">
              <el-aside width="150px">
                <ul>
                  <li>预览</li>
                  <li>回放</li>
                  <li>导出</li>
                  <li>云台</li>
                  <li>电子聚焦</li>
                </ul>
              </el-aside>

              <el-main>
                <el-input placeholder="搜索...">
                  <i slot="suffix" class="el-icon-search"></i>
                </el-input>
                <el-tree show-checkbox :data="users" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
              </el-main>
            </el-container>
          </el-form-item>

          <el-form-item class="buttons">
            <el-button type="primary">保存</el-button>
            <el-button type="primary">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      textarea: '',
      userSearch: '',
      index: 0,
      headerList: ['设备管理', '实时视频', '视频回放', '网关接入', '用户管理'],
      options: [{ value: 'admin1' }, { value: 'admin2' }, { value: 'admin3' }],
      value: '',
      userForm: {
        name: '',
        password: '',
        psdagain: '',
        remarks: ''
      },

      users: [
        {
          id: 1,
          name: 'admin',
          type: 0,
          children: [
            {
              id: 2,
              type: 1,
              name: 'admin1'
            },
            {
              id: 2,
              type: 1,
              name: 'admin2'
            }
          ]
        }
      ],

      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['设备管理', '实时视频', '视频回放', '用户管理'],
      isIndeterminate: true
    }
  },
  methods: {
    clickHandle(i) {
      this.index = i
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },

    handleNodeClick(data) {
      console.log(data)
    },

    renderContent(h, { node, data, store }) {
      console.log(data)
      return (
        <div>
          {data.type === 0 ? (
            <i class="el-icon-user-solid"></i>
          ) : (
            <i class="el-icon-user"></i>
          )}
          {data.name}
        </div>
      )
    }
  }
}
</script>

<style lang="less" scoped>
#admin {
  width: 100%;
  position: absolute;
  background-color: #3a3e43;
  top: 52px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.el-container.container {
  min-height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0px;
  background-color: #1d1f22;
  padding: 8px;
  .el-aside {
    margin-right: 8px;
    background-color: #2b2f33;
    .userSet {
      height: 32px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-button {
        height: 24px;
        padding: 0 5px;
        font-size: 12px;
        border-radius: 2px;
        border: 1px solid #aaa;
        margin-left: 5px;
      }
      .el-icon-search {
        color: #aaa;
        font-size: 15px;
        margin-left: 20px;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
    .el-input {
      height: 26px;
      padding: 0 3px;
      box-sizing: border-box;
      margin: 3px 0;
      /deep/.el-input__inner {
        height: 26px;
        outline: 0;
        background-color: #000;
        border-radius: 3px;
        border: 0;
        line-height: 26px;
        color: #fff;
      }
    }
    .users {
      /deep/.el-tree-node__content {
        background-color: #595f69;
        color: #f5f5f5;
      }
      /deep/.el-tree-node__children {
        /deep/.el-tree-node__content {
          background-color: #333;
          &:hover {
            background-color: #555;
          }
        }
      }
      /deep/.el-tree-node__expand-icon.expanded {
        color: #40c4ff;
      }
    }
  }
  .el-main {
    padding: 0;
    height: auto;
    background-color: #2b2f33;
    .el-form {
      margin-top: 10px;
      /deep/.el-form-item__label {
        color: #ccc;
        font-size: 12px;
      }
      .buttons {
        margin-top: 20px;
        padding-right: 10px;
        display: flex;
        justify-content: flex-end;
        .el-button {
          height: 26px;
          width: 72px;
          padding: 0;
          border-radius: 2px;
          font-size: 13px;
        }
      }
      .el-form-item {
        padding: 0px 10px;
        margin-bottom: 10px;
        &:nth-of-type(1),
        &:nth-of-type(2) {
          display: inline-block;
        }
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3),
        &:nth-of-type(4) {
          width: 360px;
        }
        /deep/.el-form-item__content {
          .el-input {
            ::placeholder {
              font-size: 12px;
              color: #aaa;
            }
            input.el-input__inner {
              height: 26px;
              line-height: 26px;
              border-radius: 2px;
              background-color: #1f2124;
              outline: 0;
              border: 0;
              box-shadow: 0 1px 1px 0 #666;
              color: #eee;
            }
          }
          .el-select {
            width: 100%;
          }
          .el-textarea {
            .el-textarea__inner {
              height: 48px;
              line-height: 1;
              border-radius: 2px;
              background-color: #1f2124;
              outline: 0;
              border: 0;
              box-shadow: 0 1px 1px 0 #666;
              color: #eee;
              resize: none;
              overflow-y: hidden;
            }
          }
        }
        .el-checkbox {
          color: #ccc;
        }
      }
    }
  }
  p.title {
    margin: 0;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 13px;
    color: #ccc;
    background-color: #3a3e43;
  }
}
.el-container.passageway {
  width: 500px;
  min-height: 300px;
  border: 1px solid #666;
  .el-aside {
    background-color: #3a3e43;
    min-height: 300px;
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #ccc;
        cursor: pointer;
        &:hover {
          background-color: #2b2f33;
        }
      }
    }
  }
  .el-main{
    padding-top: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .el-input{
      width: 260px;
      .el-icon-search{
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .el-tree{
      width: 260px;
      background-color: transparent;
      color: #ddd;
      /deep/.el-tree-node__content {
        background-color: transparent;
      }
      /deep/.el-tree-node__children {
        /deep/.el-tree-node__content {
          background-color: transparent;
          &:hover {
            background-color: #555;
          }
        }
      }
      /deep/.el-tree-node__expand-icon.expanded {
        color: #40c4ff;
      }
      /deep/.el-checkbox__inner{
        border-color: #000;
        background-color: #666;
      }
    }
  }
}
</style>
