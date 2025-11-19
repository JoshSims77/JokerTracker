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

// Optional: convert simple Lua tables to JSON-like objects
function luaToJson(lua) {
    lua = lua.trim();

    // Remove leading "return "
    if (lua.startsWith("return ")) lua = lua.slice(7);

    // Replace Lua syntax with JSON-like syntax
    lua = lua.replace(/=/g, ":");

    // Convert ["key"] → "key"
    lua = lua.replace(/\["([^"]+)"\]/g, '"$1"');

    // Convert [123] → "123"
    lua = lua.replace(/\[(\d+)\]/g, '"$1"');

    // Lowercase booleans → JS booleans
    lua = lua.replace(/\btrue\b/g, "true");
    lua = lua.replace(/\bfalse\b/g, "false");

    try {
        return JSON.parse(lua);
    } catch (e) {
        console.warn("luaToJson parse failed, returning raw Lua");
        return lua;
    }
}

// Expose globally for app.js / jokerfilter.js
window.jkr = { decompress };
window.parseJkrFile = parseJkrFile;
window.luaToJson = luaToJson; // parse Lua tables later for later mayhaps
