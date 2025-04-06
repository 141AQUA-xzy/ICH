import {
    Anton,
    Audiowide,
    Bebas_Neue,
    Bungee_Shade,
    Changa,
    Cinzel,
    Comfortaa,
    Dancing_Script,
    Exo_2,
    Kanit,
    Lobster,
    Luckiest_Guy,
    Montserrat,
    Orbitron,
    Oswald,
    Pacifico,
    Permanent_Marker,
    Poppins,
    Press_Start_2P,
    Righteous,
    Roboto_Mono,
    Source_Code_Pro,
    Zilla_Slab,
  } from "next/font/google";
  
  // ✅ Declare each font first
  const anton = Anton({ subsets: ["latin"], weight: "400" });
  const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });
  const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
  const bungeeShade = Bungee_Shade({ subsets: ["latin"], weight: "400" });
  const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });
  const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
  const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400", "700"] });
  const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
  const exo2 = Exo_2({ subsets: ["latin"], weight: ["400", "700"] });
  const kanit = Kanit({ subsets: ["latin"], weight: ["400", "700"] });
  const lobster = Lobster({ subsets: ["latin"], weight: "400" });
  const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400" });
  const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
  const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
  const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
  const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
  const permanentMarker = Permanent_Marker({ subsets: ["latin"], weight: "400" });
  const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
  const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400" });
  const righteous = Righteous({ subsets: ["latin"], weight: "400" });
  const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });
  const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], weight: ["400", "700"] });
  const zillaSlab = Zilla_Slab({ subsets: ["latin"], weight: ["400", "700"] });
  
  // ✅ Assign them inside an object
  export const fonts = {
    anton: anton.className,
    audiowide: audiowide.className,
    bebasNeue: bebasNeue.className,
    bungeeShade: bungeeShade.className,
    changa: changa.className,
    cinzel: cinzel.className,
    comfortaa: comfortaa.className,
    dancingScript: dancingScript.className,
    exo2: exo2.className,
    kanit: kanit.className,
    lobster: lobster.className,
    luckiestGuy: luckiestGuy.className,
    montserrat: montserrat.className,
    orbitron: orbitron.className,
    oswald: oswald.className,
    pacifico: pacifico.className,
    permanentMarker: permanentMarker.className,
    poppins: poppins.className,
    pressStart2P: pressStart2P.className,
    righteous: righteous.className,
    robotoMono: robotoMono.className,
    sourceCodePro: sourceCodePro.className,
    zillaSlab: zillaSlab.className,
  };
  