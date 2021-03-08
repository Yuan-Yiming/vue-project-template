<template>
  <div :class="['i-switch', {'back-stage': backStage}]">
    <InputLabel v-if="label" :text="label" :required="required" :backStage="backStage" />
    <i-switch v-bind="$attrs" v-on="$listeners" :size="size" :value="value">
      <slot slot="open" name="open">激活</slot>
      <slot slot="close" name="close">禁用</slot>
    </i-switch>
  </div>
</template>

<script>
import InputLabel from "./InputLabel";
export default {
  name: "IviewSwitch",
  components: { InputLabel },
  props: {
    // 是否为后台管理样式
    backStage: {
      type: Boolean
    },
    // 改写size
    size: {
      type: String,
      default: "large"
    },
    // 解决在table render中使用是无法传props的bug
    value: {
      type: [Boolean, Number, String]
    },
    // 输入框标签
    label: {
      type: String
    },
    // 是否必填，传入label时才有效
    required: {
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
.i-switch {
  .input-layout();
  /deep/.ivu-switch {
    .input-view();
    .input-text();
    min-width: 60px;
    &.ivu-switch-checked {
      background-color: @switch-bg-active;
      .ivu-switch-inner {
        position: relative;
        display: block;
        text-align: center;
        left: -6px;
        top: 1px;
      }
      &::after {
        left: 40px;
      }
    }
    &.ivu-switch-disabled {
      opacity: 1;
      background: @switch-bg-disabled;
    }
  }
}
&.back-stage {
  /deep/.ivu-switch {
    .input-view-b();
  }
}
</style>