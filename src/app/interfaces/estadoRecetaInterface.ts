export interface EstadoRecetaInterface {
    id: string;
    version: number;
    active: boolean;
    codigo: string;
    descripcion: string;
    prioridad: number;
    prioridadAuditoria: number;
}
