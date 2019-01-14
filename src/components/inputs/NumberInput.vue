<template>
    <v-text-field
        type="number"
        v-model = model
        :postfix="postCurrency"
        :prefix="preCurrency"/>
</template>

<script>
export default {
  props: ['postCurrency', 'preCurrency', 'model']
}
</script>

<style scoped>

</style>
