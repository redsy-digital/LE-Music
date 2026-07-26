export interface User {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  foto?: string;
  role: 'user' | 'admin';
  data_criacao: string;
}

export interface SocialLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  soundCloud?: string;
}

export interface Artist {
  id: string;
  nome_artistico: string;
  biografia: string;
  historia_musical: string;
  foto: string;
  conquistas: string[];
  redes_sociais: SocialLinks;
  estatisticas: {
    ouvintes_mensais: number;
    total_reproducoes: number;
    seguidores: number;
    shows_realizados: number;
  };
}

export interface Song {
  id: string;
  titulo: string;
  capa: string;
  arquivo_audio: string;
  duracao: string;
  duracao_segundos: number;
  visualizacoes: number;
  curtidas: number;
  data_publicacao: string;
  genero?: string;
  album_id?: string;
  album_nome?: string;
  letras?: string;
  isPopular?: boolean;
}

export interface MusicVideo {
  id: string;
  titulo: string;
  thumbnail: string;
  video_url: string;
  visualizacoes: number;
  curtidas: number;
  data_publicacao: string;
  descricao?: string;
}

export interface Album {
  id: string;
  nome: string;
  capa: string;
  descricao: string;
  data_lancamento: string;
  faixas_count: number;
  total_duracao?: string;
  tipo: 'Álbum' | 'EP' | 'Single';
}

export interface EventSchedule {
  id: string;
  titulo: string;
  local: string;
  cidade: string;
  pais: string;
  data: string;
  hora: string;
  descricao: string;
  status_ingresso: 'Disponível' | 'Últimos Ingressos' | 'Esgotado';
  preco?: string;
  link_ingresso?: string;
}

export interface Comment {
  id: string;
  usuario_nome: string;
  usuario_foto?: string;
  texto: string;
  data: string;
  curtidas: number;
  item_tipo: 'musica' | 'video' | 'geral';
  item_id?: string;
}

export interface AdminStats {
  total_reproducoes: number;
  total_usuarios: number;
  total_curtidas: number;
  ouvintes_mensais: number;
  total_musicas: number;
  total_videoclipes: number;
  total_eventos: number;
  receita_estimada: string;
  reproducoes_por_mes: { mes: string; reproducoes: number; ouvintes: number }[];
  top_paises: { pais: string; porcentagem: number }[];
}
