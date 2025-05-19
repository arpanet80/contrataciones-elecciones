import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetodoSeleccionAdjudicService } from './metodo-seleccion-adjudic.service';
import { CreateMetodoSeleccionAdjudicDto } from './dto/create-metodo-seleccion-adjudic.dto';
import { UpdateMetodoSeleccionAdjudicDto } from './dto/update-metodo-seleccion-adjudic.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('metodo-seleccion-adjudic')
export class MetodoSeleccionAdjudicController {
  constructor(private readonly metodoSeleccionAdjudicService: MetodoSeleccionAdjudicService) {}

  /*
  @Post()
  create(@Body() createMetodoSeleccionAdjudicDto: CreateMetodoSeleccionAdjudicDto) {
    return this.metodoSeleccionAdjudicService.create(createMetodoSeleccionAdjudicDto);
  }
*/
  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.metodoSeleccionAdjudicService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metodoSeleccionAdjudicService.findOne(+id);
  }
  /*

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetodoSeleccionAdjudicDto: UpdateMetodoSeleccionAdjudicDto) {
    return this.metodoSeleccionAdjudicService.update(+id, updateMetodoSeleccionAdjudicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metodoSeleccionAdjudicService.remove(+id);
  }
    */
}
