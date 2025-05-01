package router

import (
	"net/http"
)

// TODO: (HIGH) Define User routes here
func UserRouter() http.Handler {
	mux := http.NewServeMux()

	return mux
}
