<template>
  <div id="video">
    <el-container>
      <el-aside width="250px">
        <div class="aside_top">
          <div class="icons">
            <span>组织树</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-input placeholder="请输入内容" v-model="input">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="aside_tree">
          <el-tree :data="tree_data" :props="defaultProps" show-checkbox></el-tree>
        </div>

        <div class="yuntai">
          <p>
            <span>云台</span>
            <i class="el-icon-caret-bottom"></i>
          </p>
          <div class="operate">
            <p class="top_icon">
              <i class="el-icon-menu"></i>
              <i class="el-icon-mouse"></i>
            </p>
            <div class="direction" :style="note"></div>
            <div class="input_step">
              步长：
              <el-slider :min="0" :max="10" v-model="step_value" :step="1"></el-slider>
            </div>
            <p class="bottom_icon">
              <i class="el-icon-zoom-in"></i>
              <i class="el-icon-zoom-out"></i>
            </p>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div id="divPlugin" class="plugin"></div>
        <div class="_bottom">
          <div class="_bottom_left">
            <i class="el-icon-document"></i>
            <select placeholder='--'>
              <option value="1">15分钟</option>
              <option value="1">30分钟</option>
              <option value="1">45分钟</option>
              <option value="1">60分钟</option>
            </select>
            <i class="el-icon-refresh"></i>
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
      select_time: '',
      tree_data: [
        {
          name: '默认分组',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      note: {
        backgroundImage:
          'url(' + require('../../assets/images/operate.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      g_iWndIndex: 0,
      iWndowType: 3,
      deviceListArray: [
        {
          szIP: '10.0.0.12',
          szPort: '80',
          szUsername: 'admin',
          szPassword: 'q1234567'
        },
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
    },

    info(deviceList) {
      var that = this
      let index = deviceList[0]

      var iRet = WebVideoCtrl.I_Login(
        index.szIP,
        1,
        index.szPort,
        index.szUsername,
        index.szPassword,
        {
          success: xmlDoc => {
            console.log(2222222222)
            console.log(index.szIP + ' login success！')
            setTimeout(
              that.clickStartRealPlay(index.szIP, that.g_iWndIndex),
              500
            )
            that.g_iWndIndex++
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
        setTimeout(that.clickStartRealPlay(index.szIP, that.g_iWndIndex), 500)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#video {
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
  background: #3a3e43;
  i {
    cursor: pointer;
  }
  .el-aside {
    background-color: #2a2e33;
    .aside_top {
      background-color: #2a2b2e;
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
    .yuntai {
      > p {
        padding: 12px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        background-color: #3a3e43;
        color: #ccc;
      }
      .operate {
        background: #2a2e33;
        padding: 10px;
        p {
          &.top_icon {
            margin: 0;
            display: flex;
            justify-content: space-between;
          }
          &.bottom_icon {
            padding: 0 50px;
            display: flex;
            justify-content: space-between;
          }
          i {
            font-size: 25px;
            color: #ccc;
          }
        }
        .input_step {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ccc;
          .el-slider {
            width: 120px;
            margin-left: 10px;
            /deep/.el-slider__runway {
              background-color: #ddd;
              .el-slider__bar {
                background-color: #666;
              }
              .el-slider__button {
                width: 8px;
                height: 12px;
                border-radius: 0;
                background-color: #ddd;
                border: 1px solid #666;
              }
            }
          }
        }
        .direction {
          height: 115px;
          width: 115px;
          margin: 0 auto;
        }
      }
    }
  }

  .el-main {
    min-height: 100%;
    background-color: #222;
    padding: 0;
    position: relative;
    ._bottom {
      position: absolute;
      margin: 0;
      bottom: 0;
      height: 50px;
      width: 100%;
      background-color: #3a3e43;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;
      ._bottom_left{
        display: flex;
        height: 100%;
        align-items: center;
        i{
          margin: 0 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      i{
        color: #ccc;
        font-size: 20px;
      }
      select{
        color: #ccc;
        width: 100px;
        height: 25px;
        background: #000;
        // border-radius: 5px;
        border: 0;
        outline: none;
        border-radius: 6px;
         &::-ms-expand{
           display: none;
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
