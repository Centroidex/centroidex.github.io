// Búsqueda por código (EI-2.2, EI-2.2-A, EI) o por título.
(function(){
  // Unidades colapsables: abrir la del enlace (#u2), abrir/cerrar todas y filtrar temas
  var unidades = [].slice.call(document.querySelectorAll('details.unidad'));
  if(unidades.length){
    var abrirHash = function(){
      var m = location.hash.match(/^#u(\d+)$/); if(!m) return;
      var d = document.getElementById('u' + m[1]); if(d && d.tagName === 'DETAILS'){ d.open = true; d.scrollIntoView({block:'start'}); }
    };
    window.addEventListener('hashchange', abrirHash); abrirHash();
    document.querySelectorAll('[data-unidades]').forEach(function(b){
      b.addEventListener('click', function(){ var abrir = b.getAttribute('data-unidades') === 'abrir'; unidades.forEach(function(d){ d.open = abrir; }); });
    });
    var f = document.getElementById('filtro-temas'), sin = document.getElementById('sin-resultados');
    var nrm = function(s){ return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); };
    if(f) f.addEventListener('input', function(){
      var v = nrm(f.value.trim()), total = 0;
      unidades.forEach(function(d){
        var n = 0;
        d.querySelectorAll('.fila-tema').forEach(function(a){ var ok = !v || nrm(a.textContent).indexOf(v) >= 0; a.hidden = !ok; if(ok) n++; });
        d.hidden = v && !n; if(v) d.open = n > 0; total += n;
      });
      document.querySelectorAll('section.unidad--vacia').forEach(function(sx){ sx.hidden = !!v; });
      if(sin) sin.hidden = !v || total > 0;
    });
  }
})();
(function(){
  var INDICE = {"EI": "ei.html", "MM": "mm.html", "AE": "ae.html", "MS": "ms.html", "CI": "ci.html", "MT": "mt.html", "HI": "hi.html", "HD": "hd.html", "EI-1.1": "ei-1-1.html", "EI-1.2": "ei-1-2.html", "EI-1.3": "ei-1-3.html", "EI-1.4": "ei-1-4.html", "EI-2.1": "ei-2-1.html", "EI-2.2": "ei-2-2.html", "EI-2.3": "ei-2-3.html", "EI-2.4": "ei-2-4.html", "EI-2.5": "ei-2-5.html", "EI-2.6": "ei-2-6.html", "EI-3.1": "ei-3-1.html", "EI-3.2": "ei-3-2.html", "EI-3.3": "ei-3-3.html", "EI-3.4": "ei-3-4.html", "EI-4.1": "ei-4-1.html", "EI-4.2": "ei-4-2.html", "EI-4.3": "ei-4-3.html", "EI-5.1": "ei-5-1.html", "EI-5.2": "ei-5-2.html", "EI-5.3": "ei-5-3.html", "EI-5.4": "ei-5-4.html", "EI-5.5": "ei-5-5.html"}, TITULOS = [{"c": "EI-1.1", "t": "Fuerzas y momentos", "u": "ei-1-1.html"}, {"c": "EI-1.2", "t": "Diagrama de cuerpo libre y ecuaciones de equilibrio", "u": "ei-1-2.html"}, {"c": "EI-1.3", "t": "Apoyos y reacciones: estabilidad y determinación estática", "u": "ei-1-3.html"}, {"c": "EI-1.4", "t": "Cargas distribuidas: resultante y centroide", "u": "ei-1-4.html"}, {"c": "EI-2.1", "t": "Viga simplemente apoyada con carga puntual", "u": "ei-2-1.html"}, {"c": "EI-2.2", "t": "Viga simplemente apoyada con carga uniforme distribuida", "u": "ei-2-2.html"}, {"c": "EI-2.3", "t": "Carga triangular y cargas combinadas", "u": "ei-2-3.html"}, {"c": "EI-2.4", "t": "Relaciones carga–cortante–momento (método de áreas)", "u": "ei-2-4.html"}, {"c": "EI-2.5", "t": "Vigas en voladizo y vigas con voladizos", "u": "ei-2-5.html"}, {"c": "EI-2.6", "t": "Vigas con articulaciones (vigas Gerber)", "u": "ei-2-6.html"}, {"c": "EI-3.1", "t": "Armaduras: tipos, estabilidad y determinación", "u": "ei-3-1.html"}, {"c": "EI-3.2", "t": "Método de nodos", "u": "ei-3-2.html"}, {"c": "EI-3.3", "t": "Método de secciones", "u": "ei-3-3.html"}, {"c": "EI-3.4", "t": "Elementos de fuerza cero y armaduras de techo", "u": "ei-3-4.html"}, {"c": "EI-4.1", "t": "Marcos: reacciones y equilibrio de cada miembro", "u": "ei-4-1.html"}, {"c": "EI-4.2", "t": "Diagramas de fuerza normal, cortante y momento en marcos", "u": "ei-4-2.html"}, {"c": "EI-4.3", "t": "Marcos de tres articulaciones", "u": "ei-4-3.html"}, {"c": "EI-5.1", "t": "Centroide de áreas planas: figuras simples y compuestas", "u": "ei-5-1.html"}, {"c": "EI-5.2", "t": "Momento de inercia de áreas simples", "u": "ei-5-2.html"}, {"c": "EI-5.3", "t": "Teorema de los ejes paralelos (Steiner)", "u": "ei-5-3.html"}, {"c": "EI-5.4", "t": "Secciones compuestas: perfiles I, T, canal y cajón", "u": "ei-5-4.html"}, {"c": "EI-5.5", "t": "Radio de giro y módulo de sección", "u": "ei-5-5.html"}, {"c": "EI", "t": "Estructuras isostáticas", "u": "ei.html"}, {"c": "MM", "t": "Mecánica de materiales", "u": "mm.html"}, {"c": "AE", "t": "Análisis estructural", "u": "ae.html"}, {"c": "MS", "t": "Mecánica de suelos", "u": "ms.html"}, {"c": "CI", "t": "Cimentaciones", "u": "ci.html"}, {"c": "MT", "t": "Movimiento de tierras", "u": "mt.html"}, {"c": "HI", "t": "Hidráulica", "u": "hi.html"}, {"c": "HD", "t": "Hidrología", "u": "hd.html"}, {"c": "", "t": "Interactivo: momento de una fuerza", "u": "momento.html"}, {"c": "", "t": "Interactivo: apoyos y equilibrio", "u": "equilibrio.html"}, {"c": "", "t": "Interactivo: resultante de cargas distribuidas", "u": "resultante.html"}, {"c": "", "t": "Interactivo: viga con carga puntual", "u": "viga-puntual.html"}, {"c": "", "t": "Interactivo: viga con carga distribuida", "u": "viga-distribuida.html"}, {"c": "", "t": "Interactivo: fuerzas en armaduras", "u": "armadura.html"}, {"c": "", "t": "Interactivo: marcos isostáticos", "u": "marco.html"}, {"c": "", "t": "Interactivo: secciones compuestas", "u": "seccion.html"}];
  function norm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  function porCodigo(txt){
    var c = txt.trim().toUpperCase().replace(/\s+/g,'');
    if(!c) return null;
    if(INDICE[c]) return INDICE[c];
    var m = c.match(/^([A-Z]{2})-(\d+)\.(\d+)-[A-Z]$/);
    if(m && INDICE[m[1]+'-'+m[2]+'.'+m[3]]) return INDICE[m[1]+'-'+m[2]+'.'+m[3]];
    m = c.match(/^([A-Z]{2})(-\d+(-F)?)?$/);
    if(m && INDICE[m[1]]) return INDICE[m[1]];
    m = c.match(/^([A-Z]{2})-/);
    if(m && INDICE[m[1]]) return INDICE[m[1]] + '#aviso';
    return null;
  }
  var form = document.getElementById('form-codigo');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var v = document.getElementById('codigo').value, msg = document.getElementById('msg-codigo'), u = porCodigo(v);
      if(u){ location.href = u; return; }
      msg.classList.add('error');
      msg.textContent = v.trim() ? 'No encontramos «' + v.trim().toUpperCase() + '». Revisa el código; si es correcto, el tema aún está en preparación.' : 'Escribe un código, por ejemplo EI-2.2.';
    });
  }
  var q = document.getElementById('buscar'), res = document.getElementById('resultados');
  if(q && res){
    function pintar(){
      var v = norm(q.value.trim()); res.innerHTML = '';
      if(v.length < 2){ res.hidden = true; return; }
      var lista = TITULOS.filter(function(x){ return norm(x.c + ' ' + x.t).indexOf(v) >= 0; }).slice(0, 8);
      if(!lista.length){ res.innerHTML = '<span class="vacio">Sin resultados</span>'; }
      lista.forEach(function(x){
        var a = document.createElement('a'); a.href = x.u;
        a.innerHTML = (x.c ? '<b>' + x.c + '</b>' : '') + '<span>' + x.t + '</span>';
        res.appendChild(a);
      });
      res.hidden = false;
    }
    q.addEventListener('input', pintar);
    q.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){ var u = porCodigo(q.value); if(u){ location.href = u; } else { var a = res.querySelector('a'); if(a) location.href = a.href; } }
      if(e.key === 'Escape'){ res.hidden = true; q.blur(); }
    });
    document.addEventListener('click', function(e){ if(!res.contains(e.target) && e.target !== q) res.hidden = true; });
  }
})();
