import { Module } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';
import { UnidadMedidaController } from './unidad-medida.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedida } from './entities/unidad-medida.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([UnidadMedida]),
      JwtModule.register({})
  ],
  controllers: [UnidadMedidaController],
  providers: [UnidadMedidaService],
})
export class UnidadMedidaModule {}
