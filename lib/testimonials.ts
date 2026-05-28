export type Testimonial = {
  quote: string
  name: string
  age: number
}

export const testimonials: Testimonial[] = [
  { quote: 'Ich fühle mich bei Frau Berger wirklich verstanden. Das kannte ich so nicht.', name: 'Sabine K.', age: 47 },
  { quote: 'Nach Jahren habe ich endlich das Gefühl, dass jemand den ganzen Menschen sieht.', name: 'Thomas M.', age: 39 },
  { quote: 'Die Beratung war einfühlsam und hat mir geholfen, meinen Alltag besser zu gestalten.', name: 'Maria L.', age: 52 },
  { quote: 'Endlich jemand, der sich Zeit nimmt und nicht nur Symptome behandelt.', name: 'Klaus B.', age: 61 },
  { quote: 'Ich bin dankbar, dass ich den Schritt gewagt habe. Es hat sich wirklich verändert.', name: 'Andrea W.', age: 44 },
]
