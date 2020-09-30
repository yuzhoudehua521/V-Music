<template>
  <div class="dj">
    <el-carousel
      class="banner-carousel"
      :interval="4000"
      type="card"
      v-if="bannersInit"
    >
      <el-carousel-item
        class="banner-carousel-item"
        v-for="(items, indexs) in djbanners"
        :key="indexs"
      >
        <img
          class="banner-carousel-img"
          :src="items.pic"
          :alt="items.typeTitle"
        />
      </el-carousel-item>
    </el-carousel>

    <!-- 分类导航 -->
    <div class="category">
      <div>
        <div class="slide-item">
          <div class="slide-item-img">
            <div class="slide-image">
              <img src="../../assets/images/slides.png" alt="" />
            </div>
          </div>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/huatong.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">创造|翻唱</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/erji.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">3D|电子</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/xiaolian.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">情感调频</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/yinyue.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">音乐故事</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/erciyuan.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">二次元</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/shu.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">有声书</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/diandeng.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">知识技能</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/caijing.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">商业财经</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/renwen.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">人文历史</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/waiyu.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">外语世界</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/qinzi.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">亲子宝贝</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/xiangsheng.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">相声曲艺</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/meiwen.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">美文读物</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/tuokouxiu.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">脱口秀</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/guangbo.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">广播剧</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/yule.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">娱乐|影视</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/mingxing.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">明星做主播</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/xiaoyuan.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">校园|教育</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/feiji.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">旅途|城市</p>
        </div>

        <div class="item">
          <div class="item-img">
            <div class="image">
              <img src="../../assets/images/keji.jpg" alt="" />
            </div>
          </div>
          <p class="item-title">科技科学</p>
        </div>

        <div class="slide-item">
          <div class="slide-item-img">
            <div class="slide-image-right">
              <img src="../../assets/images/slides.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <!-- 创作翻唱 -->
      <div class="create">
        <p class="title">创作|翻唱</p>
        <dj-box :data="djData[0].data" :limit="8"></dj-box>
      </div>

      <!-- 商业财经 -->
      <div class="finance">
        <p class="title">商业|财经</p>
        <dj-box :data="djData[1].data" :limit="8"></dj-box>
      </div>

      <!-- 3D -->
      <div class="threeD">
        <p class="title">3D|电子</p>
        <dj-box :data="djData[2].data" :limit="8"></dj-box>
      </div>

      <!-- 音乐故事 -->
      <div class="story">
        <p class="title">音乐|故事</p>
        <dj-box :data="djData[3].data" :limit="8"></dj-box>
      </div>

      <!-- 情感调频 -->
      <div class="emotion">
        <p class="title">情感|调频</p>
        <dj-box :data="djData[4].data" :limit="8"></dj-box>
      </div>

      <!-- 二次元 -->
      <div class="comic">
        <p class="title">二次元</p>
        <dj-box :data="djData[5].data" :limit="8"></dj-box>
      </div>
    </div>
  </div>
</template>

<script>
import djBox from 'components/common/djbox/Index.vue'
export default {
  name: 'DjBanner',
  components: {
    djBox
  },
  data() {
    return {
      djbanners: [],
      djcategory: [],
      djData: [
        {
          id: '2001', //创作翻唱
          data: []
        },
        {
          id: '453051', //商业财经
          data: []
        },
        {
          id: '10002', //3D电子
          data: []
        },
        {
          id: '2', //音乐故事
          data: []
        },
        {
          id: '3', //情感调频
          data: []
        },
        {
          id: '3001', //二次元
          data: []
        }
      ]
    }
  },
  mounted() {
    this.getDjBanner()
    this.getAllData(this.djData)
    console.log(this.djData)
  },
  computed: {
    bannersInit() {
      return this.djbanners.length
    }
  },
  methods: {
    //获得dj轮播图
    async getDjBanner() {
      try {
        let res = await this.$api.getDjBanner()
        this.djbanners = res.data
      } catch (error) {
        console.log(error)
      }
    },
    //获得dj类型数据
    async getDjDate(item) {
      try {
        if (item.id) {
          let res = await this.$api.getDjType(item.id)
          item.data = res.djRadios
        }
      } catch (error) {
        console.log(error)
      }
    },
    getAllData(data) {
      data.forEach(item => {
        this.getDjDate(item)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.dj {
  width: 94%;
  margin: 0 auto;

  .banner-carousel {
    // 在vue项目中使用/deep/  来强制修改elementUI组件样式
    /deep/ .el-carousel__container {
      height: 250px;
    }

    .banner-carousel-img {
      height: 250px;
      border-radius: 4px;
    }
  }

  .category {
    margin-top: 30px;
    margin-bottom: 50px;
    display: block;
    overflow: auto;
    white-space: nowrap;

    .slide-item {
      display: inline-block;
      width: 69px;
      height: 69px;
      cursor: pointer;

      .slide-item-img {
        width: 41px;
        height: 69px;
        overflow: hidden;
        margin: 10px auto 0;

        .slide-image {
          width: 166px;
          height: 69px;

          &:hover {
            transform: translateX(84px);
          }

          img {
            transform: translateX(-84px);
          }
        }

        .slide-image-right {
          width: 166px;
          height: 69px;

          &:hover {
            transform: translateX(83px);
          }

          img {
            transform: translateX(-125px);
          }
        }
      }
    }

    .item {
      display: inline-block;
      width: 90px;
      height: 90px;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 5px;

        .image {
          transform: translateX(-48px);
        }
      }

      .item-title {
        text-align: center;
      }

      .item-img {
        width: 48px;
        height: 48px;
        overflow: hidden;
        margin: 10px auto 0;

        .image {
          width: 96px;
          height: 48px;
        }
      }
    }
  }

  .content {
    .title {
      margin: 0 0 15px 0;
      font-size: 16px;
      font-family: PingFang SC, Arial, Microsoft YaHei, sans-serif;
      color: #4a4a4a;
      font-weight: bold;
    }
  }
}
</style>
