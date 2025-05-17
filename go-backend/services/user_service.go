package services

type UserService interface {
	CreateUser() error
	GetUserByUserId(userId string) error
	GetSavedVendors(userId string) error
	ResetUserPassword(userId string, newPassword string) error
	RequestUserPasswordReset() error
	DeleteUser(userId string) error
	Login() error
	Logout() error
	SaveVendors() error
	SendSupportMessage() error
}

type userService struct{}

func (u *userService) CreateUser() error {
	return nil
}

func (u *userService) GetUserByUserId(userId string) error {
	return nil
}

// TODO: (MEDIUM) Potentially move this to vendor service
func (u *userService) GetSavedVendors(userId string) error {
	return nil
}

func (u *userService) ResetUserPassword(userId string, newPassword string) error {
	return nil
}

func (u *userService) RequestUserPasswordReset() error {
	return nil
}
func (u *userService) DeleteUser(userId string) error {
	return nil
}

func (u *userService) Login() error {
	return nil
}

func (u *userService) Logout() error {
	return nil
}

func (u *userService) SaveVendors() error {
	return nil
}

func (u *userService) SendSupportMessage() error {
	return nil
}

func NewUserService() UserService {
	return &userService{}
}
