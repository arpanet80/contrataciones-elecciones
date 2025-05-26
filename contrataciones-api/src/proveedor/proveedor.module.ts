import { Module } from '@nestjs/common';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './entities/proveedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor]),
    JwtModule.register({})
  ],
  controllers: [ProveedorController],
  providers: [ProveedorService],
  exports: [ProveedorService],
})
export class ProveedorModule {}
