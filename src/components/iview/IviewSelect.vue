<template>
  <div :class="['i-select', {'back-stage': backStage}]">
    <InputLabel v-if="label" :text="label" :required="required" :backStage="backStage" />
    <Select v-bind="$attrs" v-on="$listeners" :class="cls" :style="style">
      <Option
        v-for="(item,index) in optionList"
        :value="item.value"
        :key="index"
        :disabled="item.disabled"
      >{{ item.label }}</Option>
      <slot name="prefix" slot="prefix"></slot>
    </Select>
  </div>
</template>

<script>
// Iview Select组件使用v-model时，绑定的是value
// 需要同时拿到label和value时，需要使用label-in-value和@on-change事件
import { inputMixin } from "./mixin/inputMixin";
// import InputLabel from "./InputLabel";
export default {
  name: "IviewSelect",
  mixins: [inputMixin],
  // components: { InputLabel },
  // 自定义props，其余props和iview官方API保持一致
  props: {
    // 下拉选项
    optionList: {
      type: Array
    },
    // 是否为后台管理样式
    backStage: {
      type: Boolean
    },
    // 输入框标签
    label: {
      type: String
    },
    // 是否必填，传入label才有效
    required: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "./config/index";
.i-select {
  .input-layout();
  /deep/.ivu-select {
    .input-text();
    .input-width();
    .ivu-select-placeholder {
      .placeholder();
    }
    &.ivu-select-disabled .ivu-select-selection {
      .input-view-disabled();
    }
    // 显示下拉时
    &.ivu-select-visible .ivu-select-selection {
      box-shadow: none;
    }
    .ivu-select-selection {
      .input-view();
      .input-height();
      span {
        line-height: @input-height;
        font-size: @base-font-size;
      }
      .ivu-select-input {
        .input-height();
        color: @text-color;
        font-size: @base-font-size;
      }
    }
    // 下拉内容
    .ivu-select-dropdown {
      .input-drawdown-view();
      .show-scroll();
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
// 后台样式，前后台尺寸基本一致，只有颜色区别
&.back-stage {
  /deep/.ivu-select {
    .ivu-select-selection {
      .input-view-b();
    }
    .ivu-select-dropdown {
      .input-drawdown-view-b();
    }
  }
}
</style>