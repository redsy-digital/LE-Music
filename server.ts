import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_ARTIST, INITIAL_SONGS, INITIAL_VIDEOS, INITIAL_ALBUMS, INITIAL_EVENTS, INITIAL_COMMENTS, INITIAL_ADMIN_STATS } from './src/data/mockData';
import { Song, MusicVideo, Album, EventSchedule, Comment, User } from './src/types';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory persistent database store initialized with sample data
  let artistData = { ...INITIAL_ARTIST };
  let songsData: Song[] = [...INITIAL_SONGS];
  let videosData: MusicVideo[] = [...INITIAL_VIDEOS];
  let albumsData: Album[] = [...INITIAL_ALBUMS];
  let eventsData: EventSchedule[] = [...INITIAL_EVENTS];
  let commentsData: Comment[] = [...INITIAL_COMMENTS];
  let adminStats = { ...INITIAL_ADMIN_STATS };

  let usersData: User[] = [
    {
      id: 'usr_admin',
      nome: 'LE Music (Admin)',
      email: 'admin@lemusic.com',
      senha: 'admin',
      role: 'admin',
      data_criacao: new Date().toISOString()
    }
  ];

  // API ROUTES
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'LE Music API', time: new Date().toISOString() });
  });

  // ARTIST ENDPOINTS
  app.get('/api/artist', (req, res) => {
    res.json(artistData);
  });

  app.put('/api/artist', (req, res) => {
    artistData = { ...artistData, ...req.body };
    res.json(artistData);
  });

  // SONGS ENDPOINTS
  app.get('/api/songs', (req, res) => {
    res.json(songsData);
  });

  app.post('/api/songs', (req, res) => {
    const newSong: Song = {
      id: `song_${Date.now()}`,
      titulo: req.body.titulo || 'Nova Música',
      capa: req.body.capa || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      arquivo_audio: req.body.arquivo_audio || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
      duracao: req.body.duracao || '03:30',
      duracao_segundos: req.body.duracao_segundos || 210,
      visualizacoes: 0,
      curtidas: 0,
      data_publicacao: new Date().toISOString().split('T')[0],
      genero: req.body.genero || 'Electro Pop',
      album_id: req.body.album_id,
      album_nome: req.body.album_nome,
      letras: req.body.letras || ''
    };
    songsData.unshift(newSong);
    adminStats.total_musicas += 1;
    res.status(201).json(newSong);
  });

  app.delete('/api/songs/:id', (req, res) => {
    songsData = songsData.filter(s => s.id !== req.params.id);
    adminStats.total_musicas = Math.max(0, adminStats.total_musicas - 1);
    res.json({ success: true, id: req.params.id });
  });

  app.post('/api/songs/:id/like', (req, res) => {
    const song = songsData.find(s => s.id === req.params.id);
    if (song) {
      song.curtidas += 1;
      adminStats.total_curtidas += 1;
      return res.json(song);
    }
    res.status(404).json({ error: 'Música não encontrada' });
  });

  app.post('/api/songs/:id/play', (req, res) => {
    const song = songsData.find(s => s.id === req.params.id);
    if (song) {
      song.visualizacoes += 1;
      adminStats.total_reproducoes += 1;
      return res.json(song);
    }
    res.status(404).json({ error: 'Música não encontrada' });
  });

  // VIDEOS ENDPOINTS
  app.get('/api/videos', (req, res) => {
    res.json(videosData);
  });

  app.post('/api/videos', (req, res) => {
    const newVideo: MusicVideo = {
      id: `vid_${Date.now()}`,
      titulo: req.body.titulo || 'Novo Videoclipe',
      thumbnail: req.body.thumbnail || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
      video_url: req.body.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      visualizacoes: 0,
      curtidas: 0,
      data_publicacao: new Date().toISOString().split('T')[0],
      descricao: req.body.descricao || ''
    };
    videosData.unshift(newVideo);
    adminStats.total_videoclipes += 1;
    res.status(201).json(newVideo);
  });

  app.delete('/api/videos/:id', (req, res) => {
    videosData = videosData.filter(v => v.id !== req.params.id);
    adminStats.total_videoclipes = Math.max(0, adminStats.total_videoclipes - 1);
    res.json({ success: true, id: req.params.id });
  });

  // ALBUMS ENDPOINTS
  app.get('/api/albums', (req, res) => {
    res.json(albumsData);
  });

  app.post('/api/albums', (req, res) => {
    const newAlbum: Album = {
      id: `album_${Date.now()}`,
      nome: req.body.nome || 'Novo Álbum',
      capa: req.body.capa || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
      descricao: req.body.descricao || '',
      data_lancamento: req.body.data_lancamento || new Date().toISOString().split('T')[0],
      faixas_count: req.body.faixas_count || 1,
      total_duracao: req.body.total_duracao || '30:00',
      tipo: req.body.tipo || 'Álbum'
    };
    albumsData.unshift(newAlbum);
    res.status(201).json(newAlbum);
  });

  app.delete('/api/albums/:id', (req, res) => {
    albumsData = albumsData.filter(a => a.id !== req.params.id);
    res.json({ success: true, id: req.params.id });
  });

  // EVENTS ENDPOINTS
  app.get('/api/events', (req, res) => {
    res.json(eventsData);
  });

  app.post('/api/events', (req, res) => {
    const newEvent: EventSchedule = {
      id: `evt_${Date.now()}`,
      titulo: req.body.titulo || 'Novo Show',
      local: req.body.local || 'Arena Central',
      cidade: req.body.cidade || 'São Paulo',
      pais: req.body.pais || 'Brasil',
      data: req.body.data || new Date().toISOString().split('T')[0],
      hora: req.body.hora || '21:00',
      descricao: req.body.descricao || '',
      status_ingresso: req.body.status_ingresso || 'Disponível',
      preco: req.body.preco || 'R$ 100',
      link_ingresso: '#'
    };
    eventsData.push(newEvent);
    adminStats.total_eventos += 1;
    res.status(201).json(newEvent);
  });

  app.delete('/api/events/:id', (req, res) => {
    eventsData = eventsData.filter(e => e.id !== req.params.id);
    adminStats.total_eventos = Math.max(0, adminStats.total_eventos - 1);
    res.json({ success: true, id: req.params.id });
  });

  // COMMENTS ENDPOINTS
  app.get('/api/comments', (req, res) => {
    res.json(commentsData);
  });

  app.post('/api/comments', (req, res) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      usuario_nome: req.body.usuario_nome || 'Fã do LE',
      texto: req.body.texto || '',
      data: 'Agora mesmo',
      curtidas: 0,
      item_tipo: req.body.item_tipo || 'geral',
      item_id: req.body.item_id
    };
    commentsData.unshift(newComment);
    res.status(201).json(newComment);
  });

  app.post('/api/comments/:id/like', (req, res) => {
    const comment = commentsData.find(c => c.id === req.params.id);
    if (comment) {
      comment.curtidas += 1;
      return res.json(comment);
    }
    res.status(404).json({ error: 'Comentário não encontrado' });
  });

  // STATS ENDPOINT
  app.get('/api/stats', (req, res) => {
    res.json(adminStats);
  });

  // AUTH ENDPOINTS (JWT Simulation)
  app.post('/api/auth/login', (req, res) => {
    const { email, senha } = req.body;
    if (email === 'admin@lemusic.com' && (senha === 'admin' || senha === '123456')) {
      return res.json({
        token: `jwt_token_admin_${Date.now()}`,
        user: {
          id: 'usr_admin',
          nome: 'LE Music',
          email: 'admin@lemusic.com',
          role: 'admin'
        }
      });
    }
    const existing = usersData.find(u => u.email === email && u.senha === senha);
    if (existing) {
      return res.json({
        token: `jwt_token_${existing.id}_${Date.now()}`,
        user: { id: existing.id, nome: existing.nome, email: existing.email, role: existing.role }
      });
    }
    res.status(401).json({ error: 'E-mail ou senha incorretos' });
  });

  app.post('/api/auth/register', (req, res) => {
    const { nome, email, senha } = req.body;
    if (!email || !senha || !nome) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      nome,
      email,
      senha,
      role: 'user',
      data_criacao: new Date().toISOString()
    };
    usersData.push(newUser);
    adminStats.total_usuarios += 1;
    res.status(201).json({
      token: `jwt_token_${newUser.id}_${Date.now()}`,
      user: { id: newUser.id, nome: newUser.nome, email: newUser.email, role: 'user' }
    });
  });

  // VITE / STATIC MIDDLAWARE
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LE Music Server] Running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
