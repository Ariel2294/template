export function extractionUniqueConstrainErrorPrismaMessage(message: string) {
  return `El ${message
    .split('Unique constraint failed on the constraint')[1]
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .replace('UNIQUE', '')} ingresado ya existe en el sistema`;
}

export function extractionForeignConstrainErrorPrismaMessage(message: string) {
  return `El id ${message
    .split('Foreign key constraint failed on the field')[1]
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()} ingresado no existe en el sistema`;
}
