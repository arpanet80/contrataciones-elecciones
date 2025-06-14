import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { GeneraWordService } from './genera-word.service';
import { copySync } from 'fs-extra';

@Controller('genera-word')
export class GeneraWordController {
  constructor(private readonly generaWordService: GeneraWordService) {}

  @Post('descargar-docx')
  async descargar(
    @Body() datosDocumento: DocumentoData,
    @Res() res: Response
  ) {
    const docBuffer = this.generaWordService.generateFromTemplate(datosDocumento);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=resultado.docx');
    res.send(docBuffer);
  }

  ///////////////////////////////////////////

  @Post('proceso-adquisicion')
  async descargarProceso(@Body() body: any, @Res() res: Response) {
    const idSol = Number(body.idSol); 

    const docBuffer = await this.generaWordService.generaProcesoAdquisicion(idSol);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=resultado.docx');
    res.send(docBuffer);
  }

  @Post('informe-verificacion')
  async descargarInformeVerif(@Body() body: any, @Res() res: Response) {
    const id = Number(body.id); 

    const docBuffer = await this.generaWordService.generaInformeVerificacionDocumentos(id);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=resultado.docx');
    res.send(docBuffer);
  }

  @Post('informe-recepcion')
  async descargarInformeRecep(@Body() body: any, @Res() res: Response) {
    const idSol = Number(body.idSol); 

    const docBuffer = await this.generaWordService.generaInformeRecepcion(idSol);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=resultado.docx');
    res.send(docBuffer);
  }
}