import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // API endpoint for AI Tutor / Assistant on SENA & Acuerdo 009 de 2024
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!ai) {
        return res.status(500).json({ 
          error: 'Gemini API Key no está configurada. Por favor configure GEMINI_API_KEY en las variables de entorno.' 
        });
      }

      const systemInstruction = `Eres un experto senior en pedagogía institucional y normatividad del SENA (Servicio Nacional de Aprendizaje), especialista en la aplicación del Acuerdo 009 de 2024 (Reglamento del Aprendiz). 
Tu tono es empático, claro, estrictamente fundamentado en la normatividad institucional, motivador y profesional.
Ayudas a los aprendices, instructores y aspirantes a resolver dudas sobre:
- Derechos y deberes fundamentales del aprendiz (Capítulos III y IV del Acuerdo 009 de 2024).
- Tipos de faltas (Académicas y Disciplinarias) y su clasificación: Faltas leves, faltas graves y faltas gravísimas.
- El debido proceso, derecho de defensa, contradicción, descargos, planes de mejoramiento y el funcionamiento del Comité de Evaluación y Seguimiento.
- Caracterización y perfiles de ingreso, ruta pedagógica de inducción y formación por competencias.
- Trámites en Sofia Plus, bienestar al aprendiz, aplazamientos, traslados, reingresos y etapa productiva.

Responde siempre en español de manera estructurada, clara y con referencias precisas al Acuerdo 009 de 2024 cuando aplique.`;

      const contents = [
        ...(history || []).map((h: { role: string; content: string }) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || 'Lo siento, no pude procesar tu consulta en este momento.';
      res.json({ reply });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({ error: error.message || 'Error interno del servidor de IA.' });
    }
  });

  // Vite middleware for frontend development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}

startServer();
