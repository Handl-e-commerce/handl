package router

import (
	"net/http"
)

func SetUpRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.Handle("/users/", UserRouter())
	mux.Handle("/vendors/", VendorRouter())

	return mux
}
