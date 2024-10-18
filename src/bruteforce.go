package main

import (
    "encoding/hex"
    "fmt"
    "golang.org/x/crypto/blake2b"
    "math/big"
	"time"
)

// Declare startFrom and endAt as big.Int
var (
    startFrom  = big.NewInt(53620999995) ///49378216050; 
    endAt      = big.NewInt(98765423100) 
    targetHash = "0c1f9f51c90b70c1fb747c2860150d1187d248f508279cf3a24597039ab863d5"
)


// Function to compute Blake2b-256 hash
func computeBlake2bHash(data []byte) string {
    hash, _ := blake2b.New256(nil) // Ignore error for simplicity
    hash.Write(data)
    return hex.EncodeToString(hash.Sum(nil))
}

// Function to convert a big integer to an 8-byte array
func u256To8Byte(u256 *big.Int) []byte {
    buf := u256.Bytes() // Get the byte representation of the big integer (big-endian)
    paddedBuf := make([]byte, 8) // Create an 8-byte buffer
    copy(paddedBuf[8-len(buf):], buf) // Copy the bytes into the last part of the buffer
    return paddedBuf // The buffer is now in big-endian format
}

// Format duration in a more readable way
func formatDuration(d time.Duration) string {
    if d <= 0 {
        return "Finished"
    }
    hours := int(d.Hours())
    minutes := int(d.Minutes()) % 60
    // seconds := int(d.Seconds()) % 60
	return fmt.Sprintf("%02dh %02dm", hours, minutes) // Use %02 for leading zeros
}

// Function to print progress
func printProgress(currentValue *big.Int, totalRange *big.Int, blakeHash string, startTime time.Time, iterations uint64) {
	maxVal := new(big.Int).Add(totalRange, startFrom)
    perc := new(big.Float)
    // fmt.Printf("currentValue %s  |  maxVal %s \n", currentValue, maxVal)
	perc.Quo(new(big.Float).SetInt(currentValue), new(big.Float).SetInt(maxVal))   // divide 
    perc.Mul(perc, big.NewFloat(100)) /// *100
	perc.Sub(perc, big.NewFloat(50)) // -50
	perc.Mul(perc, big.NewFloat(2)) // *2
	
    elapsedTime := time.Since(startTime)
    avgTimePerIteration := elapsedTime.Seconds() / float64(iterations)
    remainingIterations := new(big.Int).Sub(maxVal, currentValue)
    estimatedTimeRemaining := time.Duration(avgTimePerIteration * float64(remainingIterations.Int64())) * time.Second

    fmt.Printf("Checked up to %s  |  %.2f% %  |  left %s |  %s\n",
        currentValue.String(), perc, formatDuration(estimatedTimeRemaining), blakeHash)
        // currentValue.String(), perc, formatDuration(estimatedTimeRemaining), remainingIterations, avgTimePerIteration)

}

func bruteForceSearch() {
    offset := big.NewInt(0)           // Initialize offset
    totalRange := new(big.Int).Sub(endAt, startFrom) // Calculate total range
    totalRange.Add(totalRange, big.NewInt(1)) // Include the end value

    startTime := time.Now() // Record start time
    iterations := uint64(0) // Count iterations

    for offset.Cmp(totalRange) < 0 {   // Loop until offset reaches total range
        // Create the current value to hash by adding offset to startFrom
        currentValue := new(big.Int).Set(startFrom)
        currentValue.Add(currentValue, offset) // Add offset to startFrom

        // Convert current value to 8 bytes and compute hash
        byteVec := u256To8Byte(currentValue)
        blakeHash := computeBlake2bHash(byteVec)

        // Check if the hash matches the target
        if blakeHash == targetHash {
            fmt.Printf("Found matching U256 value: %s\n", currentValue.String())
            return
        }

		// Log progress every 1 million iterations
        iterations++
        if iterations%1000000 == 0 { 
            printProgress(currentValue, totalRange, blakeHash, startTime, iterations) 
        }

        // Increment offset
        offset.Add(offset, big.NewInt(1)) // This increments the offset
    }
    fmt.Println("No matching U256 value found in the specified range.")
}

func main() {
    bruteForceSearch()
}
