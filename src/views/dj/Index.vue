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
      <div class="item">
        <div class="item-img">
          <div class="image"></div>
        </div>
        <p class="item-title">创造|翻唱</p>
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
      height: 200px;
    }

    .banner-carousel-img {
      height: 200px;
      border-radius: 4px;
    }
  }

  .category {
    margin-bottom: 100px;

    .item {
      width: 90px;
      height: 90px;

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
          background: url('../../assets/images/huatong.jpg') no-repeat;
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
