package handlers

import (
	"fmt"
	"handl-server/services"
	"net/http"
)

// TODO: (HIGH) Implement UserHandler
type UserHandler struct {
	userService *services.UserService
}

func (userHandler *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {

}

func (userHandler *UserHandler) GetUserByUserId(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Your router is working")
}

func (userHandler *UserHandler) GetSavedVendors(w http.ResponseWriter, r *http.Request) {

}

func (userHandler *UserHandler) ResetUserPassword(w http.ResponseWriter, r *http.Request) {

}

func (userHandler *UserHandler) RequestUserPasswordReset(w http.ResponseWriter, r *http.Request) {

}
func (userHandler *UserHandler) DeleteUser(w http.ResponseWriter, r *http.Request) {

}

func (UserHandler *UserHandler) Login(w http.ResponseWriter, r *http.Request) {

}

func (userHandler *UserHandler) Logout(w http.ResponseWriter, r *http.Request) {

}

func (userHandler *UserHandler) SaveVendors(w http.ResponseWriter, r *http.Request) {

}

func (userHandler *UserHandler) SendSupportMessage(w http.ResponseWriter, r *http.Request) {

}
