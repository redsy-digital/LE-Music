import { Artist, Song, MusicVideo, Album, EventSchedule, Comment, AdminStats } from '../types';

export const INITIAL_ARTIST: Artist = {
  id: 'art_1',
  nome_artistico: 'LE Music',
  biografia: 'LE é o projeto solo visionário que une o electro-pop futurista, elementos cibernéticos e vocais envolventes em sintetizadores analógicos e arranjos cinematográficos. Com uma presença de palco eletrizante, LE redefining a música pop urbana brasileira e internacional.',
  historia_musical: 'Iniciou sua trajetória em 2020 produzindo faixas independentes e remixando grandes sucessos. Em 2023 lançou seu primeiro EP "Cyber Pulse" alcançando o topo das paradas digitais com mais de 10 milhões de streams em menos de 6 meses.',
  foto: '/src/assets/images/le_artist_portrait_1785091126579.jpg', // or portrait asset
  conquistas: [
    '🏆 Indicado ao Prêmio Música do Futuro 2025',
    '💿 Certificado de Platina pelo Hit "Neon Horizons"',
    '🌐 +15 Milhões de streams acumulados no Spotify e Apple Music',
    '🎙️ Headliner nos festivais CyberSound & Tomorrowland Brasil'
  ],
  redes_sociais: {
    spotify: 'https://spotify.com',
    appleMusic: 'https://applemusic.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    twitter: 'https://twitter.com',
    soundCloud: 'https://soundcloud.com'
  },
  estatisticas: {
    ouvintes_mensais: 1485900,
    total_reproducoes: 28450000,
    seguidores: 890000,
    shows_realizados: 124
  }
};

// Audio samples using reliable royalty-free audio files for playback
export const INITIAL_SONGS: Song[] = [
  {
    id: 'song_1',
    titulo: 'Neon Horizons',
    capa: '/src/assets/images/le_album_cover_1785091126579.jpg',
    arquivo_audio: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=cyberpunk-synthwave-112520.mp3',
    duracao: '03:42',
    duracao_segundos: 222,
    visualizacoes: 4850200,
    curtidas: 342100,
    data_publicacao: '2025-11-15',
    genero: 'Cyber Synthwave',
    album_id: 'album_1',
    album_nome: 'Neon Horizons (Deluxe)',
    isPopular: true,
    letras: `(Sintetizadores crescentes)
Luzes da cidade queimam na escuridão
Passos de néon pela multidão
O futuro nos chama em uma só frequência
LE no comando da nova existência

[Refrão]
Neon Horizons, onde o céu não tem fim
Sinta a pulsação batendo dentro de mim
Nada mais nos para, nada nos detém
No horizonte azul eu vou além!`
  },
  {
    id: 'song_2',
    titulo: 'Electric Pulse',
    capa: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    arquivo_audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8266299.mp3?filename=futuristic-electronic-synth-10228.mp3',
    duracao: '03:15',
    duracao_segundos: 195,
    visualizacoes: 3200100,
    curtidas: 215400,
    data_publicacao: '2025-08-20',
    genero: 'Electro Pop',
    album_id: 'album_1',
    album_nome: 'Neon Horizons',
    isPopular: true,
    letras: `Corrente elétrica pelo meu corpo passa
Cada batida do grave desfaz a fumaça
Seja bem-vindo ao pulso do amanhã
Com LE na voz, a energia não tem fim.`
  },
  {
    id: 'song_3',
    titulo: 'Cyber City Lights',
    capa: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    arquivo_audio: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=synthwave-80s-11004.mp3',
    duracao: '04:05',
    duracao_segundos: 245,
    visualizacoes: 2980000,
    curtidas: 189000,
    data_publicacao: '2025-05-10',
    genero: 'Synth Pop',
    album_id: 'album_2',
    album_nome: 'Cyber Pulse EP',
    isPopular: true,
    letras: `Cidade de vidro, hologramas na ar
Nossos olhares prontos pra brilhar
Luzes cibernéticas gravadas no peito
LE cantando o ritmo perfeito.`
  },
  {
    id: 'song_4',
    titulo: 'Midnight Gravity',
    capa: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    arquivo_audio: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9932145e12.mp3?filename=future-bass-electronic-124976.mp3',
    duracao: '03:28',
    duracao_segundos: 208,
    visualizacoes: 1840000,
    curtidas: 142000,
    data_publicacao: '2025-03-01',
    genero: 'Future Bass',
    album_id: 'album_1',
    album_nome: 'Neon Horizons',
    isPopular: false,
    letras: `Gravidade zero na meia-noite azul
Flutuando em batidas de norte a sul
Deixa a música te levar pra longe daqui.`
  },
  {
    id: 'song_5',
    titulo: 'Digital Love Symphony',
    capa: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    arquivo_audio: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c39e24f469.mp3?filename=electronic-future-beats-10023.mp3',
    duracao: '03:50',
    duracao_segundos: 230,
    visualizacoes: 1450000,
    curtidas: 98000,
    data_publicacao: '2024-12-01',
    genero: 'Melodic House',
    album_id: 'album_2',
    album_nome: 'Cyber Pulse EP',
    isPopular: false,
    letras: `Códigos de paixão em tela de cristal
Amor digital em nível celestial
O som de LE toca em alta definição.`
  }
];

export const INITIAL_VIDEOS: MusicVideo[] = [
  {
    id: 'vid_1',
    titulo: 'LE - Neon Horizons (Official Music Video 4K)',
    thumbnail: '/src/assets/images/le_album_cover_1785091126579.jpg',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    visualizacoes: 3840000,
    curtidas: 290000,
    data_publicacao: '2025-11-20',
    descricao: 'Videoclipe oficial do hit "Neon Horizons" dirigido por CyberVision. Efeitos visuais em 3D, neon azul e estética futurista.'
  },
  {
    id: 'vid_2',
    titulo: 'LE - Electric Pulse (Live @ CyberFest SP 2025)',
    thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/embed/L_LUpnjgPso',
    visualizacoes: 1950000,
    curtidas: 145000,
    data_publicacao: '2025-09-05',
    descricao: 'Performance ao vivo arrebatadora de LE no maior festival de música eletrônica do país diante de 50.000 pessoas.'
  },
  {
    id: 'vid_3',
    titulo: 'LE - Cyber City Lights (Acoustic Futuristic Session)',
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80',
    video_url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
    visualizacoes: 1210000,
    curtidas: 92000,
    data_publicacao: '2025-06-12',
    descricao: 'Sessão íntima gravada no estúdio futurista de LE em São Paulo com sintetizadores de coleção e piano acústico.'
  }
];

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'album_1',
    nome: 'Neon Horizons (Deluxe)',
    capa: '/src/assets/images/le_album_cover_1785091126579.jpg',
    descricao: 'O álbum de estreia aclamado pela crítica. Uma viagem sonora futurista entre sintetizadores analógicos, graves profundos e letras poéticas.',
    data_lancamento: '2025-11-15',
    faixas_count: 12,
    total_duracao: '42:18',
    tipo: 'Álbum'
  },
  {
    id: 'album_2',
    nome: 'Cyber Pulse EP',
    capa: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    descricao: 'O EP revolucionário que revelou LE ao cenário nacional. Faixas energéticas prontas pras pistas de dança do mundo todo.',
    data_lancamento: '2025-05-10',
    faixas_count: 5,
    total_duracao: '18:40',
    tipo: 'EP'
  },
  {
    id: 'album_3',
    nome: 'Electric Remixed',
    capa: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    descricao: 'Coletânea de remixes oficiais produzidos por DJs renomados do cenário internacional de Synthwave e Future Pop.',
    data_lancamento: '2024-10-01',
    faixas_count: 8,
    total_duracao: '31:05',
    tipo: 'Álbum'
  }
];

export const INITIAL_EVENTS: EventSchedule[] = [
  {
    id: 'evt_1',
    titulo: 'LE Tour Neon Horizons - São Paulo',
    local: 'Espaço Unimed (Espaço das Américas)',
    cidade: 'São Paulo',
    pais: 'Brasil',
    data: '2026-08-15',
    hora: '22:00',
    descricao: 'O maior show da turnê Neon Horizons com palco 360°, projeções holográficas e participações especiais.',
    status_ingresso: 'Últimos Ingressos',
    preco: 'R$ 120 - R$ 380',
    link_ingresso: '#'
  },
  {
    id: 'evt_2',
    titulo: 'LE Live @ Rio Cyber Festival',
    local: 'Marina da Glória',
    cidade: 'Rio de Janeiro',
    pais: 'Brasil',
    data: '2026-08-28',
    hora: '21:30',
    descricao: 'Show exclusivo de encerramento do festival à beira-mar com iluminação de lasers azuis em toda a orla.',
    status_ingresso: 'Disponível',
    preco: 'R$ 150',
    link_ingresso: '#'
  },
  {
    id: 'evt_3',
    titulo: 'LE Tour World - Curitiba Cyber Arena',
    local: 'Pedreira Paulo Leminski',
    cidade: 'Curitiba',
    pais: 'Brasil',
    data: '2026-09-10',
    hora: '20:00',
    descricao: 'Uma experiência audiovisual imersiva ao ar livre no cenário icônico da Pedreira.',
    status_ingresso: 'Disponível',
    preco: 'R$ 110',
    link_ingresso: '#'
  },
  {
    id: 'evt_4',
    titulo: 'LE International Stage - Buenos Aires',
    local: 'Luna Park Arena',
    cidade: 'Buenos Aires',
    pais: 'Argentina',
    data: '2026-10-05',
    hora: '21:00',
    descricao: 'Primeira apresentação internacional da turnê em um dos palcos mais lendários da América Latina.',
    status_ingresso: 'Disponível',
    preco: '$ 45 USD',
    link_ingresso: '#'
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c_1',
    usuario_nome: 'Gabriel CyberSound',
    texto: 'O som do LE é simplesmente inacreditável! Neon Horizons não sai do meu repeat no Spotify!',
    data: 'Há 2 horas',
    curtidas: 42,
    item_tipo: 'musica',
    item_id: 'song_1'
  },
  {
    id: 'c_2',
    usuario_nome: 'Mariana Synth',
    texto: 'Estarei na primeira fileira do show em São Paulo! Que venha a turnê Neon Horizons!!',
    data: 'Há 5 horas',
    curtidas: 28,
    item_tipo: 'geral'
  },
  {
    id: 'c_3',
    usuario_nome: 'Lucas Electro',
    texto: 'A qualidade dos sintetizadores nessa música é nível internacional. O Brasil precisava do LE!',
    data: 'Há 1 dia',
    curtidas: 19,
    item_tipo: 'musica',
    item_id: 'song_2'
  }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  total_reproducoes: 28450000,
  total_usuarios: 45890,
  total_curtidas: 1240500,
  ouvintes_mensais: 1485900,
  total_musicas: 18,
  total_videoclipes: 6,
  total_eventos: 12,
  receita_estimada: 'R$ 485.200,00',
  reproducoes_por_mes: [
    { mes: 'Jan', reproducoes: 1200000, ouvintes: 420000 },
    { mes: 'Fev', reproducoes: 1800000, ouvintes: 510000 },
    { mes: 'Mar', reproducoes: 2400000, ouvintes: 680000 },
    { mes: 'Abr', reproducoes: 3100000, ouvintes: 890000 },
    { mes: 'Mai', reproducoes: 4500000, ouvintes: 1100000 },
    { mes: 'Jun', reproducoes: 6200000, ouvintes: 1350000 },
    { mes: 'Jul', reproducoes: 9250000, ouvintes: 1485900 }
  ],
  top_paises: [
    { pais: 'Brasil', porcentagem: 65 },
    { pais: 'Portugal', porcentagem: 12 },
    { pais: 'Argentina', porcentagem: 8 },
    { pais: 'Estados Unidos', porcentagem: 9 },
    { pais: 'Espanha', porcentagem: 6 }
  ]
};
