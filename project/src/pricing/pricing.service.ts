import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PriceEstimateRequestDto, PriceEstimateResponseDto } from './dto/price-estimate.dto';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  async calculatePriceEstimate(
    request: PriceEstimateRequestDto,
  ): Promise<PriceEstimateResponseDto> {
    // 1. Obtener los datos necesarios de la base de datos
    const [jewelryType, metal, emeraldCut, emeraldQuality, emeraldOrigin, settingType] =
      await Promise.all([
        this.prisma.jewelryType.findUnique({
          where: { id: request.jewelryTypeId },
        }),
        this.prisma.metal.findUnique({
          where: { id: request.metalId },
        }),
        this.prisma.emeraldCut.findUnique({
          where: { id: request.emeraldCutId },
        }),
        this.prisma.emeraldQuality.findUnique({
          where: { id: request.emeraldQualityId },
        }),
        this.prisma.emeraldOrigin.findUnique({
          where: { id: request.emeraldOriginId },
        }),
        this.prisma.settingType.findUnique({
          where: { id: request.settingTypeId },
        }),
      ]);

    // Verificar que todos los componentes existen
    if (!jewelryType || !metal || !emeraldCut || !emeraldQuality || !emeraldOrigin || !settingType) {
      throw new NotFoundException('Uno o más componentes seleccionados no existen');
    }

    // 2. Calcular los precios de cada componente
    const CARAT_BASE_PRICE = 1000; // Precio base por quilate en USD
    
    // Precio base del tipo de joya
    const jewelryTypePrice = jewelryType.basePrice;
    
    // Precio del metal (basado en el modificador de precio)
    const metalPrice = jewelryTypePrice * metal.priceModifier;
    
    // Precio de la esmeralda (basado en quilates, corte, calidad y origen)
    const emeraldBasePrice = request.carats * CARAT_BASE_PRICE;
    const emeraldPrice = emeraldBasePrice * 
                         emeraldCut.priceModifier * 
                         emeraldQuality.priceModifier * 
                         emeraldOrigin.priceModifier;
    
    // Precio del engaste
    const settingPrice = settingType.priceModifier * jewelryTypePrice;
    
    // Precio de piedras de acento (opcional)
    let accentStonesPrice = 0;
    if (request.accentStones && request.accentStones.length > 0) {
      const accentStoneIds = request.accentStones.map(stone => stone.id);
      const accentStoneTypes = await this.prisma.accentStoneType.findMany({
        where: {
          id: {
            in: accentStoneIds,
          },
        },
      });
      
      accentStonesPrice = request.accentStones.reduce((total, stone) => {
        const accentStoneType = accentStoneTypes.find(type => type.id === stone.id);
        if (accentStoneType) {
          return total + (accentStoneType.priceModifier * stone.quantity);
        }
        return total;
      }, 0);
    }
    
    // Precio del grabado (opcional)
    const engravingPrice = request.engravingText ? 150 : 0; // Precio fijo por el servicio de grabado
    
    // 3. Calcular el precio total estimado
    const basePrice = jewelryTypePrice;
    const estimatedPrice = jewelryTypePrice + metalPrice + emeraldPrice + settingPrice + accentStonesPrice + engravingPrice;
    
    // 4. Devolver la estructura de respuesta
    return {
      estimatedPrice,
      basePrice,
      priceDetails: {
        jewelryTypePrice,
        metalPrice,
        emeraldPrice,
        settingPrice,
        accentStonesPrice: accentStonesPrice > 0 ? accentStonesPrice : undefined,
        engravingPrice: engravingPrice > 0 ? engravingPrice : undefined,
      },
      currency: 'USD',
    };
  }
} 