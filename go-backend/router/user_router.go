package router

import (
	"fmt"
	"net/http"
)

// TODO: (HIGH) Implement User routes here
func UserRouter() http.Handler {
	mux := http.NewServeMux()
	// userRouter.post("/register")
	mux.HandleFunc("POST /register", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.get("/me")
	mux.HandleFunc("GET /me", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Your router is working")
	})
	// userRouter.get("/me/vendors")
	mux.HandleFunc("GET /me/vendors", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.put("/:id/password")
	mux.HandleFunc("PUT /{id}/password", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/password/reset/verify")
	mux.HandleFunc("POST /password/reset/verify", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/password/reset/request")
	mux.HandleFunc("POST /password/reset/request", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/login")
	mux.HandleFunc("POST /login", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/logout")
	mux.HandleFunc("POST /logout", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/registration/verify")
	mux.HandleFunc("POST /registration/verify", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/registration/verify/new-token")
	mux.HandleFunc("POST /registration/verify/new-token", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.put("/delete/:id")
	mux.HandleFunc("PUT /delete/{id}/{$}", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/contact")
	mux.HandleFunc("POST /contact", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.post("/recaptcha/verify")
	mux.HandleFunc("POST /recaptcha/verify", func(w http.ResponseWriter, r *http.Request) {

	})
	// userRouter.put("/vendors/save")
	mux.HandleFunc("PUT /vendors/save", func(w http.ResponseWriter, r *http.Request) {

	})

	return mux
}
