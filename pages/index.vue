<template lang="pug">
  .home
    v-row
      v-col(sm="6")
        h2.mt-6 Solidity JSON ABI
        v-textarea(v-model="input")
      v-col(sm="6")
        h2.mt-6 Typescript Code
        v-textarea(v-model="output")
</template>
<script lang="ts">
import { convertAbiToTs } from '~/converter/Converter'
import Vue from 'vue'
export default Vue.extend({
  layout: 'plain',
  data: () => ({
    input: '',
    output: '',
  }),
  mounted() {},
  watch: {
    input() {
      try {
        this.output = convertAbiToTs(JSON.parse(this.input))
      } catch (error) {
        console.log(error)
      }
    },
  },
})
</script>
<style lang="scss">
  .home {
    textarea {
      height: 70vh;
    }
  }
</style>
