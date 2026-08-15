/* ==========================================================================
   AMELECBOL S.R.L. — Interacciones del sitio
   Sin dependencias externas.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     1. Navegación: fondo sólido al hacer scroll
     --------------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var ticking = false;

  function actualizarNav() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(actualizarNav); ticking = true; }
  }, { passive: true });
  actualizarNav();

  /* ---------------------------------------------------------------------
     2. Menú móvil
     --------------------------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('menu');

  function cerrarMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }

  toggle.addEventListener('click', function () {
    var abierto = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(abierto));
    toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) { cerrarMenu(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      cerrarMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (menu.classList.contains('is-open') && !e.target.closest('.nav__in')) { cerrarMenu(); }
  });

  /* ---------------------------------------------------------------------
     3. Aparición progresiva de secciones
     --------------------------------------------------------------------- */
  var revelables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revelables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) { return; }
        var el = entrada.target;
        // Escalona los elementos hermanos para un efecto de cascada suave
        var hermanos = Array.prototype.slice.call(el.parentNode.children).filter(function (n) {
          return n.classList && n.classList.contains('reveal');
        });
        el.style.transitionDelay = (Math.min(hermanos.indexOf(el), 5) * 90) + 'ms';
        el.classList.add('is-visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revelables.forEach(function (el) { obs.observe(el); });
  }

  /* ---------------------------------------------------------------------
     4. Contadores de indicadores
     --------------------------------------------------------------------- */
  var contadores = document.querySelectorAll('[data-contador]');

  function formatear(valor, decimales) {
    return valor.toFixed(decimales).replace('.', ',');
  }

  function animarContador(el) {
    var destino   = parseFloat(el.dataset.contador);
    var decimales = parseInt(el.dataset.decimales || '0', 10);
    var prefijo   = el.dataset.prefijo || '';
    var sufijo    = el.dataset.sufijo || '';

    if (reduceMotion) {
      el.textContent = prefijo + formatear(destino, decimales) + sufijo;
      return;
    }

    var duracion = 1500;
    var inicio   = null;

    function paso(t) {
      if (inicio === null) { inicio = t; }
      var p = Math.min((t - inicio) / duracion, 1);
      var eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      el.textContent = prefijo + formatear(destino * eased, decimales) + sufijo;
      if (p < 1) { window.requestAnimationFrame(paso); }
    }
    window.requestAnimationFrame(paso);
  }

  if ('IntersectionObserver' in window) {
    var obsNum = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          obsNum.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.5 });
    contadores.forEach(function (el) { obsNum.observe(el); });
  }

  /* ---------------------------------------------------------------------
     5. Formulario de contacto
     Sin backend: compone un correo y lo abre en el cliente del visitante.
     Para recibir los envíos directamente en el servidor, reemplazar este
     bloque por un endpoint (Formspree, Web3Forms, PHP propio, etc.).
     --------------------------------------------------------------------- */
  var form = document.getElementById('formContacto');
  var nota = document.getElementById('formNota');
  var DESTINO = 'amelecbol@gmail.com';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var campos = {
      nombre:   form.nombre,
      email:    form.email,
      mensaje:  form.mensaje
    };
    var faltantes = [];

    Object.keys(campos).forEach(function (k) {
      var input = campos[k];
      var vacio = !input.value.trim();
      var malEmail = k === 'email' && input.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      input.classList.toggle('is-error', vacio || malEmail);
      if (vacio || malEmail) { faltantes.push(k); }
    });

    if (faltantes.length) {
      nota.textContent = 'Por favor complete su nombre, un correo válido y el mensaje.';
      nota.className = 'form__nota is-err';
      form[faltantes[0]].focus();
      return;
    }

    var asunto = 'Consulta web — ' + form.servicio.value;
    var cuerpo = [
      'Nombre: '   + form.nombre.value.trim(),
      'Empresa: '  + (form.empresa.value.trim() || '—'),
      'Correo: '   + form.email.value.trim(),
      'Teléfono: ' + (form.telefono.value.trim() || '—'),
      'Servicio: ' + form.servicio.value,
      '',
      'Mensaje:',
      form.mensaje.value.trim()
    ].join('\n');

    window.location.href = 'mailto:' + DESTINO +
      '?subject=' + encodeURIComponent(asunto) +
      '&body='    + encodeURIComponent(cuerpo);

    nota.textContent = 'Se abrirá su gestor de correo con la consulta lista para enviar.';
    nota.className = 'form__nota is-ok';
  });

  form.addEventListener('input', function (e) {
    if (e.target.classList.contains('is-error')) { e.target.classList.remove('is-error'); }
  });

  /* ---------------------------------------------------------------------
     6. Año del pie
     --------------------------------------------------------------------- */
  document.getElementById('anio').textContent = new Date().getFullYear();
})();
