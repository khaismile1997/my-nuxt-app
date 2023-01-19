<template>
  <div class="alert" :class="klass">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: false,
      default: '',
    },
    klass: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
