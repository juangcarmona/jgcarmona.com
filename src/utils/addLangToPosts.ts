// Keyword-based detection for Spanish vs English
const spanishKeywords = new Set([
	'la', 'el', 'que', 'y', 'en', 'de', 'a', 'por', 'con', 'no',
	'ser', 'estar', 'tener', 'hay', 'como', 'más', 'pero', 'su',
	'para', 'todo', 'si', 'sobre', 'tengo', 'tienes', 'tiene', 'tenemos',
	'desarrollo', 'software', 'código', 'aplicación', 'servidor', 'cliente',
	'internacionalización', 'i18n', 'angular', 'api', 'base de datos',
	'arquitectura', 'base de datos', 'desplegar', 'despliegue', 'configurar',
	'gestionar', 'configuración', 'problema', 'solución', 'respuesta',
	'funcionando', 'funciona', 'funcionar', 'función', 'funciones',
	'entorno', 'entornos', 'usuario', 'usuarios', 'base de datos',
	'servidor', 'servidores', 'cliente', 'clientes', 'aplicación',
	'aplicaciones', 'desarrollo', 'desarrollos', 'código', 'códigos',
	'internacionalización', 'i18n', 'internacionalización', 'internacionalizaciones',
	'internacionalización', 'internacionalizaciones', 'angular', 'angulares',
	'api', 'apis', 'base de datos', 'bases de datos',
	'arquitectura', 'arquitecturas', 'desplegar', 'desplegando', 'desplegado',
	'despliegue', 'despliegues', 'configurar', 'configurando', 'configurado',
	'configuración', 'configuraciones', 'gestionar', 'gestionando', 'gestionado',
	'gestión', 'gestiones', 'problema', 'problemas', 'solución', 'soluciones',
	'respuesta', 'respuestas', 'funcionando', 'funcionan', 'funcionar',
	'función', 'funciones',
	// Additional Spanish tech terms
	'inteligencia artificial', 'ia', 'machine learning', 'deep learning', 'nlp', 'computer vision',
	'docker', 'kubernetes', 'azure', 'aws', 'gcp', 'firebase', 'mongodb', 'postgresql', 'mysql',
	'react', 'angular', 'vue', 'node', 'javascript', 'typescript', 'python', 'java', 'csharp',
	'swagger', 'postman', 'elasticsearch', 'kafka', 'redis', 'rabbitmq', 'graphql', 'rest',
	'cicd', 'ci/cd', 'devops', 'agile', 'scrum', 'kanban', 'jira', 'git', 'github', 'gitlab',
	'solid', 'grasp', 'ddd', 'cqrs', 'cqrs', 'clean architecture', 'hexagonal architecture'
]);

const englishKeywords = new Set([
	'the', 'and', 'is', 'in', 'that', 'it', 'for', 'on', 'with',
	'as', 'this', 'was', 'at', 'by', 'an', 'be', 'or', 'from',
	'but', 'not', 'are', 'have', 'has', 'had', 'will', 'can',
	'development', 'software', 'code', 'application', 'server', 'client',
	'internationalization', 'i18n', 'angular', 'api', 'database',
	'architecture', 'database', 'deploy', 'deployment', 'configure',
	'manage', 'configuration', 'problem', 'solution', 'response',
	'working', 'work', 'works', 'function', 'functions',
	'environment', 'environments', 'user', 'users', 'database',
	'server', 'servers', 'client', 'clients', 'application',
	'applications', 'development', 'developments', 'code', 'codes',
	'internationalization', 'i18n', 'internationalization', 'internationalizations',
	'internationalization', 'internationalizations', 'angular', 'angul',
	'api', 'apis', 'database', 'databases',
	'architecture', 'architectures', 'deploy', 'deploying', 'deployed',
	'deployment', 'deployments', 'configure', 'configuring', 'configured',
	'configuration', 'configurations', 'manage', 'managing', 'managed',
	'management', 'managements', 'problem', 'problems', 'solution', 'solutions',
	'response', 'responses', 'working', 'works', 'work',
	'function', 'functions', 'environment', 'environments', 'user', 'users',
	'server', 'servers', 'client', 'clients', 'application',
	'applications', 'development', 'developments', 'code', 'codes',
	'internationalization', 'i18n', 'internationalization', 'internationalizations',
	// Additional English tech terms
	'intelligence', 'artificial', 'machine learning', 'deep learning', 'natural language processing', 'computer vision',
	'docker', 'kubernetes', 'azure', 'amazon web services', 'google cloud platform', 'firebase', 'mongodb', 'postgresql', 'mysql',
	'react', 'angular', 'vue', 'node', 'javascript', 'typescript', 'python', 'java', 'c#', 'csharp',
	'swagger', 'postman', 'elasticsearch', 'kafka', 'redis', 'rabbitmq', 'graphql', 'rest',
	'continuous integration', 'continuous delivery', 'devops', 'agile', 'scrum', 'kanban', 'jira', 'git', 'github', 'gitlab',
	'solid', 'grasp', 'domain driven design', 'cqrs', 'clean architecture', 'hexagonal architecture'
]);

function detectLanguage(text: string): 'en' | 'es' {
	const words = text
		.toLowerCase()
		.replace(/[^\w\s]/g, '')
		.split(/\s+/)
		.filter((w) => w.length > 3);
	const spanishCount = words.filter((w) => spanishKeywords.has(w)).length;
	const englishCount = words.filter((w) => englishKeywords.has(w)).length;
	return spanishCount > englishCount ? 'es' : 'en';
}

async function processFile(filePath: string) {
	const content = await fs.promises.readFile(filePath, 'utf-8');
	const lines = content.split('\n');

	// Check if lang already exists
	if (lines.some((line) => line.startsWith('lang:'))) {
		console.log(`⊘ Skipping ${filePath} - lang already exists`);
		return;
	}

	// Find frontmatter end - normalize line endings
	const frontmatterEnd = lines.findIndex((line) => line.trim() === '---');
	if (frontmatterEnd === -1) {
		console.log(`⊘ Skipping ${filePath} - no frontmatter found`);
		return;
	}

	// Extract frontmatter and content
	const frontmatter = lines.slice(0, frontmatterEnd + 1).join('\n');
	const contentText = lines.slice(frontmatterEnd + 1).join('\n');

	// Detect language
	const detectedLang = detectLanguage(frontmatter + '\n' + contentText);
	const newLangLine = `\nlang: ${detectedLang}`;

	// Insert before first content line
	const newContent = frontmatter + newLangLine + '\n' + contentText;

	await fs.promises.writeFile(filePath, newContent, 'utf-8');
	console.log(`✓ Added lang: ${detectedLang} to ${filePath}`);
}

async function main() {
	const blogDir = './src/content/blog';

	try {
		const files = await fs.promises.readdir(blogDir, { withFileTypes: true });

		let esCount = 0;
		let enCount = 0;
		let skipped = 0;

		for (const file of files) {
			if (file.isDirectory()) {
				const filePath = `${blogDir}/${file.name}/index.md`;
				try {
					const content = await fs.promises.readFile(filePath, 'utf-8');
					const lines = content.split('\n');

					// Check if lang already exists
					if (lines.some((line) => line.startsWith('lang:'))) {
						skipped++;
						console.log(`⊘ Skipping ${filePath} - lang already exists`);
						continue;
					}

					// Find frontmatter end - normalize line endings
					const frontmatterEnd = lines.findIndex((line) => line.trim() === '---');
					if (frontmatterEnd === -1) {
						skipped++;
						console.log(`⊘ Skipping ${filePath} - no frontmatter found`);
						continue;
					}

					// Extract frontmatter and content
					const frontmatter = lines.slice(0, frontmatterEnd + 1).join('\n');
					const contentText = lines.slice(frontmatterEnd + 1).join('\n');

					// Detect language
					const detectedLang = detectLanguage(frontmatter + '\n' + contentText);
					const newLangLine = `\nlang: ${detectedLang}`;

					// Insert before first content line
					const newContent = frontmatter + newLangLine + '\n' + contentText;

					await fs.promises.writeFile(filePath, newContent, 'utf-8');
					console.log(`✓ Added lang: ${detectedLang} to ${filePath}`);

					if (detectedLang === 'es') esCount++;
					else enCount++;
				} catch (error) {
					skipped++;
				}
			}
		}

		console.log(`\n=== Summary ===`);
		console.log(`Spanish posts: ${esCount}`);
		console.log(`English posts: ${enCount}`);
		console.log(`Skipped: ${skipped}`);
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
}

const fs = await import('fs');
main();
