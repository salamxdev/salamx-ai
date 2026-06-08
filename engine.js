/**
 * =========================
 * SALAMX AI ENGINE vFINAL
 * =========================
 */

async function getAIResponse(query) {
    const q = query.toLowerCase().trim();

    // 1. KNOWLEDGE BASE (FAST PATH)
    const kb = searchKB(q);
    if (kb) return kb;

    // 2. WIKIPEDIA (PRIMARY WEB SOURCE)
    const wiki = await fetchWikipedia(q);
    if (wiki) return wiki;

    // 3. DUCKDUCKGO (FALLBACK SOURCE)
    const ddg = await fetchDuckDuckGo(q);
    if (ddg) return ddg;

    // 4. FINAL FALLBACK
    return fallback(q);
}
