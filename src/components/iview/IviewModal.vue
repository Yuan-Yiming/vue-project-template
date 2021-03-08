<template>
  <div class="iview-modal">
    <Modal
      v-bind="$attrs"
      v-on="$listeners"
      width="auto"
      :mask-closable="maskClosable"
      :transfer="transfer"
      :closable="closable"
    >
      <slot>
        <div v-if="type === 'confirm'" class="confirm-text-wrap">
          <div class="confirm-text-1">{{ confirmText1 }}</div>
          <div class="confirm-text-2">{{ confirmText2 }}</div>
        </div>
      </slot>
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer" v-if="type === 'confirm'">
        <IviewButton cus-type="secondary" back-stage @click="handleCancel">{{ cancalText }}</IviewButton>
        <IviewButton cus-type="danger" back-stage @click="handleConfirm">{{ okText }}</IviewButton>
      </slot>
      <slot name="footer" slot="footer" v-else>
        <IviewButton cus-type="secondary" back-stage @click="handleCancel">{{ cancalText }}</IviewButton>
        <IviewButton cus-type="primary" back-stage @click="handleConfirm">{{ okText }}</IviewButton>
      </slot>
      <slot name="close" slot="close"></slot>
    </Modal>
  </div>
</template>

<script>
import IviewButton from "./IviewButton";
export default {
  name: "IviewModal",
  components: {
    IviewButton
  },
  props: {
    // 把默认值设置为auto，宽度由内容撑开
    // 不建议直接设置width的值
    width: {
      type: [String, Number],
      default: "auto"
    },
    // 设置默认不允许点击遮罩层关闭
    maskClosable: {
      type: Boolean,
      default: false
    },
    // 设置loading为true，监听on-ok事件手动关闭弹窗，用于校验表单（iview默认会自动关闭弹窗）
    // loading: {
    //   type: Boolean,
    //   default: true
    // },
    // modal是否置于body标签里，设置false，否则设置样式无效
    transfer: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: "确认"
    },
    cancalText: {
      type: String,
      default: "取消"
    },
    // 自定义类型（目前只有confirm）
    type: {
      type: String,
      default: "default"
    },
    // type为confirm时
    confirmText1: {
      type: String,
      default: ""
    },
    // type为confirm时
    confirmText2: {
      type: String,
      default: ""
    },
    // type为confirm时默认关闭
    closable: {
      type: Boolean,
      default: function() {
        console.log("this", this);
        return this.type !== "confirm";
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    // 取消按钮
    handleCancel() {
      // 跟Iview原本的on-cancel不一样，需要手动关闭弹窗
      // this.$attrs.value = false;
      this.$emit("on-cancel");
    },
    // 确认按钮
    handleConfirm() {
      // 跟Iview原本的on-ok不一样，需要手动关闭弹窗
      this.$emit("on-ok");
    }
  }
};
</script>

<style lang='less' scoped>
@borderColor: #179d7d;
.iview-modal {
  // 全局修改modal样式
  /deep/.ivu-modal-mask {
    background: rgba(0, 0, 0, 0.7);
  }

  // 全局修改modal样式
  /deep/.ivu-modal-wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    .ivu-modal {
      top: 0px !important;

      .ivu-modal-content {
        border: 2px solid @borderColor;
        position: relative;
        height: 100%;
        // background: rgba(9, 23, 44, 1);
        border-radius: 0;
        background: url("~_img/iview/iview-modal-bg.png");
        background-size: 100% 100%;

        .ivu-modal-close {
          .ivu-icon-ios-close {
            color: #fff;

            &:hover {
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }

        .ivu-modal-body {
          padding: 0;
          // type为confirm时
          .confirm-text-wrap {
            padding: 30px 80px 30px 120px;
            line-height: 44px;
            .confirm-text-1 {
              color: @subTextColor;
              font-size: 18px;
              position: relative;
              &::before {
                content: "!";
                position: absolute;
                top: 4px;
                left: -60px;
                width: 36px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                background: #f37370;
                border-radius: 100%;
                color: #09172c;
                font-size: 24px;
                font-weight: 700;
              }
            }
            .confirm-text-2 {
              font-size: 16px;
              color: #86aaae;
            }
          }
        }

        .ivu-modal-header {
          border-bottom: 2px solid @borderColor;

          .ivu-modal-header-inner {
            font-size: 16px;
            color: @lightTextColor;
          }
        }

        .ivu-modal-footer {
          text-align: center;
          border-top: 2px solid @borderColor;
        }

        .ivu-modal-confirm-head {
          padding: 10px;

          .ivu-modal-confirm-head-title {
            font-size: 18px;
            color: #fff;
          }
        }

        .ivu-modal-confirm-body {
          div {
            font-size: 16px;
            color: #628e93;
          }
        }

        .ivu-modal-confirm-footer {
          border-top: 1px solid #345160;

          .ivu-btn {
            width: 78px;
            height: 36px;
            margin: 10px;
            font-size: 18px;
            line-height: 1;
            color: #fff;

            &.ivu-btn-text {
              color: #f37370;
              border: 1px solid #f37370;
              background: transparent;
            }
          }
        }
      }
    }
  }
}
</style>