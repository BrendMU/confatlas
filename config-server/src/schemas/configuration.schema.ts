import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Configuration {
    @Prop({ required: true })
    version: number = 0;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConfigurationMetadata',
    })
    metadata: string = '';

    @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
    configuration: unknown = '';
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
