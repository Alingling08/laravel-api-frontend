<script setup>
import { reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import logo from "@/assets/images/scorpiohub-logo.png";

const authStore = useAuthStore();

const inputClass = "text-red-500 text-xs italic";

const formData = reactive({
	email: "",
	password: "",
});

onMounted(() => {
	authStore.errors = {}; // clear errors on mount
});
</script>
<template>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
			<a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
				<img class="w-8 h-8 mr-2" :src="logo" alt="logo" />
				Scorpio Hub
			</a>
			<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
					<form class="space-y-4 md:space-y-6" action="#" @submit.prevent="authStore.authenticate('login', formData)">
						<div>
							<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
							<input
								type="email"
								v-model="formData.email"
								id="email"
								:class="[
									'bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
									authStore.errors.email ? 'border-red-600 focus:border-red-600 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300',
								]"
								placeholder="name@company.com"
								required />
							<p v-if="authStore.errors.email" class="mt-2 text-xs text-red-600 dark:text-red-500">
								<span class="block font-medium">{{ authStore.errors.email[0] }}</span>
							</p>
						</div>
						<div>
							<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
							<input
								type="password"
								v-model="formData.password"
								id="password"
								placeholder="••••••••"
								:class="[
									'bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
									authStore.errors.password ? 'border-red-600 focus:border-red-600 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300',
								]"
								required />
							<p v-if="authStore.errors.password" class="mt-2 text-xs text-red-600 dark:text-red-500">
								<span class="block font-medium">{{ authStore.errors.password }}</span>
							</p>
						</div>
						<div class="flex items-center justify-between">
							<div class="flex items-start">
								<div class="flex items-center h-5">
									<input
										id="remember"
										aria-describedby="remember"
										type="checkbox"
										class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										required />
								</div>
								<div class="ml-3 text-sm">
									<label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
								</div>
							</div>
							<a href="/forgot-password" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
						</div>
						<button
							type="submit"
							class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
							Sign in
						</button>
						<p class="text-sm font-light text-gray-500 dark:text-gray-400">
							Don’t have an account yet?
							<a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>
