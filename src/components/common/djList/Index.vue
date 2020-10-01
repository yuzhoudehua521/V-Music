<template>
  <div class="dj-list">
    <div class="head">
      <div class="item item-play">
        <i class="iconfont niceOutlined_Play"></i> 播放全部
      </div>

      <div class="item">
        <i class="iconfont niceicon-heart">订阅</i>
      </div>
    </div>

    <table class="body">
      <thead>
        <tr>
          <th class="th-index">序号</th>
          <th class="th-name">节目</th>
          <th class="th-count">听众</th>
          <th class="th-create">创建时间</th>
          <th class="th-long">时长</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in djProgramList" :key="index">
          <td>
            <div class="index">
              <span class="num">{{ utils.formatZero(index + 1, 2) }}</span>
            </div>
          </td>
          <td>
            <div class="name">
              <div class="avatar">
                <img :src="item.coverUrl" alt="" />
              </div>
              <span>{{ item.name }}</span>
            </div>
          </td>
          <td>
            <div class="count">
              <span>{{ utils.tranNumber(item.listenerCount, 0) }}</span>
            </div>
          </td>
          <td>
            <div class="create">
              <span>{{ utils.dateFormat(item.createTime, 'YYYY-MM-DD') }}</span>
            </div>
          </td>
          <td>
            <div class="long">
              <span>{{
                utils.formatSecondTime(item.mainSong.duration / 1000)
              }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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

<style lang="stylus" scoped>
.dj-list {
  .head {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;

    .item {
      margin: 0 10px;
      padding: 7px 15px;
      background: #f2f2f2;
      border-radius: 50px;
      justify-content: center;
      align-items: center;
      font-size: 15px;
    }

    .item-play {
      background: #fa2800;
      color: #fff;
    }
  }

  .body {
    width: 100%;

    thead {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #fafafa;
      color: #999;

      th {
        padding: 0 9px;
        text-align: left;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;

        &.th-index {
          width: 10%;
          text-align: center;
        }

        &.th-name {
          width: 50%;
        }

        &.th-count {
          width: 15%;
        }

        &.th-create {
          width: 15%;
        }

        &.th-long {
          width: 15%;
          text-align: right;
          padding-right: 55px;
        }
      }
    }

    tbody {
      width: 100%;

      tr {
        height: 50px;
        line-height: 50px;
        transition: background-color 0.2s linear;

        &:nth-child(2n) {
          background: #f7f7f7;
        }

        &:hover {
          background: #e8e9ed;
        }

        td {
          padding: 0 9px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .index {
            color: #4a4a4a;
            font-weight: 500;
            text-align: center;
          }

          .name {
            display: flex;
            align-items: center;

            .avatar {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 15px;
              cursor: pointer;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }

          .long {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>