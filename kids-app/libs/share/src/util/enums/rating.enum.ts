/**
 * @enum RatingEnum
 * @description Definiert eine Skala von numerischen Bewertungen, die zur Einstufung von Feedback oder Qualität verwendet werden können.
 * Die Werte reichen von 1 (sehr schlecht) bis 5 (ausgezeichnet).
 */
export enum RatingEnum {
  /**
   * @member {number} VeryBad - Repräsentiert eine sehr schlechte Bewertung (Wert: 1).
   */
  VeryBad = 1,

  /**
   * @member {number} Bad - Repräsentiert eine schlechte Bewertung (Wert: 2).
   */
  Bad = 2,

  /**
   * @member {number} Average - Repräsentiert eine durchschnittliche Bewertung (Wert: 3).
   */
  Average = 3,

  /**
   * @member {number} Good - Repräsentiert eine gute Bewertung (Wert: 4).
   */
  Good = 4,

  /**
   * @member {number} Excellent - Repräsentiert eine ausgezeichnete Bewertung (Wert: 5).
   */
  Excellent = 5,
}
