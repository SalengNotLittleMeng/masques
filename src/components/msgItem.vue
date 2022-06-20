<template>
  <div>
    <div class="msgItem" v-for="(item, index) in datalist" :key="index">
      <div class="itemLeft">
        <div class="left-content">
          <div class="profile">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="name">{{ item.userName }}</div>
          <div class="local">
            {{ item.place.slice(0, item.place.length - 3) }}
          </div>
        </div>
      </div>
      <div class="itemRight">
        <div class="right-content">
          <div class="blessWords">{{ item.content }}</div>
          <div class="time">{{ item.createTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: [],
      pageNum: 1,
      pageSize: 3,
      pageTotal: null,
      intertimer: null,
    };
  },
  mounted() {
    this.getList();
    this.getPageInter();
  },
  methods: {
    getList() {
      console.log("当前页", this.pageNum);
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api.homeApi.findPage(params).then((result) => {
        console.log(result);
        this.pageTotal = result.data.pages;
        this.datalist = this.datalist.concat(result.data.records);
        console.log("当前数据", this.datalist);
      });
      this.pageNum++;
    },

    getPageInter() {
      this.intertimer = setInterval(() => {
        if (this.pageTotal >= this.pageNum) {
          this.getList();
        } else {
          clearInterval(this.intertimer);
        }
      }, 3000);
    },
  },
};
</script>

<style lang="less" scoped>
.msgItem {
  display: flex;
  width: 100%;
  padding-bottom: 20px;

  .itemLeft {
    position: relative;
    width: 22%;
    .left-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .profile img {
        width: 48px * @topx;
        height: 48px * @topx;
        border-radius: 50%;
      }
      .name {
        width: 100px;
        margin-right: 10px;
        font-size: 14px;
        color: #fff;
      }
      .local {
        margin-top: 6px;
        font-size: 10px;
        color: #fff;
      }
    }
  }

  .itemRight {
    width: 70%;
    min-height: 90px;
    background-color: rgb(191, 99, 88);
    border-radius: 20px;

    .right-content {
      margin-left: 20px;
      margin-top: 10px;
      color: rgb(247, 235, 227);

      // .blessWords{

      // }

      .time {
        float: right;
        font-size: 10px;
        margin-right: 20px;
        margin-top: 30px;
      }
    }
  }
}
</style>
