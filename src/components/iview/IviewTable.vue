<template>
  <div :class="['i-table', { 'back-stage': backStage }]" ref="iTable">
    <Table
      v-bind="$attrs"
      v-on="tableListeners"
      :border="border"
      :class="[
        'vertical-align-' + verticalAlign,
        'scroll-' + scroll,
        { 'has-border': border }
      ]"
      ref="iviewTable"
    >
      <template v-for="item of slotList" :slot="item.slot" slot-scope="params">
        <slot :name="item.slot" v-bind="params"></slot>
      </template>
    </Table>
    <IviewPage v-if="page" v-bind="page" v-on="pageListeners" :back-stage="backStage" />
  </div>
</template>
<script>
import { createElm, queryElm } from "_u/dom";
import IviewPage from "./IviewPage";
export default {
  name: "IviewTable",
  components: {
    IviewPage
  },
  props: {
    backStage: {
      type: Boolean
    },
    // 设置默认带边框【大多数情况】
    border: {
      type: Boolean,
      default: true
    },
    // 表格内容垂直方向对齐方式
    // 可选middle（不填也能达到同样效果）、top、bottom
    verticalAlign: {
      type: String,
      default: "middle"
    },
    // 出现滚动条的方向，默认只在y轴出现
    // 可选参数：x/y/xy
    // 使y轴出现滚动条还需要在使用IviewTable组件的文件中设置.ivu-table-table的高度
    scroll: {
      type: String,
      default: "y"
    },
    // 计算高度
    calcHeight: {
      type: String
    },
    /**
     * 传入该参数时自动引用IviewPage
     * 该参数是IviewPage的props属性对象集合
     */
    page: {
      type: Object
    }
  },
  data() {
    return {
      // 随机属性
      randomAttr: "",
      tableListeners: {},
      pageListeners: {}
    };
  },
  computed: {
    // 获取slot列表
    slotList() {
      return (
        this.$attrs &&
        this.$attrs.columns.filter(col => {
          return col.slot;
        })
      );
    }
    // height() {
    //   let ret = "";
    //   if (this.calcHeight) {
    //   }
    //   return ret;
    // }
  },
  methods: {
    // 修复出现滚顶条时表头表体不对齐的bug
    fixBody() {
      this.$nextTick(() => {
        // table body
        let table = queryElm(`[${this.randomAttr}] .ivu-table-body`);
        let tbody = queryElm(
          `[${this.randomAttr}] .ivu-table-body .ivu-table-tbody`
        );

        // 是否显示滚动条
        let showScrollY = false;
        let showScrollX = false;
        if (tbody.offsetHeight && table.offsetHeight) {
          showScrollY = tbody.offsetHeight >= table.offsetHeight;
        }
        if (tbody.offsetWidth && table.offsetWidth) {
          showScrollX = tbody.offsetWidth >= table.offsetWidth;
        }

        // 是否需要添加gutter
        let needGutter = showScrollY && showScrollX;

        // table header
        let headerTr = queryElm(
          `[${this.randomAttr}] .ivu-table-header table tr`
        );
        let gutter = queryElm(
          `[${this.randomAttr}] .ivu-table-header table tr th.gutter`
        );
        if (needGutter && !gutter) {
          let th = createElm("th");
          th.setAttribute("class", "gutter");
          th.width = "17px";
          headerTr.appendChild(th);
        } else if (!needGutter && gutter) {
          headerTr.removeChild(gutter);
        }
      });
    },
    // 初始化事件
    initEvent() {
      // 将IviewPage的事件分离出来
      if (this.page) {
        let pageEvents = ["on-change", "on-page-size-change"];
        let tableListeners = { ...this.$listeners };
        let pageListeners = {};
        pageEvents.forEach(key => {
          if (tableListeners[key]) {
            pageListeners[key] = tableListeners[key];
            delete tableListeners[key];
          }
        });
        this.tableListeners = tableListeners;
        this.pageListeners = pageListeners;
        console.log(tableListeners, pageListeners);
      } else {
        this.tableListeners = this.$listeners;
      }
    }
  },
  created() {
    this.initEvent();
  },
  mounted() {
    /**
     * 给IviewTable根标签添加随机的attr
     * 使得fixBody只作用于本组件内的表格
     */
    this.randomAttr = "i-table-" + String(Math.random()).slice(2);
    this.$refs.iTable.setAttribute(this.randomAttr, "");

    // 监听页面rezise事件
    window.addEventListener("resize", this.fixBody);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.fixBody);
    });
  },
  // 数据更新
  updated() {
    this.fixBody();
  }
};
</script>

<style lang="less" scoped>
@import "./config/index";
.i-table {
  /deep/.ivu-table-wrapper {
    border: none;
    // 不带边框的表格
    .ivu-table {
      font-size: @t-body-text-size;
      color: @t-body-text-color;
      background: none;
      &:before {
        background: transparent;
      }
      &:after {
        background: transparent;
      }
      // .ivu-table-header 表头
      .ivu-table-header {
        th {
          background: @t-header-bg;
          border-color: transparent;
          color: @t-header-text-color;
          height: auto;
          padding: 8px 0;
        }
      }
      // .ivu-table-body 表格内容
      .ivu-table-body {
        .show-scroll-table-xy();
        td {
          background: transparent;
          border-color: transparent;
          color: @t-body-text-color;
          height: auto;
          padding: 12px 0;
        }
        // td背景设置透明后，再设置tr
        tr:nth-child(odd) {
          background: @t-bg;
        }
        tr:nth-child(even) {
          background: @t-bg-even;
        }
      }
      // 数据为空时
      .ivu-table-tip {
        display: flex;
        align-items: center;
        td {
          color: @t-header-text-color;
          border: none;
          background: transparent;
        }
      }
      // .ivu-table 带边框的表格
      &.ivu-table-border {
        &:before {
          background: @t-border-color;
        }
        &:after {
          background: @t-border-color;
        }
        th {
          border-color: @t-border-color;
        }
        td {
          border-color: @t-border-color;
        }
      }
    }
    // .ivu-table-wrapper 带边框的
    &.has-border {
      border: 1px solid @t-border-color;
      border-bottom: 0;
      border-right: 0;
    }
    // 表格内容垂直方向的对齐方式（默认是middle，无需设置）
    &.vertical-align-top {
      .ivu-table-body {
        td {
          vertical-align: top;
        }
      }
    }
    &.vertical-align-bottom {
      .ivu-table-body {
        td {
          vertical-align: bottom;
        }
      }
    }
    // 滚动条方向
    &.scroll-x {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .show-scroll-table-x;
      }
    }
    &.scroll-y {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .show-scroll-table-y;
      }
    }
    &.scroll-xy {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .show-scroll-table-xy;
      }
    }
  }
}
&.back-stage {
  /deep/.ivu-table-wrapper {
    // 不带边框的表格
    .ivu-table {
      // .ivu-table-header 表头
      .ivu-table-header {
        th {
          background: @t-header-bg-b;
        }
      }
      // .ivu-table-body 表格内容
      .ivu-table-body {
        .admin-scroll-table-xy();
        // td背景设置透明后，再设置tr
        tr:nth-child(odd) {
          background: @t-bg-b;
        }
        tr:nth-child(even) {
          background: @t-bg-even-b;
        }
      }
      .ivu-table-tip {
        td {
          color: #fff;
        }
      }
      // .ivu-table 带边框的表格
      &.ivu-table-border {
        &:before {
          background: @t-border-color-b;
        }
        &:after {
          background: @t-border-color-b;
        }
        th {
          border-color: @t-border-color-b;
        }
        td {
          border-color: @t-border-color-b;
        }
      }
    }
    // .ivu-table-wrapper 带边框的
    &.has-border {
      border: 1px solid @t-border-color-b;
      border-bottom: 0;
      border-right: 0;
    }
    // 滚动条方向
    &.scroll-x {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .admin-scroll-table-x;
      }
    }
    &.scroll-y {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .admin-scroll-table-y;
      }
    }
    &.scroll-xy {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .admin-scroll-table-xy;
      }
    }
  }
}
</style>
