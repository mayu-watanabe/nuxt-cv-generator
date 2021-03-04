<template>
  <div class="navbar is-success is-fixed-top">
    <div class="container is-hidden-touch">
      <div class="navbar-brand">
        <b class="navbar-item is-size-5">
          CV GENERATOR
        </b>
      </div>
      <div id="navbarMenuHeroC" class="navbar-menu">
        <div class="navbar-end">
          <p class="navbar-item">JSONで職務経歴データを管理&PDFで出力</p>
          <div class="navbar-end is-hidden-touch">
            <a class="navbar-item" @click="save">JSONへ保存</a>
          </div>
          <span class="navbar-item">
            <button class="button is-success is-inverted" @click="download">
              <span>DownloadPDF</span>
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container is-hidden-desktop">
      <div class="navbar-brand item tabs">
        <b class="navbar-item is-size-5">
          CV GENERATOR
        </b>
        <div class="navbar-item">
          <button class="button is-success is-inverted" @click="download">
            <span>DownloadPDF</span>
          </button>
          <button class="button is-success" @click="save">
            <span>JSONへ保存</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  methods: {
    download() {
      this.$emit("click-download", true);
    },
    save() {
      this.$emit("click-save", true);
    }
  }
})
</script>
<style lang="scss" scoped>
.item {
  justify-content:space-between;
}
</style>