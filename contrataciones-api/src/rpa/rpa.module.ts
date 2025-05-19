import { Module } from '@nestjs/common';
import { RpaService } from './rpa.service';
import { RpaController } from './rpa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Rpa } from './entities/rpa.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Rpa, Funcionario]),
      JwtModule.register({})
    ],
  controllers: [RpaController],
  providers: [RpaService],
})
export class RpaModule {}
