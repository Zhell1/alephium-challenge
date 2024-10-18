import wordList from 'word-list';
import { blake2b } from 'blakejs';
import fs from 'fs'; // Import the fs module to read files
import path from 'path'; // Import path module to resolve file paths
import { allWords as cryptoWords } from './cryptowords.js'; // Adjust the path as necessary



const wordsFilePath = path.resolve(wordList); // Get the full path to the words file
console.log("wordsFilePath:", wordsFilePath)

// Read the words from the file and convert them to an array
let words = fs.readFileSync(wordsFilePath, 'utf-8').split('\n').map(word => word.trim()).filter(Boolean);
words = [...words, ...cryptoWords]

// Function to compute the Blake2b hash
function computeBlake2bHash(value) {
    const buffer = Buffer.from(value, 'utf-8');
    const hash = blake2b(buffer, null, 32);
    return Buffer.from(hash).toString('hex');
}

// Set your target hash
const targetHashString = '0c1f9f51c90b70c1fb747c2860150d1187d248f508279cf3a24597039ab863d5'; // Replace with your target hash

// Function to perform the dictionary search
const dictionarySearch = (targetHash) => {
    let nb_done = 0
    let last_percent_done = 0
    let nb_total = words.length
    console.log("nb_total:", nb_total)

    for (const word of words) {
        nb_done++
        let percent_done = Number((nb_done / nb_total * 100).toFixed(1))
        if (percent_done > last_percent_done) {
            last_percent_done = percent_done
            console.log("%", percent_done, " curr word:", word)
        }
        const hashString = computeBlake2bHash(word);
        if (hashString === targetHash) {
            console.log(`Found matching value: ${word}`);
            return word;
        }
    }
    console.log('No matching value found in the dictionary.');
    return null;
};

// Run the dictionary search
dictionarySearch(targetHashString);
