# Sitio web — Amelecbol S.R.L.

Sitio institucional de **Amelecbol S.R.L.**, empresa constructora eléctrica boliviana.
Una sola página, en HTML, CSS y JavaScript puros: **sin frameworks, sin dependencias
y sin ninguna petición a servidores externos**. Todo lo que necesita está en este
repositorio, así que funciona igual en GitHub Pages que en cualquier otro hosting.

Repositorio: <https://github.com/kdtlb/AMELECBOL_V1>

---

## Estado de la publicación

El código **ya está subido** a GitHub, en la rama `main`. Falta un único paso,
que solo puede hacerse desde la interfaz de GitHub:

### Activar GitHub Pages

1. Entrar a <https://github.com/kdtlb/AMELECBOL_V1/settings/pages>
2. En «Build and deployment»:
   - Source: **Deploy from a branch**
   - Branch: **main** · carpeta **/ (root)**
   - Pulsar **Save**
3. Esperar entre 1 y 3 minutos. El sitio queda publicado en:

   ```
   https://kdtlb.github.io/AMELECBOL_V1/
   ```

> **Sobre la ruta.** Al ser un repositorio de proyecto, el sitio no vive en la raíz
> del dominio sino en `/AMELECBOL_V1/`. Todas las rutas del `index.html` son
> relativas, así que funcionan sin cambios. La única excepción es el botón «Volver
> al inicio» de `404.html`, que necesita la ruta absoluta y por eso apunta a
> `/AMELECBOL_V1/`. Si algún día se usa un dominio propio, hay que cambiarlo a `/`.

### Actualizaciones posteriores

```bash
git add -A
git commit -m "Describir el cambio"
git push
```

GitHub Pages vuelve a publicar solo, en menos de un minuto. Si un cambio no se ve,
suele ser caché del navegador: recargar con `Ctrl + F5`.

---

## Dominio propio (opcional)

Si en algún momento contratan un dominio como `amelecbol.com`:

1. Crear en la raíz del repositorio un archivo llamado `CNAME` cuyo único
   contenido sea el dominio, sin `https://` ni barra final:
   ```
   amelecbol.com
   ```
2. En el panel del proveedor del dominio, apuntar los registros DNS a GitHub:
   - Registros `A` de `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - Registro `CNAME` de `www` → `kdtlb.github.io`
3. En **Settings → Pages**, escribir el dominio en «Custom domain» y activar
   **Enforce HTTPS** una vez que GitHub emita el certificado.
4. Con dominio propio el sitio pasa a vivir en la raíz: cambiar en `404.html` el
   enlace `href="/AMELECBOL_V1/"` por `href="/"`.

---

## Estructura

```
.
├── index.html          Toda la estructura y el contenido del sitio
├── 404.html            Página de error, autocontenida (estilos y logo embebidos)
├── robots.txt          Permite la indexación por buscadores
├── .nojekyll           Indica a GitHub que publique los archivos sin procesarlos
├── .gitignore          Archivos temporales de Windows, macOS y editores
├── .gitattributes      Normaliza los finales de línea entre Windows y GitHub
├── css/styles.css      Estilos, con los tokens del manual de marca al inicio
├── js/main.js          Menú móvil, contadores, animaciones y formulario
└── assets/             Logotipos recortados y optimizados para web
    ├── logo-color.png        Imagotipo completo a color (A.01)
    ├── logo-blanco.png       Imagotipo completo, versión negativa
    ├── isotipo-blanco.png    Isotipo negativo — marca de agua del sitio
    ├── isotipo-color.png     Isotipo a color (A.02.1)
    ├── isotipo-azul.png      Isotipo azul primario
    ├── isotipo-amarillo.png  Isotipo amarillo primario
    ├── wordmark-azul.png     Solo logotipo tipográfico
    └── favicon.ico / .png    Ícono de pestaña
```

La página carga únicamente 6 archivos (HTML, CSS, JS y 3 imágenes). Los demás
logotipos de `assets/` se incluyen como kit de marca para futuras piezas.

### Verlo en local antes de publicar

```bash
py -m http.server 8123
```

Luego abrir <http://localhost:8123>.

---

## Identidad de marca

Los colores están definidos como variables CSS al inicio de `css/styles.css`,
tomados literalmente del manual de marca:

| Variable       | Valor     | Rol en el manual                |
|----------------|-----------|---------------------------------|
| `--azul`       | `#263168` | Primario · Pantone P 103-8 C    |
| `--amarillo`   | `#fcbf0a` | Primario · Pantone P 10-8 C     |
| `--azul-sec`   | `#1f4e8b` | Secundario · Pantone P 105-15 C |
| `--gris`       | `#3c3c3b` | Secundario · Pantone P 179-14   |
| `--gris-claro` | `#f6f6f6` | Complementario · Pantone 663 C  |

Otras reglas del manual aplicadas:

- **Tipografía (A.07.1):** Helvetica Neue en Regular, Medium y Bold, con Helvetica
  y Arial como respaldo. No se cargan fuentes externas.
- **Marca de agua (A.08.1):** el isotipo aparece al 5 % de opacidad y en un solo
  color detrás del hero y de la sección «Propuesta diferencial».
- **Círculos (A.08):** los círculos derivados del isotipo abren los títulos de
  sección, envuelven los íconos de servicio y marcan la lista de clientes.
- **Versiones del logotipo (A.01 / A.02):** imagotipo a color sobre fondo claro y
  versión negativa sobre azul; se intercambian solos al desplazarse la página.

---

## Pendientes de completar

1. **Fecha de inicio de la obra Cieneguillas – Saladillo.** En la planilla original
   figuraba «24 de Octubre al 18 de Mayo de 2024», sin el año de inicio. En la tabla
   se asumió **Octubre 2022**. Confirmar y corregir en `index.html` si corresponde.
2. **Dirección de oficina.** No constaba en la documentación. Hay un comentario
   `TODO` en la sección de contacto de `index.html`; por ahora el sitio muestra
   «Cobertura: Potosí · Chuquisaca · Tarija».
3. **Fotografías de obra.** El sitio funciona sin imágenes, pero fotos reales de
   las líneas construidas y del equipo en campo aumentarían mucho la credibilidad.
   Los mejores lugares: el hero y una galería nueva antes de «Obras».
4. **Formulario de contacto.** Hoy abre el gestor de correo del visitante
   (`mailto:`), sin servidor. Para recibir los mensajes directamente, reemplazar el
   bloque 5 de `js/main.js` por un endpoint como Formspree o Web3Forms.
5. **Vista previa al compartir el enlace** (opcional). Para que WhatsApp y las redes
   muestren el logo al pegar la dirección, conviene poner la URL completa. En el
   `<head>` de `index.html`, cambiar:

   ```html
   <meta property="og:image" content="assets/logo-color.png">
   ```

   por la ruta absoluta, y añadir debajo la dirección del sitio:

   ```html
   <meta property="og:image" content="https://kdtlb.github.io/AMELECBOL_V1/assets/logo-color.png">
   <meta property="og:url"   content="https://kdtlb.github.io/AMELECBOL_V1/">
   ```

---

## Mantenimiento habitual

- **Agregar una obra:** duplicar un `<tr>` de la tabla en `index.html` y actualizar
  el total del `<tfoot>`. Los atributos `data-lbl` de cada celda son los que generan
  las tarjetas en móvil: conviene conservarlos.
- **Cambiar las cifras del hero:** los `<span class="stat__num">` usan
  `data-contador`, `data-decimales`, `data-prefijo` y `data-sufijo` para animarse.
- **Cambiar el teléfono:** aparece en la barra superior, la sección de contacto,
  el pie y los dos enlaces de WhatsApp (`wa.me/59172021320`).

---

## Verificaciones realizadas

- Estructura HTML balanceada, sin etiquetas sin cerrar ni identificadores duplicados.
- Los 11 recursos referenciados existen; ningún error 404 al cargar.
- Las 18 anclas internas apuntan a secciones existentes.
- Los 6 campos del formulario tienen etiqueta asociada; validación probada en los
  casos de campos vacíos, correo mal formado y envío correcto.
- Un único `<h1>`, jerarquía de encabezados correcta y metadatos completos.
- Sin desbordamiento horizontal entre 360 px y 1440 px de ancho.
- Sin errores en la consola del navegador.
