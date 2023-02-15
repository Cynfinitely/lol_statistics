interface HeroWinRate {
  [key: string]: number;
}

interface HeroData {
  name: string;
  stats: {
    win: number;
  };
}
