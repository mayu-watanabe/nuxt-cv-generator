<template>
  <div class="navbar is-success is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <b class="navbar-item is-size-5">
            CV GENERATOR
          </b>
          <div class="navbar-item is-hidden-desktop">
            <button class="button is-success is-inverted" @click="download">
              <span>DownloadPDF</span>
            </button>
          </div>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu">
          <div class="navbar-end">
            <p class="navbar-item">JSONで職務経歴データを管理&PDFで出力</p>
            <span class="navbar-item">
              <button class="button is-success is-inverted" @click="download">
                <span>DownloadPDF</span>
              </button>
            </span>
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
    }
  }
})
</script>