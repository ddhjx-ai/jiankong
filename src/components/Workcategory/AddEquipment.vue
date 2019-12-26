<template>
<div class="cover_container">
  <div id="addEquipment">
    <p class="title">
      <span>手动添加</span>
      <i class="el-icon-close" @click="close"></i>
    </p>

    <el-form :model="form" label-width="80px">
      <el-form-item label="设备名称:">
        <el-input clearable v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="添加方式:">
        <el-select v-model="hostValue" placeholder="IP/域名">
          <el-option
            v-for="item in hostOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP/域名:">
        <el-input clearable v-model="form.domain"></el-input>
      </el-form-item>
      <el-form-item label="端口:">
        <el-input v-model="form.port"></el-input>
      </el-form-item>
      <el-form-item label="组名:">
        <el-select v-model="groupValue" placeholder="默认分组">
          <el-option
            v-for="item in groupOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名:">
        <el-input v-model="form.groupName"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="info">保存并新建</el-button>
        <el-button type="primary">添加</el-button>
        <el-button type="info">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'AddEquipment',
  data() {
    return {
      form: {
        name: '',
        domain: '',
        port: '',
        groupName: '',
        password: ''
      },
      hostOptions: [
        {value: '10.2.3.444'},
        {value: '10.2.3.333'}
      ],
      hostValue: '',
      groupOptions: [
        {value: 'admin1'},
        {value: 'admin2'}
      ],
      groupValue: ''
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
#addEquipment {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 450px;
  height: 445px;
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
      padding: 0px 30px;
      margin-bottom: 10px;
      /deep/.el-form-item__content {
        .el-input {
          input.el-input__inner {
            height: 26px;
            line-height: 26px;
            border-radius: 2px;
            background-color: #1f2124;
            outline: 0;
            box-shadow: 0 1px 1px 0 #666;
            border: 0;
            color: #eee;
          }
        }
        .el-select {
          width: 100%;
        }
      }
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
  }
}
</style>
