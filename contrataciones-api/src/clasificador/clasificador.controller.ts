import { Auth } from 'src/auth/decorators/auth.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClasificadorService } from './clasificador.service';
import { CreateClasificadorDto } from './dto/create-clasificador.dto';
import { UpdateClasificadorDto } from './dto/update-clasificador.dto';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('clasificador')
export class ClasificadorController {
  constructor(private readonly clasificadorService: ClasificadorService) {}

  /*
  @Post()
  create(@Body() createClasificadorDto: CreateClasificadorDto) {
    return this.clasificadorService.create(createClasificadorDto);
  }
    */

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.clasificadorService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':partida')
  findOne(@Param('partida') partida: string) {
    return this.clasificadorService.findOne(partida);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClasificadorDto: UpdateClasificadorDto) {
    return this.clasificadorService.update(+id, updateClasificadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clasificadorService.remove(+id);
  }
    */
}
