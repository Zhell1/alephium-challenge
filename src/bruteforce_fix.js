import { blake2b } from 'blakejs';
import { writeResultToFile } from './helper.js'; // Adjust the path as necessary



// Set the range for testing
// const startFrom = 200130000; // Starting value for brute force
const startFrom = 49891400000 ///49378216050; // test
const endAt = 98765423100; // Ending value for brute force (adjust as needed)

/*
tested:
    from 49378216050 to 49891400000
    from 74074067325 to 74515000000
*/


const targetHash = '0c1f9f51c90b70c1fb747c2860150d1187d248f508279cf3a24597039ab863d5'; // Target hash

const buffer = Buffer.alloc(8); // Create an 8-byte buffer

// 2. U256To8Byte: Convert U256 to an 8-byte buffer (big-endian)
function u256To8Byte(u256) {
    const last8Bytes = BigInt(u256) >> 192n; // Shift to get the top 8 bytes
    buffer.writeBigUInt64BE(last8Bytes); // Write in big-endian format
    return buffer;
}

// 3. Blake2b: Compute the Blake2b-256 hash
function computeBlake2bHash(data) {
    // Compute the Blake2b hash of the input data (32 bytes)
    const hash = blake2b(data, null, 32); // 32-byte output
    return Buffer.from(hash).toString('hex'); // Convert to hex string for comparison
}

// 5. ByteVecEq: Compare the resulting hash to the target
function compareHashes(resultHash, targetHash) {
    return resultHash === targetHash;
}

// Brute-force search over a range of U256 values
async function bruteForceSearch(startFrom, endAt, targetHash) {
    for (let u256 = startFrom; u256 <= endAt; u256++) {
        // console.log(u256)
        // Convert U256 to 8 bytes
        const byteVec = u256To8Byte(u256);

        // Compute Blake2b-256 hash
        const blakeHash = computeBlake2bHash(byteVec);

        // Compare hashes
        if (compareHashes(blakeHash, targetHash)) {
            console.log(`Found matching U256 value: ${u256}`);
            await writeResultToFile(u256);
            return u256; // Return the matching U256 value
        }
        // Optional: Add progress logging every 100,000 iterations
        if (u256 % 100000 === 0) {
            console.log(`Checked up to U256 value: ${u256}`);
        }
        if (u256 % 1000000 === 0) {
            await writeResultToFile("checked " + u256, "checkedFrom" + startFrom + ".txt")
        }
    }

    console.log("No matching U256 value found in the specified range.");
    return null;
}

// Execute the brute-force search
bruteForceSearch(startFrom, endAt, targetHash).then((result) => {
    if (result !== null) {
        console.log(`Brute-force search successful! U256 value: ${result}`);
    } else {
        console.log("Brute-force search completed without a match.");
    }
});