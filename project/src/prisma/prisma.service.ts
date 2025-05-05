import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// Mock PrismaClient for development without DB
class MockPrismaClient {
  // Add basic methods that would be used
  async $connect() {
    console.log('Mock Prisma connected');
    return Promise.resolve();
  }

  async $disconnect() {
    console.log('Mock Prisma disconnected');
    return Promise.resolve();
  }

  // Add mock implementations for models
  user = {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: (data) => Promise.resolve({ id: 'mock-id', ...data.data }),
    update: (data) => Promise.resolve({ id: 'mock-id', ...data.data }),
    delete: () => Promise.resolve({ id: 'mock-id' }),
  };

  design = {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: (data) => Promise.resolve({ id: 'mock-id', ...data.data }),
    update: (data) => Promise.resolve({ id: 'mock-id', ...data.data }),
    delete: () => Promise.resolve({ id: 'mock-id' }),
  };

  cartItem = {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: (data) => Promise.resolve({ id: 'mock-id', ...data.data }),
    update: (data) => Promise.resolve({ id: 'mock-id', ...data.data }),
    delete: () => Promise.resolve({ id: 'mock-id' }),
  };
}

@Injectable()
export class PrismaService extends MockPrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
} 