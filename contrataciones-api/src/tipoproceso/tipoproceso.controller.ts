import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoprocesoService } from './tipoproceso.service';
import { CreateTipoprocesoDto } from './dto/create-tipoproceso.dto';
import { UpdateTipoprocesoDto } from './dto/update-tipoproceso.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('tipoproceso')
export class TipoprocesoController {
  constructor(private readonly tipoprocesoService: TipoprocesoService) {}

  /*
  @Post()
  create(@Body() createTipoprocesoDto: CreateTipoprocesoDto) {
    return this.tipoprocesoService.create(createTipoprocesoDto);
  }
*/

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.tipoprocesoService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoprocesoService.findOne(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoprocesoDto: UpdateTipoprocesoDto) {
    return this.tipoprocesoService.update(+id, updateTipoprocesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoprocesoService.remove(+id);
  }
    */
}
