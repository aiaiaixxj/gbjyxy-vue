<template>
  <div>
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
      <div>
        <input type="button" value="返回" @click="back" />
      </div>
      <div
        v-for="(item, index) in resdata"
        v-bind:key="index"
        :data-id="item.id"
      >
        <!-- <van-button
          type="primary"
          size="mini"
          custom-style="width:19rpx;height:42rpx;line-height:42rpx;position:relative;top:129rpx;left:590rpx"
          style=""
          class="vanbtn"
          >{{ status }}</van-button -->

        <!-- <navigator  url="../AllTrainingCoursesDetail/AllTrainingCoursesDetail?index={{resdata[index].id}}" style="" class="navigator"> -->
        <div
          style="
            display: flex;
            flex-direction: row;
            margin-bottom: 10px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          "
        >
          <div class="" style="display: flex; padding: 3px 3px">
            <img
              style="width: 140px; height: 100px"
              src="../../static/images/title.png"
              mode=""
            />
          </div>
          <div style="display: flex; flex-direction: column">
            <!-- <router-link
              active-class="RouteLinkStyle"
              :to="{ name: 'home', params: { id: item.id } }"
              style=""
            > -->
            <div
              @click="goToOtherPages"
              :data-id="resdata[index].id"
              class="title-name"
            >
              {{ resdata[index].name }}
            </div>
            <!-- </router-link> -->
            <div style="margin-left: 10px">
              <div>发布时间：{{ resdata[index].startDate }}</div>
              <div style="margin-top: 10px">
                结束时间：{{ resdata[index].endDate }}
              </div>
            </div>
          </div>
        </div>
        <!-- </navigator> -->
      </div>
    </scroller>
  </div>
</template>
<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
export default {
  data() {
    return {
      topscore: "",
      showWxcDialog: false,
      searchCancle: false,
      canshowContent: true,
      canshowQuerryContent: false,
      name: "",
      userId: "",
      dataResComplete: "",
      resdata: [],
      coursesList: [],
      totalpage: "",
      pageNo: 1,
      listLock: 1,
      pageSize: 20,
      hasMoreData: true,
      userInfo: JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData"))
        : "",
      divShowed: false, //显示结果div的状态
      inputVal: "", // 搜索框值
      catList: [], //搜索渲染推荐数据
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    goToOtherPages(e) {
      console.log("e===>>>", e);
      let id = e.currentTarget.dataset.id;
      console.log(id);
      this.$axios({
        method: "POST",
        url: "/applets/exam/status.jspx",
        params: {
          examId: id,
          userId: this.userInfo.userId,
        },
        header: {
          "content-type": "application/x-www-form-urlencoded",
        }, //请求头的信息
      })
        .then((res) => {
          console.log("res===>>>", res);
        })
        .catch((error) => {
          console.log("error===>>>", error);
        });
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    getData() {
      var that = this;
      this.$axios({
        method: "POST",
        url: "/applets/exam-list.jspx",
        params: {
          pageNo: that.pageNo,
        },
        header: {
          "content-type": "application/x-www-form-urlencoded",
        }, //请求头的信息
      })
        .then((res) => {
          console.log("res=>", res);
          console.log("res.data=>", res.data); //调出来的数据在控制台显示，方便查看
          var e = res.data.exams;
          console.log(e);

          // resdata: e.courses,//res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
          that.totalPage = res.data.totalPage;
          that.coursesList = e;
          var contentlistTem = that.resdata;
          if (that.pageNo == 1) {
            contentlistTem = [];
          }
          var resdata = e;
          if (that.pageNo >= res.data.totalPage) {
            that.resdata = contentlistTem.concat(resdata);
            that.hasMoreData = false;
          } else {
            that.resdata = contentlistTem.concat(resdata);
            that.hasMoreData = true;
            that.pageNo = that.pageNo + 1;
          }
        })
        .catch((error) => {
          console.log("error=>", error);
        });
    },
    infinite(done) {
      console.log("okoko");
      if (this.hasMoreData) {
        this.getData();
      }
      this.$refs.myscroller.finishInfinite(true);
      // if (this.noData) {
      //   setTimeout(() => {
      //     this.$refs.myscroller.finishInfinite(2);
      //   });
      //   return;
      // }
      // let self = this;
      // let start = this.moveList.length;

      // setTimeout(() => {
      //   for (let i = start + 1; i < start + 10; i++) {
      //     self.moveList.push(i);
      //   }
      //   if (start > 30) {
      //     self.noData = "没有更多数据";
      //   }
      //   self.$refs.myscroller.resize();
      //   done();
      // }, 1500);
    },
    refresh() {
      console.log("refresh");
      this.$refs.myscroller.finishPullToRefresh();
    },
  },
};
</script>
<style scoped>
.user-panel {
  width: 100%;
  overflow: hidden;
}
.divLine {
  background: #e0e3da;
  width: 100%;
  height: 3rpx;
}

.box {
  background-color: #fff;
}

.navigator {
  /* padding: 10rpx 10rpx; */
  display: flex;
  flex-direction: row;
  border-bottom: 2rpx solid #eaeaea;
  padding-bottom: 26rpx;
  margin-top: 25rpx;
}

.head {
  flex-shrink: 0;
  width: 190rpx;
  height: 130rpx;
  margin-right: 20rpx;
  margin-left: 25rpx;
}

.imgBorder {
  border: 3rpx solid #eaeaea;
  border-radius: 10rpx;
  padding: 10rpx;
  margin-left: 25rpx;
}

.center {
  margin-left: 12rpx;
  margin-top: 13rpx;
}

.name {
  display: flex;
  align-items: center;
}

.name-text {
  margin-top: -8rpx;
  font-size: 27rpx;
  font-weight: bold;
  color: #333;
  margin-right: 20rpx;
  width: 98%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.title-name {
  display: -webkit-box;
  margin: 10px 10px;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.code {
  font-size: 24rpx;
  color: #999;
  margin-top: 20rpx;
}
.custom-class {
  text-align: center;
}
.custom-class1 {
  position: relative;
  left: 40%;
}
</style>