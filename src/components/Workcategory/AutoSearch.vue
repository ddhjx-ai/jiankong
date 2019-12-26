<template>
<div class="cover_container">
  <div id="autoSearch">
    <p class="title">
      <span>自动搜索</span>
      <i class="el-icon-close" @click="close"></i>
    </p>

    <el-form :inline="true" :model="form" class="form-inline">
      <el-form-item label="设备网段:">
        <el-input v-model="form.startIp"></el-input>
      </el-form-item>
      <el-form-item>-</el-form-item>
      <el-form-item>
        <el-input v-model="form.endIp"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="equipments">
      <div class="operations">
        <p>
          <span>
            <i class="el-icon-refresh-right"></i>刷新
          </span>
          <span>
            <i>IP</i>修改IP
          </span>
        </p>
        <p>搜索到设备:</p>
      </div>
    </div>

    <div class="list">
      <table style="width:100%">
        <thead>
          <tr>
            <th>
              <span>
                <input type="checkbox" v-model="checked" />
              </span>
              <span>序号</span>
            </th>
            <th width="25%">IP</th>
            <th width="25%">设备类型</th>
            <th width="25%">MAC地址</th>
            <th width="15%">端口</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>
                <input type="checkbox" v-model="checked" />
              </span>
              <span>1</span>
            </td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="buttons">
      <el-button type="primary">添加</el-button>
      <el-button type="info">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AutoSearch',
  data() {
    return {
      form: {
        startIp: '',
        endIp: ''
      },
      checked: true
    }
  },
  methods: {
    close() {
      this.$emit('changeActive', 0)
    }
  }
}
</script>

<style lang="less" scoped>
.cover_container{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
}
#autoSearch {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 740px;
  height: 450px;
  background-color: #2f3338;
  border: 1px solid #000;
  .title {
    height: 35px;
    width: 100%;
    background-color: #3a3e43;
    padding: 0 10px;
    margin: 0;
    box-sizing: border-box;
    color: #ccc;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: #333;
      }
      &:active {
        background-color: #000;
      }
    }
  }
  .form-inline {
    padding-right: 20px;
    margin-top: 10px;
    display: flex;
    justify-items: center;
    justify-content: flex-end;
    color: #ddd;
    /deep/.el-form-item__label {
      color: #ccc;
    }
    /deep/.el-form-item__content {
      .el-input {
        input.el-input__inner {
          font-size: 12px;
          height: 26px;
          line-height: 26px;
          width: 140px;
          border-radius: 2px;
          background-color: #1f2124;
          outline: 0;
          box-shadow: 0 1px 1px 0 #666;
          border: 0;
          color: #ddd;
        }
      }
      .el-button {
        height: 26px;
        width: 85px;
        padding: 0;
        border-radius: 2px;
        font-size: 13px;
      }
    }
  }

  .equipments {
    padding: 0 10px;
    .operations {
      display: flex;
      justify-content: space-between;
      color: #ddd;
      p {
        user-select: none;
        span {
          cursor: pointer;
          margin: 0 10px;
          font-size: 13px;
          i {
            font-size: 18px;
            font-style: normal;
            margin-right: 3px;
            vertical-align: middle;
          }
          &:last-child {
            i {
              width: 16px;
              height: 16px;
              display: inline-block;
              border: 1px solid #ddd;
              border-radius: 50%;
              text-align: center;
              line-height: 16px;
              font-size: 12px;
              margin-left: 20px;
            }
          }
          &:hover {
            color: #fff;
          }
        }
        &:last-child {
          margin-right: 80px;
        }
      }
    }
  }

  .list {
    padding: 0 10px;
    height: 220px;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.1);
    background-clip: content-box;
    table {
      color: #abb2bd;
      font-size: 14px;
      thead {
        height: 30px;
        line-height: 30px;
        background-color: #3f4348;
        th {
          font-weight: normal;
        }
      }
      tbody {
        background-color: #35393e;
        line-height: 30px;
        text-align: center;
        tr:nth-of-type(odd) {
          background-color: #35393e;
          height: 30px;
        }
        tr:nth-of-type(even) {
          background-color: #3f4348;
          height: 30px;
        }
      }
    }
  }

  .buttons {
    margin-top: 40px;
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
}
table tr td:nth-of-type(1),
table tr th:nth-of-type(1) {
  width: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
table tr td:nth-of-type(1) span,
table tr th:nth-of-type(1) span {
  display: flex;
  align-items: center;
  display: inline-block;
  width: 50%;
}
</style>
