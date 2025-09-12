<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl overflow-y-auto max-h-[90vh]"
    >
      <h2 class="text-2xl font-bold mb-4">
        {{ product ? "Edit Product" : "Add New Product" }}
      </h2>

      <form @submit.prevent="saveProduct" class="space-y-4">
        <InputFields
          id="title"
          label="Title"
          type="text"
          v-model="productForm.title"
        />
        <InputFields
          id="price"
          label="Price"
          type="number"
          v-model="productForm.price"
        />
        <InputFields
          id="description"
          label="Description"
          type="textarea"
          v-model="productForm.description"
        />
        <InputFields
          id="category"
          label="Category"
          type="text"
          v-model="productForm.category"
        />
        <InputFields
          id="image"
          label="Image URL"
          type="file"
          v-model="productForm.image"
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
  product: Object,
});

const emit = defineEmits(["close", "save"]);

const productForm = ref({
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
});

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      if (props.product) {
        productForm.value = { ...props.product };
      } else {
        productForm.value = {
          title: "",
          price: 0,
          description: "",
          category: "",
          image: "",
        };
      }
    }
  }
);

const saveProduct = () => {
  emit("save", productForm.value);
};
</script>
