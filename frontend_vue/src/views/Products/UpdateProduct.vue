<script setup>
import { onMounted, reactive, ref } from "vue";
import { useProductsStore } from "@/stores/products";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const { user } = storeToRefs(useAuthStore());
const { errors } = storeToRefs(useProductsStore());
const { getProduct, updateProduct } = useProductsStore();
// const { addNewProduct } = useProductsStore();
const product = ref(null);

const formData = reactive({
	name: "",
	brand: "",
	price: 0,
	stock: 0,
	category: "",
	sku: 0,
	description: "",
	is_active: true,
});
onMounted(async () => {
	product.value = await getProduct(route.params.id);

	if (user.value.id !== product.value.user_id) {
		router.push({ name: "home" });
	} else {
		formData.name = product.value.name;
		formData.brand = product.value.brand;
		formData.price = product.value.price;
		formData.stock = product.value.stock;
		formData.category = product.value.category;
		formData.sku = product.value.sku;
		formData.description = product.value.description;
		formData.is_active = product.value.is_active;
	}
});
</script>
<template>
	<section class="bg-white dark:bg-gray-900">
		<div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
			<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update product</h2>
			<form action="#" @submit.prevent="updateProduct(product, formData)">
				<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
					<div class="sm:col-span-3">
						<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
						<input
							type="text"
							v-model="formData.name"
							id="name"
							:class="[
								'bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
								errors.name ? 'border-red-600 focus:border-red-600 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300',
							]"
							placeholder="Type product name"
							required />
						<p v-if="errors.name" class="mt-2 text-xs text-red-600 dark:text-red-500">
							<span v-for="(error, index) in errors.name" :key="index" class="block font-medium">
								{{ error }}
							</span>
						</p>
					</div>
					<div class="w-full">
						<label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
						<input
							type="text"
							v-model="formData.brand"
							id="brand"
							:class="[
								'bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
								errors.brand ? 'border-red-600 focus:border-red-600 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300',
							]"
							placeholder="Product brand"
							required />
						<p v-if="errors.brand" class="mt-2 text-xs text-red-600 dark:text-red-500">
							<span v-for="(error, index) in errors.brand" :key="index" class="block font-medium">
								{{ error }}
							</span>
						</p>
					</div>
					<div class="w-full">
						<label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
						<input
							type="number"
							v-model="formData.price"
							id="price"
							:class="[
								'bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
								errors.price ? 'border-red-600 focus:border-red-600 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300',
							]"
							placeholder="$2999"
							required />
						<p v-if="errors.price" class="mt-2 text-xs text-red-600 dark:text-red-500">
							<span v-for="(error, index) in errors.price" :key="index" class="block font-medium">
								{{ error }}
							</span>
						</p>
					</div>
					<div class="w-full">
						<label for="stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
						<input
							type="number"
							v-model="formData.stock"
							id="stock"
							:class="[
								'bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
								errors.stock ? 'border-red-600 focus:border-red-600 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300',
							]"
							placeholder="10"
							required />
						<p v-if="errors.stock" class="mt-2 text-xs text-red-600 dark:text-red-500">
							<span v-for="(error, index) in errors.stock" :key="index" class="block font-medium">
								{{ error }}
							</span>
						</p>
					</div>
					<div class="sm:col-span-2">
						<label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
						<select
							v-model="formData.category"
							id="category"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
							<option selected disabled>Select category</option>
							<option value="TV/Monitors">TV/Monitors</option>
							<option value="PC">PC</option>
							<option value="Gaming/Console">Gaming/Console</option>
							<option value="Phones">Phones</option>
							<option value="Electronics">Electronics</option>
							<option value="Wearables">Wearables</option>
							<option value="Gaming Accessories">Gaming Accessories</option>
							<option value="Audio">Audio</option>
						</select>
						<p v-if="errors.category" class="mt-2 text-xs text-red-600 dark:text-red-500">
							<span v-for="(error, index) in errors.category" :key="index" class="block font-medium">
								{{ error }}
							</span>
						</p>
					</div>
					<div>
						<label for="sku" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
						<input
							type="text"
							v-model="formData.sku"
							id="sku"
							:class="[
								'bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
								errors.sku ? 'border-red-600 focus:border-red-600 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300',
							]"
							placeholder="12"
							required />
						<p v-if="errors.sku" class="mt-2 text-xs text-red-600 dark:text-red-500">
							<span v-for="(error, index) in errors.sku" :key="index" class="block font-medium">
								{{ error }}
							</span>
						</p>
					</div>
					<div class="sm:col-span-3">
						<label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
						<textarea
							id="description"
							v-model="formData.description"
							rows="8"
							class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="Your description here"></textarea>
						<p v-if="errors.description" class="mt-2 text-xs text-red-600 dark:text-red-500">
							<span v-for="(error, index) in errors.description" :key="index" class="block font-medium">
								{{ error }}
							</span>
						</p>
					</div>
					<div class="sm:col-span-3">
						<div class="flex items-start">
							<div class="flex items-center h-5">
								<input
									id="active"
									aria-describedby="remember"
									type="checkbox"
									v-model="formData.active"
									value="true"
									class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
							</div>
							<div class="ml-3 text-sm">
								<label for="remember" class="text-gray-500 dark:text-gray-300">Active</label>
							</div>
						</div>
					</div>
				</div>
				<button
					type="submit"
					class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
					Update product
				</button>
			</form>
		</div>
	</section>
</template>
