// $ of jQuery without the jQuery
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

let $ = null
let $$ = null

if (typeof window !== `undefined`) {
  $ = document.querySelector.bind(document)
  $$ = document.querySelectorAll.bind(document)

  Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn)
  }

  Object.setPrototypeOf(NodeList.prototype, Array.prototype)

  NodeList.prototype.on = NodeList.prototype.addEventListener = function (
    name,
    fn
  ) {
    this.forEach(elem => {
      elem.on(name, fn)
    })
  }
}

export { $, $$ }
