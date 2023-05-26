

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomIntSeed(max, seed){
	  return Math.floor(Math.random(seed) * Math.floor(max));
}