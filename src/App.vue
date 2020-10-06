<template>
  <div id="app">
    <!-- v-if="!$route.meta.isLogin" 登陆界面不显示组件 -->
    <nice-header v-if="!$route.meta.isLogin"></nice-header>
    <router-view />
    <player-bar v-if="!$route.meta.isLogin"></player-bar>
    <player v-if="!$route.meta.isLogin"></player>
    <nice-footer v-if="!$route.meta.isLogin"></nice-footer>
    <back-top v-if="!$route.meta.isLogin"></back-top>

    <!-- 背景样式 -->
    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
  </div>
</template>

<script>
import NiceHeader from 'components/common/header/Index'
import BackTop from 'components/common/gotop/Index'
import PlayerBar from 'components/common/playerBar/Index'
import Player from 'components/common/player/Index'
import NiceFooter from 'components/common/footer/Index'
export default {
  components: {
    NiceHeader,
    BackTop,
    NiceFooter,
    PlayerBar,
    Player
  }
}
</script>

<style lang="stylus">
// @import './assets/styles/iconfont.css';
.fly {
  pointer-events: none;
  position: fixed;
  z-index: 100;
}

.bg-fly-circle1 {
  left: 40px;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  // linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片。
  background: linear-gradient(to right, rgba(100, 84, 239, 0.07) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 2.5s linear infinite;
}

.bg-fly-circle2 {
  left: 3%;
  top: 60%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.08) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 3s linear infinite;
}

.bg-fly-circle3 {
  right: 2%;
  top: 140px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.1) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
  right: 5%;
  top: 60%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.02) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 3.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(25px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
