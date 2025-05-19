import { Module } from '@nestjs/common';
import { TipoPlanService } from './tipo-plan.service';
import { TipoPlanController } from './tipo-plan.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPlan } from './entities/tipo-plan.entity';

@Module({
  imports: [
        TypeOrmModule.forFeature([TipoPlan]),
        JwtModule.register({})
    ],
  controllers: [TipoPlanController],
  providers: [TipoPlanService],
})
export class TipoPlanModule {}
