package schema

import (
    "entgo.io/ent"
    "entgo.io/ent/schema/field"
    "time"
)
// Category holds the schema definition for the Category entity.
type Category struct {
	ent.Schema
}

// Fields of the Category.
func (Category) Fields() []ent.Field {
	return []ent.Field{
        field.Int("id").
            Unique().
            Positive().
            Immutable(),

        field.String("category").
            Optional().
            Nillable(),

        field.String("subcategory").
            Optional().
            Nillable(),

        field.Time("created_at").
            Default(time.Now),

        field.Time("updated_at").
            Default(time.Now).
            UpdateDefault(time.Now),
    }
}

// Edges of the Category.
func (Category) Edges() []ent.Edge {
	return nil
}
