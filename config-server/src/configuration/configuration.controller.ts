import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Query,
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

    @Get('/:id')
    public async getConfiguration(
        @Param('id') id: string,
        @Query('includeParents') includeParents: boolean,
    ): Promise<unknown> {
        try {
            return await this.configurationService.getConfiguration(
                id,
                Boolean(includeParents),
            );
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
