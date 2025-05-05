import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class JewelryTypeDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  model3dUrl?: string;

  @IsNumber()
  basePrice: number;
}

export class MetalDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  color: string;

  @IsString()
  purityLevel: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNumber()
  priceModifier: number;
}

export class EmeraldCutDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  model3dUrl?: string;

  @IsNumber()
  priceModifier: number;
}

export class EmeraldQualityDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  clarity?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsNumber()
  priceModifier: number;
}

export class EmeraldOriginDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsString()
  country: string;

  @IsNumber()
  priceModifier: number;
}

export class SettingTypeDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  model3dUrl?: string;

  @IsNumber()
  priceModifier: number;
}

export class AccentStoneTypeDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNumber()
  priceModifier: number;
}

export class ConfiguratorOptionsResponseDto {
  @IsArray()
  jewelryTypes: JewelryTypeDto[];

  @IsArray()
  metals: MetalDto[];

  @IsArray()
  emeraldCuts: EmeraldCutDto[];

  @IsArray()
  emeraldQualities: EmeraldQualityDto[];

  @IsArray()
  emeraldOrigins: EmeraldOriginDto[];

  @IsArray()
  settingTypes: SettingTypeDto[];

  @IsArray()
  accentStoneTypes: AccentStoneTypeDto[];
} 