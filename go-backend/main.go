package main

import (
	"fmt"
	"handl-server/router"
	"log"
	"net/http"
)

func main() {
	r := router.SetUpRoutes()

	const PORT string = ":8080"

	fmt.Printf("Listening and serving on port %s\n", PORT)
	log.Fatal(http.ListenAndServe(PORT, r))
}
