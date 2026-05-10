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
  puzzleImageUrl: 'assets/img/MEME01.png',
  customizationTarget: {
    polo: 'polo-rosa',
    pantalon: 'pantalon-blanco',
    zapatillas: 'zapatillas-doradas',
    gorra: 'gorra-lila'
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
      label: 'Falda',
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
      imageUrl: 'assets/img/MEME01.png',
      correctAnswer: 'cumple-23',
      alternatives: [
        { id: 'cumple-23', label: 'Cumpleanos numero 23' },
        { id: 'dia-cualquiera', label: 'Un dia cualquiera' },
        { id: 'reunion', label: 'Una reunion seria' }
      ],
      position: { left: 16, top: 88 }
    },
    {
      id: 2,
      title: 'Recuerdo 2',
      imageUrl: 'assets/img/MEME01.png',
      correctAnswer: 'sonrisa',
      alternatives: [
        { id: 'sonrisa', label: 'Su sonrisa favorita' },
        { id: 'pantalla', label: 'Una pantalla vacia' },
        { id: 'lista', label: 'Una lista de pendientes' }
      ],
      position: { left: 78, top: 72 }
    },
    {
      id: 3,
      title: 'Recuerdo 3',
      imageUrl: 'assets/img/MEME01.png',
      correctAnswer: 'sorpresa',
      alternatives: [
        { id: 'sorpresa', label: 'Sorpresa hecha con amor' },
        { id: 'horario', label: 'Horario de clases' },
        { id: 'informe', label: 'Informe final' }
      ],
      position: { left: 25, top: 55 }
    },
    {
      id: 4,
      title: 'Recuerdo 4',
      imageUrl: 'assets/img/MEME01.png',
      correctAnswer: 'cita',
      alternatives: [
        { id: 'mapa', label: 'Mapa cualquiera' },
        { id: 'cita', label: 'Una cita bonita' },
        { id: 'encuesta', label: 'Encuesta rapida' }
      ],
      position: { left: 74, top: 38 }
    },
    {
      id: 5,
      title: 'Recuerdo 5',
      imageUrl: 'assets/img/MEME01.png',
      correctAnswer: 'fiesta',
      alternatives: [
        { id: 'fiesta', label: 'Fiesta para ella' },
        { id: 'reunion', label: 'Reunion de proyecto' },
        { id: 'examen', label: 'Examen parcial' }
      ],
      position: { left: 34, top: 21 }
    },
    {
      id: 6,
      title: 'Recuerdo 6',
      imageUrl: 'assets/img/MEME01.png',
      correctAnswer: 'cofre-final',
      alternatives: [
        { id: 'llave-perdida', label: 'Llave perdida' },
        { id: 'cofre-final', label: 'Regalo final' },
        { id: 'pieza-puzzle', label: 'Pieza del rompecabezas' }
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
    'Mi amor, esta carta aparece al final porque todo este camino era para recordarte algo simple y enorme: te quiero muchisimo.',
    'Me encanta tu forma de ser, tu risa, tu manera de iluminar los dias y esa mezcla tan tuya de ternura, fuerza y alegria.',
    'Hoy cumples 23 anos y deseo que la vida te abrace bonito, que nunca te falten motivos para sonreir y que siempre sientas lo importante que eres para mi.',
    'Gracias por ser mi enamorada, por existir en mi mundo y por hacer que quererte se sienta tan natural. Feliz cumpleanos, mi amor.'
  ]
};
