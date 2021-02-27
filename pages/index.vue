<template>
  <div class="container">
    <div class="section has-text-centered">
      <h3 class="title is-3">基本情報</h3>
      <div>
        <div class="columns">
          <div class="column">
            <div class="field-label is-normal has-text-left">
              <label class="label">氏</label>
              <input v-model="inputs.basic.familyName" class="input" type="text" placeholder="氏" />
            </div>
          </div>
          <div class="column">
            <div class="field-label is-normal has-text-left">
              <label class="label">名</label>
              <input v-model="inputs.basic.firstName" class="input" type="text" placeholder="名" />
            </div>
          </div>
        </div>
        <div class="field-label is-normal has-text-left">
          <label class="label">GitHub</label>
          <input v-model="inputs.basic.github" class="input" type="text" placeholder="GitHubのURL" />
        </div>
        <div class="field-label is-normal has-text-left">
          <label class="label">Website</label>
          <input
            v-model="inputs.basic.website" class="input" type="text" placeholder="ポートフォリオサイトのURL"
          />
        </div>
      </div>
    </div>
    <SkillForm :inputs="inputs"></SkillForm>
    <CompanyForm :inputs="inputs"></CompanyForm>
    <OtherForm :inputs="inputs"></OtherForm>
    <div class="section has-text-centered">
      <button class="button is-medium m-1" @click="save()">保存のみ</button>
      <button class="button is-medium m-1" @click="save(true)">保存してPDF出力</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import CompanyForm from '~/components/CompanyForm.vue'
import SkillForm from '~/components/SkillForm.vue'
import OtherForm from '~/components/OtherForm.vue'
import jsonData from '~/static/data/output.json'

export default Vue.extend({
  components: {
    CompanyForm,
    SkillForm,
    OtherForm,
  },
  data() {
    return {
      modalFlag: false,
      inputs: jsonData,
    }
  },
  methods: {
    /**
     * 入力情報を保存する
     * @param output PDF出力を行うか
     */
    save: function (output = false) {
      Vue.use(VueAxios, Axios);

      Axios.post('./api',{
        data: this.inputs,
        output: output,
      })
      .then(response => {
        //200 status header etc...
        console.log(response)
      })
      .catch(error => {
        alert('データの保存に失敗しました。');
        console.log(error.response)
      });
    },
    // addInput: function (eventArgs) {
    //   var arr = {};
    //   Object.entries(eventArgs.data).forEach( 
    //     function(value, key) {
    //       arr[value[0]] = value[1];
    //   });
    //   this.inputs[eventArgs.field].push(arr);
    //   console.log(this.inputs);
    // },
  }
})
</script>