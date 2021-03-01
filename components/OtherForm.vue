<template>
  <div class="section has-text-centered">
    <h3 class="title is-3">自己PR</h3>
    <div class="company-container" v-if="inputs['summery'].length > 0">
      <div v-for="(input, index) in inputs['summery']"  v-bind:key=index class="skill-info has-text-left m-2">
        <div class="hover p-4" @click="edit(index)">
          <h4 class="subtitle is-4 my-2">{{ input.title }}</h4>
          <p style="white-space: pre-line;">{{ input.content }}</p>
        </div>
      </div>
    </div>
    <button class="button is-medium m-5" @click="edit()">自己PRを追加</button>
    <Modal v-if="modalFlag">
      <h4 class="title is-4">自己PRの追加</h4>
      <div class="has-text-left">
        <h4 class="subtitle is-5 is-marginless m-1">タイトル</h4>
        <div class="mb-4">
          <input v-model="title" class="input is-small" type="text" placeholder="" />
        </div>
        <h4 class="subtitle is-5 is-marginless m-1">説明文</h4>
        <textarea v-model="content" class="input textarea is-small" placeholder=""></textarea>
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
      title: '',
      content: '',
    }
  },
  methods: {
    openModal() {
      this.modalFlag = true
    },
    closeModal() {
      this.modalFlag = false
    },
    edit: function(selectedKey=null) {
      this.selectedKey = selectedKey;

      if (selectedKey != null) {
        var summery = this.inputs.summery[this.selectedKey]
        for (let key in summery) {
          this[key] = summery[key];
        }
      } else {
        this.title = '';
        this.content = '';
      }
      this.openModal();
    },
    save: function() {
      var inputData = {
        title: this.title,
        content: this.content,
      }
      var summery = this.inputs.summery.slice();

      if (this.selectedKey != null) {
        summery[this.selectedKey] = inputData;
      } else {
        summery.push(inputData);
      }
      this.$set(this.inputs, 'summery', summery);
      this.modalFlag = false;
    },
  }
})
</script>