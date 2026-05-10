import { Question } from '../models/question.model';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Que edad cumple la cumpleanera mas especial?',
    options: ['21 anos', '22 anos', '23 anos', '24 anos'],
    correctAnswer: '23 anos',
    explanation: 'Exacto, hoy celebramos sus 23 anos con todo el carino que merece.'
  },
  {
    id: 2,
    text: 'Que hace que este juego sea especial?',
    options: [
      'Que es una sorpresa hecha con amor',
      'Que es una tarea de rutina',
      'Que termina en una reunion seria',
      'Que no tiene pistas bonitas'
    ],
    correctAnswer: 'Que es una sorpresa hecha con amor',
    explanation: 'Este juego fue pensado como un detalle para hacerla sonreir en su dia.'
  },
  {
    id: 3,
    text: 'Que deberia desbloquear cada respuesta correcta?',
    options: [
      'Una pieza de un recuerdo bonito',
      'Una pantalla vacia',
      'Un mensaje aburrido',
      'Un boton sin sentido'
    ],
    correctAnswer: 'Una pieza de un recuerdo bonito',
    explanation: 'Cada acierto revela una parte del rompecabezas y acerca la sorpresa final.'
  },
  {
    id: 4,
    text: 'Cual es el mejor plan para su cumpleanos?',
    options: [
      'Ignorar la fecha',
      'Celebrarla, consentirla y hacerla sentir amada',
      'Hablar solo de pendientes',
      'Resolver todo en silencio'
    ],
    correctAnswer: 'Celebrarla, consentirla y hacerla sentir amada',
    explanation: 'Hoy toca celebrar su vida, su alegria y todo lo bonito que trae.'
  },
  {
    id: 5,
    text: 'Que representa el cofre del ultimo nivel?',
    options: [
      'Un regalo final lleno de carino',
      'Una caja cualquiera',
      'Un archivo pendiente',
      'Una puerta cerrada para siempre'
    ],
    correctAnswer: 'Un regalo final lleno de carino',
    explanation: 'El cofre guarda la recompensa final despues de juntar las seis llaves.'
  },
  {
    id: 6,
    text: 'Que merece escuchar hoy tu enamorada?',
    options: [
      'Que es muy importante para ti',
      'Que el dia puede pasar desapercibido',
      'Que no hay sorpresa',
      'Que las respuestas no importan'
    ],
    correctAnswer: 'Que es muy importante para ti',
    explanation: 'Porque este detalle existe para recordarle lo mucho que significa para ti.'
  },
  {
    id: 7,
    text: 'Que combina mejor con una sorpresa de cumpleanos?',
    options: [
      'Fotos, pistas, llaves y una cancion final',
      'Solo textos largos',
      'Cero celebracion',
      'Un cronometro de examenes'
    ],
    correctAnswer: 'Fotos, pistas, llaves y una cancion final',
    explanation: 'La aventura completa mezcla recuerdos, juego y una recompensa al final.'
  },
  {
    id: 8,
    text: 'Que mensaje deberia llevar esta aventura?',
    options: [
      'Feliz cumpleanos, mi amor',
      'No hay nada que celebrar',
      'Fin del tramite',
      'Pregunta sin respuesta'
    ],
    correctAnswer: 'Feliz cumpleanos, mi amor',
    explanation: 'Ese es el corazon de toda la experiencia: felicitarla con amor.'
  },
  {
    id: 9,
    text: 'Que pasa cuando completas todos los niveles?',
    options: [
      'Se revela la sorpresa final',
      'Se pierde el progreso',
      'El juego vuelve al inicio sin premio',
      'No ocurre nada'
    ],
    correctAnswer: 'Se revela la sorpresa final',
    explanation: 'Al final queda una felicitacion especial para celebrar sus 23 anos.'
  }
];
