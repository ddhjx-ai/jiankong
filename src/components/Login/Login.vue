<template>
  <div id='hello' :style='note'>
    <h3 class='title'>基于LTE专用网络的视频传输</h3>
    <!-- 表单区域 -->
    <el-form class='login_form' ref='loginForm' :model='form' :rules='rules' label-width='0px'>
      <!-- 用户名 -->
      <el-form-item prop='username'>
        <el-input placeholder='账户' clearable prefix-icon='el-icon-s-custom' v-model='form.username'></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop='password'>
        <el-input
          placeholder='密码'
          clearable
          show-password
          prefix-icon='el-icon-lock'
          v-model='form.password'
        ></el-input>
      </el-form-item>

      <div class='checkbox'>
        <el-checkbox v-model='checked1'>记住密码</el-checkbox>
        <el-checkbox v-model='checked2'>自动登陆</el-checkbox>
      </div>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-button type='primary' @click='login' style='width:100%'>登陆</el-button>
      </el-form-item>

      <!-- <div class='a-link'>
        <a href='#'>忘记密码?</a>
      </div> -->
    </el-form>
    <!-- <div class='footer'>
      <div>
        <a href='#'>帮助</a>
        <a href='#'>隐私</a>
        <a href='#'>条款</a>
      </div>
      <p>Copyright ©️ 2019 微品致远产品部出品</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 表单数据
      form: {
        username: '',
        password: ''
      },
      checked1: false,
      checked2: false,
      // 表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      note: {
        backgroundImage:
          'url(' + require('../../assets/images/helloWorld-bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  methods: {
    // 登录事件
    login () {
      /* this.$refs.loginForm.validate(valid => {
        this.$http.post('liveGbs/login', this.form).then(res => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.$router.push('/WorkIndex')
          }
        })
      }) */
      this.$router.push('/WorkIndex')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
#hello {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .title {
    height: 34px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 23px;
    text-align: center;
    margin-bottom: 90px;
  }
}

.login_form {
  width: 370px;
  height: 320px;
}

.login_form > .checkbox {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.login_form > .a-link > a {
  color: rgba(24, 144, 255, 1);
  font-size: 14px;
  text-decoration: none;
}
.a-link {
  text-align: center;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.footer > div > a {
  color: rgba(0, 0, 0, 0.45);
  text-decoration: none;
  margin: 0 18px;
}
</style>
