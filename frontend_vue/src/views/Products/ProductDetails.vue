<script setup>
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";

const route = useRoute();
const { getProduct, deleteProduct } = useProductsStore();
const authStore = useAuthStore();
const product = ref(null);

onMounted(async () => (product.value = await getProduct(route.params.id)));
</script>
<template>
	<div class="overflow-hidden bg-white py-24 sm:py-32" v-if="product">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
				<div class="lg:pt-4 lg:pr-8">
					<div class="lg:max-w-lg">
						<h2 class="text-base/7 font-semibold text-indigo-600">{{ product.category }}</h2>
						<p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
							{{ product.name }}
						</p>
						<p class="mt-6 text-lg/8 text-gray-600">{{ product.description }}</p>
						<dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
							<div class="relative pl-9">
								<dt class="inline font-semibold text-gray-900">
									<svg class="absolute top-1 left-1 size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
										<path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
										<path
											fill-rule="evenodd"
											d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z"
											clip-rule="evenodd" />
									</svg>
									Brand:
								</dt>
								<dd class="inline">{{ product.brand }}</dd>
							</div>
							<div class="relative pl-9">
								<dt class="inline font-semibold text-gray-900">
									<svg class="absolute top-1 left-1 size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
										<path
											fill-rule="evenodd"
											d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
											clip-rule="evenodd" />
									</svg>
									Price:
								</dt>
								<dd class="inline">₱ {{ product.price.toFixed(2) }}</dd>
							</div>
							<div class="relative pl-9">
								<dt class="inline font-semibold text-gray-900">
									<svg class="absolute top-1 left-1 size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
										<path
											fill-rule="evenodd"
											d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
											clip-rule="evenodd" />
									</svg>
									Stock:
								</dt>
								<dd class="inline">{{ product.stock }}</dd>
							</div>
						</dl>
					</div>
				</div>
				<img
					src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
					alt="{{ product.name }}"
					class="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-150 md:-ml-4 lg:-ml-0"
					width="1200"
					height="1200" />
			</div>

			<div class="pt-2 flex items-center" v-if="authStore.user && authStore.user.id === product.user_id">
				<RouterLink
					:to="{ name: 'update-product', params: { id: product.id } }"
					type="button"
					class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">
					Edit Products
				</RouterLink>
				<form @submit.prevent="deleteProduct(product)" class="inline" v-if="authStore.user && authStore.user.id === product.user_id">
					<button
						type="submit"
						class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
						Delete Product
					</button>
				</form>
			</div>
		</div>
	</div>
	<div v-else class="text-center text-gray-500 dark:text-gray-400 mt-5">
		<p class="text-lg font-black">Product doesn't exist anymore.</p>
		<p class="mt-2">Try adjusting your search or filter to find what you're looking for.</p>
	</div>
</template>
