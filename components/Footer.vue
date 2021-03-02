<template>
  <div class="navbar is-fixed-bottom is-success">
    <div class="navbar-start is-hidden-touch" style="flex-grow: 1; justify-content: center;">
      <a class="navbar-item" @click="view('BasicForm')" v-bind:class="(isActive == 'BasicForm')? 'is-active' : ''">基本情報</a>
      <a class="navbar-item" @click="view('SkillForm')" v-bind:class="(isActive == 'SkillForm')? 'is-active' : ''">スキル</a>
      <a class="navbar-item" @click="view('CompanyForm')" v-bind:class="(isActive == 'CompanyForm')? 'is-active' : ''">職務経歴</a>
      <a class="navbar-item" @click="view('OtherForm')" v-bind:class="(isActive == 'OtherForm')? 'is-active' : ''">自己PR</a>
    </div>
    <div class="navbar-end is-hidden-touch">
      <a class="navbar-item" @click="save">JSONへ保存</a>
    </div>
    <div class="navbar tabs is-success is-hidden-desktop">
      <a class="navbar-item" @click="view('BasicForm')" v-bind:class="(isActive == 'BasicForm')? 'is-active' : ''">基本情報</a>
      <a class="navbar-item" @click="view('SkillForm')" v-bind:class="(isActive == 'SkillForm')? 'is-active' : ''">スキル</a>
      <a class="navbar-item" @click="view('CompanyForm')" v-bind:class="(isActive == 'CompanyForm')? 'is-active' : ''">職務経歴</a>
      <a class="navbar-item" @click="view('OtherForm')" v-bind:class="(isActive == 'OtherForm')? 'is-active' : ''">自己PR</a>
      <a class="navbar-item" @click="save">JSONへ保存</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: ['currentView'],
  data() {
    return {
      isActive: 'BasicForm'
    }
  },
  methods: {
    view(sectionName) {
      this.isActive = sectionName;
      this.$emit("click-view", sectionName);
    },
    save() {
      this.$emit("click-save", true);
    }
  }
})
</script>