import { Module } from '@nestjs/common';
import { TipoprocesoService } from './tipoproceso.service';
import { TipoprocesoController } from './tipoproceso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipoproceso } from './entities/tipoproceso.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([Tipoproceso]),
      JwtModule.register({})
  ],
  controllers: [TipoprocesoController],
  providers: [TipoprocesoService],
})
export class TipoprocesoModule {}
