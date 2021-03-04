<template>
  <div>
    <div class="navbar is-fixed-bottom is-success is-hidden-touch">
      <div class="navbar-start is-hidden-touch" style="flex-grow: 1; justify-content: center;">
        <a class="navbar-item px-5" @click="view('BasicForm')" v-bind:class="(isActive == 'BasicForm')? 'is-active' : ''">基本情報</a>
        <a class="navbar-item px-5" @click="view('SkillForm')" v-bind:class="(isActive == 'SkillForm')? 'is-active' : ''">スキル</a>
        <a class="navbar-item px-5" @click="view('CompanyForm')" v-bind:class="(isActive == 'CompanyForm')? 'is-active' : ''">職務経歴</a>
        <a class="navbar-item px-5" @click="view('OtherForm')" v-bind:class="(isActive == 'OtherForm')? 'is-active' : ''">自己PR</a>
      </div>
    </div>
    <div class="navbar is-fixed-bottom is-success is-hidden-desktop p-1">
      <div class="tabs" style="flex-grow: 1; justify-content: center;">
        <a class="has-text-white" @click="view('BasicForm')" v-bind:class="(isActive == 'BasicForm')? 'is-active' : ''">基本情報</a>
        <a class="has-text-white" @click="view('SkillForm')" v-bind:class="(isActive == 'SkillForm')? 'is-active' : ''">スキル</a>
        <a class="has-text-white" @click="view('CompanyForm')" v-bind:class="(isActive == 'CompanyForm')? 'is-active' : ''">職務経歴</a>
        <a class="has-text-white" @click="view('OtherForm')" v-bind:class="(isActive == 'OtherForm')? 'is-active' : ''">自己PR</a>
      </div>
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
    }
  }
})
</script>