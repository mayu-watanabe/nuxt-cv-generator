<template>
  <div>
    <div>
      <Header @click-download="save(true)"/>
      <transition name="component-fade" mode="out-in">
        <component :is="currentView" :inputs="inputs"></component>
      </transition>
      <Footer :currentView="currentView" @click-view="changeComponent" @click-save="save(false)" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import BasicForm from '~/components/BasicForm.vue'
import CompanyForm from '~/components/CompanyForm.vue'
import SkillForm from '~/components/SkillForm.vue'
import OtherForm from '~/components/OtherForm.vue'
import jsonData from '~/static/data/output.json'

export default Vue.extend({
  transition: 'page',
  components: {
    BasicForm,
    CompanyForm,
    SkillForm,
    OtherForm,
  },
  data() {
    return {
      inputs: jsonData,
      currentView: 'BasicForm',
    }
  },
  methods: {
    changeComponent(value) {
      this.currentView = value;
    },
    /**
     * 入力情報を保存する
     * @param output PDF出力を行うか
     */
    save: function (output = false) {
      Vue.use(VueAxios, Axios);

      // 入力情報の保存
      Axios.post('./api',{
        data: this.inputs,
      })
      .then(response => {
        // console.log(response)
        if (output == false) {
          alert('保存しました。')
        }
      })
      .catch(error => {
        alert('データの保存に失敗しました。');
        console.log(error.response)
      });

      // PDF出力
      if (output) {
        try {
          this.$outputPdf(this.inputs);
        } catch (e) {
          console.log(e);
        }
      }
    },
  }
})
</script>
<style lang="scss" scoped>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>