<template>
  <div class="i-radio-group">
    <RadioGroup v-bind="$attrs" v-on="$listeners">
      <Radio
        size="large"
        v-for="item in radioList"
        :key="item.value"
        :label="item.value"
        :disabled="item.disabled"
      >{{item.label}}</Radio>
    </RadioGroup>
  </div>
</template>

<script>
export default {
  name: "IviewRadioGroup",
  props: {
    /**
     * 使用RadioGroup实现一组互斥的选项组
     * 格式 {label: label, value: value}
     * 某个选项需要禁选，可以传入disabled，{label: label, value: value, disabled: true}
     */
    radioList: {
      type: Array
    },
    // 后台样式
    backStage: {
      type: Boolean
    }
  }
};
</script>

<style lang="less" scoped>
@import "./config/index";
.i-radio-group {
  display: inline-block;
  // background: #0a1c35;
  /deep/.ivu-radio-group {
    color: @text-color;
    .ivu-radio-wrapper.ivu-radio-group-item {
      .ivu-radio {
        .ivu-radio-inner {
          width: 20px;
          height: 20px;
          background: #13283d;
          border: 1px solid #345160;
          &::after {
          }
        }
      }
      &.ivu-radio-wrapper-checked {
        .ivu-radio {
          .ivu-radio-inner {
            border-color: @text-color-active;
            &::after {
              width: 10px;
              height: 10px;
              left: 4px;
              top: 4px;
            }
          }
        }
      }
      &.ivu-radio-wrapper-disabled {
        color: fade(@text-color, 20%);
        .ivu-radio {
          .ivu-radio-inner {
            background: #01122a;
          }
        }
      }
    }
  }
}
</style>