import { Module } from '@nestjs/common';
import { InformeverificacionService } from './informeverificacion.service';
import { InformeverificacionController } from './informeverificacion.controller';
import { Informeverificacion } from './entities/informeverificacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Informeverificacion]),
    JwtModule.register({}),
  ],
  controllers: [InformeverificacionController],
  providers: [InformeverificacionService],
  exports: [InformeverificacionService],
})
export class InformeverificacionModule {}
