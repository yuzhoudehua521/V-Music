<template>
  <div class="content">
    <div class="left shadow">
      <div class="top">
        <div class="cover">
          <img :src="djInfo.picUrl" alt="" />
        </div>

        <div class="info">
          <div class="title">
            <span>{{ djInfo.name }}</span>
          </div>
          <div class="user">
            <div class="avatar">
              <img :src="djInfo.dj.avatarUrl" alt="" />
            </div>
            <span class="nickname">
              {{ djInfo.dj.nickname }}
            </span>
            <span class="createtime">
              {{ utils.dateFormat(djInfo.createTime, 'YYYY-MM-DD') }} 创建
            </span>
          </div>

          <span class="category"
            >分类：
            <a class="category-item" href="#">{{ djInfo.category }}</a>
          </span>

          <div class="desc">
            <p>{{ djInfo.desc }}</p>
          </div>
        </div>
      </div>

      <div class="body">
        <dj-list :djProgramList="djProgramList"> </dj-list>
      </div>
    </div>

    <div class="right shadow">
      <!-- 精彩评论 -->
      <p class="right-title">精彩评论</p>
      <div v-for="(item, index) in djInfo.commentDatas" :key="index">
        <div class="comment">
          <img :src="item.userProfile.avatarUrl" alt="" class="comment-img" />
          <div class="comment-info">
            <p class="comment-name">{{ item.userProfile.nickname }}</p>
            <p class="comment-content">{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
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
    this._initialize(id)
  },
  watch: {
    $route(newId, oldId) {
      console.log(newId, oldId)
      let id = this.$route.query.id || this.djId
      this._initialize(id)
    }
  },
  methods: {
    //1获取dj详细信息
    async getDjInformations(id) {
      try {
        let res = await this.$api.getDjInformation(id)
        if (res.code === 200) {
          this.djInfo = res.djRadio
        }
      } catch (err) {
        console.log(err)
      }
    },
    //2获取dj节目列表
    async getDjPrograms(id) {
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
    _initialize(id) {
      this.getDjInformations(id)
      this.getDjPrograms(id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.content {
  display: flex;
  align-items: flex-start;
  width: 94%;
  margin: 0 auto;
  background: #fff;

  .left {
    flex: 1;
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;

    .top {
      display: flex;

      .cover {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          position: relative;
        }

        &::before {
          content: '';
          width: 95%;
          height: 95%;
          background: rgba(0, 0, 0, 0.2);
          position: absolute;
          top: 15px;
          right: -5px;
          z-index: 0;
          border-radius: 8px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          width: 100%;
          font-size: 24px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 20px;
          margin-top: 10px;
          overflow: hidden;
        }

        .user {
          margin-bottom: 15px;
          display: flex;

          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: relative;
            margin-right: 15px;
            cursor: pointer;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              position: relative;
            }
          }

          .nickname {
            margin-top: 7px;
            font-size: 16px;
            margin-right: 30px;
            line-height: 16px;
            cursor: pointer;
          }

          .createtime {
            margin-top: 8px;
            font-size: 14px;
            line-height: 14px;
            color: #808080;
          }
        }

        .category {
          font-size: 14px;

          .category-item {
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            padding: 4px 12px;
            border-radius: 15px;
            background: #fa2800;
          }
        }

        .desc {
          line-height: 1.6;
          margin-top: 15px;
        }
      }

      .category {
        display: inline-block;
      }
    }
  }

  .right {
    width: 350px;
    flex-shrink: 0;
    padding: 0 10px;

    .right-title {
      border-left: 3px solid #fa2800;
      height: 20px;
      margin-top: 10px;
      padding-left: 1rem;
      margin-bottom: 15px;
      font-weight: bold;
      color: #4a4a4a;
    }

    .comment {
      margin: 20px 0;
      display: flex;

      .comment-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: relative;
        margin-right: 15px;
        cursor: pointer;
      }

      .comment-info {
        .comment-name {
          font-size: 15px;
          margin-right: 5px;
          margin-bottom: 10px;
          cursor: pointer;
          color: #4a4a4a;
        }

        .comment-content {
          width: 100%;
          font-size: 12px;
          color: #666;
          line-height: 1.6;
          padding: 5px 10px;
          background: #f5f5f5;
          margin-top: 5px;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>