package main

import (
	"fmt"
	"handl-server/router"
	"log"
	"net/http"
)

func landingPageHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World, welcome to Handl's Go Backend Service!")
}

func main() {
	r := router.SetUpRoutes()
	http.HandleFunc("/", landingPageHandler)
	const PORT string = ":8080"

	fmt.Printf("Listening and serving on port %s\n", PORT)
	log.Fatal(http.ListenAndServe(PORT, r))
}
