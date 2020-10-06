<template>
  <transition name="slide">
    <div :class="getPlayerShowClass()" class="player">
      <div class="content">
        <!-- 播放组件头部 -->
        <div class="song">
          <!-- 头部特效 -->
          <div class="left">
            <img
              class="play-bar-support"
              src="../../../assets/images/play-bar-support.png"
              alt=""
            />
            <img
              :class="{ playing }"
              class="play-bar"
              src="../../../assets/images/play-bar.png"
              alt=""
            />
            <!-- 转圈图片 -->
            <div class="img-outer-border" ref="disc">
              <div
                :class="{ paused: !playing }"
                class="img-outer"
                ref="discRotate"
              >
                <div class="img-wrap">
                  <img :src="currentSong.image" alt="" />
                </div>
              </div>
            </div>
          </div>

          <!-- 头部歌词 -->
          <div class="right">
            <div class="name-wrap">
              <p class="name">{{ currentSong.name }}</p>
              <!-- <span @click="onGoMv" class="mv-tag" v-if="currentSong.mvId">MV</span> -->
            </div>
            <div class="desc">
              <div class="desc-item">
                <span class="label">专辑：</span>
                <div class="value">{{ currentSong.album }}</div>
                <span class="label">歌手：</span>
                <div class="value">{{ currentSong.singer }}</div>
              </div>
            </div>

            <!-- 歌词 -->
            <transition name="fade">
              <div class="lyric-box shadow" v-if="showLyric">
                <div class="title flex-between">歌词</div>
                <scroll
                  class="lyric"
                  ref="lyricList"
                  :data="currentLyric && currentLyric.lines"
                >
                  <div class="lyric-wrapper">
                    <div v-if="currentLyric">
                      <p
                        ref="lyricLine"
                        class="lyric-text"
                        :class="currentLyricNum === index ? 'active' : ''"
                        v-for="(item, index) of currentLyric.lines"
                        :key="index"
                      >
                        {{ item.txt }}
                      </p>
                    </div>
                    <div class="no-lyric" v-else>暂无歌词，请您欣赏</div>
                  </div>
                </scroll>
                <div class="foot"></div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 评论部分 -->
        <div class="comment">
          <div class="left">
            <div class="title flex-row">
              <i class="iconfont nicepinglun"></i>Comments |
              <span class="noticom"
                ><a>已有{{ commentTotal }}条评论</a>
              </span>
            </div>
            <!-- 我的评论 -->
            <comment-box
              :currentCommentId="currentCommentId"
              @commentSubmit="commentSubmit"
              :clearContent="clearContent"
              v-if="currentCommentId == ''"
            />
            <!-- 精彩评论,最新评论 -->
            <comment-list
              title="精彩评论"
              :commentList="hotComments"
              :currentCommentId="currentCommentId"
              @commentHandle="commentHandle"
              @cancelComment="cancelComment"
              @commentSubmit="commentSubmit"
              @commentLike="commentLike"
              v-if="hotComments.length > 0"
            />
            <comment-list
              title="最新评论"
              :commentList="comments"
              :currentCommentId="currentCommentId"
              @commentHandle="commentHandle"
              @cancelComment="cancelComment"
              @commentSubmit="commentSubmit"
              @commentLike="commentLike"
            />
            <!-- 分页 -->
            <div class="page-wrap">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="limit"
                layout="total, prev, pager, next"
                :total="commentTotal"
              >
              </el-pagination>
            </div>
          </div>

          <!-- 右边，相似歌曲推荐 -->
          <div class="right" v-if="similarSongs.length">
            <!-- 相似歌单 -->
            <div class="simi-playlists" v-if="similarPlayList.length">
              <p class="title">包含这首歌的歌单</p>
              <div>
                <div
                  v-for="(item, index) in similarPlayList"
                  :key="index"
                  class="simi-item"
                >
                  <img :src="item.coverImgUrl" alt="" class="avatar" />
                  <div class="description">
                    <p>{{ item.name }}</p>
                    <p class="count">
                      播放：{{ utils.tranNumber(item.playCount, 0) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 相似歌曲 -->
            <div class="simi-playlists" v-if="similarSongs.length">
              <p class="title">相似歌曲</p>
              <div>
                <div
                  v-for="(items, indexs) in similarSongs"
                  :key="indexs"
                  class="simi-item"
                >
                  <img :src="items.album.picUrl" alt="" class="avatar" />
                  <div class="description">
                    <p>{{ items.name }}</p>
                    <p class="count">{{ items.album.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CommentList from 'components/common/commentList/Index.vue'
import CommentBox from 'components/common/commentBox/Index.vue'
import Scroll from 'components/common/scroll/Index'
import Lyric from 'lyric-parser'
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      songId: '',
      hotComments: [],
      comments: [],
      currentPage: 0,
      limit: 20, // 取出评论数量 , 默认为 20
      offset: 0, //分页
      commentTotal: 0,
      currentCommentId: '', //回复的评论id (回复评论时必填)
      // 是否清空评论框内容
      clearContent: false,
      similarPlayList: [], //相似歌单和歌曲
      similarSongs: [],
      showLyric: false,
      currentLyric: null,
      currentLyricNum: 0
    }
  },
  components: {
    CommentList,
    CommentBox,
    Scroll
  },
  computed: {
    ...mapGetters(['userInfo', 'loginStatu', 'currentSong', 'currentIndex']),
    ...mapState(['isPlayerShow', 'playing'])
  },
  mounted() {},
  //监听数据变化
  watch: {
    //监听播放界面显示与否
    isPlayerShow(show) {
      if (show) {
        let id = this.currentSong.id
        this.songId = this.currentSong.id
        this._initialize(id)
        console.log(this.songId)
      }
    },
    //当前歌曲是否发生改变
    currentSong(newSong, oldSong) {
      if (newSong) {
        this._initialize(newSong.id)
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        // 重置为null
        this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLyricNum = 0
      }
    },
    $route: {
      handler: function() {
        this.setPlayerShow((this.isPlayerShow = false))
      },
      immediate: true
    }
  },
  updated() {},
  methods: {
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getSongComments(this.songId)
    },
    //播放界面组件显示和隐藏
    ...mapMutations({ setPlayerShow: 'SET_PLAYER_SHOW' }),
    getPlayerShowClass() {
      //界面组件显示和隐藏css控制
      return this.isPlayerShow ? 'show' : 'hide'
    },
    //获得歌曲评论
    async getSongComments(id) {
      let params = {
        id,
        limit: this.limit,
        offset: this.offset
      }
      try {
        let res = await this.$api.getSongComment(params)
        if (res.code === 200) {
          this.commentTotal = res.total
          if (res.hotComments) {
            this.hotComments = res.hotComments
            console.log(res.hotComments)
          } else {
            this.hotComments = []
          }
          this.comments = res.comments
        }
      } catch (error) {
        console.log(error)
      }
    },
    //初始化
    _initialize(id) {
      this.getLyric(id)
      this.getSongComments(id)
      this.getSimilarPlayList(id)
      this.getSimilarSongs(id)
    },
    // 提交歌曲评论， t:1 发送, 2 回复
    commentSubmit(content) {
      if (!content) {
        this.$message.error('请写点什么吧...')
        return
      } else {
        let timestamp = new Date().getTime()
        let params = {
          type: 0,
          id: this.songId,
          content: content,
          timestamp
        }
        if (this.currentCommentId == '') {
          // 发布评论
          params.t = 1
        } else {
          // 回复评论，commentId:回复的评论id (回复评论时必填)
          params.t = 2
          params.commentId = this.currentCommentId
        }
        this.$api
          .sendComment(params)
          .then(res => {
            if (res.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.cancelComment()
              this.clearContent = true
              this.getSongComments(this.songId)
            }
          })
          .catch(err => {
            this.$notify.error({
              title: err.data.dialog.title,
              message: err.data.dialog.subtitle
            })
          })
      }
    },
    // 取消评论
    cancelComment() {
      this.currentCommentId = ''
    },
    // 点击评论
    commentHandle(id) {
      this.currentCommentId = id
    },
    // 评论点赞
    async commentLike(id, liked) {
      let timestamp = new Date().getTime()
      let params = {
        id: this.songId, //歌曲id
        cid: id, //评论id
        type: 1,
        timestamp
      }
      if (liked) {
        //t : 是否点赞 ,1 为点赞 ,0 为取消点赞
        params.t = 0
      } else {
        params.t = 1
      }
      try {
        let res = await this.$api.likeComment(params)
        if (res.code === 200) {
          this.getSongComments(this.songId)
        }
      } catch (error) {
        console.log(error)
      }
    },
    //获取相似歌单和歌曲
    async getSimilarPlayList(id) {
      try {
        let res = await this.$api.getSimilarPlayList(id)
        if (res.code === 200) {
          this.similarPlayList = res.playlists
        } else {
          this.similarPlayList = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getSimilarSongs(id) {
      try {
        let res = await this.$api.getSimilarSongs(id)
        if (res.code === 200) {
          this.similarSongs = res.songs
        } else {
          this.similarSongs = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取歌词
    async getLyric(id) {
      try {
        let res = await this.$api.getLyric(id)
        if (res.code === 200) {
          let lyric = res.lrc.lyric
          this.currentLyric = new Lyric(lyric, this.lyricHandle)
          if (this.isPureMusic) {
            const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g
            this.pureMusicLyric = this.currentLyric.lrc
              .replace(timeExp, '')
              .trim()
            this.playingLyric = this.pureMusicLyric
          } else {
            if (this.playing && this.canLyricPlay) {
              this.currentLyric.seek(this.currentTime * 1000)
            }
            console.log(this.currentLyric)
          }
        }
      } catch (error) {
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLyricNum = 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.player {
  position: fixed;
  top: 70px;
  bottom: 65px;
  left: 0;
  right: 0;
  padding: 0 36px;
  background: #f9f9f9;
  z-index: 998;
  overflow: scroll;
  // 指定transform，花费0.5完成
  transition: transform 0.5s;

  &.hide {
    // 向下隐藏
    transform: translateY(120%);
  }

  &.show {
    transform: none;
  }

  .content {
    max-width: 870px;
    margin: auto;

    .song {
      display: flex;

      .left {
        position: relative;
        display: flex;
        justify-content: center;
        padding: 80px 70px 36px 36px;

        .play-bar-support {
          position: absolute;
          left: 180px;
          width: 30px;
          height: 30px;
          top: -15px;
          z-index: 999;
        }

        .play-bar {
          position: absolute;
          width: 100px;
          height: 146px;
          top: 0px;
          right: 138px;
          transform-origin: 0 0;
          transform: rotate(-30deg);
          transition: all 0.3s;
          z-index: 980;

          &.playing {
            transform: rotate(5deg);
          }
        }

        .img-outer-border {
          width: 320px;
          height: 320px;
          border-radius: 50%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background: #e6e5e6;

          .img-outer {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            background: #000;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            animation: rotate 20s linear infinite;

            &.paused {
              animation-play-state: paused;
            }

            .img-wrap {
              width: 200px;
              height: 200px;
              flex-shrink: 0;

              img {
                height: 200px;
                width: 200px;
                border-radius: 50%;
                overflow: hidden;
              }
            }
          }
        }
      }

      .right {
        flex: 1;
        padding-top: 45px;

        .name-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          .name {
            font-size: 24px;
            color: #333;
          }
        }

        .desc {
          display: flex;
          font-size: 8px;
          margin-bottom: 30px;

          .desc-item {
            display: flex;
            margin-right: 32px;

            .label {
              display: inline-block;
              margin-right: 4px;
            }

            .value {
              color: #517eaf;
              margin-right: 40px;
              width: 100px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }

    .comment {
      display: flex;
      margin-top: 48px;
      margin-bottom: 36px;

      .left {
        flex: 1;

        .page-wrap {
          cursor: pointer;
        }
      }

      .right {
        padding-left: 36px;
        width: 25%;
        overflow: hidden;

        .title {
          font-size: 16px;
          margin-bottom: 12px;
          font-weight: bold;
        }

        .simi-playlists {
          margin-bottom: 36px;

          .avatar {
            display: block;
            width: 50px;
            height: 50px;
          }

          .simi-item {
            display: flex;
            margin-bottom: 6px;
            cursor: pointer;

            .description {
              justify-content: center;
              margin-left: 5px;
              align-items: center;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;

              .count {
                margin-top: 4px;
              }
            }
          }
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
</style>

