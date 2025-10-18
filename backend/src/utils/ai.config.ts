import { config } from './config';

export const aiConfig = {
  apiKey: config.DEEPSEEK_API_KEY,
  apiUrl: 'https://api.deepseek.com/v1/chat/completions',
  model: 'deepseek-chat',
  maxTokens: 1000,
  temperature: 0.7,
  timeout: 30000
};

export const getAISystemPrompt = (): string => {
  return `Eres un analista de proyectos experimentado con más de 10 años de experiencia en gestión de proyectos tecnológicos. 
  Tu tarea es analizar descripciones de proyectos y generar resúmenes ejecutivos profesionales que incluyan:
  
  1. Tendencias y patrones comunes
  2. Áreas de enfoque principales
  3. Recomendaciones estratégicas
  4. Posibles riesgos y oportunidades
  5. Insights accionables para la gerencia
  
  Mantén un tono profesional pero accesible. Usa emojis relevantes para mejorar la legibilidad.`;
};