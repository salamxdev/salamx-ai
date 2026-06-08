const cache = new Map();

/**
 * =========================
 * SALAMX ENGINE v2 PRO AI
 * =========================
 */

async function getAIResponse(query) {
    const q = query.toLowerCase().trim();

    // CACHE
    if (cache.has(q)) return cache.get(q);

    // 1. LOCAL KB (HIGHEST PRIORITY)
    const kb = getLocalAnswer(q);
    if (kb) {
        cache.set(q, kb);
        return kb;
    }

    // 2. PARALLEL FETCH (Wikipedia + DDG)
    const result = await Promise.race([
        getWikipedia(q),
        getDuckDuckGo(q),
        timeoutFallback()
    ]);

    const finalAnswer = formatResponse(q, result);

    cache.set(q, finalAnswer);
    return finalAnswer;
}    cache.set(q, fallback);
    return fallback;
}    return fallback;
}
