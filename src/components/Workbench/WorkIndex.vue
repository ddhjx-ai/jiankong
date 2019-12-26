<template>
  <div class="workIndex">
    <div class="main">
      <ul>
        <li>
          <span>操作</span>
          <router-link to="/Videolive">
            <img src="../../assets/images/live.png" alt=""><br>
            <span>实时视频</span>
          </router-link>
          <router-link to="/VideoPlayback">
            <img src="../../assets/images/playback.png" alt=""><br>
            <span>视频回顾</span>
          </router-link>
        </li>
        <li>
          <span>管理</span>
          <router-link to="/WorkManage">
            <img src="../../assets/images/manage.png" alt=""><br>
            <span>视频管理</span>
          </router-link>
          <router-link to="/Admin">
            <img src="../../assets/images/user.png" alt=""><br>
            <span>用户管理</span>
          </router-link>
          <router-link to="/GatewayInto">
            <img src="../../assets/images/port.png" alt=""><br>
            <span>网管接入</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkIndex'
}
</script>

<style lang="less" scoped>
.workIndex{
  width: 100%;
  min-height: 100%;
  background-color: #3a3e43;
  padding-top: 52px;
  box-sizing: border-box;
}
div.main{
  padding:0px 15px;
}
div.main>ul{
  margin: 0;
  padding:0;
  padding-top: 20px;
}
div.main>ul>li{
  height: 150px;
  list-style: none;
  background-color: rgba(44, 49, 56, 1);
  margin-bottom: 20px;
  display: flex;
}

div.main>ul>li>span{
  display: inline-block;
  height: 100%;
  width: 75px;
  text-align: center;
  padding-top: 20px;
  box-sizing: border-box;
  color: rgba(229, 229, 229, 1);
  font-size: 14px;
}
div.main>ul>li>a{
  color: #fff;
  text-decoration: none;
  display: inline-block;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  border: 2px solid transparent;
  box-sizing: border-box;
  border-radius: 5px;
  &:hover{
    border: 2px solid #222;
  }
  &:active{
    border: 2px solid #222;
    box-shadow: 0 0 4px 1px #222 inset;
  }
}
div.main>ul>li>a:active span{
  color: #fff;
}
</style>
