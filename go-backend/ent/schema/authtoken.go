package schema

import (
    "entgo.io/ent"
    // "entgo.io/ent/schema/edge"
    // "entgo.io/ent/schema/field"
    // "time"
)
// AuthToken holds the schema definition for the AuthToken entity.
type AuthToken struct {
	ent.Schema
}

// Fields of the AuthToken.
func (AuthToken) Fields() []ent.Field {
	return nil
	// return []ent.Field{
    //     field.Int("id").
    //         Positive().
    //         Unique().
    //         Immutable(),

    //     field.String("selector").
    //         NotEmpty(),

    //     field.String("validator").
    //         NotEmpty(),

    //     field.Time("expires").
    //         NotEmpty(),

    //     field.Time("created_at").
    //         Default(time.Now),

    //     field.Time("updated_at").
    //         Default(time.Now).
    //         UpdateDefault(time.Now),
    // }
}

// Edges of the AuthToken.
func (AuthToken) Edges() []ent.Edge {
	return nil
	// return []ent.Edge{
    //     edge.From("user", User.Type).
    //         Ref("auth_token").
    //         Unique().
    //         Required().
    //         Field("user_uuid"),
    // }
}
