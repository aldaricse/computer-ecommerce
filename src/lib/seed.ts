import { prisma } from './prisma'

async function main() {
  const products = [
    // Laptops - Apple
    {
      name: 'MacBook Pro 14" M3',
      description: 'Laptop profesional con chip M3, 16GB RAM, 512GB SSD',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Apple',
      stock: 10
    },
    {
      name: 'MacBook Air 13" M2',
      description: 'Ultraligero con chip M2, 8GB RAM, 256GB SSD',
      price: 5900,
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Apple',
      stock: 15
    },
    {
      name: 'MacBook Pro 16" M3 Max',
      description: 'Máximo rendimiento, 32GB RAM, 1TB SSD',
      price: 15800,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Apple',
      stock: 5
    },
    // Laptops - Dell
    {
      name: 'Dell XPS 13',
      description: 'Ultrabook Intel Core i7, 16GB RAM, 256GB SSD',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Dell',
      stock: 15
    },
    {
      name: 'Dell XPS 15',
      description: 'Intel Core i9, RTX 3050, 32GB RAM, 1TB SSD',
      price: 8900,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Dell',
      stock: 8
    },
    {
      name: 'Dell Latitude 5430',
      description: 'Laptop empresarial Intel Core i5, 8GB RAM, 256GB SSD',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Dell',
      stock: 20
    },
    // Laptops - HP
    {
      name: 'HP Pavilion 15',
      description: 'Laptop para estudiantes Intel Core i5, 8GB RAM, 256GB SSD',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'HP',
      stock: 18
    },
    {
      name: 'HP Envy x360',
      description: 'Convertible AMD Ryzen 7, 16GB RAM, 512GB SSD',
      price: 5800,
      image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'HP',
      stock: 12
    },
    {
      name: 'HP Spectre x360',
      description: 'Premium 2-en-1 Intel Core i7, 16GB RAM, 1TB SSD',
      price: 7200,
      image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'HP',
      stock: 10
    },
    // Laptops - ASUS
    {
      name: 'ASUS ROG Strix G15',
      description: 'Laptop gamer AMD Ryzen 9, RTX 4060, 16GB RAM, 1TB SSD',
      price: 9500,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'ASUS',
      stock: 7
    },
    {
      name: 'ASUS ZenBook 14',
      description: 'Ultrabook Intel Core i5, 8GB RAM, 512GB SSD',
      price: 4800,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'ASUS',
      stock: 15
    },
    {
      name: 'ASUS TUF Gaming A15',
      description: 'Gaming AMD Ryzen 7, RTX 3060, 16GB RAM, 512GB SSD',
      price: 6200,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'ASUS',
      stock: 10
    },
    // Laptops - Lenovo
    {
      name: 'Lenovo ThinkPad X1 Carbon',
      description: 'Ultrabook empresarial Intel Core i7, 16GB RAM, 512GB SSD',
      price: 7800,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Lenovo',
      stock: 12
    },
    {
      name: 'Lenovo Legion 5 Pro',
      description: 'Gaming AMD Ryzen 7, RTX 3070, 32GB RAM, 1TB SSD',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Lenovo',
      stock: 8
    },
    {
      name: 'Lenovo IdeaPad 3',
      description: 'Laptop básica AMD Ryzen 5, 8GB RAM, 256GB SSD',
      price: 2800,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      category: 'laptops',
      brand: 'Lenovo',
      stock: 25
    },
    // Desktops - Apple
    {
      name: 'iMac 24" M3',
      description: 'All-in-one con pantalla Retina 4.5K, chip M3, 8GB RAM',
      price: 7800,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
      category: 'desktop',
      brand: 'Apple',
      stock: 8
    },
    {
      name: 'Mac mini M2',
      description: 'Compacto con chip M2, 8GB RAM, 256GB SSD',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
      category: 'desktop',
      brand: 'Apple',
      stock: 15
    },
    {
      name: 'Mac Studio M2 Ultra',
      description: 'Workstation profesional, 64GB RAM, 2TB SSD',
      price: 18500,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
      category: 'desktop',
      brand: 'Apple',
      stock: 5
    },
    // Gaming PCs
    {
      name: 'Gaming PC RTX 4070',
      description: 'PC Gamer AMD Ryzen 7, RTX 4070, 32GB RAM, 1TB NVMe',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
      category: 'desktop',
      brand: 'Custom Build',
      stock: 5
    },
    {
      name: 'Gaming PC RTX 4080',
      description: 'PC Gamer Intel i9, RTX 4080, 64GB RAM, 2TB NVMe',
      price: 15500,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
      category: 'desktop',
      brand: 'Custom Build',
      stock: 3
    },
    {
      name: 'Gaming PC RTX 4060',
      description: 'PC Gamer AMD Ryzen 5, RTX 4060, 16GB RAM, 1TB NVMe',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
      category: 'desktop',
      brand: 'Custom Build',
      stock: 8
    },
    // Workstation PCs
    {
      name: 'Workstation Pro',
      description: 'AMD Threadripper, 128GB RAM, RTX 4000, 4TB NVMe',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
      category: 'desktop',
      brand: 'Custom Build',
      stock: 2
    },
    {
      name: 'Content Creator PC',
      description: 'Intel i9, RTX 3080, 64GB RAM, 2TB NVMe',
      price: 13500,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
      category: 'desktop',
      brand: 'Custom Build',
      stock: 4
    },
    // Monitores
    {
      name: 'Monitor LG 27" 4K',
      description: 'Monitor IPS 4K 60Hz, ideal para diseño y productividad',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
      category: 'monitors',
      brand: 'LG',
      stock: 12
    },
    {
      name: 'Monitor ASUS ROG 27" 165Hz',
      description: 'Gaming monitor 2K QHD, 1ms, G-Sync',
      price: 2200,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
      category: 'monitors',
      brand: 'ASUS',
      stock: 10
    },
    {
      name: 'Monitor Samsung 32" Curved',
      description: 'Monitor curvo 4K, ideal para gaming y multimedia',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
      category: 'monitors',
      brand: 'Samsung',
      stock: 8
    },
    {
      name: 'Monitor Dell 24" FHD',
      description: 'Monitor profesional IPS, 60Hz, bordes delgados',
      price: 980,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
      category: 'monitors',
      brand: 'Dell',
      stock: 15
    },
    // Periféricos - Teclados
    {
      name: 'Corsair K100 RGB',
      description: 'Teclado mecánico gaming premium, switches Cherry MX',
      price: 850,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Corsair',
      stock: 20
    },
    {
      name: 'Keychron K2',
      description: 'Teclado mecánico inalámbrico, perfil bajo',
      price: 480,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Keychron',
      stock: 25
    },
    {
      name: 'Razer Huntsman Elite',
      description: 'Teclado óptico-mecánico RGB, switches púrpura',
      price: 720,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Razer',
      stock: 15
    },
    // Periféricos - Ratones
    {
      name: 'Logitech MX Master 3S',
      description: 'Mouse inalámbrico ergonómico para productividad',
      price: 450,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Logitech',
      stock: 25
    },
    {
      name: 'Razer DeathAdder V3 Pro',
      description: 'Mouse gaming inalámbrico, 30K DPI, ultraligero',
      price: 580,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Razer',
      stock: 18
    },
    {
      name: 'Glorious Model O',
      description: 'Mouse gaming ultraligero, cable flexible',
      price: 280,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Glorious',
      stock: 30
    },
    // Almacenamiento
    {
      name: 'Samsung 970 EVO Plus 1TB',
      description: 'SSD NVMe M.2, velocidades hasta 3500MB/s',
      price: 420,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'Samsung',
      stock: 40
    },
    {
      name: 'WD Black 2TB',
      description: 'Disco duro gaming 7200RPM',
      price: 380,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'Western Digital',
      stock: 35
    },
    {
      name: 'Crucial P5 Plus 2TB',
      description: 'SSD NVMe PCIe 4.0, hasta 6600MB/s',
      price: 680,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'Crucial',
      stock: 25
    },
    // Memoria RAM
    {
      name: 'Corsair Vengeance 32GB',
      description: 'Kit RAM DDR4 3200MHz (2x16GB)',
      price: 520,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'Corsair',
      stock: 30
    },
    {
      name: 'G.Skill Trident Z5 32GB',
      description: 'Kit RAM DDR5 6000MHz RGB (2x16GB)',
      price: 890,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'G.Skill',
      stock: 20
    },
    // Tarjetas Gráficas
    {
      name: 'NVIDIA RTX 4070 Ti',
      description: 'GPU Gaming 12GB GDDR6X',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'NVIDIA',
      stock: 8
    },
    {
      name: 'AMD Radeon RX 7800 XT',
      description: 'GPU Gaming 16GB GDDR6',
      price: 3800,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'AMD',
      stock: 10
    },
    // Procesadores
    {
      name: 'AMD Ryzen 9 7950X',
      description: 'CPU 16 núcleos, 32 hilos, hasta 5.7GHz',
      price: 3100,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'AMD',
      stock: 15
    },
    {
      name: 'Intel Core i9-14900K',
      description: 'CPU 24 núcleos, 32 hilos, hasta 6.0GHz',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'Intel',
      stock: 12
    },
    // Placas Base
    {
      name: 'ASUS ROG X670E',
      description: 'Placa base gaming AM5, WiFi 6E',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'ASUS',
      stock: 10
    },
    {
      name: 'MSI MPG Z790',
      description: 'Placa base gaming LGA 1700, DDR5',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      category: 'components',
      brand: 'MSI',
      stock: 12
    },
    // Audio
    {
      name: 'Sony WH-1000XM5',
      description: 'Auriculares inalámbricos con cancelación de ruido',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Sony',
      stock: 15
    },
    {
      name: 'Logitech G Pro X',
      description: 'Auriculares gaming profesionales',
      price: 650,
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Logitech',
      stock: 20
    },
    // Webcams
    {
      name: 'Logitech Brio 4K',
      description: 'Webcam 4K HDR con Windows Hello',
      price: 780,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Logitech',
      stock: 18
    },
    {
      name: 'Razer Kiyo Pro',
      description: 'Webcam 1080p optimizada para streaming',
      price: 620,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
      category: 'accessories',
      brand: 'Razer',
      stock: 15
    }
  ];

  // Limpiar datos existentes de todas las tablas
  await prisma.sale.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Insertar datos iniciales
  await Promise.all([
    prisma.product.createMany({
      data: products,
    }),
  ])

  console.log('✅ Seed completado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });