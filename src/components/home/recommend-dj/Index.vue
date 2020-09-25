<template>
  <div class="recommend-songs">
    <h2 class="title">推荐电台</h2>
    <dj-list :djRadios="djRadios"></dj-list>
  </div>
</template>

<script>
import djList from 'components/common/djList/Index.vue'
export default {
  data() {
    return {
      djRadios: []
    }
  },
  components: {
    djList
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取推荐歌单
    async getDjHot() {
      try {
        let res = await this.$api.getDjHot()
        this.djRadios = res.djRadios
      } catch (error) {
        console.log(error)
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getDjHot()
  }
}
</script>
<style lang="stylus" scoped>
.recommend-songs {
  margin-top: 40px;

  .title {
    margin: 0 0 15px 0;
  }
}
</style>
