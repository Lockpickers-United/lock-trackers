 

import JSONParser from '../parsers/JSON.js'

export const jsonType = 'json'
// the `options` is also available through the `this.options` / `src.options`
export default function plugin(formidable, options) {
  // the `this` context is always src, as the first argument of a plugin
  // but this allows us to customize/test each plugin

  /* istanbul ignore next */
  const self = this || formidable

  if (/json/i.test(self.headers['content-type'])) {
    init.call(self, self, options)
  }

  return self
};

// Note that it's a good practice (but it's up to you) to use the `this.options` instead
// of the passed `options` (second) param, because when you decide
// to test the plugin you can pass custom `this` context to it (and so `this.options`)
function init(_self, _opts) {
  this.type = jsonType

  const parser = new JSONParser(this.options)

  parser.on('data', (fields) => {
    this.fields = fields
  })

  parser.once('end', () => {
    this.ended = true
    this._maybeEnd()
  })

  this._parser = parser
}
