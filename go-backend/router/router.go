package router

import (
	"fmt"
	"net/http"

	"handl-server/cmd/db"

	"github.com/go-chi/chi/v5"
	// "github.com/go-chi/chi/v5/middleware"
)

func landingPageHandler(w http.ResponseWriter, r *http.Request) {
	val, err := db.TestConnection()
	if err != nil {
		fmt.Fprintf(w, "Unable to connect to the database: %v", err)
		return
	}
	fmt.Fprintf(w, "Hello World, welcome to Handl's Go Backend Service!")
	fmt.Fprint(w, val)
}

// TODO: (HIGH) Add Middleware to prevent security attacks
func SetUpRoutes() http.Handler {
	r := chi.NewRouter()
	r.Get("/", landingPageHandler)
	r.Mount("/users", UserRouter())
	r.Mount("/vendors", VendorRouter())

	return r
}
