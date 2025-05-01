#!/usr/bin/env ts-node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { Product } from '../src/types/product.types';

// Utility to read the current products
async function readProducts(): Promise<Product[]> {
  const dbPath = path.join(process.cwd(), 'db.json');
  const dbContent = await fs.readFile(dbPath, 'utf-8');
  const db = JSON.parse(dbContent);
  return db.products || [];
}

// Utility to write products back to db.json
async function writeProducts(products: Product[]): Promise<void> {
  const dbPath = path.join(process.cwd(), 'db.json');
  const dbContent = await fs.readFile(dbPath, 'utf-8');
  const db = JSON.parse(dbContent);
  db.products = products;
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

// Questions for product creation/editing
const productQuestions = [
  {
    type: 'input',
    name: 'codigo',
    message: 'Código del producto:',
  },
  {
    type: 'input',
    name: 'nombre',
    message: 'Nombre del producto:',
  },
  {
    type: 'input',
    name: 'descripcion',
    message: 'Descripción completa:',
  },
  {
    type: 'input',
    name: 'descripcionCorta',
    message: 'Descripción corta:',
  },
  {
    type: 'number',
    name: 'precio',
    message: 'Precio (en COP):',
  },
  {
    type: 'input',
    name: 'imagenesPrincipales',
    message: 'URLs de imágenes principales (separadas por coma):',
    filter: (input: string) => input.split(',').map(url => url.trim()).filter(url => url),
  },
  {
    type: 'input',
    name: 'imagenesDetalle',
    message: 'URLs de imágenes de detalle (separadas por coma):',
    filter: (input: string) => input.split(',').map(url => url.trim()).filter(url => url),
  },
  {
    type: 'input',
    name: 'tipoJoya',
    message: 'Tipo de joya:',
  },
  {
    type: 'input',
    name: 'tipoMetal',
    message: 'Tipo de metal (dejar vacío si no aplica):',
  },
  {
    type: 'input',
    name: 'corteEsmeralda',
    message: 'Corte de la esmeralda:',
  },
  {
    type: 'input',
    name: 'calidadEsmeralda',
    message: 'Calidad de la esmeralda:',
  },
  {
    type: 'input',
    name: 'origenEsmeralda',
    message: 'Origen de la esmeralda:',
  },
  {
    type: 'number',
    name: 'quilatesEsmeralda',
    message: 'Quilates de la esmeralda:',
  },
  {
    type: 'confirm',
    name: 'enStock',
    message: '¿Está en stock?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'destacado',
    message: '¿Es un producto destacado?',
    default: false,
  },
  {
    type: 'input',
    name: 'tags',
    message: 'Tags (separados por coma):',
    filter: (input: string) => input.split(',').map(tag => tag.trim()).filter(tag => tag),
  },
];

async function createProduct() {
  console.log('📦 Creando nuevo producto...');
  const answers = await inquirer.prompt(productQuestions);
  
  const newProduct: Product = {
    id: uuidv4(),
    ...answers,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stock: answers.enStock ? 1 : 0,
  };

  const products = await readProducts();
  products.push(newProduct);
  await writeProducts(products);
  
  console.log('✅ Producto creado exitosamente!');
  console.log('ID del producto:', newProduct.id);
}

async function editProduct() {
  const products = await readProducts();
  
  // First select the product to edit
  const { productId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'productId',
      message: 'Selecciona el producto a editar:',
      choices: products.map(p => ({
        name: `${p.codigo} - ${p.nombre || p.name}`,
        value: p.id,
      })),
    },
  ]);

  const productToEdit = products.find(p => p.id === productId)!;
  console.log('🔄 Editando producto:', productToEdit.nombre || productToEdit.name);

  // Pre-fill the questions with current values
  const answers = await inquirer.prompt(
    productQuestions.map(q => ({
      ...q,
      default: productToEdit[q.name as keyof Product],
    }))
  );

  const updatedProduct: Product = {
    ...productToEdit,
    ...answers,
    updatedAt: new Date().toISOString(),
    stock: answers.enStock ? 1 : 0,
  };

  const updatedProducts = products.map(p => 
    p.id === productId ? updatedProduct : p
  );

  await writeProducts(updatedProducts);
  console.log('✅ Producto actualizado exitosamente!');
}

program
  .name('manage-products')
  .description('CLI para gestionar productos en db.json')
  .version('1.0.0');

program
  .command('create')
  .description('Crear un nuevo producto')
  .action(createProduct);

program
  .command('edit')
  .description('Editar un producto existente')
  .action(editProduct);

program.parse(); 