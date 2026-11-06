# DESIGN.md · Aula Centroide (centroidex.github.io)

Dirección: **académico y confiable como Khan Academy, visual y de "aprender haciendo" como Brilliant, sin verse infantil.**
Fondo claro y mucho aire, estructura de curso clara (carrera → materia → unidad → tema), tarjetas con identidad de color por área, ilustraciones técnicas limpias e interactivos como protagonistas. Nada de degradados morados, emojis ni efectos de vidrio.

Todos los valores viven como variables en `estilos.css`; las páginas usan los nombres, nunca valores sueltos.

## Color

| Token | Valor | Uso |
|---|---|---|
| `--tinta` | #0e1a2b | Texto principal, títulos |
| `--tinta-2` | #44546a | Texto secundario, descripciones |
| `--tinta-3` | #6b7a90 | Notas, metadatos, placeholders |
| `--fondo` | #ffffff | Fondo de página |
| `--superficie` | #f5f7fa | Bandas alternas, cajas suaves |
| `--borde` | #e2e7ee | Bordes de tarjetas e inputs |
| `--marino` | #0f2557 | Marca (azul del logo): textos de marca, pie, chips de código |
| `--naranja` | #ff6b00 | Marca (naranja del logo): solo formas y resaltados, nunca texto pequeño |
| `--naranja-texto` | #c24e00 | Texto naranja legible ("AULA", antetítulos de marca) |
| `--primario` | #1f4fd1 | Botones principales, enlaces, foco |
| `--primario-suave` | #e9effd | Fondos de selección, chips de navegación |
| `--tinto` | #a3303c | Cargas, interactivos y llamadas a "Pruébalo" (convención de clase) |
| `--exito` | #1d7a46 | Resultados y respuestas correctas |
| `--aviso` | #8b1a1a sobre #fbeaea | "Error frecuente" |

Identidad por área (texto / fondo):
Estructuras #1f4fd1 / #e9effd · Geotecnia #9a6212 / #fbf1de · Hidráulica #0b7a70 / #dcf3ef · Arquitectura #5b3fa6 / #efeafb.

Contraste: todo texto ≥ 4.5:1 sobre su fondo.

## Marca

Símbolo de centroide del canal Centroide (cuatro cuadrantes, dos anillos azul marino y dos cuartos naranja), recreado en SVG. Logotipo: «AULA» (Montserrat 700, espaciado amplio, naranja) sobre «CENTROIDE» (Montserrat 800, azul marino). Lema: «Donde la teoría encuentra su equilibrio». El símbolo también es el ícono de la pestaña y una marca de agua tenue en la portada.

## Tipografía

- **Lexend** (600, 700) para títulos y navegación: diseñada para facilitar la lectura; aporta el carácter moderno.
- **Atkinson Hyperlegible** (400, 700) para el texto: muy legible en celular y en proyector.
- **STIX Two Text** para fórmulas en línea.

Escala (px / interlineado): 13/1.4 · 15/1.5 · 17/1.6 (cuerpo) · 20/1.4 · 24/1.3 · 32/1.2 · 44/1.1 · 56/1.05. Líneas de 60–75 caracteres.

## Espacio

Escala de 4 px: 4, 8, 12, 16, 24, 32, 48, 72. Contenido a 1160 px de ancho; secciones separadas 72 px (48 px en celular); margen lateral 24 px (16 px en celular).

## Forma y profundidad

Radios: 8 px (chips, botones), 14 px (tarjetas), 20 px (tarjetas de carrera), 999 px (píldoras).
Sombras: `--sombra-1` (reposo, casi imperceptible) y `--sombra-2` (al pasar el cursor, la tarjeta sube 2 px).

## Componentes

- **Botones**: primario (azul, texto blanco), secundario (blanco con borde), interactivo (tinto). Estados hover, foco con anillo azul de 3 px y deshabilitado al 45 %.
- **Chip de código** (EI-2.2): marino con letra blanca, Lexend, siempre visible en materias y temas.
- **Tarjeta de carrera**: ilustración arriba, nombre, áreas y número de materias.
- **Tarjeta de área / materia**: franja de color del área, ícono de línea, nombre y código.
- **Fila de tema**: código, título, resumen y tipos de material (Apunte, Interactivo, Ejercicios).
- **Pasos del ejemplo**: Datos → Fórmula → Sustitución → Resultado, cada uno con su etiqueta.
- **Respuesta desplegable**: "Ver respuesta" con resultado en verde.
- **Navegación**: barra blanca fija con borde inferior; pie marino.

## Imágenes e íconos

Íconos de línea propios (trazo 1.8 px, puntas redondeadas). Ilustraciones planas con formas técnicas (puente, edificio, vigas). En diagramas: cargas en tinto, viga gris azulado, cortante en azul, momento en verde con **momento positivo hacia abajo**.
