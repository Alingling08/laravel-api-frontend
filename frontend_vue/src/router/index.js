import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Register from "@/views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import AddNewProduct from "@/views/Products/AddNewProduct.vue";
import { useAuthStore } from "@/stores/auth";
import ProductDetails from "@/views/Products/ProductDetails.vue";
import UpdateProduct from "@/views/Products/UpdateProduct.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
			meta: { guest: true },
		},
		{
			path: "/login",
			name: "login",
			component: Login,
			meta: { guest: true },
		},
		{
			path: "/add-new-product",
			name: "add-new-product",
			component: AddNewProduct,
			meta: { auth: true },
		},
		{
			path: "/products/:id",
			name: "product-details",
			component: ProductDetails,
		},
		{
			path: "/products/update/:id",
			name: "update-product",
			component: UpdateProduct,
			meta: { auth: true },
		},
	],
});

router.beforeEach(async (to, from) => {
	const authStore = useAuthStore();
	await authStore.getAuthenticatedUser();

	if (authStore.user && to.meta.guest) {
		alert("You are already logged in!");
		return { name: "home" };
	}

	if (!authStore.user && to.meta.auth) {
		alert("You must be logged in to access this page!");
		return { name: "login" };
	}
});

export default router;
