<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl overflow-y-auto max-h-[90vh]"
    >
      <h2 class="text-2xl font-bold mb-4">
        {{ title }}
      </h2>

      <form @submit.prevent="save" class="space-y-4">
        <InputFields
          v-for="field in fields"
          :key="field.id"
          :id="field.id"
          :label="field.label"
          :type="field.type"
          :model-value="getNestedValue(localFormData, field.model)"
          @update:model-value="setNestedValue(localFormData, field.model, $event)"
        />

        <div class="flex justify-end gap-2 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import InputFields from "./InputField.vue";

const props = defineProps({
  show: Boolean,
  title: String,
  fields: Array,
  formData: Object,
});

const emit = defineEmits(["close", "save"]);

const localFormData = ref({});

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      localFormData.value = props.formData ? { ...props.formData } : {};
    }
  },
  { immediate: true }
);

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const setNestedValue = (obj, path, value) => {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
};

const save = () => {
  emit("save", localFormData.value);
};
</script>