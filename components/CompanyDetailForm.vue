<template>
  <div class="has-text-centered">
    <div class="has-text-left">
      <table v-if="input.projects" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth has-text-centered my-4">
        <thead>
          <tr>
            <th style="width:10%;">期間</th>
            <th style="width:80%;">業務内容</th>
            <th style="width:10%;">表示</th>
          </tr>
        </thead>
        <tbody is="draggable" v-model="input.projects" tag="tbody">
          <tr v-for="(projectInput, projectIndex) in input.projects"  v-bind:key=projectIndex>
            <td class="is-vcentered">{{ companyPeriod(projectInput) }}</td>
            <td class="has-text-left pointer" @click="edit(projectIndex)">
              <div class="my-2">
                <span class="has-text-weight-bold">要約</span>
                <p class="mx-3">{{ projectInput.summery }}</p>
              </div>
              <div class="my-2">
                <span class="has-text-weight-bold">担当フェーズ</span>
                <p class="mx-3">{{ formattedPhases(projectInput.phases) }}</p>
              </div>
              <div class="my-2">
                <span class="has-text-weight-bold">実績・取り組み等</span>
                <p class="mx-3" style="white-space: pre-line;">{{ projectInput.achievement }}</p>
              </div>
              <div class="my-2">
                <span class="has-text-weight-bold">組織人数</span>
                <p class="mx-3">{{ projectInput.numberOfTeam }}名</p>
              </div>
              <div class="my-2">
                <span class="has-text-weight-bold">役割</span>
                <p class="mx-3">{{ projectInput.role }}</p>
              </div>
              <div class="my-2">
                <span class="has-text-weight-bold">言語・環境</span>
                <p class="mx-3" style="white-space: pre-line;">{{ projectInput.environment }}</p>
              </div>
            </td>
            <td class="is-vcentered">
              <div class="m-2">
                <input type="checkbox" :checked="projectInput.publish" @click="changePublish(projectIndex)">
              </div>
              <div class="m-2">
                <button class="button is-small" @click="deleteProject(projectIndex)">削除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="button is-light is-mediam my-3 is-fullwidth has-text-centered" @click="edit()">経歴を追加</button>
    </div>
    <Modal v-if="modalFlag">
      <h4 class="title is-4">業務内容の追加</h4>
      <div class="has-text-left">
        <h4 class="subtitle is-5 is-marginless m-1">期間</h4>
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
            月まで
          </div>
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">プロジェクト要約</h4>
        <div class="mb-4">
          <input v-model="summery" class="input is-small" type="text" placeholder="" />
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">担当フェーズ</h4>
        <span v-for="(phase, index) in phasesList">
          <input v-model="phases" type="checkbox" :id="index" :value="phase">
          <label :for="phase">{{ phase }}</label>
        </span>
        <h4 class="subtitle is-5 is-marginless m-1">実績・取り組み等</h4>
        <textarea v-model="achievement" class="input textarea is-small" placeholder=""></textarea>
        <h4 class="subtitle is-5 is-marginless m-1">組織人数</h4>
        <div class="columns">
          <div class="is-2 column is-flex">
            <input v-model="numberOfTeam" class="input is-small" type="text" placeholder="例: 10" />名
          </div>
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">役割</h4>
        <input v-model="role" class="input is-small" type="text" placeholder="" />
        <h4 class="subtitle is-5 is-marginless m-1">言語・環境</h4>
        <textarea v-model="environment" class="input textarea is-small" placeholder=""></textarea>
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
import draggable from 'vuedraggable'
const Modal = () => import('~/components/Modal.vue')

export default Vue.extend({
  props: ['input'],
  components: {
    Modal,
    draggable,
  },
  data() {
    return {
      modalFlag: false,
      selectedProjectKey: null,
      fromYear: '',
      fromMonth: '',
      toYear: '',
      toMonth: '',
      summery: '',
      phases: [],
      achievement: '',
      numberOfTeam: '',
      role: '',
      environment: '',
      publish: 1,
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
    phasesList() {
      return [
        '要件定義',
        '基本設計',
        '詳細設計',
        '実装',
        '単体テスト',
        '結合テスト',
      ]
    },
    formattedPhases() {
      return function(phases) {
        let string = '';
        let lastkey = Object.keys(phases).pop();
        for (let key in phases) {
          string += phases[key] + (lastkey !== key ? ',' : ''); 
        }
        return string;
      }
    }
  },
  methods: {
    openModal() {
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    deleteProject: function(key) {
      return this.input.projects.splice(key, 1);
    },
    changePublish(projectKey) {
      var publish = this.input.projects[projectKey].publish ? 0 : 1;
      this.$set(this.input.projects[projectKey], 'publish', publish);
    },
    edit: function(projectKey=null) {
      this.selectedProjectKey = projectKey;

      if (projectKey != null) {
        var project = this.input.projects[this.selectedProjectKey]
        for (let key in project) {
          this[key] = project[key];
        }
      } else {
        this.fromYear = '';
        this.fromMonth = '';
        this.toYear = '';
        this.toMonth = '';
        this.summery = '';
        this.phases = [];
        this.achievement = '';
        this.numberOfTeam = '';
        this.role = '';
        this.environment = '';
        this.publish = true;
      }
      this.openModal();
    },
    save: function() {
      var inputData = {
        fromYear: this.fromYear,
        fromMonth: this.fromMonth,
        toYear: this.toYear,
        toMonth: this.toMonth,
        summery: this.summery,
        phases: this.phases,
        achievement: this.achievement,
        numberOfTeam: this.numberOfTeam,
        role: this.role,
        environment: this.environment,
        publish: this.publish,
      }
      var projects = this.input.projects.slice();

      if (this.selectedProjectKey != null) {
        projects[this.selectedProjectKey] = inputData;
      } else {
        projects.push(inputData);
      }
      this.$set(this.input, 'projects', projects);
      this.modalFlag = false;
    },
  }
})
</script>