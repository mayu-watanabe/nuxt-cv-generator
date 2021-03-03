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
        "basic": {
            "familyName": "しょくむ",
            "firstName": "太郎",
            "github": "https:\/\/github.com\/shokumu-taro",
            "website": "https:\/\/shokumu-taro.com",
            "experience": "・〜〜〜の業界知識\n・PHPによるWebアプリケーションの実装",
        },
        "company": [
            {
                "fromYear": 2019,
                "fromMonth": 4,
                "toYear": 2021,
                "toMonth": "現在",
                "name": "株式会社A",
                "industry": "SI事業",
                "capital": "8千万",
                "employeesNumber": "100",
                "summery": "XXXシステムの開発・運用",
                "projects": [
                    {
                        "fromYear": 2019,
                        "fromMonth": 3,
                        "toYear": 2021,
                        "toMonth": "現在",
                        "summery": "プロジェクトA",
                        "phases": [
                            "単体テスト",
                            "結合テスト"
                        ],
                        "achievement": "XXXXのテストを担当。",
                        "numberOfTeam": "20",
                        "role": "メンバー",
                        "environment": "OS：XXX\n言語：XXX\n",
                        "publish": true
                    },
                    {
                        "fromYear": 2019,
                        "fromMonth": 12,
                        "toYear": 2020,
                        "toMonth": 5,
                        "summery": "プロジェクトB",
                        "phases": [
                            "基本設計",
                            "詳細設計",
                            "実装",
                            "単体テスト"
                        ],
                        "achievement": "XXXXの開発を担当。",
                        "numberOfTeam": "20",
                        "role": "メンバー",
                        "environment": "OS：XXX\n言語：XXX\nDB：XXX",
                        "publish": true
                    }
                ]
            }
        ],
        "skills": [
            {
                "category": 0,
                "categoryName": "OS",
                "name": "Linux",
                "period": 3,
                "periodUnit": "年",
                "memo": "通常使用に問題なし"
            },
            {
                "category": 1,
                "categoryName": "言語",
                "name": "PHP",
                "period": 3,
                "periodUnit": "年",
                "memo": "通常使用に問題なし"
            },
            {
                "category": 1,
                "categoryName": "言語",
                "name": "Python",
                "period": 3,
                "periodUnit": "ヶ月",
                "memo": "プログラミングスクールで学習\/自己研鑽"
            },
            {
                "category": 3,
                "categoryName": "DB",
                "name": "MySQL",
                "period": 1,
                "periodUnit": "年",
                "memo": "調べながらであれば作業可能"
            }
        ],
        "summery": [
            {
                "title": "つれづれなるまゝに",
                "content": "つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書"
            },
            {
                "title": "つれづれなるまゝに",
                "content": "つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。つれづれなるまゝに、日暮らし、硯にむかひて、心に"
            }
        ]
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
      // Axios.post('./api',{
      //   data: this.inputs,
      // })
      // .then(response => {
      //   // console.log(response)
        if (output == false) {
          alert('保存しました。')
        }
      // })
      // .catch(error => {
      //   alert('データの保存に失敗しました。');
      //   console.log(error.response)
      // });

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