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
    return {
      Pid: '', //电台节目id
      id: '' //MP3音乐id
    }
  },
  mounted() {},
  methods: {
    //1,先获取电台播放列表
    async getProgram(Pid) {
      try {
        let res = await this.$api.getDjProgram(Pid)
        if (res.code === 200) {
          let data = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    //2,根据获得播放列表的电台id，进一步获得MP3播放地址
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

<style>
</style>