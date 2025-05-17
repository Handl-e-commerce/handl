package schema

import "entgo.io/ent"

// Vendor holds the schema definition for the Vendor entity.
type Vendor struct {
	ent.Schema
}

// Fields of the Vendor.
func (Vendor) Fields() []ent.Field {
	return nil
}

// Edges of the Vendor.
func (Vendor) Edges() []ent.Edge {
	return nil
}
