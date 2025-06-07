import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useProductsStore = defineStore("productsStore", {
	state: () => {
		return {
			errors: {},
		};
	},
	actions: {
		//GET ALL PRODUCT
		async getAllProducts() {
			const res = await fetch("/api/products");
			const data = await res.json();

			return data;
		},
		//GET A PRODUCT
		async getProduct(productId) {
			try {
				const res = await fetch(`/api/products/${productId}`);
				const data = await res.json();
				// Make sure the structure of the returned data matches what you expect
				return data.product || {}; // Adjust according to your API structure
			} catch (error) {
				console.error("Error fetching product:", error);
				return null; // Return null if there’s an error
			}
		},
		//Submit a new product
		async addNewProduct(formData) {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.errors) {
				this.errors = data.errors;
			} else {
				this.router.push({ name: "home" });
			}
		},
		//DELETE A PRODUCT
		async deleteProduct(product) {
			try {
				const authStore = useAuthStore();

				if (authStore.user.id === product.user_id) {
					const res = await fetch(`/api/products/${product.id}`, {
						method: "DELETE",
						headers: {
							authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					});
					const data = await res.json();
					// Make sure the structure of the returned data matches what you expect
					// return data.product || {}; // Adjust according to your API structure

					if (res.ok) {
						this.router.push({ name: "home" });
					}
					console.log(data);
				}
			} catch (error) {
				console.error("Error deleting product:", error);
				return null; // Return null if there’s an error
			}
		},
		//UPDATE A PRODUCT
		async updateProduct(product, formData) {
			try {
				const authStore = useAuthStore();

				if (authStore.user.id === product.user_id) {
					const res = await fetch(`/api/products/${product.id}`, {
						method: "PUT",
						headers: {
							authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						body: JSON.stringify(formData),
					});
					const data = await res.json();
					// Make sure the structure of the returned data matches what you expect
					// return data.product || {}; // Adjust according to your API structure
					if (data.errors) {
						this.errors = data.errors;
					} else {
						this.router.push({ name: "product-details", params: { id: product.id } });
					}
				}
			} catch (error) {
				console.error("Error deleting product:", error);
				return null; // Return null if there’s an error
			}
		},
	},
});
