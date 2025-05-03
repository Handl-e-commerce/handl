package router

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// TODO: (HIGH) Implement User routes here
func UserRouter() chi.Router {
	r := chi.NewRouter()
	// userRouter.post("/register")
	r.Post("/register", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.get("/me")
	r.Get("/me", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Your router is working")
	})
	// userRouter.get("/me/vendors")
	r.Get("/me/vendors", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.put("/:id/password")
	r.Put("/{id}/password", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/password/reset/verify")
	r.Post("/password/reset/verify", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/password/reset/request")
	r.Post("/password/reset/request", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/login")
	r.Post("/login", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/logout")
	r.Post("/logout", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/registration/verify")
	r.Post("/registration/verify", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/registration/verify/new-token")
	r.Post("/registration/verify/new-token", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.put("/delete/:id")
	r.Put("/delete/{id}", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/contact")
	r.Post("/contact", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/recaptcha/verify")
	r.Post("/recaptcha/verify", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.put("/vendors/save")
	r.Put("/vendors/save", func(w http.ResponseWriter, r *http.Request) {

	})

	return r
}
