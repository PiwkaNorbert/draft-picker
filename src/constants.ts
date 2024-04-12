export const tags = [
  "Tank",
  "Fighter",
  "Assassin",
  "Mage",
  "Marksman",
  "Support",
];

export const groupedStatOptions = [
  {
    name: "Damage Dealt - Type",
    stats: [
      {value: "physicalDamageDealt", name: "Physical Damage Dealt"},
      {value: "magicDamageDealt", name: "Magic Damage Dealt"},
      {value: "trueDamageDealt", name: "True Damage Dealt"},
      {value: "totalDamageDealt", name: "Total Damage Dealt"},

    ]
  },
  {
    name: "Damage Dealt - Target",
    stats: [
      {value: "damageDealtToTurrets", name: "Damage Dealt To Turrets"},
      {value: "damageDealtToBuildings", name: "Damage Dealt To Buildings"},
      {value: "damageDealtToObjectives", name: "Damage Dealt To Objectives"},
    ]
  },
  {
    name: "Damage Taken",
    stats: [
      {value: "physicalDamageTaken", name: "Physical Damage Taken"},
      {value: "magicDamageTaken", name: "Magic Damage Taken"},
      {value: "trueDamageTaken", name: "True Damage Taken"},
      {value: "damageSelfMitigated", name: "Damage Self Mitigated"},
      {value: "totalDamageTaken", name: "Total Damage Taken"},
    ]
  },
  {
    name: "Damage Dealt To Champions",
    stats: [
      {value: "physicalDamageDealtToChampions", name: "Physical Damage Dealt To Champions"},
      {value: "magicDamageDealtToChampions", name: "Magic Damage Dealt To Champions"},
      {value: "trueDamageDealtToChampions", name: "True Damage Dealt To Champions"},
      {value: "totalDamageDealtToChampions", name: "Total Damage Dealt To Champions"},
    ]
  },
  {
    name: "Healing and Shielding",
    stats: [
      {value: "totalHealsOnTeammates", name: "Total Heals On Teammates"},
      {value: "totalDamageShieldedOnTeammates", name: "Total Damage Shielded On Teammates"},
      {value: "totalHeal", name: "Total Heal"},
    ]
  },
  {
    name: "Crowd Control",
    stats: [
      {value: "timeCCingOthers", name: "Time CCing Others"},
      {value: "totalTimeCCDealt", name: "Total Time CC Dealt"},
    ]
  },
  {
    name: "Gold n' Farming (to be changed)",
    stats: [
      {value: "goldEarned", name: "Gold Earned"},
      {value: "goldSpent", name: "Gold Spent"},

      {value: "totalMinionsKilled", name: "Total Minions Killed"},
      {value: "neutralMinionsKilled", name: "Neutral Minions Killed"},
    ]
  },

  {
    name: "Vision",
    stats: [
      {value: "wardsPlaced", name: "Wards Placed"},
      {value: "wardsKilled", name: "Wards Killed"},
      {value: "visionWardsBoughtInGame", name: "Vision Wards Bought In Game"},
      {value: "visionScore", name: "Vision Score"},
    ]
  },
];