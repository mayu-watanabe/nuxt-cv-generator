<template>
  <div>
    <h4 class="title is-4">スキル</h4>
    <div class="table-container" v-if="inputs.skills.length > 0">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth my-4 has-text-centered">
        <thead>
          <tr>
            <th style="width:17%;">カテゴリ</th>
            <th>種別</th>
            <th style="width:10%;">経験年数</th>
            <th>スキルレベル・備考</th>
            <th style="width:5%;">削除</th>
          </tr>
        </thead>
        <tbody is="draggable" v-model="inputs.skills" tag="tbody">
          <tr v-for="(input, key, index) in inputs.skills" v-bind:key=index class="pointer">
            <td @click="edit(key)">{{ input.categoryName }}</td>
            <td @click="edit(key)">{{ input.name }}</td>
            <td @click="edit(key)">{{ input.period }}{{ input.periodUnit }}</td>
            <td @click="edit(key)" class="has-text-left">{{ input.memo }}</td>
            <td><button class="button is-small" @click="deleteSkill(key)">削除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="has-text-centered">
      <button class="button is-success is-light is-medium m-5" @click="edit()">スキルを追加</button>
    </div>
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
        </div>
        <div class="select is-small">
          <select v-model="periodUnit">
              <option>年</option>
              <option>ヶ月</option>
          </select>
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">スキルレベル・備考</h4>
        <div class="mb-4">
          <input v-model="memo" class="input is-small" type="text" list="memoData" placeholder="通常使用に問題なし" />
          <datalist id="memoData">
            <option v-for="option in memoOptions" :value="option"></option>
          </datalist>
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
import draggable from 'vuedraggable'

export default Vue.extend({
  props: ['inputs'],
  components: {
    Modal,
    draggable,
  },
  data() {
    return {
      modalFlag: false,
      selectedKey: null,
      category: '',
      categoryName: '',
      name: '',
      period: '',
      periodUnit: '',
      memo: '',
      validation: {
        category: false,
        // categoryName: false,
        name: false,
        period: false,
        periodUnit: false,
        memo: false,
      },
    }
  },
  filters: {
    categoryValidator: {
      write: function (val) {
        this.validation.category = !!val
        return val
      }
    },
    nameValidator: {
      write: function (val) {
        this.validation.name = !!val
        return val
      }
    },
    periodValidator: {
      write: function (val) {
        this.validation.period = !!val
        return val
      }
    },
    periodUnitValidator: {
      write: function (val) {
        this.validation.periodUnit = !!val
        return val
      }
    },
    memoValidator: {
      write: function (val) {
        this.validation.memo = !!val
        return val
      }
    },
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
        '通常使用に問題なし',
        '調べながらであれば作業可能',
        'プログラミングスクールで学習/自己研鑽',
        '自己研鑽',
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
    deleteSkill: function(key) {
      return this.inputs.skills.splice(key, 1);
    },
    edit: function(projectKey=null) {
      this.selectedKey = projectKey;
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
        this.periodUnit = '';
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
        periodUnit: this.periodUnit,
        memo: this.memo,
      }
      var skills = this.inputs.skills.slice();
      if (this.selectedKey != null) {
        skills[this.selectedKey] = inputData;
      } else {
        skills.push(inputData);
      }
      this.sort(skills, 'category');
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