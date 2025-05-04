package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// TODO: (HIGH) Implement Vendor routes here
func VendorRouter() http.Handler {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Get("/categories", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Get("/subcategories", func(w http.ResponseWriter, r *http.Request) {

	})
	return r
}
