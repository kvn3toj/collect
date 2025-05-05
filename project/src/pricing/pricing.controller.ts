import { Controller, Post, Body } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PriceEstimateRequestDto, PriceEstimateResponseDto } from './dto/price-estimate.dto';

@Controller('api/pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post('estimate')
  async calculatePriceEstimate(
    @Body() request: PriceEstimateRequestDto,
  ): Promise<PriceEstimateResponseDto> {
    return this.pricingService.calculatePriceEstimate(request);
  }
} 