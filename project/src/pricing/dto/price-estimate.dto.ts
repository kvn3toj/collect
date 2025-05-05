import { IsString, IsNumber, IsOptional, ValidateNested, Min, IsArray, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class AccentStoneDto {
  @IsString()
  id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class PriceEstimateRequestDto {
  @IsString()
  jewelryTypeId: string;

  @IsString()
  metalId: string;

  @IsString()
  emeraldCutId: string;

  @IsString()
  emeraldQualityId: string;

  @IsString()
  emeraldOriginId: string;

  @IsNumber()
  @Min(0.01)
  carats: number;

  @IsString()
  settingTypeId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccentStoneDto)
  accentStones?: { id: string; quantity: number }[];

  @IsOptional()
  @IsString()
  engravingText?: string;
}

export class PriceEstimateResponseDto {
  @IsNumber()
  estimatedPrice: number;

  @IsNumber()
  basePrice: number;

  priceDetails: {
    jewelryTypePrice: number;
    metalPrice: number;
    emeraldPrice: number;
    settingPrice: number;
    accentStonesPrice?: number;
    engravingPrice?: number;
  };

  @IsString()
  currency: string;
} 