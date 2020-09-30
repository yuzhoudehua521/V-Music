<template>
  <div class="dj-list">
    <div class="head"></div>
    <div class="body"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  props: {
    djProgramList: {
      type: Array
    }
  },
  mounted() {},
  methods: {
    //根据获得播放列表的电台id，进一步获得MP3播放地址
    async getSong(id) {
      try {
        let res = await this.$api.getSongUrl(id)
        if (res.code === 200) {
          let data = res.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>