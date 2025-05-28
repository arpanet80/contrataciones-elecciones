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
    private readonly consultoriaService: DatosConsultoriaService
  ) {}
  
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
      if (!consultor ) {
        throw new BadRequestException('Hubo un error al recuperar la informacion de consultoria');
      }

      data = {
        fechaliteral: fechaliteral,
        cite:  `TIC-PDSE-EG-Nº ${sol.id}/${anio}`,
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
        nivelsalarial: consultor[0].nivelsalarial.toString(),
        honorariomensual: consultor[0].honorariomensual.toString(),
        numerocasos: consultor[0].numerocasos.toString(),
        observaciones: consultor[0].observaciones
      };
      
    }
    else {    //// Si no es personal

      const proveedor = await this.proveedorService.findOne(idSol);
      if (!proveedor ) {
        throw new BadRequestException('Hubo un error al recuperar la informacion del proveedor');
      }

      let arrayItems: Requerimiento[] = [];
      let indice = 0;
      let totalProceso:number = 0;

      reqSolProceso.forEach(req => {
        arrayItems.push({
          numero: indice+1,
          requerimiento: req.requerimiento,
          unidad: req.idunidadmedida.toString(),
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
        cite:  `TIC-PDSE-EG-Nº ${sol.id}/${anio}`,
        objeto: sol.objetocontratacion.toUpperCase(),
        precionumeral: this.formatearDosDecimales(sol.preciototal).toString(),
        precioliteral: this.numeroALetras(sol.preciototal),
        partidanumeral: reqSolProceso[0].partida.toString(),
        partidaliteral: partida.descripcion,
        solicitante: this.toTitleCase(funcio.nombres + " " + funcio.paterno + " " + funcio.materno),
        cargosolicitante: funcio.cargo.toUpperCase(),
        superior:'Guido Callapa Coro',
        cargosuperior: 'GESTIÓN DE LA INFORMACIÓN DE BASE DE DATOS',
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

        /*
        items: [
          {
            numero: 1,
            requerimiento: 'Extensor HDMI',
            unidad: 'Pza',
            cantidad: 1,
            precioUnitario: 945,
            precioTotal: 945,
          },
          {
            numero: 2,
            requerimiento: 'Unidad Flash USB',
            unidad: 'Pza',
            cantidad: 5,
            precioUnitario: 130,
            precioTotal: 650,
          },
        ],
        */
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