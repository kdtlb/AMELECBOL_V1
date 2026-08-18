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
├── assets/             Marca propia de Amelecbol e imagen del hero
│   ├── hero-solar.jpg        Fotografía de fondo del hero (1920×1080)
│   ├── hero-solar-sm.jpg     La misma, versión móvil (1000×563)
│   ├── logo-color.png        Imagotipo completo a color (A.01)
│   ├── logo-blanco.png       Imagotipo completo, versión negativa
│   ├── isotipo-blanco.png    Isotipo negativo — marca de agua del sitio
│   ├── isotipo-color.png     Isotipo a color (A.02.1)
│   ├── isotipo-azul.png      Isotipo azul primario
│   ├── isotipo-amarillo.png  Isotipo amarillo primario
│   ├── wordmark-azul.png     Solo logotipo tipográfico
│   └── favicon.ico / .png    Ícono de pestaña
└── media/              Logotipos de terceros y fotografías de obra
    ├── clientes/             Logotipos institucionales del portafolio
    │   ├── gobernacion-potosi.jpg
    │   ├── gobernacion-chuquisaca.png
    │   ├── gobernacion-tarija.png
    │   ├── setar.png
    │   └── sepsa.jpg
    └── obras/                Fotografías propias tomadas en campo
        ├── puesto-transformacion-rafael-bustillo.jpg
        ├── estructura-mt-jantapalka.jpg
        ├── cruceta-doble-jantapalka.jpg
        ├── linea-bt-jantapalka.jpg
        ├── linea-mt-rafael-bustillo.jpg
        └── seccionamiento-chayanta.jpg
```

Los demás logotipos de `assets/` se incluyen como kit de marca para futuras piezas.

### Sobre la carpeta `media/`

Separa deliberadamente lo que **no** es marca de Amelecbol: los logotipos
pertenecen a las entidades contratantes y las fotografías son registro de obra.
Así, `assets/` sigue siendo el kit de marca del manual y `media/` puede crecer
sin mezclarse con él.

- **`media/clientes/`** — logotipos institucionales, normalizados a **240 px de
  alto**. Las gobernaciones conservan la transparencia PNG. En la página se
  muestran dentro de una caja de alto fijo con `object-fit: contain`, en escala
  de grises al 74 % de opacidad, y recuperan su color al pasar el cursor: es lo
  que da la presentación uniforme que pidió el cliente pese a que los originales
  tienen proporciones muy distintas (escudos cuadrados frente a logotipos
  apaisados).
- **`media/obras/`** — fotografías de campo reducidas a 1400 px de lado mayor y
  recomprimidas al 78 % de calidad (de ~1,8 MB en total a ~880 KB). Se cargan con
  `loading="lazy"`, así que no pesan en la primera pantalla. La galería las
  recorta a cuadrado para que las filas queden parejas mezclando verticales y
  horizontales.

**Para añadir un cliente o una fotografía:** dejar el archivo en la subcarpeta
que corresponda y duplicar un `<li>` de `.clientes` o de `.galeria` en
`index.html`. Conviene mantener el `alt` descriptivo y los atributos `width` y
`height` reales, que son los que evitan que el texto salte mientras carga.

Los archivos originales sin optimizar quedan fuera del repositorio (ver `/img/`
en `.gitignore`); si hiciera falta regenerar `media/`, se parte de ellos.

### Sobre la fotografía del hero

`hero-solar.jpg` es una **imagen de banco, no una obra de Amelecbol**: una planta
fotovoltaica en la Región de Antofagasta (Chile), elegida por su parecido con el
terreno altiplánico. Autor: Antonio Garcia, vía Unsplash, bajo la [Licencia
Unsplash](https://unsplash.com/license) — uso comercial permitido, sin atribución
obligatoria. Original: <https://unsplash.com/photos/ndz_u1_tFZo>

Se sirve en dos tamaños mediante `srcset`: en móvil se descargan 151 KB en lugar
de 476 KB. Encima va `.hero__velo`, un degradado azul de marca que sostiene el
contraste del texto blanco; sus opacidades son el único valor a tocar si se
quiere la foto más o menos visible.

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
  sección y los pies de la galería de obra, y envuelven los íconos de servicio.
- **Versiones del logotipo (A.01 / A.02):** imagotipo a color sobre fondo claro y
  versión negativa sobre azul; se intercambian solos al desplazarse la página.

---

## Actualizaciones solicitadas por el cliente

Cambios aplicados a partir del documento «Actualizaciones para la página web».
Los textos marcados como *texto sugerido* se incorporaron literalmente.

1. **Provisión e importación de materiales.** La tarjeta de servicio pasó de
   «Provisión de materiales eléctricos» a **«Provisión e importación de
   materiales eléctricos y productos solares»**, con el texto sugerido y un
   segundo párrafo que enumera el catálogo solar (paneles, inversores,
   estructuras, protecciones, cableado y conectores).
2. **Paneles solares y Generación Distribuida.** La tarjeta incorpora
   expresamente la Generación Distribuida **On-Grid** y, en un bloque aparte, el
   marco normativo: D.S. N.º 4477 y sus modificaciones, D.S. N.º 5167/2024,
   Resolución AETN N.º 379/2024 y los requisitos de las Empresas Distribuidoras.
   La sección «Servicios» pasó a **dos columnas**, porque a cuatro las tarjetas
   quedaban demasiado angostas para el texto nuevo.
3. **Portafolio de clientes.** La lista de nombres se reemplazó por los
   **logotipos institucionales** de las tres gobernaciones, SETAR y SEPSA (ver
   `media/clientes/`). Las empresas industriales y mineras, que no tienen
   logotipo disponible, se mencionan ahora en una nota bajo la rejilla.
4. **Misión.** Reescrita con el texto sugerido: incorpora *comercializar*, la
   importación y provisión de materiales, la Generación Distribuida y el
   almacenamiento energético, sin perder el enfoque en infraestructura eléctrica.
5. **Refuerzo comercial general.** Se actualizaron además el titular y el
   subtítulo del hero, el volanta («Construcción · Importación · Energía solar»),
   el título y las metaetiquetas de la página, la introducción de «Servicios», el
   texto y la lista de «Nosotros», la tercera tarjeta de la propuesta diferencial
   (ahora «Importación y comercialización»), las opciones del formulario y los
   enlaces del pie.

**Añadido durante el trabajo:** una **galería con seis fotografías propias de
obra** al inicio de la sección «Obras» (`media/obras/`). El documento del cliente
no la pedía, pero sí pedía que la página cargara sus fotografías, y el registro
visual de las líneas construidas respalda la tabla de obras que viene después.

---

## Pendientes de completar

1. **Fecha de inicio de la obra Cieneguillas – Saladillo.** En la planilla original
   figuraba «24 de Octubre al 18 de Mayo de 2024», sin el año de inicio. En la tabla
   se asumió **Octubre 2022**. Confirmar y corregir en `index.html` si corresponde.
2. **Dirección de oficina.** No constaba en la documentación. Hay un comentario
   `TODO` en la sección de contacto de `index.html`; por ahora el sitio muestra
   «Cobertura: Potosí · Chuquisaca · Tarija».
3. **Fotografía del hero.** La galería de `media/obras/` ya está publicada dentro
   de la sección «Obras», pero el hero sigue usando una imagen de banco (ver
   arriba). Si aparece una fotografía propia apaisada y de buena resolución,
   basta con reemplazar `hero-solar.jpg` y `hero-solar-sm.jpg` por versiones del
   mismo tamaño (1920×1080 y 1000×563).
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
- **Cambiar el teléfono principal:** aparece en la barra superior, la sección de
  contacto, el pie y los dos enlaces de WhatsApp (`wa.me/59172021320`).
- **Contactos directos:** Miguel Mancilla (`+591 718 64037`) y Julio Suárez
  (`+591 718 65855`) figuran en la sección de contacto y en el pie. Son enlaces
  `tel:`, no `wa.me`: si también atienden por WhatsApp, basta con duplicar el
  patrón del botón verde apuntando a `wa.me/59171864037` y `wa.me/59171865855`.
- **Redes sociales:** Facebook e Instagram aparecen en tres lugares — barra
  superior, sección de contacto y pie. Al cambiarlas hay que tocar las tres.
  Del enlace de Facebook se usa la **URL canónica del perfil**
  (`facebook.com/people/Amelecbol-SRL/100054656550394/`), a la que redirige el
  enlace de compartir original; se prefiere porque los enlaces `/share/` pueden
  caducar. De ambas URLs se quitaron los parámetros de rastreo (`mibextid`,
  `igsh`, `utm_source`), que no hacen falta y ensucian el enlace.

---

## Verificaciones realizadas

- Estructura HTML balanceada, sin etiquetas sin cerrar ni identificadores duplicados.
- Los 20 recursos referenciados existen; ningún error 404 al cargar y ninguna de
  las 18 imágenes queda rota.
- Las 19 anclas internas apuntan a secciones existentes.
- Los 6 campos del formulario tienen etiqueta asociada; validación probada en los
  casos de campos vacíos, correo mal formado y envío correcto.
- Un único `<h1>`, jerarquía de encabezados correcta y metadatos completos.
- Sin desbordamiento horizontal entre 360 px y 1440 px de ancho.
- Sin errores en la consola del navegador.

---

## Criterio de mayúsculas en los términos técnicos

A pedido del cliente, los nombres de servicio y tecnología llevan mayúscula
inicial en todas las palabras significativas, en toda la página. Se extiende el
criterio que el propio cliente ya usaba con «Generación Distribuida».

Términos tratados así:

Electrificación Rural · Redes de Distribución · Redes de Media y Baja Tensión ·
Media Tensión · Baja Tensión · Líneas Eléctricas · Estudios de Demanda ·
Energía Solar · Generación Solar · Generación Distribuida · Sistemas
Fotovoltaicos · Paneles Solares · Paneles Fotovoltaicos · Productos Solares ·
Materiales Eléctricos · Equipamiento Eléctrico · Infraestructura Eléctrica ·
Almacenamiento Energético · Eficiencia Energética · Sistemas Híbridos

**Quedan en minúscula** los adjetivos y sustantivos genéricos que no nombran una
línea de servicio: «sector eléctrico», «proyecto eléctrico», «soluciones
eléctricas», «energía eléctrica», «energía sostenible», «actas de entrega»,
«alimentadores urbanos y rurales».

Nota de estilo: la ortografía española reserva la mayúscula para nombres propios,
de modo que en rigor estos términos irían en minúscula a mitad de frase. Es una
convención tomada del inglés, habitual en comunicación corporativa técnica para
destacar la oferta comercial. Se aplica porque el cliente lo pidió; si en algún
momento se prefiere volver al criterio ortográfico estricto, basta con revertir
esta lista.

**Al redactar texto nuevo**, conviene respetar la lista para que la página no
quede mezclada.

### La barra superior en pantallas angostas

El correo `amelecbol@gmail.com` es largo y, junto al teléfono y los dos iconos de
redes, no cabía en una sola línea por debajo de unos 460 px: la barra se partía
en dos de golpe. Por debajo de **520 px** el correo se reduce a su icono de
sobre, que sigue abriendo el gestor de correo; la dirección completa continúa en
el HTML, oculta solo a la vista, así que los lectores de pantalla la leen igual y
sigue apareciendo en la sección de contacto y en el pie.

Así la barra mide 40 px y ocupa una sola fila desde 320 px hasta escritorio.
