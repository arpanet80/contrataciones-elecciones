import { Module } from '@nestjs/common';
import { RequerimientoplanService } from './requerimientoplan.service';
import { RequerimientoplanController } from './requerimientoplan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Requerimientoplan } from './entities/requerimientoplan.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Requerimientoplan]),
      JwtModule.register({})
  ],
  controllers: [RequerimientoplanController],
  providers: [RequerimientoplanService],
})
export class RequerimientoplanModule {}
