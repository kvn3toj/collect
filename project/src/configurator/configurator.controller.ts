import { Controller, Get } from '@nestjs/common';
import { ConfiguratorService } from './configurator.service';
import { ConfiguratorOptionsResponseDto } from './dto/configurator-options.dto';

@Controller('api/configurator')
export class ConfiguratorController {
  constructor(private readonly configuratorService: ConfiguratorService) {}

  @Get('options')
  async getOptions(): Promise<ConfiguratorOptionsResponseDto> {
    return this.configuratorService.getConfiguratorOptions();
  }
} 