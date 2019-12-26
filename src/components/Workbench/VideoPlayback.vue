<template>
  <div id="playBack">
    <el-container>
      <el-aside width="250px">
        <div class="aside_top">
          <el-button icon="el-icon-video-camera" :class="flag==1?'active':''" @click="test_set()">设备</el-button>
          <el-button icon="el-icon-s-platform" :class="flag==0?'active':''" @click="test_local()">本地</el-button>
          <div class="icons">
            <span v-if="flag==1">设备</span>
            <span v-else>本地</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-input placeholder="请输入内容" v-model="input">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="aside_tree">
          <el-tree :data="tree_data" :props="defaultProps" show-checkbox></el-tree>
        </div>
        <div class="aside_view">
          <div class="views">
            <span>视图</span>
            <i class="el-icon-caret-right"></i>
          </div>
          <el-form :model="view_form">
            <el-form-item>
              <el-radio-group v-model="view_form.radio" class="radios">
                <el-radio label="录像"></el-radio>
                <el-radio label="图片"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="录像类型：">
              <el-select v-model="view_form.video" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="码流类型：">
              <el-select v-model="view_form.code" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间：">
              <el-date-picker
                v-model="view_form.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="MM/dd HH:mm"
                :editable="false"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <i slot="suffix" class="el-input__icon"></i>
              <el-input v-model="view_form.value"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
      <el-main>
        <div id="divPlugin" class="plugin"></div>
        <div class="_bottom">
          <div class="_bottom_left">
            <i class="el-icon-download"></i>
            <i class="el-icon-scissors"></i>
          </div>
          <div class="_bottom_center">
            <i class="el-icon-s-operation"></i>
            <i class="el-icon-caret-left"></i>
            <i class="el-icon-video-pause"></i>
            <i class="el-icon-video-play"></i>
            <i class="el-icon-caret-right"></i>
            <i>1x</i>
          </div>
          <div class="_bottom_right">
            <i class="el-icon-s-grid"></i>
            <i class="el-icon-menu"></i>
            <i>16</i>
            <i class="el-icon-rank"></i>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { WebVideoCtrl } from '../../../static/webVideoCtrl.js'
export default {
  data() {
    return {
      input: '',
      videoUrl: '',
      flag: 1,
      tree_data: [
        {
          label: '默认分组',
          children: [
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      view_form: {
        radio: '',
        video: '',
        code: '',
        tiem: '',
        value: ''
      },
      g_iWndIndex: 0,
      iWndowType: 3,
      deviceListArray: [
        {
          szIP: '10.0.0.12',
          szPort: '80',
          szUsername: 'admin',
          szPassword: 'q1234567'
        }
      ]
    }
  },
  mounted() {
    this.videoInitPlugin()
  },
  methods: {
    test_set() {
      this.flag = 1
    },
    test_local() {
      this.flag = 0
    },
    videoInitPlugin() {
      // 检查插件是否已经安装过
      if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
        alert(' 您还未安装过插件，双击开发包目录里的WebComponents.exe安装！')
        return
      }
      // 初始化插件参数及插入插件
      WebVideoCtrl.I_InitPlugin('100%', '100%', {
        iWndowType: this.iWndowType,
        cbSelWnd: xmlDoc => {
          this.g_iWndIndex = this.$(xmlDoc)
            .find('SelectWnd')
            .eq(0)
            .text()
        }
      })
      WebVideoCtrl.I_InsertOBJECTPlugin('divPlugin')
      // 检查插件是否最新
      if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
        alert('检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！')
        return
      }
      // 将一维数组按区块个数分割成二维数组
      let deviceList = this.oneArrayToTwoArray(this.deviceListArray)
      // 自动登陆
      this.clickLogin(deviceList)
    },

    clickLogin(deviceList) {
      for (let i = 0; i < deviceList.length; i++) {
        let index = deviceList[i]
        if ('' == index.szIP || '' == index.szPort) {
          continue
        }
        var iRet = WebVideoCtrl.I_Login(
          index.szIP,
          0,
          index.szPort,
          index.szUsername,
          index.szPassword,
          {
            success: xmlDoc => {
              console.log(index.szIP + ' login success！')
              this.clickStartRealPlay(index.szIP, this.g_iWndIndex)
              this.g_iWndIndex++
            },
            error: function() {
              console.log(
                index.szIP +
                  index.szPort +
                  index.szUsername +
                  index.szPassword +
                  ' login failed！'
              )
            }
          }
        )
        if (-1 == iRet) {
          console.log(index.szIP + ' login already !')
          this.clickStartRealPlay(index.szIP, this.g_iWndIndex)
        }
      }
    },

    clickStartRealPlay(szIP, g_iWndIndex) {
      let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
      if ('' == szIP) {
        return
      }
      let iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
        iWndIndex: g_iWndIndex
      })
      if (0 == iRet) {
        console.log('start real play success！')
      } else {
        console.log('start real play failed！')
      }
    },

    oneArrayToTwoArray(deviceListArray) {
      let twoArray = []
      let oneArray = []
      let len = this.iWndowType * this.iWndowType
      for (let b = 0; b < deviceListArray.length; b++) {
        if (b % len == 0) {
          oneArray = []
        }
        twoArray.push(deviceListArray[b])
        if (b % len == len - 1) {
          twoArray.push(oneArray)
        }
      }
      return twoArray
    }
  }
}
</script>
<style lang="less" scoped>
#playBack {
  width: 100%;
  position: absolute;
  background-color: #3a3e43;
  top: 52px;
  left: 0;
  bottom: 0;
  right: 0;
}
.el-container {
  min-height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  .el-aside {
    min-height: 100%;
    background-color: #2a2b2e;
    .aside_top {
      background-color: #2a2b2e;
      button {
        float: left;
        border: 0;
        border-radius: 0;
        width: 50%;
        height: 40px;
        margin: 0;
        background-color: #1d1f23;
        color: #f0efef;
        &.active {
          background-color: #3a3e43;
        }
      }
      .icons {
        height: 40px;
        width: 100%;
        display: flex;
        padding: 0 10px 0 0;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        background-color: #3a3e43;
        span {
          color: #fff;
          margin-left: 5px;
        }
        .el-icon-caret-bottom {
          color: #ccc;
        }
      }
      .el-input {
        margin: 12px 0;
        height: 26px;
        /deep/.el-input__inner {
          height: 26px;
          line-height: 26px;
          border-radius: 0;
          background-color: #1f2124;
          border: 0;
          color: #ccc;
        }
        .el-input__icon {
          line-height: 26px;
          cursor: pointer;
        }
      }
    }
    .aside_tree {
      height: 420px;
      background-color: #2b2f33;
      .el-tree {
        width: 250px;
        background-color: transparent;
        color: #ddd;
        height: 100%;
        overflow: auto;
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
        /deep/.el-checkbox__inner {
          border-color: #000;
          background-color: #666;
        }
      }
    }
    .aside_view {
      background-color: #3a3e43;
      .views {
        height: 40px;
        border-bottom: 1px solid #111;
        color: #b1b1b1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px 0 5px;
      }
      .el-form {
        padding: 10px;
        .el-form-item {
          margin-bottom: 5px;
          .radios {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 40px;
            .el-radio {
              color: #ccc;
              /deep/.el-radio__inner {
                width: 18px;
                height: 18px;
                background-color: #3d434a;
                border: 1px solid #222;
                box-shadow: 0 0 4px 0 #222 inset;
                &::after {
                  width: 8px;
                  height: 8px;
                  background-color: #48c6ff;
                }
              }
              /deep/.el-radio__input.is-checked + .el-radio__label {
                color: #ccc;
              }
            }
          }
          /deep/.el-form-item__label {
            color: #ccc;
          }
        }
        /deep/.el-form-item__content {
          .el-input {
            ::placeholder {
              font-size: 12px;
              color: #aaa;
            }
          }
          .el-range-editor.el-input__inner {
            width: 100%;
            .el-range-input {
              background-color: transparent;
            }
            .el-icon-time {
              line-height: 1;
            }
            .el-range__close-icon {
              line-height: 1;
            }
            .el-range-separator {
              line-height: 1;
              color: #fff;
            }
          }
          .el-select {
            width: 100%;
          }
          .el-input__inner {
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
        .el-button {
          width: 100%;
        }
      }
    }
  }

  .el-main {
    min-height: 100%;
    background-color: #222;
    padding: 0;
    position: relative;
    ._bottom{
      position: absolute;
      margin: 0;
      bottom: 0;
      height: 50px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      background-color: #3a3e43;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i{
        color: #ccc;
        font-size: 20px;
        cursor: pointer;
        &.el-icon-video-pause,
        &.el-icon-video-play{
          font-size: 25px;
        }
      }
    }
  }
}
/*插件*/
.plugin {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
