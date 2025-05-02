package router

import (
	"fmt"
	"net/http"
)

func landingPageHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World, welcome to Handl's Go Backend Service!")
}

func SetUpRoutes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", landingPageHandler)
	mux.Handle("/users/", UserRouter())
	mux.Handle("/vendors/", VendorRouter())

	return mux
}
