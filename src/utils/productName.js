const productNames = [
  'Purple Bananas',
  'Thorium Bike',
  'Brown Apples',
  'Onion Flavoured Chocolade',
  'Ogre Puppy',
  'The Strange Behaviour Of Humans(Book)',
  'Animal Speech translator',
  'Fluffy Gun',
  'Pet Human',
  'Human biscuits',
];


// Get a random product name from the array
export default function getRandomProductName() {
  return productNames[Math.floor(Math.random() * productNames.length)];
}
