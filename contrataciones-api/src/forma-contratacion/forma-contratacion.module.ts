import { Module } from '@nestjs/common';
import { FormaContratacionService } from './forma-contratacion.service';
import { FormaContratacionController } from './forma-contratacion.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaContratacion } from './entities/forma-contratacion.entity';

@Module({
  imports: [
        TypeOrmModule.forFeature([FormaContratacion]),
        JwtModule.register({})
  ],
  controllers: [FormaContratacionController],
  providers: [FormaContratacionService],
})
export class FormaContratacionModule {}
