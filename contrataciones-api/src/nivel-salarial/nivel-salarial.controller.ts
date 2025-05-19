import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NivelSalarialService } from './nivel-salarial.service';
import { CreateNivelSalarialDto } from './dto/create-nivel-salarial.dto';
import { UpdateNivelSalarialDto } from './dto/update-nivel-salarial.dto';

@Controller('nivel-salarial')
export class NivelSalarialController {
  constructor(private readonly nivelSalarialService: NivelSalarialService) {}
/*
  @Post()
  create(@Body() createNivelSalarialDto: CreateNivelSalarialDto) {
    return this.nivelSalarialService.create(createNivelSalarialDto);
  }
*/

  @Get()
  findAll() {
    return this.nivelSalarialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelSalarialService.findOne(+id);
  }
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNivelSalarialDto: UpdateNivelSalarialDto) {
    return this.nivelSalarialService.update(+id, updateNivelSalarialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelSalarialService.remove(+id);
  }
    */
}
