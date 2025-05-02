package router

import (
	"net/http"
)

// TODO: (HIGH) Implement Vendor routes here
func VendorRouter() http.Handler {
	mux := http.NewServeMux()
	// vendorRouter.get("/")
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {

	})
	// vendorRouter.get("/categories")
	mux.HandleFunc("GET /categories", func(w http.ResponseWriter, r *http.Request) {

	})
	// vendorRouter.get("/subcategories")
	mux.HandleFunc("GET /subcategories", func(w http.ResponseWriter, r *http.Request) {

	})
	return mux
}
