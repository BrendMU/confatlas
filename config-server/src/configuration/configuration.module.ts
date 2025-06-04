import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationRepository } from './configuration-repository.service';
import {
    Configuration,
    ConfigurationSchema,
} from 'src/schemas/configuration.schema';
import {
    ConfigurationMetadata,
    ConfigurationMetadataSchema,
} from 'src/schemas/configuration-metadata.schema';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://atlas:atlas@localhost:27017'),
        MongooseModule.forFeature([
            { name: Configuration.name, schema: ConfigurationSchema },
            {
                name: ConfigurationMetadata.name,
                schema: ConfigurationMetadataSchema,
            },
        ]),
    ],
    controllers: [ConfigurationController],
    providers: [ConfigurationRepository, ConfigurationService],
})
export class ConfigurationModule {}
