export interface Speaker {
  name: string;
  role: string;
  /** Transparent PNG in /public/speakers */
  image: string;
  /** Optional zoom for photos cropped wider/shorter than the rest (1 = default) */
  scale?: number;
}

// To add a speaker: drop their transparent PNG into public/speakers/ and add an entry below.
export const SPEAKERS: Speaker[] = [
  {
    name: "Trevor Noah",
    role: "Comedian, Author & Television Host",
    image: "/speakers/trevor-noah.png",
  },
  {
    name: "Steven Bartlett",
    role: "Entrepreneur & Host, The Diary of a CEO",
    image: "/speakers/steven-bartlett.png",
    scale: 1.4,
  },
  {
    name: "Gary Vaynerchuk",
    role: "Chairman, VaynerX & CEO, VaynerMedia",
    image: "/speakers/gary-vaynerchuk.png",
  },
  {
    name: "I.B. Gyansah",
    role: "Featured Speaker",
    image: "/speakers/ib-gyansah.png",
  },
];
