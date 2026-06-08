const SalamXCache = new Map();

/**
 * MAIN AI ENGINE v2
 */
async function getAIResponse(query) {
    const q = query.toLowerCase().trim();

    // 0. CACHE CHECK (FAST LAYER ⚡)
    if (SalamXCache.has(q)) {
        return SalamXCache.get(q) + " (cached)";
    }

    // 1. LOCAL KNOWLEDGE BASE (HIGHEST PRIORITY)
    if (typeof knowledgeBase !== "undefined") {
        for (let item of knowledgeBase) {
            if (item.keywords.some(k => q.includes(k))) {
                const result = item.answer;
                SalamXCache.set(q, result);
                return result;
            }
        }
    }

    // 2. WIKIPEDIA API (PRIMARY LIVE SOURCE)
    const wikiResult = await fetchWikipedia(q);
    if (wikiResult) {
        SalamXCache.set(q, wikiResult);
        return wikiResult;
    }

    // 3. DUCKDUCKGO API (SECONDARY SOURCE)
    const ddgResult = await fetchDuckDuckGo(q);
    if (ddgResult) {
        SalamXCache.set(q, ddgResult);
        return ddgResult;
    }

    // 4. FINAL FALLBACK
    const fallback =
        "I couldn't find a reliable answer.\nTry asking about SalamX, AI, Cloud Computing, CCNA, or general knowledge.";

    SalamXCache.set(q, fallback);
    return fallback;
}
