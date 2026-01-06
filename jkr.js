// jkr.js — Handles .jkr file decompression and raw Lua inspection

// decompress raw .jkr files
function decompress(buffer) {
    // Use fflate to decompress raw DEFLATE data
    return new TextDecoder().decode(fflate.inflateSync(buffer, { raw: true }));
}

// Async function to read a .jkr file from a file input
async function parseJkrFile(file) {
    const buffer = new Uint8Array(await file.arrayBuffer());
    const text = decompress(buffer);

    console.log("========== RAW LUA FROM SAVE FILE ==========");
    console.log(text);
    console.log("============================================");

    // raw Lua text
    return text;
}

// Expose globally for app.js / jokerfilter.js
window.jkr = { decompress };
window.parseJkrFile = parseJkrFile;

