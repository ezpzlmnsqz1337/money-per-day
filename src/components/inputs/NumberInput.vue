<template>
  <v-text-field v-model="model" type="number" :postfix="postCurrency" :prefix="preCurrency" />
</template>

<script>
export default {
  props: ['postCurrency', 'preCurrency', 'model']
}
</script>

<style scoped></style>
