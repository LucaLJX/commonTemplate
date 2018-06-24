import { calcUrl } from './utils'

function bg (el, binding) {
  el.style.backgroundImage = `url("${calcUrl(binding.value)}")`
}
function src (el, binding) {
  el.setAttribute('src', calcUrl(binding.value))
  // el.setAttribute('src', 'http://video.aceoffer.cn/3232c5a375d04dee9f21455253a04dce/96fc9d22bafe4ede823eca47e8a62b29-5287d2089db37e62345123a1be272f8b.mp4')
}
function poster (el, binding) {
  el.setAttribute('poster', calcUrl(binding.value))
}

export default {
  bg, src, poster
}
