import { blake2b } from 'blakejs'; // Import the blake2b function from blakejs



// tested up to 4 letters (included)


// Function to compute the Blake2b hash
function computeBlake2bHash(value) {
    const buffer = Buffer.from(value, 'utf-8'); // Create a buffer from the string
    const hash = blake2b(buffer, null, 32); // 32-byte output
    return Buffer.from(hash).toString('hex'); // Convert the hash to a hex string
}

// Recursive generator function to yield combinations of letters for a specific length
function* generateCombinationsRecursive(characters, length, current = '') {
    if (current.length === length) {
        yield current; // Yield the current combination when it reaches the desired length
        return;
    }

    for (const char of characters) {
        yield* generateCombinationsRecursive(characters, length, current + char); // Recursively yield combinations
    }
}

// Generator function to yield combinations of letters for a specific length
function* generateCombinations(characters, length) {
    for (const combination of generateCombinationsRecursive(characters, length)) {
        yield combination; // Yield each combination generated
    }
}


// Function to brute-force the target hash with increasing lengths
const bruteForce = (targetHash, letters, minLength, maxLength) => {
    for (let length = minLength; length <= maxLength; length++) { // Loop over lengths
        const combinations = generateCombinations(letters, length)
        let nb_done = 0
        let nb_total = Math.pow(letters.length, length)
        console.log("nb_total:", nb_total, "for length:", length)
        let last_percent_done = 0
        for (const combination of combinations) {
            nb_done++
            let percent_done = Number((nb_done / nb_total * 100).toFixed(1))
            if (percent_done > last_percent_done) {
                last_percent_done = percent_done
                console.log("%", percent_done, " for length", length, " testing:", combination)
            }
            const hashString = computeBlake2bHash(combination);
            if (hashString === targetHash) {
                console.log(`Found matching value: ${combination}`);
                return combination; // Return the matching value
            }
        }
    }
    console.log('No matching value found for maxLength=', maxLength);
    return null; // No match found
};

// Set your target hash and parameters
const targetHashString = '0c1f9f51c90b70c1fb747c2860150d1187d248f508279cf3a24597039ab863d5'; // Replace with your target hash
const letters = [
    ...[...Array(26)].map((_, i) => String.fromCharCode(i + 97)), // a-z
    ...[...Array(26)].map((_, i) => String.fromCharCode(i + 65)), // A-Z
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', // Digits
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '=', '+', '{', '}', '[', ']', ':', ';',
    '"', "'", '<', '>', ',', '.', '?', '/', '`', '~'
];
const minLength = 1; // Set your minimum length
const maxLength = 5; // Set your maximum length

// Run the brute-force search
bruteForce(targetHashString, letters, minLength, maxLength);
