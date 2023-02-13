import React, { useState, useEffect } from "react";
import axios from "axios";

interface HeroWinRate {
  [key: string]: number;
}

interface HeroData {
  name: string;
  stats: {
    win: number;
  };
}

const WinRate: React.FC = () => {
  const [winRates, setWinRates] = useState<HeroWinRate>({});
  const [bestHero, setBestHero] = useState("");
  const [bestWinRate, setBestWinRate] = useState(0);

  useEffect(() => {
    const fetchWinRates = async () => {
      const response = await axios.get(
        "https://euw1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&tags=stats?api_key=RGAPI-5e7a9648-074a-469f-8b99-5beff8533f60"
      );
      const heroes = response.data.data as { [key: string]: HeroData };
      setWinRates(
        Object.entries(heroes).reduce((obj: any, [key, value]) => {
          obj[value.name] = value.stats.win;
          return obj;
        }, {})
      );
    };

    fetchWinRates();
  }, []);

  useEffect(() => {
    if (Object.keys(winRates).length > 0) {
      const hero = Object.keys(winRates).reduce((a, b) =>
        winRates[a] > winRates[b] ? a : b
      );
      setBestHero(hero);
      setBestWinRate(winRates[hero]);
    }
  }, [winRates]);

  return (
    <div>
      {bestHero && (
        <p>
          The hero with the best win rate is {bestHero} with a win rate of{" "}
          {bestWinRate}.
        </p>
      )}
    </div>
  );
};

export default WinRate;
