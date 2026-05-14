export interface GlossaryEntry {
  term: string;
  definition: string;
  url: string;
}

export const glossary: GlossaryEntry[] = [
  // 제도·정책
  { term: "노비안검법", definition: "불법으로 노비가 된 사람을 조사하여 양인으로 되돌리는 법. 호족 세력을 약화시키기 위한 광종의 핵심 정책.", url: "https://ko.wikipedia.org/wiki/노비안검법" },
  { term: "과거제", definition: "시험을 통해 관리를 선발하는 제도. 고려 광종 때 쌍기의 건의로 도입되어 조선까지 이어졌다.", url: "https://ko.wikipedia.org/wiki/과거제" },
  { term: "전시과", definition: "관리에게 직역 대가로 토지 수조권(세금 걷을 권리)을 나눠주는 고려의 토지 분급 제도.", url: "https://ko.wikipedia.org/wiki/전시과" },
  { term: "탕평책", definition: "영조가 추진한 정책으로, 특정 당파에 치우치지 않고 고르게 인재를 등용하여 붕당 간 균형을 잡으려 한 것.", url: "https://ko.wikipedia.org/wiki/탕평책" },
  { term: "균역법", definition: "백성의 군역 부담을 줄이기 위해 군포를 2필에서 1필로 줄인 영조의 세제 개혁.", url: "https://ko.wikipedia.org/wiki/균역법" },
  { term: "대동법", definition: "특산물 대신 쌀로 세금을 통일한 제도. 광해군 때 경기도에서 시작하여 숙종 때 전국으로 확대.", url: "https://ko.wikipedia.org/wiki/대동법" },
  { term: "6조 직계제", definition: "6조(이·호·예·병·형·공)가 의정부를 거치지 않고 왕에게 직접 보고하는 체제. 왕권 강화 목적.", url: "https://ko.wikipedia.org/wiki/6조_직계제" },
  { term: "과전법", definition: "고려 말 권문세족의 대토지 소유를 해체하고, 관리에게 경기 지역 토지의 수조권을 나눠준 제도.", url: "https://ko.wikipedia.org/wiki/과전법" },
  { term: "호패법", definition: "16세 이상 남자에게 신분을 증명하는 패를 차게 한 제도. 인구 파악과 군역·부역 관리 목적.", url: "https://ko.wikipedia.org/wiki/호패" },
  { term: "직전제", definition: "현직 관리에게만 토지 수조권을 주는 제도. 세조 때 시행, 과전법의 개정판.", url: "https://ko.wikipedia.org/wiki/직전법" },
  { term: "경국대전", definition: "조선의 기본 법전. 세조 때 편찬을 시작하여 성종 때(1485년) 완성. 조선 500년 법치의 근간.", url: "https://ko.wikipedia.org/wiki/경국대전" },

  // 사건·전쟁
  { term: "훈민정음", definition: "세종이 1443년에 만든 한국 고유 문자(한글). '백성을 가르치는 바른 소리'라는 뜻.", url: "https://ko.wikipedia.org/wiki/훈민정음" },
  { term: "임진왜란", definition: "1592년 일본(도요토미 히데요시)이 조선을 침략한 전쟁. 7년간 지속되었으며 이순신의 활약으로 극복.", url: "https://ko.wikipedia.org/wiki/임진왜란" },
  { term: "병자호란", definition: "1636년 청나라가 조선을 침략한 전쟁. 인조가 남한산성에서 45일간 항전 후 항복(삼전도 굴욕).", url: "https://ko.wikipedia.org/wiki/병자호란" },
  { term: "정묘호란", definition: "1627년 후금(청)이 조선을 침략한 전쟁. 형제의 맹약을 맺고 종결.", url: "https://ko.wikipedia.org/wiki/정묘호란" },
  { term: "위화도 회군", definition: "1388년 이성계가 요동 정벌 도중 위화도에서 군대를 돌려 개경으로 진군한 사건. 조선 건국의 계기.", url: "https://ko.wikipedia.org/wiki/위화도_회군" },
  { term: "무신정변", definition: "1170년 고려 무신들이 문신 중심 정치에 반발하여 일으킨 정변. 이후 100년간 무신정권 시대가 열림.", url: "https://ko.wikipedia.org/wiki/무신정변" },
  { term: "귀주대첩", definition: "1019년 강감찬이 거란 10만 대군을 귀주(구성)에서 대파한 전투. 고려 3대 전승 중 하나.", url: "https://ko.wikipedia.org/wiki/귀주대첩" },
  { term: "삼별초", definition: "고려 무신정권의 사병 조직(좌별초·우별초·신의군). 몽골 항복에 반대하여 항쟁(1270~1273).", url: "https://ko.wikipedia.org/wiki/삼별초" },
  { term: "계유정난", definition: "1453년 수양대군(세조)이 김종서·황보인 등을 제거하고 권력을 장악한 쿠데타.", url: "https://ko.wikipedia.org/wiki/계유정난" },
  { term: "사육신", definition: "세조의 왕위 찬탈에 반대하여 단종 복위를 꾀하다 처형당한 6명의 충신. 성삼문, 박팽년, 이개, 하위지, 유성원, 유응부.", url: "https://ko.wikipedia.org/wiki/사육신" },
  { term: "갑자사화", definition: "1504년 연산군이 생모 폐비 윤씨의 죽음과 관련된 인물들을 대거 숙청한 사건.", url: "https://ko.wikipedia.org/wiki/갑자사화" },
  { term: "무오사화", definition: "1498년 연산군 때 김종직의 조의제문을 빌미로 사림파를 탄압한 사건.", url: "https://ko.wikipedia.org/wiki/무오사화" },
  { term: "기묘사화", definition: "1519년 중종 때 조광조 등 급진 사림파가 훈구파의 반격으로 숙청된 사건.", url: "https://ko.wikipedia.org/wiki/기묘사화" },
  { term: "을사사화", definition: "1545년 명종 즉위 후 소윤(윤원형)이 대윤(윤임) 일파를 숙청한 사건.", url: "https://ko.wikipedia.org/wiki/을사사화" },
  { term: "인조반정", definition: "1623년 서인 세력이 광해군을 폐위하고 인조를 옹립한 쿠데타.", url: "https://ko.wikipedia.org/wiki/인조반정" },
  { term: "중종반정", definition: "1506년 반정 세력이 폭군 연산군을 폐위하고 중종을 왕으로 세운 사건.", url: "https://ko.wikipedia.org/wiki/중종반정" },
  { term: "동학", definition: "1860년 최제우가 창시한 민족 종교. '사람이 곧 하늘(인내천)'을 주장. 갑오 농민 운동으로 이어짐.", url: "https://ko.wikipedia.org/wiki/동학" },
  { term: "을사늑약", definition: "1905년 일본이 강제로 체결한 조약. 대한제국의 외교권을 빼앗기고 통감부가 설치됨.", url: "https://ko.wikipedia.org/wiki/을사조약" },
  { term: "경술국치", definition: "1910년 8월 29일 한일강제병합. 대한제국이 일본에 주권을 빼앗긴 날.", url: "https://ko.wikipedia.org/wiki/한일_병합_조약" },
  { term: "삼전도 굴욕", definition: "1637년 인조가 청 태종 앞에서 세 번 절하고 아홉 번 이마를 땅에 대는 항복 의식(삼배구고두례)을 한 사건.", url: "https://ko.wikipedia.org/wiki/삼전도의_굴욕" },

  // 문화·기관
  { term: "집현전", definition: "세종이 1420년에 설치한 왕립 학술 연구 기관. 한글 창제의 핵심 학자들이 이곳 소속.", url: "https://ko.wikipedia.org/wiki/집현전" },
  { term: "규장각", definition: "정조가 1776년에 설치한 왕립 도서관 겸 학술 기관. 정조의 개혁 정치의 산실.", url: "https://ko.wikipedia.org/wiki/규장각" },
  { term: "화랑도", definition: "신라의 청소년 수련 조직. 전사이자 학자로서 국가에 봉사하는 엘리트 집단.", url: "https://ko.wikipedia.org/wiki/화랑도" },
  { term: "팔만대장경", definition: "고려 고종 때(1236~1251) 몽골 침입을 불력으로 막고자 새긴 8만여 장의 목판 경전. 세계기록유산.", url: "https://ko.wikipedia.org/wiki/팔만대장경" },
  { term: "동의보감", definition: "허준이 1613년에 완성한 의학 백과사전. 동아시아 의학의 집대성. 세계기록유산.", url: "https://ko.wikipedia.org/wiki/동의보감" },
  { term: "수원 화성", definition: "정조가 아버지 사도세자의 묘를 옮기며 1794~1796년에 축조한 성곽. 정약용이 설계. 세계문화유산.", url: "https://ko.wikipedia.org/wiki/수원_화성" },

  // 인물·조직
  { term: "붕당", definition: "조선 중후기 정치 집단. 동인·서인에서 시작해 남인·북인·노론·소론 등으로 분화.", url: "https://ko.wikipedia.org/wiki/붕당" },
  { term: "사림", definition: "조선 시대 성리학적 이상을 추구한 학자·관료 집단. 훈구파와 대립하며 사화를 겪음.", url: "https://ko.wikipedia.org/wiki/사림파" },
  { term: "세도정치", definition: "정조 사후(1800년~) 왕의 외척 가문(안동 김씨, 풍양 조씨)이 권력을 독점한 정치 형태.", url: "https://ko.wikipedia.org/wiki/세도정치" },
  { term: "환국", definition: "숙종 때 한 당파를 갑자기 내쫓고 다른 당파로 교체하는 급격한 정권 교체. 경신·기사·갑술환국 등.", url: "https://ko.wikipedia.org/wiki/환국" },
  { term: "시무 28조", definition: "982년 최승로가 성종에게 올린 개혁안 28개조. 유교적 통치체제의 기초.", url: "https://ko.wikipedia.org/wiki/시무_28조" },
  { term: "훈요 10조", definition: "태조 왕건이 후대 왕에게 남긴 10가지 훈계. 불교 장려, 풍수지리 존중, 거란 경계 등의 내용.", url: "https://ko.wikipedia.org/wiki/훈요십조" },
  { term: "칭제건원", definition: "황제를 자칭하고 독자적 연호를 사용한다는 뜻. 중국 중심 질서에서 벗어나 자주성을 표현.", url: "https://ko.wikipedia.org/wiki/연호" },
  { term: "삼정 문란", definition: "조선 후기 전정(토지세)·군정(군역)·환곡(곡식 대여)의 3가지 세금 제도가 부패한 것.", url: "https://ko.wikipedia.org/wiki/삼정의_문란" },
  { term: "나선정벌", definition: "1654·1658년 청나라 요청으로 조선군이 러시아군을 격퇴한 원정. 조선군 최초의 해외 원정.", url: "https://ko.wikipedia.org/wiki/나선정벌" },
  { term: "북벌론", definition: "병자호란의 치욕을 씻기 위해 청나라를 정벌하자는 주장. 효종이 주도했으나 실현하지 못함.", url: "https://ko.wikipedia.org/wiki/북벌론" },
  { term: "예송논쟁", definition: "현종 때 효종의 상복 기간을 놓고 서인(송시열)과 남인이 벌인 논쟁. 왕의 정통성 문제와 연결.", url: "https://ko.wikipedia.org/wiki/예송_논쟁" },
];

export function findGlossaryTerms(text: string): GlossaryEntry[] {
  return glossary.filter((entry) => text.includes(entry.term));
}
