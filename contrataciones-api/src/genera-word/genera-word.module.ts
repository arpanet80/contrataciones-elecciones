import { Module } from '@nestjs/common';
import { GeneraWordService } from './genera-word.service';
import { GeneraWordController } from './genera-word.controller';

@Module({
  controllers: [GeneraWordController],
  providers: [GeneraWordService],
})
export class GeneraWordModule {}
