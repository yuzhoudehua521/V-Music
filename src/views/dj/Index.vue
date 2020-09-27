<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'DjBanner',
  data() {
    return {
      djbanners: []
    }
  },
  mounted() {
    this.getDjBanner()
  },
  computed: {
    bannersInit() {
      return this.djbanners.length
    }
  },
  methods: {
    async getDjBanner() {
      try {
        let res = await this.$api.getDjBanner()
        this.djbanners = res.data
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
    height: 200px;
  }

  .banner-carousel-img {
    height: 200px;
    border-radius: 4px;
  }
}
</style>
