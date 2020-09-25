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
                <div class="img-wrap"></div>
              </div>
            </div>
          </div>

          <!-- 头部歌词 -->
          <div class="right"></div>
        </div>

        <!-- 评论部分 -->
        <div class="comment">
          <div class="comments">
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
                :current-page="currentPage"
                :page-size="limit"
                hide-on-single-page
                layout="total, prev, pager, next"
                :total="commentTotal"
              >
              </el-pagination>
            </div>
          </div>

          <!-- 右边，相似歌曲推荐 -->
          <div class="recommend" v-if="similarSongs.length">
            <!-- 相似歌单 -->
            <div class="simi-playlist" v-if="similarPlayList.length">
              <p class="title">包含这首歌的歌单</p>
              <ul>
                <li v-for="(item, index) in similarPlayList" :key="index">
                  <img :src="item.coverImgUrl" alt="" class="avatar" />
                  <div class="description">
                    <p>{{ item.name }}</p>
                    <p>{{ utils.tranNumber(item.playCount, 0) }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- 相似歌曲 -->
            <div class="simi-songs" v-if="similarSongs.length">
              <p class="title">相似歌曲</p>
              <ul>
                <li v-for="(items, indexs) in similarSongs" :key="indexs">
                  <img :src="items.album.picUrl" alt="" class="avatar" />
                  <div class="description">
                    <p>{{ items.name }}</p>
                    <p>{{ items.artists.name }}</p>
                  </div>
                </li>
              </ul>
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
      similarSongs: []
    }
  },
  components: {
    CommentList,
    CommentBox
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'loginStatu',
      'currentSong',
      'playing',
      'currentIndex'
    ]),
    ...mapState(['isPlayerShow'])
  },
  mounted() {},
  //监听数据变化
  watch: {
    //监听播放界面显示与否
    isPlayerShow(show) {
      if (show) {
        let id = this.currentSong.id
        this._initialize(id)
      }
    },
    //当前歌曲是否发生改变
    currentSong(newSong, oldSong) {}
  },
  updated() {},
  methods: {
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
      this.getSongComments(id)
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
        let res = this.$api.getSimilarPlayList(id)
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
        let res = this.$api.getSimilarSongs(id)
        if (res.code === 200) {
          this.similarSongs = res.songs
        } else {
          this.similarSongs = []
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.player {
  position: fixed;
  top: 70px;
  bottom: 72px;
  left: 0;
  right: 0;
  padding: 0 36px;
  background: #f9f9f9;
  z-index: 998;
  overflow: hidden;
  overflow-y: hidden;
  // 指定transform，花费0.5完成
  transition: transform 0.5s;

  &.hide {
    // 向下隐藏
    transform: translateY(105%);
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
      }

      .right {
      }
    }

    .comment {
      display: flex;
      margin-top: 48px;
      margin-bottom: 36px;

      .comments {
      }

      .recommend {
      }
    }
  }
}
</style>

