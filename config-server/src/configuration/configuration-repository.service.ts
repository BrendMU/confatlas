import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { ConfigurationMetadata } from '../schemas';
import { Configuration } from '../schemas';
import { CreateConfiguration } from '../types';
import { InjectModel } from '@nestjs/mongoose';
import { merge } from 'lodash';

@Injectable()
export class ConfigurationRepository {
    constructor(
        @InjectModel(Configuration.name)
        private configurationModel: Model<Configuration>,
        @InjectModel(ConfigurationMetadata.name)
        private configurationMetadataModel: Model<ConfigurationMetadata>,
    ) {}

    public async createNewConfiguration({
        path,
        parent,
        configuration,
    }: CreateConfiguration): Promise<void> {
        const configurationObject = new this.configurationModel({
            configuration,
            version: 0,
        });

        const configurationMetadata = new this.configurationMetadataModel({
            path,
            parent: parent ? new mongoose.Types.ObjectId(parent) : undefined,
            current: configurationObject._id,
        });

        configurationObject.metadata = configurationMetadata._id.toString();

        await configurationObject.save();
        await configurationMetadata.save();
    }

    public async getConfiguration(
        id: string,
        includeParents = true,
    ): Promise<unknown> {
        return this.fetchConfigurationObject(id, includeParents);
    }

    private async fetchConfigurationObject(
        id: string,
        includingParents = true,
    ): Promise<unknown> {
        const metadata = await this.configurationMetadataModel.findById(id);

        if (!metadata) throw new Error('The provided id was not found');

        const configurationId = metadata.current;
        const configuration =
            await this.configurationModel.findById(configurationId);
        const parentId = metadata.parent;

        if (parentId && includingParents) {
            const parentConfiguration =
                await this.fetchConfigurationObject(parentId);

            return merge(parentConfiguration, configuration?.configuration);
        }

        return configuration?.configuration;
    }
}
