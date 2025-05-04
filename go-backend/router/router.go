package router

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	// "github.com/go-chi/chi/v5/middleware"
)

func landingPageHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World, welcome to Handl's Go Backend Service!")
}

// TODO: (HIGH) Add Middleware to prevent security attacks
func SetUpRoutes() http.Handler {
	r := chi.NewRouter()
	r.Get("/", landingPageHandler)
	r.Mount("/users", UserRouter())
	r.Mount("/vendors", VendorRouter())

	return r
}
