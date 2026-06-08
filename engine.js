const cache = new Map();

/**
 * MAIN ENGINE v3 (ALL-IN-ONE)
 */
async function getAIResponse(query) {
    const q = query.toLowerCase().trim();

    // 1. CACHE (FASTEST LAYER)
    if (cache.has(q)) {
        return cache.get(q) + " (cached)";
    }

    // 2. LOCAL KNOWLEDGE BASE (OFFLINE INTELLIGENCE)
    const local = getLocalAnswer(q);
    if (local) {
        cache.set(q, local);
        return local;
    }

    // 3. RUN APIs IN PARALLEL (WIKIPEDIA + DUCKDUCKGO)
    const result = await Promise.race([
        fetchWikipedia(q),
        fetchDuckDuckGo(q),
        timeout(4000)
    ]);

    // 4. VALID RESPONSE CHECK
    if (result && result.text) {
        const finalText = result.text + `\n\nConfidence: ${result.confidence}%`;
        cache.set(q, finalText);
        return finalText;
    }

    // 5. FALLBACK RESPONSE
    const fallback =
        "Sorry, I couldn't find a reliable answer. Try SalamX, AI, Cloud Computing, CCNA, or general knowledge.";

    cache.set(q, fallback);
    return fallback;
}    }

    // 4. FINAL FALLBACK
    const fallback =
        "I couldn't find a reliable answer.\nTry asking about SalamX, AI, Cloud Computing, CCNA, or general knowledge.";

    SalamXCache.set(q, fallback);
    return fallback;
}
