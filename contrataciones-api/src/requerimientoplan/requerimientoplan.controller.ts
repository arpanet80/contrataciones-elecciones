import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequerimientoplanService } from './requerimientoplan.service';
import { CreateRequerimientoplanDto } from './dto/create-requerimientoplan.dto';
import { UpdateRequerimientoplanDto } from './dto/update-requerimientoplan.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('requerimientoplan')
export class RequerimientoplanController {
  constructor(private readonly requerimientoplanService: RequerimientoplanService) {}

  @Auth(Role.Admin)
  @Post()
  create(@Body() createRequerimientoplanDto: CreateRequerimientoplanDto) {
    return this.requerimientoplanService.create(createRequerimientoplanDto);
  }

  @Auth(Role.Admin)
  @Post('/array')
  createArray(@Body() createRequerimientoplanDto: CreateRequerimientoplanDto[]) {
    return this.requerimientoplanService.createArrayPlan(createRequerimientoplanDto);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get()
  findAll() {
    return this.requerimientoplanService.findAll();
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requerimientoplanService.findOne(+id);
  }

  @Auth(Role.Admin, Role.Usuario)
  @Get(':idplan/:idunidadorganizacional')
  findByPlan(@Param('idplan') idplan: number, @Param('idunidadorganizacional') idunidadorganizacional: number) {
    return this.requerimientoplanService.findByPlanUnidadOrg(+idplan, +idunidadorganizacional );
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequerimientoplanDto: UpdateRequerimientoplanDto) {
    return this.requerimientoplanService.update(+id, updateRequerimientoplanDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requerimientoplanService.remove(+id);
  }

  @Auth(Role.Admin)
  @Post('eliminaarray')
  removeByArray(@Body() ids: number[]) {
    return this.requerimientoplanService.removeByArray(ids);
  }

  @Auth(Role.Admin)
  @Delete('eliminabyplan/:idplan/:idunidadorganizacional')
  removeByPlanUO(@Param('idplan') idplan: number, @Param('idunidadorganizacional') idunidadorganizacional: number) {
    return this.requerimientoplanService.removeByPlanUO(+idplan, +idunidadorganizacional);
  }
}
