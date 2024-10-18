import { blake2b } from 'blakejs';



// Set the range for testing
const startFrom = 193160000; // Starting value for brute force
const endAt = 9876543210; // Ending value for brute force (adjust as needed)


const targetHash = '0c1f9f51c90b70c1fb747c2860150d1187d248f508279cf3a24597039ab863d5'; // Target hash


// Function to compute the Blake2b hash of an U256 represented by its last 8 bytes
function computeBlake2bHash(value) {

    const buffer = Buffer.alloc(8); // Create an 8-byte buffer
    const last8Bytes = BigInt(value) & BigInt('0xFFFFFFFFFFFFFFFF'); // Mask to get the last 8 bytes
    buffer.writeBigUInt64BE(last8Bytes); // Write the last 8 bytes in big-endian format


    const hash = blake2b(buffer, null, 32); // Compute the hash and return 32-byte output
    return Buffer.from(hash).toString('hex'); // Convert to hex string for readability
}


// Brute force search function
async function findVar(startFrom, endAt) {
    for (let i = startFrom; i < endAt; i++) { // Loop over a specified range
        const blakeHash = computeBlake2bHash(i);
        if (i % 10000 === 0) console.log("Checking:", i)
        if (blakeHash.length !== targetHash.length) {
            throw new Error("Invalid lengths")
        }
        if (blakeHash === targetHash) {
            console.log(`Found var: ${i}`);
            break; // Exit loop on find
        }
    }
}

// Run the brute-force search
findVar(startFrom, endAt);
