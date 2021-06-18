<template>
  <div>
    <!-- 刷新页面后的顶部提示框 -->
    <div class="tips" v-if="tipShow" :class="{ 'tips-ani': true }">
      为您更新了10条最新新闻动态
    </div>

    <!-- 基于 uni-list 的页面布局 -->

    <!-- to属性：将新闻ID和标题传给详情页 -->
    <!-- TODO：需增加日期格式化的示例 -->
    <!-- to 属性携带参数跳转详情页面，当前只为参考 -->
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
      <div
        direction="row"
        v-for="(item, index) in resdata"
        :key="index"
        :title="item.title"
        :note="item.date"
      >
        <!-- 通过header插槽定义列表左侧的图片显示，其他内容通过List组件内置属性实现-->

        <div style="display: flex; flex-direction: row; margin-bottom: 10px">
          <div
            class=""
            style="border: 2px solid red; display: flex; padding: 3px 3px"
          >
            <img
              style="width: 140px; height: 100px"
              src="../../static/images/title.png"
              mode=""
            />
          </div>
          <div
            :class="dynamicTitleClass[index]"
            style="display: flex; flex-direction: column; border: 2px solid red"
          >
            <router-link
              active-class="RouteLinkStyle"
              :to="{ name: 'home', params: { id: item.id } }"
              style=""
            >
              <div
                class=""
                style="
                  display: -webkit-box;
                  margin: 10px 10px;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-box-orient: vertical;
                  word-break: break-all;
                "
              >
                {{ item.title }}
              </div>
            </router-link>
            <div class="" style="margin: 10px;">
              {{ item.date }}
            </div>
          </div>
        </div>

        <div v-if="hasMoreData" />
      </div>
    </scroller>
  </div>
</template>
<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
export default {
  name: "Announcements",
  data() {
    return {
      tipShow: false, // 是否显示顶部提示框
      pageNo: 1,
      totalPage: 1,
      resdata: [],
      dynamicTitleClass: ["img-title-box"],
      hasMoreData: false,
      noData: "",
      moveList: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
    };
  },
  mounted() {
    console.log("Announcements is show!");
    this.getData();
  },

  methods: {
    load(data, ended) {
      // if (ended) {
      // 	this.formData.status = 'noMore'
      // }
    },
    getData() {
      this.$axios({
        method: "POST",
        url: "/applets/content-list.jspx",
        params: {
          channelId: 3,
          pageNo: this.pageNo,
        },
        header: {
          "content-type": "application/x-www-form-urlencoded",
        }, //请求头的信息
      })
        .then((res) => {
          console.log(res); //调出来的数据在控制台显示，方便查看
          var e = res.data.contents;
          console.log(e);

          // resdata: e.courses,//res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
          this.totalPage = res.data.totalPage;

          var contentlistTem = this.resdata;
          if (this.pageNo == 1) {
            contentlistTem = [];
          }
          var resdata = e;
          if (this.pageNo >= e.totalPage) {
            (this.resdata = contentlistTem.concat(resdata)),
              (this.hasMoreData = false);
          } else {
            (this.resdata = contentlistTem.concat(resdata)),
              (this.hasMoreData = true),
              (this.pageNo = this.pageNo + 1);
          }
        })
        .catch((error) => {});
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
  /**
   * 下拉刷新回调函数
   */
  onPullDownRefresh() {
    console.log("下拉");
    this.pageNo = 1;
    this.getData();
  },
  /**
   * 上拉加载回调函数
   */
  onReachBottom() {
    if (this.hasMoreData) {
      this.getData();
    } else {
    }
  },
};
</script>

<style scoped>
/* page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	} */

.tips {
  color: #67c23a;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  background-color: #f0f9eb;
  height: 0;
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.3s;
}
.img-title-box {
  background-color: lightgray;
}
.tips-ani {
  transform: translateY(0);
  height: 40px;
  opacity: 1;
}

.content {
  width: 100%;
  display: flex;
}

a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: red;
}
</style>
