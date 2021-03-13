<template>
  <div>
    <Header @click-download="save(true)" @click-save="save(false)" />
    <div class="py-6">
      <transition name="component-fade" mode="out-in">
        <component :is="currentView" :inputs="inputs"></component>
      </transition>
    </div>
    <Footer :currentView="currentView" @click-view="changeComponent" />
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
const BasicForm = () => import('~/components/BasicForm.vue')
const CompanyForm = () => import('~/components/CompanyForm.vue')
const SkillForm = () => import('~/components/SkillForm.vue')
const OtherForm = () => import('~/components/OtherForm.vue')

Vue.use(VueAxios, Axios);

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
      inputs: {
        basic: {
            familyName: '',
            firstName: '',
            github: '',
            website: '',
            summery: '',
            experience: '',
        },
        company: [],
        skills: [],
        summery: []
      },
      currentView: 'BasicForm',
    }
  },
  mounted: function () {
    const path =  window.location.origin + "/data/output.json";
    
    if (this.$load(path) == 200) {
      Axios.get(path)
      .then(response => {
        this.inputs = response.data
      })
      .catch(error => {console.log(error)
      });
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