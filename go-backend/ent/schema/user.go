package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("uuid").
			DefaultFunc(func() string {
				return uuid.New().String()
			}).
			Unique(),

		field.String("email").
			NotEmpty().
			Unique(),

		field.String("first_name").
			NotEmpty(),

		field.String("last_name").
			NotEmpty(),

		field.String("business_name").
			NotEmpty().
			Unique(),

		field.String("phone_number").
			NotEmpty(),

		field.String("address").
			NotEmpty(),

		field.String("city").
			NotEmpty(),

		field.String("state").
			NotEmpty(),

		field.String("zipcode").
			NotEmpty(),

		field.Strings("categories").
			Optional(),

		field.String("password").
			NotEmpty(),

		field.Strings("saved_vendors").
			Optional(),

		field.Bool("is_verified").
			Default(false),

		field.String("verification_token").
			Optional().
			Nillable(),

		field.Time("token_expiration").
			Optional().
			Nillable(),

		field.Time("created_at").
			Default(time.Now),

		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return nil
}

// Annotations of the User.
func (User) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "Users",
		},
	}
}
