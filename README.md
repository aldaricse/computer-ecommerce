# Computer E-commerce

Una aplicación completa de e-commerce para la venta de computadoras desarrollada con Next.js, TypeScript y tecnologías modernas.

## Tecnologías utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Form Validation**: Zod + React Hook Form
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + bcryptjs
- **Payments**: Stripe
- **Testing**: Jest + React Testing Library

## Características

### ✅ Autenticación completa
- Registro e inicio de sesión de usuarios
- Autenticación con JWT
- Protección de rutas

### ✅ Catálogo de productos
- Visualización de productos con filtros
- Búsqueda por categorías
- Gestión de inventario

### ✅ Carrito de compras
- Agregar/remover productos
- Actualizar cantidades
- Persistencia del carrito

### ✅ Sistema de pagos
- Integración con Stripe
- Webhooks para confirmación de pago
- Gestión de órdenes

### ✅ Gestión de órdenes
- Historial de pedidos
- Estados de órdenes
- Detalles de compra

## Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd computer-ecommerce
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

### Autenticación
- Los usuarios pueden registrarse y hacer login
- Las sesiones se mantienen con JWT
- Protección de rutas sensibles

### Catálogo
- Visualización de productos en grid responsivo
- Filtros por categoría, precio y búsqueda
- Información detallada de cada producto

### Carrito
- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Persistencia entre sesiones

### Checkout
- Integración segura con Stripe
- Procesamiento de pagos en tiempo real
- Confirmación automática de órdenes

### Órdenes
- Historial completo de pedidos
- Estados actualizables
- Detalles de cada orden

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.