import {
  Merchant,
  Merchants,
} from 'src/app/shared/interfaces/merchant.interfaces';

const merchants: Merchants = [
  {
    name: 'Backbase',
    accountNumber: 'SI64397745065188826',
    icon: 'backbase.png',
    transactionType: 'Salaries',
    categoryCode: '#12a580',
  },
  {
    name: 'The Tea Lounge',
    accountNumber: 'SI64397745065188826',
    icon: 'the-tea-lounge.png',
    transactionType: 'Card Payment',
    categoryCode: '#12a580',
  },
  {
    name: 'Texaco',
    accountNumber: 'SI64397745065188826',
    icon: 'texaco.png',
    transactionType: 'Card Payment',
    categoryCode: '#d51271',
  },
  {
    name: 'Amazon Online Store',
    accountNumber: 'SI64397745065188826',
    icon: 'amazon-online-store.png',
    transactionType: 'Online Transfer',
    categoryCode: '#c12020',
  },
  {
    name: '7-Eleven',
    accountNumber: 'SI64397745065188826',
    icon: '7-eleven.png',
    transactionType: 'Card Payment',
    categoryCode: '#c89616',
  },
  {
    name: 'H&M Online Store',
    accountNumber: 'SI64397745065188826',
    icon: 'h&m-online-store.png',
    transactionType: 'Online Transfer',
    categoryCode: '#e25a2c',
  },
  {
    name: 'Jerry Hildreth',
    accountNumber: 'SI64397745065188826',
    icon: 'jerry-hildreth.png',
    transactionType: 'Transaction',
    categoryCode: '#1180aa',
  },
  {
    name: 'Lawrence Pearson',
    accountNumber: 'SI64397745065188826',
    icon: 'lawrence-pearson.png',
    transactionType: 'Transaction',
    categoryCode: '#1180aa',
  },
  {
    name: 'Whole Foods',
    accountNumber: 'SI64397745065188826',
    icon: 'whole-foods.png',
    transactionType: 'Card Payment',
    categoryCode: '#12a580',
  },
  {
    name: 'Southern Electric Company',
    accountNumber: 'SI64397745065188826',
    icon: 'the-tea-lounge.png',
    transactionType: 'Online Transfer',
    categoryCode: '#fbbb1b',
  },
];

function getMerchantNameAndMarchantMap(): Map<string, Merchant> {
  let map: Map<string, Merchant> = new Map();
  merchants.forEach((m) => {
    map.set(m.name, m);
  });
  return map;
}

function getCreditorMerchants(): Merchants {
  return merchants.filter((m) => !['Salaries'].includes(m.transactionType));
}

export { getMerchantNameAndMarchantMap, getCreditorMerchants };
