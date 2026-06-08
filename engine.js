const cache = new Map();

/**
 * MAIN ENGINE v4.1 (STABLE)
 */
async function getAIResponse(query) {
    const q = query.toLowerCase().trim();

    // CACHE
    if (cache.has(q)) return cache.get(q) + " (cached)";

    // 1. LOCAL KB (STRICT MATCH IMPROVED)
    const local = getBestLocalMatch(q);
    if (local) {
        cache.set(q, local);
        return local;
    }

    // 2. WIKIPEDIA (SAFE TRY)
    const wiki = await fetchWikipedia(q);
    if (wiki?.text) {
        cache.set(q, wiki.text);
        return wiki.text;
    }

    // 3. DUCKDUCKGO (FALLBACK)
    const ddg = await fetchDuckDuckGo(q);
    if (ddg?.text) {
        cache.set(q, ddg.text);
        return ddg.text;
    }

    // 4. FINAL FALLBACK
    const fallback =
        "I couldn't find reliable information for this query. Try asking about SalamX, AI, Cloud Computing, or general knowledge.";

    cache.set(q, fallback);
    return fallback;
}    return fallback;
}
