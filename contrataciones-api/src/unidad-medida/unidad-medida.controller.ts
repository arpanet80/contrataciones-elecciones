import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('unidad-medida')
export class UnidadMedidaController {
  constructor(private readonly unidadMedidaService: UnidadMedidaService) {}

  /*
  @Post()
  create(@Body() createUnidadMedidaDto: CreateUnidadMedidaDto) {
    return this.unidadMedidaService.create(createUnidadMedidaDto);
  }
    */

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.unidadMedidaService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadMedidaService.findOne(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadMedidaDto: UpdateUnidadMedidaDto) {
    return this.unidadMedidaService.update(+id, updateUnidadMedidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadMedidaService.remove(+id);
  }
    */
}
