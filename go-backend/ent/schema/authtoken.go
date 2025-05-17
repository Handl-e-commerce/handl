package schema

import "entgo.io/ent"

// AuthToken holds the schema definition for the AuthToken entity.
type AuthToken struct {
	ent.Schema
}

// Fields of the AuthToken.
func (AuthToken) Fields() []ent.Field {
	return nil
}

// Edges of the AuthToken.
func (AuthToken) Edges() []ent.Edge {
	return nil
}
