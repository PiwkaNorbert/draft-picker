import { Suspense, lazy, useEffect, useRef } from "react";
import { TeamMembers } from "../components/TeamMembers";
import useChampionQuery from "../API/useChampionQuery";
import { Root, Champion } from "../types/data";
import { useDraft } from '../Utils/hooks/useDraft';
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { DraftObject } from "../types/util";
import { usePatch } from '../Utils/hooks/usePatch';
import axios from "axios";
import '../App.css'

const CharacterCard = lazy(() => import("../components/CharacterCard"));
const Graphs = lazy(() => import("../components/Graphs"));
const TeamBans = lazy(() => import("../components/TeamBans"));
const ChampionSearch = lazy(() => import("../components/ChampionSearch"));


// const retrunValue = {
//   "blue_team": [
//       {
//           "id": 15610,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Akali",
//           "displayName": "Akali",
//           "win_ratio": "49.934",
//           "sample_size": 15865,
//           "baronKills": "0.010",
//           "dragonKills": "0.020",
//           "inhibitorKills": "0.127",
//           "kills": "7.586",
//           "assists": "4.514",
//           "deaths": "5.064",
//           "damageDealtToBuildings": 2971,
//           "damageDealtToObjectives": 4256,
//           "damageDealtToTurrets": 2971,
//           "goldEarned": 11135,
//           "goldSpent": 10474,
//           "totalMinionsKilled": 174,
//           "neutralMinionsKilled": 1,
//           "magicDamageDealt": 104762,
//           "magicDamageDealtToChampions": 19759,
//           "magicDamageTaken": 9197,
//           "physicalDamageDealt": 12855,
//           "physicalDamageDealtToChampions": 1456,
//           "physicalDamageTaken": 13817,
//           "totalDamageDealt": 121846,
//           "totalDamageDealtToChampions": 21648,
//           "totalDamageTaken": 24098,
//           "trueDamageDealt": 4228,
//           "trueDamageDealtToChampions": 431,
//           "trueDamageTaken": 1082,
//           "damageSelfMitigated": 13863,
//           "totalHeal": 2719,
//           "totalHealsOnTeammates": 35,
//           "totalDamageShieldedOnTeammates": 0,
//           "timeCCingOthers": 2,
//           "totalTimeCCDealt": 82,
//           "wardsPlaced": 6,
//           "visionWardsBoughtInGame": 1,
//           "wardsKilled": 2,
//           "visionScore": 16
//       },
//       {
//           "id": 15590,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Ahri",
//           "displayName": "Ahri",
//           "win_ratio": "51.532",
//           "sample_size": 26527,
//           "baronKills": "0.016",
//           "dragonKills": "0.025",
//           "inhibitorKills": "0.140",
//           "kills": "5.755",
//           "assists": "7.424",
//           "deaths": "4.474",
//           "damageDealtToBuildings": 3058,
//           "damageDealtToObjectives": 4987,
//           "damageDealtToTurrets": 3058,
//           "goldEarned": 10973,
//           "goldSpent": 10175,
//           "totalMinionsKilled": 188,
//           "neutralMinionsKilled": 1,
//           "magicDamageDealt": 77261,
//           "magicDamageDealtToChampions": 14300,
//           "magicDamageTaken": 8512,
//           "physicalDamageDealt": 13550,
//           "physicalDamageDealtToChampions": 1808,
//           "physicalDamageTaken": 9967,
//           "totalDamageDealt": 131010,
//           "totalDamageDealtToChampions": 20607,
//           "totalDamageTaken": 19207,
//           "trueDamageDealt": 40197,
//           "trueDamageDealtToChampions": 4497,
//           "trueDamageTaken": 726,
//           "damageSelfMitigated": 9223,
//           "totalHeal": 4783,
//           "totalHealsOnTeammates": 106,
//           "totalDamageShieldedOnTeammates": 0,
//           "timeCCingOthers": 18,
//           "totalTimeCCDealt": 77,
//           "wardsPlaced": 7,
//           "visionWardsBoughtInGame": 2,
//           "wardsKilled": 3,
//           "visionScore": 20
//       },
//       {
//           "id": 15570,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Aatrox",
//           "displayName": "Aatrox",
//           "win_ratio": "47.927",
//           "sample_size": 20473,
//           "baronKills": "0.018",
//           "dragonKills": "0.045",
//           "inhibitorKills": "0.102",
//           "kills": "5.049",
//           "assists": "4.645",
//           "deaths": "5.464",
//           "damageDealtToBuildings": 3637,
//           "damageDealtToObjectives": 6743,
//           "damageDealtToTurrets": 3637,
//           "goldEarned": 10597,
//           "goldSpent": 9882,
//           "totalMinionsKilled": 173,
//           "neutralMinionsKilled": 6,
//           "magicDamageDealt": 6969,
//           "magicDamageDealtToChampions": 3076,
//           "magicDamageTaken": 9884,
//           "physicalDamageDealt": 120122,
//           "physicalDamageDealtToChampions": 16631,
//           "physicalDamageTaken": 17474,
//           "totalDamageDealt": 130849,
//           "totalDamageDealtToChampions": 19974,
//           "totalDamageTaken": 28992,
//           "trueDamageDealt": 3757,
//           "trueDamageDealtToChampions": 265,
//           "trueDamageTaken": 1632,
//           "damageSelfMitigated": 21206,
//           "totalHeal": 9725,
//           "totalHealsOnTeammates": 0,
//           "totalDamageShieldedOnTeammates": 0,
//           "timeCCingOthers": 19,
//           "totalTimeCCDealt": 197,
//           "wardsPlaced": 7,
//           "visionWardsBoughtInGame": 1,
//           "wardsKilled": 1,
//           "visionScore": 16
//       },
//       {
//           "id": 15970,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Cassiopeia",
//           "displayName": "Cassiopeia",
//           "win_ratio": "51.937",
//           "sample_size": 6687,
//           "baronKills": "0.042",
//           "dragonKills": "0.105",
//           "inhibitorKills": "0.124",
//           "kills": "6.023",
//           "assists": "5.592",
//           "deaths": "5.632",
//           "damageDealtToBuildings": 2908,
//           "damageDealtToObjectives": 8905,
//           "damageDealtToTurrets": 2908,
//           "goldEarned": 11109,
//           "goldSpent": 10283,
//           "totalMinionsKilled": 185,
//           "neutralMinionsKilled": 5,
//           "magicDamageDealt": 117715,
//           "magicDamageDealtToChampions": 20346,
//           "magicDamageTaken": 9507,
//           "physicalDamageDealt": 8693,
//           "physicalDamageDealtToChampions": 497,
//           "physicalDamageTaken": 13586,
//           "totalDamageDealt": 129372,
//           "totalDamageDealtToChampions": 21012,
//           "totalDamageTaken": 24113,
//           "trueDamageDealt": 2962,
//           "trueDamageDealtToChampions": 167,
//           "trueDamageTaken": 1018,
//           "damageSelfMitigated": 14374,
//           "totalHeal": 6305,
//           "totalHealsOnTeammates": 91,
//           "totalDamageShieldedOnTeammates": 1,
//           "timeCCingOthers": 27,
//           "totalTimeCCDealt": 387,
//           "wardsPlaced": 8,
//           "visionWardsBoughtInGame": 2,
//           "wardsKilled": 2,
//           "visionScore": 18
//       },
//       {
//           "id": 15990,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Chogath",
//           "displayName": "Cho'Gath",
//           "win_ratio": "48.695",
//           "sample_size": 2107,
//           "baronKills": "0.163",
//           "dragonKills": "0.331",
//           "inhibitorKills": "0.076",
//           "kills": "4.880",
//           "assists": "5.962",
//           "deaths": "5.052",
//           "damageDealtToBuildings": 3731,
//           "damageDealtToObjectives": 8216,
//           "damageDealtToTurrets": 3731,
//           "goldEarned": 10527,
//           "goldSpent": 9712,
//           "totalMinionsKilled": 164,
//           "neutralMinionsKilled": 7,
//           "magicDamageDealt": 90613,
//           "magicDamageDealtToChampions": 11976,
//           "magicDamageTaken": 12369,
//           "physicalDamageDealt": 20367,
//           "physicalDamageDealtToChampions": 2672,
//           "physicalDamageTaken": 20052,
//           "totalDamageDealt": 128716,
//           "totalDamageDealtToChampions": 17949,
//           "totalDamageTaken": 34430,
//           "trueDamageDealt": 17734,
//           "trueDamageDealtToChampions": 3298,
//           "trueDamageTaken": 2008,
//           "damageSelfMitigated": 34217,
//           "totalHeal": 7458,
//           "totalHealsOnTeammates": 23,
//           "totalDamageShieldedOnTeammates": 7,
//           "timeCCingOthers": 68,
//           "totalTimeCCDealt": 725,
//           "wardsPlaced": 9,
//           "visionWardsBoughtInGame": 1,
//           "wardsKilled": 2,
//           "visionScore": 20
//       }
//   ],
//   "red_team": [
//       {
//           "id": 15730,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Aphelios",
//           "displayName": "Aphelios",
//           "win_ratio": "48.559",
//           "sample_size": 13009,
//           "baronKills": "0.062",
//           "dragonKills": "0.153",
//           "inhibitorKills": "0.236",
//           "kills": "6.117",
//           "assists": "5.784",
//           "deaths": "5.384",
//           "damageDealtToBuildings": 5567,
//           "damageDealtToObjectives": 13086,
//           "damageDealtToTurrets": 5567,
//           "goldEarned": 11552,
//           "goldSpent": 10574,
//           "totalMinionsKilled": 192,
//           "neutralMinionsKilled": 8,
//           "magicDamageDealt": 7499,
//           "magicDamageDealtToChampions": 1192,
//           "magicDamageTaken": 5852,
//           "physicalDamageDealt": 140358,
//           "physicalDamageDealtToChampions": 19557,
//           "physicalDamageTaken": 10097,
//           "totalDamageDealt": 152412,
//           "totalDamageDealtToChampions": 21153,
//           "totalDamageTaken": 16604,
//           "trueDamageDealt": 4552,
//           "trueDamageDealtToChampions": 402,
//           "trueDamageTaken": 653,
//           "damageSelfMitigated": 12150,
//           "totalHeal": 4747,
//           "totalHealsOnTeammates": 14,
//           "totalDamageShieldedOnTeammates": 0,
//           "timeCCingOthers": 14,
//           "totalTimeCCDealt": 132,
//           "wardsPlaced": 7,
//           "visionWardsBoughtInGame": 1,
//           "wardsKilled": 4,
//           "visionScore": 18
//       },
//       {
//           "id": 15710,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Annie",
//           "displayName": "Annie",
//           "win_ratio": "50.732",
//           "sample_size": 4646,
//           "baronKills": "0.012",
//           "dragonKills": "0.025",
//           "inhibitorKills": "0.105",
//           "kills": "4.614",
//           "assists": "8.634",
//           "deaths": "5.392",
//           "damageDealtToBuildings": 2098,
//           "damageDealtToObjectives": 3629,
//           "damageDealtToTurrets": 2098,
//           "goldEarned": 9950,
//           "goldSpent": 9195,
//           "totalMinionsKilled": 144,
//           "neutralMinionsKilled": 0,
//           "magicDamageDealt": 76461,
//           "magicDamageDealtToChampions": 17568,
//           "magicDamageTaken": 7148,
//           "physicalDamageDealt": 9987,
//           "physicalDamageDealtToChampions": 1050,
//           "physicalDamageTaken": 8886,
//           "totalDamageDealt": 89378,
//           "totalDamageDealtToChampions": 19218,
//           "totalDamageTaken": 16805,
//           "trueDamageDealt": 2927,
//           "trueDamageDealtToChampions": 599,
//           "trueDamageTaken": 769,
//           "damageSelfMitigated": 10274,
//           "totalHeal": 1526,
//           "totalHealsOnTeammates": 168,
//           "totalDamageShieldedOnTeammates": 2214,
//           "timeCCingOthers": 29,
//           "totalTimeCCDealt": 257,
//           "wardsPlaced": 11,
//           "visionWardsBoughtInGame": 2,
//           "wardsKilled": 3,
//           "visionScore": 25
//       },
//       {
//           "id": 15690,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Anivia",
//           "displayName": "Anivia",
//           "win_ratio": "52.430",
//           "sample_size": 5020,
//           "baronKills": "0.027",
//           "dragonKills": "0.060",
//           "inhibitorKills": "0.135",
//           "kills": "4.919",
//           "assists": "7.385",
//           "deaths": "4.452",
//           "damageDealtToBuildings": 2792,
//           "damageDealtToObjectives": 6554,
//           "damageDealtToTurrets": 2792,
//           "goldEarned": 10557,
//           "goldSpent": 9678,
//           "totalMinionsKilled": 172,
//           "neutralMinionsKilled": 3,
//           "magicDamageDealt": 107079,
//           "magicDamageDealtToChampions": 16021,
//           "magicDamageTaken": 10645,
//           "physicalDamageDealt": 10446,
//           "physicalDamageDealtToChampions": 1401,
//           "physicalDamageTaken": 13228,
//           "totalDamageDealt": 121122,
//           "totalDamageDealtToChampions": 18359,
//           "totalDamageTaken": 24904,
//           "trueDamageDealt": 3596,
//           "trueDamageDealtToChampions": 936,
//           "trueDamageTaken": 1029,
//           "damageSelfMitigated": 13823,
//           "totalHeal": 3645,
//           "totalHealsOnTeammates": 30,
//           "totalDamageShieldedOnTeammates": 2,
//           "timeCCingOthers": 39,
//           "totalTimeCCDealt": 946,
//           "wardsPlaced": 10,
//           "visionWardsBoughtInGame": 2,
//           "wardsKilled": 2,
//           "visionScore": 22
//       },
//       {
//           "id": 15850,
//           "cache_version": "recent",
//           "time_label": "all",
//           "championName": "Blitzcrank",
//           "displayName": "Blitzcrank",
//           "win_ratio": "51.397",
//           "sample_size": 17221,
//           "baronKills": "0.004",
//           "dragonKills": "0.013",
//           "inhibitorKills": "0.042",
//           "kills": "1.709",
//           "assists": "13.541",
//           "deaths": "5.830",
//           "damageDealtToBuildings": 506,
//           "damageDealtToObjectives": 1142,
//           "damageDealtToTurrets": 506,
//           "goldEarned": 7397,
//           "goldSpent": 6695,
//           "totalMinionsKilled": 23,
//           "neutralMinionsKilled": 0,
//           "magicDamageDealt": 7531,
//           "magicDamageDealtToChampions": 4533,
//           "magicDamageTaken": 8003,
//           "physicalDamageDealt": 5166,
//           "physicalDamageDealtToChampions": 2184,
//           "physicalDamageTaken": 10605,
//           "totalDamageDealt": 16820,
//           "totalDamageDealtToChampions": 7563,
//           "totalDamageTaken": 19671,
//           "trueDamageDealt": 4121,
//           "trueDamageDealtToChampions": 844,
//           "trueDamageTaken": 1061,
//           "damageSelfMitigated": 16917,
//           "totalHeal": 1736,
//           "totalHealsOnTeammates": 96,
//           "totalDamageShieldedOnTeammates": 340,
//           "timeCCingOthers": 40,
//           "totalTimeCCDealt": 223,
//           "wardsPlaced": 31,
//           "visionWardsBoughtInGame": 6,
//           "wardsKilled": 6,
//           "visionScore": 66
//       }
//   ],
//   "blue_recommendation": {
//       "Evelynn": 32249.432699820063,
//       "Caitlyn": 32231.65868695382,
//       "Garen": 32214.969267581735,
//       "Briar": 32205.258401428648,
//       "AurelionSol": 32187.01195737041,
//       "Darius": 32177.363588330365,
//       "Camille": 32177.363588330365,
//       "Graves": 32177.363588330365,
//       "Ezreal": 32177.343809131362,
//       "Azir": 32171.46847504694,
//       "Draven": 32162.71006479561,
//       "Aphelios": 32127.89286479371,
//       "Ahri": 32113.36839018212,
//       "Aatrox": 32102.904895846073,
//       "Gnar": 32102.904895846073,
//       "Gangplank": 32070.78431372549,
//       "Fiora": 32056.579274604876,
//       "Akali": 32056.130790190735,
//       "Akshan": 32056.130790190735,
//       "Brand": 32054.890738813734,
//       "Elise": 32010.067873303167,
//       "Fizz": 31987.60567925137,
//       "Ekko": 31950,
//       "Diana": 31950,
//       "Corki": 31950,
//       "Yuumi": 1066.4513205711005,
//       "Soraka": 1066.4513205711005,
//       "Lulu": 961.5605817573647,
//       "Milio": 961.5605817573647,
//       "Nami": 961.5605817573647,
//       "Thresh": 814.7437559888926,
//       "Renata": 795.8253248950382,
//       "Janna": 794.9659119336242,
//       "Sona": 752.4016972823024,
//       "Alistar": 719.9708047870834,
//       "Blitzcrank": 652.6857452247191,
//       "Rell": 652.6857452247191,
//       "Bard": 637.1422629012492,
//       "Seraphine": 615.2654814543502,
//       "Braum": 615.0800659733477,
//       "Leona": 615.0800659733477,
//       "Rakan": 615.0800659733477,
//       "Zilean": 611.432571710051,
//       "Pyke": 600.5985585756447,
//       "Karma": 585.7773082899499,
//       "Morgana": 531.1692799902742,
//       "Xerath": 530.5900032221838,
//       "Nautilus": 498.1023326162501,
//       "Velkoz": 411.01939733424524,
//       "Galio": 406.84160993387366,
//       "Jinx": 397.86318134754316,
//       "Ziggs": 362.02399810748693,
//       "Ivern": 360.641400698564,
//       "Fiddlesticks": 333.88036582219587,
//       "Maokai": 331.76300187123684,
//       "Veigar": 327.85667713418223,
//       "Syndra": 316.5038580289437,
//       "Annie": 305.1713676453643,
//       "Malzahar": 291.38684015813874,
//       "Jhin": 289.3132438335791,
//       "Khazix": 287.4314616335318,
//       "Sivir": 283.94573550307564,
//       "Senna": 277.2991163507014,
//       "Lux": 272.66581599551785,
//       "Xayah": 269.9476647869969,
//       "Zoe": 265.9279970376639,
//       "Illaoi": 259.48417045094646,
//       "Kaisa": 246.48328389033406,
//       "Nilah": 244.830646916192,
//       "Hwei": 240.81097916685903,
//       "Nunu": 239.36482651689423,
//       "Lillia": 239.36482651689423,
//       "Olaf": 227.36358833036434,
//       "Kled": 227.36358833036434,
//       "Nocturne": 227.36358833036434,
//       "Naafiri": 212.71006479560987,
//       "Pantheon": 212.71006479560987,
//       "Orianna": 208.5582982723046,
//       "Viktor": 199.66369001554503,
//       "Karthus": 199.40627811903732,
//       "Taric": 197.2889141680783,
//       "Amumu": 194.54196100632598,
//       "Zyra": 184.1606373986868,
//       "LeeSin": 180.8521870286576,
//       "Vex": 176.43771615172247,
//       "KSante": 175.78431372549016,
//       "Ashe": 175.5278967630839,
//       "Kayn": 170.76166195865235,
//       "Vi": 166.6471479080416,
//       "Cassiopeia": 159.07351786221932,
//       "Varus": 155.69856909183468,
//       "Jayce": 152.9048958460723,
//       "Heimerdinger": 149.15815706521437,
//       "Samira": 128.1929871186372,
//       "TahmKench": 127.60815958484386,
//       "MissFortune": 121.21301894062796,
//       "Volibear": 120.78431372549018,
//       "MonkeyKing": 120.78431372549018,
//       "MasterYi": 120.78431372549018,
//       "Belveth": 120.78431372549018,
//       "Hecarim": 120.78431372549018,
//       "Irelia": 120.78431372549018,
//       "Jax": 120.78431372549018,
//       "Warwick": 120.78431372549018,
//       "Talon": 106.57927460487417,
//       "Riven": 106.57927460487417,
//       "Urgot": 106.57927460487417,
//       "Sett": 106.57927460487417,
//       "Tryndamere": 106.57927460487417,
//       "Lucian": 106.1307901907357,
//       "Katarina": 106.1307901907357,
//       "Leblanc": 106.1307901907357,
//       "Vayne": 106.1307901907357,
//       "Renekton": 106.1307901907357,
//       "Kennen": 106.1307901907357,
//       "Tristana": 106.1307901907357,
//       "Qiyana": 106.1307901907357,
//       "Sylas": 104.89073881373568,
//       "Rumble": 104.89073881373568,
//       "Singed": 104.89073881373568,
//       "Taliyah": 104.89073881373568,
//       "Neeko": 94.84327924275843,
//       "Ornn": 87.12058212058213,
//       "Swain": 77.06219692790151,
//       "Shen": 73.73365149364183,
//       "Sejuani": 65.51339065125012,
//       "Zeri": 63.97541894924095,
//       "Kalista": 63.97541894924095,
//       "JarvanIV": 60.067873303167424,
//       "Nidalee": 60.067873303167424,
//       "Shaco": 54.31487782245593,
//       "Ryze": 54.182779048483624,
//       "Trundle": 49.97734823316218,
//       "Malphite": 37.60567925137141,
//       "Nasus": 32.12058212058212,
//       "DrMundo": 32.12058212058212,
//       "Lissandra": 22.062196927901507,
//       "Vladimir": 22.062196927901507
//   }
// }

export default function App() {

  const { draft, setDraft, setTeamavg, redPicks, bluePicks } = useDraft();
  const { patch, dataLabel  } = usePatch();

  const graphsRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams()
  const tags = searchParams.get('tag')?.split(',') || []
  const search = searchParams.get('search') || ''
  const query = {tags, search}

  const useChampionData = useChampionQuery(query);

  // Send the draft to the backend
  const { mutate: updateGameAvg }  = useMutation((draft: DraftObject) => 
     axios.post(`https://ourcraft.pl/game-avg/?patch=${patch}&time_label=${dataLabel}`, draft)
  );

  // Update the game average when the draft is filled
  useEffect(() => {
    if (draft) {
      updateGameAvg(draft, {
        onSuccess: (data) => {
          const { data: teamAvg } = data;
          const blueRecs = teamAvg.blue_recommendation;
          const sortedBlueRecs = Object.entries(blueRecs).sort((a, b) => Math.floor(b[1]) - Math.floor(a[1]));
          const sortedBlueRecsJson = Object.fromEntries(sortedBlueRecs);
          console.log(sortedBlueRecsJson);

          
          
          setTeamavg(teamAvg);
        },
      });
    }
  }, [patch, draft, updateGameAvg, setTeamavg]); // This will trigger the effect whenever `patch` changes

  // Scroll to the graphs when the draft is filled
  useEffect(() => {
    // Check if the draft object is filled
    const isDraftFilled = Object.values(draft).every((value) => value !== null);
    
    if (isDraftFilled && graphsRef.current) {
      // Scroll to the graphs
      graphsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [draft]);

  // fill the next null slot in the draft with the clicked champion
  function fillNextNull(clicked_champ: string, currentDraft: DraftObject) {
    for (const [key, value] of Object.entries(currentDraft)) {
      if (value === null) {

        const newDraft = {
          ...currentDraft,
          [key]: clicked_champ,
        };

        setDraft(newDraft);
        if (
          (redPicks && redPicks[0] !== null) ||
          (bluePicks && bluePicks[0] !== null)
        ) {
          updateGameAvg(newDraft, {
            onSuccess: (data) => {
              const { data: teamAvg } = data;
              setTeamavg(teamAvg);
            },
          });
        }
        break;
      }
    }
  }

  // on right click check the draft and if the champion is in the draft then remove it from the draft
  function removeFromDraft(clicked_champ: string, currentDraft: DraftObject) {
    for (const [key, value] of Object.entries(currentDraft)) {
      if (value === clicked_champ) {
        const newDraft = {
          ...currentDraft,
          [key]: null,
        };
        setDraft(newDraft);

        updateGameAvg(newDraft, {
          onSuccess: (data) => {
            const { data: teamAvg } = data;
            setTeamavg(teamAvg);
          },
        });
        break;
      }
    }
  }

  // remove the champion from the draft if the user right clicks on the champion
  const handleRightClick = (
    index: number,
    team: "red" | "blue",
    type: "ban" | "pick"
  ) => {
    if (["blue", "red"].includes(team) && ["ban", "pick"].includes(type)) {
      setDraft({
        ...draft,
        [`${team.charAt(0).toUpperCase() + team.slice(1)}_${type}${index + 1}`]:
          null,
      });
    }
  };


  if (useChampionData.isLoading) {
    return <div>Loading...</div>;
  }
  if (useChampionData.isError) {
    return <div>Error fetching champions</div>;
  }
  // check if the length of the data is 0 then return no champions found
  if (!useChampionData.data || !useChampionData.data.data){
    return <div>No champions found</div>;
  }
  const isEmpty = Object.keys(useChampionData.data.data).length === 0
  const mappedChampions: Champion[] = [];
  
  const championData = useChampionData.data as Root;
  
  
  // Map the champions to an array
  for (const championName in championData.data) {
    // Check if the championName is a property of the championData object
    if (Object.prototype.hasOwnProperty.call(championData.data, championName)) {
      const champion = championData.data[championName];
      champion.championName = championName;

      // Push the champion data to the mappedChampions array
      mappedChampions.push(champion);
    }
  }

  return (
    <>

      <section className="snap-start min-h-screen mx-auto">

        <Suspense fallback={<div className="w-full flex justify-between gap-2 mx-auto">Loading...</div>}>

          <TeamBans
            version={championData.version}
            handleRightClick={handleRightClick}
            />
        </Suspense>
        <section className="flex pt-10 lg:gap-4 justify-between">
          <TeamMembers
            version={championData.version}
            handleRightClick={handleRightClick}
          >
            <div className="grid w-fit place-items-center">
              <Suspense fallback={<div className="flex flex-col lg:flex-row items-center justify-center mb-10 gap-2 px-[18px] max-w-[613px] mx-auto">Loading...</div>}>
               <ChampionSearch />
              </Suspense>

              <div className=" overflow-y-scroll overflow-x-clip  mx-auto w-full flex-grow basis-0 h-[544px] px-[18px]">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 w-full min-[1100px]:grid-cols-6 gap-4 items-start lg:items-center justify-center ">
                  <Suspense fallback={<div className="col-span-full w-full">Loading...</div>}>

                    {isEmpty ? (
                      <div className="col-span-full w-full">No champions found</div>
                    ) :  mappedChampions.map((champion, index) => {
                      return (
                        <CharacterCard
                          key={index}
                          character={champion}
                          version={championData.version}
                          fillNextNull={fillNextNull}
                          removeFromDraft={removeFromDraft}
                  
                        />
                      );
                    })}
                  </Suspense>

                </div>
              </div>
            </div>
          </TeamMembers>
        </section>
      </section>

      <section className=" min-h-screen snap-start p-10 px-20 bg-white flex flex-col" ref={graphsRef}>
        <Suspense fallback={<div>Loading...</div>}>
          <Graphs />
        </Suspense>
      </section>
  

    </>
  );
}

// const LoginButton = () => {
//   return (
//     <a
//       className="rounded-xl bg-white/80 p-4 flex items-center gap-1 text-gray-800 hover:-translate-y-px  hover:bg-white/70"
//       href={`https://discord.com/oauth2/authorize?client_id=1155784301368066099&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord%2Fcallback&scope=identify`}
//     >
//       <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="1em"
//               width="1em"
//               stroke="currentColor"
//               fill="currentColor"
//               viewBox="0 0 256 256"
//             >
//               <path d="M141.66,133.66l-40,40a8,8,0,0,1-11.32-11.32L116.69,136H24a8,8,0,0,1,0-16h92.69L90.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,141.66,133.66ZM192,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h56a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Z"></path>
//           </svg>
//         Login 
//     </a>
//   );
// };


