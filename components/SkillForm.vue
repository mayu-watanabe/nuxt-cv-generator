<template>
  <div class="section has-text-centered">
    <h3 class="title is-3">スキル</h3>
    <div class="company-container" v-if="inputs['skill'].length > 0">
      <div class="skill-info">
        <table class="table  is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <tr>
            <th>カテゴリ</th>
            <th>種別</th>
            <th>経験年数</th>
            <th>スキルレベル・備考</th>
          </tr>
          <tr v-for="(input, key, index) in inputs['skill']"  v-bind:key=index>
            <td>{{ categories[input.category] }}</td>
            <td>{{ input.name }}</td>
            <td>{{ input.period }}</td>
            <td>{{ input.memo }}</td>
          </tr>

        </table>
      </div>
    </div>
    <button class="button is-info is-medium is-fullwidth m-1 help_link__button" @click="openModal">
      スキルを追加
    </button>
    <Modal v-if="modalFlag">
      <h4 class="title is-4">スキルの追加</h4>
      <div class="has-text-left">
        <h4 class="subtitle is-5 is-marginless m-1">カテゴリ</h4>
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
        </div>
      </div>
      <div class="pt-5">
        <button class="button is-primary is-medium" @click="send('skill', addSkill)">追加</button>
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
      addSkill: {
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
      return Array.from({length: 30}, (value, index) => 1 + index)
    },
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
      this.sort(this.inputs['skill'], 'category');
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
    }
  }
})
</script>