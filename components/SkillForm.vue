<template>
  <div class="section has-text-centered">
    <h3 class="title is-3">スキル</h3>
    <div class="company-container" v-if="inputs['skills'].length > 0">
      <div class="skill-info">
        <table class="table  is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>カテゴリ</th>
              <th>種別</th>
              <th>経験年数</th>
              <th>スキルレベル・備考</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(input, key, index) in inputs['skills']"  v-bind:key=index @click="edit(key)">
              <td>{{ input.categoryName }}</td>
              <td>{{ input.name }}</td>
              <td>{{ input.period }}</td>
              <td>{{ input.memo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button class="button is-medium m-5" @click="edit()">スキルを追加</button>
    <Modal v-if="modalFlag">
      <h4 class="title is-4">スキルの追加</h4>
      <div class="has-text-left">
        <h4 class="subtitle is-5 is-marginless m-1">カテゴリ</h4>
        <div class="select is-small">
          <select v-model="category">
            <option v-for="(category, index) in categories" :value="index">{{ categories[index] }}</option>
          </select>
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">種別</h4>
        <div class="mb-4">
          <input v-model="name" class="input is-small" type="text" placeholder="PHP" />
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">経験年数</h4>
        <div class="select is-small">
          <select v-model="period">
            <option v-for="year in years" :value="year">{{ year }}</option>
          </select>
        </div>年
        <h4 class="subtitle is-5 is-marginless m-1">スキルレベル・備考</h4>
        <div class="mb-4">
          <input v-model="memo" class="input is-small" type="text" list="memoData" placeholder="通常使用に問題なし" />
          <datalist id="memoData">
            <option v-for="option in memoOptions" :value="option"></option>
          </datalist>
        </div>
      </div>
      <div class="pt-5">
        <button class="button is-primary is-medium" @click="save()">追加</button>
        <button class="button is-medium" @click="closeModal">閉じる</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Modal from '~/components/Modal.vue'

export default Vue.extend({
  props: ['inputs'],
  components: {
    Modal,
  },
  data() {
    return {
      modalFlag: false,
      selectedKey: null,
      category: '',
      categoryName: '',
      name: '',
      period: '',
      memo: '',
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
    memoOptions () {
      return [
        '通常使⽤に問題無し',
        '調べながらであれば作業可能',
        'プログラミングスクールで学習/⾃⼰研鑽',
        '⾃⼰研鑽',
        'インストールから環境構築、設定、開発が可能',
      ]
    },
  },
  methods: {
    openModal() {
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    edit: function(projectKey=null) {
      this.selectedKey = projectKey;
      console.log(this.inputs.skills[this.selectedKey])
      if (projectKey != null) {
        var skills = this.inputs.skills[this.selectedKey]
        for (let key in skills) {
          this[key] = skills[key];
        }
      } else {
        this.category = '';
        this.categoryName = '';
        this.name = '';
        this.period = '';
        this.memo = '';
      }
      this.openModal();
    },
    save: function() {
      var inputData = {
        category: this.category,
        categoryName: this.categories[this.category],
        name: this.name,
        period: this.period,
        memo: this.memo,
      }
      var skills = this.inputs.skills.slice();
      if (this.selectedKey != null) {
        skills[this.selectedKey] = inputData;
      } else {
        skills.push(inputData);
      }
      this.sort(this.inputs.skills, 'category');
      this.$set(this.inputs, 'skills', skills);
      this.modalFlag = false;
    },
    /**
     * 多次元連想配列を特定のキー名で並び替える
     */
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