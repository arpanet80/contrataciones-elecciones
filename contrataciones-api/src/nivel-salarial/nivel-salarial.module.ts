import { Module } from '@nestjs/common';
import { NivelSalarialService } from './nivel-salarial.service';
import { NivelSalarialController } from './nivel-salarial.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelSalarial } from './entities/nivel-salarial.entity';

@Module({
  imports: [
        TypeOrmModule.forFeature([NivelSalarial]),
        JwtModule.register({})
      ],
  controllers: [NivelSalarialController],
  providers: [NivelSalarialService],
  exports: [NivelSalarialService], //
})
export class NivelSalarialModule {}
