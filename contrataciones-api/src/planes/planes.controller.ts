import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Auth(Role.Admin)
  @Post()
  create(@Body() createPlaneDto: CreatePlaneDto) {
    return this.planesService.create(createPlaneDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.planesService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planesService.findOne(+id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaneDto: UpdatePlaneDto) {
    return this.planesService.update(+id, updatePlaneDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planesService.remove(+id);
  }
}
