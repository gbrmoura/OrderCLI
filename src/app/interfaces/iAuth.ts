export interface iAuth {
  codigo: number;
  nome: string;
  sobrenome?: string;
  email?: string;
  prontuario?: string;
  refreshToken: string;
  token: string;
}
