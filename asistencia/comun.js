/* ============================================================
   CONFIGURACIÓN — pega aquí la URL de tu aplicación web
   (Apps Script > Implementar > URL que termina en /exec)
   ============================================================ */
const API_URL = 'https://script.google.com/macros/s/AKfycby38YOWE7Yd9qAiPGtfehYQ8kABGgpiCBNkXsljBxpblvrzPcb7-2x3IFYfA2kgf0M/exec';

/* ---------------- Utilidades compartidas ---------------- */

async function api(accion, datos) {
  let r;
  try {
    r = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.assign({ accion: accion }, datos || {}))
    });
  } catch (e) {
    throw new Error('Sin conexión. Revisa tus datos móviles e inténtalo de nuevo.');
  }
  let j;
  try { j = await r.json(); } catch (e) { throw new Error('El servidor no respondió correctamente. Intenta de nuevo.'); }
  if (!j.ok) throw new Error(j.error || 'Error desconocido.');
  return j;
}

function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function leer(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function borrar(k) { try { localStorage.removeItem(k); } catch (e) {} }

/* Obtiene la mejor ubicación posible en un lapso (útil dentro de edificios).
   Termina antes si alcanza la precisión objetivo. */
function mejorUbicacion(ms, objetivo) {
  ms = ms || 15000; objetivo = objetivo || 35;
  return new Promise(function (res, rej) {
    if (!navigator.geolocation) return rej(new Error('Tu navegador no permite obtener la ubicación.'));
    let mejor = null, ultimoError = null, terminado = false;
    const fin = function () {
      if (terminado) return; terminado = true;
      navigator.geolocation.clearWatch(id); clearTimeout(t);
      if (mejor) res(mejor);
      else rej(new Error(ultimoError && ultimoError.code === 1
        ? 'Permiso de ubicación denegado. Actívalo en la configuración del navegador y recarga la página.'
        : 'No se pudo obtener tu ubicación. Activa el GPS / ubicación precisa e inténtalo de nuevo.'));
    };
    const id = navigator.geolocation.watchPosition(function (p) {
      const u = { lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy };
      if (!mejor || u.acc < mejor.acc) mejor = u;
      if (u.acc <= objetivo) fin();
    }, function (e) {
      ultimoError = e;
      if (e.code === 1) fin();
    }, { enableHighAccuracy: true, maximumAge: 0, timeout: ms });
    const t = setTimeout(fin, ms);
  });
}

function pad2(n) { return String(n).padStart(2, '0'); }
function ymd(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
