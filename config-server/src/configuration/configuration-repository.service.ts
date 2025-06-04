import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { ConfigurationMetadata } from '../schemas';
import { Configuration } from '../schemas';
import { CreateConfiguration } from '../types';
import { InjectModel } from '@nestjs/mongoose';

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
            parent: parent
                ? new mongoose.Schema.Types.ObjectId(parent)
                : undefined,
            current: configurationObject._id,
        });

        configurationObject.metadata = configurationMetadata._id.toString();

        await configurationObject.save();
        await configurationMetadata.save();
    }
}
