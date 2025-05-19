import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoPlanService } from './tipo-plan.service';
import { CreateTipoPlanDto } from './dto/create-tipo-plan.dto';
import { UpdateTipoPlanDto } from './dto/update-tipo-plan.dto';

@Controller('tipo-plan')
export class TipoPlanController {
  constructor(private readonly tipoPlanService: TipoPlanService) {}

  // @Post()
  // create(@Body() createTipoPlanDto: CreateTipoPlanDto) {
  //   return this.tipoPlanService.create(createTipoPlanDto);
  // }

  @Get()
  findAll() {
    return this.tipoPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPlanService.findOne(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoPlanDto: UpdateTipoPlanDto) {
    return this.tipoPlanService.update(+id, updateTipoPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPlanService.remove(+id);
  }
    */
}
