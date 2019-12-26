<template>
<div class="cover_container">
  <div id="addGroups">
    <p class="title">
      <span>新建分组</span>
      <i class="el-icon-close" @click="close"></i>
    </p>
    <el-form label-width="60px" :model="form" :rules="rules">
      <el-form-item label="名称:" class="groupName" prop="groupName">
        <el-input v-model="form.groupName"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="info">保存并继续</el-button>
        <el-button type="primary">保存</el-button>
        <el-button type="info">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'AddGroups',
  data () {
    return {
      // 表单数据
      form: {
        groupName: ''
      },
      rules: {
        groupName: {
          required: true,
          message: '请输入分组名称',
          trigger: 'blur'
        }
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
#addGroups {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 420px;
  height: 220px;
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
    margin-top: 40px;
    .groupName {
      padding: 0 30px;
      /deep/.el-form-item__label {
        color: #ccc;
      }
      /deep/.el-form-item__content {
        .el-input {
          input.el-input__inner {
            height: 30px;
            line-height: 30px;
            border-radius: 2px;
            background-color: #1f2124;
            outline: 0;
            box-shadow: 0 1px 1px 0 #666;
            border: 0;
            color: #eee;
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
}
</style>
