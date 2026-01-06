// jokerfilter.js — extract joker orders with a win on [8] from raw Lua text
const JokerFilter = {

  extractJokerUsage(luaText) {
    const startKey = '["joker_usage"]={';
    const startIndex = luaText.indexOf(startKey);
    if (startIndex === -1) return null;

    let i = startIndex + startKey.length;
    let depth = 1;

    while (i < luaText.length && depth > 0) {
      if (luaText[i] === '{') depth++;
      else if (luaText[i] === '}') depth--;
      i++;
    }

    return luaText.slice(startIndex + startKey.length, i - 1);
  },

  splitJokers(jokerUsageText) {
    return jokerUsageText
      .split(/\["j_[^"]+"\]=\{/)
      .slice(1);
  },

  extractOrder(block) {
    const match = block.match(/\["order"\]=(\d+)/);
    return match ? Number(match[1]) : null;
  },

  hasGoldWin(block) {
    const winsMatch = block.match(/\["wins"\]=\{([^}]*)\}/);
    if (!winsMatch) return false;

    return /\[8\]\s*=\s*\d+/.test(winsMatch[1]);
  },

  getCompletedOrders(luaText) {
    const jokerUsage = this.extractJokerUsage(luaText);
    if (!jokerUsage) return [];

    const blocks = this.splitJokers(jokerUsage);
    const completed = [];

    for (const block of blocks) {
      const order = this.extractOrder(block);
      if (order !== null && this.hasGoldWin(block)) {
        completed.push(order);
      }
    }

    return completed;
  }
};

// Expose globally
window.JokerFilter = JokerFilter;
