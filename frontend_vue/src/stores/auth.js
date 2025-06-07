import { defineStore } from "pinia";
// This store is currently empty but can be expanded in the future

export const useAuthStore = defineStore("authStore", {
	state: () => {
		return {
			user: null,
			errors: {},
		};
	},
	actions: {
		//GET AUTHRENTICATED USER
		async getAuthenticatedUser() {
			if (localStorage.getItem("token")) {
				const res = await fetch("/api/user", {
					headers: {
						authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				const data = await res.json();
				if (data.errors) {
					this.errors = data.errors;
				} else {
					this.user = data;
				}
			}
		},
		//LOGIN OR REGISTER USE
		async authenticate(apiRoute, formData) {
			const res = await fetch(`/api/${apiRoute}`, {
				method: "POST",
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.errors) {
				this.errors = data.errors;
			} else {
				this.errors = {};
				localStorage.setItem("token", data.token);
				this.user = data.user;
				this.router.push({ name: "home" });
			}
		},

		//LOGOUT USER
		async logout() {
			const res = await fetch("/api/logout", {
				method: "POST",
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			const data = await res.json();

			if (res.ok) {
				this.user = null;
				this.errors = {};
				localStorage.removeItem("token");
				this.router.push({ name: "home" });
			}
		},
	},
});
