package router

import (
	"net/http"

	"handl-server/handlers"

	"github.com/go-chi/chi/v5"
)

// TODO: (HIGH) Implement User routes
func UserRouter() chi.Router {
	r := chi.NewRouter()
	userHandler := &handlers.UserHandler{}

	r.Post("/register", userHandler.CreateUser)

	r.Get("/me", userHandler.GetUserByUserId)

	r.Get("/me/vendors", userHandler.GetSavedVendors)

	r.Put("/{id}/password", userHandler.ResetUserPassword)

	r.Post("/password/reset/verify", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/password/reset/request", userHandler.RequestUserPasswordReset)

	r.Post("/login", userHandler.Login)

	r.Post("/logout", userHandler.Logout)

	r.Post("/registration/verify", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Post("/registration/verify/new-token", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Put("/delete/{id}", userHandler.DeleteUser)

	r.Post("/contact", userHandler.SendSupportMessage)

	r.Post("/recaptcha/verify", func(w http.ResponseWriter, r *http.Request) {

	})

	r.Put("/vendors/save", userHandler.SaveVendors)

	return r
}
