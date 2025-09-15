export function summarizeErrors(errors: string[]) {
    if (errors.length === 0) return "No errors found.";

    const counts: Record<string, number> = {};
    errors.forEach(err => {
        const key = err.split(":")[0]; // simple grouping
        counts[key] = (counts[key] || 0) + 1;
    });

    const summary = Object.entries(counts)
        .map(([msg, count]) => `${msg.trim()} → ${count} times`)
        .join("; ");

    if (errors.length > 50) {
        return `High error volume detected. Key issues: ${summary}`;
    }
    return `Error Summary: ${summary}`;
}
