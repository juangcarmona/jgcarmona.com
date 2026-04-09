// Keyword-based detection for Spanish vs English
const spanishKeywords = new Set([
	'la', 'el', 'que', 'y', 'en', 'de', 'a', 'por', 'con', 'no',
	'ser', 'estar', 'tener', 'hay', 'como', 'más', 'pero', 'su',
	'para', 'todo', 'si', 'sobre', 'tengo', 'tienes', 'tiene', 'tenemos'
]);

const englishKeywords = new Set([
	'the', 'and', 'is', 'in', 'that', 'it', 'for', 'on', 'with',
	'as', 'this', 'was', 'at', 'by', 'an', 'be', 'or', 'from',
	'but', 'not', 'are', 'have', 'has', 'had', 'will', 'can'
]);

export function detectLanguage(text: string): 'en' | 'es' {
	const words = text
		.toLowerCase()
		.replace(/[^\w\s]/g, '')
		.split(/\s+/)
		.filter((w) => w.length > 3);
	const spanishCount = words.filter((w) => spanishKeywords.has(w)).length;
	const englishCount = words.filter((w) => englishKeywords.has(w)).length;

	return spanishCount > englishCount ? 'es' : 'en';
}
