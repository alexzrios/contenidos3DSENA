export class N8nClient {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.webhookUrl = localStorage.getItem('n8n_webhook_url') || 'http://localhost:5678/webhook/sena-generator';
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2rem; backdrop-filter: blur(12px); max-width: 900px; margin: 0 auto;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: linear-gradient(135deg, #ff6d5a, #ea580c); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: white; font-weight: 900;">
            n8n
          </div>
          <div>
            <h2 style="font-size: 1.4rem; font-weight: 800;">Integración y Automatización con n8n</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Dispara flujos de trabajo autónomos para generar guías con IA, exportar a Google Drive/Docs o sincronizar matrices curriculares.</p>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem;">
          <div class="form-group">
            <label class="form-label">Webhook URL de n8n (Production o Test):</label>
            <input type="text" class="form-input" id="n8nWebhookInput" value="${this.webhookUrl}" placeholder="https://tu-instancia.n8n.cloud/webhook/sena-doc-generator">
            <small style="color: var(--text-dim); display: block; margin-top: 0.35rem;">
              Tip: En n8n, crea un nodo <strong>Webhook</strong> (Método POST, Response mode: 'Respond to Webhook node' o 'When Last Node Finishes').
            </small>
          </div>

          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem;">
            <button class="btn-action primary" onclick="window.app.saveAndTriggerN8n('generar_guia_ia')">
              🚀 Generar Guía con IA (n8n + Gemini/Claude)
            </button>
            <button class="btn-action" onclick="window.app.saveAndTriggerN8n('sincronizar_drive')">
              📁 Exportar a Google Drive
            </button>
            <button class="btn-action" onclick="window.app.testN8nConnection()">
              🔌 Probar Conexión Webhook
            </button>
          </div>
        </div>

        <!-- Log & Status Output Box -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <label class="form-label" style="margin-bottom: 0;">Registro de Ejecución (Logs):</label>
            <span id="n8nStatusPill" class="badge" style="font-size: 0.7rem;">Listo para disparar</span>
          </div>
          <pre id="n8nLogOutput" style="background: #060911; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; color: #38bdf8; font-family: monospace; font-size: 0.82rem; height: 160px; overflow-y: auto;">Esperando acción de usuario...</pre>
        </div>

        <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">Flujo de Trabajo Sugerido en n8n:</h4>
          <ol style="color: var(--text-muted); font-size: 0.85rem; margin-left: 1.25rem; line-height: 1.6;">
            <li><strong>Webhook (Trigger):</strong> Recibe el JSON completo con el RAP seleccionado, RAPs transversales, horas y criterios.</li>
            <li><strong>Nodo AI Agent / LLM:</strong> Elabora redacciones didácticas personalizadas para talleres prácticos paso a paso.</li>
            <li><strong>Google Drive / Docs (Output):</strong> Crea automáticamente el documento institucional en la carpeta del centro de formación.</li>
          </ol>
        </div>
      </div>
    `;
  }

  async sendPayload(actionType, extraData = {}) {
    const input = document.getElementById('n8nWebhookInput');
    const logBox = document.getElementById('n8nLogOutput');
    const statusPill = document.getElementById('n8nStatusPill');

    const webhookUrl = input ? input.value.trim() : this.webhookUrl;
    localStorage.setItem('n8n_webhook_url', webhookUrl);

    statusPill.className = 'badge amber';
    statusPill.innerText = 'Enviando...';
    logBox.innerText = `[${new Date().toLocaleTimeString()}] Enviando acción '${actionType}' a: ${webhookUrl}...\n`;

    const payload = {
      action: actionType,
      timestamp: new Date().toISOString(),
      programa: window.app.currentProgram,
      rapActual: window.app.currentRap,
      ...extraData
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json().catch(() => ({ message: 'Respuesta sin JSON recibido con éxito (200 OK)' }));
      statusPill.className = 'badge emerald';
      statusPill.innerText = 'Éxito (200 OK)';
      logBox.innerText += `[${new Date().toLocaleTimeString()}] ✅ Respuesta de n8n:\n${JSON.stringify(result, null, 2)}`;
    } catch (err) {
      statusPill.className = 'badge rose';
      statusPill.innerText = 'Error';
      logBox.innerText += `[${new Date().toLocaleTimeString()}] ❌ Error al conectar con n8n: ${err.message}\nVerifica que n8n esté corriendo y acepte peticiones CORS en modo webhook.`;
    }
  }
}
