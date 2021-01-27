<template>
  <div class="container">
    <div class="section has-text-centered">
        <h3 class="title is-3">基本情報</h3>
        <div>
          <div class="columns">
            <div class="column">
              <div class="field-label is-normal has-text-left">
                <label class="label">氏</label>
                <input class="input" type="text" placeholder="氏" />
              </div>
            </div>
            <div class="column">
              <div class="field-label is-normal has-text-left">
                <label class="label">名</label>
                <input class="input" type="text" placeholder="名" />
              </div>
            </div>
          </div>
          <div class="field-label is-normal has-text-left">
            <label class="label">GitHub</label>
            <input class="input" type="text" placeholder="GitHubのURL" />
          </div>
          <div class="field-label is-normal has-text-left">
            <label class="label">Website</label>
            <input
              class="input"
              type="text"
              placeholder="ポートフォリオサイトのURL"
            />
          </div>
        </div>
      </div>
      <SkillForm :inputs="inputs" @add-click="addInput($event)"></SkillForm>
      <CompanyDetailForm :inputs="inputs" @add-click="addInput($event)"></CompanyDetailForm>
  </div>
</template>

<script>
import Vue from 'vue'
import CompanyForm from '~/components/CompanyForm.vue'
import SkillForm from '~/components/SkillForm.vue'
import CompanyDetailForm from '~/components/CompanyDetailForm.vue'

export default Vue.extend({
  components: {
    CompanyForm,
    SkillForm,
    CompanyDetailForm,
  },
  data() {
    return {
      modalFlag: false,
      inputs: {
        company: [],
        skill: [],
      },
    }
  },
  methods: {
    addInput: function (eventArgs) {
      var arr = {};
      Object.entries(eventArgs.data).forEach( 
        function(value, key) {
          arr[value[0]] = value[1];
      });
      this.inputs[eventArgs.field].push(arr);
      console.log(this.inputs);
    },
  }
})
</script>