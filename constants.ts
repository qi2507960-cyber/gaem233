
import { Character, Dungeon } from './types';

export const INITIAL_HP = 3;
export const INITIAL_SAN = 100;

export const CHARACTERS: Character[] = [
  {
    id: 'laozeng',
    name: '老曾',
    role: '贪婪学者',
    image: 'https://image.pollinations.ai/prompt/Chinese%20older%20man%2060s%20wearing%20purple%20vest%20grey%20shirt%20sitting%20in%20alley%20realistic%20cinematic%20lighting%20drama?width=800&height=450&nologo=true',
    rarity: 'SR',
    bond: 0
  },
  {
    id: 'weilang',
    name: '魏朗',
    role: '忠义将领',
    image: 'https://image.pollinations.ai/prompt/Handsome%20Chinese%20man%20ancient%20costume%20dark%20blue%20robe%20gold%20embroidery%20crown%20serious%20face%20cinematic%20drama?width=800&height=450&nologo=true',
    rarity: 'SSR',
    bond: 0
  },
  {
    id: 'linzhou',
    name: '林舟',
    role: '特务之女',
    image: 'https://image.pollinations.ai/prompt/Chinese%20young%20woman%201940s%20style%20wearing%20white%20lace%20cheongsam%20qipao%20pearl%20earrings%20elegant%20cinematic?width=800&height=450&nologo=true',
    rarity: 'R',
    bond: 0
  },
  {
    id: 'zhouyicun',
    name: '周以存',
    role: '地下党员',
    image: 'https://image.pollinations.ai/prompt/Chinese%20young%20man%201940s%20blue%20military%20uniform%20sitting%20in%20car%20side%20profile%20cinematic%20drama?width=800&height=450&nologo=true',
    rarity: 'R',
    bond: 0
  },
  {
    id: 'guheng',
    name: '顾衡',
    role: '温润管理员',
    image: 'https://image.pollinations.ai/prompt/Very%20handsome%20Chinese%20boy%2020%20years%20old%20gentle%20face%20wearing%20beige%20trench%20coat%201940s%20library%20background%20soft%20cinematic%20lighting?width=800&height=450&nologo=true',
    rarity: 'SSR',
    bond: 0
  },
  {
    id: 'tangye',
    name: '唐烨',
    role: '阴湿男鬼',
    image: 'https://image.pollinations.ai/prompt/Very%20handsome%20Chinese%20boy%2020%20years%20old%20sharp%20features%20ancient%20blue%20hanfu%20costume%20black%20hat%20pale%20skin%20mysterious%20cinematic?width=800&height=450&nologo=true',
    rarity: 'SR',
    bond: 0
  },
  {
    id: 'uncle',
    name: '叔叔',
    role: '系统管理员',
    image: 'https://image.pollinations.ai/prompt/Chinese%20man%2040s%20wearing%20black%20suit%20white%20shirt%20smiling%20slightly%20dark%20background%20cinematic?width=800&height=450&nologo=true',
    rarity: 'SSR',
    bond: 0
  }
];

export const DUNGEONS: Dungeon[] = [
  {
    id: 1,
    name: '防空洞的回声',
    location: '牛角沱',
    mission: '找到铜盒碎片，解锁上清寺线索。',
    riskLevel: 3,
    npc: '老曾',
    image: 'https://image.pollinations.ai/prompt/old%20stone%20archway%20entrance%20to%20air%20raid%20shelter%20chongqing%201940s%20dark%20horror%20style?width=800&height=400&nologo=true', 
    description: '壁上标语、空袭惨叫回声。NPC老曾受系统“无价之宝”提示后意志偏移。',
    reward: '铜盒铭文碎片'
  },
  {
    id: 2,
    name: '最后的防线',
    location: '合川钓鱼城',
    mission: '说服魏朗将军停战或突围。',
    riskLevel: 4,
    npc: '魏朗',
    image: 'https://image.pollinations.ai/prompt/ancient%20chinese%20fortress%20gate%20burning%20fire%20arrows%20night%20battle%20horror%20cinematic?width=800&height=400&nologo=true',
    description: '炮火幻象、山鬼幻影触发“恐惧共鸣”。徐敏目睹将士自刎。',
    reward: '记忆碎片 x1'
  },
  {
    id: 3,
    name: '戏中人的誓言',
    location: '抗建堂剧场',
    mission: '帮助林舟与恋人私奔。',
    riskLevel: 4,
    npc: '林舟 / 周以存',
    image: 'https://image.pollinations.ai/prompt/1940s%20chinese%20theater%20stage%20red%20curtains%20ghostly%20actors%20dark%20atmosphere?width=800&height=400&nologo=true', 
    description: '冥婚花轿、假戏真做、监狱追逐、病房逃生。',
    reward: '地道地图'
  },
  {
    id: 4,
    name: '镜像世界',
    location: '安达森洋行',
    mission: '破除时间循环，找到铜盒坐标。',
    riskLevel: 3,
    npc: '顾衡',
    image: 'https://image.pollinations.ai/prompt/republic%20of%20china%20study%20room%20interior%20dark%20wooden%20furniture%20mysterious%20horror?width=800&height=400&nologo=true', 
    description: '现实血条消失，系统沉默。倒影延迟、时间冻结。',
    reward: '铜盒地图'
  },
  {
    id: 5,
    name: '执念的守护',
    location: '鹅岭地道',
    mission: '取出上清寺密钥。',
    riskLevel: 5,
    npc: '唐烨',
    image: 'https://image.pollinations.ai/prompt/creepy%20long%20concrete%20tunnel%20dim%20yellow%20lights%20horror%20game%20background?width=800&height=400&nologo=true', 
    description: '守护与占有的界限模糊，徐敏陷入幻阵。',
    reward: '终极副本入口'
  },
  {
    id: 6,
    name: '记忆迷宫',
    location: '失踪的上清寺',
    mission: '打开铜盒，揭示历史真相。',
    riskLevel: 5,
    npc: '叔叔',
    image: 'https://image.pollinations.ai/prompt/ancient%20stone%20altar%20ritual%20site%20underground%20ruins%20dark%20mysterious%20magic%20circle?width=800&height=400&nologo=true', 
    description: '徐敏点燃打火机，铜盒显出“1951·抗美援朝捐机基金”。',
    reward: '现实重启'
  }
];
