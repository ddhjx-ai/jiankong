<template>
<div class="cover_container">
  <div id="addGateway">
    <p class="title">
      <span>新增网关</span>
      <i class="el-icon-close" @click="close"></i>
    </p>

    <el-form label-width="100px" :model="addData">
      <el-form-item label="接入系统名称:">
        <el-input v-model="addData.system_name" clearable placeholder="输入接口系统名称"></el-input>
      </el-form-item>
      <el-form-item label="IP:">
        <el-input v-model="addData.ip_code" clearable placeholder="请输入IP"></el-input>
      </el-form-item>
      <el-form-item label="端口号:">
        <el-input v-model="addData.port_code" placeholder="请输入端口号"></el-input>
      </el-form-item>
      <el-form-item label="协议:">
        <el-input v-model="addData.http" placeholder="请输入协议"></el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="addData.remarks" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary">保存</el-button>
        <el-button type="primary">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'AddGateway',
  data () {
    return {
      addData: {
        system_name: '',
        ip_code: '',
        port_code: '',
        http: '',
        remarks: ''
      }
    }
  },
  methods: {
    close () {
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
  #addGateway{
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 420px;
    height: 400px;
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

    .el-form {
      margin-top: 10px;
      /deep/.el-form-item__label {
        color: #ccc;
      }
      .el-form-item {
        padding: 0px 10px;
        margin-bottom: 10px;
        /deep/.el-form-item__content {
          .el-input {
            ::placeholder{
              font-size: 12px;
              color: #aaa;
            }
            input.el-input__inner {
              height: 26px;
              line-height: 26px;
              border-radius: 2px;
              background-color: #1f2124;
              outline: 0;
              border: #666 solid 1px;
              color: #eee;
            }
          }
        }
      }
      .buttons {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        .el-button {
          height: 26px;
          width: 72px;
          padding: 0;
          border-radius: 2px;
          font-size: 13px;
          margin-top: 30px;
          margin-right: 30px;
        }
      }
    }
  }
</style>
