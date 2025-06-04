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
}
