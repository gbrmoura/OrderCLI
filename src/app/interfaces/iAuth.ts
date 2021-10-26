export interface iAuth {
  codigo: number;
  previlegio: 0 | 1 | 2
  nome: string;
  sobrenome?: string;
  email?: string;
  prontuario?: string;
  refreshToken: string;
  token: string;
}
