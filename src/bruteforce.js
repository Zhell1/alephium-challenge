import { blake2b } from 'blakejs'; // Import the blake2b function from blakejs


// went up to 4700000
// const startFrom = 0
const startFrom = 210880000
const endAt = 987654321

// Target hash to match
const targetHash = '0c1f9f51c90b70c1fb747c2860150d1187d248f508279cf3a24597039ab863d5';

// Function to compute the Blake2b hash of an 8-byte representation
function computeBlake2bHash(value) {
    const buffer = Buffer.alloc(8); // Create an 8-byte buffer
    // Write the value in little-endian format
    buffer.writeBigUInt64LE(BigInt(value));
    // console.log("buffer:", buffer);
    // Compute the hash and return it as a hex string
    const hash = blake2b(buffer, null, 32); // 32-byte output
    return Buffer.from(hash).toString('hex'); // Convert the hash to a hex string
}

// Brute force search
async function findVar() {
    // Adjust range for testing (reduce for practicality)
    for (let i = startFrom; i < endAt; i++) { // Change 100 to 2n ** 64n for full range
        const blakeHash = computeBlake2bHash(i);
        if (i % 10000 == 0) console.log("i", i)
        if (blakeHash.length !== targetHash.length) {
            throw new Error("Invalid lengths")
        }
        if (blakeHash === targetHash) {
            console.log(`Found var: ${i}`);
            break; // Exit loop on find
        }
    }
}

// Start the search
findVar();