<template>
  <div
    class="input-group"
    :class="`input-group-${variant} ${getStatus(error, success)}`"
  >
    <label :class="variant === 'static' ? '' : 'form-label'">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :class="getClasses(size)"
      :name="name"
      :id="id"
      v-model="inputValue"
      :placeholder="placeholder"
      :isRequired="isRequired"
      :disabled="disabled"
      @change="onChange"
    />
  </div>
</template>

<script>
import setMaterialInput from "assets/js/material-input.js";

export default {
  name: "vmd-input",
  emits: ["update:modelValue"],
  props: {
    variant: {
      type: String,
      default: "outline",
    },
    label: String,
    size: {
      type: String,
      default: "default",
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: String,
    id: String,
    // Optional
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    isRequired: Boolean,
  },
  data() {
    return {
      inputValue: "",
    };
  },
  watch: {
    inputValue(newValue) {
      console.log('changing');
      if (newValue === this.modelValue) {
        return;
      }

      this.$emit("update:modelValue", newValue);
    },
  },
  methods: {
    getClasses: (size) => {
      let sizeValue;

      sizeValue = size ? `form-control-${size}` : null;

      return sizeValue;
    },
    getStatus: (error, success) => {
      let isValidValue;

      if (success) {
        isValidValue = "is-valid";
      } else if (error) {
        isValidValue = "is-invalid";
      } else {
        isValidValue = null;
      }

      return isValidValue;
    },
    onChange() {
      this.$emit("update:modelValue", this.inputValue);
    }
  },
  mounted() {
    setMaterialInput();
  },
};
</script>
