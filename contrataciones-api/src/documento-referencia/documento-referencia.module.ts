import { Module } from '@nestjs/common';
import { DocumentoReferenciaService } from './documento-referencia.service';
import { DocumentoReferenciaController } from './documento-referencia.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoReferencia } from './entities/documento-referencia.entity';

@Module({
  imports: [
        TypeOrmModule.forFeature([DocumentoReferencia]),
        JwtModule.register({})
    ],
  controllers: [DocumentoReferenciaController],
  providers: [DocumentoReferenciaService],
})
export class DocumentoReferenciaModule {}
