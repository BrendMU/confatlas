import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'configuration-metadatas' })
export class ConfigurationMetadata {
    @Prop({ required: true })
    path: string = '';

    @Prop({
        type: Types.ObjectId,
        ref: 'ConfigurationMetadata',
    })
    parent: string = '';

    @Prop({ required: true, type: Types.ObjectId, ref: 'Configuration' })
    current: string = '';
}

export const ConfigurationMetadataSchema = SchemaFactory.createForClass(
    ConfigurationMetadata,
);
