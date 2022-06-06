<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button
      v-if="starNumAndEndNum.startNum > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="starNumAndEndNum.startNum > 2">···</button>

    <!-- 连续页码部分 -->
    <button
      v-for="(page, index) in starNumAndEndNum.endNum"
      :key="index"
      v-if="page >= starNumAndEndNum.startNum"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="starNumAndEndNum.endNum < totalPage - 1">···</button>
    <button
      v-if="starNumAndEndNum.endNum < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagenation",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页码的 起始数字 与 结束的数字 [连续的页码数至少是5]
    starNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let startNum = 0,
        endNum = 0;
      // 连续页码至少是5页 ，如果出现不正常现象，总页数不够5页
      if (continues > totalPage) {
        // 连续页码大于总页数，【总页数】没有连续页码大 start 为1  end为totalPage
        startNum = 1;
        endNum = totalPage;
      } else {
        // [总页数 > 连续页码--5]
        startNum = pageNo - parseInt(continues / 2);
        endNum = pageNo + parseInt(continues / 2);
        // 将不正常的现象纠正：【startNum】出现0和 负值时
        if (startNum < 1) {
          startNum = 1;
          endNum = continues;
        }
        // 纠正【endNum】出现大于总页码 的情况
        if (endNum > totalPage) {
          startNum = totalPage - (continues + 1);
          endNum = totalPage;
        }
      }
      return { startNum, endNum };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: aqua;
}
</style>
