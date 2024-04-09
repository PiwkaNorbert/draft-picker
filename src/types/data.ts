export interface Root {
    type: string
    format: string
    version: string
    data: Data
  }
  export interface Champion {
    blurb: string
    championName: string
    id: string
    image: ChampionImage
    info: ChampionInfo
    key: string
    name: string
    partype: string
    stats: ChampionStats
    tags: string[]
    title: string
    version: string
  }
  
  export interface ChampionInfo {
    attack: number
    defense: number
    magic: number
    difficulty: number
  }
  
  export interface ChampionImage {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
  }
  
  export interface ChampionStats {
    armor: number
    armorperlevel: number
    attackdamage: number
    attackdamageperlevel: number
    attackrange: number
    attackspeed: number
    attackspeedperlevel: number
    crit: number
    critperlevel: number
    hp: number
    hpperlevel: number
    hpregen: number
    hpregenperlevel: number
    movespeed: number
    mp: number
    mpperlevel: number
    mpregen: number
    mpregenperlevel: number
    spellblock: number
    spellblockperlevel: number
  }
  
  export interface Data {
    [key: string]: Champion;
  }