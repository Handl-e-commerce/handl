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
	const PORT string = ":8080"
	fmt.Printf("Listening and serving on port %s\n", PORT)
	log.Print(http.ListenAndServe(PORT, nil))
}
