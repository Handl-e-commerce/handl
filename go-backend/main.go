package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello World, welcome to Handl's Go Backend Service!")
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
