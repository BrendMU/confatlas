import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfiguration } from '../types';

@Controller('configuration')
export class ConfigurationController {
    constructor(private configurationService: ConfigurationService) {}

    @Post()
    public async createNewConfiguration(
        @Body() configurationRequest: CreateConfiguration,
    ): Promise<void> {
        try {
            await this.configurationService.createNewConfiguration(
                configurationRequest,
            );
            return;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
