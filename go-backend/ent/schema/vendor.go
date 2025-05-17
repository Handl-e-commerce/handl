package schema

import (
    "entgo.io/ent"
    "entgo.io/ent/schema/field"
    "github.com/google/uuid"
    "time"
)

// Vendor holds the schema definition for the Vendor entity.
type Vendor struct {
	ent.Schema
}

// Fields of the Vendor.
func (Vendor) Fields() []ent.Field {
	return []ent.Field{
        field.String("uuid").
            DefaultFunc(func() string {
                return uuid.New().String()
            }).
            Unique(),

        field.String("name").
            NotEmpty().
            Unique(),

        field.String("description").
            Optional().
            Nillable().
            MaxLen(5000),

        field.String("website").
            Optional().
            Nillable(),

        field.String("keywords").
            Optional().
            Nillable(),

        field.String("categories").
            Optional().
            Nillable(),

        field.String("subcategories").
            Optional().
            Nillable(),

        field.Strings("people").
            Optional(),

        field.String("address").
            Optional().
            Nillable(),

        field.String("city").
            Optional().
            Nillable(),

        field.String("state").
            Optional().
            Nillable(),

        field.String("zipcode").
            Optional().
            Nillable(),

        field.String("phone_number").
            Optional().
            Nillable(),

        field.String("email").
            Optional().
            Nillable(),

        field.Time("created_at").
            Default(time.Now),

        field.Time("updated_at").
            Default(time.Now).
            UpdateDefault(time.Now),
    }
}

// Edges of the Vendor.
func (Vendor) Edges() []ent.Edge {
	return nil
}
