<template>
  <div class="section has-text-centered">
    <h3 class="title is-3">職務経歴</h3>
    <div class="company-container" v-if="inputs['company'].length > 0">
      <div v-for="(input, key, index) in inputs['company']"  v-bind:key=index class="skill-info has-text-left m-6">
        <div class="level">
          <h4 class="subtitle is-4 level-left">{{ input.name }} ({{ companyPeriod(input) }})</h4>
          <button class="button is-info is-light is-small m-1 level-right help_link__button" @click="openModal">
            経歴を追加
          </button>
        </div>
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth has-text-centered">
          <tr>
            <th>期間</th>
            <th>業務内容</th>
            <th></th>
          </tr>
          <tr>
            <td>2019.4~2020.2</td>
            <td class="has-text-left">越境ECサイトの開発</td>
            <td><button class="button is-small" @click="openModal">編集</button></td>
          </tr>
        </table>
      </div>
    </div>
    <Modal v-if="modalFlag">
      <h4 class="title is-4">業務内容の追加</h4>
      <div class="has-text-left">
        <h4 class="subtitle is-5 is-marginless m-1">期間</h4>
        <div class=columns>
          <div class="column is-vcentered">
            <div class="select is-small">
              <select v-model="addCompanyDetail['projects']">
                <option v-for="year in years" :value="year">{{ year }}</option>
              </select>
            </div>
            年
            <div class="select is-small">
              <select v-model="addCompanyDetail['projects']">
                <option v-for="month in months" :value="month">{{ month }}</option>
              </select>
            </div>
            月から
            <div class="select is-small">
              <select v-model="addCompanyDetail['projects']">
                <option v-for="year in years" :value="year">{{ year }}</option>
              </select>
            </div>
            年
            <div class="select is-small">
              <select v-model="addCompanyDetail['projects']">
                <option>現在</option>
                <option v-for="month in months" :value="month">{{ month }}</option>
              </select>
            </div>
            月まで
          </div>
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">プロジェクト内容</h4>
        <div class="mb-4">
          <input class="input is-small" type="text" placeholder="" />
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">担当フェーズ</h4>
        <span v-for="phase in phases">
          <input type="checkbox" id="jack" :value="phase">
          <label :for="phase">{{ phase }}</label>
        </span>
        <h4 class="subtitle is-5 is-marginless m-1">実績・取り組み等</h4>
          <input class="input is-small" type="text" placeholder="" />
        <h4 class="subtitle is-5 is-marginless m-1">組織人数</h4>
        <h4 class="subtitle is-5 is-marginless m-1">役割</h4>
          <input class="input is-small" type="text" placeholder="" />
        <h4 class="subtitle is-5 is-marginless m-1">言語・環境</h4>
        <!-- <h4 class="subtitle is-5 is-marginless m-1">カテゴリ</h4>
        <div class="select is-small">
          <select v-model="addSkill['category']">
            <option v-for="(category, index) in categories" :value="index">{{ categories[index] }}</option>
          </select>
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">種別</h4>
        <div class="mb-4">
          <input v-model="addSkill['name']" class="input is-small" type="text" placeholder="PHP" />
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">経験年数</h4>
        <div class="select is-small">
          <select v-model="addSkill['period']">
            <option v-for="year in years" :value="year">{{ year }}</option>
          </select>
        </div>年
        <h4 class="subtitle is-5 is-marginless m-1">スキルレベル・備考</h4>
        <div class="mb-4">
          <input v-model="addSkill['memo']" class="input is-small" type="text" placeholder="通常使用に問題なし" />
        </div> -->
      </div>
      <div class="pt-5">
        <button class="button is-primary is-medium" @click="send">追加</button>
        <button class="button is-medium" @click="closeModal">閉じる</button>
      </div>
    </Modal>
    <CompanyForm :inputs="inputs" @parent-method="parentMethod"></CompanyForm>
  </div>
</template>

<script>
import Vue from 'vue'
import Modal from '~/components/Modal.vue'
import CompanyForm from '~/components/CompanyForm.vue'

export default Vue.extend({
  props: ['addInput', 'inputs'],
  components: {
    Modal,
    CompanyForm,
  },
  data() {
    return {
      modalFlag: false,
      addCompanyDetail: {
        projects: '',
        category: '',
        name: '',
        period: '',
        memo: '',
      },
    }
  },
  computed : {
    categories () {
      return [
        'OS',
        '言語',
        'フレームワーク',
        'DB',
        'その他',
      ]
    },
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1969}, (value, index) => year - index)
    },
    months () {
      return Array.from({length: 12}, (value, index) => 1 + index)
    },
    companyPeriod() {
      return function(data) {
        var period = '';
        period = period + data.fromYear + '.' + data.fromMonth + ' ~ ';
        if (data.toMonth == '現在') {
          period = period + data.toMonth;
        } else {
          period = period + data.toYear + '.' + data.toMonth;
        }
        return period;
      }
    },
    phases() {
      return [
        '要件定義',
        '基本設計',
        '詳細設計',
        '実装',
        '単体テスト',
        '結合テスト',
      ]
    }
  },
  methods: {
    openModal() {
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    send: function(field, data) {
      this.modalFlag = false;
      this.$emit('add-click', {field: field, data: data});
    },
    sort(ary, key, order) {
      var reverse = 1;
      if(order && order.toLowerCase() == "desc") reverse = -1;
      ary.sort(function(a, b) {
        if(a[key] < b[key]) 
          return -1 * reverse;
        else if(a[key] == b[key]) 
          return 0;
        else 
          return 1 * reverse;
      });
    },
    parentMethod: function(data) {
      this.send(data.field, data.data);
    },
  }
})
</script>