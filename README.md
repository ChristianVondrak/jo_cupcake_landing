# J&O Cupcakes - Landing Page de Conversión

Landing page estratégica y responsiva orientada a la conversión y venta de la **Guía de Costos de J&O Cupcake** (plantilla automatizada en Google Sheets para repostería).

Este proyecto implementa un **funnel calificado (Quiz Modal Gated)** adaptado para campañas de Meta Ads (Facebook/Instagram Ads).

## 🚀 Características
- **Filtro Modal Gated (Gatekeeper)**: Todos los CTAs comerciales principales abren un modal interactivo con un diagnóstico de 3 preguntas en lugar de redirigir de forma directa a WhatsApp.
- **Diagnóstico Dinámico**: Según las respuestas del usuario, el sistema calcula de forma instantánea el estado de su negocio (Alerta Crítica, Riesgo Moderado, Estructura Saludable), personaliza el consejo y genera dinámicamente el mensaje pre-rellenado para WhatsApp.
- **Meta Pixel Integrado**: 
  - Registra `InitiateCheckout` al abrir el modal (indicando intención comercial).
  - Registra `Lead` con valor de conversión ($5 USD) cuando completan el diagnóstico y ven el botón de WhatsApp.
  - Registra `Contact` cuando el usuario hace clic en el enlace final de redirección a WhatsApp.
- **Cumplimiento de Políticas (Meta Ads)**: Incluye disclaimer legal de Meta/Facebook en el footer y políticas de privacidad y términos de servicio implementadas de forma interactiva en ventanas modales para evitar salidas del funnel.
- **Diseño Premium**: Paleta de colores pastel inspirada en repostería ("Sugar & Sprinkles"), tipografías profesionales (Quicksand y Montserrat) y micro-animaciones en mockups flotantes 3D.

## 🛠️ Personalización y Configuración

Abre el archivo [index.html](file:///c:/Users/Christian/Documents/web/JO_Cupcakes/index.html) para ajustar los siguientes parámetros:

### 1. Número de WhatsApp
Busca la constante `WHATSAPP_PHONE` en la sección de scripts (aproximadamente en la línea 785) y reemplaza el número con el de tu negocio (sin el símbolo `+` ni espacios):
```javascript
const WHATSAPP_PHONE = '584241903404'; // Reemplaza con tu número internacional
```

### 2. Configurar el Meta Pixel
Busca la constante `META_PIXEL_ID` en el bloque de scripts del encabezado (aproximadamente en la línea 187) y reemplaza `'YOUR_PIXEL_ID'` por tu ID real de Meta Pixel:
```javascript
const META_PIXEL_ID = 'TU_PIXEL_ID_REAL';
```
*Nota: Si dejas `'YOUR_PIXEL_ID'`, el sistema operará en **modo simulación**, imprimiendo los eventos en la consola del navegador para que puedas probar el flujo sin alterar tus métricas de producción.*

### 3. Precios y Ofertas
Si deseas cambiar el precio de lanzamiento de $5 USD u otra información comercial, edita los textos en el HTML de la sección "Oferta Irresistible" (aproximadamente línea 655). Recuerda también actualizar el valor monetario del Pixel en las llamadas a `trackMetaEvent` (línea 941).

## 🖥️ Cómo Ejecutar y Probar en Local

Puedes visualizar y probar todo el flujo usando el servidor de desarrollo configurado en este repositorio:

```bash
npx live-server --port=3000 --no-browser
```
El sitio se servirá en [http://127.0.0.1:3000](http://127.0.0.1:3000).

### Cómo validar el funcionamiento del funnel:
1. Abre las herramientas de desarrollador del navegador (F12) y dirígete a la pestaña **Consola**.
2. Haz clic en cualquiera de los botones de llamada a la acción en la landing.
3. Observa el mensaje en consola: `[Meta Event Tracked] Evento: "InitiateCheckout"`.
4. Responde las 3 preguntas del modal.
5. Al ver tu diagnóstico final, observa el mensaje en consola: `[Meta Event Tracked] Evento: "Lead"`.
6. Haz clic en el botón **Continuar a WhatsApp**. Observa el mensaje: `[Meta Event Tracked] Evento: "Contact"` y valida que el enlace de redirección contenga tu mensaje personalizado con las respuestas seleccionadas.
