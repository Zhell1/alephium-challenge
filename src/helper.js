import fs from 'fs'; // Import the fs module using ES module syntax



// Function to format the current timestamp
function formatTimestamp() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    return now.toLocaleString('en-US', options).replace(/\/|,| /g, '-').replace(/:/g, '.'); // Format: YYYY-MM-DD-HH.MM.SS
}


// Function to write the result to a file with a timestamped filename
export async function writeResultToFile(result, filename = null) {
    const timestamp = formatTimestamp();
    if (!filename) filename = `results_${timestamp}.txt`; // Create a timestamped filename
    const logMessage = `Brute-force search successful! U256 value: ${result}\n`;

    console.log(`Attempting to write to file: ${filename}`);
    console.log(`Log message: ${logMessage}`);

    await fs.writeFileSync(filename, logMessage, (err) => {
        if (err) {
            console.log('Error writing to file', err);
        } else {
            console.log(`Result saved to ${filename}`);
        }
    });
}
