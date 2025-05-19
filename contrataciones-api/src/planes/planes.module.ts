import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Plan } from './entities/plane.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan]),
    JwtModule.register({})
  ],
  controllers: [PlanesController],
  providers: [PlanesService],
})
export class PlanesModule {}
