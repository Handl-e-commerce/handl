package router

import (
	"net/http"
)

// TODO: (HIGH) Define Vendor routes here
func VendorRouter() http.Handler {
	mux := http.NewServeMux()

	return mux
}
