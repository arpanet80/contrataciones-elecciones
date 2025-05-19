import { Module } from '@nestjs/common';
import { ClasificadorService } from './clasificador.service';
import { ClasificadorController } from './clasificador.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clasificador } from './entities/clasificador.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Clasificador]),
      JwtModule.register({})
  ],
  controllers: [ClasificadorController],
  providers: [ClasificadorService],
})
export class ClasificadorModule {}
