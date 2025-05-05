import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfiguratorOptionsResponseDto } from './dto/configurator-options.dto';

@Injectable()
export class ConfiguratorService {
  constructor(private prisma: PrismaService) {}

  async getConfiguratorOptions(): Promise<ConfiguratorOptionsResponseDto> {
    const [
      jewelryTypes,
      metals,
      emeraldCuts,
      emeraldQualities,
      emeraldOrigins,
      settingTypes,
      accentStoneTypes
    ] = await Promise.all([
      this.prisma.jewelryType.findMany(),
      this.prisma.metal.findMany(),
      this.prisma.emeraldCut.findMany(),
      this.prisma.emeraldQuality.findMany(),
      this.prisma.emeraldOrigin.findMany(),
      this.prisma.settingType.findMany(),
      this.prisma.accentStoneType.findMany(),
    ]);

    return {
      jewelryTypes,
      metals,
      emeraldCuts,
      emeraldQualities,
      emeraldOrigins,
      settingTypes,
      accentStoneTypes,
    };
  }
} 