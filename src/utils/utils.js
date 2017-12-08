export const milisecondsToMMSS = miliseconds => {
  const seconds = miliseconds / 1000
  const minutes = Math.floor(seconds / 60)
  const secondsLeft = Math.floor(seconds % 60)
  const secondsString = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`
  return `${minutes}:${secondsString}`
}
