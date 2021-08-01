export interface AlertaMaestroInterface {
    id: string;
    version: number;
    active: boolean;
    tipoAlerta: number;
    nombreRegla: string;
    origenRegla: string;
    rolMedico: boolean;
    rolAuditor: boolean;
    auditable: boolean;
    mensajeAlerta: string;
}
