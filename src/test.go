package main

import (
	"fmt"
	"math/big"
)

func main() {
	startFrom := big.NewInt(1)      // Example start value
	endAt := big.NewInt(52406999999) // Example end value

	offset := big.NewInt(0) // Initialize offset
	totalRange := new(big.Int).Sub(endAt, startFrom) // Calculate total range
	totalRange.Add(totalRange, big.NewInt(1)) // Include the end value

	for offset.Cmp(totalRange) < 0 { // Loop until offset reaches total range
		// Your loop logic here
		// For example, log every million iterations
		// Check if offset is a multiple of X
		modResult := new(big.Int).Mod(new(big.Int).Set(offset), big.NewInt(1000))
		if modResult.Cmp(big.NewInt(0)) == 0 { 
			fmt.Printf("Current offset: %s\n", offset.String())
		}
		offset.Add(offset, big.NewInt(1)) // Increment offset
	}
}