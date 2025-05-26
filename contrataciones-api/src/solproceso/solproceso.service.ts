import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSolprocesoDto } from './dto/create-solproceso.dto';
import { Solproceso } from './entities/solproceso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tipoproceso } from 'src/tipoproceso/entities/tipoproceso.entity';
import { FormaAdjudicacion } from 'src/forma-adjudicacion/entities/forma-adjudicacion.entity';
import { FormaContratacion } from 'src/forma-contratacion/entities/forma-contratacion.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { MetodoSeleccionAdjudic } from 'src/metodo-seleccion-adjudic/entities/metodo-seleccion-adjudic.entity';
import { Plan } from 'src/planes/entities/plane.entity';
import { EstadoProceso } from 'src/estado-proceso/entities/estado-proceso.entity';
import { UpdateSolprocesoDto } from './dto/update-solproceso.dto';
import { Clasificador } from 'src/clasificador/entities/clasificador.entity';
import { UnidadMedida } from 'src/unidad-medida/entities/unidad-medida.entity';
import { DocumentoReferencia } from 'src/documento-referencia/entities/documento-referencia.entity';
import { NivelSalarial } from 'src/nivel-salarial/entities/nivel-salarial.entity';
import { Rpa } from 'src/rpa/entities/rpa.entity';
import { RequerimientoPlanSolproceso } from 'src/requerimiento-plan-solproceso/entities/requerimiento-plan-solproceso.entity';
import { RequerimientoProceso } from 'src/requerimiento-proceso/entities/requerimiento-proceso.entity';
import { CertificadoPresupuestario } from 'src/certificado-presupuestario/entities/certificado-presupuestario.entity';
import { DatosConsultoria } from 'src/datos-consultoria/entities/datos-consultoria.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Injectable()
export class SolprocesoService {

  constructor(
      @InjectRepository(Solproceso) private solProcesoRepository: Repository<Solproceso>,
      @InjectRepository(Tipoproceso) private tipoProcesoRepository: Repository<Tipoproceso>,
      @InjectRepository(FormaAdjudicacion) private formaAdjudicacionRepository: Repository<FormaAdjudicacion>,
      @InjectRepository(FormaContratacion) private formaContratacionRepository: Repository<FormaContratacion>,
      @InjectRepository(Funcionario) private funcionarioRepository: Repository<Funcionario>,
      @InjectRepository(MetodoSeleccionAdjudic) private metodoSeleccionRepository: Repository<MetodoSeleccionAdjudic>,
      @InjectRepository(Plan) private planRepository: Repository<Plan>,
      @InjectRepository(EstadoProceso) private estadoProcesoRepository: Repository<EstadoProceso>,
      @InjectRepository(UnidadMedida) private unidadMedidaRepository: Repository<UnidadMedida>,
      @InjectRepository(Clasificador) private clasificadorRepository: Repository<Clasificador>,
      @InjectRepository(DocumentoReferencia) private documentosRefereniaRepository: Repository<DocumentoReferencia>,
      @InjectRepository(NivelSalarial) private nivelSalarialRepository: Repository<NivelSalarial>,
      @InjectRepository(Rpa) private rpaRepository: Repository<Rpa>,
      @InjectRepository(RequerimientoPlanSolproceso) private reqPlanSolProcesoRepository: Repository<RequerimientoPlanSolproceso>,
      @InjectRepository(RequerimientoProceso) private reqProcesoRepository: Repository<RequerimientoProceso>,
      @InjectRepository(CertificadoPresupuestario) private certificadoPresupRepository: Repository<CertificadoPresupuestario>,
      @InjectRepository(DatosConsultoria) private consultoriaRepository: Repository<DatosConsultoria>,
      @InjectRepository(Proveedor) private proveedorRepository: Repository<Proveedor>,
      
  ) {}

  async create(createSolprocesoDto: CreateSolprocesoDto): Promise<Solproceso | any> {
    try {

          const tipoproc = await this.tipoProcesoRepository.findOne({ where: { id: createSolprocesoDto.idtipoproceso } });
          if (!tipoproc) {
            throw new NotFoundException('El tipo de proceso introducido NO EXISTE');
          }

          const adjudicacion = await this.formaAdjudicacionRepository.findOne({ where: { id: createSolprocesoDto.idformaadjudic } });
          if (!adjudicacion) {
            throw new NotFoundException('La forma de adjudicacion introducido NO EXISTE');
          }

          const contratacion = await this.formaContratacionRepository.findOne({ where: { id: createSolprocesoDto.idformacontratacion } });
          if (!contratacion) {
            throw new NotFoundException('La forma de contratacion introducido NO EXISTE');
          }

          const funcionario = await this.funcionarioRepository.findOne({ where: { id: createSolprocesoDto.idusuariosolicitante } });
          if (!funcionario) {
            throw new NotFoundException('El funcionario solicitante introducido NO EXISTE');
          }

          const metodoSelecc = await this.metodoSeleccionRepository.findOne({ where: { id: createSolprocesoDto.idmetodoseleccionadjudic } });
          if (!metodoSelecc) {
            throw new NotFoundException('El metdo de seleccion introducido NO EXISTE');
          }

          const aprobador = await this.funcionarioRepository.findOne({ where: { id: createSolprocesoDto.idusuarioaprobador } });
          if (!aprobador) {
            throw new NotFoundException('El usuario aprobador introducido NO EXISTE');
          }

          const plqn = await this.planRepository.findOne({ where: { id: createSolprocesoDto.idplan } });
          if (!plqn) {
            throw new NotFoundException('El plan operativo introducido NO EXISTE');
          }

          const estadoproceso = await this.estadoProcesoRepository.findOne({ where: { id: createSolprocesoDto.idestadoproceso } });
          if (!estadoproceso) {
            throw new NotFoundException('Introducido un estad de proeso no valido');
          }

          const solicitud = this.solProcesoRepository.create(createSolprocesoDto);
          solicitud.fechasolicitud = new Date();

          const corr = await this.solProcesoRepository.findOne({
            where: { idunidadoperativa: solicitud.idunidadoperativa },
            order: { correlativounidad: 'DESC' },
          });

          if (corr) {
            solicitud.correlativounidad = corr.correlativounidad+1;
          }
          else {
            solicitud.correlativounidad = 1;
          }
          

          const rpa = await this.rpaRepository.findOne({ where: { activo: true } });
          if (!rpa) {
            throw new NotFoundException('NO EXISTE RPA Activo');
          }

          solicitud.idusuariorpa = rpa.idusuario;
          solicitud.preciounitariototal = solicitud.preciototal;

          const solRegistrado = await this.solProcesoRepository.save(solicitud);  

          /////////////////////////////////////////////////////
          const consultoria: DatosConsultoria = {
            idsolproceso: solRegistrado.id,
            nivelsalarial: createSolprocesoDto.idnivelsalarial,
            tiempocontrato: createSolprocesoDto.plazoentrega,
            honorariomensual: createSolprocesoDto.honorariomensual,
            observaciones: createSolprocesoDto.observaciones
          }

          const consultRegistrado = await this.consultoriaRepository.save(consultoria);

          /////////////////////////////////////////////////////
          const certArray: CertificadoPresupuestario[] = createSolprocesoDto.certificacion.registros.map(element => {
            const req = new CertificadoPresupuestario();
            req.idsolproceso = solRegistrado.id;
            req.numeropreventivo = element.preventivo;
            req.fechaemision = element.fecha;
            req.importe = element.importe;
            req.partida = element.partida;
            return req;
          });

          const certRegistrado = await this.certificadoPresupRepository.save(certArray);
    
          /////////////////////////////////////////////////////////////

          const reqArray: RequerimientoPlanSolproceso[] = createSolprocesoDto.requerimientos.map(element => {
            const req = new RequerimientoPlanSolproceso();
            req.idsolproceso = solRegistrado.id;
            req.idrequerimientoplan = element.id;
            req.importe = element.actual;
            return req;
          });

          const reqeRgistrado = await this.reqPlanSolProcesoRepository.save(reqArray);

          //////////////////////////////////////////////////////////////////

          const itemsArray:RequerimientoProceso[] = createSolprocesoDto.itemsProceso.map(element => {
            const item = new RequerimientoProceso();
            item.idsolproceso = solRegistrado.id;
            item.idrequerimientoplan = element.idrequerimientoplan;
            item.idunidadmedida = element.idunidadmedida;
            item.cantidad = element.cantidad,
            // item.idproveedor = 
            item.partida = element.partida,
            item.preciounitario = element.preciounitario,
            item.preciototal = element.total,
            item.requerimiento = element.requerimiento
            return item;
          });

          const itemsRgistrado = await this.reqProcesoRepository.save(itemsArray);

          /////////////////////////////////////////////////////////////////

          const proveedor: Proveedor = {
            idsolicitud: solRegistrado.id,
            razonsocial: createSolprocesoDto.razonsocial.toUpperCase(),
            representantelegal: createSolprocesoDto.representantelegal.toUpperCase(),
            cirepresentantelegal: createSolprocesoDto.cirepresentantelegal,
            nit: createSolprocesoDto.nit,
          }

          const proveedorRegistrado = await this.proveedorRepository.save(proveedor);

          ///////////////////////////////////////////////////////////////////

          solRegistrado.certificacion = certRegistrado;
          solRegistrado.requerimientos = reqeRgistrado;
          solRegistrado.itemsProceso = itemsRgistrado;

          // console.log(solRegistrado);

          // console.log(solRegistrado);
          
          return solRegistrado;


      } catch (error) {
        throw new InternalServerErrorException('No se puedo agregar el registro:' + error);
      }
  }
    
    

  async findAll() : Promise<Solproceso[]> {
      const query =  await this.solProcesoRepository.find({
        where: { activo: true},
        order: { id: "ASC"     }
      });
      
      return query
  }
  
  async findOne(id: number) : Promise<Solproceso> {
    const query = await this.solProcesoRepository.findOne({ 
      where: { 
        id,
        activo: true
        },
    });

    if (!query) {
      throw new NotFoundException('No existe el registro solicitado');
    }

    return query;
  }

  async findByIdPlanIdUnidadOpe(idplan: number, idunidadorganizacional: number) : Promise<Solproceso[]> {
    const query = await this.solProcesoRepository.find({ 
      where: { 
        idplan: idplan,
        idunidadoperativa: idunidadorganizacional,
        activo: true
        },
        order: { id: "ASC"     }
    });

    if (!query) {
      throw new NotFoundException('No existe el registro solicitado');
    }

    return query;
  }

  async getCombos(): Promise<any> {

    const tipoproceso = await this.tipoProcesoRepository.find({
      where: {
        activo: true,
      },
      order: { id: "ASC" }
    });

    const formaAdjudic = await this.formaAdjudicacionRepository.find({
      where: {
        activo: true,
      },
      order: { id: "ASC" }
    });

    const formaContrat = await this.formaContratacionRepository.find({
      where: {
        activo: true,
      },
      order: { id: "ASC" }
    });

    const metodoSeleccion = await this.metodoSeleccionRepository.find({
      where: {
        activo: true,
      },
      order: { id: "ASC" }
    });

    const estadoProceso = await this.estadoProcesoRepository.find({
      where: {
        activo: true,
      },
      order: { id: "ASC" }
    });

    const unidadMedida = await this.unidadMedidaRepository.find({
      where: {
        activo: true,
      },
      order: { descripcion: "ASC" }
    });

    const clasificadorPartidas = await this.clasificadorRepository.find({
      order: { partida: "ASC" }
    });

    const documentoReferencia = await this.documentosRefereniaRepository.find({
      where: {
        activo: true,
      },
      order: { id: "ASC" }
    });

    const nivelsalarial = await this.nivelSalarialRepository.find({
      where: {
        activo: true,
      },
      order: { id: "ASC" }
    });

    // let combosObject: { [key: string]: any[] } = {
    let combosObject = {
      tipoproceso: tipoproceso,
      formaAdjudic: formaAdjudic,
      formaContrat: formaContrat,
      metodoSeleccion: metodoSeleccion,
      estadoProceso: estadoProceso,
      unidadMedida: unidadMedida,
      clasificadorPartidas: clasificadorPartidas,
      documentoReferencia: documentoReferencia,
      nivelSalarial: nivelsalarial
    };

    return combosObject;
  }


  /*
  async getReportInfo(idproceso: number): Promise<Solproceso> {
    try {
      const solicitud = await this.solProcesoRepository.findOneOrFail({
        where: { id: idproceso, activo: true },
      });

      const fechaLiteral = this.formatDate(solicitud.fechasolicitud);

      const numero = 3400.50;
      const numeroEnLetras = this.convertirNumeroALiteral(numero);
      console.log(numeroEnLetras);  

      // const estadoproceso = await this.rpaRepository.findOneOrFail({
      //   where: { id: solicitud.idusuariorpa },
      // });

      return solicitud;

    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('No se encontró el registro solicitado');
      } else {
        throw error; // Lanzar otros tipos de errores si no son EntityNotFoundError
      }
    }
  }

  formatDate(date: string | Date): string {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 
      'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    const d = new Date(date);  // Convierte la cadena ISO 8601 o el objeto Date a un objeto Date
    const day = String(d.getDate()).padStart(2, '0'); // Día con 2 dígitos
    const month = months[d.getMonth()]; // Obtiene el nombre del mes
    const year = d.getFullYear(); // Obtiene el año
  
    return `${day} de ${month} de ${year}`;
  }
  
  convertirNumeroALiteral(numero: number): string {
    const unidades = [
      '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
      'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
    ];
  
    const decenas = [
      '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'
    ];
  
    const centenas = [
      '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
    ];
  
    // Función que convierte un número en texto (hasta 999)
    const numToWords = (num: number): string => {
      if (num === 0) return '';
      if (num < 20) return unidades[num];
      if (num < 100) {
        let decena = Math.floor(num / 10);
        let unidad = num % 10;
        return `${decenas[decena]} ${unidades[unidad]}`.trim();
      }
      if (num < 1000) {
        let centena = Math.floor(num / 100);
        let resto = num % 100;
        return `${centenas[centena]} ${numToWords(resto)}`.trim();
      }
      return `${num}`; // Para valores mayores de 999 puedes agregar más lógica si lo necesitas
    };
  
    // Convertir la parte entera
    const parteEntera = Math.floor(numero);
    const parteDecimal = Math.round((numero % 1) * 100);  // Redondea la parte decimal a 2 decimales
  
    // Convertir la parte entera a letras
    const enteroEnLetras = numToWords(parteEntera);
  
    // Si la parte decimal es 0, solo devuelve la parte entera
    if (parteDecimal === 0) {
      return `${enteroEnLetras} Bolivianos`;
    }
  
    // Si tiene parte decimal, la agregamos con el formato "xx/100"
    return `${enteroEnLetras} ${parteDecimal}/100 Bolivianos`;
  }
  
  




  // urlBaseUsuarios = 'http://10.51.15.41:3001/';
      // asi se usa:   const res = await this.getFuncionario(solicitud.idusuariosolicitante)
  // async getFuncionario(idfuncionario:number) {
  //   console.log(`${this.urlBaseUsuarios}funcionarios/${idfuncionario}`);
  //   try {

  //     const response = await firstValueFrom(this.httpService.get(`${this.urlBaseUsuarios}funcionarios/${idfuncionario}`));
  //     return response.data; 
  //   } catch (error) {
  //     throw new Error('Error al consultar la API externa');
  //   }
  // }


  */

  async update(id: number, updateSolprocesoDto: UpdateSolprocesoDto)  : Promise<Solproceso> {
      try {
        const plan  = await this.solProcesoRepository.findOne({ where: { id } });
        if (!plan) {
          throw new NotFoundException('No existe el registro solicitado');
        }
  
        (updateSolprocesoDto as any).updatedAt = new Date();
        
        await this.solProcesoRepository.update({ id }, updateSolprocesoDto);
        return await this.solProcesoRepository.findOne({ where: { id } });
  
      } catch (error) {
        throw new InternalServerErrorException('No se pudo actualizar el registro:' + error);
      }
    }
    
  async remove(id: number): Promise<void> {
    try {
      const tipo  = await this.solProcesoRepository.findOne({ where: { id } });
      if (!tipo) {
        throw new NotFoundException('No existe el registro solicitado');
      }
      
      await this.solProcesoRepository.update({ id }, {activo: false});

    } catch (error) {
      throw new InternalServerErrorException('No se puedo eliminar el registro:' + error);
    }
  }

  
}
