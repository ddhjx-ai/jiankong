 <template>
 <div class="cover_container">
  <div id="setInsert">
    <p class="title">
      <span>设备导入</span>
      <i class="el-icon-close" @click="close"></i>
    </p>
    <div class="container">
      <div class="buttons_1">
        <el-button>从本地文件</el-button>
        <el-button>从www.dahuap2p.com</el-button>
      </div>
      <div class="filePath">
        <label for>文件路径:</label>
        <input type="text" />
        <input type="file" title="">
        <i class="el-icon-folder-opened"></i>
      </div>
      <div class="buttons_2">
        <el-button type="primary">导入</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'Setout',
  data() {
    return {}
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
#setInsert {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 420px;
  height: 240px;
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
  .container {
    padding: 10px;
    box-sizing: border-box;
    .buttons_1 {
      button {
        font-size: 13px;
        width: 145px;
        height: 30px;
        padding: 0;
        line-height: 30px;
        border-radius: 2px;
        background-color: #484d52;
        border-color: #23272a;
        color: #ccc;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 1);
        &:active{
          background-color: #23272a;
          color: #fff;
        }
      }
    }
    .filePath {
      margin-top: 45px;
      color: #eeeeee;
      display: flex;
      justify-content: center;
      align-items: center;
      label {
        font-size: 14px;
        color: #ccc;
      }
      input {
        height: 25px;
        width: 260px;
        text-indent: 10px;
        border-radius: 2px;
        border: 0;
        margin-left: 10px;
        color: #fff;
        background-color: #1f2124;
        outline: 0;
        box-shadow: 0 1px 1px 0 #666;
        &[type='file']{
          height: 25px;
          width: 30px;
          position: absolute;
          overflow: hidden;
          left: 347px;
          opacity: 0;
          cursor: pointer;
        }
      }
      .el-icon-folder-opened {
        color: #f2d06d;
        margin-left: -20px;
        cursor: pointer;
      }
    }
    .buttons_2 {
      display: flex;
      justify-content: flex-end;
      margin-top: 50px;
      button {
        width: 70px;
        height: 25px;
        padding: 0;
        border-radius: 2px;
        font-size: 13px;
      }
    }
  }
}
</style>
