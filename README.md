# Ficha de parámetros fotográficos

Tarjeta de referencia rápida para registro fotográfico odontológico (extraoral e intraoral), con valores recomendados para sensor full frame y APS-C, y espacio para que cada estudiante anote los suyos. Una sola URL sirve para cualquier curso.

## Qué se edita y dónde (`index.html`, bloque `CONFIG` al inicio del script)

| Campo | Para qué |
|---|---|
| `ENDPOINT` | URL de la aplicación web de Apps Script (registro al exportar). Vacío = no envía nada |
| `VERSION`, `FECHA` | Aparecen en el pie de página y en la ficha exportada |

Los valores recomendados están en `CAMARA` y `TOMAS`; los textos de ayuda, en `INFO`. Los íconos van incrustados en el mismo archivo (`ICONS`).

**Al cambiar cualquier archivo**, sube también la versión en `sw.js` (`const VERSION = 'ficha-1.1'`, etc.) para que los teléfonos que la usan sin conexión reciban la actualización.

## Datos

- Los valores de cada estudiante se guardan solo en su dispositivo (almacenamiento del navegador).
- Cada vez que exporta, llegan al registro (Google Sheets): nombre, tipo de cámara, sensor, cámara, lente y flash. Una fila por dispositivo, con fecha y hora de la primera y la última exportación y el número de exportaciones.
