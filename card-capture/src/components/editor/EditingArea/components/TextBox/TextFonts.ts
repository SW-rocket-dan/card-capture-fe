import {
  Nanum_Gothic,
  Jua,
  Noto_Sans_KR,
  Noto_Serif_KR,
  Black_Han_Sans,
  Do_Hyeon,
  Nanum_Pen_Script,
  Gothic_A1,
  Dongle,
  Sunflower,
  Hahmlet,
  Gugi,
  Gaegu,
  Gamja_Flower,
  Gowun_Dodum,
  Gowun_Batang,
  Song_Myung,
  Cute_Font,
  East_Sea_Dokdo,
  Stylish,
  Single_Day,
  Yeon_Sung,
  Gasoek_One,
  Bagel_Fat_One,
  Orbit,
} from 'next/font/google';

const nanumGothic = Nanum_Gothic({ weight: '400', subsets: ['latin'], variable: '--font-nanum-gothic' });
const jua = Jua({ weight: '400', subsets: ['latin'], variable: '--font-jua' });
const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto-sans-kr' });
const notoSerifKR = Noto_Serif_KR({ weight: '400', subsets: ['latin'], variable: '--font-noto-serif-kr' });
const blackHanSans = Black_Han_Sans({ weight: '400', subsets: ['latin'], variable: '--font-black-han-sans' });
const doHyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], variable: '--font-do-hyeon' });
const nanumPenScript = Nanum_Pen_Script({ weight: '400', subsets: ['latin'], variable: '--font-nanum-pen-script' });
const gothicA1 = Gothic_A1({ weight: '400', subsets: ['latin'], variable: '--font-gothic-a1' });
const dongle = Dongle({ weight: '400', subsets: ['latin'], variable: '--font-dongle' });
const sunflower = Sunflower({ weight: '300', subsets: ['latin'], variable: '--font-sunflower' });
const hahmlet = Hahmlet({ weight: '400', subsets: ['latin'], variable: '--font-hahmlet' });
const gugi = Gugi({ weight: '400', subsets: ['latin'], variable: '--font-gugi' });
const gaegu = Gaegu({ weight: '400', subsets: ['latin'], variable: '--font-gaegu' });
const gamjaFlower = Gamja_Flower({ weight: '400', subsets: ['latin'], variable: '--font-gamja-flower' });
const gowunDodum = Gowun_Dodum({ weight: '400', subsets: ['latin'], variable: '--font-gowun-dodum' });
const gowunBatang = Gowun_Batang({ weight: '400', subsets: ['latin'], variable: '--font-gowun-batang' });
const songMyung = Song_Myung({ weight: '400', subsets: ['latin'], variable: '--font-song-myung' });
const cuteFont = Cute_Font({ weight: '400', subsets: ['latin'], variable: '--font-cute-font' });
const eastSeaDokdo = East_Sea_Dokdo({ weight: '400', subsets: ['latin'], variable: '--font-east-sea-dokdo' });
const stylish = Stylish({ weight: '400', subsets: ['latin'], variable: '--font-stylish' });
const singleDay = Single_Day({ weight: '400', variable: '--font-single-day' });
const yeonSung = Yeon_Sung({ weight: '400', subsets: ['latin'], variable: '--font-yeon-sung' });
const gasoekOne = Gasoek_One({ weight: '400', subsets: ['latin'], variable: '--font-gasoek-one' });
const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'], variable: '--font-bagel-fat-one' });
const orbit = Orbit({ weight: '400', subsets: ['latin'], variable: '--font-orbit' });

const fonts = {
  nanumGothic,
  jua,
  notoSansKR,
  notoSerifKR,
  blackHanSans,
  doHyeon,
  nanumPenScript,
  gothicA1,
  dongle,
  sunflower,
  hahmlet,
  gugi,
  gaegu,
  gamjaFlower,
  gowunDodum,
  gowunBatang,
  songMyung,
  cuteFont,
  eastSeaDokdo,
  stylish,
  singleDay,
  yeonSung,
  gasoekOne,
  bagelFatOne,
  orbit,
};

export default fonts;
