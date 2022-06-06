<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性值的面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-jiantoushang': isAsc, 'icon-jiantouxia': isDesc }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-jiantoushang': isAsc, 'icon-jiantouxia': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候切记别忘了带上id（params参数） -->
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagenation
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          ></Pagenation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        // 一级分类ID
        category1Id: "",
        // 二级分类ID
        category2Id: "",
        // 三级分类ID
        category3Id: "",
        // 分类名
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器：当前第几页
        pageNo: 1,
        // 每一页展示数据的个数
        pageSize: 3,
        // 平台售卖属性的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },

  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    // 获取search模块展示数据的总数
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  // 在主键挂载之前获取 点击的商品属性 并修改传给服务器的数据
  beforeMount() {
    // 合并数据对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // 当路由信息发送变化时 再向服务器发送请求
  },
  mounted() {
    // 在发送请求之前 带给服务器的参数【searchParams】发生变化 将数据带给服务器
    this.getData();
  },
  methods: {
    // 向服务器获取 search 数据（根据参数不同返回不同的数据）
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 清除面包屑的分类名字
    removeCategoryName() {
      // 将带给服务器的 参数置空（由于接口传递的参数可有可无，所以可以置为undefined）再发起请求
      // 因为 相应字段为空的字符串 还是会传递给服务器；但是undefined 的属性不会带给服务器（优化宽带）
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 重新发起请求
      this.getData();
      // 更新路由信息：进行路由跳转（重置 参数的作用）
      // 判断是否有params参数
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除面包屑关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      // 通知 兄弟组件 清空关键字
      this.$bus.$emit("clear");
      // 路由信息 params参数重置
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 品牌信息 自定义事件回调
    trademarkInfo(trademark) {
      // 整理参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发请求
      this.getData();
    },
    // 删除面包屑 品牌
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 收集平台属性的 自定义事件回调
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]
      // 参数数据格式整理
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 判断元素是否重复，数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }

      // 再次发请求
      this.getData();
    },
    // 删除面包屑 平台售卖属性
    removeAttr(index) {
      // 删除对应索引的 元素  再次整理参数
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 排序操作
    changeOrder(flag) {
      // flag形参：标记，代表用户点击的是 '1' 综合  '2' 价格
      // let originOrder = this.searchParams.order;
      // 获取 起始的状态
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      // 创建新的order状态
      let newOrder = "";
      // 判断当前是哪个 标记
      if (flag == originFlag) {
        // 如果点击的是 综合 则将排序置反
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
        // console.log(newOrder);
      } else {
        // 点击价格
        newOrder = `${flag}:${"desc"}`;
      }
      // 将新的状态 赋值给searchParams
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 自定义回调事件 --获取子组件返回的 pageNo当前第几页
    getPageNo(pageNo) {
      // 整理 子组件传递回来的参数
      this.searchParams.pageNo = pageNo;
      // 发请求
      this.getData();
    },
  },
  // 数据监听：监听组件实例身上的属性的 属性值变化
  watch: {
    // 监听路由的信息是否发生改变，如果改变则 重新发起请求
    $route(newValue, oldValue) {
      // 重新发起请求前  需要再次 整理更改的数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发请求
      this.getData();
      // 每一次请求完毕 应该把三级分类的id置空，去接收下一次请求的三级分类ID
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
