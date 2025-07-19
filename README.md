
# Documentación Técnica del Proyecto

## 1. Estructura General

El proyecto sigue una arquitectura **modular y escalable**, separando claramente la lógica de presentación, dominio, acceso a datos, estado global y utilidades. Esto facilita el mantenimiento, la extensibilidad y la colaboración en equipo.

```
src/
  api/           # Capa de acceso a datos (datasource, repositorios, dominio)
  components/    # Componentes UI reutilizables y modulares
  hooks/         # Custom hooks para lógica reutilizable
  integrations/  # Integraciones externas (ej: tanstack-query)
  lib/           # Utilidades generales
  routes/        # Rutas y vistas principales
  store/         # Estado global (ej: tema)
  types/         # Tipos y validaciones globales
  utils/         # Helpers de dominio
  styles.css     # Estilos globales (Tailwind + custom dark mode)
  main.tsx       # Punto de entrada de la app
```

---

## 2. Principales Decisiones Técnicas

### a) **React + TypeScript**
- Permite desarrollo robusto, tipado seguro y escalabilidad.
- Mejora la mantenibilidad y reduce errores en tiempo de desarrollo.

### b) **TailwindCSS + Custom Dark Mode**
- Tailwind para estilos utilitarios rápidos y consistentes.
- Se implementó un dark mode profesional, con variables CSS y overrides manuales para asegurar compatibilidad visual incluso si Tailwind no genera todas las clases dark.
- El archivo `styles.css` centraliza la paleta y los estilos globales.

### c) **Gestión de Estado Global con Zustand**
- El store en `store/themeStore.ts` permite alternar el tema de la app de forma global y reactiva.
- Se priorizó Zustand por su simplicidad y performance para estados globales pequeños.

### d) **Gestión de Datos con TanStack Query**
- Permite manejo eficiente de datos remotos, caché, sincronización y estados de carga/error.
- La integración está centralizada en `integrations/tanstack-query/root-provider.tsx`.

### e) **Arquitectura de Capas en la API**
- `api/datasource/`, `api/impl/`, `api/domain/` separan la definición, implementación y acceso a datos.
- Permite cambiar la fuente de datos (ej: LocalStorage, API REST) sin afectar el resto de la app.
- Uso de repositorios para desacoplar la lógica de negocio del almacenamiento.

### f) **Tipado y Validación con Zod**
- Los tipos en `types/` usan Zod para validación y tipado runtime, asegurando integridad de datos en formularios y API.

### g) **Componentes Modulares y Reutilizables**
- Componentes como `EventCard`, `BalanceSection`, `EditUserModal`, `EventForm`, etc., siguen el principio de responsabilidad única.
- Formularios desacoplados y reutilizables, con inputs y selects custom.

### h) **Custom Hooks**
- Hooks como `useUser`, `useEvents`, `useBalance` encapsulan lógica de negocio y acceso a datos, promoviendo reutilización y separación de concerns.

### i) **Ruteo Declarativo con TanStack Router**
- Navegación basada en archivos y componentes, facilitando la organización de vistas y subrutas.

---

## 3. Justificación de Herramientas y Patrones

- **TailwindCSS:** Permite iterar rápido en el diseño, con clases utilitarias y soporte para dark mode.
- **Zustand:** Suficiente para el manejo de tema y estados globales simples, sin la complejidad de Redux.
- **TanStack Query:** Eficiencia en el manejo de datos asíncronos, caché y sincronización automática.
- **Arquitectura de Capas:** Facilita testing, mantenimiento y escalabilidad.
- **Custom Hooks:** Promueven DRY y lógica compartida.
- **Validación con Zod:** Seguridad en los datos desde el frontend.
- **Variables CSS para dark mode:** Permiten un dark mode profesional, consistente y fácil de mantener.

---

## 4. Experiencia de Usuario

- **Dark mode profesional**: Visualmente atractivo, consistente y accesible.
- **Componentes visuales modernos**: Botones, inputs, tarjetas y modales estilizados.
- **Feedback inmediato**: Previsualización de imágenes, estados de carga y error claros.
- **Navegación fluida**: Ruteo declarativo y modular.

---

## 5. Extensibilidad

- La arquitectura permite agregar nuevas fuentes de datos, vistas, hooks o componentes sin romper la app.
- El uso de tipos y validaciones facilita la integración de nuevas funcionalidades y la colaboración en equipo.

---

## 6. Conclusión

El proyecto está diseñado para ser **profesional, mantenible y escalable**, usando herramientas modernas y patrones recomendados en la industria.  
Cada decisión técnica fue tomada para maximizar la calidad del código, la experiencia de usuario y la facilidad de evolución del producto.

