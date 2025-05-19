import { Module } from '@nestjs/common';
import { DatosPacService } from './datos-pac.service';
import { DatosPacController } from './datos-pac.controller';
import { DatosPac } from './entities/datos-pac.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([DatosPac]),
      JwtModule.register({})
  ],
  controllers: [DatosPacController],
  providers: [DatosPacService],
})
export class DatosPacModule {}
