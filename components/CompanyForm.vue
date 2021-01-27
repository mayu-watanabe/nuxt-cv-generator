<template>
  <div class="has-text-centered">
    <button class="button is-info is-medium is-fullwidth m-1 help_link__button" @click="openModal">
      会社を追加
    </button>
    <Modal v-if="modalFlag">
      <h4 class="title is-4">会社情報の追加</h4>
      <div class="has-text-left">
        <h4 class="subtitle is-5 is-marginless m-1">会社名</h4>
        <div class="mb-4">
          <input v-model="addCompany['name']" class="input is-small" type="text" placeholder="会社名" />
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">在籍期間</h4>
        <div class=columns>
          <div class="column is-vcentered">
            <div class="select is-small">
              <select v-model="addCompany['fromYear']">
                <option v-for="year in years" :value="year">{{ year }}</option>
              </select>
            </div>
            年
            <div class="select is-small">
              <select v-model="addCompany['fromMonth']">
                <option v-for="month in months" :value="month">{{ month }}</option>
              </select>
            </div>
            月から
            <div class="select is-small">
              <select v-model="addCompany['toYear']">
                <option v-for="year in years" :value="year">{{ year }}</option>
              </select>
            </div>
            年
            <div class="select is-small">
              <select v-model="addCompany['toMonth']">
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
            <input v-model="addCompany['industry']" class="input is-small" type="text" placeholder="例: SI事業" />
          </div>
        </div>
        <h4 class="subtitle is-5 m-1">資本金</h4>
        <div class="columns">
          <div class="is-3 column is-flex">
            <input v-model="addCompany['capital']" class="input is-small" type="text" placeholder="例: 6千万" />円
          </div>
        </div>
        <h4 class="subtitle is-5 m-1">従業員数</h4>
        <div class="columns">
          <div class="is-2 column is-flex">
            <input v-model="addCompany['employeesNumber']" class="input is-small" type="text" placeholder="例: 100" />名
          </div>
        </div>
        <h4 class="subtitle is-5 m-1">職務内容要約</h4>
        <div class="columns">
          <div class="column">
            <input v-model="addCompany['summery']" class="input is-small" type="text" placeholder="例: 金融システムの開発・運用" />
          </div>
        </div>
      </div>
      <div class="pt-5">
        <button class="button is-primary is-medium" @click="emitParent">追加</button>
        <button class="button is-medium" @click="closeModal">閉じる</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Modal from '~/components/Modal.vue'

export default Vue.extend({
  props: ['addInput', 'inputs'],
  components: {
    Modal,
  },
  data() {
    return {
      modalFlag: false,
      addCompany: {
        fromYear: '',
        fromMonth: '',
        toYear: '',
        toMonth: '',
        name: '',
        industry: '',
        capital: '',
        employeesNumber: '',
        summery: '',
      },
    }
  },
  computed : {
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1969}, (value, index) => year - index)
    },
    months () {
      return Array.from({length: 12}, (value, index) => 1 + index)
    }
  },
  methods: {
    openModal() {
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    emitParent: function() {
      this.modalFlag = false;
      this.$emit('parent-method', {field: 'company', data: this.addCompany});
    },
  }
})
</script>