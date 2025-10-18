import { config } from '../utils/config';

export class AIService {
  private apiKey: string;
  private apiUrl: string = 'https://api.deepseek.com/v1/chat/completions';

  constructor() {
    this.apiKey = config.DEEPSEEK_API_KEY;
    if (!this.apiKey) {
      console.warn('⚠️  DEEPSEEK_API_KEY no configurada. La funcionalidad de IA estará limitada.');
    }
  }

  async generarResumenProyectos(descripciones: string[]): Promise<string> {
    if (!this.apiKey) {
      return '🔒 Funcionalidad de IA no disponible - Configure DEEPSEEK_API_KEY';
    }

    if (descripciones.length === 0) {
      return 'No hay proyectos para analizar';
    }

    try {
      const textoProyectos = descripciones.join('\n\n---\n\n');
      
      const prompt = `Analiza las siguientes descripciones de proyectos y genera un resumen ejecutivo que incluya:
      1. Tendencias comunes en los proyectos
      2. Áreas de enfoque principales
      3. Recomendaciones generales
      4. Posibles riesgos o desafíos

      Descripciones de proyectos:
      ${textoProyectos}

      Resumen ejecutivo:`;

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'Eres un analista de proyectos experimentado. Proporciona resúmenes ejecutivos concisos y profesionales.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Error en API de IA: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error en servicio de IA:', error);
      return `❌ Error al generar resumen: ${error instanceof Error ? error.message : 'Error desconocido'}`;
    }
  }

  // Fallback cuando no hay API key
  generarResumenFallback(descripciones: string[]): string {
    const totalProyectos = descripciones.length;
    const palabrasClave = this.extraerPalabrasClave(descripciones);
    
    return `📊 Resumen de ${totalProyectos} proyectos:\n\n` +
           `🔍 Palabras clave detectadas: ${palabrasClave.slice(0, 10).join(', ')}\n\n` +
           `💡 Configure DEEPSEEK_API_KEY para un análisis más detallado con IA.`;
  }

  private extraerPalabrasClave(descripciones: string[]): string[] {
    const textoCompleto = descripciones.join(' ').toLowerCase();
    const palabras = textoCompleto.split(/\s+/);
    const palabrasComunes = new Set(['el', 'la', 'de', 'en', 'y', 'con', 'para', 'por', 'los', 'las']);
    
    return [...new Set(palabras.filter(palabra => 
      palabra.length > 3 && !palabrasComunes.has(palabra)
    ))];
  }
}