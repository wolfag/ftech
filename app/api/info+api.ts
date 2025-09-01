const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY;
const CRYPTO_BASE_URL = process.env.CRYPTO_BASE_URL;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.get('ids');

  const response = await fetch(
    `${CRYPTO_BASE_URL}/v2/cryptocurrency/info?id=${ids}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': CRYPTO_API_KEY,
      },
    },
  );
  const res = await response.json();

  return Response.json(res.data);

  // return Response.json(mock);
}

const mock = {
  '1765': {
    urls: {
      website: [
        'blxo53drxa',
        'daga7iac6fe',
        't8fc43tlw0o',
        'dh9cogn9sw7',
        '0knx4djwwiy',
        'nm8ina8nx',
        'n3dsh11ook',
        '2z4m7kix9ds',
        'j6i9kukwkda',
        '197ytgcr5zr',
      ],
      technical_doc: [
        'qgqz3w6jouq',
        'kd3jf2s0gb',
        'kzsziyzlf8e',
        'z60g5z7uy8',
        'uasqztrqth',
        '9fsdyqht0ab',
        'clwn1rix7ki',
        'kf154izf5o',
        'kozrulq1nc',
        'mw5p7yt4orj',
      ],
      twitter: [],
      reddit: [
        'rgxtjthuh7f',
        '0q5ei3w4j3n',
        'ssx3i3m2lxf',
        'isf7t0hud8',
        '0z9wfaihc75f',
        'ovht0d5wskm',
        'q4bbwahpqpo',
        'pdhvfj9srnl',
        'o886vw6rm5',
        '5h16nocr1mu',
      ],
      message_board: [
        'n3ms9ah1sn',
        '4o8e1ebqb16',
        'wwxeqa3oier',
        'eemn12si3fc',
        'kch5axwoo1',
        '858psvokjhw',
        '0vphhgpb01l',
        'y3fzcm8e8n',
        'kht6yi8bw9m',
        'my0dychl0ij',
      ],
      announcement: [],
      chat: [],
      explorer: [
        'mskcyg3lcdl',
        'iedrbqe0tp',
        'p3cws2b5t8q',
        'qa972r6bn3o',
        '2dzowy3pvrd',
        'rtw6s8rs6hs',
        '5xj94nkea38',
        'rxbjc5sihes',
        'pqqwq39lck',
        'z1agkk3pbh8',
      ],
      source_code: [
        'l496969rfkl',
        '7mej68ots27',
        'bbt53eoojek',
        'kesfgfj4hu',
        'jl5mt09f97k',
        'ixfvsyqsgd',
        'c9v1cpsqhyv',
        'l3ss2r4sxif',
        'tatj9vfnna',
        'exg7uacmh2m',
      ],
    },
    logo: '49tsdr9ursc',
    id: 1765,
    name: 'q3cdj9a8iwl',
    symbol: 'zjo8vpcqhe',
    slug: 'kh2lys1bm5l',
    description: 'gpmftxianu',
    date_added: '2025-09-01T10:15:26.641Z',
    date_launched: '2025-09-01T10:15:26.641Z',
    tags: [
      'ggazwl1l8ii',
      'tojrahymkoc',
      'vye40innlie',
      'cuvr5nc3ge',
      'l5iron1dmp',
      '5ytisf0zugv',
      'h9h1kwiwxbp',
      'qf0i3w2pslr',
      'iz3kd0hrlu',
      'ebra60sy07o',
    ],
    platform: null,
    category: '1850i4wmjyy',
  },
};
