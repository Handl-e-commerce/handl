package router

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// TODO: (HIGH) Implement User routes
func UserRouter() chi.Router {
	r := chi.NewRouter()

	r.Post("/register", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Get("/me", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Your router is working")
	})

	r.Get("/me/vendors", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Put("/{id}/password", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		fmt.Fprintf(w, "Your %v is working", id)
	})

	r.Post("/password/reset/verify", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/password/reset/request", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/login", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/logout", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/registration/verify", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/registration/verify/new-token", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Put("/delete/{id}", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/contact", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/recaptcha/verify", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Put("/vendors/save", func(w http.ResponseWriter, r *http.Request) {

	})

	return r
}
