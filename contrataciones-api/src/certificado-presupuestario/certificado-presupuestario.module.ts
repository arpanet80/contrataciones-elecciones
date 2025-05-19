import { Module } from '@nestjs/common';
import { CertificadoPresupuestarioService } from './certificado-presupuestario.service';
import { CertificadoPresupuestarioController } from './certificado-presupuestario.controller';
import { CertificadoPresupuestario } from './entities/certificado-presupuestario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([CertificadoPresupuestario]),
      JwtModule.register({})
  ],
  controllers: [CertificadoPresupuestarioController],
  providers: [CertificadoPresupuestarioService],
})
export class CertificadoPresupuestarioModule {}
