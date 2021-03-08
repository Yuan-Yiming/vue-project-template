<template>
  <div class="i-page" :class="['align-'+ align, {'back-stage': backStage}]">
    <Page
      v-bind="$attrs"
      v-on="$listeners"
      :show-total="showTotal"
      :show-elevator="showElevator"
      :show-sizer="showSizer"
    />
  </div>
</template>

<script>
export default {
  name: "IviewPage",
  props: {
    // 说明：是否使用后台样式，不传默认是不使用
    // 用法：<IviewPage back-stage></IviewPage>
    backStage: {
      type: Boolean
    },
    // 说明：pager的位置，默认右下角
    // 可选：right，center，left
    // 用法：<IviewPage align="right"></IviewPage>
    align: {
      type: String,
      default: "right"
    },
    // iview中show-total，show-elevator，show-sizer默认为false
    // 环保项目默认都设置为true，仍可通过传入props修改，用法与官网API相同（注意：在vue模板中，props传参使用show-total和showTotal效果是一样的）
    showTotal: {
      type: Boolean,
      default: true
    },
    showElevator: {
      type: Boolean,
      default: true
    },
    showSizer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "./config/index";
// item 样式
.item {
  .page-box-view();
  color: @page-text-color;
  min-width: @page-size;
  height: @page-size;
  line-height: @page-size;
  border-radius: 3px;
}
// 这里不使用iview-page的原因是已有全局的iview-page样式
.i-page {
  display: flex;
  align-items: center;
  // 默认加上margin-top: 10px; (大多数场景都需要)
  margin-top: 10px;
  &.align-center {
    justify-content: center;
  }
  &.align-left {
    justify-content: flex-start;
  }
  &.align-right {
    justify-content: flex-end;
  }
  /deep/.ivu-page {
    color: @page-text-color;
    font-size: @page-font-size;
    // 共xx页
    .ivu-page-total {
    }
    // 上一页、下一页
    .ivu-page-prev,
    .ivu-page-next {
      .item();
      a {
        position: relative;
        top: -2px;
      }
    }
    // 页码
    .ivu-page-item {
      .item();
      a {
        color: @page-text-color;
      }
      &:hover,
      &.ivu-page-item-active {
        .page-box-view-active();
        a {
          color: @page-text-color-active;
        }
      }
    }
    // page选项
    .ivu-page-options {
      // xx条/页
      .ivu-page-options-sizer {
        .ivu-select {
          .ivu-select-selection {
            .item();
            .ivu-select-selected-value {
              // font-size: 14px;
            }
          }
          .ivu-select-dropdown {
            .input-drawdown-view();
            left: auto !important; // page下拉框初次显示时会有问题
            .ivu-select-item {
              .input-text();
              &.ivu-select-item-selected {
                color: @input-drawdown-item-text-active;
                background: @input-drawdown-item-bg-active;
              }
              &:hover {
                color: @input-drawdown-item-text-hover;
                background: @input-drawdown-item-bg-hover;
              }
              &.ivu-select-item-disabled {
                color: @input-drawdown-item-text-disabled;
              }
            }
          }
        }
      }
      // 跳至xx页
      .ivu-page-options-elevator {
        input {
          .item();
          text-align: center;
        }
      }
    }
    // 省略号？
    .ivu-page-item-jump-prev:after,
    .ivu-page-item-jump-next:after {
      color: @page-text-color;
    }
    // 禁用
    .ivu-page-disabled {
      .page-box-view-disabled();
      a {
        color: fade(@page-text-color, 20%);
      }
    }
    // 简洁 分页
    &.ivu-page-simple {
      .ivu-page-simple-pager input {
        background: transparent;
        border: none;
        color: @page-text-color;
        margin: 0;
        text-align: right;
        padding: 0;
      }
      .ivu-page-next {
        margin-left: 16px;
      }
    }
  }
}
// 后台样式，基本只有颜色的区别
&.back-stage {
  /deep/.ivu-page {
    .ivu-page-total {
    }
    .ivu-page-prev:not(.ivu-page-disabled),
    .ivu-page-next:not(.ivu-page-disabled),
    .ivu-page-item {
      .page-box-view-b();
      a {
        color: @page-text-color;
      }
      &:hover,
      &.ivu-page-item-active {
      }
    }
    // page选项
    .ivu-page-options {
      // xx条/页
      .ivu-page-options-sizer {
        .ivu-select {
          .ivu-select-selection {
            .page-box-view-b();
            .ivu-select-selected-value {
            }
          }
          .ivu-select-dropdown {
            .input-drawdown-view-b();
          }
        }
      }
      // 跳至xx页
      .ivu-page-options-elevator {
        input {
          .page-box-view-b();
        }
      }
    }
    // 禁用
    .ivu-page-disabled {
      .page-box-view-disabled();
      a {
        color: fade(@page-text-color, 20%);
      }
    }
  }
}
</style>
