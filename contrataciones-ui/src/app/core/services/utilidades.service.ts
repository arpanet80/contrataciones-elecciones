import { DatePipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService  {
  public datePipe = inject(DatePipe);

  fechaCorta(fecha: Date): string {
    return this.datePipe.transform(fecha, 'dd-MM-yyyy') || ''; 
  }

  soloAnio(fecha: Date): string {
    return this.datePipe.transform(fecha, 'yyyy') || ''; 
  }

  calcularPlazoEntrega(plazo: number): { meses: string | number, dias: number } {
    if (plazo < 30) {
      return { meses: 0, dias: plazo }; // ✅ Menos de 30 días → meses vacío
    } else {
      return { meses: Math.floor(plazo / 30), dias: plazo % 30 }; // ✅ Más de 30 días → meses y días
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

    toTitleCase(str: string): string {
      return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      });
    }

    numeroALetras(num: number): string {
      const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const  especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const  decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const  centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

      if (num === 0) return 'cero';
      if (num === 100) return 'cien';
  
      let letras = '';
  
      if (num >= 1000) {
        const miles = Math.floor(num / 1000);
        letras += miles === 1 ? 'mil' : `${this.numeroALetras(miles)} mil`;
        num %= 1000;
      }
  
      if (num >= 100) {
        const cientos = Math.floor(num / 100);
        letras += ` ${centenas[cientos]}`;
        num %= 100;
      }
  
      if (num >= 10 && num < 20) {
        letras += ` ${especiales[num - 10]}`;
        return letras.trim();
      }
  
      if (num >= 20) {
        const dec = Math.floor(num / 10);
        letras += ` ${decenas[dec]}`;
        num %= 10;
        if (num > 0) letras += ` y ${unidades[num]}`;
        return letras.trim();
      }
  
      if (num > 0) {
        letras += ` ${unidades[num]}`;
      }
  
      return letras.trim();
    }

    formatearNumero(num: number): string {
      const entero = Math.floor(num);
      const decimal = Math.round((num - entero) * 100);
      const letrasEntero = this.numeroALetras(entero);
      const decimalStr = decimal.toString().padStart(2, '0'); // Asegura dos dígitos en la parte decimal
      return `${letrasEntero.charAt(0).toUpperCase() + letrasEntero.slice(1)} ${decimalStr}/100 Bolivianos`;
    }
    
}