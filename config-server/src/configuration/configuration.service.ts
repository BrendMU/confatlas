import { Injectable } from '@nestjs/common';
import { CreateConfiguration } from '../types';
import { ConfigurationRepository } from './configuration-repository.service';

@Injectable()
export class ConfigurationService {
    constructor(private configurationRepository: ConfigurationRepository) {}

    public async createNewConfiguration(
        configuration: CreateConfiguration,
    ): Promise<void> {
        this.configurationRepository.createNewConfiguration(configuration);
    }

    public async getConfiguration(
        id: string,
        includeParents = true,
    ): Promise<unknown> {
        return this.configurationRepository.getConfiguration(
            id,
            includeParents,
        );
    }
}
