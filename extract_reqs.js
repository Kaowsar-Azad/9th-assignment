const fs = require('fs');
const readline = require('readline');

const logPath = "C:\\Users\\user\\.gemini\\antigravity\\brain\\ddd9ece8-b29c-4fff-ac01-31e7529e316b\\.system_generated\\logs\\transcript.jsonl";

const rl = readline.createInterface({
    input: fs.createReadStream(logPath),
    crlfDelay: Infinity
});

let found = [];

rl.on('line', (line) => {
    try {
        const data = JSON.parse(line);
        if (data.source === "USER_EXPLICIT" && data.content && data.content.includes("Ensure the Following Things to Get 100% Mark")) {
            found.push(data.content);
        }
    } catch (e) {
        // ignore
    }
});

rl.on('close', () => {
    if (found.length > 0) {
        // Write the last found requirement which is usually the most complete one
        fs.writeFileSync("full_reqs.txt", found[found.length - 1]);
        console.log("Wrote full requirements to full_reqs.txt");
    } else {
        console.log("No requirements text found");
    }
});
