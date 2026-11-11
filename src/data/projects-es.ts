import { FLAGSHIP_PROJECTS, OTHER_PROJECTS } from './projects';

const main = [
 'PDaC trata la definición de producto como un activo arquitectónico: reglas, actores, recorridos y requisitos se definen una vez, evolucionan mediante cambios explícitos y se citan desde especificaciones, instrucciones para agentes y pruebas.',
 'Una CLI y paquetes para validar definiciones de producto, compilarlas en un grafo, evolucionarlas mediante cambios aprobados y comprobar que las especificaciones y los agentes citan las reglas vigentes.',
 'Una CLI y capacidades para agentes que crean y mantienen documentación de arquitectura arc42 a partir del repositorio, generan diagramas y publican un lector junto al código.',
 'Guías, perfiles y comprobaciones que un repositorio adopta para compartir una base de ingeniería y transmitir los estándares del equipo a los agentes.',
 'Un producto abierto para reducir la carga mental de gestionar un hogar, con familiares, responsabilidades, calendario y tareas compartidas.',
];
const other = [
 'Plataforma abierta y autoalojable de operaciones y facturación para producción audiovisual y alquiler de equipos.',
 'Un ejemplo bilingüe de arc42 aplicado sección por sección a un sistema complejo.',
 'Investigación de malware dirigido a desarrolladores y disfrazado de oferta de proyecto.',
 'Convierte una estación de trabajo en una plataforma local de IA segura y accesible desde la red local.',
 'Solución de referencia con organización por funcionalidades, CI/CD y Terraform.',
 'Una API REST con DDD, vertical slices, inyección de dependencias y seguridad, en castellano.',
 'Ejemplos de diagramas UML y C4 escritos en Mermaid.',
];
export const PROJECTS_ES = FLAGSHIP_PROJECTS.map((project, i) => ({ ...project, description: main[i] }));
export const OTHER_PROJECTS_ES = OTHER_PROJECTS.map((project, i) => ({ ...project, description: other[i] }));
