-- Crear tabla de productos si no existe
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    stockStatus TEXT NOT NULL DEFAULT 'in_stock',
    category TEXT,
    metal TEXT,
    featured BOOLEAN DEFAULT FALSE,
    stock INTEGER DEFAULT 0,
    description TEXT,
    images TEXT[],
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar datos de ejemplo si la tabla está vacía
INSERT INTO products (name, sku, price, stockStatus, category, metal, featured, stock, description, images)
SELECT 
    'Diamond Pendant Necklace', 
    'DP-N1001', 
    450.00, 
    'in_stock', 
    'Necklaces', 
    '18K White Gold', 
    TRUE, 
    15, 
    'Elegante colgante de diamantes con cadena de oro blanco de 18K.',
    ARRAY['https://example.com/images/diamond-pendant-1.jpg', 'https://example.com/images/diamond-pendant-2.jpg']
WHERE 
    NOT EXISTS (SELECT 1 FROM products WHERE sku = 'DP-N1001');

INSERT INTO products (name, sku, price, stockStatus, category, metal, featured, stock, description, images)
SELECT 
    'Pearl Stud Earrings', 
    'PE-S2001', 
    175.00, 
    'in_stock', 
    'Earrings', 
    'Silver', 
    FALSE, 
    8, 
    'Aretes de perla con terminado en plata.',
    ARRAY['https://example.com/images/pearl-earrings-1.jpg']
WHERE 
    NOT EXISTS (SELECT 1 FROM products WHERE sku = 'PE-S2001');

INSERT INTO products (name, sku, price, stockStatus, category, metal, featured, stock, description, images)
SELECT 
    'Gold Chain Bracelet', 
    'GC-B3001', 
    320.00, 
    'low_stock', 
    'Bracelets', 
    '14K Gold', 
    TRUE, 
    3, 
    'Brazalete de cadena de oro de 14K, perfecto para cualquier ocasión.',
    ARRAY['https://example.com/images/gold-bracelet-1.jpg', 'https://example.com/images/gold-bracelet-2.jpg']
WHERE 
    NOT EXISTS (SELECT 1 FROM products WHERE sku = 'GC-B3001');

INSERT INTO products (name, sku, price, stockStatus, category, metal, featured, stock, description, images)
SELECT 
    'Emerald Ring', 
    'ER-R4001', 
    550.00, 
    'out_of_stock', 
    'Rings', 
    'Platinum', 
    FALSE, 
    0, 
    'Anillo de esmeralda con engaste de platino, una pieza de colección.',
    ARRAY['https://example.com/images/emerald-ring-1.jpg']
WHERE 
    NOT EXISTS (SELECT 1 FROM products WHERE sku = 'ER-R4001');

INSERT INTO products (name, sku, price, stockStatus, category, metal, featured, stock, description, images)
SELECT 
    'Sapphire Drop Earrings', 
    'SD-E5001', 
    375.00, 
    'in_stock', 
    'Earrings', 
    '18K White Gold', 
    TRUE, 
    7, 
    'Aretes colgantes de zafiro con oro blanco de 18K.',
    ARRAY['https://example.com/images/sapphire-earrings-1.jpg', 'https://example.com/images/sapphire-earrings-2.jpg']
WHERE 
    NOT EXISTS (SELECT 1 FROM products WHERE sku = 'SD-E5001'); 