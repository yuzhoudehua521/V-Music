<template>
  <div class="content">
    <div class="top">
      <div class="avatar"></div>

      <div class="info"></div>
    </div>

    <div class="body"></div>
  </div>
</template>

<script>
import djList from 'components/common/djList/Index'

export default {
  components: {
    djList
  },
  data() {
    return {
      djId: '',
      djInfo: {},
      djProgramList: []
    }
  },
  mounted() {
    let id = this.$route.query.id
    this.djId = id
  },
  methods: {
    //1获取dj详细信息
    async getDjInformation(id) {
      try {
        let res = await this.$api.getDjInformation(id)
        if (res.code === 200) {
          this.djInfo = res.program
        }
      } catch (err) {
        console.log(err)
      }
    },
    //2获取点击节目列表
    async getDjProgram(id) {
      try {
        let res = await this.$api.getDjProgram(id)
        if (res.code === 200) {
          this.djProgramList = res.programs
        }
      } catch (err) {
        console.log(err)
      }
    },

    //初始化函数
    _initialize(id) {}
  }
}
</script>

<style lang="stylus" scoped></style>