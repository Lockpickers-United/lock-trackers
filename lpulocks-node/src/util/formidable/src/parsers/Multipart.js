/* eslint-disable no-fallthrough */
 
 
 

import { Transform } from 'node:stream'
import * as errors from '../FormidableError.js'
import FormidableError from '../FormidableError.js'

let s = 0
const STATE = {
  PARSER_UNINITIALIZED: s++,
  START: s++,
  START_BOUNDARY: s++,
  HEADER_FIELD_START: s++,
  HEADER_FIELD: s++,
  HEADER_VALUE_START: s++,
  HEADER_VALUE: s++,
  HEADER_VALUE_ALMOST_DONE: s++,
  HEADERS_ALMOST_DONE: s++,
  PART_DATA_START: s++,
  PART_DATA: s++,
  PART_END: s++,
  END: s++,
}

let f = 1
const FBOUNDARY = { PART_BOUNDARY: f, LAST_BOUNDARY: (f *= 2) }

const LF = 10
const CR = 13
const SPACE = 32
const HYPHEN = 45
const COLON = 58
const A = 97
const Z = 122

function lower(c) {
  return c | 0x20
}

export const STATES = {}

Object.keys(STATE).forEach((stateName) => {
  STATES[stateName] = STATE[stateName]
})

class MultipartParser extends Transform {
  constructor(options = {}) {
    super({ readableObjectMode: true })
    this.boundary = null
    this.boundaryChars = null
    this.lookbehind = null
    this.bufferLength = 0
    this.state = STATE.PARSER_UNINITIALIZED

    this.globalOptions = { ...options }
    this.index = null
    this.flags = 0
  }

  _endUnexpected() {
    return new FormidableError(
      `MultipartParser.end(): stream ended unexpectedly: ${this.explain()}`,
      errors.malformedMultipart,
      400,
    )
  }

  _flush(done) {
    if (
      (this.state === STATE.HEADER_FIELD_START && this.index === 0) ||
      (this.state === STATE.PART_DATA && this.index === this.boundary.length)
    ) {
      this._handleCallback('partEnd')
      this._handleCallback('end')
      done()
    } else if (this.state !== STATE.END) {
      done(this._endUnexpected())
    } else {
      done()
    }
  }

  initWithBoundary(str) {
    this.boundary = Buffer.from(`\r\n--${str}`)
    this.lookbehind = Buffer.alloc(this.boundary.length + 8)
    this.state = STATE.START
    this.boundaryChars = {}

    for (let i = 0; i < this.boundary.length; i++) {
      this.boundaryChars[this.boundary[i]] = true
    }
  }

   
  _handleCallback(name, buf, start, end) {
    if (start !== undefined && start === end) {
      return
    }
    this.push({ name, buffer: buf, start, end })
  }

   
  _transform(buffer, _, done) {
    let i = 0
    let prevIndex = this.index
    let { index, state, flags } = this
    const { lookbehind, boundary, boundaryChars } = this
    const boundaryLength = boundary.length
    const boundaryEnd = boundaryLength - 1
    this.bufferLength = buffer.length
    let c = null
    let cl = null

    const setMark = (name, idx) => {
      this[`${name}Mark`] = typeof idx === 'number' ? idx : i
    }

    const clearMarkSymbol = (name) => {
      delete this[`${name}Mark`]
    }

    const dataCallback = (name, shouldClear) => {
      const markSymbol = `${name}Mark`
      if (!(markSymbol in this)) {
        return
      }

      if (!shouldClear) {
        this._handleCallback(name, buffer, this[markSymbol], buffer.length)
        setMark(name, 0)
      } else {
        this._handleCallback(name, buffer, this[markSymbol], i)
        clearMarkSymbol(name)
      }
    }

    for (i = 0; i < this.bufferLength; i++) {
      c = buffer[i]
      switch (state) {
        case STATE.PARSER_UNINITIALIZED:
          done(this._endUnexpected())
          return
        case STATE.START:
          index = 0
          state = STATE.START_BOUNDARY
        case STATE.START_BOUNDARY:
          if (index === boundary.length - 2) {
            if (c === HYPHEN) {
              flags |= FBOUNDARY.LAST_BOUNDARY
            } else if (c !== CR) {
              done(this._endUnexpected())
              return
            }
            index++
            break
          } else if (index - 1 === boundary.length - 2) {
            if (flags & FBOUNDARY.LAST_BOUNDARY && c === HYPHEN) {
              this._handleCallback('end')
              state = STATE.END
              flags = 0
            } else if (!(flags & FBOUNDARY.LAST_BOUNDARY) && c === LF) {
              index = 0
              this._handleCallback('partBegin')
              state = STATE.HEADER_FIELD_START
            } else {
              done(this._endUnexpected())
              return
            }
            break
          }

          if (c !== boundary[index + 2]) {
            index = -2
          }
          if (c === boundary[index + 2]) {
            index++
          }
          break
        case STATE.HEADER_FIELD_START:
          state = STATE.HEADER_FIELD
          setMark('headerField')
          index = 0
        case STATE.HEADER_FIELD:
          if (c === CR) {
            clearMarkSymbol('headerField')
            state = STATE.HEADERS_ALMOST_DONE
            break
          }

          index++
          if (c === HYPHEN) {
            break
          }

          if (c === COLON) {
            if (index === 1) {
              // empty header field
              done(this._endUnexpected())
              return
            }
            dataCallback('headerField', true)
            state = STATE.HEADER_VALUE_START
            break
          }

          cl = lower(c)
          if (cl < A || cl > Z) {
            done(this._endUnexpected())
            return
          }
          break
        case STATE.HEADER_VALUE_START:
          if (c === SPACE) {
            break
          }

          setMark('headerValue')
          state = STATE.HEADER_VALUE
        case STATE.HEADER_VALUE:
          if (c === CR) {
            dataCallback('headerValue', true)
            this._handleCallback('headerEnd')
            state = STATE.HEADER_VALUE_ALMOST_DONE
          }
          break
        case STATE.HEADER_VALUE_ALMOST_DONE:
          if (c !== LF) {
            done(this._endUnexpected())
return
          }
          state = STATE.HEADER_FIELD_START
          break
        case STATE.HEADERS_ALMOST_DONE:
          if (c !== LF) {
            done(this._endUnexpected())
            return
          }

          this._handleCallback('headersEnd')
          state = STATE.PART_DATA_START
          break
        case STATE.PART_DATA_START:
          state = STATE.PART_DATA
          setMark('partData')
        case STATE.PART_DATA:
          prevIndex = index

          if (index === 0) {
            // boyer-moore derived algorithm to safely skip non-boundary data
            i += boundaryEnd
            while (i < this.bufferLength && !(buffer[i] in boundaryChars)) {
              i += boundaryLength
            }
            i -= boundaryEnd
            c = buffer[i]
          }

          if (index < boundary.length) {
            if (boundary[index] === c) {
              if (index === 0) {
                dataCallback('partData', true)
              }
              index++
            } else {
              index = 0
            }
          } else if (index === boundary.length) {
            index++
            if (c === CR) {
              // CR = part boundary
              flags |= FBOUNDARY.PART_BOUNDARY
            } else if (c === HYPHEN) {
              // HYPHEN = end boundary
              flags |= FBOUNDARY.LAST_BOUNDARY
            } else {
              index = 0
            }
          } else if (index - 1 === boundary.length) {
            if (flags & FBOUNDARY.PART_BOUNDARY) {
              index = 0
              if (c === LF) {
                // unset the PART_BOUNDARY flag
                flags &= ~FBOUNDARY.PART_BOUNDARY
                this._handleCallback('partEnd')
                this._handleCallback('partBegin')
                state = STATE.HEADER_FIELD_START
                break
              }
            } else if (flags & FBOUNDARY.LAST_BOUNDARY) {
              if (c === HYPHEN) {
                this._handleCallback('partEnd')
                this._handleCallback('end')
                state = STATE.END
                flags = 0
              } else {
                index = 0
              }
            } else {
              index = 0
            }
          }

          if (index > 0) {
            // when matching a possible boundary, keep a lookbehind reference
            // in case it turns out to be a false lead
            lookbehind[index - 1] = c
          } else if (prevIndex > 0) {
            // if our boundary turned out to be rubbish, the captured lookbehind
            // belongs to partData
            this._handleCallback('partData', lookbehind, 0, prevIndex)
            prevIndex = 0
            setMark('partData')

            // reconsider the current character even so it interrupted the sequence
            // it could be the beginning of a new sequence
            i--
          }

          break
        case STATE.END:
          break
        default:
          done(this._endUnexpected())
          return
      }
    }

    dataCallback('headerField')
    dataCallback('headerValue')
    dataCallback('partData')

    this.index = index
    this.state = state
    this.flags = flags

    done()
    return this.bufferLength
  }

  explain() {
    return `state = ${MultipartParser.stateToString(this.state)}`
  }
}

 
MultipartParser.stateToString = (stateNumber) => {
   
  for (const stateName in STATE) {
    const number = STATE[stateName]
    if (number === stateNumber) return stateName
  }
}

export default Object.assign(MultipartParser, { STATES })
