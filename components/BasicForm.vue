<template>
  <div>
    <h4 class="title is-4">基本情報</h4>
    <div>
      <div class="columns">
        <div class="column">
          <div class="field-label is-normal has-text-left">
            <label class="label">氏</label>
            <input v-model="inputs.basic.familyName" class="input" type="text" placeholder="氏" />
          </div>
        </div>
        <div class="column">
          <div class="field-label is-normal has-text-left">
            <label class="label">名</label>
            <input v-model="inputs.basic.firstName" class="input" type="text" placeholder="名" />
          </div>
        </div>
      </div>
      <div class="field-label is-normal has-text-left">
        <label class="label">GitHub</label>
        <input v-model="inputs.basic.github" class="input" type="text" placeholder="GitHubのURL" />
      </div>
      <div class="field-label is-normal has-text-left">
        <label class="label">Website</label>
        <input
          v-model="inputs.basic.website" class="input" type="text" placeholder="ポートフォリオサイトのURL"
        />
      </div>
      <div class="field-label is-normal has-text-left">
        <label class="label">職務要約</label>
        <textarea v-model="inputs.basic.summery" class="input textarea is-small" placeholder=""></textarea>
      </div>
      <div class="field-label is-normal has-text-left">
        <label class="label">生かせる経験・知識・技術</label>
        <textarea v-model="inputs.basic.experience" class="input textarea is-small" placeholder=""></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: ['inputs'],
})
</script>