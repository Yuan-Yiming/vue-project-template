<template>
  <div
    :class="['i-button', 'btn-' + cusType, {'btn-custom': cusType, 'back-stage': backStage}]"
    @click="$emit('on-click')"
  >
    <Button v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </Button>
  </div>
</template>

<script>
export default {
  /**
   * 该组件只包含常规按钮，主要有前后台各4种按钮：【主要按钮】、【次要按钮】、【警示按钮】、【禁用按钮】
   * 上传、下载、导出等按钮可用【次要按钮】
   */
  name: "IviewButton",
  props: {
    // 自定义一些类型
    // 前台：primary, secondary, disabled, danger
    // 后台：primary, secondary, disabled, danger
    cusType: {
      type: String,
      default: "primary"
    },
    // 是否启用后台样式
    backStage: {
      type: Boolean
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang='less' scoped>
@import "./config/index";
// 后台
.i-button {
  display: inline-block;
  // margin: 0 10px;
  // 代替上一行代码的作用
  // 当两个IviewButton相邻时，自动给右侧的加上margin-left
  + .i-button {
    margin-left: 20px;
  }
  .ivu-btn {
    .btn-height();
    padding: 0 20px;
    min-width: 108px;
    border: none;
  }
  &.btn-custom {
    .ivu-btn {
      .btn-text();
      &:focus {
        box-shadow: none;
      }
    }
  }
  &.btn-primary {
    .ivu-btn {
      .btn-primary-f();
    }
  }
  &.btn-secondary {
    .ivu-btn {
      .btn-secondary-f();
    }
  }
  &.btn-disabled {
    .ivu-btn {
      .btn-disabled-f();
    }
  }
  &.btn-danger {
    .ivu-btn {
      .btn-danger-f();
    }
  }
}
&.back-stage {
  .ivu-btn {
  }
  &.btn-custom {
    .ivu-btn {
    }
  }
  &.btn-primary {
    .ivu-btn {
      .btn-primary-b();
    }
  }
  &.btn-secondary {
    .ivu-btn {
      .btn-secondary-b();
    }
  }
  &.btn-disabled {
    .ivu-btn {
      .btn-disabled-b();
    }
  }
  &.btn-danger {
    .ivu-btn {
      .btn-danger-b();
    }
  }
}
</style>