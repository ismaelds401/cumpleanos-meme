export interface GameConfig {
  pointsPerCorrectAnswer: number;
  pointsForCustomization: number;
  pointsPerTreasureKey: number;
  pointsForCreation: number;
  pointsForHeartFlight: number;
  allowSkipAfterWrongAnswer: boolean;
  puzzleRows: number;
  puzzleColumns: number;
  puzzleImageUrl: string;
  customizationTarget: OutfitSelection;
  customizationOptions: ClothingCategory[];
  treasurePath: TreasurePoint[];
  creationElements: CreationElement[];
  creationTargetElementIds: string[];
  heartFlightRequiredClicks: number;
  heartFlightTimeoutMs: number;
  loveLetterParagraphs: string[];
}

export type ClothingCategoryId = 'polo' | 'pantalon' | 'zapatillas' | 'gorra';

export interface OutfitSelection {
  polo: string | null;
  pantalon: string | null;
  zapatillas: string | null;
  gorra: string | null;
}

export interface ClothingOption {
  id: string;
  label: string;
  color: string;
}

export interface ClothingCategory {
  id: ClothingCategoryId;
  label: string;
  options: ClothingOption[];
}

export interface TreasureAlternative {
  id: string;
  label: string;
}

export interface TreasurePoint {
  id: number;
  title: string;
  imageUrl: string;
  correctAnswer: string;
  alternatives: TreasureAlternative[];
  position: {
    left: number;
    top: number;
  };
}

export type CreationElementKind = 'good' | 'bad';
export type CreationElementIcon = 'heart' | 'hands' | 'sun' | 'star' | 'shield' | 'flower' | 'cloud';

export interface CreationElement {
  id: string;
  label: string;
  description: string;
  kind: CreationElementKind;
  icon: CreationElementIcon;
}

export const GAME_CONFIG: GameConfig = {
  pointsPerCorrectAnswer: 10,
  pointsForCustomization: 30,
  pointsPerTreasureKey: 15,
  pointsForCreation: 50,
  pointsForHeartFlight: 70,
  allowSkipAfterWrongAnswer: true,
  puzzleRows: 3,
  puzzleColumns: 3,
  puzzleImageUrl: 'assets/img/Arbol_claro.jpeg',
  customizationTarget: {
    polo: 'polo-crema',
    pantalon: 'pantalon-negro',
    zapatillas: 'zapatillas-blancas',
    gorra: 'gorra-dorada'
  },
  customizationOptions: [
    {
      id: 'polo',
      label: 'Blusa',
      options: [
        { id: 'polo-rosa', label: 'Rosa', color: '#fb7185' },
        { id: 'polo-lila', label: 'Lila', color: '#a78bfa' },
        { id: 'polo-celeste', label: 'Celeste', color: '#38bdf8' },
        { id: 'polo-crema', label: 'Crema', color: '#fde68a' }
      ]
    },
    {
      id: 'pantalon',
      label: 'Pantalon',
      options: [
        { id: 'pantalon-blanco', label: 'Blanca', color: '#f8fafc' },
        { id: 'pantalon-rosa', label: 'Rosa', color: '#f9a8d4' },
        { id: 'pantalon-negro', label: 'Negra', color: '#111827' },
        { id: 'pantalon-dorada', label: 'Dorada', color: '#f59e0b' }
      ]
    },
    {
      id: 'zapatillas',
      label: 'Zapatos',
      options: [
        { id: 'zapatillas-blancas', label: 'Blancas', color: '#f8fafc' },
        { id: 'zapatillas-negras', label: 'Negras', color: '#020617' },
        { id: 'zapatillas-doradas', label: 'Doradas', color: '#fbbf24' },
        { id: 'zapatillas-rosadas', label: 'Rosadas', color: '#f472b6' }
      ]
    },
    {
      id: 'gorra',
      label: 'Corona',
      options: [
        { id: 'gorra-lila', label: 'Lila', color: '#8b5cf6' },
        { id: 'gorra-rosa', label: 'Rosa', color: '#ec4899' },
        { id: 'gorra-dorada', label: 'Dorada', color: '#f59e0b' },
        { id: 'gorra-plateada', label: 'Plateada', color: '#cbd5e1' }
      ]
    }
  ],
  treasurePath: [
    {
      id: 1,
      title: 'Recuerdo 1',
      imageUrl: 'assets/img/Angel.jpeg',
      correctAnswer: 'reunion',
      alternatives: [
        { id: 'cumple-23', label: 'Dia del trabajador' },
        { id: 'dia-cualquiera', label: 'Celebrando vacaciones' },
        { id: 'reunion', label: 'Concurso de disfrases' }
      ],
      position: { left: 16, top: 88 }
    },
    {
      id: 2,
      title: 'Recuerdo 2',
      imageUrl: 'assets/img/Carton.jpeg',
      correctAnswer: 'sonrisa',
      alternatives: [
        { id: 'sonrisa', label: 'Mirada seria de ganadora' },
        { id: 'pantalla', label: 'Mirada perdida' },
        { id: 'lista', label: 'Don ta bebé 👶' }
      ],
      position: { left: 78, top: 72 }
    },
    {
      id: 3,
      title: 'Recuerdo 3',
      imageUrl: 'assets/img/Starback.jpeg',
      correctAnswer: 'informe',
      alternatives: [
        { id: 'sorpresa', label: 'Un dia en metro' },
        { id: 'horario', label: 'Centro de Lima' },
        { id: 'informe', label: 'Nuestro primer cafe caro 🙈' }
      ],
      position: { left: 25, top: 55 }
    },
    {
      id: 4,
      title: 'Recuerdo 4',
      imageUrl: 'assets/img/miraflores1.jpeg',
      correctAnswer: 'cita',
      alternatives: [
        { id: 'mapa', label: 'Viaje al espacio' },
        { id: 'cita', label: 'Sumando meses en Miraflores ❤' },
        { id: 'encuesta', label: 'Paseo por Barranco' }
      ],
      position: { left: 74, top: 38 }
    },
    {
      id: 5,
      title: 'Recuerdo 5',
      imageUrl: 'assets/img/Sueños1.jpeg',
      correctAnswer: 'fiesta',
      alternatives: [
        { id: 'fiesta', label: 'Sueño profundo 💤' },
        { id: 'reunion', label: 'Provocacion sensorial' },
        { id: 'examen', label: 'Quitando migas de los dientes' }
      ],
      position: { left: 34, top: 21 }
    },
    {
      id: 6,
      title: 'Recuerdo 6',
      imageUrl: 'assets/img/Helado.jpeg',
      correctAnswer: 'cofre-final',
      alternatives: [
        { id: 'llave-perdida', label: 'Salida casual' },
        { id: 'cofre-final', label: 'Primer helado caro 🍨' },
        { id: 'pieza-puzzle', label: 'Ida y vuelta del trabajo' }
      ],
      position: { left: 84, top: 8 }
    }
  ],
  creationTargetElementIds: ['amabilidad', 'comprension', 'alegria', 'ternura', 'fortaleza'],
  creationElements: [
    {
      id: 'amabilidad',
      label: 'Amabilidad',
      description: 'La forma bonita en que trata a los demas.',
      kind: 'good',
      icon: 'heart'
    },
    {
      id: 'comprension',
      label: 'Comprension',
      description: 'Su manera de escuchar y entender con paciencia.',
      kind: 'good',
      icon: 'hands'
    },
    {
      id: 'alegria',
      label: 'Alegria',
      description: 'Esa luz que cambia cualquier dia.',
      kind: 'good',
      icon: 'sun'
    },
    {
      id: 'ternura',
      label: 'Ternura',
      description: 'El detalle dulce que la hace inolvidable.',
      kind: 'good',
      icon: 'flower'
    },
    {
      id: 'fortaleza',
      label: 'Fortaleza',
      description: 'Todo lo fuerte que es incluso en dias dificiles.',
      kind: 'good',
      icon: 'shield'
    },
    {
      id: 'carino',
      label: 'Carino',
      description: 'Un brillo extra para este cumpleanos.',
      kind: 'good',
      icon: 'star'
    },
    {
      id: 'impaciencia',
      label: 'Impaciencia',
      description: 'No pertenece al portal de esta sorpresa.',
      kind: 'bad',
      icon: 'cloud'
    },
    {
      id: 'enojo',
      label: 'Enojo',
      description: 'Este elemento apaga el encanto del portal.',
      kind: 'bad',
      icon: 'cloud'
    },
    {
      id: 'tristeza',
      label: 'Tristeza',
      description: 'Hoy la dejamos fuera porque toca celebrar.',
      kind: 'bad',
      icon: 'cloud'
    }
  ],
  heartFlightRequiredClicks: 18,
  heartFlightTimeoutMs: 1300,
  loveLetterParagraphs: [
    '🎂🎂Hola meme, hoy cumples 23 años y queria regalarte algo que no se compre,porque tambien te compre algo jeje, algo hecho con tiempo, con detalle y con todo lo bonito que siento por ti.',
    'Me enamora tu forma de ser: tu risa, tu ternura, tu caracter, esa luz tuya que aparece incluso en los dias simples y los vuelve especiales. Me gusta verte crecer, verte sonar, verte ser tu, y sentir que tengo la suerte enorme de caminar a tu lado.',
    'Eres mi novia, mi companera, mi persona favorita para molestar, abrazar, cuidar y admirar. Si pudiera pedir algo por ti hoy, pediria que la vida te trate con la misma dulzura con la que tu has llegado a mi mundo.',
    'Muchas gracias por ser mi compañera de viaje, te prometo que intentare darte la una vida muy bonita 🙈',
    'Feliz cumpleanos, mi meme. Gracias por existir, por ser mi enamorada y por hacer que quererte se sienta tan natural. Te amo muchisimo mi cachetona preciosa ❤ 🎂.'
  ]
};
