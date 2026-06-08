const cache = new Map();

/**
 * MAIN AI ENGINE
 */
async function getAIResponse(query) {
    const q = query.toLowerCase().trim();

    // CACHE
    if (cache.has(q)) return cache.get(q) + " (cached)";

    // 1. LOCAL KB
    const local = getLocalAnswer(q);
    if (local) {
        cache.set(q, local);
        return local;
    }

    // 2. RUN APIs (IMPORTANT FIX: sequential fallback)
    let wiki = await fetchWikipedia(q);
    if (wiki) {
        cache.set(q, wiki.text);
        return wiki.text;
    }

    let ddg = await fetchDuckDuckGo(q);
    if (ddg) {
        cache.set(q, ddg.text);
        return ddg.text;
    }

    // 3. FALLBACK
    const fallback =
        "Sorry, I couldn't find a reliable answer right now. Try SalamX, AI, Cloud, or general knowledge.";

    cache.set(q, fallback);
    return fallback;
}
