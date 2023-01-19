<template>
  <div modal="true">
    <div>
      <div v-if="visible" :data-modal="name" class="modal">
        <div
          aria-modal="true"
          data-reach-dialog-content="true"
          tabindex="-1"
          class="modal__mask"
        >
          <div class="modal__body">
            <slot :payload="payload"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VModal from './handle'
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      payload: null,
      visible: false,
    }
  },
  beforeMount() {
    // Open event
    VModal.EventBus.$on('open', (params) => {
      if (this.name === params.name) {
        this.open(params)
      }
    })
    // Close event
    VModal.EventBus.$on('close', (params) => {
      if (this.name === params.name) {
        this.close()
      }
    })
  },
  methods: {
    open(params) {
      this.visible = true
      this.payload = params.payload
    },
    close() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  &__body {
    padding: 20px;
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    min-height: 300px;
    margin: 1rem;
    position: relative;
    min-width: 300px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    justify-self: center;
  }
}
</style>
