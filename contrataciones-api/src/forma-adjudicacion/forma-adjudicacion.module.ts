import { Module } from '@nestjs/common';
import { FormaAdjudicacionService } from './forma-adjudicacion.service';
import { FormaAdjudicacionController } from './forma-adjudicacion.controller';
import { FormaAdjudicacion } from './entities/forma-adjudicacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([FormaAdjudicacion]),
      JwtModule.register({})
  ],
  controllers: [FormaAdjudicacionController],
  providers: [FormaAdjudicacionService],
  exports: [FormaAdjudicacionService],
})
export class FormaAdjudicacionModule {}
