export class DataUser {
  id?: string;
  version?: number;
  active?: true;
  username?: string;
  correoElectronico?: string;
  usuarioCognitoId?: string;
  tipoDocumentoId?: string;
  numeroDocumento?: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  sexoId?: string;
  roles?: [];
  rol?: string;
  medico?: {
    prestadorMedicoId?: string;
  };
  auditor?: {
    financiadorId?: string;
  }
}
