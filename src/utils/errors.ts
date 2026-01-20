import { ApiError } from '../services/api';

export function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      return 'No se encontraron resultados con esos filtros.';
    }
    return 'No se pudo cargar la informacion. Intenta nuevamente.';
  }

  if (error instanceof Error) {
    return error.message || 'Ocurrio un error inesperado.';
  }

  return 'Ocurrio un error inesperado.';
}
