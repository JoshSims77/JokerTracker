// jokerfilter.js

/**
 * Extract joker usage from decompressed Lua text.
 * Returns an object mapping order → true (only completed on gold)
 * @param {string} luaText - raw Lua string from .jkr file
 */
function extractJokerUsage(luaText) {
    // Regex matches each joker entry:
    // ["joker_name"]={["order"]=NUM,...["wins"]={...},...}
    const regex = /\["([^"]+)"\]\s*=\s*{[^}]*?\["order"\]\s*=\s*(\d+),.*?\["wins"\]\s*=\s*{([^}]*)\}/gs;
    const result = {};
    let match;

    while ((match = regex.exec(luaText)) !== null) {
        const order = parseInt(match[2], 10);
        const wins = match[3];

        // Only include if gold stake ([8]) exists in wins
        if (/\[8\]\s*=/.test(wins)) {
            result[order] = true;
        }
    }

    return result;
}

/**
 * Get joker order table from raw file bytes.
 * Only includes jokers completed on gold.
 * @param {Uint8Array} luaFileData - raw .jkr file bytes
 * @param {function} decompressor - function to decompress the file (from jkr.js)
 */
function getJokerOrderTable(luaFileData, decompressor) {
    const decompressed = decompressor(luaFileData); // returns Lua text
    return extractJokerUsage(decompressed);
}

// Expose globally
window.JokerFilter = {
    getJokerOrderTable,
    extractJokerUsage
};
