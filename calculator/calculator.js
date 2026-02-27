const fs = require('fs');
const readline = require('readline');

// Function to preprocess and evaluate the mathematical expression
function evaluateExpression(expr) {
    // 1. Normalize dashes (handles en-dashes often pasted from word processors)
    let cleaned = expr.replace(/–/g, '-').trim();

    // 2. Replace alternative brackets { } and [ ] with standard parentheses ( )
    cleaned = cleaned.replace(/[{[]/g, '(').replace(/[}\]]/g, ')');

    // 3. Replace the exponent operator ^ with JavaScript's ** operator
    cleaned = cleaned.replace(/\^/g, '**');

    // 4. Handle implicit multiplication
    // e.g., ") (" becomes ") * ("
    cleaned = cleaned.replace(/\)\s*\(/g, ') * (');
    // e.g., "5 (" becomes "5 * ("
    cleaned = cleaned.replace(/(\d)\s*\(/g, '$1 * (');
    // e.g., ") 5" becomes ") * 5"
    cleaned = cleaned.replace(/\)\s*(\d)/g, ') * $1');

    try {
        // Evaluate the string safely as math
        // Using Function constructor is a clean way to evaluate pure math strings in JS
        const result = new Function(`return ${cleaned}`)();
        return result;
    } catch (error) {
        return "Invalid Expression";
    }
}

async function processFile(inputFile, outputFile) {
    try {
        // Create read and write streams
        const fileStream = fs.createReadStream(inputFile);
        const writeStream = fs.createWriteStream(outputFile);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        console.log(`Reading from ${inputFile}...`);

        for await (const line of rl) {
            if (line.trim() === '') {
                writeStream.write('\n');
                continue;
            }

            // Split the line at the equals sign
            const parts = line.split('=');
            const expr = parts[0].trim();

            if (expr) {
                const result = evaluateExpression(expr);
                // Write the original expression and the calculated result
                writeStream.write(`${expr} = ${result}\n`);
            } else {
                writeStream.write(`${line}\n`);
            }
        }

        console.log(`Processing complete! Results saved to ${outputFile}`);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

// Define your input and output file names here
const inputFileName = 'input.txt';
const outputFileName = 'output.txt';

// Run the application
processFile(inputFileName, outputFileName);