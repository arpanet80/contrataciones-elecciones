// Interfaz para los datos del documento
export interface DocumentoData {
  nombre: string;
  fecha: string;
  contenido: string;
  [key: string]: any; // Para permitir campos adicionales
}