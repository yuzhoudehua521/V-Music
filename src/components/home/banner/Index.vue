<template>
  <el-carousel
    class="banner-carousel"
    :interval="4000"
    type="card"
    v-if="bannersInit"
  >
    <el-carousel-item
      class="banner-carousel-item"
      v-for="item in banners"
      :key="item.imageUrl"
    >
      <img
        class="banner-carousel-img"
        :src="item.imageUrl"
        :alt="item.typeTitle"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      banners: []
    }
  },
  mounted() {
    this.getBanner()
  },
  computed: {
    bannersInit() {
      return this.banners.length
    }
  },
  methods: {
    async getBanner() {
      try {
        let res = await this.$api.getBanner()
        this.banners = res.banners
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
