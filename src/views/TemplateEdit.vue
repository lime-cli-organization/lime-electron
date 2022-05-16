<template>
  <div class="wrapper">
    <split-pane
      v-on:resize="resize"
      :min-percent="20"
      :default-percent="40"
      split="vertical"
    >
      <template slot="paneL">
        {{ scaleWidth * 54 }}
        {{ scaleHeight * 396 }}
        {{ scaleWidth * 121 }}
        {{ scaleHeight * (565 - 396) }}
        <br />
        {{ scaleWidth * 190 }}
        {{ scaleHeight * 314 }}
        {{ scaleWidth * (1207 - 190) }}
        {{ scaleHeight * (373 - 314) }}

        <textarea v-model="templateRead">这是一个框 </textarea>
      </template>
      <template slot="paneR">
        <!-- <div class="canvans_wrapper">
          <canvas
            :width="canvasWidth"
            :height="canvasHeight"
            ref="canvas"
            id="canvas"
            @mousedown="drawBegin"
            @mousemove="drawing"
            @mouseup="drawEnd"
          >
            当前浏览器版本不支持 Canvas, 请升级.
          </canvas>
        </div> -->
        <template>
          <div
            v-for="(value, key) in imgData"
            :key="key"
            class="canvans_wrapper"
            :ref="`${key}Wrapper`"
          >
            <canvas
              :width="canvasWidth"
              :height="canvasHeight"
              :ref="`${key}Canvas`"
              @mousedown="drawBegin"
              @mousemove="drawing(key, $event)"
              @mouseup="drawEnd"
            >
              当前浏览器版本不支持 Canvas, 请升级.
            </canvas>
            <img :src="value.base64" />
          </div>
        </template>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane';
import { GetTemplateReadAsync } from '@/apis/Template';
import { GetPaperBySideAsync } from '@/apis/Scan';
export default {
  name: 'Template',
  components: {
    splitPane,
  },
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      startX: 0,
      startY: 0,
      rectWidth: 0,
      rectHeight: 0,
      scaleWidth: 1,
      scaleHeight: 1,
      templateRead: '',
      imgData: {
        A: {
          base64: '',
        },
        B: {
          base64: '',
        },
      },
    };
  },
  created() {
    console.log('================= init ==============');
    this.id = this.$route.query.id;
    this.scanId = this.$route.query.scanId;
  },
  async mounted() {
    await this.init();
    this.initCanvasWrapper = this.$refs.AWrapper[0].getBoundingClientRect();
    await this.resize();
    let _this = this;
    window.addEventListener('resize', () => {
      const canvasWrapper = _this.$refs.AWrapper[0].getBoundingClientRect();
      _this.canvasWidth = canvasWrapper.width;
      _this.canvasHeight = canvasWrapper.height;
      _this.scaleWidth = canvasWrapper.width / _this.naturalWidth;
      _this.scaleHeight = canvasWrapper.height / _this.naturalHeight;
    });
  },
  methods: {
    async init() {
      this.GetTemplateReadAsync();
      this.GetPaperBySideAsync('A');
      this.GetPaperBySideAsync('B');
    },
    async GetTemplateReadAsync() {
      let { data } = await GetTemplateReadAsync({ id: this.id });
      this.templateRead = data;
    },
    async GetPaperBySideAsync(side) {
      try {
        const canvasWrapper = this.$refs.AWrapper[0].getBoundingClientRect();
        let { data } = await GetPaperBySideAsync({
          scanId: this.scanId,
          sideA: side === 'A' ? true : false,
        });
        this.imgData[side].base64 = `data:image/jpg;base64,${data}`;
        const img = new Image();
        img.src = this.imgData[side].base64;
        img.onload = () => {
          this.naturalWidth = img.naturalWidth;
          this.naturalHeight = img.naturalHeight;
          this.scaleWidth = canvasWrapper.width / this.naturalWidth;
          this.scaleHeight = canvasWrapper.height / this.naturalHeight;

          this.drawRect(side, 12, 121 * 1.25 * 1, 27, 52);
          this.drawRect(side, 30, 67, 163.7, 12);
        };
      } catch (error) {
        console.log(error);
      }
    },
    resize() {
      const canvasWrapper = this.$refs.AWrapper[0].getBoundingClientRect();
      this.canvasWidth = canvasWrapper.width;
      this.canvasHeight = canvasWrapper.height;
      this.scaleWidth = canvasWrapper.width / this.naturalWidth;
      this.scaleHeight = canvasWrapper.height / this.naturalHeight;
    },
    drawBegin(e) {
      this.flag = true;
      let { offsetX, offsetY } = e;
      this.startX = offsetX;
      this.startY = offsetY;
    },
    drawing(side, e) {
      if (this.flag) {
        let { offsetX, offsetY } = e;
        this.rectWidth = Math.abs(offsetX - this.startX);
        this.rectHeight = Math.abs(offsetY - this.startY);
        if (this.rectWidth < 4 || this.rectHeight < 4) {
          this.rectWidth = 0;
          this.rectHeight = 0;
          return;
        } else {
          this.clear(side);
          let startX = this.startX > offsetX ? offsetX : this.startX;
          let startY = this.startY > offsetY ? offsetY : this.startY;
          this.drawRect(side, startX, startY, this.rectWidth, this.rectHeight);
        }
      }
    },
    drawEnd() {
      this.flag = false;
    },
    drawRect(side, x, y, width, height) {
      const ctx = this.$refs[`${side}Canvas`][0].getContext('2d');
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
    },
    clear(side) {
      const canvas = this.$refs[`${side}Canvas`][0];
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100vw;
  height: calc(100vh - 61px);
  overflow: auto;
}
textarea {
  line-height: 2;
  border: none;
  outline: none;
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  height: 100%;
}
.canvans_wrapper {
  width: 100%;
  height: 100%;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  img {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
