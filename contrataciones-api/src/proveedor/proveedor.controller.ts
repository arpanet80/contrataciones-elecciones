import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-plane.dto';

@Controller('planes')
export class ProveedorController {
  constructor(private readonly proveedoresService: ProveedorService) {}

  @Auth(Role.Admin, Role.Usuario)
  @Post()
  create(@Body() createPlaneDto: CreateProveedorDto) {
    return this.proveedoresService.create(createPlaneDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':idsol')
  findOne(@Param('idsol') idsol: string) {
    return this.proveedoresService.findOne(+idsol);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaneDto: UpdateProveedorDto) {
    return this.proveedoresService.update(+id, updatePlaneDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedoresService.remove(+id);
  }
}
