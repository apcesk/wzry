<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
          <img class="w-100" src="../assets/images/1872789c248441e82ab767d31bb22845.jpeg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/7e20896a31cd76fb78486c5240123ab9.jpeg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/9c5e6fa4d04fd4b3b2a9a0b2db86b3cd.jpeg" alt="">
        </swiper-slide>
        <div class="pagenation-home swiper-pagination-clickable p-a" slot="pagination">
        <!-- 激活样式swiper-pagination-bullet-active -->
          <span class="swiper-pagination-bullet mr-1" :class="{'swiper-pagination-bullet-active': (activeImg == 0)}" v-on:click="slideTo(0)"></span>
          <span class="swiper-pagination-bullet mr-1" :class="{'swiper-pagination-bullet-active': (activeImg == 1)}" v-on:click="slideTo(1)"></span>
          <span class="swiper-pagination-bullet mr-1" :class="{'swiper-pagination-bullet-active': (activeImg == 2)}" v-on:click="slideTo(2)"></span>
        </div>
      </swiper>
      <!-- end of swiper -->
      <div class="nav-icons bg-white mt-3  text-center pt-3 text-grey-1">
        <div class="d-flex flex-wrap ">
          <div class="nav-item  mb-3 " v-for="(value, index) in sprite" :key="index">
            <i class="sprite" :class="value.class"></i>
            <div class="py-2">{{value.title}}</div>
          </div>
        </div>
        <div class="bg-light py-2 fs-sm">
          <i class="sprite sprite-arrow mr-1"></i>
          <span>收起</span>
        </div>
        <!-- end of nav icons -->
      </div>
      <!-- <m-card icon="cc-menu-circle" title="新闻资讯">
        <div class="card-body pt-3">
          <div class="nav jc-between">
            <div class="nav-item active">
              <div class="nav-link">热门</div>
            </div>
            
            <div class="nav-item">
              <div class="nav-link">新闻</div>
            </div>
            
            <div class="nav-item">
              <div class="nav-link">公告</div>
            </div>
            
            <div class="nav-item">
              <div class="nav-link">活动</div>
            </div>
            
            <div class="nav-item">
              <div class="nav-link">赛事</div>
            </div>

          </div>
          <div class="pt-3">
            <swiper>
              <swiper-slide v-for="m in 5" :key="m">
                <div class="py-2" v-for="n in 5" :key="n">
                  <span>[新闻]</span>
                  <span>|</span>
                  <span>标题内容</span>
                  <span>07/03</span>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </m-card> -->
      
      <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <router-link 
            tag="div"
            :to="`/articles/${news._id}`"
            class="py-2 fs-lg d-flex" 
            v-for="(news, index) in category.newsList" :key="index">
            <span class="text-info">[{{news.CategoryName}}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis">{{news.title}}</span>
            <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
          </router-link>
        </template>
      </m-list-card>

      <m-list-card icon="yingxiong" title="英雄列表" :categories="heroCats">
        <template #items="{category}">
          <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
            <router-link tag="div" :to="`/heroes/${hero._id}`"
              class="p-2 text-center" style="width:20%;"
              v-for="(hero, index) in category.heroList" :key="index">
              <img :src="hero.avatar" :alt="hero.name" class="w-100">
              <div>
                {{hero.name}}
              </div>
            </router-link>
          </div>
        </template>
      </m-list-card>
      
      <m-card icon="shipin" title="精彩视频">

      </m-card>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  export default {
    filters: {
      date(val){
        return dayjs(val).format('MM/DD')
      }
    },
    name: 'carrousel',
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.pagenation-home'
          },
          // Some Swiper option/callback...
        },
        activeImg: 0,
        timer: null,
        sprite: [
          {title: "爆料站", class: "sprite-news"},
          {title: "故事站", class: "sprite-story"},
          {title: "周边商城", class: "sprite-store"},
          {title: "体验服", class: "sprite-test"},
          {title: "新人专区", class: "sprite-noob"},
          {title: "荣耀·传承", class: "sprite-honor"},
          {title: "王者营地", class: "sprite-king"},
          {title: "公众号", class: "sprite-wechat"},
          {title: "版本介绍", class: "sprite-version"},
          {title: "对局环境", class: "sprite-environment"},
          {title: "无限王者团", class: "sprite-inf-king"},
          {title: "创意互动营", class: "sprite-idea"},

        ],
        newsCats: [],
        heroCats: []
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper)
      this.startTimer()
    },
    created(){
      this.fetchNewsCats();
      this.fetchHeroCats();
    },
    componentWillUnmount() {
      clearInterval(this.timer)
    },
    methods:{
      async fetchNewsCats(){
        const res = await this.$http.get('news/list');
        this.newsCats = res.data;
        // console.log(this.newsCats);
      },
      async fetchHeroCats(){
        const res = await this.$http.get('heroes/list');
        this.heroCats = res.data;
        // console.log(this.heroCats);
      },
      slideTo(n){
        clearInterval(this.timer);
        this.swiper.slideTo(n, 200, false);
        this.activeImg = n;
        this.startTimer()
      },
      startTimer(){
        this.timer = setInterval(
          ()=>{
            this.activeImg++;
            this.activeImg = this.activeImg % 3;
            this.swiper.slideTo(this.activeImg, 1000, false);
            
          }
        , 2000)
      }
    }
    
  }
</script>
<style lang="scss" scoped>
  .pagenation-home{
    bottom: 10%;
    right: 5%;
    z-index: 5;
    position: absolute;
  }
  .nav-icons{
    border-top: 1px solid #ded9de;
    border-bottom: 1px solid #ded9de;
    .nav-item{
      width: 25%;
      border-left: 1px solid #d4d9de;
      &:nth-child(4n+1){
        border-left: none;
      }
    }
  }
</style>
