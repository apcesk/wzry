<template>
  <div id="app">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="icon" height="30">

      <div class="px-2 flex-1">
        <div class="text-white">
          王者荣耀
        </div>
        <div class="fs-xxs text-grey-1">
          团队成就更多
        </div>
      </div>

      <button class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse jc-around pb-1">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>

        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>

        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>

      </div>
    </div>

    <router-view></router-view>

  </div>
</template>

<style lang="scss">
  .topbar{
    position: sticky;
    top: 0;
    z-index: 99;
  }
</style>
