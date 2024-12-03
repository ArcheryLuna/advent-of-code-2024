import fs from "fs";

function parseFile({ filename } : {filename: string}) {
    const file = fs.readFileSync(filename).toString('utf-8');

    return file;
}

function partOne(input: string): number {
    let regex = /mul\((\d+),(\d+)\)/g;
    let matches;
    let sum = 0;
    
    while ((matches = regex.exec(input)) !== null) {
        let num1 = parseInt(matches[1], 10);
        let num2 = parseInt(matches[2], 10);

        sum += num1 * num2;
    }

    return sum;
}

function partTwo(input: string): number {
    let sum = 0;
    let isMulEnabled = true; 

    const instructionRegex = /(do\(\)|don't\(\)|mul\((\d+),(\d+)\))/g;
    let match;

    while ((match = instructionRegex.exec(input)) !== null) {
        const fullMatch = match[0];

        if (fullMatch === 'do()') {
            isMulEnabled = true;
        } else if (fullMatch === "don't()") {
            isMulEnabled = false;
        }

        else if (fullMatch.startsWith('mul(') && isMulEnabled) {
            const num1 = parseInt(match[2], 10);
            const num2 = parseInt(match[3], 10); 
            sum += num1 * num2; 
        }
    }

    return sum;
}


function main() {
    const input = parseFile({ filename: './input.txt' });

    const partOneResult = partOne(input);
    const partTwoResult = partTwo(input);

    console.log(`Part One: ${partOneResult}`);
    console.log(`Part Two: ${partTwoResult}`);
}

main();
