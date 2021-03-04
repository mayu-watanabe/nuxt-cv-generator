<template>
  <div>
    <h4 class="title is-4">職務経歴</h4>
    <div class="company-container" v-if="inputs['company'].length > 0">
      <div v-for="(input, index) in inputs['company']"  v-bind:key=index class="skill-info has-text-left">
        <div class="hover mx-2">
          <h4 class="subtitle is-4 level-left is-inline-block">{{ input.name }} ({{ companyPeriod(input) }})</h4>
          <button class="button is-small" @click="deleteCompany(projectIndex)">削除</button>
          <div @click="edit(index)">
            <span>{{ input.summery }}</span><br>
            <span><b>事業内容</b>: {{ input.industry }}</span>
            <span><b>資本金</b>: {{ input.capital }}円</span>
            <span><b>従業員数</b>: {{ input.employeesNumber }}名</span>
          </div>
        </div>
        <CompanyDetailForm :input="input"></CompanyDetailForm>
      </div>
    </div>
    <div class="has-text-centered">
      <button class="button is-success is-light is-medium m-5" @click="edit()">会社を追加</button>
    </div>
    <Modal v-if="modalFlag">
      <h4 class="title is-4">会社情報の追加</h4>
      <div class="has-text-left">
        <h4 class="subtitle is-5 is-marginless m-1">会社名</h4>
        <div class="mb-4">
          <input v-model="name" class="input is-small" type="text" placeholder="会社名" />
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">在籍期間</h4>
        <div class=columns>
          <div class="column is-vcentered">
            <div class="select is-small">
              <select v-model="fromYear">
                <option v-for="year in years" :value="year">{{ year }}</option>
              </select>
            </div>
            年
            <div class="select is-small">
              <select v-model="fromMonth">
                <option v-for="month in months" :value="month">{{ month }}</option>
              </select>
            </div>
            月から
            <div class="select is-small">
              <select v-model="toYear">
                <option v-for="year in years" :value="year">{{ year }}</option>
              </select>
            </div>
            年
            <div class="select is-small">
              <select v-model="toMonth">
                <option>現在</option>
                <option v-for="month in months" :value="month">{{ month }}</option>
              </select>
            </div>
            月まで在籍
          </div>
        </div>
        <h4 class="subtitle is-5 m-1">事業内容</h4>
        <div class="columns">
          <div class="column">
            <input v-model="industry" class="input is-small" type="text" placeholder="例: SI事業" />
          </div>
        </div>
        <h4 class="subtitle is-5 m-1">資本金</h4>
        <div class="columns">
          <div class="is-3 column is-flex">
            <input v-model="capital" class="input is-small" type="text" placeholder="例: 6千万" />円
          </div>
        </div>
        <h4 class="subtitle is-5 m-1">従業員数</h4>
        <div class="columns">
          <div class="is-2 column is-flex">
            <input v-model="employeesNumber" class="input is-small" type="text" placeholder="例: 100" />名
          </div>
        </div>
        <h4 class="subtitle is-5 m-1">職務内容要約</h4>
        <div class="columns">
          <div class="column">
            <input v-model="summery" class="input is-small" type="text" placeholder="例: 金融システムの開発・運用" />
          </div>
        </div>
      </div>
      <div class="pt-5 has-text-centered">
        <button class="button is-primary is-medium" @click="save()">追加</button>
        <button class="button is-medium" @click="closeModal">閉じる</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Modal from '~/components/Modal.vue'
import CompanyDetailForm from '~/components/CompanyDetailForm.vue'

export default Vue.extend({
  props: ['inputs'],
  components: {
    Modal,
    CompanyDetailForm,
  },
  data() {
    return {
      modalFlag: false,
      selectedKey: null,
      fromYear: '',
      fromMonth: '',
      toYear: '',
      toMonth: '',
      name: '',
      industry: '',
      capital: '',
      employeesNumber: '',
      summery: '',
      projects: [],
    }
  },
  computed : {
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
  },
  methods: {
    openModal() {
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    deleteCompany: function(key) {
      return this.inputs.company.splice(key, 1);
    },
    edit: function(selectedKey=null) {
      this.selectedKey = selectedKey;

      if (selectedKey != null) {
        var companies = this.inputs.company[this.selectedKey]
        for (let key in companies) {
          this[key] = companies[key];
        }
      } else {
        this.fromYear = '';
        this.fromMonth = '';
        this.toYear = '';
        this.toMonth = '';
        this.name = '';
        this.industry = '';
        this.capital = '';
        this.employeesNumber = '';
        this.summery = '';
        this.projects = [];
      }
      this.openModal();
    },
    save: function() {
      var inputData = {
        fromYear: this.fromYear,
        fromMonth: this.fromMonth,
        toYear: this.toYear,
        toMonth: this.toMonth,
        name: this.name,
        industry: this.industry,
        capital: this.capital,
        employeesNumber: this.employeesNumber,
        summery: this.summery,
        projects: this.projects,
      }
      var company = this.inputs.company.slice();

      if (this.selectedKey != null) {
        company[this.selectedKey] = inputData;
      } else {
        company.push(inputData);
      }
      this.$set(this.inputs, 'company', company);
      this.modalFlag = false;
    },
  }
})
</script>