export interface Player {
    id: number
    championName: string
    displayName: string
    win_ratio: string
    sample_size: number
    damageDealtToBuildings: number
    damageDealtToObjectives: number
    damageDealtToTurrets: number
    goldEarned: number
    goldSpent: number
    totalMinionsKilled: number
    neutralMinionsKilled: number
    magicDamageDealt: number
    magicDamageDealtToChampions: number
    magicDamageTaken: number
    physicalDamageDealt: number
    physicalDamageDealtToChampions: number
    physicalDamageTaken: number
    totalDamageDealt: number
    totalDamageDealtToChampions: number
    totalDamageTaken: number
    trueDamageDealt: number
    trueDamageDealtToChampions: number
    trueDamageTaken: number
    damageSelfMitigated: number
    totalHeal: number
    totalHealsOnTeammates: number
    totalDamageShieldedOnTeammates: number
    timeCCingOthers: number
    totalTimeCCDealt: number
    wardsPlaced: number
    visionWardsBoughtInGame: number
    wardsKilled: number
    visionScore: number
  }
  