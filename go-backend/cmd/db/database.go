package db

import (
	"context"
	"fmt"
	"log"
	"sync"

	"handl-server/ent"

	_ "github.com/lib/pq"
)

var (
	client *ent.Client
	once   sync.Once
	err    error
)

func GetClient() *ent.Client {
	once.Do(func() {
		// postgres://postgres:~PostgresUserPassword0830%24@127.0.0.1:5432/handl_local_dev
		// host=127.0.0.1 port=5432 user=postgres dbname=handl_local_dev password=~PostgresUserPassword0830$
		client, err = ent.Open("postgres", getDSN())
		if err != nil {
			log.Fatalf("failed opening connection to postgres: %v", err)
		}
	})
	return client
}

func getDSN() string {
	// Ideally load from env vars
	return "host=127.0.0.1 port=5434 user=postgres dbname=handl_local_dev sslmode=disable password=~PostgresUserPassword0830$"
}

func TestConnection() (string, error) {
	client := GetClient()

	// Ent’s DB is accessible like this
	val, err := client.Debug().Vendor.Query().Limit(1).Exist(context.Background())
	if err != nil {
		return "Unable to connect to the database", err
	}

	fmt.Println("Connection has been established successfully. Values exist: ", val)
	return fmt.Sprintf("Connection has been established successfully. Values exist: %v", val), nil
}
