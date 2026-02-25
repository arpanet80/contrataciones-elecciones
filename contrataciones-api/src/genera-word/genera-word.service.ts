import { Injectable, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { SolprocesoService } from 'src/solproceso/solproceso.service';
import { DatosProceso, Requerimiento } from './entities/datos-proceso';
import { RequerimientoProcesoService } from 'src/requerimiento-proceso/requerimiento-proceso.service';
import { ClasificadorService } from 'src/clasificador/clasificador.service';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';
import { FormaAdjudicacionService } from 'src/forma-adjudicacion/forma-adjudicacion.service';
import { MetodoSeleccionAdjudicService } from 'src/metodo-seleccion-adjudic/metodo-seleccion-adjudic.service';
import { ProveedorService } from 'src/proveedor/proveedor.service';
import { DatosConsultoriaService } from 'src/datos-consultoria/datos-consultoria.service';
import { NivelSalarialService } from 'src/nivel-salarial/nivel-salarial.service';
import { UnidadMedidaService } from 'src/unidad-medida/unidad-medida.service';
import { UnidadMedida } from 'src/unidad-medida/entities/unidad-medida.entity';
import { DatosInformeVerificacion, Item, Recomendacion } from './entities/datos-informe-verificacion';
import { InformeverificacionService } from 'src/informeverificacion/informeverificacion.service';
import { InformeRecepcionService } from 'src/informe-recepcion/informe-recepcion.service';
import { InformeRecepcionResponsableAdminService } from 'src/informe-recepcion-responsable-admin/informe-recepcion-responsable-admin.service';
import { DatosInforRecepcion, RequerimientoRecep } from './entities/datos-informe-recepcion';

@Injectable()
export class GeneraWordService {
  constructor(
    private readonly solprocesoService: SolprocesoService,
    private readonly reqSolProcesoService: RequerimientoProcesoService,
    private readonly clasificadorService: ClasificadorService,
    private readonly funcionarioService: FuncionariosService,
    private readonly formAdjService: FormaAdjudicacionService,
    private readonly metodosSelService: MetodoSeleccionAdjudicService,
    private readonly proveedorService: ProveedorService,
    private readonly consultoriaService: DatosConsultoriaService,
    private readonly nivelSalarialService: NivelSalarialService,
    private readonly unidadMedidaService: UnidadMedidaService,
    private readonly informeVerifService: InformeverificacionService,
    private readonly informeRecepService: InformeRecepcionService,
    private readonly funcionarioAdminRecepcionService: InformeRecepcionResponsableAdminService
  ) {}
  
  async generaInformeRecepcion(idSol: number): Promise<any> {     //Buffer
   
    // Verificar que los datos necesarios estén presentes
    if (!idSol || idSol <= 0) {
      throw new BadRequestException('Faltan datos requeridos para generar el documento');
    }
    
    ////// Armamos el objeto para pasarle al word //////////
    const inforRecep = await this.informeRecepService.findOneByIdSol(idSol);
    if (!inforRecep) {
        throw new BadRequestException('Hubo un error al recuperar la informacion del informe');
    }

    const sol = await this.solprocesoService.findOne(inforRecep.idsolicitud);
    const reqSolProceso = await this.reqSolProcesoService.findByIdSolProceso(inforRecep.idsolicitud);
    const funcio = await this.funcionarioService.findOne(sol.idusuariosolicitante);
    const funcioRecepAdmin = await this.funcionarioAdminRecepcionService.findOne(inforRecep.idresponsablerecepcionadmin);
    const unidadesmedida = await this.unidadMedidaService.findAll();

    if (!sol || !reqSolProceso || !funcio || !funcioRecepAdmin || !unidadesmedida) {
      throw new BadRequestException('Hubo un error en la solicitud, reuqerimientos o funcionario');
    }

    const reqs: Item[] = reqSolProceso.map(requerimientoProceso => ({
      detalle: requerimientoProceso.requerimiento,
    }));

    const anio = this.obtenerAnio(new Date())

    // Obtener la fecha (YYYY-MM-DD)
    const year = inforRecep.fecharecepcion.getFullYear();
    const month = (inforRecep.fecharecepcion.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses van de 0 a 11
    const day = inforRecep.fecharecepcion.getDate().toString().padStart(2, '0');
    const fechaRecepcion = this.formatearFecha( `${year}-${month}-${day}` );

    // Obtener la hora (HH:MM:SS)
    const hours = inforRecep.fecharecepcion.getHours().toString().padStart(2, '0');
    const minutes = inforRecep.fecharecepcion.getMinutes().toString().padStart(2, '0');
    const hora = `${hours}:${minutes}`;
    // const seconds = inforRecep.fecharecepcion.getSeconds().toString().padStart(2, '0');
    // const hora = `${hours}:${minutes}:${seconds}`;

    //// Arma los requerimientos ///////////
    let arrayItems: RequerimientoRecep[] = [];
    let indice = 0;
    let totalProceso:number = 0;

    reqSolProceso.forEach(req => {
      arrayItems.push({
        numero: indice+1,
        requerimiento: req.requerimiento,
        unidad: this.getUnidadMedidaPorId(req.idunidadmedida, unidadesmedida),
        cantidad: req.cantidad,
        precioUnitario: req.preciounitario,
        precioTotal: req.preciototal
      })
      indice++;
      totalProceso = totalProceso + Number(req.preciototal); 
    });
    
    let data: DatosInforRecepcion
    
    //// es proceso de Personal
    if (sol.idtipoproceso !== 3) {
      
      data = {

        cite:  `TIC-PDSE-ESN-Nº ${inforRecep.idsolicitud}-R/${anio}`,
        solicitante: this.toTitleCase(funcio.nombres + " " + funcio.paterno + " " + funcio.materno),
        cargosolicitante: funcio.cargo.toUpperCase(),
        responsablerecepcionadmin: funcioRecepAdmin.nombrecompleto,
        cargoresponsablerecepcionadmin: funcioRecepAdmin.cargo.toUpperCase(),
        objeto: sol.objetocontratacion.toUpperCase(),
        fechainformeliteral: this.formatearFecha(inforRecep.fechainforme),
        citememounidadsol: inforRecep.citememounidadsol,
        citememoadmin: inforRecep.citememoadmin,
        fechamemosliteral: this.formatearFecha(inforRecep.fechamemo),
        fecharecepcionliteral: fechaRecepcion,
        horarecepcionliteral: hora,
        items: arrayItems,
        totalLietral: this.numeroALetras(totalProceso),
        totalTotalGeneral: totalProceso

      };
      
      try {

      let templatePath: any;
      console.log(">>", sol.idtipoproceso);

      switch (sol.idtipoproceso) {
        case 1:
          templatePath = path.resolve(
            process.cwd(),
            'src',
            'genera-word',
            'templates',
            'RecepcionAdquisicion.docx',
          );  
          break;
      
        case 2:
          templatePath = path.resolve(
            process.cwd(),
            'src',
            'genera-word',
            'templates',
            'RecepcionServicio.docx',
          );  
          break;
      }

        // const templatePath = path.resolve(
        //   process.cwd(),
        //   'src',
        //   'genera-word',
        //   'templates',
        //   'RecepcionAdquisicion.docx',
        // );

        // Verificar que la plantilla existe
        if (!fs.existsSync(templatePath)) {
          throw new BadRequestException(`No se encontró la plantilla en: ${templatePath}`);
        }

        // Leer el archivo plantilla
        const content = fs.readFileSync(templatePath, 'binary');

        // Cargar en PizZip
        const zip = new PizZip(content);

        // Cargar en Docxtemplater
        const doc = new Docxtemplater(zip, {
          delimiters: { start: '[[', end: ']]' },
          paragraphLoop: true,
          linebreaks: true
        });

        try {
          // Usar directamente el método render con los datos
          doc.render(data);
        } catch (error) {
          console.error('Error al renderizar el documento:', error);
          
          // Proporcionar mensaje de error más detallado si es posible
          if (error.properties && error.properties.errors) {
            const errorMessages = error.properties.errors
              .map(e => `Variable "${e.properties.name}": ${e.message}`)
              .join(', ');
            throw new BadRequestException(`Error al renderizar la plantilla: ${errorMessages}`);
          }
          
          throw new BadRequestException('Error al generar el documento');
        }

        // Obtener el documento generado como buffer
        const buf = doc.getZip().generate({ type: 'nodebuffer' });
        return buf;
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        console.error('Error en el servicio:', error);
        throw new BadRequestException('Error al generar el documento');
      }


    }

  }

  async generaInformeVerificacionDocumentos(id: number): Promise<any> {     //Buffer
   
    // Verificar que los datos necesarios estén presentes
    if (!id || id <= 0) {
      throw new BadRequestException('Faltan datos requeridos para generar el documento');
    }

    ////// Armamos el objeto para pasarle al word //////////
    const infoverif = await this.informeVerifService.findOne(id);
    if (!infoverif) {
        throw new BadRequestException('Hubo un error al recuperar la informacion del informe');
    }

    const sol = await this.solprocesoService.findOne(infoverif.idsolicitud);
    const reqSolProceso = await this.reqSolProcesoService.findByIdSolProceso(infoverif.idsolicitud);
    const funcio = await this.funcionarioService.findOne(sol.idusuariosolicitante);
    if (!sol || !reqSolProceso || !funcio) {
      throw new BadRequestException('Hubo un error en la solicitud, reuqerimientos o funcionario');
    }

    const reqs: Item[] = reqSolProceso.map(requerimientoProceso => ({
      detalle: requerimientoProceso.requerimiento,
    }));

    const fechaliteral = this.formatearFecha(infoverif.fechainforme);
    const anio = this.obtenerAnio(new Date())

    let ofertatecnica= '';
    let ofertatecnicaextra= '';
    let recomendaciones: Recomendacion[] = [];

    //// todo correcto 
    if (infoverif.ofertatecnica === true && infoverif.cumpleofertaadj === true &&  infoverif.cumpledocumentos === true ) {
      ofertatecnica = `El proponente ${infoverif.razonsocial} SI CUMPLE con las especificaciones técnicas requeridas por la unidad solicitante en el presente proceso de contratación.`;
      
      recomendaciones.push({detalle: 'Proseguir con los pasos establecidos en el Reglamento de Contratación de Bienes y Servicios del Órgano Electoral Plurinacional para el presente proceso de contratación.'});

    }

      /// No entrego oferta y 
    if (infoverif.ofertatecnica === false && infoverif.cumpleofertaadj === false ) {   
      ofertatecnica = `El proponente ${infoverif.razonsocial} NO PRESENTÓ su propuesta,técnica por lo que no se pudo evidenciar en qué consistía la oferta económica que realizó en el sistema SICOES, por lo que NO CUMPLE con las especificaciones técnicas del proceso de contratación.`;
      ofertatecnicaextra = '\nPese a que la unidad de Contrataciones realizó el envío de las especificaciones técnicas del presente proceso de contratación, el proponente no tuvo en cuenta este documento para la presentación de su propuesta.';

      recomendaciones.push({detalle: 'Se recomienda adjudicar a la empresa que ocupa el siguiente puesto en el cuadro de propuestas del resumen de propuestas presentadas a SICOES conforme se establece en la normativa legal vigente.  '});
      recomendaciones.push({detalle: 'Proseguir con los pasos establecidos en el Reglamento de Contratación de Bienes y Servicios del Órgano Electoral Plurinacional para el presente proceso de contratación.'});
    }

    // Si la oferta NO CUMPLE
    if ( infoverif.ofertatecnica === true && infoverif.cumpleofertaadj === false ) {
      ofertatecnica = 'Justificar porque no cumplio la oferta.......................';

      recomendaciones.push({detalle: 'Se recomienda adjudicar a la empresa que ocupa el siguiente puesto en el cuadro de propuestas del resumen de propuestas presentadas a SICOES conforme se establece en la normativa legal vigente.  '});
      recomendaciones.push({detalle: 'Proseguir con los pasos establecidos en el Reglamento de Contratación de Bienes y Servicios del Órgano Electoral Plurinacional para el presente proceso de contratación.'});
    }


    // si hay oferta y CUMPLE pero no cumple docs
    if (infoverif.ofertatecnica === true && infoverif.cumpleofertaadj === true &&  infoverif.cumpledocumentos === false ) {
      ofertatecnica = `El proponente ${infoverif.razonsocial} SI CUMPLE con las especificaciones técnicas requeridas por la unidad solicitante en el presente proceso de contratación.`;
      
      recomendaciones.push({detalle: 'Se recomienda adjudicar a la empresa que ocupa el siguiente puesto en el cuadro de propuestas del resumen de propuestas presentadas a SICOES conforme se establece en la normativa legal vigente.  '});
      recomendaciones.push({detalle: 'Proseguir con los pasos establecidos en el Reglamento de Contratación de Bienes y Servicios del Órgano Electoral Plurinacional para el presente proceso de contratación.'});
    }

    let data: DatosInformeVerificacion
    
    //// es proceso de Personal
    if (sol.idtipoproceso !== 3) {
      
      data = {
        cite:  `TIC-PDSE-ESN-Nº ${infoverif.idsolicitud}-V-${infoverif.id}/${anio}`,
        solicitante: this.toTitleCase(funcio.nombres + " " + funcio.paterno + " " + funcio.materno),
        cargosolicitante: funcio.cargo.toUpperCase(),
        fechaliteral: fechaliteral,
        objeto: sol.objetocontratacion.toUpperCase(),
        razonsocial: infoverif.razonsocial.toUpperCase(),
        representantelegal: this.toTitleCase(infoverif.representantelegal),
        fechaentrega: this.formatearFechaSalida(infoverif.fechaentrega.toString()),
        items: reqs,
        cedula: infoverif.cedula,
        copianitCumple: infoverif.copianit === true ? 'X' : '',
        copianitNoCumple: infoverif.copianit === false ? 'X' : '',
        certificadonitCumple: infoverif.certificadonit === true ? 'X' : '',
        certificadonitNoCumple: infoverif.certificadonit === false ? 'X' : '',
        seprecCumple: infoverif.seprec === true ? 'X' : '',
        seprecNoCumple: infoverif.seprec === false ? 'X' : '',
        copiaciCumple: infoverif.copiaci === true ? 'X' : '',
        copiaciNoCumple: infoverif.copiaci === false ? 'X' : '',
        gestoraCumple:  infoverif.gestora === true ? 'X' : '',
        gestoraNoCumple:  infoverif.gestora === false ? 'X' : '',
        sigepCumple: infoverif.sigep === true ? 'X' : '',
        sigepNoCumple: infoverif.sigep === false ? 'X' : '',
        formulario2bCumple: infoverif.formulario2b === true ? 'X' : '',
        formulario2bNoCumple: infoverif.formulario2b === false ? 'X' : '',
        rupeCumple: infoverif.formulario2b === true ? 'X' : '',
        rupeNoCumple: infoverif.formulario2b === false ? 'X' : '',
        detallecumplimientoofertatecnica: ofertatecnica,
        detallecumplimientoofertatecnicaEXTRA: ofertatecnicaextra,

        cumpledocumentos: infoverif.cumpledocumentos === true ? `SI CUMPLE` : 'NO CUMPLE',
        cumpleoferta: infoverif.cumpleofertaadj === true ? `SI CUMPLE` : 'NO CUMPLE',
        cumpledocumentosX: infoverif.cumpledocumentos === true ? 'X' : '',
        noCumpledocumentosX: infoverif.cumpledocumentos === false ? 'X' : '',
        cumpleofertaX: infoverif.cumpleofertaadj === true ?  'X' : '',
        noCumpleofertaX: infoverif.cumpleofertaadj === false ?  'X' : '',
        
        recomendaciones: recomendaciones
      };
      
      try {
        const templatePath = path.resolve(
          process.cwd(),
          'src',
          'genera-word',
          'templates',
          'InformeVerificacion.docx',
        );

        // Verificar que la plantilla existe
        if (!fs.existsSync(templatePath)) {
          throw new BadRequestException(`No se encontró la plantilla en: ${templatePath}`);
        }

        // Leer el archivo plantilla
        const content = fs.readFileSync(templatePath, 'binary');

        // Cargar en PizZip
        const zip = new PizZip(content);

        // Cargar en Docxtemplater
        const doc = new Docxtemplater(zip, {
          delimiters: { start: '[[', end: ']]' },
          paragraphLoop: true,
          linebreaks: true
        });

        try {
          // Usar directamente el método render con los datos
          doc.render(data);
        } catch (error) {
          console.error('Error al renderizar el documento:', error);
          
          // Proporcionar mensaje de error más detallado si es posible
          if (error.properties && error.properties.errors) {
            const errorMessages = error.properties.errors
              .map(e => `Variable "${e.properties.name}": ${e.message}`)
              .join(', ');
            throw new BadRequestException(`Error al renderizar la plantilla: ${errorMessages}`);
          }
          
          throw new BadRequestException('Error al generar el documento');
        }

        // Obtener el documento generado como buffer
        const buf = doc.getZip().generate({ type: 'nodebuffer' });
        return buf;
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        console.error('Error en el servicio:', error);
        throw new BadRequestException('Error al generar el documento');
      }


    }

  }

  async generaProcesoAdquisicion(idSol: number): Promise<Buffer> {
   
    // Verificar que los datos necesarios estén presentes
    if (!idSol || idSol <= 0) {
      throw new BadRequestException('Faltan datos requeridos para generar el documento');
    }

    ////// Armamos el objeto para pasarle al word //////////
    const sol = await this.solprocesoService.findOne(idSol);
    const reqSolProceso = await this.reqSolProcesoService.findByIdSolProceso(idSol);
    if (!sol || !reqSolProceso  ) {
      throw new BadRequestException('Hubo un error en la solicitud o en los reuqerimientos');
    }

    const partida = await this.clasificadorService.findOne(reqSolProceso[0].partida.toString());
    const funcio = await this.funcionarioService.findOne(sol.idusuariosolicitante);
    const formAdju = await this.formAdjService.findOne(sol.idformaadjudic);
    const metodoSel = await this.metodosSelService.findOne(sol.idmetodoseleccionadjudic);

    if (!funcio || !partida || !formAdju || !metodoSel ) {
        throw new BadRequestException('Hubo un error al recuperar algun parametro para el rporte');
    }

    const fechaliteral = this.formatearFecha(sol.fechasolicitud);
    const anio = this.obtenerAnio(new Date())

    let data: DatosProceso

    //// es proceso de Personal
    if (sol.idtipoproceso === 3) {
      
      const consultor = await this.consultoriaService.findByIdSolProceso(idSol);
      const nivelsalarial = await this.nivelSalarialService.findOne(consultor[0].nivelsalarial);

      if (!consultor || !nivelsalarial) {
        throw new BadRequestException('Hubo un error al recuperar la informacion de consultoria o nivel salarial');
      }

      data = {
        fechaliteral: fechaliteral,
        cite:  `TIC-PDSE-ESN-Nº ${sol.id}/${anio}`,
        objeto: sol.objetocontratacion.toUpperCase(),
        precionumeral: this.formatearDosDecimales(sol.preciototal).toString(),
        precioliteral: this.numeroALetras(sol.preciototal),
        partidanumeral: reqSolProceso[0].partida.toString(),
        partidaliteral: partida.descripcion,
        solicitante: this.toTitleCase(funcio.nombres + " " + funcio.paterno + " " + funcio.materno),
        cargosolicitante: funcio.cargo,
        superior:'Juan Perez Perez',
        cargosuperior: 'JEFE DE SECCIÓN DE TECNOLOGÍAS',
        plazonumeral: sol.plazoentrega.toString(),
        plazoliteral: this.quitarUltimaPalabra(this.numeroALetras(sol.plazoentrega)),
        formaadjudicacion: formAdju.detalle,
        metodoseleccion: metodoSel.detalle,
        codigopac: sol.codigopac ? sol.codigopac.toString()  : '',

        //////////// personal ///////////////
        nivelsalarial: nivelsalarial.nivelsalarial,
        honorariomensual: consultor[0].honorariomensual.toString(),
        numerocasos: consultor[0].numerocasos.toString(),
        observaciones: consultor[0].observaciones
      };
      
    }
    else {    //// Si no es personal

      const proveedor = await this.proveedorService.findOne(idSol);
      const unidadesmedida = await this.unidadMedidaService.findAll();
      if (!proveedor || !unidadesmedida) {
        throw new BadRequestException('Hubo un error al recuperar la informacion del proveedor o unidad de medida');
      }

      let arrayItems: Requerimiento[] = [];
      let indice = 0;
      let totalProceso:number = 0;

      reqSolProceso.forEach(req => {
        arrayItems.push({
          numero: indice+1,
          requerimiento: req.requerimiento,
          unidad: this.getUnidadMedidaPorId(req.idunidadmedida, unidadesmedida),
          cantidad: req.cantidad,
          precioUnitario: req.preciounitario,
          precioTotal: req.preciototal
        })
        indice++;
        totalProceso = totalProceso + Number(req.preciototal); 
      });

      // const data: DatosProceso = {
      data = {
        fechaliteral: fechaliteral,
        cite:  `TIC-PDSE-ESN-Nº ${sol.id}/${anio}`,
        objeto: sol.objetocontratacion.toUpperCase(),
        precionumeral: this.formatearDosDecimales(sol.preciototal).toString(),
        precioliteral: this.numeroALetras(sol.preciototal),
        partidanumeral: reqSolProceso[0].partida.toString(),
        partidaliteral: partida.descripcion,
        solicitante: this.toTitleCase(funcio.nombres + " " + funcio.paterno + " " + funcio.materno),
        cargosolicitante: funcio.cargo.toUpperCase(),
        superior:'Lic. Daniel Henrry Mororías La Torre',
        cargosuperior: 'JEFE DE SECCIÓN DE TECNOLOGÍAS',
        plazonumeral: sol.plazoentrega.toString(),
        plazoliteral: this.quitarUltimaPalabra(this.numeroALetras(sol.plazoentrega)),
        formaadjudicacion: formAdju.detalle,
        metodoseleccion: metodoSel.detalle,
        codigopac: sol.codigopac ? sol.codigopac.toString()  : '',

        /////////////// EMPRESA /////////////////////////////////
        razonsocial: proveedor.razonsocial,
        representantelegal: proveedor.representantelegal,
        cirepresentantelegal: proveedor.cirepresentantelegal,
        nit: proveedor.nit,

        items: arrayItems,

        totalLietral: this.numeroALetras(totalProceso),
        totalTotalGeneral: totalProceso

      };
    }
    try {

      let templatePath: any;
      switch (sol.idtipoproceso) {
        case 1:
          templatePath = path.resolve(
            process.cwd(),
            'src',
            'genera-word',
            'templates',
            'ProcesoAdquisicion.docx',
          );  

          break;

        case 2:
          templatePath = path.resolve(
            process.cwd(),
            'src',
            'genera-word',
            'templates',
            'ProcesoServicio.docx',
          );  
          break;
        case 3:
          templatePath = path.resolve(
            process.cwd(),
            'src',
            'genera-word',
            'templates',
            'ProcesoPersonal.docx',
          );  
          break;
      
        // default:
        //   break;
      }
      
      /*
      const templatePath = path.resolve(
        process.cwd(),
        'src',
        'genera-word',
        'templates',
        'ProcesoAdquisicion.docx',
      );
      */

      // Verificar que la plantilla existe
      if (!fs.existsSync(templatePath)) {
        throw new BadRequestException(`No se encontró la plantilla en: ${templatePath}`);
      }

      // Leer el archivo plantilla
      const content = fs.readFileSync(templatePath, 'binary');

      // Cargar en PizZip
      const zip = new PizZip(content);

      // Cargar en Docxtemplater
      const doc = new Docxtemplater(zip, {
        delimiters: { start: '[[', end: ']]' },
        paragraphLoop: true,
        linebreaks: true
      });

      try {
        // Usar directamente el método render con los datos
        doc.render(data);
      } catch (error) {
        console.error('Error al renderizar el documento:', error);
        
        // Proporcionar mensaje de error más detallado si es posible
        if (error.properties && error.properties.errors) {
          const errorMessages = error.properties.errors
            .map(e => `Variable "${e.properties.name}": ${e.message}`)
            .join(', ');
          throw new BadRequestException(`Error al renderizar la plantilla: ${errorMessages}`);
        }
        
        throw new BadRequestException('Error al generar el documento');
      }

      // Obtener el documento generado como buffer
      const buf = doc.getZip().generate({ type: 'nodebuffer' });
      return buf;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error en el servicio:', error);
      throw new BadRequestException('Error al generar el documento');
    }


  }

  generateFromTemplate(data: DocumentoData): Buffer {
    // Verificar que los datos necesarios estén presentes
    if (!data.nombre || !data.fecha || !data.contenido) {
      throw new BadRequestException('Faltan datos requeridos: nombre, fecha y contenido son obligatorios');
    }

    try {
      const templatePath = path.resolve(
        process.cwd(),
        'src',
        'genera-word',
        'templates',
        'carta.docx',
      );

      // Verificar que la plantilla existe
      if (!fs.existsSync(templatePath)) {
        throw new BadRequestException(`No se encontró la plantilla en: ${templatePath}`);
      }

      // Leer el archivo plantilla
      const content = fs.readFileSync(templatePath, 'binary');

      // Cargar en PizZip
      const zip = new PizZip(content);

      // Cargar en Docxtemplater
      const doc = new Docxtemplater(zip, {
        delimiters: { start: '[[', end: ']]' },
        paragraphLoop: true,
        linebreaks: true
      });

      try {
        // Usar directamente el método render con los datos
        doc.render(data);
      } catch (error) {
        console.error('Error al renderizar el documento:', error);
        
        // Proporcionar mensaje de error más detallado si es posible
        if (error.properties && error.properties.errors) {
          const errorMessages = error.properties.errors
            .map(e => `Variable "${e.properties.name}": ${e.message}`)
            .join(', ');
          throw new BadRequestException(`Error al renderizar la plantilla: ${errorMessages}`);
        }
        
        throw new BadRequestException('Error al generar el documento');
      }

      // Obtener el documento generado como buffer
      const buf = doc.getZip().generate({ type: 'nodebuffer' });
      return buf;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error en el servicio:', error);
      throw new BadRequestException('Error al generar el documento');
    }
  }

  ////////////// UTILIDADES ////////////////////////

  // procesarRequerimientos(reqSolProceso: RequerimientoProceso[]): Item[] {
  //   const reqs: Item[] = reqSolProceso.map(requerimientoProceso => ({
  //     detalle: requerimientoProceso.requerimiento,
  //   }));
  //   return reqs;
  // }
  
  getUnidadMedidaPorId(id: number, unidades: UnidadMedida[]): string | null {
  const unidad = unidades.find(u => u.id === id);
  return unidad ? unidad.descripcion : null;
}

  formatearDosDecimales(valor: any): string {
    const numero = Number(valor);

    if (isNaN(numero)) {
      throw new Error('El valor proporcionado no es un número válido.');
    }

    return numero.toFixed(2);
  }

  formatearFecha(fecha: Date | string): string {
    if (typeof fecha === 'string') {
      fecha = new Date(fecha);
    }
    
    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
      throw new Error('Fecha inválida');
    }

    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${dia} de ${mes} de ${anio}`;
  }

  formatearFechaSalida(fechaPostgres: string): string | null {
    if (!fechaPostgres) {
      return null;
    }
    // Asumimos que la fecha de Postgres viene en formato YYYY-MM-DD
    const partes = fechaPostgres.split('-');
    if (partes.length !== 3) {
      return null; // La cadena no tiene el formato esperado
    }
    const anio = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}-${mes}-${anio}`;
  }

  obtenerAnio(fecha: Date | string): number {
    if (typeof fecha === 'string') {
      fecha = new Date(fecha);
    }

    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
      throw new Error('Fecha inválida');
    }

    return fecha.getFullYear();
  }

  toTitleCase(texto: string): string {
    return texto
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  }

  quitarUltimaPalabra(frase: string): string {
    const palabras = frase.trim().split(' ');
    palabras.pop(); // Elimina la última palabra
    return palabras.join(' ');
  }

  numeroALetras(numero: number): string {
    const UNIDADES = [
      '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
      'diez', 'once', 'doce', 'trece', 'catorce', 'quince',
      'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
    ];

    const DECENAS = [
      '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
      'sesenta', 'setenta', 'ochenta', 'noventa'
    ];

    const CENTENAS = [
      '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
      'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
    ];

    function convertirMenorAMil(n: number): string {
      if (n === 0) return '';
      if (n < 20) return UNIDADES[n];
      if (n < 100) {
        const unidad = n % 10;
        const decena = Math.floor(n / 10);
        return unidad === 0
          ? DECENAS[decena]
          : (decena === 2 ? 'veinti' + UNIDADES[unidad] : DECENAS[decena] + ' y ' + UNIDADES[unidad]);
      }

      if (n === 100) return 'cien';
      const centenas = Math.floor(n / 100);
      const resto = n % 100;
      return CENTENAS[centenas] + (resto > 0 ? ' ' + convertirMenorAMil(resto) : '');
    }

    function convertirEntero(n: number): string {
      if (n === 0) return 'cero';

      let partes = [];

      const miles = Math.floor(n / 1000);
      const resto = n % 1000;

      if (miles > 0) {
        if (miles === 1) {
          partes.push('mil');
        } else {
          partes.push(convertirMenorAMil(miles) + ' mil');
        }
      }

      if (resto > 0) {
        partes.push(convertirMenorAMil(resto));
      }

      return partes.join(' ');
    }

    // 🔢 Separar parte entera y decimal
    const entero = Math.floor(numero);
    const decimal = Math.round((numero - entero) * 100);
    const letras = convertirEntero(entero).trim();
    const centavos = decimal.toString().padStart(2, '0');

    const resultado = `${letras} ${centavos}/100`;

    // ⬆️ Capitalizar primera letra
    return resultado.charAt(0).toUpperCase() + resultado.slice(1);
  }

}