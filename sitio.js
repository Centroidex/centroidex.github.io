// Búsqueda por código (EI-2.2, EI-2.2-A, EI) o por título.
(function(){
  var INDICE = {"EI": "ei.html", "MM": "mm.html", "AE": "ae.html", "MS": "ms.html", "CI": "ci.html", "MT": "mt.html", "HI": "hi.html", "HD": "hd.html", "EI-2.1": "ei-2-1.html", "EI-2.2": "ei-2-2.html"};
  var TITULOS = [{"c": "EI", "t": "Estructuras isostáticas", "u": "ei.html"}, {"c": "MM", "t": "Mecánica de materiales", "u": "mm.html"}, {"c": "AE", "t": "Análisis estructural", "u": "ae.html"}, {"c": "MS", "t": "Mecánica de suelos", "u": "ms.html"}, {"c": "CI", "t": "Cimentaciones", "u": "ci.html"}, {"c": "MT", "t": "Movimiento de tierras", "u": "mt.html"}, {"c": "HI", "t": "Hidráulica", "u": "hi.html"}, {"c": "HD", "t": "Hidrología", "u": "hd.html"}, {"c": "EI-2.1", "t": "Viga simplemente apoyada con carga puntual", "u": "ei-2-1.html"}, {"c": "EI-2.2", "t": "Viga simplemente apoyada con carga uniforme distribuida", "u": "ei-2-2.html"}, {"c": "", "t": "Interactivo: viga con carga puntual", "u": "viga-puntual.html"}, {"c": "", "t": "Interactivo: viga con carga distribuida", "u": "viga-distribuida.html"}];
  function quitarAcentos(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  function porCodigo(txt){
    var c = txt.trim().toUpperCase().replace(/\s+/g,'');
    if(!c) return null;
    if(INDICE[c]) return INDICE[c];
    var m = c.match(/^([A-Z]{2})-(\d+)\.(\d+)-[A-Z]$/);          // archivo de tema: EI-2.2-A
    if(m && INDICE[m[1]+'-'+m[2]+'.'+m[3]]) return INDICE[m[1]+'-'+m[2]+'.'+m[3]];
    m = c.match(/^([A-Z]{2})(-\d+(-F)?)?$/);                          // materia, unidad o formulario
    if(m && INDICE[m[1]]) return INDICE[m[1]];
    m = c.match(/^([A-Z]{2})-/);
    if(m && INDICE[m[1]]) return INDICE[m[1]] + '#aviso';
    return null;
  }
  // caja de código de la portada
  var form = document.getElementById('form-codigo');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var v = document.getElementById('codigo').value, msg = document.getElementById('msg-codigo');
      var u = porCodigo(v);
      if(u){ location.href = u; }
      else { msg.textContent = v.trim() ? 'No encontramos «' + v.trim().toUpperCase() + '». Revisa el código; si es correcto, el tema aún está en preparación.' : 'Escribe un código, por ejemplo EI-2.2.'; msg.style.color = '#8b1a1a'; }
    });
  }
  // buscador del encabezado
  var q = document.getElementById('buscar'), res = document.getElementById('resultados');
  if(q && res){
    function pintar(){
      var v = quitarAcentos(q.value.trim());
      res.innerHTML = '';
      if(v.length < 2){ res.hidden = true; return; }
      var lista = TITULOS.filter(function(x){ return quitarAcentos(x.c + ' ' + x.t).indexOf(v) >= 0; }).slice(0, 8);
      if(!lista.length){ res.innerHTML = '<span style="display:block;padding:10px 14px;color:#5b6b7d">Sin resultados</span>'; }
      lista.forEach(function(x){
        var a = document.createElement('a'); a.href = x.u;
        a.style.cssText = 'display:flex;gap:10px;padding:10px 14px;text-decoration:none;color:#1f2a37';
        a.innerHTML = (x.c ? '<b style="color:#13294b;min-width:52px">' + x.c + '</b>' : '') + '<span>' + x.t + '</span>';
        res.appendChild(a);
      });
      res.hidden = false;
    }
    q.addEventListener('input', pintar);
    q.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){ var u = porCodigo(q.value); if(u){ location.href = u; } else { var a = res.querySelector('a'); if(a) location.href = a.href; } }
      if(e.key === 'Escape'){ res.hidden = true; }
    });
    document.addEventListener('click', function(e){ if(!res.contains(e.target) && e.target !== q) res.hidden = true; });
  }
})();
