'use strict';

var obsidian = require('obsidian');
var path = require('path');
var node_buffer = require('node:buffer');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var ieee754 = {};

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */

var hasRequiredIeee754;

function requireIeee754 () {
	if (hasRequiredIeee754) return ieee754;
	hasRequiredIeee754 = 1;
	ieee754.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = (nBytes * 8) - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	};

	ieee754.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = (nBytes * 8) - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};
	return ieee754;
}

requireIeee754();

// Primitive types
function dv(array) {
    return new DataView(array.buffer, array.byteOffset);
}
/**
 * 8-bit unsigned integer
 */
const UINT8 = {
    len: 1,
    get(array, offset) {
        return dv(array).getUint8(offset);
    },
    put(array, offset, value) {
        dv(array).setUint8(offset, value);
        return offset + 1;
    }
};
/**
 * 16-bit unsigned integer, Little Endian byte order
 */
const UINT16_LE = {
    len: 2,
    get(array, offset) {
        return dv(array).getUint16(offset, true);
    },
    put(array, offset, value) {
        dv(array).setUint16(offset, value, true);
        return offset + 2;
    }
};
/**
 * 16-bit unsigned integer, Big Endian byte order
 */
const UINT16_BE = {
    len: 2,
    get(array, offset) {
        return dv(array).getUint16(offset);
    },
    put(array, offset, value) {
        dv(array).setUint16(offset, value);
        return offset + 2;
    }
};
/**
 * 32-bit unsigned integer, Little Endian byte order
 */
const UINT32_LE = {
    len: 4,
    get(array, offset) {
        return dv(array).getUint32(offset, true);
    },
    put(array, offset, value) {
        dv(array).setUint32(offset, value, true);
        return offset + 4;
    }
};
/**
 * 32-bit unsigned integer, Big Endian byte order
 */
const UINT32_BE = {
    len: 4,
    get(array, offset) {
        return dv(array).getUint32(offset);
    },
    put(array, offset, value) {
        dv(array).setUint32(offset, value);
        return offset + 4;
    }
};
/**
 * 32-bit signed integer, Big Endian byte order
 */
const INT32_BE = {
    len: 4,
    get(array, offset) {
        return dv(array).getInt32(offset);
    },
    put(array, offset, value) {
        dv(array).setInt32(offset, value);
        return offset + 4;
    }
};
/**
 * 64-bit unsigned integer, Little Endian byte order
 */
const UINT64_LE = {
    len: 8,
    get(array, offset) {
        return dv(array).getBigUint64(offset, true);
    },
    put(array, offset, value) {
        dv(array).setBigUint64(offset, value, true);
        return offset + 8;
    }
};
/**
 * Consume a fixed number of bytes from the stream and return a string with a specified encoding.
 */
class StringType {
    constructor(len, encoding) {
        this.len = len;
        this.encoding = encoding;
    }
    get(uint8Array, offset) {
        return node_buffer.Buffer.from(uint8Array).toString(this.encoding, offset, offset + this.len);
    }
}

const defaultMessages = 'End-Of-Stream';
/**
 * Thrown on read operation of the end of file or stream has been reached
 */
class EndOfStreamError extends Error {
    constructor() {
        super(defaultMessages);
    }
}

class Deferred {
    constructor() {
        this.resolve = () => null;
        this.reject = () => null;
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    }
}

class AbstractStreamReader {
    constructor() {
        /**
         * Maximum request length on read-stream operation
         */
        this.maxStreamReadSize = 1 * 1024 * 1024;
        this.endOfStream = false;
        /**
         * Store peeked data
         * @type {Array}
         */
        this.peekQueue = [];
    }
    async peek(uint8Array, offset, length) {
        const bytesRead = await this.read(uint8Array, offset, length);
        this.peekQueue.push(uint8Array.subarray(offset, offset + bytesRead)); // Put read data back to peek buffer
        return bytesRead;
    }
    async read(buffer, offset, length) {
        if (length === 0) {
            return 0;
        }
        let bytesRead = this.readFromPeekBuffer(buffer, offset, length);
        bytesRead += await this.readRemainderFromStream(buffer, offset + bytesRead, length - bytesRead);
        if (bytesRead === 0) {
            throw new EndOfStreamError();
        }
        return bytesRead;
    }
    /**
     * Read chunk from stream
     * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
     * @param offset - Offset target
     * @param length - Number of bytes to read
     * @returns Number of bytes read
     */
    readFromPeekBuffer(buffer, offset, length) {
        let remaining = length;
        let bytesRead = 0;
        // consume peeked data first
        while (this.peekQueue.length > 0 && remaining > 0) {
            const peekData = this.peekQueue.pop(); // Front of queue
            if (!peekData)
                throw new Error('peekData should be defined');
            const lenCopy = Math.min(peekData.length, remaining);
            buffer.set(peekData.subarray(0, lenCopy), offset + bytesRead);
            bytesRead += lenCopy;
            remaining -= lenCopy;
            if (lenCopy < peekData.length) {
                // remainder back to queue
                this.peekQueue.push(peekData.subarray(lenCopy));
            }
        }
        return bytesRead;
    }
    async readRemainderFromStream(buffer, offset, initialRemaining) {
        let remaining = initialRemaining;
        let bytesRead = 0;
        // Continue reading from stream if required
        while (remaining > 0 && !this.endOfStream) {
            const reqLen = Math.min(remaining, this.maxStreamReadSize);
            const chunkLen = await this.readFromStream(buffer, offset + bytesRead, reqLen);
            if (chunkLen === 0)
                break;
            bytesRead += chunkLen;
            remaining -= chunkLen;
        }
        return bytesRead;
    }
}

/**
 * Node.js Readable Stream Reader
 * Ref: https://nodejs.org/api/stream.html#readable-streams
 */
class StreamReader extends AbstractStreamReader {
    constructor(s) {
        super();
        this.s = s;
        /**
         * Deferred used for postponed read request (as not data is yet available to read)
         */
        this.deferred = null;
        if (!s.read || !s.once) {
            throw new Error('Expected an instance of stream.Readable');
        }
        this.s.once('end', () => this.reject(new EndOfStreamError()));
        this.s.once('error', err => this.reject(err));
        this.s.once('close', () => this.reject(new Error('Stream closed')));
    }
    /**
     * Read chunk from stream
     * @param buffer Target Uint8Array (or Buffer) to store data read from stream in
     * @param offset Offset target
     * @param length Number of bytes to read
     * @returns Number of bytes read
     */
    async readFromStream(buffer, offset, length) {
        if (this.endOfStream) {
            return 0;
        }
        const readBuffer = this.s.read(length);
        if (readBuffer) {
            buffer.set(readBuffer, offset);
            return readBuffer.length;
        }
        const request = {
            buffer,
            offset,
            length,
            deferred: new Deferred()
        };
        this.deferred = request.deferred;
        this.s.once('readable', () => {
            this.readDeferred(request);
        });
        return request.deferred.promise;
    }
    /**
     * Process deferred read request
     * @param request Deferred read request
     */
    readDeferred(request) {
        const readBuffer = this.s.read(request.length);
        if (readBuffer) {
            request.buffer.set(readBuffer, request.offset);
            request.deferred.resolve(readBuffer.length);
            this.deferred = null;
        }
        else {
            this.s.once('readable', () => {
                this.readDeferred(request);
            });
        }
    }
    reject(err) {
        this.endOfStream = true;
        if (this.deferred) {
            this.deferred.reject(err);
            this.deferred = null;
        }
    }
    async abort() {
        this.reject(new Error('abort'));
    }
    async close() {
        return this.abort();
    }
}

/**
 * Core tokenizer
 */
class AbstractTokenizer {
    constructor(fileInfo) {
        /**
         * Tokenizer-stream position
         */
        this.position = 0;
        this.numBuffer = new Uint8Array(8);
        this.fileInfo = fileInfo ? fileInfo : {};
    }
    /**
     * Read a token from the tokenizer-stream
     * @param token - The token to read
     * @param position - If provided, the desired position in the tokenizer-stream
     * @returns Promise with token data
     */
    async readToken(token, position = this.position) {
        const uint8Array = new Uint8Array(token.len);
        const len = await this.readBuffer(uint8Array, { position });
        if (len < token.len)
            throw new EndOfStreamError();
        return token.get(uint8Array, 0);
    }
    /**
     * Peek a token from the tokenizer-stream.
     * @param token - Token to peek from the tokenizer-stream.
     * @param position - Offset where to begin reading within the file. If position is null, data will be read from the current file position.
     * @returns Promise with token data
     */
    async peekToken(token, position = this.position) {
        const uint8Array = new Uint8Array(token.len);
        const len = await this.peekBuffer(uint8Array, { position });
        if (len < token.len)
            throw new EndOfStreamError();
        return token.get(uint8Array, 0);
    }
    /**
     * Read a numeric token from the stream
     * @param token - Numeric token
     * @returns Promise with number
     */
    async readNumber(token) {
        const len = await this.readBuffer(this.numBuffer, { length: token.len });
        if (len < token.len)
            throw new EndOfStreamError();
        return token.get(this.numBuffer, 0);
    }
    /**
     * Read a numeric token from the stream
     * @param token - Numeric token
     * @returns Promise with number
     */
    async peekNumber(token) {
        const len = await this.peekBuffer(this.numBuffer, { length: token.len });
        if (len < token.len)
            throw new EndOfStreamError();
        return token.get(this.numBuffer, 0);
    }
    /**
     * Ignore number of bytes, advances the pointer in under tokenizer-stream.
     * @param length - Number of bytes to ignore
     * @return resolves the number of bytes ignored, equals length if this available, otherwise the number of bytes available
     */
    async ignore(length) {
        if (this.fileInfo.size !== undefined) {
            const bytesLeft = this.fileInfo.size - this.position;
            if (length > bytesLeft) {
                this.position += bytesLeft;
                return bytesLeft;
            }
        }
        this.position += length;
        return length;
    }
    async close() {
        // empty
    }
    normalizeOptions(uint8Array, options) {
        if (options && options.position !== undefined && options.position < this.position) {
            throw new Error('`options.position` must be equal or greater than `tokenizer.position`');
        }
        if (options) {
            return {
                mayBeLess: options.mayBeLess === true,
                offset: options.offset ? options.offset : 0,
                length: options.length ? options.length : (uint8Array.length - (options.offset ? options.offset : 0)),
                position: options.position ? options.position : this.position
            };
        }
        return {
            mayBeLess: false,
            offset: 0,
            length: uint8Array.length,
            position: this.position
        };
    }
}

const maxBufferSize = 256000;
class ReadStreamTokenizer extends AbstractTokenizer {
    constructor(streamReader, fileInfo) {
        super(fileInfo);
        this.streamReader = streamReader;
    }
    /**
     * Get file information, an HTTP-client may implement this doing a HEAD request
     * @return Promise with file information
     */
    async getFileInfo() {
        return this.fileInfo;
    }
    /**
     * Read buffer from tokenizer
     * @param uint8Array - Target Uint8Array to fill with data read from the tokenizer-stream
     * @param options - Read behaviour options
     * @returns Promise with number of bytes read
     */
    async readBuffer(uint8Array, options) {
        const normOptions = this.normalizeOptions(uint8Array, options);
        const skipBytes = normOptions.position - this.position;
        if (skipBytes > 0) {
            await this.ignore(skipBytes);
            return this.readBuffer(uint8Array, options);
        }
        else if (skipBytes < 0) {
            throw new Error('`options.position` must be equal or greater than `tokenizer.position`');
        }
        if (normOptions.length === 0) {
            return 0;
        }
        const bytesRead = await this.streamReader.read(uint8Array, normOptions.offset, normOptions.length);
        this.position += bytesRead;
        if ((!options || !options.mayBeLess) && bytesRead < normOptions.length) {
            throw new EndOfStreamError();
        }
        return bytesRead;
    }
    /**
     * Peek (read ahead) buffer from tokenizer
     * @param uint8Array - Uint8Array (or Buffer) to write data to
     * @param options - Read behaviour options
     * @returns Promise with number of bytes peeked
     */
    async peekBuffer(uint8Array, options) {
        const normOptions = this.normalizeOptions(uint8Array, options);
        let bytesRead = 0;
        if (normOptions.position) {
            const skipBytes = normOptions.position - this.position;
            if (skipBytes > 0) {
                const skipBuffer = new Uint8Array(normOptions.length + skipBytes);
                bytesRead = await this.peekBuffer(skipBuffer, { mayBeLess: normOptions.mayBeLess });
                uint8Array.set(skipBuffer.subarray(skipBytes), normOptions.offset);
                return bytesRead - skipBytes;
            }
            else if (skipBytes < 0) {
                throw new Error('Cannot peek from a negative offset in a stream');
            }
        }
        if (normOptions.length > 0) {
            try {
                bytesRead = await this.streamReader.peek(uint8Array, normOptions.offset, normOptions.length);
            }
            catch (err) {
                if (options && options.mayBeLess && err instanceof EndOfStreamError) {
                    return 0;
                }
                throw err;
            }
            if ((!normOptions.mayBeLess) && bytesRead < normOptions.length) {
                throw new EndOfStreamError();
            }
        }
        return bytesRead;
    }
    async ignore(length) {
        // debug(`ignore ${this.position}...${this.position + length - 1}`);
        const bufSize = Math.min(maxBufferSize, length);
        const buf = new Uint8Array(bufSize);
        let totBytesRead = 0;
        while (totBytesRead < length) {
            const remaining = length - totBytesRead;
            const bytesRead = await this.readBuffer(buf, { length: Math.min(bufSize, remaining) });
            if (bytesRead < 0) {
                return bytesRead;
            }
            totBytesRead += bytesRead;
        }
        return totBytesRead;
    }
}

class BufferTokenizer extends AbstractTokenizer {
    /**
     * Construct BufferTokenizer
     * @param uint8Array - Uint8Array to tokenize
     * @param fileInfo - Pass additional file information to the tokenizer
     */
    constructor(uint8Array, fileInfo) {
        super(fileInfo);
        this.uint8Array = uint8Array;
        this.fileInfo.size = this.fileInfo.size ? this.fileInfo.size : uint8Array.length;
    }
    /**
     * Read buffer from tokenizer
     * @param uint8Array - Uint8Array to tokenize
     * @param options - Read behaviour options
     * @returns {Promise<number>}
     */
    async readBuffer(uint8Array, options) {
        if (options && options.position) {
            if (options.position < this.position) {
                throw new Error('`options.position` must be equal or greater than `tokenizer.position`');
            }
            this.position = options.position;
        }
        const bytesRead = await this.peekBuffer(uint8Array, options);
        this.position += bytesRead;
        return bytesRead;
    }
    /**
     * Peek (read ahead) buffer from tokenizer
     * @param uint8Array
     * @param options - Read behaviour options
     * @returns {Promise<number>}
     */
    async peekBuffer(uint8Array, options) {
        const normOptions = this.normalizeOptions(uint8Array, options);
        const bytes2read = Math.min(this.uint8Array.length - normOptions.position, normOptions.length);
        if ((!normOptions.mayBeLess) && bytes2read < normOptions.length) {
            throw new EndOfStreamError();
        }
        else {
            uint8Array.set(this.uint8Array.subarray(normOptions.position, normOptions.position + bytes2read), normOptions.offset);
            return bytes2read;
        }
    }
    async close() {
        // empty
    }
}

/**
 * Construct ReadStreamTokenizer from given Stream.
 * Will set fileSize, if provided given Stream has set the .path property/
 * @param stream - Read from Node.js Stream.Readable
 * @param fileInfo - Pass the file information, like size and MIME-type of the corresponding stream.
 * @returns ReadStreamTokenizer
 */
function fromStream(stream, fileInfo) {
    fileInfo = fileInfo ? fileInfo : {};
    return new ReadStreamTokenizer(new StreamReader(stream), fileInfo);
}
/**
 * Construct ReadStreamTokenizer from given Buffer.
 * @param uint8Array - Uint8Array to tokenize
 * @param fileInfo - Pass additional file information to the tokenizer
 * @returns BufferTokenizer
 */
function fromBuffer(uint8Array, fileInfo) {
    return new BufferTokenizer(uint8Array, fileInfo);
}

function stringToBytes(string) {
	return [...string].map(character => character.charCodeAt(0)); // eslint-disable-line unicorn/prefer-code-point
}

/**
Checks whether the TAR checksum is valid.

@param {Buffer} buffer - The TAR header `[offset ... offset + 512]`.
@param {number} offset - TAR header offset.
@returns {boolean} `true` if the TAR checksum is valid, otherwise `false`.
*/
function tarHeaderChecksumMatches(buffer, offset = 0) {
	const readSum = Number.parseInt(buffer.toString('utf8', 148, 154).replace(/\0.*$/, '').trim(), 8); // Read sum in header
	if (Number.isNaN(readSum)) {
		return false;
	}

	let sum = 8 * 0x20; // Initialize signed bit sum

	for (let index = offset; index < offset + 148; index++) {
		sum += buffer[index];
	}

	for (let index = offset + 156; index < offset + 512; index++) {
		sum += buffer[index];
	}

	return readSum === sum;
}

/**
ID3 UINT32 sync-safe tokenizer token.
28 bits (representing up to 256MB) integer, the msb is 0 to avoid "false syncsignals".
*/
const uint32SyncSafeToken = {
	get: (buffer, offset) => (buffer[offset + 3] & 0x7F) | ((buffer[offset + 2]) << 7) | ((buffer[offset + 1]) << 14) | ((buffer[offset]) << 21),
	len: 4,
};

const extensions = [
	'jpg',
	'png',
	'apng',
	'gif',
	'webp',
	'flif',
	'xcf',
	'cr2',
	'cr3',
	'orf',
	'arw',
	'dng',
	'nef',
	'rw2',
	'raf',
	'tif',
	'bmp',
	'icns',
	'jxr',
	'psd',
	'indd',
	'zip',
	'tar',
	'rar',
	'gz',
	'bz2',
	'7z',
	'dmg',
	'mp4',
	'mid',
	'mkv',
	'webm',
	'mov',
	'avi',
	'mpg',
	'mp2',
	'mp3',
	'm4a',
	'oga',
	'ogg',
	'ogv',
	'opus',
	'flac',
	'wav',
	'spx',
	'amr',
	'pdf',
	'epub',
	'elf',
	'macho',
	'exe',
	'swf',
	'rtf',
	'wasm',
	'woff',
	'woff2',
	'eot',
	'ttf',
	'otf',
	'ico',
	'flv',
	'ps',
	'xz',
	'sqlite',
	'nes',
	'crx',
	'xpi',
	'cab',
	'deb',
	'ar',
	'rpm',
	'Z',
	'lz',
	'cfb',
	'mxf',
	'mts',
	'blend',
	'bpg',
	'docx',
	'pptx',
	'xlsx',
	'3gp',
	'3g2',
	'j2c',
	'jp2',
	'jpm',
	'jpx',
	'mj2',
	'aif',
	'qcp',
	'odt',
	'ods',
	'odp',
	'xml',
	'mobi',
	'heic',
	'cur',
	'ktx',
	'ape',
	'wv',
	'dcm',
	'ics',
	'glb',
	'pcap',
	'dsf',
	'lnk',
	'alias',
	'voc',
	'ac3',
	'm4v',
	'm4p',
	'm4b',
	'f4v',
	'f4p',
	'f4b',
	'f4a',
	'mie',
	'asf',
	'ogm',
	'ogx',
	'mpc',
	'arrow',
	'shp',
	'aac',
	'mp1',
	'it',
	's3m',
	'xm',
	'ai',
	'skp',
	'avif',
	'eps',
	'lzh',
	'pgp',
	'asar',
	'stl',
	'chm',
	'3mf',
	'zst',
	'jxl',
	'vcf',
	'jls',
	'pst',
	'dwg',
	'parquet',
	'class',
	'arj',
	'cpio',
	'ace',
	'avro',
	'icc',
	'fbx',
];

const mimeTypes = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/webp',
	'image/flif',
	'image/x-xcf',
	'image/x-canon-cr2',
	'image/x-canon-cr3',
	'image/tiff',
	'image/bmp',
	'image/vnd.ms-photo',
	'image/vnd.adobe.photoshop',
	'application/x-indesign',
	'application/epub+zip',
	'application/x-xpinstall',
	'application/vnd.oasis.opendocument.text',
	'application/vnd.oasis.opendocument.spreadsheet',
	'application/vnd.oasis.opendocument.presentation',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'application/zip',
	'application/x-tar',
	'application/x-rar-compressed',
	'application/gzip',
	'application/x-bzip2',
	'application/x-7z-compressed',
	'application/x-apple-diskimage',
	'application/x-apache-arrow',
	'video/mp4',
	'audio/midi',
	'video/x-matroska',
	'video/webm',
	'video/quicktime',
	'video/vnd.avi',
	'audio/vnd.wave',
	'audio/qcelp',
	'audio/x-ms-asf',
	'video/x-ms-asf',
	'application/vnd.ms-asf',
	'video/mpeg',
	'video/3gpp',
	'audio/mpeg',
	'audio/mp4', // RFC 4337
	'audio/opus',
	'video/ogg',
	'audio/ogg',
	'application/ogg',
	'audio/x-flac',
	'audio/ape',
	'audio/wavpack',
	'audio/amr',
	'application/pdf',
	'application/x-elf',
	'application/x-mach-binary',
	'application/x-msdownload',
	'application/x-shockwave-flash',
	'application/rtf',
	'application/wasm',
	'font/woff',
	'font/woff2',
	'application/vnd.ms-fontobject',
	'font/ttf',
	'font/otf',
	'image/x-icon',
	'video/x-flv',
	'application/postscript',
	'application/eps',
	'application/x-xz',
	'application/x-sqlite3',
	'application/x-nintendo-nes-rom',
	'application/x-google-chrome-extension',
	'application/vnd.ms-cab-compressed',
	'application/x-deb',
	'application/x-unix-archive',
	'application/x-rpm',
	'application/x-compress',
	'application/x-lzip',
	'application/x-cfb',
	'application/x-mie',
	'application/mxf',
	'video/mp2t',
	'application/x-blender',
	'image/bpg',
	'image/j2c',
	'image/jp2',
	'image/jpx',
	'image/jpm',
	'image/mj2',
	'audio/aiff',
	'application/xml',
	'application/x-mobipocket-ebook',
	'image/heif',
	'image/heif-sequence',
	'image/heic',
	'image/heic-sequence',
	'image/icns',
	'image/ktx',
	'application/dicom',
	'audio/x-musepack',
	'text/calendar',
	'text/vcard',
	'model/gltf-binary',
	'application/vnd.tcpdump.pcap',
	'audio/x-dsf', // Non-standard
	'application/x.ms.shortcut', // Invented by us
	'application/x.apple.alias', // Invented by us
	'audio/x-voc',
	'audio/vnd.dolby.dd-raw',
	'audio/x-m4a',
	'image/apng',
	'image/x-olympus-orf',
	'image/x-sony-arw',
	'image/x-adobe-dng',
	'image/x-nikon-nef',
	'image/x-panasonic-rw2',
	'image/x-fujifilm-raf',
	'video/x-m4v',
	'video/3gpp2',
	'application/x-esri-shape',
	'audio/aac',
	'audio/x-it',
	'audio/x-s3m',
	'audio/x-xm',
	'video/MP1S',
	'video/MP2P',
	'application/vnd.sketchup.skp',
	'image/avif',
	'application/x-lzh-compressed',
	'application/pgp-encrypted',
	'application/x-asar',
	'model/stl',
	'application/vnd.ms-htmlhelp',
	'model/3mf',
	'image/jxl',
	'application/zstd',
	'image/jls',
	'application/vnd.ms-outlook',
	'image/vnd.dwg',
	'application/x-parquet',
	'application/java-vm',
	'application/x-arj',
	'application/x-cpio',
	'application/x-ace-compressed',
	'application/avro',
	'application/vnd.iccprofile',
	'application/x.autodesk.fbx', // Invented by us
];

const minimumBytes = 4100; // A fair amount of file-types are detectable within this range.

async function fileTypeFromBuffer(input) {
	return new FileTypeParser().fromBuffer(input);
}

function _check(buffer, headers, options) {
	options = {
		offset: 0,
		...options,
	};

	for (const [index, header] of headers.entries()) {
		// If a bitmask is set
		if (options.mask) {
			// If header doesn't equal `buf` with bits masked off
			if (header !== (options.mask[index] & buffer[index + options.offset])) {
				return false;
			}
		} else if (header !== buffer[index + options.offset]) {
			return false;
		}
	}

	return true;
}

class FileTypeParser {
	constructor(options) {
		this.detectors = options?.customDetectors;

		this.fromTokenizer = this.fromTokenizer.bind(this);
		this.fromBuffer = this.fromBuffer.bind(this);
		this.parse = this.parse.bind(this);
	}

	async fromTokenizer(tokenizer) {
		const initialPosition = tokenizer.position;

		for (const detector of this.detectors || []) {
			const fileType = await detector(tokenizer);
			if (fileType) {
				return fileType;
			}

			if (initialPosition !== tokenizer.position) {
				return undefined; // Cannot proceed scanning of the tokenizer is at an arbitrary position
			}
		}

		return this.parse(tokenizer);
	}

	async fromBuffer(input) {
		if (!(input instanceof Uint8Array || input instanceof ArrayBuffer)) {
			throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof input}\``);
		}

		const buffer = input instanceof Uint8Array ? input : new Uint8Array(input);

		if (!(buffer?.length > 1)) {
			return;
		}

		return this.fromTokenizer(fromBuffer(buffer));
	}

	async fromBlob(blob) {
		const buffer = await blob.arrayBuffer();
		return this.fromBuffer(new Uint8Array(buffer));
	}

	async fromStream(stream) {
		const tokenizer = await fromStream(stream);
		try {
			return await this.fromTokenizer(tokenizer);
		} finally {
			await tokenizer.close();
		}
	}

	async toDetectionStream(readableStream, options = {}) {
		const {default: stream} = await import('node:stream');
		const {sampleSize = minimumBytes} = options;

		return new Promise((resolve, reject) => {
			readableStream.on('error', reject);

			readableStream.once('readable', () => {
				(async () => {
					try {
						// Set up output stream
						const pass = new stream.PassThrough();
						const outputStream = stream.pipeline ? stream.pipeline(readableStream, pass, () => {}) : readableStream.pipe(pass);

						// Read the input stream and detect the filetype
						const chunk = readableStream.read(sampleSize) ?? readableStream.read() ?? node_buffer.Buffer.alloc(0);
						try {
							pass.fileType = await this.fromBuffer(chunk);
						} catch (error) {
							if (error instanceof EndOfStreamError) {
								pass.fileType = undefined;
							} else {
								reject(error);
							}
						}

						resolve(outputStream);
					} catch (error) {
						reject(error);
					}
				})();
			});
		});
	}

	check(header, options) {
		return _check(this.buffer, header, options);
	}

	checkString(header, options) {
		return this.check(stringToBytes(header), options);
	}

	async parse(tokenizer) {
		this.buffer = node_buffer.Buffer.alloc(minimumBytes);

		// Keep reading until EOF if the file size is unknown.
		if (tokenizer.fileInfo.size === undefined) {
			tokenizer.fileInfo.size = Number.MAX_SAFE_INTEGER;
		}

		this.tokenizer = tokenizer;

		await tokenizer.peekBuffer(this.buffer, {length: 12, mayBeLess: true});

		// -- 2-byte signatures --

		if (this.check([0x42, 0x4D])) {
			return {
				ext: 'bmp',
				mime: 'image/bmp',
			};
		}

		if (this.check([0x0B, 0x77])) {
			return {
				ext: 'ac3',
				mime: 'audio/vnd.dolby.dd-raw',
			};
		}

		if (this.check([0x78, 0x01])) {
			return {
				ext: 'dmg',
				mime: 'application/x-apple-diskimage',
			};
		}

		if (this.check([0x4D, 0x5A])) {
			return {
				ext: 'exe',
				mime: 'application/x-msdownload',
			};
		}

		if (this.check([0x25, 0x21])) {
			await tokenizer.peekBuffer(this.buffer, {length: 24, mayBeLess: true});

			if (
				this.checkString('PS-Adobe-', {offset: 2})
				&& this.checkString(' EPSF-', {offset: 14})
			) {
				return {
					ext: 'eps',
					mime: 'application/eps',
				};
			}

			return {
				ext: 'ps',
				mime: 'application/postscript',
			};
		}

		if (
			this.check([0x1F, 0xA0])
			|| this.check([0x1F, 0x9D])
		) {
			return {
				ext: 'Z',
				mime: 'application/x-compress',
			};
		}

		if (this.check([0xC7, 0x71])) {
			return {
				ext: 'cpio',
				mime: 'application/x-cpio',
			};
		}

		if (this.check([0x60, 0xEA])) {
			return {
				ext: 'arj',
				mime: 'application/x-arj',
			};
		}

		// -- 3-byte signatures --

		if (this.check([0xEF, 0xBB, 0xBF])) { // UTF-8-BOM
			// Strip off UTF-8-BOM
			this.tokenizer.ignore(3);
			return this.parse(tokenizer);
		}

		if (this.check([0x47, 0x49, 0x46])) {
			return {
				ext: 'gif',
				mime: 'image/gif',
			};
		}

		if (this.check([0x49, 0x49, 0xBC])) {
			return {
				ext: 'jxr',
				mime: 'image/vnd.ms-photo',
			};
		}

		if (this.check([0x1F, 0x8B, 0x8])) {
			return {
				ext: 'gz',
				mime: 'application/gzip',
			};
		}

		if (this.check([0x42, 0x5A, 0x68])) {
			return {
				ext: 'bz2',
				mime: 'application/x-bzip2',
			};
		}

		if (this.checkString('ID3')) {
			await tokenizer.ignore(6); // Skip ID3 header until the header size
			const id3HeaderLength = await tokenizer.readToken(uint32SyncSafeToken);
			if (tokenizer.position + id3HeaderLength > tokenizer.fileInfo.size) {
				// Guess file type based on ID3 header for backward compatibility
				return {
					ext: 'mp3',
					mime: 'audio/mpeg',
				};
			}

			await tokenizer.ignore(id3HeaderLength);
			return this.fromTokenizer(tokenizer); // Skip ID3 header, recursion
		}

		// Musepack, SV7
		if (this.checkString('MP+')) {
			return {
				ext: 'mpc',
				mime: 'audio/x-musepack',
			};
		}

		if (
			(this.buffer[0] === 0x43 || this.buffer[0] === 0x46)
			&& this.check([0x57, 0x53], {offset: 1})
		) {
			return {
				ext: 'swf',
				mime: 'application/x-shockwave-flash',
			};
		}

		// -- 4-byte signatures --

		// Requires a sample size of 4 bytes
		if (this.check([0xFF, 0xD8, 0xFF])) {
			if (this.check([0xF7], {offset: 3})) { // JPG7/SOF55, indicating a ISO/IEC 14495 / JPEG-LS file
				return {
					ext: 'jls',
					mime: 'image/jls',
				};
			}

			return {
				ext: 'jpg',
				mime: 'image/jpeg',
			};
		}

		if (this.check([0x4F, 0x62, 0x6A, 0x01])) {
			return {
				ext: 'avro',
				mime: 'application/avro',
			};
		}

		if (this.checkString('FLIF')) {
			return {
				ext: 'flif',
				mime: 'image/flif',
			};
		}

		if (this.checkString('8BPS')) {
			return {
				ext: 'psd',
				mime: 'image/vnd.adobe.photoshop',
			};
		}

		if (this.checkString('WEBP', {offset: 8})) {
			return {
				ext: 'webp',
				mime: 'image/webp',
			};
		}

		// Musepack, SV8
		if (this.checkString('MPCK')) {
			return {
				ext: 'mpc',
				mime: 'audio/x-musepack',
			};
		}

		if (this.checkString('FORM')) {
			return {
				ext: 'aif',
				mime: 'audio/aiff',
			};
		}

		if (this.checkString('icns', {offset: 0})) {
			return {
				ext: 'icns',
				mime: 'image/icns',
			};
		}

		// Zip-based file formats
		// Need to be before the `zip` check
		if (this.check([0x50, 0x4B, 0x3, 0x4])) { // Local file header signature
			try {
				while (tokenizer.position + 30 < tokenizer.fileInfo.size) {
					await tokenizer.readBuffer(this.buffer, {length: 30});

					// https://en.wikipedia.org/wiki/Zip_(file_format)#File_headers
					const zipHeader = {
						compressedSize: this.buffer.readUInt32LE(18),
						uncompressedSize: this.buffer.readUInt32LE(22),
						filenameLength: this.buffer.readUInt16LE(26),
						extraFieldLength: this.buffer.readUInt16LE(28),
					};

					zipHeader.filename = await tokenizer.readToken(new StringType(zipHeader.filenameLength, 'utf-8'));
					await tokenizer.ignore(zipHeader.extraFieldLength);

					// Assumes signed `.xpi` from addons.mozilla.org
					if (zipHeader.filename === 'META-INF/mozilla.rsa') {
						return {
							ext: 'xpi',
							mime: 'application/x-xpinstall',
						};
					}

					if (zipHeader.filename.endsWith('.rels') || zipHeader.filename.endsWith('.xml')) {
						const type = zipHeader.filename.split('/')[0];
						switch (type) {
							case '_rels':
								break;
							case 'word':
								return {
									ext: 'docx',
									mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
								};
							case 'ppt':
								return {
									ext: 'pptx',
									mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
								};
							case 'xl':
								return {
									ext: 'xlsx',
									mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
								};
							default:
								break;
						}
					}

					if (zipHeader.filename.startsWith('xl/')) {
						return {
							ext: 'xlsx',
							mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						};
					}

					if (zipHeader.filename.startsWith('3D/') && zipHeader.filename.endsWith('.model')) {
						return {
							ext: '3mf',
							mime: 'model/3mf',
						};
					}

					// The docx, xlsx and pptx file types extend the Office Open XML file format:
					// https://en.wikipedia.org/wiki/Office_Open_XML_file_formats
					// We look for:
					// - one entry named '[Content_Types].xml' or '_rels/.rels',
					// - one entry indicating specific type of file.
					// MS Office, OpenOffice and LibreOffice may put the parts in different order, so the check should not rely on it.
					if (zipHeader.filename === 'mimetype' && zipHeader.compressedSize === zipHeader.uncompressedSize) {
						let mimeType = await tokenizer.readToken(new StringType(zipHeader.compressedSize, 'utf-8'));
						mimeType = mimeType.trim();

						switch (mimeType) {
							case 'application/epub+zip':
								return {
									ext: 'epub',
									mime: 'application/epub+zip',
								};
							case 'application/vnd.oasis.opendocument.text':
								return {
									ext: 'odt',
									mime: 'application/vnd.oasis.opendocument.text',
								};
							case 'application/vnd.oasis.opendocument.spreadsheet':
								return {
									ext: 'ods',
									mime: 'application/vnd.oasis.opendocument.spreadsheet',
								};
							case 'application/vnd.oasis.opendocument.presentation':
								return {
									ext: 'odp',
									mime: 'application/vnd.oasis.opendocument.presentation',
								};
							default:
						}
					}

					// Try to find next header manually when current one is corrupted
					if (zipHeader.compressedSize === 0) {
						let nextHeaderIndex = -1;

						while (nextHeaderIndex < 0 && (tokenizer.position < tokenizer.fileInfo.size)) {
							await tokenizer.peekBuffer(this.buffer, {mayBeLess: true});

							nextHeaderIndex = this.buffer.indexOf('504B0304', 0, 'hex');
							// Move position to the next header if found, skip the whole buffer otherwise
							await tokenizer.ignore(nextHeaderIndex >= 0 ? nextHeaderIndex : this.buffer.length);
						}
					} else {
						await tokenizer.ignore(zipHeader.compressedSize);
					}
				}
			} catch (error) {
				if (!(error instanceof EndOfStreamError)) {
					throw error;
				}
			}

			return {
				ext: 'zip',
				mime: 'application/zip',
			};
		}

		if (this.checkString('OggS')) {
			// This is an OGG container
			await tokenizer.ignore(28);
			const type = node_buffer.Buffer.alloc(8);
			await tokenizer.readBuffer(type);

			// Needs to be before `ogg` check
			if (_check(type, [0x4F, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64])) {
				return {
					ext: 'opus',
					mime: 'audio/opus',
				};
			}

			// If ' theora' in header.
			if (_check(type, [0x80, 0x74, 0x68, 0x65, 0x6F, 0x72, 0x61])) {
				return {
					ext: 'ogv',
					mime: 'video/ogg',
				};
			}

			// If '\x01video' in header.
			if (_check(type, [0x01, 0x76, 0x69, 0x64, 0x65, 0x6F, 0x00])) {
				return {
					ext: 'ogm',
					mime: 'video/ogg',
				};
			}

			// If ' FLAC' in header  https://xiph.org/flac/faq.html
			if (_check(type, [0x7F, 0x46, 0x4C, 0x41, 0x43])) {
				return {
					ext: 'oga',
					mime: 'audio/ogg',
				};
			}

			// 'Speex  ' in header https://en.wikipedia.org/wiki/Speex
			if (_check(type, [0x53, 0x70, 0x65, 0x65, 0x78, 0x20, 0x20])) {
				return {
					ext: 'spx',
					mime: 'audio/ogg',
				};
			}

			// If '\x01vorbis' in header
			if (_check(type, [0x01, 0x76, 0x6F, 0x72, 0x62, 0x69, 0x73])) {
				return {
					ext: 'ogg',
					mime: 'audio/ogg',
				};
			}

			// Default OGG container https://www.iana.org/assignments/media-types/application/ogg
			return {
				ext: 'ogx',
				mime: 'application/ogg',
			};
		}

		if (
			this.check([0x50, 0x4B])
			&& (this.buffer[2] === 0x3 || this.buffer[2] === 0x5 || this.buffer[2] === 0x7)
			&& (this.buffer[3] === 0x4 || this.buffer[3] === 0x6 || this.buffer[3] === 0x8)
		) {
			return {
				ext: 'zip',
				mime: 'application/zip',
			};
		}

		//

		// File Type Box (https://en.wikipedia.org/wiki/ISO_base_media_file_format)
		// It's not required to be first, but it's recommended to be. Almost all ISO base media files start with `ftyp` box.
		// `ftyp` box must contain a brand major identifier, which must consist of ISO 8859-1 printable characters.
		// Here we check for 8859-1 printable characters (for simplicity, it's a mask which also catches one non-printable character).
		if (
			this.checkString('ftyp', {offset: 4})
			&& (this.buffer[8] & 0x60) !== 0x00 // Brand major, first character ASCII?
		) {
			// They all can have MIME `video/mp4` except `application/mp4` special-case which is hard to detect.
			// For some cases, we're specific, everything else falls to `video/mp4` with `mp4` extension.
			const brandMajor = this.buffer.toString('binary', 8, 12).replace('\0', ' ').trim();
			switch (brandMajor) {
				case 'avif':
				case 'avis':
					return {ext: 'avif', mime: 'image/avif'};
				case 'mif1':
					return {ext: 'heic', mime: 'image/heif'};
				case 'msf1':
					return {ext: 'heic', mime: 'image/heif-sequence'};
				case 'heic':
				case 'heix':
					return {ext: 'heic', mime: 'image/heic'};
				case 'hevc':
				case 'hevx':
					return {ext: 'heic', mime: 'image/heic-sequence'};
				case 'qt':
					return {ext: 'mov', mime: 'video/quicktime'};
				case 'M4V':
				case 'M4VH':
				case 'M4VP':
					return {ext: 'm4v', mime: 'video/x-m4v'};
				case 'M4P':
					return {ext: 'm4p', mime: 'video/mp4'};
				case 'M4B':
					return {ext: 'm4b', mime: 'audio/mp4'};
				case 'M4A':
					return {ext: 'm4a', mime: 'audio/x-m4a'};
				case 'F4V':
					return {ext: 'f4v', mime: 'video/mp4'};
				case 'F4P':
					return {ext: 'f4p', mime: 'video/mp4'};
				case 'F4A':
					return {ext: 'f4a', mime: 'audio/mp4'};
				case 'F4B':
					return {ext: 'f4b', mime: 'audio/mp4'};
				case 'crx':
					return {ext: 'cr3', mime: 'image/x-canon-cr3'};
				default:
					if (brandMajor.startsWith('3g')) {
						if (brandMajor.startsWith('3g2')) {
							return {ext: '3g2', mime: 'video/3gpp2'};
						}

						return {ext: '3gp', mime: 'video/3gpp'};
					}

					return {ext: 'mp4', mime: 'video/mp4'};
			}
		}

		if (this.checkString('MThd')) {
			return {
				ext: 'mid',
				mime: 'audio/midi',
			};
		}

		if (
			this.checkString('wOFF')
			&& (
				this.check([0x00, 0x01, 0x00, 0x00], {offset: 4})
				|| this.checkString('OTTO', {offset: 4})
			)
		) {
			return {
				ext: 'woff',
				mime: 'font/woff',
			};
		}

		if (
			this.checkString('wOF2')
			&& (
				this.check([0x00, 0x01, 0x00, 0x00], {offset: 4})
				|| this.checkString('OTTO', {offset: 4})
			)
		) {
			return {
				ext: 'woff2',
				mime: 'font/woff2',
			};
		}

		if (this.check([0xD4, 0xC3, 0xB2, 0xA1]) || this.check([0xA1, 0xB2, 0xC3, 0xD4])) {
			return {
				ext: 'pcap',
				mime: 'application/vnd.tcpdump.pcap',
			};
		}

		// Sony DSD Stream File (DSF)
		if (this.checkString('DSD ')) {
			return {
				ext: 'dsf',
				mime: 'audio/x-dsf', // Non-standard
			};
		}

		if (this.checkString('LZIP')) {
			return {
				ext: 'lz',
				mime: 'application/x-lzip',
			};
		}

		if (this.checkString('fLaC')) {
			return {
				ext: 'flac',
				mime: 'audio/x-flac',
			};
		}

		if (this.check([0x42, 0x50, 0x47, 0xFB])) {
			return {
				ext: 'bpg',
				mime: 'image/bpg',
			};
		}

		if (this.checkString('wvpk')) {
			return {
				ext: 'wv',
				mime: 'audio/wavpack',
			};
		}

		if (this.checkString('%PDF')) {
			try {
				await tokenizer.ignore(1350);
				const maxBufferSize = 10 * 1024 * 1024;
				const buffer = node_buffer.Buffer.alloc(Math.min(maxBufferSize, tokenizer.fileInfo.size));
				await tokenizer.readBuffer(buffer, {mayBeLess: true});

				// Check if this is an Adobe Illustrator file
				if (buffer.includes(node_buffer.Buffer.from('AIPrivateData'))) {
					return {
						ext: 'ai',
						mime: 'application/postscript',
					};
				}
			} catch (error) {
				// Swallow end of stream error if file is too small for the Adobe AI check
				if (!(error instanceof EndOfStreamError)) {
					throw error;
				}
			}

			// Assume this is just a normal PDF
			return {
				ext: 'pdf',
				mime: 'application/pdf',
			};
		}

		if (this.check([0x00, 0x61, 0x73, 0x6D])) {
			return {
				ext: 'wasm',
				mime: 'application/wasm',
			};
		}

		// TIFF, little-endian type
		if (this.check([0x49, 0x49])) {
			const fileType = await this.readTiffHeader(false);
			if (fileType) {
				return fileType;
			}
		}

		// TIFF, big-endian type
		if (this.check([0x4D, 0x4D])) {
			const fileType = await this.readTiffHeader(true);
			if (fileType) {
				return fileType;
			}
		}

		if (this.checkString('MAC ')) {
			return {
				ext: 'ape',
				mime: 'audio/ape',
			};
		}

		// https://github.com/file/file/blob/master/magic/Magdir/matroska
		if (this.check([0x1A, 0x45, 0xDF, 0xA3])) { // Root element: EBML
			async function readField() {
				const msb = await tokenizer.peekNumber(UINT8);
				let mask = 0x80;
				let ic = 0; // 0 = A, 1 = B, 2 = C, 3
				// = D

				while ((msb & mask) === 0 && mask !== 0) {
					++ic;
					mask >>= 1;
				}

				const id = node_buffer.Buffer.alloc(ic + 1);
				await tokenizer.readBuffer(id);
				return id;
			}

			async function readElement() {
				const id = await readField();
				const lengthField = await readField();
				lengthField[0] ^= 0x80 >> (lengthField.length - 1);
				const nrLength = Math.min(6, lengthField.length); // JavaScript can max read 6 bytes integer
				return {
					id: id.readUIntBE(0, id.length),
					len: lengthField.readUIntBE(lengthField.length - nrLength, nrLength),
				};
			}

			async function readChildren(children) {
				while (children > 0) {
					const element = await readElement();
					if (element.id === 0x42_82) {
						const rawValue = await tokenizer.readToken(new StringType(element.len, 'utf-8'));
						return rawValue.replace(/\00.*$/g, ''); // Return DocType
					}

					await tokenizer.ignore(element.len); // ignore payload
					--children;
				}
			}

			const re = await readElement();
			const docType = await readChildren(re.len);

			switch (docType) {
				case 'webm':
					return {
						ext: 'webm',
						mime: 'video/webm',
					};

				case 'matroska':
					return {
						ext: 'mkv',
						mime: 'video/x-matroska',
					};

				default:
					return;
			}
		}

		// RIFF file format which might be AVI, WAV, QCP, etc
		if (this.check([0x52, 0x49, 0x46, 0x46])) {
			if (this.check([0x41, 0x56, 0x49], {offset: 8})) {
				return {
					ext: 'avi',
					mime: 'video/vnd.avi',
				};
			}

			if (this.check([0x57, 0x41, 0x56, 0x45], {offset: 8})) {
				return {
					ext: 'wav',
					mime: 'audio/vnd.wave',
				};
			}

			// QLCM, QCP file
			if (this.check([0x51, 0x4C, 0x43, 0x4D], {offset: 8})) {
				return {
					ext: 'qcp',
					mime: 'audio/qcelp',
				};
			}
		}

		if (this.checkString('SQLi')) {
			return {
				ext: 'sqlite',
				mime: 'application/x-sqlite3',
			};
		}

		if (this.check([0x4E, 0x45, 0x53, 0x1A])) {
			return {
				ext: 'nes',
				mime: 'application/x-nintendo-nes-rom',
			};
		}

		if (this.checkString('Cr24')) {
			return {
				ext: 'crx',
				mime: 'application/x-google-chrome-extension',
			};
		}

		if (
			this.checkString('MSCF')
			|| this.checkString('ISc(')
		) {
			return {
				ext: 'cab',
				mime: 'application/vnd.ms-cab-compressed',
			};
		}

		if (this.check([0xED, 0xAB, 0xEE, 0xDB])) {
			return {
				ext: 'rpm',
				mime: 'application/x-rpm',
			};
		}

		if (this.check([0xC5, 0xD0, 0xD3, 0xC6])) {
			return {
				ext: 'eps',
				mime: 'application/eps',
			};
		}

		if (this.check([0x28, 0xB5, 0x2F, 0xFD])) {
			return {
				ext: 'zst',
				mime: 'application/zstd',
			};
		}

		if (this.check([0x7F, 0x45, 0x4C, 0x46])) {
			return {
				ext: 'elf',
				mime: 'application/x-elf',
			};
		}

		if (this.check([0x21, 0x42, 0x44, 0x4E])) {
			return {
				ext: 'pst',
				mime: 'application/vnd.ms-outlook',
			};
		}

		if (this.checkString('PAR1')) {
			return {
				ext: 'parquet',
				mime: 'application/x-parquet',
			};
		}

		if (this.check([0xCF, 0xFA, 0xED, 0xFE])) {
			return {
				ext: 'macho',
				mime: 'application/x-mach-binary',
			};
		}

		// -- 5-byte signatures --

		if (this.check([0x4F, 0x54, 0x54, 0x4F, 0x00])) {
			return {
				ext: 'otf',
				mime: 'font/otf',
			};
		}

		if (this.checkString('#!AMR')) {
			return {
				ext: 'amr',
				mime: 'audio/amr',
			};
		}

		if (this.checkString('{\\rtf')) {
			return {
				ext: 'rtf',
				mime: 'application/rtf',
			};
		}

		if (this.check([0x46, 0x4C, 0x56, 0x01])) {
			return {
				ext: 'flv',
				mime: 'video/x-flv',
			};
		}

		if (this.checkString('IMPM')) {
			return {
				ext: 'it',
				mime: 'audio/x-it',
			};
		}

		if (
			this.checkString('-lh0-', {offset: 2})
			|| this.checkString('-lh1-', {offset: 2})
			|| this.checkString('-lh2-', {offset: 2})
			|| this.checkString('-lh3-', {offset: 2})
			|| this.checkString('-lh4-', {offset: 2})
			|| this.checkString('-lh5-', {offset: 2})
			|| this.checkString('-lh6-', {offset: 2})
			|| this.checkString('-lh7-', {offset: 2})
			|| this.checkString('-lzs-', {offset: 2})
			|| this.checkString('-lz4-', {offset: 2})
			|| this.checkString('-lz5-', {offset: 2})
			|| this.checkString('-lhd-', {offset: 2})
		) {
			return {
				ext: 'lzh',
				mime: 'application/x-lzh-compressed',
			};
		}

		// MPEG program stream (PS or MPEG-PS)
		if (this.check([0x00, 0x00, 0x01, 0xBA])) {
			//  MPEG-PS, MPEG-1 Part 1
			if (this.check([0x21], {offset: 4, mask: [0xF1]})) {
				return {
					ext: 'mpg', // May also be .ps, .mpeg
					mime: 'video/MP1S',
				};
			}

			// MPEG-PS, MPEG-2 Part 1
			if (this.check([0x44], {offset: 4, mask: [0xC4]})) {
				return {
					ext: 'mpg', // May also be .mpg, .m2p, .vob or .sub
					mime: 'video/MP2P',
				};
			}
		}

		if (this.checkString('ITSF')) {
			return {
				ext: 'chm',
				mime: 'application/vnd.ms-htmlhelp',
			};
		}

		if (this.check([0xCA, 0xFE, 0xBA, 0xBE])) {
			return {
				ext: 'class',
				mime: 'application/java-vm',
			};
		}

		// -- 6-byte signatures --

		if (this.check([0xFD, 0x37, 0x7A, 0x58, 0x5A, 0x00])) {
			return {
				ext: 'xz',
				mime: 'application/x-xz',
			};
		}

		if (this.checkString('<?xml ')) {
			return {
				ext: 'xml',
				mime: 'application/xml',
			};
		}

		if (this.check([0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C])) {
			return {
				ext: '7z',
				mime: 'application/x-7z-compressed',
			};
		}

		if (
			this.check([0x52, 0x61, 0x72, 0x21, 0x1A, 0x7])
			&& (this.buffer[6] === 0x0 || this.buffer[6] === 0x1)
		) {
			return {
				ext: 'rar',
				mime: 'application/x-rar-compressed',
			};
		}

		if (this.checkString('solid ')) {
			return {
				ext: 'stl',
				mime: 'model/stl',
			};
		}

		if (this.checkString('AC')) {
			const version = this.buffer.toString('binary', 2, 6);
			if (version.match('^d*') && version >= 1000 && version <= 1050) {
				return {
					ext: 'dwg',
					mime: 'image/vnd.dwg',
				};
			}
		}

		if (this.checkString('070707')) {
			return {
				ext: 'cpio',
				mime: 'application/x-cpio',
			};
		}

		// -- 7-byte signatures --

		if (this.checkString('BLENDER')) {
			return {
				ext: 'blend',
				mime: 'application/x-blender',
			};
		}

		if (this.checkString('!<arch>')) {
			await tokenizer.ignore(8);
			const string = await tokenizer.readToken(new StringType(13, 'ascii'));
			if (string === 'debian-binary') {
				return {
					ext: 'deb',
					mime: 'application/x-deb',
				};
			}

			return {
				ext: 'ar',
				mime: 'application/x-unix-archive',
			};
		}

		if (this.checkString('**ACE', {offset: 7})) {
			await tokenizer.peekBuffer(this.buffer, {length: 14, mayBeLess: true});
			if (this.checkString('**', {offset: 12})) {
				return {
					ext: 'ace',
					mime: 'application/x-ace-compressed',
				};
			}
		}

		// -- 8-byte signatures --

		if (this.check([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) {
			// APNG format (https://wiki.mozilla.org/APNG_Specification)
			// 1. Find the first IDAT (image data) chunk (49 44 41 54)
			// 2. Check if there is an "acTL" chunk before the IDAT one (61 63 54 4C)

			// Offset calculated as follows:
			// - 8 bytes: PNG signature
			// - 4 (length) + 4 (chunk type) + 13 (chunk data) + 4 (CRC): IHDR chunk

			await tokenizer.ignore(8); // ignore PNG signature

			async function readChunkHeader() {
				return {
					length: await tokenizer.readToken(INT32_BE),
					type: await tokenizer.readToken(new StringType(4, 'binary')),
				};
			}

			do {
				const chunk = await readChunkHeader();
				if (chunk.length < 0) {
					return; // Invalid chunk length
				}

				switch (chunk.type) {
					case 'IDAT':
						return {
							ext: 'png',
							mime: 'image/png',
						};
					case 'acTL':
						return {
							ext: 'apng',
							mime: 'image/apng',
						};
					default:
						await tokenizer.ignore(chunk.length + 4); // Ignore chunk-data + CRC
				}
			} while (tokenizer.position + 8 < tokenizer.fileInfo.size);

			return {
				ext: 'png',
				mime: 'image/png',
			};
		}

		if (this.check([0x41, 0x52, 0x52, 0x4F, 0x57, 0x31, 0x00, 0x00])) {
			return {
				ext: 'arrow',
				mime: 'application/x-apache-arrow',
			};
		}

		if (this.check([0x67, 0x6C, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00])) {
			return {
				ext: 'glb',
				mime: 'model/gltf-binary',
			};
		}

		// `mov` format variants
		if (
			this.check([0x66, 0x72, 0x65, 0x65], {offset: 4}) // `free`
			|| this.check([0x6D, 0x64, 0x61, 0x74], {offset: 4}) // `mdat` MJPEG
			|| this.check([0x6D, 0x6F, 0x6F, 0x76], {offset: 4}) // `moov`
			|| this.check([0x77, 0x69, 0x64, 0x65], {offset: 4}) // `wide`
		) {
			return {
				ext: 'mov',
				mime: 'video/quicktime',
			};
		}

		// -- 9-byte signatures --

		if (this.check([0x49, 0x49, 0x52, 0x4F, 0x08, 0x00, 0x00, 0x00, 0x18])) {
			return {
				ext: 'orf',
				mime: 'image/x-olympus-orf',
			};
		}

		if (this.checkString('gimp xcf ')) {
			return {
				ext: 'xcf',
				mime: 'image/x-xcf',
			};
		}

		// -- 12-byte signatures --

		if (this.check([0x49, 0x49, 0x55, 0x00, 0x18, 0x00, 0x00, 0x00, 0x88, 0xE7, 0x74, 0xD8])) {
			return {
				ext: 'rw2',
				mime: 'image/x-panasonic-rw2',
			};
		}

		// ASF_Header_Object first 80 bytes
		if (this.check([0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11, 0xA6, 0xD9])) {
			async function readHeader() {
				const guid = node_buffer.Buffer.alloc(16);
				await tokenizer.readBuffer(guid);
				return {
					id: guid,
					size: Number(await tokenizer.readToken(UINT64_LE)),
				};
			}

			await tokenizer.ignore(30);
			// Search for header should be in first 1KB of file.
			while (tokenizer.position + 24 < tokenizer.fileInfo.size) {
				const header = await readHeader();
				let payload = header.size - 24;
				if (_check(header.id, [0x91, 0x07, 0xDC, 0xB7, 0xB7, 0xA9, 0xCF, 0x11, 0x8E, 0xE6, 0x00, 0xC0, 0x0C, 0x20, 0x53, 0x65])) {
					// Sync on Stream-Properties-Object (B7DC0791-A9B7-11CF-8EE6-00C00C205365)
					const typeId = node_buffer.Buffer.alloc(16);
					payload -= await tokenizer.readBuffer(typeId);

					if (_check(typeId, [0x40, 0x9E, 0x69, 0xF8, 0x4D, 0x5B, 0xCF, 0x11, 0xA8, 0xFD, 0x00, 0x80, 0x5F, 0x5C, 0x44, 0x2B])) {
						// Found audio:
						return {
							ext: 'asf',
							mime: 'audio/x-ms-asf',
						};
					}

					if (_check(typeId, [0xC0, 0xEF, 0x19, 0xBC, 0x4D, 0x5B, 0xCF, 0x11, 0xA8, 0xFD, 0x00, 0x80, 0x5F, 0x5C, 0x44, 0x2B])) {
						// Found video:
						return {
							ext: 'asf',
							mime: 'video/x-ms-asf',
						};
					}

					break;
				}

				await tokenizer.ignore(payload);
			}

			// Default to ASF generic extension
			return {
				ext: 'asf',
				mime: 'application/vnd.ms-asf',
			};
		}

		if (this.check([0xAB, 0x4B, 0x54, 0x58, 0x20, 0x31, 0x31, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A])) {
			return {
				ext: 'ktx',
				mime: 'image/ktx',
			};
		}

		if ((this.check([0x7E, 0x10, 0x04]) || this.check([0x7E, 0x18, 0x04])) && this.check([0x30, 0x4D, 0x49, 0x45], {offset: 4})) {
			return {
				ext: 'mie',
				mime: 'application/x-mie',
			};
		}

		if (this.check([0x27, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], {offset: 2})) {
			return {
				ext: 'shp',
				mime: 'application/x-esri-shape',
			};
		}

		if (this.check([0xFF, 0x4F, 0xFF, 0x51])) {
			return {
				ext: 'j2c',
				mime: 'image/j2c',
			};
		}

		if (this.check([0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20, 0x0D, 0x0A, 0x87, 0x0A])) {
			// JPEG-2000 family

			await tokenizer.ignore(20);
			const type = await tokenizer.readToken(new StringType(4, 'ascii'));
			switch (type) {
				case 'jp2 ':
					return {
						ext: 'jp2',
						mime: 'image/jp2',
					};
				case 'jpx ':
					return {
						ext: 'jpx',
						mime: 'image/jpx',
					};
				case 'jpm ':
					return {
						ext: 'jpm',
						mime: 'image/jpm',
					};
				case 'mjp2':
					return {
						ext: 'mj2',
						mime: 'image/mj2',
					};
				default:
					return;
			}
		}

		if (
			this.check([0xFF, 0x0A])
			|| this.check([0x00, 0x00, 0x00, 0x0C, 0x4A, 0x58, 0x4C, 0x20, 0x0D, 0x0A, 0x87, 0x0A])
		) {
			return {
				ext: 'jxl',
				mime: 'image/jxl',
			};
		}

		if (this.check([0xFE, 0xFF])) { // UTF-16-BOM-LE
			if (this.check([0, 60, 0, 63, 0, 120, 0, 109, 0, 108], {offset: 2})) {
				return {
					ext: 'xml',
					mime: 'application/xml',
				};
			}

			return undefined; // Some unknown text based format
		}

		// -- Unsafe signatures --

		if (
			this.check([0x0, 0x0, 0x1, 0xBA])
			|| this.check([0x0, 0x0, 0x1, 0xB3])
		) {
			return {
				ext: 'mpg',
				mime: 'video/mpeg',
			};
		}

		if (this.check([0x00, 0x01, 0x00, 0x00, 0x00])) {
			return {
				ext: 'ttf',
				mime: 'font/ttf',
			};
		}

		if (this.check([0x00, 0x00, 0x01, 0x00])) {
			return {
				ext: 'ico',
				mime: 'image/x-icon',
			};
		}

		if (this.check([0x00, 0x00, 0x02, 0x00])) {
			return {
				ext: 'cur',
				mime: 'image/x-icon',
			};
		}

		if (this.check([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1])) {
			// Detected Microsoft Compound File Binary File (MS-CFB) Format.
			return {
				ext: 'cfb',
				mime: 'application/x-cfb',
			};
		}

		// Increase sample size from 12 to 256.
		await tokenizer.peekBuffer(this.buffer, {length: Math.min(256, tokenizer.fileInfo.size), mayBeLess: true});

		if (this.check([0x61, 0x63, 0x73, 0x70], {offset: 36})) {
			return {
				ext: 'icc',
				mime: 'application/vnd.iccprofile',
			};
		}

		// -- 15-byte signatures --

		if (this.checkString('BEGIN:')) {
			if (this.checkString('VCARD', {offset: 6})) {
				return {
					ext: 'vcf',
					mime: 'text/vcard',
				};
			}

			if (this.checkString('VCALENDAR', {offset: 6})) {
				return {
					ext: 'ics',
					mime: 'text/calendar',
				};
			}
		}

		// `raf` is here just to keep all the raw image detectors together.
		if (this.checkString('FUJIFILMCCD-RAW')) {
			return {
				ext: 'raf',
				mime: 'image/x-fujifilm-raf',
			};
		}

		if (this.checkString('Extended Module:')) {
			return {
				ext: 'xm',
				mime: 'audio/x-xm',
			};
		}

		if (this.checkString('Creative Voice File')) {
			return {
				ext: 'voc',
				mime: 'audio/x-voc',
			};
		}

		if (this.check([0x04, 0x00, 0x00, 0x00]) && this.buffer.length >= 16) { // Rough & quick check Pickle/ASAR
			const jsonSize = this.buffer.readUInt32LE(12);
			if (jsonSize > 12 && this.buffer.length >= jsonSize + 16) {
				try {
					const header = this.buffer.slice(16, jsonSize + 16).toString();
					const json = JSON.parse(header);
					// Check if Pickle is ASAR
					if (json.files) { // Final check, assuring Pickle/ASAR format
						return {
							ext: 'asar',
							mime: 'application/x-asar',
						};
					}
				} catch {}
			}
		}

		if (this.check([0x06, 0x0E, 0x2B, 0x34, 0x02, 0x05, 0x01, 0x01, 0x0D, 0x01, 0x02, 0x01, 0x01, 0x02])) {
			return {
				ext: 'mxf',
				mime: 'application/mxf',
			};
		}

		if (this.checkString('SCRM', {offset: 44})) {
			return {
				ext: 's3m',
				mime: 'audio/x-s3m',
			};
		}

		// Raw MPEG-2 transport stream (188-byte packets)
		if (this.check([0x47]) && this.check([0x47], {offset: 188})) {
			return {
				ext: 'mts',
				mime: 'video/mp2t',
			};
		}

		// Blu-ray Disc Audio-Video (BDAV) MPEG-2 transport stream has 4-byte TP_extra_header before each 188-byte packet
		if (this.check([0x47], {offset: 4}) && this.check([0x47], {offset: 196})) {
			return {
				ext: 'mts',
				mime: 'video/mp2t',
			};
		}

		if (this.check([0x42, 0x4F, 0x4F, 0x4B, 0x4D, 0x4F, 0x42, 0x49], {offset: 60})) {
			return {
				ext: 'mobi',
				mime: 'application/x-mobipocket-ebook',
			};
		}

		if (this.check([0x44, 0x49, 0x43, 0x4D], {offset: 128})) {
			return {
				ext: 'dcm',
				mime: 'application/dicom',
			};
		}

		if (this.check([0x4C, 0x00, 0x00, 0x00, 0x01, 0x14, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x46])) {
			return {
				ext: 'lnk',
				mime: 'application/x.ms.shortcut', // Invented by us
			};
		}

		if (this.check([0x62, 0x6F, 0x6F, 0x6B, 0x00, 0x00, 0x00, 0x00, 0x6D, 0x61, 0x72, 0x6B, 0x00, 0x00, 0x00, 0x00])) {
			return {
				ext: 'alias',
				mime: 'application/x.apple.alias', // Invented by us
			};
		}

		if (this.checkString('Kaydara FBX Binary  \u0000')) {
			return {
				ext: 'fbx',
				mime: 'application/x.autodesk.fbx', // Invented by us
			};
		}

		if (
			this.check([0x4C, 0x50], {offset: 34})
			&& (
				this.check([0x00, 0x00, 0x01], {offset: 8})
				|| this.check([0x01, 0x00, 0x02], {offset: 8})
				|| this.check([0x02, 0x00, 0x02], {offset: 8})
			)
		) {
			return {
				ext: 'eot',
				mime: 'application/vnd.ms-fontobject',
			};
		}

		if (this.check([0x06, 0x06, 0xED, 0xF5, 0xD8, 0x1D, 0x46, 0xE5, 0xBD, 0x31, 0xEF, 0xE7, 0xFE, 0x74, 0xB7, 0x1D])) {
			return {
				ext: 'indd',
				mime: 'application/x-indesign',
			};
		}

		// Increase sample size from 256 to 512
		await tokenizer.peekBuffer(this.buffer, {length: Math.min(512, tokenizer.fileInfo.size), mayBeLess: true});

		// Requires a buffer size of 512 bytes
		if (tarHeaderChecksumMatches(this.buffer)) {
			return {
				ext: 'tar',
				mime: 'application/x-tar',
			};
		}

		if (this.check([0xFF, 0xFE])) { // UTF-16-BOM-BE
			if (this.check([60, 0, 63, 0, 120, 0, 109, 0, 108, 0], {offset: 2})) {
				return {
					ext: 'xml',
					mime: 'application/xml',
				};
			}

			if (this.check([0xFF, 0x0E, 0x53, 0x00, 0x6B, 0x00, 0x65, 0x00, 0x74, 0x00, 0x63, 0x00, 0x68, 0x00, 0x55, 0x00, 0x70, 0x00, 0x20, 0x00, 0x4D, 0x00, 0x6F, 0x00, 0x64, 0x00, 0x65, 0x00, 0x6C, 0x00], {offset: 2})) {
				return {
					ext: 'skp',
					mime: 'application/vnd.sketchup.skp',
				};
			}

			return undefined; // Some text based format
		}

		if (this.checkString('-----BEGIN PGP MESSAGE-----')) {
			return {
				ext: 'pgp',
				mime: 'application/pgp-encrypted',
			};
		}

		// Check MPEG 1 or 2 Layer 3 header, or 'layer 0' for ADTS (MPEG sync-word 0xFFE)
		if (this.buffer.length >= 2 && this.check([0xFF, 0xE0], {offset: 0, mask: [0xFF, 0xE0]})) {
			if (this.check([0x10], {offset: 1, mask: [0x16]})) {
				// Check for (ADTS) MPEG-2
				if (this.check([0x08], {offset: 1, mask: [0x08]})) {
					return {
						ext: 'aac',
						mime: 'audio/aac',
					};
				}

				// Must be (ADTS) MPEG-4
				return {
					ext: 'aac',
					mime: 'audio/aac',
				};
			}

			// MPEG 1 or 2 Layer 3 header
			// Check for MPEG layer 3
			if (this.check([0x02], {offset: 1, mask: [0x06]})) {
				return {
					ext: 'mp3',
					mime: 'audio/mpeg',
				};
			}

			// Check for MPEG layer 2
			if (this.check([0x04], {offset: 1, mask: [0x06]})) {
				return {
					ext: 'mp2',
					mime: 'audio/mpeg',
				};
			}

			// Check for MPEG layer 1
			if (this.check([0x06], {offset: 1, mask: [0x06]})) {
				return {
					ext: 'mp1',
					mime: 'audio/mpeg',
				};
			}
		}
	}

	async readTiffTag(bigEndian) {
		const tagId = await this.tokenizer.readToken(bigEndian ? UINT16_BE : UINT16_LE);
		this.tokenizer.ignore(10);
		switch (tagId) {
			case 50_341:
				return {
					ext: 'arw',
					mime: 'image/x-sony-arw',
				};
			case 50_706:
				return {
					ext: 'dng',
					mime: 'image/x-adobe-dng',
				};
		}
	}

	async readTiffIFD(bigEndian) {
		const numberOfTags = await this.tokenizer.readToken(bigEndian ? UINT16_BE : UINT16_LE);
		for (let n = 0; n < numberOfTags; ++n) {
			const fileType = await this.readTiffTag(bigEndian);
			if (fileType) {
				return fileType;
			}
		}
	}

	async readTiffHeader(bigEndian) {
		const version = (bigEndian ? UINT16_BE : UINT16_LE).get(this.buffer, 2);
		const ifdOffset = (bigEndian ? UINT32_BE : UINT32_LE).get(this.buffer, 4);

		if (version === 42) {
			// TIFF file header
			if (ifdOffset >= 6) {
				if (this.checkString('CR', {offset: 8})) {
					return {
						ext: 'cr2',
						mime: 'image/x-canon-cr2',
					};
				}

				if (ifdOffset >= 8 && (this.check([0x1C, 0x00, 0xFE, 0x00], {offset: 8}) || this.check([0x1F, 0x00, 0x0B, 0x00], {offset: 8}))) {
					return {
						ext: 'nef',
						mime: 'image/x-nikon-nef',
					};
				}
			}

			await this.tokenizer.ignore(ifdOffset);
			const fileType = await this.readTiffIFD(bigEndian);
			return fileType ?? {
				ext: 'tif',
				mime: 'image/tiff',
			};
		}

		if (version === 43) {	// Big TIFF file header
			return {
				ext: 'tif',
				mime: 'image/tiff',
			};
		}
	}
}

new Set(extensions);
new Set(mimeTypes);

const imageExtensions = new Set([
	'jpg',
	'png',
	'gif',
	'webp',
	'flif',
	'cr2',
	'tif',
	'bmp',
	'jxr',
	'psd',
	'ico',
	'bpg',
	'jp2',
	'jpm',
	'jpx',
	'heic',
	'cur',
	'dcm',
	'avif',
]);

async function imageType(input) {
	const result = await fileTypeFromBuffer(input);
	return imageExtensions.has(result?.ext) && result;
}

var IMAGE_EXT_LIST = [
    ".png",
    ".jpg",
    ".jpeg",
    ".bmp",
    ".gif",
    ".svg",
    ".tiff",
    ".webp",
    ".avif",
];
function isAnImage(ext) {
    return IMAGE_EXT_LIST.includes(ext.toLowerCase());
}
function isAssetTypeAnImage(path$1) {
    return isAnImage(path.extname(path$1));
}
function getUrlAsset(url) {
    return (url = url.substring(1 + url.lastIndexOf("/")).split("?")[0]).split("#")[0];
}
function arrayToObject(arr, key) {
    var obj = {};
    arr.forEach(function (element) {
        obj[element[key]] = element;
    });
    return obj;
}
function resolveImageFile(app, rawLink) {
    var _a;
    if (!rawLink)
        return null;
    var path = rawLink.trim();
    var mdMatch = path.match(/!\[.*?\]\((.*?)\)/);
    if (mdMatch)
        path = mdMatch[1];
    var wikiMatch = path.match(/^!?\[\[(.*?)\]\]$/);
    if (wikiMatch)
        path = wikiMatch[1];
    path = path.replace(/^!/, '').trim();
    try {
        if (/%[0-9A-Fa-f]{2}/.test(path))
            path = decodeURIComponent(path);
    }
    catch (e) {
        console.warn('[resolveImageFile] decodeURIComponent failed:', e);
    }
    var activePath = ((_a = app.workspace.getActiveFile()) === null || _a === void 0 ? void 0 : _a.path) || '';
    var file = app.metadataCache.getFirstLinkpathDest(path, activePath);
    return file;
}

function parseUploadResult(response) {
    var _a;
    if (!response) {
        return { success: false, message: "响应为空", url: null };
    }
    var status = response.status, message = response.message, data = response.data;
    var success = status === true ||
        status === "success" ||
        status === 200;
    var url = (data === null || data === void 0 ? void 0 : data.public_url) || ((_a = data === null || data === void 0 ? void 0 : data.links) === null || _a === void 0 ? void 0 : _a.url) || null;
    return {
        success: success,
        message: message || (success ? "上传成功" : "上传失败"),
        url: url,
    };
}
var LskyProUploader = /** @class */ (function () {
    function LskyProUploader(settings, app, version) {
        if (version === void 0) { version = "v2"; }
        this.settings = settings;
        this.app = app;
        this.version = version;
        // 初始化配置
        this.initializeConfig();
    }
    /**
     * 初始化或更新配置
     */
    LskyProUploader.prototype.initializeConfig = function () {
        var apiPath = this.version === "v1" ? "api/v1/upload" : "api/v2/upload";
        this.lskyUrl = this.settings.uploadServer.endsWith("/")
            ? this.settings.uploadServer + apiPath
            : this.settings.uploadServer + "/" + apiPath;
        this.lskyToken = "Bearer " + this.settings.token;
    };
    /**
     * 更新配置并重新初始化
     * @param settings 新的设置对象
     */
    LskyProUploader.prototype.updateSettings = function (settings) {
        this.settings = settings;
        this.initializeConfig();
    };
    LskyProUploader.prototype.getRequestOptions = function (file) {
        var headers = new Headers();
        headers.append("Authorization", this.lskyToken);
        headers.append("Accept", "application/json");
        var formData = new FormData();
        formData.append("file", file);
        if (this.version === "v1" && this.settings.strategy_id) {
            formData.append("strategy_id", this.settings.strategy_id);
        }
        else if (this.version === "v2" && this.settings.storage_id) {
            formData.append("storage_id", this.settings.storage_id);
        }
        return {
            method: "POST",
            headers: headers,
            body: formData,
        };
    };
    /**
     * 统一上传接口，返回封装后的结构体
     */
    LskyProUploader.prototype.uploadRawFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, res, json, parsed, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        requestOptions = this.getRequestOptions(file);
                        return [4 /*yield*/, fetch(this.lskyUrl, requestOptions)];
                    case 1:
                        res = _b.sent();
                        if (!res.ok) {
                            return [2 /*return*/, { success: false, msg: "HTTP\u9519\u8BEF: ".concat(res.status) }];
                        }
                        json = void 0;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, res.json()];
                    case 3:
                        json = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, { success: false, msg: "响应解析失败（非JSON）" }];
                    case 5:
                        parsed = parseUploadResult(json);
                        if (parsed.success && parsed.url) {
                            return [2 /*return*/, { success: true, url: parsed.url }];
                        }
                        else {
                            // 不输出警告，只返回失败信息
                            return [2 /*return*/, { success: false, msg: parsed.message }];
                        }
                    case 6:
                        error_1 = _b.sent();
                        // 不打印错误日志，让上层统一处理
                        return [2 /*return*/, { success: false, msg: (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || "上传请求异常" }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 将本地 Vault 文件路径转为 File 对象
     */
    LskyProUploader.prototype.createFileObjectFromPath = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var abstractFile, data, fileExt, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        abstractFile = this.app.vault.getAbstractFileByPath(obsidian.normalizePath(filePath));
                        if (!(abstractFile instanceof obsidian.TFile))
                            throw new Error("文件路径无效");
                        return [4 /*yield*/, this.app.vault.readBinary(abstractFile)];
                    case 1:
                        data = _a.sent();
                        fileExt = abstractFile.extension || "png";
                        file = new File([new Blob([data], { type: "image/".concat(fileExt) })], abstractFile.name);
                        return [2 /*return*/, file];
                }
            });
        });
    };
    /**
     * 上传单个文件（支持 File 或路径 string）
     */
    LskyProUploader.prototype.uploadSingleFile = function (fileOrPath) {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!(typeof fileOrPath === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createFileObjectFromPath(fileOrPath)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = fileOrPath;
                        _b.label = 3;
                    case 3:
                        file = _a;
                        return [4 /*yield*/, this.uploadRawFile(file)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        err_1 = _b.sent();
                        return [2 /*return*/, { success: false, msg: (err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || "上传错误" }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 批量上传文件（支持路径数组或 File 数组）
     */
    LskyProUploader.prototype.uploadFiles = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var files, results, failed, urls, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Promise.all(inputs.map(function (input) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(typeof input === "string")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.createFileObjectFromPath(input)];
                                    case 1:
                                        _a = _b.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _a = input;
                                        _b.label = 3;
                                    case 3: return [2 /*return*/, _a];
                                }
                            }); }); }))];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(function (file) { return _this.uploadRawFile(file); }))];
                    case 2:
                        results = _a.sent();
                        failed = results.find(function (res) { return !res.success; });
                        if (failed)
                            throw new Error(failed.msg || "部分文件上传失败");
                        urls = results.map(function (res) { return res.url || ""; }).filter(Boolean);
                        return [2 /*return*/, { success: true, result: urls }];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, { success: false, msg: (err_2 === null || err_2 === void 0 ? void 0 : err_2.message) || "批量上传失败" }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 上传剪贴板中的图片
     */
    LskyProUploader.prototype.uploadFromClipboard = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var file, err_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        file = (_b = (_a = evt.clipboardData) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
                        if (!file)
                            throw new Error("剪贴板中无图片文件");
                        return [4 /*yield*/, this.uploadSingleFile(file)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        err_3 = _c.sent();
                        return [2 /*return*/, { success: false, msg: (err_3 === null || err_3 === void 0 ? void 0 : err_3.message) || "上传剪贴板图片失败" }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LskyProUploader;
}());

// ![](./dsa/aa.png) local image should has ext
// ![](https://dasdasda) internet image should not has ext
//const REGEX_FILE = /\!\[(.*?)\]\((\S+\.\w+)\)|\!\[(.*?)\]\((https?:\/\/.*?)\)/g;
var REGEX_FILE = /!\[(.*?)\]\((.*?)\)/g;
var REGEX_WIKI_FILE = /\!\[\[(.*?)(\s\|.*?)?\]\]/g;
var Helper = /** @class */ (function () {
    function Helper(app) {
        this.app = app;
    }
    Helper.prototype.getFrontmatterValue = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = undefined; }
        var file = this.app.workspace.getActiveFile();
        if (!file) {
            return undefined;
        }
        var path = file.path;
        var cache = this.app.metadataCache.getCache(path);
        var value = defaultValue;
        if ((cache === null || cache === void 0 ? void 0 : cache.frontmatter) && cache.frontmatter.hasOwnProperty(key)) {
            value = cache.frontmatter[key];
        }
        return value;
    };
    Helper.prototype.getEditor = function () {
        var mdView = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (mdView) {
            return mdView.editor;
        }
        else {
            return null;
        }
    };
    Helper.prototype.getValue = function () {
        var editor = this.getEditor();
        return editor.getValue();
    };
    Helper.prototype.setValue = function (value) {
        var editor = this.getEditor();
        var _a = editor.getScrollInfo(), left = _a.left, top = _a.top;
        var position = editor.getCursor();
        editor.setValue(value);
        editor.scrollTo(left, top);
        editor.setCursor(position);
    };
    // get all file urls, include local and internet
    Helper.prototype.getAllFiles = function () {
        var editor = this.getEditor();
        var value = editor.getValue();
        return this.getImageLink(value);
    };
    Helper.prototype.getImageLink = function (value) {
        var e_1, _a, e_2, _b;
        var matches = value.matchAll(REGEX_FILE);
        var WikiMatches = value.matchAll(REGEX_WIKI_FILE);
        var fileArray = [];
        try {
            for (var matches_1 = __values(matches), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
                var match = matches_1_1.value;
                var source = match[0];
                var name_1 = match[1];
                var path$1 = match[2];
                if (!name_1 && match.length > 3) {
                    name_1 = match[3];
                }
                if (!path$1 && match.length > 4) {
                    path$1 = match[4];
                }
                if (!name_1) {
                    name_1 = path$1 === null || path$1 === void 0 ? void 0 : path$1.substring((path$1 === null || path$1 === void 0 ? void 0 : path$1.lastIndexOf('/')) + 1);
                }
                fileArray.push({
                    path: path$1,
                    obspath: path$1,
                    name: name_1,
                    source: source,
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (matches_1_1 && !matches_1_1.done && (_a = matches_1.return)) _a.call(matches_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var WikiMatches_1 = __values(WikiMatches), WikiMatches_1_1 = WikiMatches_1.next(); !WikiMatches_1_1.done; WikiMatches_1_1 = WikiMatches_1.next()) {
                var match = WikiMatches_1_1.value;
                var name_2 = path.parse(match[1]).name;
                var path$1 = match[1];
                var source = match[0];
                fileArray.push({
                    path: path$1,
                    obspath: path$1,
                    name: name_2,
                    source: source,
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (WikiMatches_1_1 && !WikiMatches_1_1.done && (_b = WikiMatches_1.return)) _b.call(WikiMatches_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return fileArray;
    };
    Helper.prototype.hasBlackDomain = function (src, blackDomains) {
        if (blackDomains.trim() === "") {
            return false;
        }
        var blackDomainList = blackDomains.split(",").filter(function (item) { return item !== ""; });
        var url = new URL(src);
        var domain = url.hostname;
        return blackDomainList.some(function (blackDomain) { return domain.includes(blackDomain); });
    };
    return Helper;
}());

// العربية
var ar = {};

// čeština
var cz = {};

// Dansk
var da = {};

// Deutsch
var de = {};

// English
var en = {
    // setting.ts
    "Plugin Settings": "Plugin Settings",
    "Auto pasted upload": "Auto pasted upload",
    "If you set this value true, when you paste image, it will be auto uploaded": "If you set this value true, when you paste image, it will be auto uploaded",
    "Default uploader": "Default uploader",
    "PicList desc": "Search PicList on Github to download and install",
    "Delete image using PicList": "Delete image using PicList",
    "Delete successfully": "Delete successfully",
    "Delete failed": "Delete failed",
    "Image size suffix": "Image size suffix",
    "Image size suffix Description": "like |300 for resize image in ob.",
    "Please input image size suffix": "Please input image size suffix",
    "Error, could not delete": "Error, could not delete",
    "Work on network": "Work on network",
    "Work on network Description": "Allow upload network image by 'Upload all' command.\n Or when you paste, md standard image link in your clipboard will be auto upload.",
    fixPath: "fixPath",
    "Upload when clipboard has image and text together": "Upload when clipboard has image and text together",
    "When you copy, some application like Excel will image and text to clipboard, you can upload or not.": "When you copy, some application like Excel will image and text to clipboard, you can upload or not.",
    "Network Domain Black List": "Network Domain Black List",
    "Network Domain Black List Description": "Image in the domain list will not be upload,use comma separated",
    "Delete source file after you upload file": "Delete source file after you upload file",
    "Delete source file in ob assets after you upload file.": "Delete source file in ob assets after you upload file.",
};

// British English
var enGB = {};

// Español
var es = {};

// français
var fr = {};

// हिन्दी
var hi = {};

// Bahasa Indonesia
var id = {};

// Italiano
var it = {};

// 日本語
var ja = {};

// 한국어
var ko = {};

// Nederlands
var nl = {};

// Norsk
var no = {};

// język polski
var pl = {};

// Português
var pt = {};

// Português do Brasil
// Brazilian Portuguese
var ptBR = {};

// Română
var ro = {};

// русский
var ru = {};

// Türkçe
var tr = {};

// 简体中文
var zhCN = {
    // setting.ts
    "Plugin Settings": "插件设置",
    "Auto pasted upload": "剪切板自动上传",
    "If you set this value true, when you paste image, it will be auto uploaded": "启用该选项后，黏贴图片时会自动上传",
    "Default uploader": "默认上传器",
    "Delete image using PicList": "使用 PicList 删除图片",
    "Delete successfully": "删除成功",
    "Delete failed": "删除失败",
    "Error, could not delete": "错误，无法删除",
    "Image size suffix": "图片大小后缀",
    "Image size suffix Description": "比如：|300 用于调整图片大小",
    "Please input image size suffix": "请输入图片大小后缀",
    "Work on network": "应用网络图片",
    "Work on network Description": "当你上传所有图片时，也会上传网络图片。以及当你进行黏贴时，剪切板中的标准 md 图片会被上传",
    fixPath: "修正PATH变量",
    "Upload when clipboard has image and text together": "当剪切板同时拥有文本和图片剪切板数据时是否上传图片",
    "When you copy, some application like Excel will image and text to clipboard, you can upload or not.": "当你复制时，某些应用例如 Excel 会在剪切板同时文本和图像数据，确认是否上传。",
    "Network Domain Black List": "网络图片域名黑名单",
    "Network Domain Black List Description": "黑名单域名中的图片将不会被上传，用英文逗号分割",
    "Delete source file after you upload file": "上传文件后移除源文件",
    "Delete source file in ob assets after you upload file.": "上传文件后移除在ob附件文件夹中的文件",
};

// 繁體中文
var zhTW = {};

var localeMap = {
    ar: ar,
    cs: cz,
    da: da,
    de: de,
    en: en,
    'en-gb': enGB,
    es: es,
    fr: fr,
    hi: hi,
    id: id,
    it: it,
    ja: ja,
    ko: ko,
    nl: nl,
    nn: no,
    pl: pl,
    pt: pt,
    'pt-br': ptBR,
    ro: ro,
    ru: ru,
    tr: tr,
    'zh-cn': zhCN,
    'zh-tw': zhTW,
};
var locale = localeMap[obsidian.moment.locale()];
function t(str) {
    return (locale && locale[str]) || en[str];
}

var DEFAULT_SETTINGS = {
    uploadByClipSwitch: true,
    uploader: "LskyPro-V2",
    token: "",
    storage_id: "",
    strategy_id: "", // v1版本的默认存储ID
    uploadServer: "https://lsky.xxxx",
    imageSizeSuffix: "",
    workOnNetWork: false,
    fixPath: false,
    applyImage: true,
    newWorkBlackDomains: "",
    deleteSource: false,
};
var SettingTab = /** @class */ (function (_super) {
    __extends(SettingTab, _super);
    function SettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: t("Plugin Settings") });
        new obsidian.Setting(containerEl)
            .setName(t("Auto pasted upload"))
            .setDesc("启用该选项后，黏贴图片时会自动上传到lsky图床")
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.uploadByClipSwitch)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.uploadByClipSwitch = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Default uploader"))
            .setDesc(t("Default uploader"))
            .addDropdown(function (cb) {
            return cb
                .addOption("LskyPro-V2", "LskyPro v2")
                .addOption("LskyPro-V1", "LskyPro v1")
                .setValue(_this.plugin.settings.uploader)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.uploader = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            // 重新初始化上传器以应用新版本
                            this.plugin.reinitUploader();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        // 无论选择哪个版本，都显示基本设置
        new obsidian.Setting(containerEl)
            .setName("LskyPro 域名")
            .setDesc("LskyPro 域名（不需要填写完整的API路径）")
            .addText(function (text) {
            return text
                .setPlaceholder("请输入LskyPro 域名")
                .setValue(_this.plugin.settings.uploadServer)
                .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.uploadServer = key;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            // 重新初始化上传器以应用新域名
                            this.plugin.reinitUploader();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName("LskyPro Token")
            .setDesc("LskyPro Token")
            .addText(function (text) {
            return text
                .setPlaceholder("请输入LskyPro Token")
                .setValue(_this.plugin.settings.token)
                .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.token = key;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            // 重新初始化上传器以应用新Token
                            this.plugin.reinitUploader();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        // 根据版本显示对应的存储ID设置
        if (this.plugin.settings.uploader === "LskyPro-V2") {
            new obsidian.Setting(containerEl)
                .setName("LskyPro Storage ID")
                .setDesc("LskyPro v2版本的存储ID")
                .addText(function (text) {
                return text
                    .setPlaceholder("请输入LskyPro Storage ID")
                    .setValue(_this.plugin.settings.storage_id)
                    .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.storage_id = key;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                // 重新初始化上传器以应用新存储ID
                                this.plugin.reinitUploader();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
        else if (this.plugin.settings.uploader === "LskyPro-V1") {
            new obsidian.Setting(containerEl)
                .setName("LskyPro Strategy ID（可选）")
                .setDesc("LskyPro v1版本的储存策略ID（可选）")
                .addText(function (text) {
                return text
                    .setPlaceholder("请输入LskyPro Strategy ID")
                    .setValue(_this.plugin.settings.strategy_id)
                    .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.strategy_id = key;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                // 重新初始化上传器以应用新策略ID
                                this.plugin.reinitUploader();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
        new obsidian.Setting(containerEl)
            .setName(t("Image size suffix"))
            .setDesc(t("Image size suffix Description"))
            .addText(function (text) {
            return text
                .setPlaceholder(t("Please input image size suffix"))
                .setValue(_this.plugin.settings.imageSizeSuffix)
                .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.imageSizeSuffix = key;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Work on network"))
            .setDesc(t("Work on network Description"))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.workOnNetWork)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.workOnNetWork = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Network Domain Black List"))
            .setDesc(t("Network Domain Black List Description"))
            .addTextArea(function (textArea) {
            return textArea
                .setValue(_this.plugin.settings.newWorkBlackDomains)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.newWorkBlackDomains = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Upload when clipboard has image and text together"))
            .setDesc(t("When you copy, some application like Excel will image and text to clipboard, you can upload or not."))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.applyImage)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.applyImage = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Delete source file after you upload file"))
            .setDesc(t("Delete source file in ob assets after you upload file."))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.deleteSource)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.deleteSource = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return SettingTab;
}(obsidian.PluginSettingTab));

var imageAutoUploadPlugin = /** @class */ (function (_super) {
    __extends(imageAutoUploadPlugin, _super);
    function imageAutoUploadPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    imageAutoUploadPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 重新初始化上传器（当设置更改时调用）
    imageAutoUploadPlugin.prototype.reinitUploader = function () {
        // 如果上传器已存在，直接更新设置而不是创建新实例
        if (this.uploader) {
            this.uploader.updateSettings(this.settings);
        }
        else {
            // 如果上传器不存在，创建新实例
            var version = this.settings.uploader === "LskyPro-V1" ? 'v1' : 'v2';
            this.uploader = new LskyProUploader(this.settings, this.app, version);
        }
    };
    imageAutoUploadPlugin.prototype.onunload = function () { };
    imageAutoUploadPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var version;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.helper = new Helper(this.app);
                        version = this.settings.uploader === "LskyPro-V1" ? 'v1' : 'v2';
                        this.uploader = new LskyProUploader(this.settings, this.app, version);
                        if (!['LskyPro-V2', 'LskyPro-V1'].includes(this.settings.uploader)) {
                            new obsidian.Notice("未知的上传器版本");
                        }
                        obsidian.addIcon("upload", "<svg t=\"1636630783429\" class=\"icon\" viewBox=\"0 0 100 100\" version=\"1.1\" p-id=\"4649\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M 71.638 35.336 L 79.408 35.336 C 83.7 35.336 87.178 38.662 87.178 42.765 L 87.178 84.864 C 87.178 88.969 83.7 92.295 79.408 92.295 L 17.249 92.295 C 12.957 92.295 9.479 88.969 9.479 84.864 L 9.479 42.765 C 9.479 38.662 12.957 35.336 17.249 35.336 L 25.019 35.336 L 25.019 42.765 L 17.249 42.765 L 17.249 84.864 L 79.408 84.864 L 79.408 42.765 L 71.638 42.765 L 71.638 35.336 Z M 49.014 10.179 L 67.326 27.688 L 61.835 32.942 L 52.849 24.352 L 52.849 59.731 L 45.078 59.731 L 45.078 24.455 L 36.194 32.947 L 30.702 27.692 L 49.012 10.181 Z\" p-id=\"4650\" fill=\"#8a8a8a\"></path>\n    </svg>");
                        this.addSettingTab(new SettingTab(this.app, this));
                        this.addCommand({
                            id: "Upload all images",
                            name: "Upload all images",
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                                if (leaf) {
                                    if (!checking) {
                                        _this.uploadAllFile();
                                    }
                                    return true;
                                }
                                return false;
                            },
                        });
                        this.addCommand({
                            id: "Download all images",
                            name: "Download all images",
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                                if (leaf) {
                                    if (!checking) {
                                        _this.downloadAllImageFiles();
                                    }
                                    return true;
                                }
                                return false;
                            },
                        });
                        this.setupPasteHandler();
                        this.registerSelection();
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.registerSelection = function () {
        var _this = this;
        this.registerEvent(this.app.workspace.on("editor-menu", function (menu, editor, info) {
            if (_this.app.workspace.getLeavesOfType("markdown").length === 0) {
                return;
            }
            var selection = editor.getSelection();
            if (selection) {
                // 1. 检查是否为Markdown链接格式 ![]()
                var markdownRegex = /!\[.*\]\((.*)\)/g;
                var markdownMatch = markdownRegex.exec(selection);
                if (markdownMatch && markdownMatch.length > 1) {
                    var markdownUrl = markdownMatch[1];
                    // 检查是否为本地路径（不以http开头）
                    if (!markdownUrl.startsWith('http')) {
                        // 添加上传到图床的菜单项
                        _this.addMenu(menu, markdownUrl, editor);
                    }
                }
                // 2. 检查是否为Wiki链接格式 ![[...]] 或 [[...]]
                else {
                    var wikiLinkRegex = /^!?\[\[(.*?)\]\]$/;
                    var wikiLinkMatch = wikiLinkRegex.exec(selection);
                    if (wikiLinkMatch && wikiLinkMatch.length > 1) {
                        var wikiLinkPath = wikiLinkMatch[1];
                        // 检查是否为本地路径（不以http开头）
                        if (!wikiLinkPath.startsWith('http')) {
                            // 添加上传到图床的菜单项
                            _this.addMenu(menu, wikiLinkPath, editor);
                        }
                    }
                }
            }
        }));
    };
    // 添加右键菜单项
    imageAutoUploadPlugin.prototype.addMenu = function (menu, imageUrl, editor) {
        var _this = this;
        menu.addItem(function (item) {
            item
                .setTitle('上传到图床')
                .setIcon('upload')
                .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                var file, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            file = resolveImageFile(this.app, imageUrl);
                            if (!file) {
                                console.error("\u672A\u627E\u5230\u56FE\u7247\u6587\u4EF6: ".concat(imageUrl));
                                new obsidian.Notice("未找到图片文件");
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.uploader.uploadSingleFile(file.path)];
                        case 1:
                            result = _a.sent();
                            if ((result === null || result === void 0 ? void 0 : result.success) && (result === null || result === void 0 ? void 0 : result.url)) {
                                new obsidian.Notice("\u4E0A\u4F20\u6210\u529F");
                                editor.replaceSelection("![](".concat(result.url, ")"));
                            }
                            else {
                                console.error("\u4E0A\u4F20\u5931\u8D25: ".concat(result === null || result === void 0 ? void 0 : result.msg));
                                new obsidian.Notice('上传失败，请检查网络或配置');
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    imageAutoUploadPlugin.prototype.downloadAllImageFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileArray, folderPathAbs, absfolder, imageArray, count, fileArray_1, fileArray_1_1, file, url, asset, _a, name_1, ext, response, e_1_1, value;
            var e_1, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fileArray = this.helper.getAllFiles();
                        folderPathAbs = this.getAttachmentFolderPath();
                        if (folderPathAbs == null || !folderPathAbs) {
                            new obsidian.Notice("Get attachment folder path faild.");
                            return [2 /*return*/];
                        }
                        absfolder = this.app.vault.getAbstractFileByPath(folderPathAbs);
                        if (!absfolder) {
                            this.app.vault.createFolder(folderPathAbs);
                        }
                        imageArray = [];
                        count = 0;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, 9, 10]);
                        fileArray_1 = __values(fileArray), fileArray_1_1 = fileArray_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!fileArray_1_1.done) return [3 /*break*/, 7];
                        file = fileArray_1_1.value;
                        if (!file.path.startsWith("http")) {
                            return [3 /*break*/, 6];
                        }
                        count++;
                        url = file.path;
                        asset = getUrlAsset(url);
                        _a = __read([
                            decodeURI(path.parse(asset).name).replaceAll(/[\\\\/:*?\"<>|]/g, "-"),
                            path.parse(asset).ext,
                        ], 2), name_1 = _a[0], ext = _a[1];
                        // 如果文件名已存在，则用随机值替换
                        if (this.app.vault.getAbstractFileByPath(folderPathAbs + "/" + asset)) {
                            name_1 = (Math.random() + 1).toString(36).substring(2, 7);
                        }
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.download(url, folderPathAbs, name_1, ext)];
                    case 4:
                        response = _c.sent();
                        if (response.ok) {
                            imageArray.push({
                                source: file.source,
                                name: name_1,
                                path: response.path,
                            });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        fileArray_1_1 = fileArray_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (fileArray_1_1 && !fileArray_1_1.done && (_b = fileArray_1.return)) _b.call(fileArray_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        value = this.helper.getValue();
                        imageArray.map(function (image) {
                            value = value.replace(image.source, "![".concat(image.name).concat(_this.settings.imageSizeSuffix || "", "](").concat(encodeURI(image.path), ")"));
                        });
                        this.helper.setValue(value);
                        new obsidian.Notice("all: ".concat(count, "\nsuccess: ").concat(imageArray.length, "\nfailed: ").concat(count - imageArray.length));
                        return [2 /*return*/];
                }
            });
        });
    };
    //获取附件路径（相对路径）
    imageAutoUploadPlugin.prototype.getAttachmentFolderPath = function () {
        var _a;
        // @ts-ignore
        var assetFolder = this.app.vault.config.attachmentFolderPath;
        if (!assetFolder) {
            assetFolder = "/";
        }
        var activeFile = this.app.vault.getAbstractFileByPath((_a = this.app.workspace.getActiveFile()) === null || _a === void 0 ? void 0 : _a.path);
        if (activeFile == null || !activeFile) {
            return null;
        }
        var parentPath = activeFile.parent.path;
        // 当前文件夹下的子文件夹
        if (assetFolder.startsWith("./")) {
            assetFolder = assetFolder.substring(1);
            var pathTem = parentPath + (assetFolder === "/" ? "" : assetFolder);
            while (pathTem.startsWith("/")) {
                pathTem = pathTem.substring(1);
            }
            return pathTem;
        }
        else {
            return assetFolder;
        }
    };
    imageAutoUploadPlugin.prototype.download = function (url, folderPath, name, ext) {
        return __awaiter(this, void 0, void 0, function () {
            var response, type, arrayBuffer, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, obsidian.requestUrl({ url: url })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, imageType(new Uint8Array(response.arrayBuffer))];
                    case 2:
                        type = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, {
                                    ok: false,
                                    msg: "error",
                                }];
                        }
                        if (!type) {
                            return [2 /*return*/, {
                                    ok: false,
                                    msg: "error",
                                }];
                        }
                        arrayBuffer = response.arrayBuffer;
                        try {
                            path = folderPath + '/' + "".concat(name).concat(ext);
                            if (!ext) {
                                path = folderPath + '/' + "".concat(name, ".").concat(type.ext);
                            }
                            this.app.vault.createBinary(path, arrayBuffer, {
                                ctime: Date.now(),
                                mtime: Date.now()
                            });
                            return [2 /*return*/, {
                                    ok: true,
                                    msg: "ok",
                                    path: path,
                                    type: type,
                                }];
                        }
                        catch (err) {
                            console.error(err);
                            return [2 /*return*/, {
                                    ok: false,
                                    msg: err,
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.filterFile = function (fileArray) {
        var e_2, _a;
        var imageList = [];
        try {
            for (var fileArray_2 = __values(fileArray), fileArray_2_1 = fileArray_2.next(); !fileArray_2_1.done; fileArray_2_1 = fileArray_2.next()) {
                var match = fileArray_2_1.value;
                if (match.path.startsWith("http")) {
                    if (this.settings.workOnNetWork) {
                        if (!this.helper.hasBlackDomain(match.path, this.settings.newWorkBlackDomains)) {
                            imageList.push({
                                path: match.path,
                                obspath: match.path,
                                name: match.name,
                                source: match.source,
                            });
                        }
                    }
                }
                else {
                    imageList.push({
                        path: match.path,
                        obspath: match.obspath,
                        name: match.name,
                        source: match.source,
                    });
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (fileArray_2_1 && !fileArray_2_1.done && (_a = fileArray_2.return)) _a.call(fileArray_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return imageList;
    };
    imageAutoUploadPlugin.prototype.getFile = function (fileName, fileMap) {
        if (!fileMap) {
            fileMap = arrayToObject(this.app.vault.getFiles(), "name");
        }
        return fileMap[fileName];
    };
    // uploda all file
    imageAutoUploadPlugin.prototype.uploadAllFile = function () {
        var e_3, _a;
        var _this = this;
        var content = this.helper.getValue();
        var basePath = this.app.vault.adapter.getBasePath();
        var activeFile = this.app.workspace.getActiveFile();
        var fileMap = arrayToObject(this.app.vault.getFiles(), "name");
        var filePathMap = arrayToObject(this.app.vault.getFiles(), "path");
        var imageList = [];
        var fileArray = this.filterFile(this.helper.getAllFiles());
        var _loop_1 = function (match) {
            var imageName = match.name;
            var encodedUri = match.path;
            if (!encodedUri.startsWith("http")) {
                var matchPath = decodeURI(encodedUri);
                var fileName = path.basename(matchPath);
                var file = void 0;
                // 绝对路径
                if (filePathMap[matchPath]) {
                    file = filePathMap[matchPath];
                }
                // 相对路径
                if ((!file && matchPath.startsWith("./")) ||
                    matchPath.startsWith("../")) {
                    var absoPath = "";
                    //查找相对路径
                    if (matchPath.startsWith("./")) {
                        absoPath = path.dirname(activeFile.path) + matchPath.substring(1);
                    }
                    else {
                        //对于../../开头的路径，需要向上查找匹配
                        var num = matchPath.split("../").length - 1;
                        absoPath = matchPath;
                        for (var i = 0; i < num; i++) {
                            absoPath = absoPath.substring(0, absoPath.lastIndexOf("/"));
                        }
                    }
                    file = this_1.app.vault.getAbstractFileByPath(absoPath);
                }
                // 尽可能短路径
                if (!file) {
                    file = this_1.getFile(fileName, fileMap);
                }
                if (file) {
                    var abstractImageFile_1 = path.join(basePath, file.path);
                    if (isAssetTypeAnImage(abstractImageFile_1)) {
                        var pushObj = {
                            path: abstractImageFile_1,
                            obspath: file.path,
                            name: imageName,
                            source: match.source,
                        };
                        //如果文件中有重复引用的图片，只上传一次
                        if (!imageList.find(function (item) { return item.path === abstractImageFile_1 && item.name === imageName && item.source === match.source; })) {
                            imageList.push(pushObj);
                        }
                    }
                }
            }
        };
        var this_1 = this;
        try {
            for (var fileArray_3 = __values(fileArray), fileArray_3_1 = fileArray_3.next(); !fileArray_3_1.done; fileArray_3_1 = fileArray_3.next()) {
                var match = fileArray_3_1.value;
                _loop_1(match);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (fileArray_3_1 && !fileArray_3_1.done && (_a = fileArray_3.return)) _a.call(fileArray_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (imageList.length === 0) {
            new obsidian.Notice("没有解析到图像文件");
            return;
        }
        else {
            new obsidian.Notice("\u5171\u627E\u5230".concat(imageList.length, "\u4E2A\u56FE\u50CF\u6587\u4EF6\uFF0C\u5F00\u59CB\u4E0A\u4F20"));
        }
        this.uploader.uploadFiles(imageList.map(function (item) { return item.obspath; })).then(function (res) {
            if (res.success) {
                var uploadUrlList_1 = res.result;
                var uploadUrlFullResultList = res.result || [];
                _this.settings.uploadedImages = __spreadArray(__spreadArray([], __read((_this.settings.uploadedImages || [])), false), __read(uploadUrlFullResultList), false);
                _this.saveSettings();
                imageList.map(function (item) {
                    var uploadImage = uploadUrlList_1.shift();
                    content = content.replaceAll(item.source, "![".concat(item.name).concat(_this.settings.imageSizeSuffix || "", "](").concat(uploadImage, ")"));
                });
                _this.helper.setValue(content);
                if (_this.settings.deleteSource) {
                    imageList.map(function (image) {
                        if (!image.path.startsWith("http")) {
                            var fileDel = _this.app.vault.getAbstractFileByPath(image.obspath);
                            if (fileDel) {
                                _this.app.vault.delete(fileDel);
                            }
                        }
                    });
                }
            }
            else {
                new obsidian.Notice("Upload error");
            }
        });
    };
    imageAutoUploadPlugin.prototype.setupPasteHandler = function () {
        var _this = this;
        this.registerEvent(this.app.workspace.on("editor-paste", function (evt, editor, markdownView) {
            var allowUpload = _this.helper.getFrontmatterValue("image-auto-upload", _this.settings.uploadByClipSwitch);
            evt.clipboardData.files;
            if (!allowUpload) {
                return;
            }
            // 剪贴板内容有md格式的图片时
            if (_this.settings.workOnNetWork) {
                var clipboardValue = evt.clipboardData.getData("text/plain");
                var imageList_1 = _this.helper
                    .getImageLink(clipboardValue)
                    .filter(function (image) { return image.path.startsWith("http"); })
                    .filter(function (image) {
                    return !_this.helper.hasBlackDomain(image.path, _this.settings.newWorkBlackDomains);
                });
                if (imageList_1.length !== 0) {
                    _this.uploader
                        .uploadFiles(imageList_1.map(function (item) { return item.path; }))
                        .then(function (res) {
                        var value = _this.helper.getValue();
                        if (res.success) {
                            var uploadUrlList_2 = res.result;
                            imageList_1.map(function (item) {
                                var uploadImage = uploadUrlList_2.shift();
                                value = value.replaceAll(item.source, "![".concat(item.name).concat(_this.settings.imageSizeSuffix || "", "](").concat(uploadImage, ")"));
                            });
                            _this.helper.setValue(value);
                            var uploadUrlFullResultList = res.result || [];
                            _this.settings.uploadedImages = __spreadArray(__spreadArray([], __read((_this.settings.uploadedImages || [])), false), __read(uploadUrlFullResultList), false);
                            _this.saveSettings();
                        }
                        else {
                            new obsidian.Notice("Upload error");
                        }
                    });
                }
            }
            // 剪贴板中是图片时进行上传
            if (_this.canUpload(evt.clipboardData)) {
                _this.uploadFileAndEmbedImgurImage(editor, function (editor, pasteId) { return __awaiter(_this, void 0, void 0, function () {
                    var res, url, uploadUrlFullResultList;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.uploader.uploadFromClipboard(evt)];
                            case 1:
                                res = _a.sent();
                                if (!res.success) {
                                    this.handleFailedUpload(editor, pasteId, res.msg);
                                    return [2 /*return*/];
                                }
                                url = res.url || "";
                                uploadUrlFullResultList = res.result || [];
                                this.settings.uploadedImages = __spreadArray(__spreadArray([], __read((this.settings.uploadedImages || [])), false), __read(uploadUrlFullResultList), false);
                                return [4 /*yield*/, this.saveSettings()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, url];
                        }
                    });
                }); }, evt.clipboardData).catch();
                evt.preventDefault();
            }
        }));
        this.registerEvent(this.app.workspace.on("editor-drop", function (evt, editor, markdownView) { return __awaiter(_this, void 0, void 0, function () {
            var allowUpload, files, files_1, data, uploadUrlFullResultList;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        allowUpload = this.helper.getFrontmatterValue("image-auto-upload", this.settings.uploadByClipSwitch);
                        files = evt.dataTransfer.files;
                        if (!allowUpload) {
                            return [2 /*return*/];
                        }
                        if (!(files.length !== 0 && files[0].type.startsWith("image"))) return [3 /*break*/, 2];
                        files_1 = evt.dataTransfer.files;
                        evt.preventDefault();
                        return [4 /*yield*/, this.uploader.uploadFiles(Array.from(files_1))];
                    case 1:
                        data = _c.sent();
                        if (data.success) {
                            uploadUrlFullResultList = (_a = data.result) !== null && _a !== void 0 ? _a : [];
                            this.settings.uploadedImages = __spreadArray(__spreadArray([], __read(((_b = this.settings.uploadedImages) !== null && _b !== void 0 ? _b : [])), false), __read(uploadUrlFullResultList), false);
                            this.saveSettings();
                            data.result.map(function (value) {
                                var pasteId = (Math.random() + 1).toString(36).substring(2, 7);
                                _this.insertTemporaryText(editor, pasteId);
                                _this.embedMarkDownImage(editor, pasteId, value, files_1[0].name);
                            });
                        }
                        else {
                            new obsidian.Notice("Upload error");
                        }
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }));
    };
    imageAutoUploadPlugin.prototype.canUpload = function (clipboardData) {
        this.settings.applyImage;
        var files = clipboardData.files;
        var text = clipboardData.getData("text");
        var hasImageFile = files.length !== 0 && files[0].type.startsWith("image");
        if (hasImageFile) {
            if (!!text) {
                return this.settings.applyImage;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    imageAutoUploadPlugin.prototype.uploadFileAndEmbedImgurImage = function (editor, callback, clipboardData) {
        return __awaiter(this, void 0, void 0, function () {
            var pasteId, name, url, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pasteId = (Math.random() + 1).toString(36).substring(2, 7);
                        this.insertTemporaryText(editor, pasteId);
                        name = clipboardData.files[0].name;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, callback(editor, pasteId)];
                    case 2:
                        url = _a.sent();
                        this.embedMarkDownImage(editor, pasteId, url, name);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        this.handleFailedUpload(editor, pasteId, e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.insertTemporaryText = function (editor, pasteId) {
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        editor.replaceSelection(progressText + "\n");
    };
    imageAutoUploadPlugin.progressTextFor = function (id) {
        return "![Uploading file...".concat(id, "]()");
    };
    imageAutoUploadPlugin.prototype.embedMarkDownImage = function (editor, pasteId, imageUrl, name) {
        if (name === void 0) { name = ""; }
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        var imageSizeSuffix = this.settings.imageSizeSuffix || "";
        var markDownImage = "![".concat(name).concat(imageSizeSuffix, "](").concat(imageUrl, ")");
        imageAutoUploadPlugin.replaceFirstOccurrence(editor, progressText, markDownImage);
    };
    imageAutoUploadPlugin.prototype.handleFailedUpload = function (editor, pasteId, reason) {
        new obsidian.Notice(reason);
        console.error("Failed request: ", reason);
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        imageAutoUploadPlugin.replaceFirstOccurrence(editor, progressText, "⚠️upload failed, check dev console");
    };
    imageAutoUploadPlugin.replaceFirstOccurrence = function (editor, target, replacement) {
        var lines = editor.getValue().split("\n");
        for (var i = 0; i < lines.length; i++) {
            var ch = lines[i].indexOf(target);
            if (ch != -1) {
                var from = { line: i, ch: ch };
                var to = { line: i, ch: ch + target.length };
                editor.replaceRange(replacement, from, to);
                break;
            }
        }
    };
    return imageAutoUploadPlugin;
}(obsidian.Plugin));

module.exports = imageAutoUploadPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Rva2VuLXR5cGVzL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wZWVrLXJlYWRhYmxlL2xpYi9FbmRPZlN0cmVhbUVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3BlZWstcmVhZGFibGUvbGliL0RlZmVycmVkLmpzIiwibm9kZV9tb2R1bGVzL3BlZWstcmVhZGFibGUvbGliL0Fic3RyYWN0U3RyZWFtUmVhZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BlZWstcmVhZGFibGUvbGliL1N0cmVhbVJlYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9zdHJ0b2szL2xpYi9BYnN0cmFjdFRva2VuaXplci5qcyIsIm5vZGVfbW9kdWxlcy9zdHJ0b2szL2xpYi9SZWFkU3RyZWFtVG9rZW5pemVyLmpzIiwibm9kZV9tb2R1bGVzL3N0cnRvazMvbGliL0J1ZmZlclRva2VuaXplci5qcyIsIm5vZGVfbW9kdWxlcy9zdHJ0b2szL2xpYi9jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2ZpbGUtdHlwZS91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2ZpbGUtdHlwZS9zdXBwb3J0ZWQuanMiLCJub2RlX21vZHVsZXMvZmlsZS10eXBlL2NvcmUuanMiLCJub2RlX21vZHVsZXMvaW1hZ2UtdHlwZS9pbmRleC5qcyIsInNyYy91dGlscy50cyIsInNyYy91cGxvYWQudHMiLCJzcmMvaGVscGVyLnRzIiwic3JjL2xhbmcvbG9jYWxlL2FyLnRzIiwic3JjL2xhbmcvbG9jYWxlL2N6LnRzIiwic3JjL2xhbmcvbG9jYWxlL2RhLnRzIiwic3JjL2xhbmcvbG9jYWxlL2RlLnRzIiwic3JjL2xhbmcvbG9jYWxlL2VuLnRzIiwic3JjL2xhbmcvbG9jYWxlL2VuLWdiLnRzIiwic3JjL2xhbmcvbG9jYWxlL2VzLnRzIiwic3JjL2xhbmcvbG9jYWxlL2ZyLnRzIiwic3JjL2xhbmcvbG9jYWxlL2hpLnRzIiwic3JjL2xhbmcvbG9jYWxlL2lkLnRzIiwic3JjL2xhbmcvbG9jYWxlL2l0LnRzIiwic3JjL2xhbmcvbG9jYWxlL2phLnRzIiwic3JjL2xhbmcvbG9jYWxlL2tvLnRzIiwic3JjL2xhbmcvbG9jYWxlL25sLnRzIiwic3JjL2xhbmcvbG9jYWxlL25vLnRzIiwic3JjL2xhbmcvbG9jYWxlL3BsLnRzIiwic3JjL2xhbmcvbG9jYWxlL3B0LnRzIiwic3JjL2xhbmcvbG9jYWxlL3B0LWJyLnRzIiwic3JjL2xhbmcvbG9jYWxlL3JvLnRzIiwic3JjL2xhbmcvbG9jYWxlL3J1LnRzIiwic3JjL2xhbmcvbG9jYWxlL3RyLnRzIiwic3JjL2xhbmcvbG9jYWxlL3poLWNuLnRzIiwic3JjL2xhbmcvbG9jYWxlL3poLXR3LnRzIiwic3JjL2xhbmcvaGVscGVycy50cyIsInNyYy9zZXR0aW5nLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xyXG4gICAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgdmFyIGFyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcclxuICAgICAgICByZXR1cm4gYXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG93bktleXMobyk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcclxuICAgICAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcclxuICAgICAgICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxufVxyXG5cclxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XHJcbiAgICBmdW5jdGlvbiBmYWlsKGUpIHtcclxuICAgICAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XHJcbiAgICAgICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHZhciByLCBzID0gMDtcclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBzIHw9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX2VzRGVjb3JhdGU6IF9fZXNEZWNvcmF0ZSxcclxuICAgIF9fcnVuSW5pdGlhbGl6ZXJzOiBfX3J1bkluaXRpYWxpemVycyxcclxuICAgIF9fcHJvcEtleTogX19wcm9wS2V5LFxyXG4gICAgX19zZXRGdW5jdGlvbk5hbWU6IF9fc2V0RnVuY3Rpb25OYW1lLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG4gICAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb246IF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxyXG59O1xyXG4iLCIvKiEgaWVlZTc1NC4gQlNELTMtQ2xhdXNlIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwiaW1wb3J0ICogYXMgaWVlZTc1NCBmcm9tICdpZWVlNzU0JztcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ25vZGU6YnVmZmVyJztcbi8vIFByaW1pdGl2ZSB0eXBlc1xuZnVuY3Rpb24gZHYoYXJyYXkpIHtcbiAgICByZXR1cm4gbmV3IERhdGFWaWV3KGFycmF5LmJ1ZmZlciwgYXJyYXkuYnl0ZU9mZnNldCk7XG59XG4vKipcbiAqIDgtYml0IHVuc2lnbmVkIGludGVnZXJcbiAqL1xuZXhwb3J0IGNvbnN0IFVJTlQ4ID0ge1xuICAgIGxlbjogMSxcbiAgICBnZXQoYXJyYXksIG9mZnNldCkge1xuICAgICAgICByZXR1cm4gZHYoYXJyYXkpLmdldFVpbnQ4KG9mZnNldCk7XG4gICAgfSxcbiAgICBwdXQoYXJyYXksIG9mZnNldCwgdmFsdWUpIHtcbiAgICAgICAgZHYoYXJyYXkpLnNldFVpbnQ4KG9mZnNldCwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gb2Zmc2V0ICsgMTtcbiAgICB9XG59O1xuLyoqXG4gKiAxNi1iaXQgdW5zaWduZWQgaW50ZWdlciwgTGl0dGxlIEVuZGlhbiBieXRlIG9yZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBVSU5UMTZfTEUgPSB7XG4gICAgbGVuOiAyLFxuICAgIGdldChhcnJheSwgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBkdihhcnJheSkuZ2V0VWludDE2KG9mZnNldCwgdHJ1ZSk7XG4gICAgfSxcbiAgICBwdXQoYXJyYXksIG9mZnNldCwgdmFsdWUpIHtcbiAgICAgICAgZHYoYXJyYXkpLnNldFVpbnQxNihvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIDI7XG4gICAgfVxufTtcbi8qKlxuICogMTYtYml0IHVuc2lnbmVkIGludGVnZXIsIEJpZyBFbmRpYW4gYnl0ZSBvcmRlclxuICovXG5leHBvcnQgY29uc3QgVUlOVDE2X0JFID0ge1xuICAgIGxlbjogMixcbiAgICBnZXQoYXJyYXksIG9mZnNldCkge1xuICAgICAgICByZXR1cm4gZHYoYXJyYXkpLmdldFVpbnQxNihvZmZzZXQpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRVaW50MTYob2Zmc2V0LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyAyO1xuICAgIH1cbn07XG4vKipcbiAqIDI0LWJpdCB1bnNpZ25lZCBpbnRlZ2VyLCBMaXR0bGUgRW5kaWFuIGJ5dGUgb3JkZXJcbiAqL1xuZXhwb3J0IGNvbnN0IFVJTlQyNF9MRSA9IHtcbiAgICBsZW46IDMsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgY29uc3QgZGF0YVZpZXcgPSBkdihhcnJheSk7XG4gICAgICAgIHJldHVybiBkYXRhVmlldy5nZXRVaW50OChvZmZzZXQpICsgKGRhdGFWaWV3LmdldFVpbnQxNihvZmZzZXQgKyAxLCB0cnVlKSA8PCA4KTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBkYXRhVmlldyA9IGR2KGFycmF5KTtcbiAgICAgICAgZGF0YVZpZXcuc2V0VWludDgob2Zmc2V0LCB2YWx1ZSAmIDB4ZmYpO1xuICAgICAgICBkYXRhVmlldy5zZXRVaW50MTYob2Zmc2V0ICsgMSwgdmFsdWUgPj4gOCwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyAzO1xuICAgIH1cbn07XG4vKipcbiAqIDI0LWJpdCB1bnNpZ25lZCBpbnRlZ2VyLCBCaWcgRW5kaWFuIGJ5dGUgb3JkZXJcbiAqL1xuZXhwb3J0IGNvbnN0IFVJTlQyNF9CRSA9IHtcbiAgICBsZW46IDMsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgY29uc3QgZGF0YVZpZXcgPSBkdihhcnJheSk7XG4gICAgICAgIHJldHVybiAoZGF0YVZpZXcuZ2V0VWludDE2KG9mZnNldCkgPDwgOCkgKyBkYXRhVmlldy5nZXRVaW50OChvZmZzZXQgKyAyKTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBkYXRhVmlldyA9IGR2KGFycmF5KTtcbiAgICAgICAgZGF0YVZpZXcuc2V0VWludDE2KG9mZnNldCwgdmFsdWUgPj4gOCk7XG4gICAgICAgIGRhdGFWaWV3LnNldFVpbnQ4KG9mZnNldCArIDIsIHZhbHVlICYgMHhmZik7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyAzO1xuICAgIH1cbn07XG4vKipcbiAqIDMyLWJpdCB1bnNpZ25lZCBpbnRlZ2VyLCBMaXR0bGUgRW5kaWFuIGJ5dGUgb3JkZXJcbiAqL1xuZXhwb3J0IGNvbnN0IFVJTlQzMl9MRSA9IHtcbiAgICBsZW46IDQsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGR2KGFycmF5KS5nZXRVaW50MzIob2Zmc2V0LCB0cnVlKTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBkdihhcnJheSkuc2V0VWludDMyKG9mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgICAgICByZXR1cm4gb2Zmc2V0ICsgNDtcbiAgICB9XG59O1xuLyoqXG4gKiAzMi1iaXQgdW5zaWduZWQgaW50ZWdlciwgQmlnIEVuZGlhbiBieXRlIG9yZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBVSU5UMzJfQkUgPSB7XG4gICAgbGVuOiA0LFxuICAgIGdldChhcnJheSwgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBkdihhcnJheSkuZ2V0VWludDMyKG9mZnNldCk7XG4gICAgfSxcbiAgICBwdXQoYXJyYXksIG9mZnNldCwgdmFsdWUpIHtcbiAgICAgICAgZHYoYXJyYXkpLnNldFVpbnQzMihvZmZzZXQsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIDQ7XG4gICAgfVxufTtcbi8qKlxuICogOC1iaXQgc2lnbmVkIGludGVnZXJcbiAqL1xuZXhwb3J0IGNvbnN0IElOVDggPSB7XG4gICAgbGVuOiAxLFxuICAgIGdldChhcnJheSwgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBkdihhcnJheSkuZ2V0SW50OChvZmZzZXQpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRJbnQ4KG9mZnNldCwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gb2Zmc2V0ICsgMTtcbiAgICB9XG59O1xuLyoqXG4gKiAxNi1iaXQgc2lnbmVkIGludGVnZXIsIEJpZyBFbmRpYW4gYnl0ZSBvcmRlclxuICovXG5leHBvcnQgY29uc3QgSU5UMTZfQkUgPSB7XG4gICAgbGVuOiAyLFxuICAgIGdldChhcnJheSwgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBkdihhcnJheSkuZ2V0SW50MTYob2Zmc2V0KTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBkdihhcnJheSkuc2V0SW50MTYob2Zmc2V0LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyAyO1xuICAgIH1cbn07XG4vKipcbiAqIDE2LWJpdCBzaWduZWQgaW50ZWdlciwgTGl0dGxlIEVuZGlhbiBieXRlIG9yZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBJTlQxNl9MRSA9IHtcbiAgICBsZW46IDIsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGR2KGFycmF5KS5nZXRJbnQxNihvZmZzZXQsIHRydWUpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRJbnQxNihvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIDI7XG4gICAgfVxufTtcbi8qKlxuICogMjQtYml0IHNpZ25lZCBpbnRlZ2VyLCBMaXR0bGUgRW5kaWFuIGJ5dGUgb3JkZXJcbiAqL1xuZXhwb3J0IGNvbnN0IElOVDI0X0xFID0ge1xuICAgIGxlbjogMyxcbiAgICBnZXQoYXJyYXksIG9mZnNldCkge1xuICAgICAgICBjb25zdCB1bnNpZ25lZCA9IFVJTlQyNF9MRS5nZXQoYXJyYXksIG9mZnNldCk7XG4gICAgICAgIHJldHVybiB1bnNpZ25lZCA+IDB4N2ZmZmZmID8gdW5zaWduZWQgLSAweDEwMDAwMDAgOiB1bnNpZ25lZDtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBkYXRhVmlldyA9IGR2KGFycmF5KTtcbiAgICAgICAgZGF0YVZpZXcuc2V0VWludDgob2Zmc2V0LCB2YWx1ZSAmIDB4ZmYpO1xuICAgICAgICBkYXRhVmlldy5zZXRVaW50MTYob2Zmc2V0ICsgMSwgdmFsdWUgPj4gOCwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyAzO1xuICAgIH1cbn07XG4vKipcbiAqIDI0LWJpdCBzaWduZWQgaW50ZWdlciwgQmlnIEVuZGlhbiBieXRlIG9yZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBJTlQyNF9CRSA9IHtcbiAgICBsZW46IDMsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgY29uc3QgdW5zaWduZWQgPSBVSU5UMjRfQkUuZ2V0KGFycmF5LCBvZmZzZXQpO1xuICAgICAgICByZXR1cm4gdW5zaWduZWQgPiAweDdmZmZmZiA/IHVuc2lnbmVkIC0gMHgxMDAwMDAwIDogdW5zaWduZWQ7XG4gICAgfSxcbiAgICBwdXQoYXJyYXksIG9mZnNldCwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgZGF0YVZpZXcgPSBkdihhcnJheSk7XG4gICAgICAgIGRhdGFWaWV3LnNldFVpbnQxNihvZmZzZXQsIHZhbHVlID4+IDgpO1xuICAgICAgICBkYXRhVmlldy5zZXRVaW50OChvZmZzZXQgKyAyLCB2YWx1ZSAmIDB4ZmYpO1xuICAgICAgICByZXR1cm4gb2Zmc2V0ICsgMztcbiAgICB9XG59O1xuLyoqXG4gKiAzMi1iaXQgc2lnbmVkIGludGVnZXIsIEJpZyBFbmRpYW4gYnl0ZSBvcmRlclxuICovXG5leHBvcnQgY29uc3QgSU5UMzJfQkUgPSB7XG4gICAgbGVuOiA0LFxuICAgIGdldChhcnJheSwgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBkdihhcnJheSkuZ2V0SW50MzIob2Zmc2V0KTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBkdihhcnJheSkuc2V0SW50MzIob2Zmc2V0LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyA0O1xuICAgIH1cbn07XG4vKipcbiAqIDMyLWJpdCBzaWduZWQgaW50ZWdlciwgQmlnIEVuZGlhbiBieXRlIG9yZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBJTlQzMl9MRSA9IHtcbiAgICBsZW46IDQsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGR2KGFycmF5KS5nZXRJbnQzMihvZmZzZXQsIHRydWUpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRJbnQzMihvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIDQ7XG4gICAgfVxufTtcbi8qKlxuICogNjQtYml0IHVuc2lnbmVkIGludGVnZXIsIExpdHRsZSBFbmRpYW4gYnl0ZSBvcmRlclxuICovXG5leHBvcnQgY29uc3QgVUlOVDY0X0xFID0ge1xuICAgIGxlbjogOCxcbiAgICBnZXQoYXJyYXksIG9mZnNldCkge1xuICAgICAgICByZXR1cm4gZHYoYXJyYXkpLmdldEJpZ1VpbnQ2NChvZmZzZXQsIHRydWUpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRCaWdVaW50NjQob2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyA4O1xuICAgIH1cbn07XG4vKipcbiAqIDY0LWJpdCBzaWduZWQgaW50ZWdlciwgTGl0dGxlIEVuZGlhbiBieXRlIG9yZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBJTlQ2NF9MRSA9IHtcbiAgICBsZW46IDgsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGR2KGFycmF5KS5nZXRCaWdJbnQ2NChvZmZzZXQsIHRydWUpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRCaWdJbnQ2NChvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIDg7XG4gICAgfVxufTtcbi8qKlxuICogNjQtYml0IHVuc2lnbmVkIGludGVnZXIsIEJpZyBFbmRpYW4gYnl0ZSBvcmRlclxuICovXG5leHBvcnQgY29uc3QgVUlOVDY0X0JFID0ge1xuICAgIGxlbjogOCxcbiAgICBnZXQoYXJyYXksIG9mZnNldCkge1xuICAgICAgICByZXR1cm4gZHYoYXJyYXkpLmdldEJpZ1VpbnQ2NChvZmZzZXQpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRCaWdVaW50NjQob2Zmc2V0LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyA4O1xuICAgIH1cbn07XG4vKipcbiAqIDY0LWJpdCBzaWduZWQgaW50ZWdlciwgQmlnIEVuZGlhbiBieXRlIG9yZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBJTlQ2NF9CRSA9IHtcbiAgICBsZW46IDgsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGR2KGFycmF5KS5nZXRCaWdJbnQ2NChvZmZzZXQpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRCaWdJbnQ2NChvZmZzZXQsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIDg7XG4gICAgfVxufTtcbi8qKlxuICogSUVFRSA3NTQgMTYtYml0IChoYWxmIHByZWNpc2lvbikgZmxvYXQsIGJpZyBlbmRpYW5cbiAqL1xuZXhwb3J0IGNvbnN0IEZsb2F0MTZfQkUgPSB7XG4gICAgbGVuOiAyLFxuICAgIGdldChkYXRhVmlldywgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBpZWVlNzU0LnJlYWQoZGF0YVZpZXcsIG9mZnNldCwgZmFsc2UsIDEwLCB0aGlzLmxlbik7XG4gICAgfSxcbiAgICBwdXQoZGF0YVZpZXcsIG9mZnNldCwgdmFsdWUpIHtcbiAgICAgICAgaWVlZTc1NC53cml0ZShkYXRhVmlldywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIDEwLCB0aGlzLmxlbik7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyB0aGlzLmxlbjtcbiAgICB9XG59O1xuLyoqXG4gKiBJRUVFIDc1NCAxNi1iaXQgKGhhbGYgcHJlY2lzaW9uKSBmbG9hdCwgbGl0dGxlIGVuZGlhblxuICovXG5leHBvcnQgY29uc3QgRmxvYXQxNl9MRSA9IHtcbiAgICBsZW46IDIsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGllZWU3NTQucmVhZChhcnJheSwgb2Zmc2V0LCB0cnVlLCAxMCwgdGhpcy5sZW4pO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGllZWU3NTQud3JpdGUoYXJyYXksIHZhbHVlLCBvZmZzZXQsIHRydWUsIDEwLCB0aGlzLmxlbik7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyB0aGlzLmxlbjtcbiAgICB9XG59O1xuLyoqXG4gKiBJRUVFIDc1NCAzMi1iaXQgKHNpbmdsZSBwcmVjaXNpb24pIGZsb2F0LCBiaWcgZW5kaWFuXG4gKi9cbmV4cG9ydCBjb25zdCBGbG9hdDMyX0JFID0ge1xuICAgIGxlbjogNCxcbiAgICBnZXQoYXJyYXksIG9mZnNldCkge1xuICAgICAgICByZXR1cm4gZHYoYXJyYXkpLmdldEZsb2F0MzIob2Zmc2V0KTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBkdihhcnJheSkuc2V0RmxvYXQzMihvZmZzZXQsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIDQ7XG4gICAgfVxufTtcbi8qKlxuICogSUVFRSA3NTQgMzItYml0IChzaW5nbGUgcHJlY2lzaW9uKSBmbG9hdCwgbGl0dGxlIGVuZGlhblxuICovXG5leHBvcnQgY29uc3QgRmxvYXQzMl9MRSA9IHtcbiAgICBsZW46IDQsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGR2KGFycmF5KS5nZXRGbG9hdDMyKG9mZnNldCwgdHJ1ZSk7XG4gICAgfSxcbiAgICBwdXQoYXJyYXksIG9mZnNldCwgdmFsdWUpIHtcbiAgICAgICAgZHYoYXJyYXkpLnNldEZsb2F0MzIob2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBvZmZzZXQgKyA0O1xuICAgIH1cbn07XG4vKipcbiAqIElFRUUgNzU0IDY0LWJpdCAoZG91YmxlIHByZWNpc2lvbikgZmxvYXQsIGJpZyBlbmRpYW5cbiAqL1xuZXhwb3J0IGNvbnN0IEZsb2F0NjRfQkUgPSB7XG4gICAgbGVuOiA4LFxuICAgIGdldChhcnJheSwgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBkdihhcnJheSkuZ2V0RmxvYXQ2NChvZmZzZXQpO1xuICAgIH0sXG4gICAgcHV0KGFycmF5LCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICAgIGR2KGFycmF5KS5zZXRGbG9hdDY0KG9mZnNldCwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gb2Zmc2V0ICsgODtcbiAgICB9XG59O1xuLyoqXG4gKiBJRUVFIDc1NCA2NC1iaXQgKGRvdWJsZSBwcmVjaXNpb24pIGZsb2F0LCBsaXR0bGUgZW5kaWFuXG4gKi9cbmV4cG9ydCBjb25zdCBGbG9hdDY0X0xFID0ge1xuICAgIGxlbjogOCxcbiAgICBnZXQoYXJyYXksIG9mZnNldCkge1xuICAgICAgICByZXR1cm4gZHYoYXJyYXkpLmdldEZsb2F0NjQob2Zmc2V0LCB0cnVlKTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBkdihhcnJheSkuc2V0RmxvYXQ2NChvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIDg7XG4gICAgfVxufTtcbi8qKlxuICogSUVFRSA3NTQgODAtYml0IChleHRlbmRlZCBwcmVjaXNpb24pIGZsb2F0LCBiaWcgZW5kaWFuXG4gKi9cbmV4cG9ydCBjb25zdCBGbG9hdDgwX0JFID0ge1xuICAgIGxlbjogMTAsXG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGllZWU3NTQucmVhZChhcnJheSwgb2Zmc2V0LCBmYWxzZSwgNjMsIHRoaXMubGVuKTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBpZWVlNzU0LndyaXRlKGFycmF5LCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgNjMsIHRoaXMubGVuKTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCArIHRoaXMubGVuO1xuICAgIH1cbn07XG4vKipcbiAqIElFRUUgNzU0IDgwLWJpdCAoZXh0ZW5kZWQgcHJlY2lzaW9uKSBmbG9hdCwgbGl0dGxlIGVuZGlhblxuICovXG5leHBvcnQgY29uc3QgRmxvYXQ4MF9MRSA9IHtcbiAgICBsZW46IDEwLFxuICAgIGdldChhcnJheSwgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBpZWVlNzU0LnJlYWQoYXJyYXksIG9mZnNldCwgdHJ1ZSwgNjMsIHRoaXMubGVuKTtcbiAgICB9LFxuICAgIHB1dChhcnJheSwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgICBpZWVlNzU0LndyaXRlKGFycmF5LCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCA2MywgdGhpcy5sZW4pO1xuICAgICAgICByZXR1cm4gb2Zmc2V0ICsgdGhpcy5sZW47XG4gICAgfVxufTtcbi8qKlxuICogSWdub3JlIGEgZ2l2ZW4gbnVtYmVyIG9mIGJ5dGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBJZ25vcmVUeXBlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbGVuIG51bWJlciBvZiBieXRlcyB0byBpZ25vcmVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsZW4pIHtcbiAgICAgICAgdGhpcy5sZW4gPSBsZW47XG4gICAgfVxuICAgIC8vIFRvRG86IGRvbid0IHJlYWQsIGJ1dCBza2lwIGRhdGFcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gICAgZ2V0KGFycmF5LCBvZmYpIHtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgVWludDhBcnJheVR5cGUge1xuICAgIGNvbnN0cnVjdG9yKGxlbikge1xuICAgICAgICB0aGlzLmxlbiA9IGxlbjtcbiAgICB9XG4gICAgZ2V0KGFycmF5LCBvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LnN1YmFycmF5KG9mZnNldCwgb2Zmc2V0ICsgdGhpcy5sZW4pO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBCdWZmZXJUeXBlIHtcbiAgICBjb25zdHJ1Y3RvcihsZW4pIHtcbiAgICAgICAgdGhpcy5sZW4gPSBsZW47XG4gICAgfVxuICAgIGdldCh1aW50OEFycmF5LCBvZmYpIHtcbiAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHVpbnQ4QXJyYXkuc3ViYXJyYXkob2ZmLCBvZmYgKyB0aGlzLmxlbikpO1xuICAgIH1cbn1cbi8qKlxuICogQ29uc3VtZSBhIGZpeGVkIG51bWJlciBvZiBieXRlcyBmcm9tIHRoZSBzdHJlYW0gYW5kIHJldHVybiBhIHN0cmluZyB3aXRoIGEgc3BlY2lmaWVkIGVuY29kaW5nLlxuICovXG5leHBvcnQgY2xhc3MgU3RyaW5nVHlwZSB7XG4gICAgY29uc3RydWN0b3IobGVuLCBlbmNvZGluZykge1xuICAgICAgICB0aGlzLmxlbiA9IGxlbjtcbiAgICAgICAgdGhpcy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICAgIH1cbiAgICBnZXQodWludDhBcnJheSwgb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBCdWZmZXIuZnJvbSh1aW50OEFycmF5KS50b1N0cmluZyh0aGlzLmVuY29kaW5nLCBvZmZzZXQsIG9mZnNldCArIHRoaXMubGVuKTtcbiAgICB9XG59XG4vKipcbiAqIEFOU0kgTGF0aW4gMSBTdHJpbmdcbiAqIFVzaW5nIHdpbmRvd3MtMTI1MiAvIElTTyA4ODU5LTEgZGVjb2RpbmdcbiAqL1xuZXhwb3J0IGNsYXNzIEFuc2lTdHJpbmdUeXBlIHtcbiAgICBjb25zdHJ1Y3RvcihsZW4pIHtcbiAgICAgICAgdGhpcy5sZW4gPSBsZW47XG4gICAgfVxuICAgIHN0YXRpYyBkZWNvZGUoYnVmZmVyLCBvZmZzZXQsIHVudGlsKSB7XG4gICAgICAgIGxldCBzdHIgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IG9mZnNldDsgaSA8IHVudGlsOyArK2kpIHtcbiAgICAgICAgICAgIHN0ciArPSBBbnNpU3RyaW5nVHlwZS5jb2RlUG9pbnRUb1N0cmluZyhBbnNpU3RyaW5nVHlwZS5zaW5nbGVCeXRlRGVjb2RlcihidWZmZXJbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBzdGF0aWMgaW5SYW5nZShhLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gbWluIDw9IGEgJiYgYSA8PSBtYXg7XG4gICAgfVxuICAgIHN0YXRpYyBjb2RlUG9pbnRUb1N0cmluZyhjcCkge1xuICAgICAgICBpZiAoY3AgPD0gMHhGRkZGKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjcCAtPSAweDEwMDAwO1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoKGNwID4+IDEwKSArIDB4RDgwMCwgKGNwICYgMHgzRkYpICsgMHhEQzAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgc2luZ2xlQnl0ZURlY29kZXIoYml0ZSkge1xuICAgICAgICBpZiAoQW5zaVN0cmluZ1R5cGUuaW5SYW5nZShiaXRlLCAweDAwLCAweDdGKSkge1xuICAgICAgICAgICAgcmV0dXJuIGJpdGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29kZVBvaW50ID0gQW5zaVN0cmluZ1R5cGUud2luZG93czEyNTJbYml0ZSAtIDB4ODBdO1xuICAgICAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignaW52YWxpZGluZyBlbmNvZGluZycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2RlUG9pbnQ7XG4gICAgfVxuICAgIGdldChidWZmZXIsIG9mZnNldCA9IDApIHtcbiAgICAgICAgcmV0dXJuIEFuc2lTdHJpbmdUeXBlLmRlY29kZShidWZmZXIsIG9mZnNldCwgb2Zmc2V0ICsgdGhpcy5sZW4pO1xuICAgIH1cbn1cbkFuc2lTdHJpbmdUeXBlLndpbmRvd3MxMjUyID0gWzgzNjQsIDEyOSwgODIxOCwgNDAyLCA4MjIyLCA4MjMwLCA4MjI0LCA4MjI1LCA3MTAsIDgyNDAsIDM1MixcbiAgICA4MjQ5LCAzMzgsIDE0MSwgMzgxLCAxNDMsIDE0NCwgODIxNiwgODIxNywgODIyMCwgODIyMSwgODIyNiwgODIxMSwgODIxMiwgNzMyLFxuICAgIDg0ODIsIDM1MywgODI1MCwgMzM5LCAxNTcsIDM4MiwgMzc2LCAxNjAsIDE2MSwgMTYyLCAxNjMsIDE2NCwgMTY1LCAxNjYsIDE2NywgMTY4LFxuICAgIDE2OSwgMTcwLCAxNzEsIDE3MiwgMTczLCAxNzQsIDE3NSwgMTc2LCAxNzcsIDE3OCwgMTc5LCAxODAsIDE4MSwgMTgyLCAxODMsIDE4NCxcbiAgICAxODUsIDE4NiwgMTg3LCAxODgsIDE4OSwgMTkwLCAxOTEsIDE5MiwgMTkzLCAxOTQsIDE5NSwgMTk2LCAxOTcsIDE5OCwgMTk5LCAyMDAsXG4gICAgMjAxLCAyMDIsIDIwMywgMjA0LCAyMDUsIDIwNiwgMjA3LCAyMDgsIDIwOSwgMjEwLCAyMTEsIDIxMiwgMjEzLCAyMTQsIDIxNSwgMjE2LFxuICAgIDIxNywgMjE4LCAyMTksIDIyMCwgMjIxLCAyMjIsIDIyMywgMjI0LCAyMjUsIDIyNiwgMjI3LCAyMjgsIDIyOSwgMjMwLCAyMzEsIDIzMixcbiAgICAyMzMsIDIzNCwgMjM1LCAyMzYsIDIzNywgMjM4LCAyMzksIDI0MCwgMjQxLCAyNDIsIDI0MywgMjQ0LCAyNDUsIDI0NiwgMjQ3LFxuICAgIDI0OCwgMjQ5LCAyNTAsIDI1MSwgMjUyLCAyNTMsIDI1NCwgMjU1XTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0TWVzc2FnZXMgPSAnRW5kLU9mLVN0cmVhbSc7XG4vKipcbiAqIFRocm93biBvbiByZWFkIG9wZXJhdGlvbiBvZiB0aGUgZW5kIG9mIGZpbGUgb3Igc3RyZWFtIGhhcyBiZWVuIHJlYWNoZWRcbiAqL1xuZXhwb3J0IGNsYXNzIEVuZE9mU3RyZWFtRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKGRlZmF1bHRNZXNzYWdlcyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIERlZmVycmVkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlID0gKCkgPT4gbnVsbDtcbiAgICAgICAgdGhpcy5yZWplY3QgPSAoKSA9PiBudWxsO1xuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVuZE9mU3RyZWFtRXJyb3IgfSBmcm9tIFwiLi9FbmRPZlN0cmVhbUVycm9yLmpzXCI7XG5leHBvcnQgY2xhc3MgQWJzdHJhY3RTdHJlYW1SZWFkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogTWF4aW11bSByZXF1ZXN0IGxlbmd0aCBvbiByZWFkLXN0cmVhbSBvcGVyYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWF4U3RyZWFtUmVhZFNpemUgPSAxICogMTAyNCAqIDEwMjQ7XG4gICAgICAgIHRoaXMuZW5kT2ZTdHJlYW0gPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlIHBlZWtlZCBkYXRhXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGVla1F1ZXVlID0gW107XG4gICAgfVxuICAgIGFzeW5jIHBlZWsodWludDhBcnJheSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYnl0ZXNSZWFkID0gYXdhaXQgdGhpcy5yZWFkKHVpbnQ4QXJyYXksIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5wZWVrUXVldWUucHVzaCh1aW50OEFycmF5LnN1YmFycmF5KG9mZnNldCwgb2Zmc2V0ICsgYnl0ZXNSZWFkKSk7IC8vIFB1dCByZWFkIGRhdGEgYmFjayB0byBwZWVrIGJ1ZmZlclxuICAgICAgICByZXR1cm4gYnl0ZXNSZWFkO1xuICAgIH1cbiAgICBhc3luYyByZWFkKGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJ5dGVzUmVhZCA9IHRoaXMucmVhZEZyb21QZWVrQnVmZmVyKGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgICBieXRlc1JlYWQgKz0gYXdhaXQgdGhpcy5yZWFkUmVtYWluZGVyRnJvbVN0cmVhbShidWZmZXIsIG9mZnNldCArIGJ5dGVzUmVhZCwgbGVuZ3RoIC0gYnl0ZXNSZWFkKTtcbiAgICAgICAgaWYgKGJ5dGVzUmVhZCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVuZE9mU3RyZWFtRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnl0ZXNSZWFkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWFkIGNodW5rIGZyb20gc3RyZWFtXG4gICAgICogQHBhcmFtIGJ1ZmZlciAtIFRhcmdldCBVaW50OEFycmF5IChvciBCdWZmZXIpIHRvIHN0b3JlIGRhdGEgcmVhZCBmcm9tIHN0cmVhbSBpblxuICAgICAqIEBwYXJhbSBvZmZzZXQgLSBPZmZzZXQgdGFyZ2V0XG4gICAgICogQHBhcmFtIGxlbmd0aCAtIE51bWJlciBvZiBieXRlcyB0byByZWFkXG4gICAgICogQHJldHVybnMgTnVtYmVyIG9mIGJ5dGVzIHJlYWRcbiAgICAgKi9cbiAgICByZWFkRnJvbVBlZWtCdWZmZXIoYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICBsZXQgcmVtYWluaW5nID0gbGVuZ3RoO1xuICAgICAgICBsZXQgYnl0ZXNSZWFkID0gMDtcbiAgICAgICAgLy8gY29uc3VtZSBwZWVrZWQgZGF0YSBmaXJzdFxuICAgICAgICB3aGlsZSAodGhpcy5wZWVrUXVldWUubGVuZ3RoID4gMCAmJiByZW1haW5pbmcgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBwZWVrRGF0YSA9IHRoaXMucGVla1F1ZXVlLnBvcCgpOyAvLyBGcm9udCBvZiBxdWV1ZVxuICAgICAgICAgICAgaWYgKCFwZWVrRGF0YSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BlZWtEYXRhIHNob3VsZCBiZSBkZWZpbmVkJyk7XG4gICAgICAgICAgICBjb25zdCBsZW5Db3B5ID0gTWF0aC5taW4ocGVla0RhdGEubGVuZ3RoLCByZW1haW5pbmcpO1xuICAgICAgICAgICAgYnVmZmVyLnNldChwZWVrRGF0YS5zdWJhcnJheSgwLCBsZW5Db3B5KSwgb2Zmc2V0ICsgYnl0ZXNSZWFkKTtcbiAgICAgICAgICAgIGJ5dGVzUmVhZCArPSBsZW5Db3B5O1xuICAgICAgICAgICAgcmVtYWluaW5nIC09IGxlbkNvcHk7XG4gICAgICAgICAgICBpZiAobGVuQ29weSA8IHBlZWtEYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbWFpbmRlciBiYWNrIHRvIHF1ZXVlXG4gICAgICAgICAgICAgICAgdGhpcy5wZWVrUXVldWUucHVzaChwZWVrRGF0YS5zdWJhcnJheShsZW5Db3B5KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzUmVhZDtcbiAgICB9XG4gICAgYXN5bmMgcmVhZFJlbWFpbmRlckZyb21TdHJlYW0oYnVmZmVyLCBvZmZzZXQsIGluaXRpYWxSZW1haW5pbmcpIHtcbiAgICAgICAgbGV0IHJlbWFpbmluZyA9IGluaXRpYWxSZW1haW5pbmc7XG4gICAgICAgIGxldCBieXRlc1JlYWQgPSAwO1xuICAgICAgICAvLyBDb250aW51ZSByZWFkaW5nIGZyb20gc3RyZWFtIGlmIHJlcXVpcmVkXG4gICAgICAgIHdoaWxlIChyZW1haW5pbmcgPiAwICYmICF0aGlzLmVuZE9mU3RyZWFtKSB7XG4gICAgICAgICAgICBjb25zdCByZXFMZW4gPSBNYXRoLm1pbihyZW1haW5pbmcsIHRoaXMubWF4U3RyZWFtUmVhZFNpemUpO1xuICAgICAgICAgICAgY29uc3QgY2h1bmtMZW4gPSBhd2FpdCB0aGlzLnJlYWRGcm9tU3RyZWFtKGJ1ZmZlciwgb2Zmc2V0ICsgYnl0ZXNSZWFkLCByZXFMZW4pO1xuICAgICAgICAgICAgaWYgKGNodW5rTGVuID09PSAwKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgYnl0ZXNSZWFkICs9IGNodW5rTGVuO1xuICAgICAgICAgICAgcmVtYWluaW5nIC09IGNodW5rTGVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlc1JlYWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRW5kT2ZTdHJlYW1FcnJvciB9IGZyb20gJy4vRW5kT2ZTdHJlYW1FcnJvci5qcyc7XG5pbXBvcnQgeyBEZWZlcnJlZCB9IGZyb20gJy4vRGVmZXJyZWQuanMnO1xuaW1wb3J0IHsgQWJzdHJhY3RTdHJlYW1SZWFkZXIgfSBmcm9tIFwiLi9BYnN0cmFjdFN0cmVhbVJlYWRlci5qc1wiO1xuZXhwb3J0IHsgRW5kT2ZTdHJlYW1FcnJvciB9IGZyb20gJy4vRW5kT2ZTdHJlYW1FcnJvci5qcyc7XG4vKipcbiAqIE5vZGUuanMgUmVhZGFibGUgU3RyZWFtIFJlYWRlclxuICogUmVmOiBodHRwczovL25vZGVqcy5vcmcvYXBpL3N0cmVhbS5odG1sI3JlYWRhYmxlLXN0cmVhbXNcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmVhbVJlYWRlciBleHRlbmRzIEFic3RyYWN0U3RyZWFtUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucyA9IHM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZlcnJlZCB1c2VkIGZvciBwb3N0cG9uZWQgcmVhZCByZXF1ZXN0IChhcyBub3QgZGF0YSBpcyB5ZXQgYXZhaWxhYmxlIHRvIHJlYWQpXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlZmVycmVkID0gbnVsbDtcbiAgICAgICAgaWYgKCFzLnJlYWQgfHwgIXMub25jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBzdHJlYW0uUmVhZGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnMub25jZSgnZW5kJywgKCkgPT4gdGhpcy5yZWplY3QobmV3IEVuZE9mU3RyZWFtRXJyb3IoKSkpO1xuICAgICAgICB0aGlzLnMub25jZSgnZXJyb3InLCBlcnIgPT4gdGhpcy5yZWplY3QoZXJyKSk7XG4gICAgICAgIHRoaXMucy5vbmNlKCdjbG9zZScsICgpID0+IHRoaXMucmVqZWN0KG5ldyBFcnJvcignU3RyZWFtIGNsb3NlZCcpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlYWQgY2h1bmsgZnJvbSBzdHJlYW1cbiAgICAgKiBAcGFyYW0gYnVmZmVyIFRhcmdldCBVaW50OEFycmF5IChvciBCdWZmZXIpIHRvIHN0b3JlIGRhdGEgcmVhZCBmcm9tIHN0cmVhbSBpblxuICAgICAqIEBwYXJhbSBvZmZzZXQgT2Zmc2V0IHRhcmdldFxuICAgICAqIEBwYXJhbSBsZW5ndGggTnVtYmVyIG9mIGJ5dGVzIHRvIHJlYWRcbiAgICAgKiBAcmV0dXJucyBOdW1iZXIgb2YgYnl0ZXMgcmVhZFxuICAgICAqL1xuICAgIGFzeW5jIHJlYWRGcm9tU3RyZWFtKGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5kT2ZTdHJlYW0pIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRCdWZmZXIgPSB0aGlzLnMucmVhZChsZW5ndGgpO1xuICAgICAgICBpZiAocmVhZEJ1ZmZlcikge1xuICAgICAgICAgICAgYnVmZmVyLnNldChyZWFkQnVmZmVyLCBvZmZzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRCdWZmZXIubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgICBkZWZlcnJlZDogbmV3IERlZmVycmVkKClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWZlcnJlZCA9IHJlcXVlc3QuZGVmZXJyZWQ7XG4gICAgICAgIHRoaXMucy5vbmNlKCdyZWFkYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVhZERlZmVycmVkKHJlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QuZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvY2VzcyBkZWZlcnJlZCByZWFkIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcmVxdWVzdCBEZWZlcnJlZCByZWFkIHJlcXVlc3RcbiAgICAgKi9cbiAgICByZWFkRGVmZXJyZWQocmVxdWVzdCkge1xuICAgICAgICBjb25zdCByZWFkQnVmZmVyID0gdGhpcy5zLnJlYWQocmVxdWVzdC5sZW5ndGgpO1xuICAgICAgICBpZiAocmVhZEJ1ZmZlcikge1xuICAgICAgICAgICAgcmVxdWVzdC5idWZmZXIuc2V0KHJlYWRCdWZmZXIsIHJlcXVlc3Qub2Zmc2V0KTtcbiAgICAgICAgICAgIHJlcXVlc3QuZGVmZXJyZWQucmVzb2x2ZShyZWFkQnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLmRlZmVycmVkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucy5vbmNlKCdyZWFkYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWREZWZlcnJlZChyZXF1ZXN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlamVjdChlcnIpIHtcbiAgICAgICAgdGhpcy5lbmRPZlN0cmVhbSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmRlZmVycmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgdGhpcy5kZWZlcnJlZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgYWJvcnQoKSB7XG4gICAgICAgIHRoaXMucmVqZWN0KG5ldyBFcnJvcignYWJvcnQnKSk7XG4gICAgfVxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hYm9ydCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVuZE9mU3RyZWFtRXJyb3IgfSBmcm9tICdwZWVrLXJlYWRhYmxlJztcbi8qKlxuICogQ29yZSB0b2tlbml6ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIEFic3RyYWN0VG9rZW5pemVyIHtcbiAgICBjb25zdHJ1Y3RvcihmaWxlSW5mbykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVG9rZW5pemVyLXN0cmVhbSBwb3NpdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDA7XG4gICAgICAgIHRoaXMubnVtQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoOCk7XG4gICAgICAgIHRoaXMuZmlsZUluZm8gPSBmaWxlSW5mbyA/IGZpbGVJbmZvIDoge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlYWQgYSB0b2tlbiBmcm9tIHRoZSB0b2tlbml6ZXItc3RyZWFtXG4gICAgICogQHBhcmFtIHRva2VuIC0gVGhlIHRva2VuIHRvIHJlYWRcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gLSBJZiBwcm92aWRlZCwgdGhlIGRlc2lyZWQgcG9zaXRpb24gaW4gdGhlIHRva2VuaXplci1zdHJlYW1cbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHdpdGggdG9rZW4gZGF0YVxuICAgICAqL1xuICAgIGFzeW5jIHJlYWRUb2tlbih0b2tlbiwgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSh0b2tlbi5sZW4pO1xuICAgICAgICBjb25zdCBsZW4gPSBhd2FpdCB0aGlzLnJlYWRCdWZmZXIodWludDhBcnJheSwgeyBwb3NpdGlvbiB9KTtcbiAgICAgICAgaWYgKGxlbiA8IHRva2VuLmxlbilcbiAgICAgICAgICAgIHRocm93IG5ldyBFbmRPZlN0cmVhbUVycm9yKCk7XG4gICAgICAgIHJldHVybiB0b2tlbi5nZXQodWludDhBcnJheSwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlZWsgYSB0b2tlbiBmcm9tIHRoZSB0b2tlbml6ZXItc3RyZWFtLlxuICAgICAqIEBwYXJhbSB0b2tlbiAtIFRva2VuIHRvIHBlZWsgZnJvbSB0aGUgdG9rZW5pemVyLXN0cmVhbS5cbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gLSBPZmZzZXQgd2hlcmUgdG8gYmVnaW4gcmVhZGluZyB3aXRoaW4gdGhlIGZpbGUuIElmIHBvc2l0aW9uIGlzIG51bGwsIGRhdGEgd2lsbCBiZSByZWFkIGZyb20gdGhlIGN1cnJlbnQgZmlsZSBwb3NpdGlvbi5cbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHdpdGggdG9rZW4gZGF0YVxuICAgICAqL1xuICAgIGFzeW5jIHBlZWtUb2tlbih0b2tlbiwgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSh0b2tlbi5sZW4pO1xuICAgICAgICBjb25zdCBsZW4gPSBhd2FpdCB0aGlzLnBlZWtCdWZmZXIodWludDhBcnJheSwgeyBwb3NpdGlvbiB9KTtcbiAgICAgICAgaWYgKGxlbiA8IHRva2VuLmxlbilcbiAgICAgICAgICAgIHRocm93IG5ldyBFbmRPZlN0cmVhbUVycm9yKCk7XG4gICAgICAgIHJldHVybiB0b2tlbi5nZXQodWludDhBcnJheSwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlYWQgYSBudW1lcmljIHRva2VuIGZyb20gdGhlIHN0cmVhbVxuICAgICAqIEBwYXJhbSB0b2tlbiAtIE51bWVyaWMgdG9rZW5cbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHdpdGggbnVtYmVyXG4gICAgICovXG4gICAgYXN5bmMgcmVhZE51bWJlcih0b2tlbikge1xuICAgICAgICBjb25zdCBsZW4gPSBhd2FpdCB0aGlzLnJlYWRCdWZmZXIodGhpcy5udW1CdWZmZXIsIHsgbGVuZ3RoOiB0b2tlbi5sZW4gfSk7XG4gICAgICAgIGlmIChsZW4gPCB0b2tlbi5sZW4pXG4gICAgICAgICAgICB0aHJvdyBuZXcgRW5kT2ZTdHJlYW1FcnJvcigpO1xuICAgICAgICByZXR1cm4gdG9rZW4uZ2V0KHRoaXMubnVtQnVmZmVyLCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVhZCBhIG51bWVyaWMgdG9rZW4gZnJvbSB0aGUgc3RyZWFtXG4gICAgICogQHBhcmFtIHRva2VuIC0gTnVtZXJpYyB0b2tlblxuICAgICAqIEByZXR1cm5zIFByb21pc2Ugd2l0aCBudW1iZXJcbiAgICAgKi9cbiAgICBhc3luYyBwZWVrTnVtYmVyKHRva2VuKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IGF3YWl0IHRoaXMucGVla0J1ZmZlcih0aGlzLm51bUJ1ZmZlciwgeyBsZW5ndGg6IHRva2VuLmxlbiB9KTtcbiAgICAgICAgaWYgKGxlbiA8IHRva2VuLmxlbilcbiAgICAgICAgICAgIHRocm93IG5ldyBFbmRPZlN0cmVhbUVycm9yKCk7XG4gICAgICAgIHJldHVybiB0b2tlbi5nZXQodGhpcy5udW1CdWZmZXIsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZ25vcmUgbnVtYmVyIG9mIGJ5dGVzLCBhZHZhbmNlcyB0aGUgcG9pbnRlciBpbiB1bmRlciB0b2tlbml6ZXItc3RyZWFtLlxuICAgICAqIEBwYXJhbSBsZW5ndGggLSBOdW1iZXIgb2YgYnl0ZXMgdG8gaWdub3JlXG4gICAgICogQHJldHVybiByZXNvbHZlcyB0aGUgbnVtYmVyIG9mIGJ5dGVzIGlnbm9yZWQsIGVxdWFscyBsZW5ndGggaWYgdGhpcyBhdmFpbGFibGUsIG90aGVyd2lzZSB0aGUgbnVtYmVyIG9mIGJ5dGVzIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGFzeW5jIGlnbm9yZShsZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUluZm8uc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBieXRlc0xlZnQgPSB0aGlzLmZpbGVJbmZvLnNpemUgLSB0aGlzLnBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA+IGJ5dGVzTGVmdCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gKz0gYnl0ZXNMZWZ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBieXRlc0xlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3NpdGlvbiArPSBsZW5ndGg7XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICAvLyBlbXB0eVxuICAgIH1cbiAgICBub3JtYWxpemVPcHRpb25zKHVpbnQ4QXJyYXksIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucG9zaXRpb24gPCB0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BvcHRpb25zLnBvc2l0aW9uYCBtdXN0IGJlIGVxdWFsIG9yIGdyZWF0ZXIgdGhhbiBgdG9rZW5pemVyLnBvc2l0aW9uYCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1heUJlTGVzczogb3B0aW9ucy5tYXlCZUxlc3MgPT09IHRydWUsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBvcHRpb25zLm9mZnNldCA/IG9wdGlvbnMub2Zmc2V0IDogMCxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IG9wdGlvbnMubGVuZ3RoID8gb3B0aW9ucy5sZW5ndGggOiAodWludDhBcnJheS5sZW5ndGggLSAob3B0aW9ucy5vZmZzZXQgPyBvcHRpb25zLm9mZnNldCA6IDApKSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogb3B0aW9ucy5wb3NpdGlvbiA/IG9wdGlvbnMucG9zaXRpb24gOiB0aGlzLnBvc2l0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXlCZUxlc3M6IGZhbHNlLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgbGVuZ3RoOiB1aW50OEFycmF5Lmxlbmd0aCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RUb2tlbml6ZXIgfSBmcm9tICcuL0Fic3RyYWN0VG9rZW5pemVyLmpzJztcbmltcG9ydCB7IEVuZE9mU3RyZWFtRXJyb3IgfSBmcm9tICdwZWVrLXJlYWRhYmxlJztcbmNvbnN0IG1heEJ1ZmZlclNpemUgPSAyNTYwMDA7XG5leHBvcnQgY2xhc3MgUmVhZFN0cmVhbVRva2VuaXplciBleHRlbmRzIEFic3RyYWN0VG9rZW5pemVyIHtcbiAgICBjb25zdHJ1Y3RvcihzdHJlYW1SZWFkZXIsIGZpbGVJbmZvKSB7XG4gICAgICAgIHN1cGVyKGZpbGVJbmZvKTtcbiAgICAgICAgdGhpcy5zdHJlYW1SZWFkZXIgPSBzdHJlYW1SZWFkZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBmaWxlIGluZm9ybWF0aW9uLCBhbiBIVFRQLWNsaWVudCBtYXkgaW1wbGVtZW50IHRoaXMgZG9pbmcgYSBIRUFEIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2Ugd2l0aCBmaWxlIGluZm9ybWF0aW9uXG4gICAgICovXG4gICAgYXN5bmMgZ2V0RmlsZUluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVJbmZvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlciBmcm9tIHRva2VuaXplclxuICAgICAqIEBwYXJhbSB1aW50OEFycmF5IC0gVGFyZ2V0IFVpbnQ4QXJyYXkgdG8gZmlsbCB3aXRoIGRhdGEgcmVhZCBmcm9tIHRoZSB0b2tlbml6ZXItc3RyZWFtXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBSZWFkIGJlaGF2aW91ciBvcHRpb25zXG4gICAgICogQHJldHVybnMgUHJvbWlzZSB3aXRoIG51bWJlciBvZiBieXRlcyByZWFkXG4gICAgICovXG4gICAgYXN5bmMgcmVhZEJ1ZmZlcih1aW50OEFycmF5LCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG5vcm1PcHRpb25zID0gdGhpcy5ub3JtYWxpemVPcHRpb25zKHVpbnQ4QXJyYXksIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBza2lwQnl0ZXMgPSBub3JtT3B0aW9ucy5wb3NpdGlvbiAtIHRoaXMucG9zaXRpb247XG4gICAgICAgIGlmIChza2lwQnl0ZXMgPiAwKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmlnbm9yZShza2lwQnl0ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZEJ1ZmZlcih1aW50OEFycmF5LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChza2lwQnl0ZXMgPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BvcHRpb25zLnBvc2l0aW9uYCBtdXN0IGJlIGVxdWFsIG9yIGdyZWF0ZXIgdGhhbiBgdG9rZW5pemVyLnBvc2l0aW9uYCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3JtT3B0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJ5dGVzUmVhZCA9IGF3YWl0IHRoaXMuc3RyZWFtUmVhZGVyLnJlYWQodWludDhBcnJheSwgbm9ybU9wdGlvbnMub2Zmc2V0LCBub3JtT3B0aW9ucy5sZW5ndGgpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uICs9IGJ5dGVzUmVhZDtcbiAgICAgICAgaWYgKCghb3B0aW9ucyB8fCAhb3B0aW9ucy5tYXlCZUxlc3MpICYmIGJ5dGVzUmVhZCA8IG5vcm1PcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVuZE9mU3RyZWFtRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnl0ZXNSZWFkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZWVrIChyZWFkIGFoZWFkKSBidWZmZXIgZnJvbSB0b2tlbml6ZXJcbiAgICAgKiBAcGFyYW0gdWludDhBcnJheSAtIFVpbnQ4QXJyYXkgKG9yIEJ1ZmZlcikgdG8gd3JpdGUgZGF0YSB0b1xuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUmVhZCBiZWhhdmlvdXIgb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIFByb21pc2Ugd2l0aCBudW1iZXIgb2YgYnl0ZXMgcGVla2VkXG4gICAgICovXG4gICAgYXN5bmMgcGVla0J1ZmZlcih1aW50OEFycmF5LCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG5vcm1PcHRpb25zID0gdGhpcy5ub3JtYWxpemVPcHRpb25zKHVpbnQ4QXJyYXksIG9wdGlvbnMpO1xuICAgICAgICBsZXQgYnl0ZXNSZWFkID0gMDtcbiAgICAgICAgaWYgKG5vcm1PcHRpb25zLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBza2lwQnl0ZXMgPSBub3JtT3B0aW9ucy5wb3NpdGlvbiAtIHRoaXMucG9zaXRpb247XG4gICAgICAgICAgICBpZiAoc2tpcEJ5dGVzID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNraXBCdWZmZXIgPSBuZXcgVWludDhBcnJheShub3JtT3B0aW9ucy5sZW5ndGggKyBza2lwQnl0ZXMpO1xuICAgICAgICAgICAgICAgIGJ5dGVzUmVhZCA9IGF3YWl0IHRoaXMucGVla0J1ZmZlcihza2lwQnVmZmVyLCB7IG1heUJlTGVzczogbm9ybU9wdGlvbnMubWF5QmVMZXNzIH0pO1xuICAgICAgICAgICAgICAgIHVpbnQ4QXJyYXkuc2V0KHNraXBCdWZmZXIuc3ViYXJyYXkoc2tpcEJ5dGVzKSwgbm9ybU9wdGlvbnMub2Zmc2V0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnl0ZXNSZWFkIC0gc2tpcEJ5dGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2tpcEJ5dGVzIDwgMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHBlZWsgZnJvbSBhIG5lZ2F0aXZlIG9mZnNldCBpbiBhIHN0cmVhbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChub3JtT3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGJ5dGVzUmVhZCA9IGF3YWl0IHRoaXMuc3RyZWFtUmVhZGVyLnBlZWsodWludDhBcnJheSwgbm9ybU9wdGlvbnMub2Zmc2V0LCBub3JtT3B0aW9ucy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubWF5QmVMZXNzICYmIGVyciBpbnN0YW5jZW9mIEVuZE9mU3RyZWFtRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoIW5vcm1PcHRpb25zLm1heUJlTGVzcykgJiYgYnl0ZXNSZWFkIDwgbm9ybU9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVuZE9mU3RyZWFtRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnl0ZXNSZWFkO1xuICAgIH1cbiAgICBhc3luYyBpZ25vcmUobGVuZ3RoKSB7XG4gICAgICAgIC8vIGRlYnVnKGBpZ25vcmUgJHt0aGlzLnBvc2l0aW9ufS4uLiR7dGhpcy5wb3NpdGlvbiArIGxlbmd0aCAtIDF9YCk7XG4gICAgICAgIGNvbnN0IGJ1ZlNpemUgPSBNYXRoLm1pbihtYXhCdWZmZXJTaXplLCBsZW5ndGgpO1xuICAgICAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShidWZTaXplKTtcbiAgICAgICAgbGV0IHRvdEJ5dGVzUmVhZCA9IDA7XG4gICAgICAgIHdoaWxlICh0b3RCeXRlc1JlYWQgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IGxlbmd0aCAtIHRvdEJ5dGVzUmVhZDtcbiAgICAgICAgICAgIGNvbnN0IGJ5dGVzUmVhZCA9IGF3YWl0IHRoaXMucmVhZEJ1ZmZlcihidWYsIHsgbGVuZ3RoOiBNYXRoLm1pbihidWZTaXplLCByZW1haW5pbmcpIH0pO1xuICAgICAgICAgICAgaWYgKGJ5dGVzUmVhZCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnl0ZXNSZWFkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90Qnl0ZXNSZWFkICs9IGJ5dGVzUmVhZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG90Qnl0ZXNSZWFkO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVuZE9mU3RyZWFtRXJyb3IgfSBmcm9tICdwZWVrLXJlYWRhYmxlJztcbmltcG9ydCB7IEFic3RyYWN0VG9rZW5pemVyIH0gZnJvbSAnLi9BYnN0cmFjdFRva2VuaXplci5qcyc7XG5leHBvcnQgY2xhc3MgQnVmZmVyVG9rZW5pemVyIGV4dGVuZHMgQWJzdHJhY3RUb2tlbml6ZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBCdWZmZXJUb2tlbml6ZXJcbiAgICAgKiBAcGFyYW0gdWludDhBcnJheSAtIFVpbnQ4QXJyYXkgdG8gdG9rZW5pemVcbiAgICAgKiBAcGFyYW0gZmlsZUluZm8gLSBQYXNzIGFkZGl0aW9uYWwgZmlsZSBpbmZvcm1hdGlvbiB0byB0aGUgdG9rZW5pemVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodWludDhBcnJheSwgZmlsZUluZm8pIHtcbiAgICAgICAgc3VwZXIoZmlsZUluZm8pO1xuICAgICAgICB0aGlzLnVpbnQ4QXJyYXkgPSB1aW50OEFycmF5O1xuICAgICAgICB0aGlzLmZpbGVJbmZvLnNpemUgPSB0aGlzLmZpbGVJbmZvLnNpemUgPyB0aGlzLmZpbGVJbmZvLnNpemUgOiB1aW50OEFycmF5Lmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIgZnJvbSB0b2tlbml6ZXJcbiAgICAgKiBAcGFyYW0gdWludDhBcnJheSAtIFVpbnQ4QXJyYXkgdG8gdG9rZW5pemVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFJlYWQgYmVoYXZpb3VyIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fVxuICAgICAqL1xuICAgIGFzeW5jIHJlYWRCdWZmZXIodWludDhBcnJheSwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wb3NpdGlvbiA8IHRoaXMucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BvcHRpb25zLnBvc2l0aW9uYCBtdXN0IGJlIGVxdWFsIG9yIGdyZWF0ZXIgdGhhbiBgdG9rZW5pemVyLnBvc2l0aW9uYCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG9wdGlvbnMucG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnl0ZXNSZWFkID0gYXdhaXQgdGhpcy5wZWVrQnVmZmVyKHVpbnQ4QXJyYXksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uICs9IGJ5dGVzUmVhZDtcbiAgICAgICAgcmV0dXJuIGJ5dGVzUmVhZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVlayAocmVhZCBhaGVhZCkgYnVmZmVyIGZyb20gdG9rZW5pemVyXG4gICAgICogQHBhcmFtIHVpbnQ4QXJyYXlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFJlYWQgYmVoYXZpb3VyIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fVxuICAgICAqL1xuICAgIGFzeW5jIHBlZWtCdWZmZXIodWludDhBcnJheSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBub3JtT3B0aW9ucyA9IHRoaXMubm9ybWFsaXplT3B0aW9ucyh1aW50OEFycmF5LCBvcHRpb25zKTtcbiAgICAgICAgY29uc3QgYnl0ZXMycmVhZCA9IE1hdGgubWluKHRoaXMudWludDhBcnJheS5sZW5ndGggLSBub3JtT3B0aW9ucy5wb3NpdGlvbiwgbm9ybU9wdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgaWYgKCghbm9ybU9wdGlvbnMubWF5QmVMZXNzKSAmJiBieXRlczJyZWFkIDwgbm9ybU9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRW5kT2ZTdHJlYW1FcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdWludDhBcnJheS5zZXQodGhpcy51aW50OEFycmF5LnN1YmFycmF5KG5vcm1PcHRpb25zLnBvc2l0aW9uLCBub3JtT3B0aW9ucy5wb3NpdGlvbiArIGJ5dGVzMnJlYWQpLCBub3JtT3B0aW9ucy5vZmZzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzMnJlYWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2xvc2UoKSB7XG4gICAgICAgIC8vIGVtcHR5XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVhZFN0cmVhbVRva2VuaXplciB9IGZyb20gJy4vUmVhZFN0cmVhbVRva2VuaXplci5qcyc7XG5pbXBvcnQgeyBCdWZmZXJUb2tlbml6ZXIgfSBmcm9tICcuL0J1ZmZlclRva2VuaXplci5qcyc7XG5pbXBvcnQgeyBTdHJlYW1SZWFkZXIsIFdlYlN0cmVhbVJlYWRlciB9IGZyb20gJ3BlZWstcmVhZGFibGUnO1xuZXhwb3J0IHsgRW5kT2ZTdHJlYW1FcnJvciB9IGZyb20gJ3BlZWstcmVhZGFibGUnO1xuLyoqXG4gKiBDb25zdHJ1Y3QgUmVhZFN0cmVhbVRva2VuaXplciBmcm9tIGdpdmVuIFN0cmVhbS5cbiAqIFdpbGwgc2V0IGZpbGVTaXplLCBpZiBwcm92aWRlZCBnaXZlbiBTdHJlYW0gaGFzIHNldCB0aGUgLnBhdGggcHJvcGVydHkvXG4gKiBAcGFyYW0gc3RyZWFtIC0gUmVhZCBmcm9tIE5vZGUuanMgU3RyZWFtLlJlYWRhYmxlXG4gKiBAcGFyYW0gZmlsZUluZm8gLSBQYXNzIHRoZSBmaWxlIGluZm9ybWF0aW9uLCBsaWtlIHNpemUgYW5kIE1JTUUtdHlwZSBvZiB0aGUgY29ycmVzcG9uZGluZyBzdHJlYW0uXG4gKiBAcmV0dXJucyBSZWFkU3RyZWFtVG9rZW5pemVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU3RyZWFtKHN0cmVhbSwgZmlsZUluZm8pIHtcbiAgICBmaWxlSW5mbyA9IGZpbGVJbmZvID8gZmlsZUluZm8gOiB7fTtcbiAgICByZXR1cm4gbmV3IFJlYWRTdHJlYW1Ub2tlbml6ZXIobmV3IFN0cmVhbVJlYWRlcihzdHJlYW0pLCBmaWxlSW5mbyk7XG59XG4vKipcbiAqIENvbnN0cnVjdCBSZWFkU3RyZWFtVG9rZW5pemVyIGZyb20gZ2l2ZW4gUmVhZGFibGVTdHJlYW0gKFdlYlN0cmVhbSBBUEkpLlxuICogV2lsbCBzZXQgZmlsZVNpemUsIGlmIHByb3ZpZGVkIGdpdmVuIFN0cmVhbSBoYXMgc2V0IHRoZSAucGF0aCBwcm9wZXJ0eS9cbiAqIEBwYXJhbSB3ZWJTdHJlYW0gLSBSZWFkIGZyb20gTm9kZS5qcyBTdHJlYW0uUmVhZGFibGVcbiAqIEBwYXJhbSBmaWxlSW5mbyAtIFBhc3MgdGhlIGZpbGUgaW5mb3JtYXRpb24sIGxpa2Ugc2l6ZSBhbmQgTUlNRS10eXBlIG9mIHRoZSBjb3JyZXNwb25kaW5nIHN0cmVhbS5cbiAqIEByZXR1cm5zIFJlYWRTdHJlYW1Ub2tlbml6ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21XZWJTdHJlYW0od2ViU3RyZWFtLCBmaWxlSW5mbykge1xuICAgIGZpbGVJbmZvID0gZmlsZUluZm8gPyBmaWxlSW5mbyA6IHt9O1xuICAgIHJldHVybiBuZXcgUmVhZFN0cmVhbVRva2VuaXplcihuZXcgV2ViU3RyZWFtUmVhZGVyKHdlYlN0cmVhbSksIGZpbGVJbmZvKTtcbn1cbi8qKlxuICogQ29uc3RydWN0IFJlYWRTdHJlYW1Ub2tlbml6ZXIgZnJvbSBnaXZlbiBCdWZmZXIuXG4gKiBAcGFyYW0gdWludDhBcnJheSAtIFVpbnQ4QXJyYXkgdG8gdG9rZW5pemVcbiAqIEBwYXJhbSBmaWxlSW5mbyAtIFBhc3MgYWRkaXRpb25hbCBmaWxlIGluZm9ybWF0aW9uIHRvIHRoZSB0b2tlbml6ZXJcbiAqIEByZXR1cm5zIEJ1ZmZlclRva2VuaXplclxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbUJ1ZmZlcih1aW50OEFycmF5LCBmaWxlSW5mbykge1xuICAgIHJldHVybiBuZXcgQnVmZmVyVG9rZW5pemVyKHVpbnQ4QXJyYXksIGZpbGVJbmZvKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0J5dGVzKHN0cmluZykge1xuXHRyZXR1cm4gWy4uLnN0cmluZ10ubWFwKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgdW5pY29ybi9wcmVmZXItY29kZS1wb2ludFxufVxuXG4vKipcbkNoZWNrcyB3aGV0aGVyIHRoZSBUQVIgY2hlY2tzdW0gaXMgdmFsaWQuXG5cbkBwYXJhbSB7QnVmZmVyfSBidWZmZXIgLSBUaGUgVEFSIGhlYWRlciBgW29mZnNldCAuLi4gb2Zmc2V0ICsgNTEyXWAuXG5AcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gVEFSIGhlYWRlciBvZmZzZXQuXG5AcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBUQVIgY2hlY2tzdW0gaXMgdmFsaWQsIG90aGVyd2lzZSBgZmFsc2VgLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiB0YXJIZWFkZXJDaGVja3N1bU1hdGNoZXMoYnVmZmVyLCBvZmZzZXQgPSAwKSB7XG5cdGNvbnN0IHJlYWRTdW0gPSBOdW1iZXIucGFyc2VJbnQoYnVmZmVyLnRvU3RyaW5nKCd1dGY4JywgMTQ4LCAxNTQpLnJlcGxhY2UoL1xcMC4qJC8sICcnKS50cmltKCksIDgpOyAvLyBSZWFkIHN1bSBpbiBoZWFkZXJcblx0aWYgKE51bWJlci5pc05hTihyZWFkU3VtKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBzdW0gPSA4ICogMHgyMDsgLy8gSW5pdGlhbGl6ZSBzaWduZWQgYml0IHN1bVxuXG5cdGZvciAobGV0IGluZGV4ID0gb2Zmc2V0OyBpbmRleCA8IG9mZnNldCArIDE0ODsgaW5kZXgrKykge1xuXHRcdHN1bSArPSBidWZmZXJbaW5kZXhdO1xuXHR9XG5cblx0Zm9yIChsZXQgaW5kZXggPSBvZmZzZXQgKyAxNTY7IGluZGV4IDwgb2Zmc2V0ICsgNTEyOyBpbmRleCsrKSB7XG5cdFx0c3VtICs9IGJ1ZmZlcltpbmRleF07XG5cdH1cblxuXHRyZXR1cm4gcmVhZFN1bSA9PT0gc3VtO1xufVxuXG4vKipcbklEMyBVSU5UMzIgc3luYy1zYWZlIHRva2VuaXplciB0b2tlbi5cbjI4IGJpdHMgKHJlcHJlc2VudGluZyB1cCB0byAyNTZNQikgaW50ZWdlciwgdGhlIG1zYiBpcyAwIHRvIGF2b2lkIFwiZmFsc2Ugc3luY3NpZ25hbHNcIi5cbiovXG5leHBvcnQgY29uc3QgdWludDMyU3luY1NhZmVUb2tlbiA9IHtcblx0Z2V0OiAoYnVmZmVyLCBvZmZzZXQpID0+IChidWZmZXJbb2Zmc2V0ICsgM10gJiAweDdGKSB8ICgoYnVmZmVyW29mZnNldCArIDJdKSA8PCA3KSB8ICgoYnVmZmVyW29mZnNldCArIDFdKSA8PCAxNCkgfCAoKGJ1ZmZlcltvZmZzZXRdKSA8PCAyMSksXG5cdGxlbjogNCxcbn07XG4iLCJleHBvcnQgY29uc3QgZXh0ZW5zaW9ucyA9IFtcblx0J2pwZycsXG5cdCdwbmcnLFxuXHQnYXBuZycsXG5cdCdnaWYnLFxuXHQnd2VicCcsXG5cdCdmbGlmJyxcblx0J3hjZicsXG5cdCdjcjInLFxuXHQnY3IzJyxcblx0J29yZicsXG5cdCdhcncnLFxuXHQnZG5nJyxcblx0J25lZicsXG5cdCdydzInLFxuXHQncmFmJyxcblx0J3RpZicsXG5cdCdibXAnLFxuXHQnaWNucycsXG5cdCdqeHInLFxuXHQncHNkJyxcblx0J2luZGQnLFxuXHQnemlwJyxcblx0J3RhcicsXG5cdCdyYXInLFxuXHQnZ3onLFxuXHQnYnoyJyxcblx0Jzd6Jyxcblx0J2RtZycsXG5cdCdtcDQnLFxuXHQnbWlkJyxcblx0J21rdicsXG5cdCd3ZWJtJyxcblx0J21vdicsXG5cdCdhdmknLFxuXHQnbXBnJyxcblx0J21wMicsXG5cdCdtcDMnLFxuXHQnbTRhJyxcblx0J29nYScsXG5cdCdvZ2cnLFxuXHQnb2d2Jyxcblx0J29wdXMnLFxuXHQnZmxhYycsXG5cdCd3YXYnLFxuXHQnc3B4Jyxcblx0J2FtcicsXG5cdCdwZGYnLFxuXHQnZXB1YicsXG5cdCdlbGYnLFxuXHQnbWFjaG8nLFxuXHQnZXhlJyxcblx0J3N3ZicsXG5cdCdydGYnLFxuXHQnd2FzbScsXG5cdCd3b2ZmJyxcblx0J3dvZmYyJyxcblx0J2VvdCcsXG5cdCd0dGYnLFxuXHQnb3RmJyxcblx0J2ljbycsXG5cdCdmbHYnLFxuXHQncHMnLFxuXHQneHonLFxuXHQnc3FsaXRlJyxcblx0J25lcycsXG5cdCdjcngnLFxuXHQneHBpJyxcblx0J2NhYicsXG5cdCdkZWInLFxuXHQnYXInLFxuXHQncnBtJyxcblx0J1onLFxuXHQnbHonLFxuXHQnY2ZiJyxcblx0J214ZicsXG5cdCdtdHMnLFxuXHQnYmxlbmQnLFxuXHQnYnBnJyxcblx0J2RvY3gnLFxuXHQncHB0eCcsXG5cdCd4bHN4Jyxcblx0JzNncCcsXG5cdCczZzInLFxuXHQnajJjJyxcblx0J2pwMicsXG5cdCdqcG0nLFxuXHQnanB4Jyxcblx0J21qMicsXG5cdCdhaWYnLFxuXHQncWNwJyxcblx0J29kdCcsXG5cdCdvZHMnLFxuXHQnb2RwJyxcblx0J3htbCcsXG5cdCdtb2JpJyxcblx0J2hlaWMnLFxuXHQnY3VyJyxcblx0J2t0eCcsXG5cdCdhcGUnLFxuXHQnd3YnLFxuXHQnZGNtJyxcblx0J2ljcycsXG5cdCdnbGInLFxuXHQncGNhcCcsXG5cdCdkc2YnLFxuXHQnbG5rJyxcblx0J2FsaWFzJyxcblx0J3ZvYycsXG5cdCdhYzMnLFxuXHQnbTR2Jyxcblx0J200cCcsXG5cdCdtNGInLFxuXHQnZjR2Jyxcblx0J2Y0cCcsXG5cdCdmNGInLFxuXHQnZjRhJyxcblx0J21pZScsXG5cdCdhc2YnLFxuXHQnb2dtJyxcblx0J29neCcsXG5cdCdtcGMnLFxuXHQnYXJyb3cnLFxuXHQnc2hwJyxcblx0J2FhYycsXG5cdCdtcDEnLFxuXHQnaXQnLFxuXHQnczNtJyxcblx0J3htJyxcblx0J2FpJyxcblx0J3NrcCcsXG5cdCdhdmlmJyxcblx0J2VwcycsXG5cdCdsemgnLFxuXHQncGdwJyxcblx0J2FzYXInLFxuXHQnc3RsJyxcblx0J2NobScsXG5cdCczbWYnLFxuXHQnenN0Jyxcblx0J2p4bCcsXG5cdCd2Y2YnLFxuXHQnamxzJyxcblx0J3BzdCcsXG5cdCdkd2cnLFxuXHQncGFycXVldCcsXG5cdCdjbGFzcycsXG5cdCdhcmonLFxuXHQnY3BpbycsXG5cdCdhY2UnLFxuXHQnYXZybycsXG5cdCdpY2MnLFxuXHQnZmJ4Jyxcbl07XG5cbmV4cG9ydCBjb25zdCBtaW1lVHlwZXMgPSBbXG5cdCdpbWFnZS9qcGVnJyxcblx0J2ltYWdlL3BuZycsXG5cdCdpbWFnZS9naWYnLFxuXHQnaW1hZ2Uvd2VicCcsXG5cdCdpbWFnZS9mbGlmJyxcblx0J2ltYWdlL3gteGNmJyxcblx0J2ltYWdlL3gtY2Fub24tY3IyJyxcblx0J2ltYWdlL3gtY2Fub24tY3IzJyxcblx0J2ltYWdlL3RpZmYnLFxuXHQnaW1hZ2UvYm1wJyxcblx0J2ltYWdlL3ZuZC5tcy1waG90bycsXG5cdCdpbWFnZS92bmQuYWRvYmUucGhvdG9zaG9wJyxcblx0J2FwcGxpY2F0aW9uL3gtaW5kZXNpZ24nLFxuXHQnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuXHQnYXBwbGljYXRpb24veC14cGluc3RhbGwnLFxuXHQnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0Jyxcblx0J2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuXHQnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuXHQnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuXHQnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvbicsXG5cdCdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG5cdCdhcHBsaWNhdGlvbi96aXAnLFxuXHQnYXBwbGljYXRpb24veC10YXInLFxuXHQnYXBwbGljYXRpb24veC1yYXItY29tcHJlc3NlZCcsXG5cdCdhcHBsaWNhdGlvbi9nemlwJyxcblx0J2FwcGxpY2F0aW9uL3gtYnppcDInLFxuXHQnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcblx0J2FwcGxpY2F0aW9uL3gtYXBwbGUtZGlza2ltYWdlJyxcblx0J2FwcGxpY2F0aW9uL3gtYXBhY2hlLWFycm93Jyxcblx0J3ZpZGVvL21wNCcsXG5cdCdhdWRpby9taWRpJyxcblx0J3ZpZGVvL3gtbWF0cm9za2EnLFxuXHQndmlkZW8vd2VibScsXG5cdCd2aWRlby9xdWlja3RpbWUnLFxuXHQndmlkZW8vdm5kLmF2aScsXG5cdCdhdWRpby92bmQud2F2ZScsXG5cdCdhdWRpby9xY2VscCcsXG5cdCdhdWRpby94LW1zLWFzZicsXG5cdCd2aWRlby94LW1zLWFzZicsXG5cdCdhcHBsaWNhdGlvbi92bmQubXMtYXNmJyxcblx0J3ZpZGVvL21wZWcnLFxuXHQndmlkZW8vM2dwcCcsXG5cdCdhdWRpby9tcGVnJyxcblx0J2F1ZGlvL21wNCcsIC8vIFJGQyA0MzM3XG5cdCdhdWRpby9vcHVzJyxcblx0J3ZpZGVvL29nZycsXG5cdCdhdWRpby9vZ2cnLFxuXHQnYXBwbGljYXRpb24vb2dnJyxcblx0J2F1ZGlvL3gtZmxhYycsXG5cdCdhdWRpby9hcGUnLFxuXHQnYXVkaW8vd2F2cGFjaycsXG5cdCdhdWRpby9hbXInLFxuXHQnYXBwbGljYXRpb24vcGRmJyxcblx0J2FwcGxpY2F0aW9uL3gtZWxmJyxcblx0J2FwcGxpY2F0aW9uL3gtbWFjaC1iaW5hcnknLFxuXHQnYXBwbGljYXRpb24veC1tc2Rvd25sb2FkJyxcblx0J2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcblx0J2FwcGxpY2F0aW9uL3J0ZicsXG5cdCdhcHBsaWNhdGlvbi93YXNtJyxcblx0J2ZvbnQvd29mZicsXG5cdCdmb250L3dvZmYyJyxcblx0J2FwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0Jyxcblx0J2ZvbnQvdHRmJyxcblx0J2ZvbnQvb3RmJyxcblx0J2ltYWdlL3gtaWNvbicsXG5cdCd2aWRlby94LWZsdicsXG5cdCdhcHBsaWNhdGlvbi9wb3N0c2NyaXB0Jyxcblx0J2FwcGxpY2F0aW9uL2VwcycsXG5cdCdhcHBsaWNhdGlvbi94LXh6Jyxcblx0J2FwcGxpY2F0aW9uL3gtc3FsaXRlMycsXG5cdCdhcHBsaWNhdGlvbi94LW5pbnRlbmRvLW5lcy1yb20nLFxuXHQnYXBwbGljYXRpb24veC1nb29nbGUtY2hyb21lLWV4dGVuc2lvbicsXG5cdCdhcHBsaWNhdGlvbi92bmQubXMtY2FiLWNvbXByZXNzZWQnLFxuXHQnYXBwbGljYXRpb24veC1kZWInLFxuXHQnYXBwbGljYXRpb24veC11bml4LWFyY2hpdmUnLFxuXHQnYXBwbGljYXRpb24veC1ycG0nLFxuXHQnYXBwbGljYXRpb24veC1jb21wcmVzcycsXG5cdCdhcHBsaWNhdGlvbi94LWx6aXAnLFxuXHQnYXBwbGljYXRpb24veC1jZmInLFxuXHQnYXBwbGljYXRpb24veC1taWUnLFxuXHQnYXBwbGljYXRpb24vbXhmJyxcblx0J3ZpZGVvL21wMnQnLFxuXHQnYXBwbGljYXRpb24veC1ibGVuZGVyJyxcblx0J2ltYWdlL2JwZycsXG5cdCdpbWFnZS9qMmMnLFxuXHQnaW1hZ2UvanAyJyxcblx0J2ltYWdlL2pweCcsXG5cdCdpbWFnZS9qcG0nLFxuXHQnaW1hZ2UvbWoyJyxcblx0J2F1ZGlvL2FpZmYnLFxuXHQnYXBwbGljYXRpb24veG1sJyxcblx0J2FwcGxpY2F0aW9uL3gtbW9iaXBvY2tldC1lYm9vaycsXG5cdCdpbWFnZS9oZWlmJyxcblx0J2ltYWdlL2hlaWYtc2VxdWVuY2UnLFxuXHQnaW1hZ2UvaGVpYycsXG5cdCdpbWFnZS9oZWljLXNlcXVlbmNlJyxcblx0J2ltYWdlL2ljbnMnLFxuXHQnaW1hZ2Uva3R4Jyxcblx0J2FwcGxpY2F0aW9uL2RpY29tJyxcblx0J2F1ZGlvL3gtbXVzZXBhY2snLFxuXHQndGV4dC9jYWxlbmRhcicsXG5cdCd0ZXh0L3ZjYXJkJyxcblx0J21vZGVsL2dsdGYtYmluYXJ5Jyxcblx0J2FwcGxpY2F0aW9uL3ZuZC50Y3BkdW1wLnBjYXAnLFxuXHQnYXVkaW8veC1kc2YnLCAvLyBOb24tc3RhbmRhcmRcblx0J2FwcGxpY2F0aW9uL3gubXMuc2hvcnRjdXQnLCAvLyBJbnZlbnRlZCBieSB1c1xuXHQnYXBwbGljYXRpb24veC5hcHBsZS5hbGlhcycsIC8vIEludmVudGVkIGJ5IHVzXG5cdCdhdWRpby94LXZvYycsXG5cdCdhdWRpby92bmQuZG9sYnkuZGQtcmF3Jyxcblx0J2F1ZGlvL3gtbTRhJyxcblx0J2ltYWdlL2FwbmcnLFxuXHQnaW1hZ2UveC1vbHltcHVzLW9yZicsXG5cdCdpbWFnZS94LXNvbnktYXJ3Jyxcblx0J2ltYWdlL3gtYWRvYmUtZG5nJyxcblx0J2ltYWdlL3gtbmlrb24tbmVmJyxcblx0J2ltYWdlL3gtcGFuYXNvbmljLXJ3MicsXG5cdCdpbWFnZS94LWZ1amlmaWxtLXJhZicsXG5cdCd2aWRlby94LW00dicsXG5cdCd2aWRlby8zZ3BwMicsXG5cdCdhcHBsaWNhdGlvbi94LWVzcmktc2hhcGUnLFxuXHQnYXVkaW8vYWFjJyxcblx0J2F1ZGlvL3gtaXQnLFxuXHQnYXVkaW8veC1zM20nLFxuXHQnYXVkaW8veC14bScsXG5cdCd2aWRlby9NUDFTJyxcblx0J3ZpZGVvL01QMlAnLFxuXHQnYXBwbGljYXRpb24vdm5kLnNrZXRjaHVwLnNrcCcsXG5cdCdpbWFnZS9hdmlmJyxcblx0J2FwcGxpY2F0aW9uL3gtbHpoLWNvbXByZXNzZWQnLFxuXHQnYXBwbGljYXRpb24vcGdwLWVuY3J5cHRlZCcsXG5cdCdhcHBsaWNhdGlvbi94LWFzYXInLFxuXHQnbW9kZWwvc3RsJyxcblx0J2FwcGxpY2F0aW9uL3ZuZC5tcy1odG1saGVscCcsXG5cdCdtb2RlbC8zbWYnLFxuXHQnaW1hZ2UvanhsJyxcblx0J2FwcGxpY2F0aW9uL3pzdGQnLFxuXHQnaW1hZ2UvamxzJyxcblx0J2FwcGxpY2F0aW9uL3ZuZC5tcy1vdXRsb29rJyxcblx0J2ltYWdlL3ZuZC5kd2cnLFxuXHQnYXBwbGljYXRpb24veC1wYXJxdWV0Jyxcblx0J2FwcGxpY2F0aW9uL2phdmEtdm0nLFxuXHQnYXBwbGljYXRpb24veC1hcmonLFxuXHQnYXBwbGljYXRpb24veC1jcGlvJyxcblx0J2FwcGxpY2F0aW9uL3gtYWNlLWNvbXByZXNzZWQnLFxuXHQnYXBwbGljYXRpb24vYXZybycsXG5cdCdhcHBsaWNhdGlvbi92bmQuaWNjcHJvZmlsZScsXG5cdCdhcHBsaWNhdGlvbi94LmF1dG9kZXNrLmZieCcsIC8vIEludmVudGVkIGJ5IHVzXG5dO1xuIiwiaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ25vZGU6YnVmZmVyJztcbmltcG9ydCAqIGFzIFRva2VuIGZyb20gJ3Rva2VuLXR5cGVzJztcbmltcG9ydCAqIGFzIHN0cnRvazMgZnJvbSAnc3RydG9rMy9jb3JlJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuL2ZpbGUtZXh0ZW5zaW9uLWluLWltcG9ydFxuaW1wb3J0IHtcblx0c3RyaW5nVG9CeXRlcyxcblx0dGFySGVhZGVyQ2hlY2tzdW1NYXRjaGVzLFxuXHR1aW50MzJTeW5jU2FmZVRva2VuLFxufSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtleHRlbnNpb25zLCBtaW1lVHlwZXN9IGZyb20gJy4vc3VwcG9ydGVkLmpzJztcblxuY29uc3QgbWluaW11bUJ5dGVzID0gNDEwMDsgLy8gQSBmYWlyIGFtb3VudCBvZiBmaWxlLXR5cGVzIGFyZSBkZXRlY3RhYmxlIHdpdGhpbiB0aGlzIHJhbmdlLlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZVR5cGVGcm9tU3RyZWFtKHN0cmVhbSkge1xuXHRyZXR1cm4gbmV3IEZpbGVUeXBlUGFyc2VyKCkuZnJvbVN0cmVhbShzdHJlYW0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZVR5cGVGcm9tQnVmZmVyKGlucHV0KSB7XG5cdHJldHVybiBuZXcgRmlsZVR5cGVQYXJzZXIoKS5mcm9tQnVmZmVyKGlucHV0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGVUeXBlRnJvbUJsb2IoYmxvYikge1xuXHRyZXR1cm4gbmV3IEZpbGVUeXBlUGFyc2VyKCkuZnJvbUJsb2IoYmxvYik7XG59XG5cbmZ1bmN0aW9uIF9jaGVjayhidWZmZXIsIGhlYWRlcnMsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IHtcblx0XHRvZmZzZXQ6IDAsXG5cdFx0Li4ub3B0aW9ucyxcblx0fTtcblxuXHRmb3IgKGNvbnN0IFtpbmRleCwgaGVhZGVyXSBvZiBoZWFkZXJzLmVudHJpZXMoKSkge1xuXHRcdC8vIElmIGEgYml0bWFzayBpcyBzZXRcblx0XHRpZiAob3B0aW9ucy5tYXNrKSB7XG5cdFx0XHQvLyBJZiBoZWFkZXIgZG9lc24ndCBlcXVhbCBgYnVmYCB3aXRoIGJpdHMgbWFza2VkIG9mZlxuXHRcdFx0aWYgKGhlYWRlciAhPT0gKG9wdGlvbnMubWFza1tpbmRleF0gJiBidWZmZXJbaW5kZXggKyBvcHRpb25zLm9mZnNldF0pKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGhlYWRlciAhPT0gYnVmZmVyW2luZGV4ICsgb3B0aW9ucy5vZmZzZXRdKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlVHlwZUZyb21Ub2tlbml6ZXIodG9rZW5pemVyKSB7XG5cdHJldHVybiBuZXcgRmlsZVR5cGVQYXJzZXIoKS5mcm9tVG9rZW5pemVyKHRva2VuaXplcik7XG59XG5cbmV4cG9ydCBjbGFzcyBGaWxlVHlwZVBhcnNlciB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLmRldGVjdG9ycyA9IG9wdGlvbnM/LmN1c3RvbURldGVjdG9ycztcblxuXHRcdHRoaXMuZnJvbVRva2VuaXplciA9IHRoaXMuZnJvbVRva2VuaXplci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZnJvbUJ1ZmZlciA9IHRoaXMuZnJvbUJ1ZmZlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucGFyc2UgPSB0aGlzLnBhcnNlLmJpbmQodGhpcyk7XG5cdH1cblxuXHRhc3luYyBmcm9tVG9rZW5pemVyKHRva2VuaXplcikge1xuXHRcdGNvbnN0IGluaXRpYWxQb3NpdGlvbiA9IHRva2VuaXplci5wb3NpdGlvbjtcblxuXHRcdGZvciAoY29uc3QgZGV0ZWN0b3Igb2YgdGhpcy5kZXRlY3RvcnMgfHwgW10pIHtcblx0XHRcdGNvbnN0IGZpbGVUeXBlID0gYXdhaXQgZGV0ZWN0b3IodG9rZW5pemVyKTtcblx0XHRcdGlmIChmaWxlVHlwZSkge1xuXHRcdFx0XHRyZXR1cm4gZmlsZVR5cGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpbml0aWFsUG9zaXRpb24gIT09IHRva2VuaXplci5wb3NpdGlvbikge1xuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkOyAvLyBDYW5ub3QgcHJvY2VlZCBzY2FubmluZyBvZiB0aGUgdG9rZW5pemVyIGlzIGF0IGFuIGFyYml0cmFyeSBwb3NpdGlvblxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlKHRva2VuaXplcik7XG5cdH1cblxuXHRhc3luYyBmcm9tQnVmZmVyKGlucHV0KSB7XG5cdFx0aWYgKCEoaW5wdXQgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IGlucHV0IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgXFxgaW5wdXRcXGAgYXJndW1lbnQgdG8gYmUgb2YgdHlwZSBcXGBVaW50OEFycmF5XFxgIG9yIFxcYEJ1ZmZlclxcYCBvciBcXGBBcnJheUJ1ZmZlclxcYCwgZ290IFxcYCR7dHlwZW9mIGlucHV0fVxcYGApO1xuXHRcdH1cblxuXHRcdGNvbnN0IGJ1ZmZlciA9IGlucHV0IGluc3RhbmNlb2YgVWludDhBcnJheSA/IGlucHV0IDogbmV3IFVpbnQ4QXJyYXkoaW5wdXQpO1xuXG5cdFx0aWYgKCEoYnVmZmVyPy5sZW5ndGggPiAxKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmZyb21Ub2tlbml6ZXIoc3RydG9rMy5mcm9tQnVmZmVyKGJ1ZmZlcikpO1xuXHR9XG5cblx0YXN5bmMgZnJvbUJsb2IoYmxvYikge1xuXHRcdGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGJsb2IuYXJyYXlCdWZmZXIoKTtcblx0XHRyZXR1cm4gdGhpcy5mcm9tQnVmZmVyKG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpO1xuXHR9XG5cblx0YXN5bmMgZnJvbVN0cmVhbShzdHJlYW0pIHtcblx0XHRjb25zdCB0b2tlbml6ZXIgPSBhd2FpdCBzdHJ0b2szLmZyb21TdHJlYW0oc3RyZWFtKTtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGF3YWl0IHRoaXMuZnJvbVRva2VuaXplcih0b2tlbml6ZXIpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRhd2FpdCB0b2tlbml6ZXIuY2xvc2UoKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyB0b0RldGVjdGlvblN0cmVhbShyZWFkYWJsZVN0cmVhbSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0Y29uc3Qge2RlZmF1bHQ6IHN0cmVhbX0gPSBhd2FpdCBpbXBvcnQoJ25vZGU6c3RyZWFtJyk7XG5cdFx0Y29uc3Qge3NhbXBsZVNpemUgPSBtaW5pbXVtQnl0ZXN9ID0gb3B0aW9ucztcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRyZWFkYWJsZVN0cmVhbS5vbignZXJyb3InLCByZWplY3QpO1xuXG5cdFx0XHRyZWFkYWJsZVN0cmVhbS5vbmNlKCdyZWFkYWJsZScsICgpID0+IHtcblx0XHRcdFx0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Ly8gU2V0IHVwIG91dHB1dCBzdHJlYW1cblx0XHRcdFx0XHRcdGNvbnN0IHBhc3MgPSBuZXcgc3RyZWFtLlBhc3NUaHJvdWdoKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBvdXRwdXRTdHJlYW0gPSBzdHJlYW0ucGlwZWxpbmUgPyBzdHJlYW0ucGlwZWxpbmUocmVhZGFibGVTdHJlYW0sIHBhc3MsICgpID0+IHt9KSA6IHJlYWRhYmxlU3RyZWFtLnBpcGUocGFzcyk7XG5cblx0XHRcdFx0XHRcdC8vIFJlYWQgdGhlIGlucHV0IHN0cmVhbSBhbmQgZGV0ZWN0IHRoZSBmaWxldHlwZVxuXHRcdFx0XHRcdFx0Y29uc3QgY2h1bmsgPSByZWFkYWJsZVN0cmVhbS5yZWFkKHNhbXBsZVNpemUpID8/IHJlYWRhYmxlU3RyZWFtLnJlYWQoKSA/PyBCdWZmZXIuYWxsb2MoMCk7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRwYXNzLmZpbGVUeXBlID0gYXdhaXQgdGhpcy5mcm9tQnVmZmVyKGNodW5rKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIHN0cnRvazMuRW5kT2ZTdHJlYW1FcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdHBhc3MuZmlsZVR5cGUgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXNvbHZlKG91dHB1dFN0cmVhbSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjaGVjayhoZWFkZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gX2NoZWNrKHRoaXMuYnVmZmVyLCBoZWFkZXIsIG9wdGlvbnMpO1xuXHR9XG5cblx0Y2hlY2tTdHJpbmcoaGVhZGVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHRoaXMuY2hlY2soc3RyaW5nVG9CeXRlcyhoZWFkZXIpLCBvcHRpb25zKTtcblx0fVxuXG5cdGFzeW5jIHBhcnNlKHRva2VuaXplcikge1xuXHRcdHRoaXMuYnVmZmVyID0gQnVmZmVyLmFsbG9jKG1pbmltdW1CeXRlcyk7XG5cblx0XHQvLyBLZWVwIHJlYWRpbmcgdW50aWwgRU9GIGlmIHRoZSBmaWxlIHNpemUgaXMgdW5rbm93bi5cblx0XHRpZiAodG9rZW5pemVyLmZpbGVJbmZvLnNpemUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dG9rZW5pemVyLmZpbGVJbmZvLnNpemUgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblx0XHR9XG5cblx0XHR0aGlzLnRva2VuaXplciA9IHRva2VuaXplcjtcblxuXHRcdGF3YWl0IHRva2VuaXplci5wZWVrQnVmZmVyKHRoaXMuYnVmZmVyLCB7bGVuZ3RoOiAxMiwgbWF5QmVMZXNzOiB0cnVlfSk7XG5cblx0XHQvLyAtLSAyLWJ5dGUgc2lnbmF0dXJlcyAtLVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NDIsIDB4NERdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnYm1wJyxcblx0XHRcdFx0bWltZTogJ2ltYWdlL2JtcCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDBCLCAweDc3XSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2FjMycsXG5cdFx0XHRcdG1pbWU6ICdhdWRpby92bmQuZG9sYnkuZGQtcmF3Jyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NzgsIDB4MDFdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnZG1nJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtYXBwbGUtZGlza2ltYWdlJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NEQsIDB4NUFdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnZXhlJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtbXNkb3dubG9hZCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDI1LCAweDIxXSkpIHtcblx0XHRcdGF3YWl0IHRva2VuaXplci5wZWVrQnVmZmVyKHRoaXMuYnVmZmVyLCB7bGVuZ3RoOiAyNCwgbWF5QmVMZXNzOiB0cnVlfSk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0dGhpcy5jaGVja1N0cmluZygnUFMtQWRvYmUtJywge29mZnNldDogMn0pXG5cdFx0XHRcdCYmIHRoaXMuY2hlY2tTdHJpbmcoJyBFUFNGLScsIHtvZmZzZXQ6IDE0fSlcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ2VwcycsXG5cdFx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL2VwcycsXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3BzJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3Bvc3RzY3JpcHQnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHR0aGlzLmNoZWNrKFsweDFGLCAweEEwXSlcblx0XHRcdHx8IHRoaXMuY2hlY2soWzB4MUYsIDB4OURdKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnWicsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LWNvbXByZXNzJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4QzcsIDB4NzFdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnY3BpbycsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LWNwaW8nLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHg2MCwgMHhFQV0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdhcmonLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1hcmonLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyAtLSAzLWJ5dGUgc2lnbmF0dXJlcyAtLVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4RUYsIDB4QkIsIDB4QkZdKSkgeyAvLyBVVEYtOC1CT01cblx0XHRcdC8vIFN0cmlwIG9mZiBVVEYtOC1CT01cblx0XHRcdHRoaXMudG9rZW5pemVyLmlnbm9yZSgzKTtcblx0XHRcdHJldHVybiB0aGlzLnBhcnNlKHRva2VuaXplcik7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NDcsIDB4NDksIDB4NDZdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnZ2lmJyxcblx0XHRcdFx0bWltZTogJ2ltYWdlL2dpZicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDQ5LCAweDQ5LCAweEJDXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2p4cicsXG5cdFx0XHRcdG1pbWU6ICdpbWFnZS92bmQubXMtcGhvdG8nLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHgxRiwgMHg4QiwgMHg4XSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2d6Jyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL2d6aXAnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHg0MiwgMHg1QSwgMHg2OF0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdiejInLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1iemlwMicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdJRDMnKSkge1xuXHRcdFx0YXdhaXQgdG9rZW5pemVyLmlnbm9yZSg2KTsgLy8gU2tpcCBJRDMgaGVhZGVyIHVudGlsIHRoZSBoZWFkZXIgc2l6ZVxuXHRcdFx0Y29uc3QgaWQzSGVhZGVyTGVuZ3RoID0gYXdhaXQgdG9rZW5pemVyLnJlYWRUb2tlbih1aW50MzJTeW5jU2FmZVRva2VuKTtcblx0XHRcdGlmICh0b2tlbml6ZXIucG9zaXRpb24gKyBpZDNIZWFkZXJMZW5ndGggPiB0b2tlbml6ZXIuZmlsZUluZm8uc2l6ZSkge1xuXHRcdFx0XHQvLyBHdWVzcyBmaWxlIHR5cGUgYmFzZWQgb24gSUQzIGhlYWRlciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ21wMycsXG5cdFx0XHRcdFx0bWltZTogJ2F1ZGlvL21wZWcnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRhd2FpdCB0b2tlbml6ZXIuaWdub3JlKGlkM0hlYWRlckxlbmd0aCk7XG5cdFx0XHRyZXR1cm4gdGhpcy5mcm9tVG9rZW5pemVyKHRva2VuaXplcik7IC8vIFNraXAgSUQzIGhlYWRlciwgcmVjdXJzaW9uXG5cdFx0fVxuXG5cdFx0Ly8gTXVzZXBhY2ssIFNWN1xuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdNUCsnKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnbXBjJyxcblx0XHRcdFx0bWltZTogJ2F1ZGlvL3gtbXVzZXBhY2snLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHQodGhpcy5idWZmZXJbMF0gPT09IDB4NDMgfHwgdGhpcy5idWZmZXJbMF0gPT09IDB4NDYpXG5cdFx0XHQmJiB0aGlzLmNoZWNrKFsweDU3LCAweDUzXSwge29mZnNldDogMX0pXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdzd2YnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyAtLSA0LWJ5dGUgc2lnbmF0dXJlcyAtLVxuXG5cdFx0Ly8gUmVxdWlyZXMgYSBzYW1wbGUgc2l6ZSBvZiA0IGJ5dGVzXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4RkYsIDB4RDgsIDB4RkZdKSkge1xuXHRcdFx0aWYgKHRoaXMuY2hlY2soWzB4RjddLCB7b2Zmc2V0OiAzfSkpIHsgLy8gSlBHNy9TT0Y1NSwgaW5kaWNhdGluZyBhIElTTy9JRUMgMTQ0OTUgLyBKUEVHLUxTIGZpbGVcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdqbHMnLFxuXHRcdFx0XHRcdG1pbWU6ICdpbWFnZS9qbHMnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdqcGcnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UvanBlZycsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDRGLCAweDYyLCAweDZBLCAweDAxXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2F2cm8nLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vYXZybycsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdGTElGJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2ZsaWYnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UvZmxpZicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCc4QlBTJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3BzZCcsXG5cdFx0XHRcdG1pbWU6ICdpbWFnZS92bmQuYWRvYmUucGhvdG9zaG9wJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ1dFQlAnLCB7b2Zmc2V0OiA4fSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3dlYnAnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2Uvd2VicCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIE11c2VwYWNrLCBTVjhcblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnTVBDSycpKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdtcGMnLFxuXHRcdFx0XHRtaW1lOiAnYXVkaW8veC1tdXNlcGFjaycsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdGT1JNJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2FpZicsXG5cdFx0XHRcdG1pbWU6ICdhdWRpby9haWZmJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ2ljbnMnLCB7b2Zmc2V0OiAwfSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2ljbnMnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UvaWNucycsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIFppcC1iYXNlZCBmaWxlIGZvcm1hdHNcblx0XHQvLyBOZWVkIHRvIGJlIGJlZm9yZSB0aGUgYHppcGAgY2hlY2tcblx0XHRpZiAodGhpcy5jaGVjayhbMHg1MCwgMHg0QiwgMHgzLCAweDRdKSkgeyAvLyBMb2NhbCBmaWxlIGhlYWRlciBzaWduYXR1cmVcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHdoaWxlICh0b2tlbml6ZXIucG9zaXRpb24gKyAzMCA8IHRva2VuaXplci5maWxlSW5mby5zaXplKSB7XG5cdFx0XHRcdFx0YXdhaXQgdG9rZW5pemVyLnJlYWRCdWZmZXIodGhpcy5idWZmZXIsIHtsZW5ndGg6IDMwfSk7XG5cblx0XHRcdFx0XHQvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9aaXBfKGZpbGVfZm9ybWF0KSNGaWxlX2hlYWRlcnNcblx0XHRcdFx0XHRjb25zdCB6aXBIZWFkZXIgPSB7XG5cdFx0XHRcdFx0XHRjb21wcmVzc2VkU2l6ZTogdGhpcy5idWZmZXIucmVhZFVJbnQzMkxFKDE4KSxcblx0XHRcdFx0XHRcdHVuY29tcHJlc3NlZFNpemU6IHRoaXMuYnVmZmVyLnJlYWRVSW50MzJMRSgyMiksXG5cdFx0XHRcdFx0XHRmaWxlbmFtZUxlbmd0aDogdGhpcy5idWZmZXIucmVhZFVJbnQxNkxFKDI2KSxcblx0XHRcdFx0XHRcdGV4dHJhRmllbGRMZW5ndGg6IHRoaXMuYnVmZmVyLnJlYWRVSW50MTZMRSgyOCksXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHppcEhlYWRlci5maWxlbmFtZSA9IGF3YWl0IHRva2VuaXplci5yZWFkVG9rZW4obmV3IFRva2VuLlN0cmluZ1R5cGUoemlwSGVhZGVyLmZpbGVuYW1lTGVuZ3RoLCAndXRmLTgnKSk7XG5cdFx0XHRcdFx0YXdhaXQgdG9rZW5pemVyLmlnbm9yZSh6aXBIZWFkZXIuZXh0cmFGaWVsZExlbmd0aCk7XG5cblx0XHRcdFx0XHQvLyBBc3N1bWVzIHNpZ25lZCBgLnhwaWAgZnJvbSBhZGRvbnMubW96aWxsYS5vcmdcblx0XHRcdFx0XHRpZiAoemlwSGVhZGVyLmZpbGVuYW1lID09PSAnTUVUQS1JTkYvbW96aWxsYS5yc2EnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRleHQ6ICd4cGknLFxuXHRcdFx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC14cGluc3RhbGwnLFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoemlwSGVhZGVyLmZpbGVuYW1lLmVuZHNXaXRoKCcucmVscycpIHx8IHppcEhlYWRlci5maWxlbmFtZS5lbmRzV2l0aCgnLnhtbCcpKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB0eXBlID0gemlwSGVhZGVyLmZpbGVuYW1lLnNwbGl0KCcvJylbMF07XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAnX3JlbHMnOlxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICd3b3JkJzpcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXh0OiAnZG9jeCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3BwdCc6XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRcdGV4dDogJ3BwdHgnLFxuXHRcdFx0XHRcdFx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3hsJzpcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXh0OiAneGxzeCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHppcEhlYWRlci5maWxlbmFtZS5zdGFydHNXaXRoKCd4bC8nKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0ZXh0OiAneGxzeCcsXG5cdFx0XHRcdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh6aXBIZWFkZXIuZmlsZW5hbWUuc3RhcnRzV2l0aCgnM0QvJykgJiYgemlwSGVhZGVyLmZpbGVuYW1lLmVuZHNXaXRoKCcubW9kZWwnKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0ZXh0OiAnM21mJyxcblx0XHRcdFx0XHRcdFx0bWltZTogJ21vZGVsLzNtZicsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFRoZSBkb2N4LCB4bHN4IGFuZCBwcHR4IGZpbGUgdHlwZXMgZXh0ZW5kIHRoZSBPZmZpY2UgT3BlbiBYTUwgZmlsZSBmb3JtYXQ6XG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvT2ZmaWNlX09wZW5fWE1MX2ZpbGVfZm9ybWF0c1xuXHRcdFx0XHRcdC8vIFdlIGxvb2sgZm9yOlxuXHRcdFx0XHRcdC8vIC0gb25lIGVudHJ5IG5hbWVkICdbQ29udGVudF9UeXBlc10ueG1sJyBvciAnX3JlbHMvLnJlbHMnLFxuXHRcdFx0XHRcdC8vIC0gb25lIGVudHJ5IGluZGljYXRpbmcgc3BlY2lmaWMgdHlwZSBvZiBmaWxlLlxuXHRcdFx0XHRcdC8vIE1TIE9mZmljZSwgT3Blbk9mZmljZSBhbmQgTGlicmVPZmZpY2UgbWF5IHB1dCB0aGUgcGFydHMgaW4gZGlmZmVyZW50IG9yZGVyLCBzbyB0aGUgY2hlY2sgc2hvdWxkIG5vdCByZWx5IG9uIGl0LlxuXHRcdFx0XHRcdGlmICh6aXBIZWFkZXIuZmlsZW5hbWUgPT09ICdtaW1ldHlwZScgJiYgemlwSGVhZGVyLmNvbXByZXNzZWRTaXplID09PSB6aXBIZWFkZXIudW5jb21wcmVzc2VkU2l6ZSkge1xuXHRcdFx0XHRcdFx0bGV0IG1pbWVUeXBlID0gYXdhaXQgdG9rZW5pemVyLnJlYWRUb2tlbihuZXcgVG9rZW4uU3RyaW5nVHlwZSh6aXBIZWFkZXIuY29tcHJlc3NlZFNpemUsICd1dGYtOCcpKTtcblx0XHRcdFx0XHRcdG1pbWVUeXBlID0gbWltZVR5cGUudHJpbSgpO1xuXG5cdFx0XHRcdFx0XHRzd2l0Y2ggKG1pbWVUeXBlKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2FwcGxpY2F0aW9uL2VwdWIremlwJzpcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXh0OiAnZXB1YicsXG5cdFx0XHRcdFx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dCc6XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRcdGV4dDogJ29kdCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0Jyxcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0Jzpcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXh0OiAnb2RzJyxcblx0XHRcdFx0XHRcdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0Jyxcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbic6XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRcdGV4dDogJ29kcCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gVHJ5IHRvIGZpbmQgbmV4dCBoZWFkZXIgbWFudWFsbHkgd2hlbiBjdXJyZW50IG9uZSBpcyBjb3JydXB0ZWRcblx0XHRcdFx0XHRpZiAoemlwSGVhZGVyLmNvbXByZXNzZWRTaXplID09PSAwKSB7XG5cdFx0XHRcdFx0XHRsZXQgbmV4dEhlYWRlckluZGV4ID0gLTE7XG5cblx0XHRcdFx0XHRcdHdoaWxlIChuZXh0SGVhZGVySW5kZXggPCAwICYmICh0b2tlbml6ZXIucG9zaXRpb24gPCB0b2tlbml6ZXIuZmlsZUluZm8uc2l6ZSkpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdG9rZW5pemVyLnBlZWtCdWZmZXIodGhpcy5idWZmZXIsIHttYXlCZUxlc3M6IHRydWV9KTtcblxuXHRcdFx0XHRcdFx0XHRuZXh0SGVhZGVySW5kZXggPSB0aGlzLmJ1ZmZlci5pbmRleE9mKCc1MDRCMDMwNCcsIDAsICdoZXgnKTtcblx0XHRcdFx0XHRcdFx0Ly8gTW92ZSBwb3NpdGlvbiB0byB0aGUgbmV4dCBoZWFkZXIgaWYgZm91bmQsIHNraXAgdGhlIHdob2xlIGJ1ZmZlciBvdGhlcndpc2Vcblx0XHRcdFx0XHRcdFx0YXdhaXQgdG9rZW5pemVyLmlnbm9yZShuZXh0SGVhZGVySW5kZXggPj0gMCA/IG5leHRIZWFkZXJJbmRleCA6IHRoaXMuYnVmZmVyLmxlbmd0aCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGF3YWl0IHRva2VuaXplci5pZ25vcmUoemlwSGVhZGVyLmNvbXByZXNzZWRTaXplKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGlmICghKGVycm9yIGluc3RhbmNlb2Ygc3RydG9rMy5FbmRPZlN0cmVhbUVycm9yKSkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3ppcCcsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi96aXAnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnT2dnUycpKSB7XG5cdFx0XHQvLyBUaGlzIGlzIGFuIE9HRyBjb250YWluZXJcblx0XHRcdGF3YWl0IHRva2VuaXplci5pZ25vcmUoMjgpO1xuXHRcdFx0Y29uc3QgdHlwZSA9IEJ1ZmZlci5hbGxvYyg4KTtcblx0XHRcdGF3YWl0IHRva2VuaXplci5yZWFkQnVmZmVyKHR5cGUpO1xuXG5cdFx0XHQvLyBOZWVkcyB0byBiZSBiZWZvcmUgYG9nZ2AgY2hlY2tcblx0XHRcdGlmIChfY2hlY2sodHlwZSwgWzB4NEYsIDB4NzAsIDB4NzUsIDB4NzMsIDB4NDgsIDB4NjUsIDB4NjEsIDB4NjRdKSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ29wdXMnLFxuXHRcdFx0XHRcdG1pbWU6ICdhdWRpby9vcHVzJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgJyB0aGVvcmEnIGluIGhlYWRlci5cblx0XHRcdGlmIChfY2hlY2sodHlwZSwgWzB4ODAsIDB4NzQsIDB4NjgsIDB4NjUsIDB4NkYsIDB4NzIsIDB4NjFdKSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ29ndicsXG5cdFx0XHRcdFx0bWltZTogJ3ZpZGVvL29nZycsXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmICdcXHgwMXZpZGVvJyBpbiBoZWFkZXIuXG5cdFx0XHRpZiAoX2NoZWNrKHR5cGUsIFsweDAxLCAweDc2LCAweDY5LCAweDY0LCAweDY1LCAweDZGLCAweDAwXSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdvZ20nLFxuXHRcdFx0XHRcdG1pbWU6ICd2aWRlby9vZ2cnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiAnIEZMQUMnIGluIGhlYWRlciAgaHR0cHM6Ly94aXBoLm9yZy9mbGFjL2ZhcS5odG1sXG5cdFx0XHRpZiAoX2NoZWNrKHR5cGUsIFsweDdGLCAweDQ2LCAweDRDLCAweDQxLCAweDQzXSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdvZ2EnLFxuXHRcdFx0XHRcdG1pbWU6ICdhdWRpby9vZ2cnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAnU3BlZXggICcgaW4gaGVhZGVyIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NwZWV4XG5cdFx0XHRpZiAoX2NoZWNrKHR5cGUsIFsweDUzLCAweDcwLCAweDY1LCAweDY1LCAweDc4LCAweDIwLCAweDIwXSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdzcHgnLFxuXHRcdFx0XHRcdG1pbWU6ICdhdWRpby9vZ2cnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiAnXFx4MDF2b3JiaXMnIGluIGhlYWRlclxuXHRcdFx0aWYgKF9jaGVjayh0eXBlLCBbMHgwMSwgMHg3NiwgMHg2RiwgMHg3MiwgMHg2MiwgMHg2OSwgMHg3M10pKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXh0OiAnb2dnJyxcblx0XHRcdFx0XHRtaW1lOiAnYXVkaW8vb2dnJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRGVmYXVsdCBPR0cgY29udGFpbmVyIGh0dHBzOi8vd3d3LmlhbmEub3JnL2Fzc2lnbm1lbnRzL21lZGlhLXR5cGVzL2FwcGxpY2F0aW9uL29nZ1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnb2d4Jyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL29nZycsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdHRoaXMuY2hlY2soWzB4NTAsIDB4NEJdKVxuXHRcdFx0JiYgKHRoaXMuYnVmZmVyWzJdID09PSAweDMgfHwgdGhpcy5idWZmZXJbMl0gPT09IDB4NSB8fCB0aGlzLmJ1ZmZlclsyXSA9PT0gMHg3KVxuXHRcdFx0JiYgKHRoaXMuYnVmZmVyWzNdID09PSAweDQgfHwgdGhpcy5idWZmZXJbM10gPT09IDB4NiB8fCB0aGlzLmJ1ZmZlclszXSA9PT0gMHg4KVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnemlwJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3ppcCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vXG5cblx0XHQvLyBGaWxlIFR5cGUgQm94IChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fYmFzZV9tZWRpYV9maWxlX2Zvcm1hdClcblx0XHQvLyBJdCdzIG5vdCByZXF1aXJlZCB0byBiZSBmaXJzdCwgYnV0IGl0J3MgcmVjb21tZW5kZWQgdG8gYmUuIEFsbW9zdCBhbGwgSVNPIGJhc2UgbWVkaWEgZmlsZXMgc3RhcnQgd2l0aCBgZnR5cGAgYm94LlxuXHRcdC8vIGBmdHlwYCBib3ggbXVzdCBjb250YWluIGEgYnJhbmQgbWFqb3IgaWRlbnRpZmllciwgd2hpY2ggbXVzdCBjb25zaXN0IG9mIElTTyA4ODU5LTEgcHJpbnRhYmxlIGNoYXJhY3RlcnMuXG5cdFx0Ly8gSGVyZSB3ZSBjaGVjayBmb3IgODg1OS0xIHByaW50YWJsZSBjaGFyYWN0ZXJzIChmb3Igc2ltcGxpY2l0eSwgaXQncyBhIG1hc2sgd2hpY2ggYWxzbyBjYXRjaGVzIG9uZSBub24tcHJpbnRhYmxlIGNoYXJhY3RlcikuXG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5jaGVja1N0cmluZygnZnR5cCcsIHtvZmZzZXQ6IDR9KVxuXHRcdFx0JiYgKHRoaXMuYnVmZmVyWzhdICYgMHg2MCkgIT09IDB4MDAgLy8gQnJhbmQgbWFqb3IsIGZpcnN0IGNoYXJhY3RlciBBU0NJST9cblx0XHQpIHtcblx0XHRcdC8vIFRoZXkgYWxsIGNhbiBoYXZlIE1JTUUgYHZpZGVvL21wNGAgZXhjZXB0IGBhcHBsaWNhdGlvbi9tcDRgIHNwZWNpYWwtY2FzZSB3aGljaCBpcyBoYXJkIHRvIGRldGVjdC5cblx0XHRcdC8vIEZvciBzb21lIGNhc2VzLCB3ZSdyZSBzcGVjaWZpYywgZXZlcnl0aGluZyBlbHNlIGZhbGxzIHRvIGB2aWRlby9tcDRgIHdpdGggYG1wNGAgZXh0ZW5zaW9uLlxuXHRcdFx0Y29uc3QgYnJhbmRNYWpvciA9IHRoaXMuYnVmZmVyLnRvU3RyaW5nKCdiaW5hcnknLCA4LCAxMikucmVwbGFjZSgnXFwwJywgJyAnKS50cmltKCk7XG5cdFx0XHRzd2l0Y2ggKGJyYW5kTWFqb3IpIHtcblx0XHRcdFx0Y2FzZSAnYXZpZic6XG5cdFx0XHRcdGNhc2UgJ2F2aXMnOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnYXZpZicsIG1pbWU6ICdpbWFnZS9hdmlmJ307XG5cdFx0XHRcdGNhc2UgJ21pZjEnOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnaGVpYycsIG1pbWU6ICdpbWFnZS9oZWlmJ307XG5cdFx0XHRcdGNhc2UgJ21zZjEnOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnaGVpYycsIG1pbWU6ICdpbWFnZS9oZWlmLXNlcXVlbmNlJ307XG5cdFx0XHRcdGNhc2UgJ2hlaWMnOlxuXHRcdFx0XHRjYXNlICdoZWl4Jzpcblx0XHRcdFx0XHRyZXR1cm4ge2V4dDogJ2hlaWMnLCBtaW1lOiAnaW1hZ2UvaGVpYyd9O1xuXHRcdFx0XHRjYXNlICdoZXZjJzpcblx0XHRcdFx0Y2FzZSAnaGV2eCc6XG5cdFx0XHRcdFx0cmV0dXJuIHtleHQ6ICdoZWljJywgbWltZTogJ2ltYWdlL2hlaWMtc2VxdWVuY2UnfTtcblx0XHRcdFx0Y2FzZSAncXQnOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnbW92JywgbWltZTogJ3ZpZGVvL3F1aWNrdGltZSd9O1xuXHRcdFx0XHRjYXNlICdNNFYnOlxuXHRcdFx0XHRjYXNlICdNNFZIJzpcblx0XHRcdFx0Y2FzZSAnTTRWUCc6XG5cdFx0XHRcdFx0cmV0dXJuIHtleHQ6ICdtNHYnLCBtaW1lOiAndmlkZW8veC1tNHYnfTtcblx0XHRcdFx0Y2FzZSAnTTRQJzpcblx0XHRcdFx0XHRyZXR1cm4ge2V4dDogJ200cCcsIG1pbWU6ICd2aWRlby9tcDQnfTtcblx0XHRcdFx0Y2FzZSAnTTRCJzpcblx0XHRcdFx0XHRyZXR1cm4ge2V4dDogJ200YicsIG1pbWU6ICdhdWRpby9tcDQnfTtcblx0XHRcdFx0Y2FzZSAnTTRBJzpcblx0XHRcdFx0XHRyZXR1cm4ge2V4dDogJ200YScsIG1pbWU6ICdhdWRpby94LW00YSd9O1xuXHRcdFx0XHRjYXNlICdGNFYnOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnZjR2JywgbWltZTogJ3ZpZGVvL21wNCd9O1xuXHRcdFx0XHRjYXNlICdGNFAnOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnZjRwJywgbWltZTogJ3ZpZGVvL21wNCd9O1xuXHRcdFx0XHRjYXNlICdGNEEnOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnZjRhJywgbWltZTogJ2F1ZGlvL21wNCd9O1xuXHRcdFx0XHRjYXNlICdGNEInOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnZjRiJywgbWltZTogJ2F1ZGlvL21wNCd9O1xuXHRcdFx0XHRjYXNlICdjcngnOlxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnY3IzJywgbWltZTogJ2ltYWdlL3gtY2Fub24tY3IzJ307XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aWYgKGJyYW5kTWFqb3Iuc3RhcnRzV2l0aCgnM2cnKSkge1xuXHRcdFx0XHRcdFx0aWYgKGJyYW5kTWFqb3Iuc3RhcnRzV2l0aCgnM2cyJykpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtleHQ6ICczZzInLCBtaW1lOiAndmlkZW8vM2dwcDInfTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIHtleHQ6ICczZ3AnLCBtaW1lOiAndmlkZW8vM2dwcCd9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB7ZXh0OiAnbXA0JywgbWltZTogJ3ZpZGVvL21wNCd9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdNVGhkJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ21pZCcsXG5cdFx0XHRcdG1pbWU6ICdhdWRpby9taWRpJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5jaGVja1N0cmluZygnd09GRicpXG5cdFx0XHQmJiAoXG5cdFx0XHRcdHRoaXMuY2hlY2soWzB4MDAsIDB4MDEsIDB4MDAsIDB4MDBdLCB7b2Zmc2V0OiA0fSlcblx0XHRcdFx0fHwgdGhpcy5jaGVja1N0cmluZygnT1RUTycsIHtvZmZzZXQ6IDR9KVxuXHRcdFx0KVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnd29mZicsXG5cdFx0XHRcdG1pbWU6ICdmb250L3dvZmYnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHR0aGlzLmNoZWNrU3RyaW5nKCd3T0YyJylcblx0XHRcdCYmIChcblx0XHRcdFx0dGhpcy5jaGVjayhbMHgwMCwgMHgwMSwgMHgwMCwgMHgwMF0sIHtvZmZzZXQ6IDR9KVxuXHRcdFx0XHR8fCB0aGlzLmNoZWNrU3RyaW5nKCdPVFRPJywge29mZnNldDogNH0pXG5cdFx0XHQpXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICd3b2ZmMicsXG5cdFx0XHRcdG1pbWU6ICdmb250L3dvZmYyJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4RDQsIDB4QzMsIDB4QjIsIDB4QTFdKSB8fCB0aGlzLmNoZWNrKFsweEExLCAweEIyLCAweEMzLCAweEQ0XSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3BjYXAnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vdm5kLnRjcGR1bXAucGNhcCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIFNvbnkgRFNEIFN0cmVhbSBGaWxlIChEU0YpXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ0RTRCAnKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnZHNmJyxcblx0XHRcdFx0bWltZTogJ2F1ZGlvL3gtZHNmJywgLy8gTm9uLXN0YW5kYXJkXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdMWklQJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2x6Jyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtbHppcCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdmTGFDJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2ZsYWMnLFxuXHRcdFx0XHRtaW1lOiAnYXVkaW8veC1mbGFjJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NDIsIDB4NTAsIDB4NDcsIDB4RkJdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnYnBnJyxcblx0XHRcdFx0bWltZTogJ2ltYWdlL2JwZycsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCd3dnBrJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3d2Jyxcblx0XHRcdFx0bWltZTogJ2F1ZGlvL3dhdnBhY2snLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnJVBERicpKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRhd2FpdCB0b2tlbml6ZXIuaWdub3JlKDEzNTApO1xuXHRcdFx0XHRjb25zdCBtYXhCdWZmZXJTaXplID0gMTAgKiAxMDI0ICogMTAyNDtcblx0XHRcdFx0Y29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKE1hdGgubWluKG1heEJ1ZmZlclNpemUsIHRva2VuaXplci5maWxlSW5mby5zaXplKSk7XG5cdFx0XHRcdGF3YWl0IHRva2VuaXplci5yZWFkQnVmZmVyKGJ1ZmZlciwge21heUJlTGVzczogdHJ1ZX0pO1xuXG5cdFx0XHRcdC8vIENoZWNrIGlmIHRoaXMgaXMgYW4gQWRvYmUgSWxsdXN0cmF0b3IgZmlsZVxuXHRcdFx0XHRpZiAoYnVmZmVyLmluY2x1ZGVzKEJ1ZmZlci5mcm9tKCdBSVByaXZhdGVEYXRhJykpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGV4dDogJ2FpJyxcblx0XHRcdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi9wb3N0c2NyaXB0Jyxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHQvLyBTd2FsbG93IGVuZCBvZiBzdHJlYW0gZXJyb3IgaWYgZmlsZSBpcyB0b28gc21hbGwgZm9yIHRoZSBBZG9iZSBBSSBjaGVja1xuXHRcdFx0XHRpZiAoIShlcnJvciBpbnN0YW5jZW9mIHN0cnRvazMuRW5kT2ZTdHJlYW1FcnJvcikpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBc3N1bWUgdGhpcyBpcyBqdXN0IGEgbm9ybWFsIFBERlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAncGRmJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3BkZicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDAwLCAweDYxLCAweDczLCAweDZEXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3dhc20nLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vd2FzbScsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIFRJRkYsIGxpdHRsZS1lbmRpYW4gdHlwZVxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDQ5LCAweDQ5XSkpIHtcblx0XHRcdGNvbnN0IGZpbGVUeXBlID0gYXdhaXQgdGhpcy5yZWFkVGlmZkhlYWRlcihmYWxzZSk7XG5cdFx0XHRpZiAoZmlsZVR5cGUpIHtcblx0XHRcdFx0cmV0dXJuIGZpbGVUeXBlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFRJRkYsIGJpZy1lbmRpYW4gdHlwZVxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDRELCAweDREXSkpIHtcblx0XHRcdGNvbnN0IGZpbGVUeXBlID0gYXdhaXQgdGhpcy5yZWFkVGlmZkhlYWRlcih0cnVlKTtcblx0XHRcdGlmIChmaWxlVHlwZSkge1xuXHRcdFx0XHRyZXR1cm4gZmlsZVR5cGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ01BQyAnKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnYXBlJyxcblx0XHRcdFx0bWltZTogJ2F1ZGlvL2FwZScsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9maWxlL2ZpbGUvYmxvYi9tYXN0ZXIvbWFnaWMvTWFnZGlyL21hdHJvc2thXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4MUEsIDB4NDUsIDB4REYsIDB4QTNdKSkgeyAvLyBSb290IGVsZW1lbnQ6IEVCTUxcblx0XHRcdGFzeW5jIGZ1bmN0aW9uIHJlYWRGaWVsZCgpIHtcblx0XHRcdFx0Y29uc3QgbXNiID0gYXdhaXQgdG9rZW5pemVyLnBlZWtOdW1iZXIoVG9rZW4uVUlOVDgpO1xuXHRcdFx0XHRsZXQgbWFzayA9IDB4ODA7XG5cdFx0XHRcdGxldCBpYyA9IDA7IC8vIDAgPSBBLCAxID0gQiwgMiA9IEMsIDNcblx0XHRcdFx0Ly8gPSBEXG5cblx0XHRcdFx0d2hpbGUgKChtc2IgJiBtYXNrKSA9PT0gMCAmJiBtYXNrICE9PSAwKSB7XG5cdFx0XHRcdFx0KytpYztcblx0XHRcdFx0XHRtYXNrID4+PSAxO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgaWQgPSBCdWZmZXIuYWxsb2MoaWMgKyAxKTtcblx0XHRcdFx0YXdhaXQgdG9rZW5pemVyLnJlYWRCdWZmZXIoaWQpO1xuXHRcdFx0XHRyZXR1cm4gaWQ7XG5cdFx0XHR9XG5cblx0XHRcdGFzeW5jIGZ1bmN0aW9uIHJlYWRFbGVtZW50KCkge1xuXHRcdFx0XHRjb25zdCBpZCA9IGF3YWl0IHJlYWRGaWVsZCgpO1xuXHRcdFx0XHRjb25zdCBsZW5ndGhGaWVsZCA9IGF3YWl0IHJlYWRGaWVsZCgpO1xuXHRcdFx0XHRsZW5ndGhGaWVsZFswXSBePSAweDgwID4+IChsZW5ndGhGaWVsZC5sZW5ndGggLSAxKTtcblx0XHRcdFx0Y29uc3QgbnJMZW5ndGggPSBNYXRoLm1pbig2LCBsZW5ndGhGaWVsZC5sZW5ndGgpOyAvLyBKYXZhU2NyaXB0IGNhbiBtYXggcmVhZCA2IGJ5dGVzIGludGVnZXJcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRpZDogaWQucmVhZFVJbnRCRSgwLCBpZC5sZW5ndGgpLFxuXHRcdFx0XHRcdGxlbjogbGVuZ3RoRmllbGQucmVhZFVJbnRCRShsZW5ndGhGaWVsZC5sZW5ndGggLSBuckxlbmd0aCwgbnJMZW5ndGgpLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRhc3luYyBmdW5jdGlvbiByZWFkQ2hpbGRyZW4oY2hpbGRyZW4pIHtcblx0XHRcdFx0d2hpbGUgKGNoaWxkcmVuID4gMCkge1xuXHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBhd2FpdCByZWFkRWxlbWVudCgpO1xuXHRcdFx0XHRcdGlmIChlbGVtZW50LmlkID09PSAweDQyXzgyKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByYXdWYWx1ZSA9IGF3YWl0IHRva2VuaXplci5yZWFkVG9rZW4obmV3IFRva2VuLlN0cmluZ1R5cGUoZWxlbWVudC5sZW4sICd1dGYtOCcpKTtcblx0XHRcdFx0XHRcdHJldHVybiByYXdWYWx1ZS5yZXBsYWNlKC9cXDAwLiokL2csICcnKTsgLy8gUmV0dXJuIERvY1R5cGVcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhd2FpdCB0b2tlbml6ZXIuaWdub3JlKGVsZW1lbnQubGVuKTsgLy8gaWdub3JlIHBheWxvYWRcblx0XHRcdFx0XHQtLWNoaWxkcmVuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJlID0gYXdhaXQgcmVhZEVsZW1lbnQoKTtcblx0XHRcdGNvbnN0IGRvY1R5cGUgPSBhd2FpdCByZWFkQ2hpbGRyZW4ocmUubGVuKTtcblxuXHRcdFx0c3dpdGNoIChkb2NUeXBlKSB7XG5cdFx0XHRcdGNhc2UgJ3dlYm0nOlxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRleHQ6ICd3ZWJtJyxcblx0XHRcdFx0XHRcdG1pbWU6ICd2aWRlby93ZWJtJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdGNhc2UgJ21hdHJvc2thJzpcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZXh0OiAnbWt2Jyxcblx0XHRcdFx0XHRcdG1pbWU6ICd2aWRlby94LW1hdHJvc2thJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJJRkYgZmlsZSBmb3JtYXQgd2hpY2ggbWlnaHQgYmUgQVZJLCBXQVYsIFFDUCwgZXRjXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NTIsIDB4NDksIDB4NDYsIDB4NDZdKSkge1xuXHRcdFx0aWYgKHRoaXMuY2hlY2soWzB4NDEsIDB4NTYsIDB4NDldLCB7b2Zmc2V0OiA4fSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdhdmknLFxuXHRcdFx0XHRcdG1pbWU6ICd2aWRlby92bmQuYXZpJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuY2hlY2soWzB4NTcsIDB4NDEsIDB4NTYsIDB4NDVdLCB7b2Zmc2V0OiA4fSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICd3YXYnLFxuXHRcdFx0XHRcdG1pbWU6ICdhdWRpby92bmQud2F2ZScsXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFFMQ00sIFFDUCBmaWxlXG5cdFx0XHRpZiAodGhpcy5jaGVjayhbMHg1MSwgMHg0QywgMHg0MywgMHg0RF0sIHtvZmZzZXQ6IDh9KSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ3FjcCcsXG5cdFx0XHRcdFx0bWltZTogJ2F1ZGlvL3FjZWxwJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnU1FMaScpKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdzcWxpdGUnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1zcWxpdGUzJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NEUsIDB4NDUsIDB4NTMsIDB4MUFdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnbmVzJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtbmludGVuZG8tbmVzLXJvbScsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdDcjI0JykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2NyeCcsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LWdvb2dsZS1jaHJvbWUtZXh0ZW5zaW9uJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5jaGVja1N0cmluZygnTVNDRicpXG5cdFx0XHR8fCB0aGlzLmNoZWNrU3RyaW5nKCdJU2MoJylcblx0XHQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2NhYicsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi92bmQubXMtY2FiLWNvbXByZXNzZWQnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHhFRCwgMHhBQiwgMHhFRSwgMHhEQl0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdycG0nLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1ycG0nLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHhDNSwgMHhEMCwgMHhEMywgMHhDNl0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdlcHMnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vZXBzJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4MjgsIDB4QjUsIDB4MkYsIDB4RkRdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnenN0Jyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3pzdGQnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHg3RiwgMHg0NSwgMHg0QywgMHg0Nl0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdlbGYnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1lbGYnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHgyMSwgMHg0MiwgMHg0NCwgMHg0RV0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdwc3QnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vdm5kLm1zLW91dGxvb2snLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnUEFSMScpKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdwYXJxdWV0Jyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtcGFycXVldCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweENGLCAweEZBLCAweEVELCAweEZFXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ21hY2hvJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtbWFjaC1iaW5hcnknLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyAtLSA1LWJ5dGUgc2lnbmF0dXJlcyAtLVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NEYsIDB4NTQsIDB4NTQsIDB4NEYsIDB4MDBdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnb3RmJyxcblx0XHRcdFx0bWltZTogJ2ZvbnQvb3RmJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJyMhQU1SJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2FtcicsXG5cdFx0XHRcdG1pbWU6ICdhdWRpby9hbXInLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygne1xcXFxydGYnKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAncnRmJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3J0ZicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDQ2LCAweDRDLCAweDU2LCAweDAxXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2ZsdicsXG5cdFx0XHRcdG1pbWU6ICd2aWRlby94LWZsdicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdJTVBNJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2l0Jyxcblx0XHRcdFx0bWltZTogJ2F1ZGlvL3gtaXQnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHR0aGlzLmNoZWNrU3RyaW5nKCctbGgwLScsIHtvZmZzZXQ6IDJ9KVxuXHRcdFx0fHwgdGhpcy5jaGVja1N0cmluZygnLWxoMS0nLCB7b2Zmc2V0OiAyfSlcblx0XHRcdHx8IHRoaXMuY2hlY2tTdHJpbmcoJy1saDItJywge29mZnNldDogMn0pXG5cdFx0XHR8fCB0aGlzLmNoZWNrU3RyaW5nKCctbGgzLScsIHtvZmZzZXQ6IDJ9KVxuXHRcdFx0fHwgdGhpcy5jaGVja1N0cmluZygnLWxoNC0nLCB7b2Zmc2V0OiAyfSlcblx0XHRcdHx8IHRoaXMuY2hlY2tTdHJpbmcoJy1saDUtJywge29mZnNldDogMn0pXG5cdFx0XHR8fCB0aGlzLmNoZWNrU3RyaW5nKCctbGg2LScsIHtvZmZzZXQ6IDJ9KVxuXHRcdFx0fHwgdGhpcy5jaGVja1N0cmluZygnLWxoNy0nLCB7b2Zmc2V0OiAyfSlcblx0XHRcdHx8IHRoaXMuY2hlY2tTdHJpbmcoJy1senMtJywge29mZnNldDogMn0pXG5cdFx0XHR8fCB0aGlzLmNoZWNrU3RyaW5nKCctbHo0LScsIHtvZmZzZXQ6IDJ9KVxuXHRcdFx0fHwgdGhpcy5jaGVja1N0cmluZygnLWx6NS0nLCB7b2Zmc2V0OiAyfSlcblx0XHRcdHx8IHRoaXMuY2hlY2tTdHJpbmcoJy1saGQtJywge29mZnNldDogMn0pXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdsemgnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1semgtY29tcHJlc3NlZCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIE1QRUcgcHJvZ3JhbSBzdHJlYW0gKFBTIG9yIE1QRUctUFMpXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4MDAsIDB4MDAsIDB4MDEsIDB4QkFdKSkge1xuXHRcdFx0Ly8gIE1QRUctUFMsIE1QRUctMSBQYXJ0IDFcblx0XHRcdGlmICh0aGlzLmNoZWNrKFsweDIxXSwge29mZnNldDogNCwgbWFzazogWzB4RjFdfSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdtcGcnLCAvLyBNYXkgYWxzbyBiZSAucHMsIC5tcGVnXG5cdFx0XHRcdFx0bWltZTogJ3ZpZGVvL01QMVMnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNUEVHLVBTLCBNUEVHLTIgUGFydCAxXG5cdFx0XHRpZiAodGhpcy5jaGVjayhbMHg0NF0sIHtvZmZzZXQ6IDQsIG1hc2s6IFsweEM0XX0pKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXh0OiAnbXBnJywgLy8gTWF5IGFsc28gYmUgLm1wZywgLm0ycCwgLnZvYiBvciAuc3ViXG5cdFx0XHRcdFx0bWltZTogJ3ZpZGVvL01QMlAnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdJVFNGJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2NobScsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi92bmQubXMtaHRtbGhlbHAnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHhDQSwgMHhGRSwgMHhCQSwgMHhCRV0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdjbGFzcycsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi9qYXZhLXZtJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gLS0gNi1ieXRlIHNpZ25hdHVyZXMgLS1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweEZELCAweDM3LCAweDdBLCAweDU4LCAweDVBLCAweDAwXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3h6Jyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gteHonLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnPD94bWwgJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3htbCcsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94bWwnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHgzNywgMHg3QSwgMHhCQywgMHhBRiwgMHgyNywgMHgxQ10pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICc3eicsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHR0aGlzLmNoZWNrKFsweDUyLCAweDYxLCAweDcyLCAweDIxLCAweDFBLCAweDddKVxuXHRcdFx0JiYgKHRoaXMuYnVmZmVyWzZdID09PSAweDAgfHwgdGhpcy5idWZmZXJbNl0gPT09IDB4MSlcblx0XHQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3JhcicsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LXJhci1jb21wcmVzc2VkJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ3NvbGlkICcpKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdzdGwnLFxuXHRcdFx0XHRtaW1lOiAnbW9kZWwvc3RsJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ0FDJykpIHtcblx0XHRcdGNvbnN0IHZlcnNpb24gPSB0aGlzLmJ1ZmZlci50b1N0cmluZygnYmluYXJ5JywgMiwgNik7XG5cdFx0XHRpZiAodmVyc2lvbi5tYXRjaCgnXmQqJykgJiYgdmVyc2lvbiA+PSAxMDAwICYmIHZlcnNpb24gPD0gMTA1MCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ2R3ZycsXG5cdFx0XHRcdFx0bWltZTogJ2ltYWdlL3ZuZC5kd2cnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCcwNzA3MDcnKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnY3BpbycsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LWNwaW8nLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyAtLSA3LWJ5dGUgc2lnbmF0dXJlcyAtLVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ0JMRU5ERVInKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnYmxlbmQnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1ibGVuZGVyJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJyE8YXJjaD4nKSkge1xuXHRcdFx0YXdhaXQgdG9rZW5pemVyLmlnbm9yZSg4KTtcblx0XHRcdGNvbnN0IHN0cmluZyA9IGF3YWl0IHRva2VuaXplci5yZWFkVG9rZW4obmV3IFRva2VuLlN0cmluZ1R5cGUoMTMsICdhc2NpaScpKTtcblx0XHRcdGlmIChzdHJpbmcgPT09ICdkZWJpYW4tYmluYXJ5Jykge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ2RlYicsXG5cdFx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtZGViJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnYXInLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC11bml4LWFyY2hpdmUnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnKipBQ0UnLCB7b2Zmc2V0OiA3fSkpIHtcblx0XHRcdGF3YWl0IHRva2VuaXplci5wZWVrQnVmZmVyKHRoaXMuYnVmZmVyLCB7bGVuZ3RoOiAxNCwgbWF5QmVMZXNzOiB0cnVlfSk7XG5cdFx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnKionLCB7b2Zmc2V0OiAxMn0pKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXh0OiAnYWNlJyxcblx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1hY2UtY29tcHJlc3NlZCcsXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gLS0gOC1ieXRlIHNpZ25hdHVyZXMgLS1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDg5LCAweDUwLCAweDRFLCAweDQ3LCAweDBELCAweDBBLCAweDFBLCAweDBBXSkpIHtcblx0XHRcdC8vIEFQTkcgZm9ybWF0IChodHRwczovL3dpa2kubW96aWxsYS5vcmcvQVBOR19TcGVjaWZpY2F0aW9uKVxuXHRcdFx0Ly8gMS4gRmluZCB0aGUgZmlyc3QgSURBVCAoaW1hZ2UgZGF0YSkgY2h1bmsgKDQ5IDQ0IDQxIDU0KVxuXHRcdFx0Ly8gMi4gQ2hlY2sgaWYgdGhlcmUgaXMgYW4gXCJhY1RMXCIgY2h1bmsgYmVmb3JlIHRoZSBJREFUIG9uZSAoNjEgNjMgNTQgNEMpXG5cblx0XHRcdC8vIE9mZnNldCBjYWxjdWxhdGVkIGFzIGZvbGxvd3M6XG5cdFx0XHQvLyAtIDggYnl0ZXM6IFBORyBzaWduYXR1cmVcblx0XHRcdC8vIC0gNCAobGVuZ3RoKSArIDQgKGNodW5rIHR5cGUpICsgMTMgKGNodW5rIGRhdGEpICsgNCAoQ1JDKTogSUhEUiBjaHVua1xuXG5cdFx0XHRhd2FpdCB0b2tlbml6ZXIuaWdub3JlKDgpOyAvLyBpZ25vcmUgUE5HIHNpZ25hdHVyZVxuXG5cdFx0XHRhc3luYyBmdW5jdGlvbiByZWFkQ2h1bmtIZWFkZXIoKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0bGVuZ3RoOiBhd2FpdCB0b2tlbml6ZXIucmVhZFRva2VuKFRva2VuLklOVDMyX0JFKSxcblx0XHRcdFx0XHR0eXBlOiBhd2FpdCB0b2tlbml6ZXIucmVhZFRva2VuKG5ldyBUb2tlbi5TdHJpbmdUeXBlKDQsICdiaW5hcnknKSksXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGRvIHtcblx0XHRcdFx0Y29uc3QgY2h1bmsgPSBhd2FpdCByZWFkQ2h1bmtIZWFkZXIoKTtcblx0XHRcdFx0aWYgKGNodW5rLmxlbmd0aCA8IDApIHtcblx0XHRcdFx0XHRyZXR1cm47IC8vIEludmFsaWQgY2h1bmsgbGVuZ3RoXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzd2l0Y2ggKGNodW5rLnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdJREFUJzpcblx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdGV4dDogJ3BuZycsXG5cdFx0XHRcdFx0XHRcdG1pbWU6ICdpbWFnZS9wbmcnLFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRjYXNlICdhY1RMJzpcblx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdGV4dDogJ2FwbmcnLFxuXHRcdFx0XHRcdFx0XHRtaW1lOiAnaW1hZ2UvYXBuZycsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRhd2FpdCB0b2tlbml6ZXIuaWdub3JlKGNodW5rLmxlbmd0aCArIDQpOyAvLyBJZ25vcmUgY2h1bmstZGF0YSArIENSQ1xuXHRcdFx0XHR9XG5cdFx0XHR9IHdoaWxlICh0b2tlbml6ZXIucG9zaXRpb24gKyA4IDwgdG9rZW5pemVyLmZpbGVJbmZvLnNpemUpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdwbmcnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UvcG5nJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NDEsIDB4NTIsIDB4NTIsIDB4NEYsIDB4NTcsIDB4MzEsIDB4MDAsIDB4MDBdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnYXJyb3cnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1hcGFjaGUtYXJyb3cnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHg2NywgMHg2QywgMHg1NCwgMHg0NiwgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMF0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdnbGInLFxuXHRcdFx0XHRtaW1lOiAnbW9kZWwvZ2x0Zi1iaW5hcnknLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBgbW92YCBmb3JtYXQgdmFyaWFudHNcblx0XHRpZiAoXG5cdFx0XHR0aGlzLmNoZWNrKFsweDY2LCAweDcyLCAweDY1LCAweDY1XSwge29mZnNldDogNH0pIC8vIGBmcmVlYFxuXHRcdFx0fHwgdGhpcy5jaGVjayhbMHg2RCwgMHg2NCwgMHg2MSwgMHg3NF0sIHtvZmZzZXQ6IDR9KSAvLyBgbWRhdGAgTUpQRUdcblx0XHRcdHx8IHRoaXMuY2hlY2soWzB4NkQsIDB4NkYsIDB4NkYsIDB4NzZdLCB7b2Zmc2V0OiA0fSkgLy8gYG1vb3ZgXG5cdFx0XHR8fCB0aGlzLmNoZWNrKFsweDc3LCAweDY5LCAweDY0LCAweDY1XSwge29mZnNldDogNH0pIC8vIGB3aWRlYFxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnbW92Jyxcblx0XHRcdFx0bWltZTogJ3ZpZGVvL3F1aWNrdGltZScsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIC0tIDktYnl0ZSBzaWduYXR1cmVzIC0tXG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHg0OSwgMHg0OSwgMHg1MiwgMHg0RiwgMHgwOCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgxOF0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdvcmYnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UveC1vbHltcHVzLW9yZicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdnaW1wIHhjZiAnKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAneGNmJyxcblx0XHRcdFx0bWltZTogJ2ltYWdlL3gteGNmJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gLS0gMTItYnl0ZSBzaWduYXR1cmVzIC0tXG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHg0OSwgMHg0OSwgMHg1NSwgMHgwMCwgMHgxOCwgMHgwMCwgMHgwMCwgMHgwMCwgMHg4OCwgMHhFNywgMHg3NCwgMHhEOF0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdydzInLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UveC1wYW5hc29uaWMtcncyJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gQVNGX0hlYWRlcl9PYmplY3QgZmlyc3QgODAgYnl0ZXNcblx0XHRpZiAodGhpcy5jaGVjayhbMHgzMCwgMHgyNiwgMHhCMiwgMHg3NSwgMHg4RSwgMHg2NiwgMHhDRiwgMHgxMSwgMHhBNiwgMHhEOV0pKSB7XG5cdFx0XHRhc3luYyBmdW5jdGlvbiByZWFkSGVhZGVyKCkge1xuXHRcdFx0XHRjb25zdCBndWlkID0gQnVmZmVyLmFsbG9jKDE2KTtcblx0XHRcdFx0YXdhaXQgdG9rZW5pemVyLnJlYWRCdWZmZXIoZ3VpZCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0aWQ6IGd1aWQsXG5cdFx0XHRcdFx0c2l6ZTogTnVtYmVyKGF3YWl0IHRva2VuaXplci5yZWFkVG9rZW4oVG9rZW4uVUlOVDY0X0xFKSksXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGF3YWl0IHRva2VuaXplci5pZ25vcmUoMzApO1xuXHRcdFx0Ly8gU2VhcmNoIGZvciBoZWFkZXIgc2hvdWxkIGJlIGluIGZpcnN0IDFLQiBvZiBmaWxlLlxuXHRcdFx0d2hpbGUgKHRva2VuaXplci5wb3NpdGlvbiArIDI0IDwgdG9rZW5pemVyLmZpbGVJbmZvLnNpemUpIHtcblx0XHRcdFx0Y29uc3QgaGVhZGVyID0gYXdhaXQgcmVhZEhlYWRlcigpO1xuXHRcdFx0XHRsZXQgcGF5bG9hZCA9IGhlYWRlci5zaXplIC0gMjQ7XG5cdFx0XHRcdGlmIChfY2hlY2soaGVhZGVyLmlkLCBbMHg5MSwgMHgwNywgMHhEQywgMHhCNywgMHhCNywgMHhBOSwgMHhDRiwgMHgxMSwgMHg4RSwgMHhFNiwgMHgwMCwgMHhDMCwgMHgwQywgMHgyMCwgMHg1MywgMHg2NV0pKSB7XG5cdFx0XHRcdFx0Ly8gU3luYyBvbiBTdHJlYW0tUHJvcGVydGllcy1PYmplY3QgKEI3REMwNzkxLUE5QjctMTFDRi04RUU2LTAwQzAwQzIwNTM2NSlcblx0XHRcdFx0XHRjb25zdCB0eXBlSWQgPSBCdWZmZXIuYWxsb2MoMTYpO1xuXHRcdFx0XHRcdHBheWxvYWQgLT0gYXdhaXQgdG9rZW5pemVyLnJlYWRCdWZmZXIodHlwZUlkKTtcblxuXHRcdFx0XHRcdGlmIChfY2hlY2sodHlwZUlkLCBbMHg0MCwgMHg5RSwgMHg2OSwgMHhGOCwgMHg0RCwgMHg1QiwgMHhDRiwgMHgxMSwgMHhBOCwgMHhGRCwgMHgwMCwgMHg4MCwgMHg1RiwgMHg1QywgMHg0NCwgMHgyQl0pKSB7XG5cdFx0XHRcdFx0XHQvLyBGb3VuZCBhdWRpbzpcblx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdGV4dDogJ2FzZicsXG5cdFx0XHRcdFx0XHRcdG1pbWU6ICdhdWRpby94LW1zLWFzZicsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChfY2hlY2sodHlwZUlkLCBbMHhDMCwgMHhFRiwgMHgxOSwgMHhCQywgMHg0RCwgMHg1QiwgMHhDRiwgMHgxMSwgMHhBOCwgMHhGRCwgMHgwMCwgMHg4MCwgMHg1RiwgMHg1QywgMHg0NCwgMHgyQl0pKSB7XG5cdFx0XHRcdFx0XHQvLyBGb3VuZCB2aWRlbzpcblx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdGV4dDogJ2FzZicsXG5cdFx0XHRcdFx0XHRcdG1pbWU6ICd2aWRlby94LW1zLWFzZicsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YXdhaXQgdG9rZW5pemVyLmlnbm9yZShwYXlsb2FkKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRGVmYXVsdCB0byBBU0YgZ2VuZXJpYyBleHRlbnNpb25cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2FzZicsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi92bmQubXMtYXNmJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4QUIsIDB4NEIsIDB4NTQsIDB4NTgsIDB4MjAsIDB4MzEsIDB4MzEsIDB4QkIsIDB4MEQsIDB4MEEsIDB4MUEsIDB4MEFdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAna3R4Jyxcblx0XHRcdFx0bWltZTogJ2ltYWdlL2t0eCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICgodGhpcy5jaGVjayhbMHg3RSwgMHgxMCwgMHgwNF0pIHx8IHRoaXMuY2hlY2soWzB4N0UsIDB4MTgsIDB4MDRdKSkgJiYgdGhpcy5jaGVjayhbMHgzMCwgMHg0RCwgMHg0OSwgMHg0NV0sIHtvZmZzZXQ6IDR9KSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnbWllJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtbWllJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4MjcsIDB4MEEsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdLCB7b2Zmc2V0OiAyfSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3NocCcsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LWVzcmktc2hhcGUnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHhGRiwgMHg0RiwgMHhGRiwgMHg1MV0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdqMmMnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UvajJjJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4MDAsIDB4MDAsIDB4MDAsIDB4MEMsIDB4NkEsIDB4NTAsIDB4MjAsIDB4MjAsIDB4MEQsIDB4MEEsIDB4ODcsIDB4MEFdKSkge1xuXHRcdFx0Ly8gSlBFRy0yMDAwIGZhbWlseVxuXG5cdFx0XHRhd2FpdCB0b2tlbml6ZXIuaWdub3JlKDIwKTtcblx0XHRcdGNvbnN0IHR5cGUgPSBhd2FpdCB0b2tlbml6ZXIucmVhZFRva2VuKG5ldyBUb2tlbi5TdHJpbmdUeXBlKDQsICdhc2NpaScpKTtcblx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRjYXNlICdqcDIgJzpcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZXh0OiAnanAyJyxcblx0XHRcdFx0XHRcdG1pbWU6ICdpbWFnZS9qcDInLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgJ2pweCAnOlxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRleHQ6ICdqcHgnLFxuXHRcdFx0XHRcdFx0bWltZTogJ2ltYWdlL2pweCcsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0Y2FzZSAnanBtICc6XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGV4dDogJ2pwbScsXG5cdFx0XHRcdFx0XHRtaW1lOiAnaW1hZ2UvanBtJyxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRjYXNlICdtanAyJzpcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZXh0OiAnbWoyJyxcblx0XHRcdFx0XHRcdG1pbWU6ICdpbWFnZS9tajInLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdHRoaXMuY2hlY2soWzB4RkYsIDB4MEFdKVxuXHRcdFx0fHwgdGhpcy5jaGVjayhbMHgwMCwgMHgwMCwgMHgwMCwgMHgwQywgMHg0QSwgMHg1OCwgMHg0QywgMHgyMCwgMHgwRCwgMHgwQSwgMHg4NywgMHgwQV0pXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdqeGwnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UvanhsJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4RkUsIDB4RkZdKSkgeyAvLyBVVEYtMTYtQk9NLUxFXG5cdFx0XHRpZiAodGhpcy5jaGVjayhbMCwgNjAsIDAsIDYzLCAwLCAxMjAsIDAsIDEwOSwgMCwgMTA4XSwge29mZnNldDogMn0pKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXh0OiAneG1sJyxcblx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veG1sJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDsgLy8gU29tZSB1bmtub3duIHRleHQgYmFzZWQgZm9ybWF0XG5cdFx0fVxuXG5cdFx0Ly8gLS0gVW5zYWZlIHNpZ25hdHVyZXMgLS1cblxuXHRcdGlmIChcblx0XHRcdHRoaXMuY2hlY2soWzB4MCwgMHgwLCAweDEsIDB4QkFdKVxuXHRcdFx0fHwgdGhpcy5jaGVjayhbMHgwLCAweDAsIDB4MSwgMHhCM10pXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdtcGcnLFxuXHRcdFx0XHRtaW1lOiAndmlkZW8vbXBlZycsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDAwLCAweDAxLCAweDAwLCAweDAwLCAweDAwXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3R0ZicsXG5cdFx0XHRcdG1pbWU6ICdmb250L3R0ZicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDAwLCAweDAwLCAweDAxLCAweDAwXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2ljbycsXG5cdFx0XHRcdG1pbWU6ICdpbWFnZS94LWljb24nLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHgwMCwgMHgwMCwgMHgwMiwgMHgwMF0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdjdXInLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UveC1pY29uJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4RDAsIDB4Q0YsIDB4MTEsIDB4RTAsIDB4QTEsIDB4QjEsIDB4MUEsIDB4RTFdKSkge1xuXHRcdFx0Ly8gRGV0ZWN0ZWQgTWljcm9zb2Z0IENvbXBvdW5kIEZpbGUgQmluYXJ5IEZpbGUgKE1TLUNGQikgRm9ybWF0LlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnY2ZiJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtY2ZiJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSW5jcmVhc2Ugc2FtcGxlIHNpemUgZnJvbSAxMiB0byAyNTYuXG5cdFx0YXdhaXQgdG9rZW5pemVyLnBlZWtCdWZmZXIodGhpcy5idWZmZXIsIHtsZW5ndGg6IE1hdGgubWluKDI1NiwgdG9rZW5pemVyLmZpbGVJbmZvLnNpemUpLCBtYXlCZUxlc3M6IHRydWV9KTtcblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDYxLCAweDYzLCAweDczLCAweDcwXSwge29mZnNldDogMzZ9KSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnaWNjJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3ZuZC5pY2Nwcm9maWxlJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gLS0gMTUtYnl0ZSBzaWduYXR1cmVzIC0tXG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnQkVHSU46JykpIHtcblx0XHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdWQ0FSRCcsIHtvZmZzZXQ6IDZ9KSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ3ZjZicsXG5cdFx0XHRcdFx0bWltZTogJ3RleHQvdmNhcmQnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnVkNBTEVOREFSJywge29mZnNldDogNn0pKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXh0OiAnaWNzJyxcblx0XHRcdFx0XHRtaW1lOiAndGV4dC9jYWxlbmRhcicsXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gYHJhZmAgaXMgaGVyZSBqdXN0IHRvIGtlZXAgYWxsIHRoZSByYXcgaW1hZ2UgZGV0ZWN0b3JzIHRvZ2V0aGVyLlxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdGVUpJRklMTUNDRC1SQVcnKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAncmFmJyxcblx0XHRcdFx0bWltZTogJ2ltYWdlL3gtZnVqaWZpbG0tcmFmJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ0V4dGVuZGVkIE1vZHVsZTonKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAneG0nLFxuXHRcdFx0XHRtaW1lOiAnYXVkaW8veC14bScsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdDcmVhdGl2ZSBWb2ljZSBGaWxlJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ3ZvYycsXG5cdFx0XHRcdG1pbWU6ICdhdWRpby94LXZvYycsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDA0LCAweDAwLCAweDAwLCAweDAwXSkgJiYgdGhpcy5idWZmZXIubGVuZ3RoID49IDE2KSB7IC8vIFJvdWdoICYgcXVpY2sgY2hlY2sgUGlja2xlL0FTQVJcblx0XHRcdGNvbnN0IGpzb25TaXplID0gdGhpcy5idWZmZXIucmVhZFVJbnQzMkxFKDEyKTtcblx0XHRcdGlmIChqc29uU2l6ZSA+IDEyICYmIHRoaXMuYnVmZmVyLmxlbmd0aCA+PSBqc29uU2l6ZSArIDE2KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Y29uc3QgaGVhZGVyID0gdGhpcy5idWZmZXIuc2xpY2UoMTYsIGpzb25TaXplICsgMTYpLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0Y29uc3QganNvbiA9IEpTT04ucGFyc2UoaGVhZGVyKTtcblx0XHRcdFx0XHQvLyBDaGVjayBpZiBQaWNrbGUgaXMgQVNBUlxuXHRcdFx0XHRcdGlmIChqc29uLmZpbGVzKSB7IC8vIEZpbmFsIGNoZWNrLCBhc3N1cmluZyBQaWNrbGUvQVNBUiBmb3JtYXRcblx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdGV4dDogJ2FzYXInLFxuXHRcdFx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC1hc2FyJyxcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIHt9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4MDYsIDB4MEUsIDB4MkIsIDB4MzQsIDB4MDIsIDB4MDUsIDB4MDEsIDB4MDEsIDB4MEQsIDB4MDEsIDB4MDIsIDB4MDEsIDB4MDEsIDB4MDJdKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnbXhmJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL214ZicsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCdTQ1JNJywge29mZnNldDogNDR9KSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnczNtJyxcblx0XHRcdFx0bWltZTogJ2F1ZGlvL3gtczNtJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gUmF3IE1QRUctMiB0cmFuc3BvcnQgc3RyZWFtICgxODgtYnl0ZSBwYWNrZXRzKVxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDQ3XSkgJiYgdGhpcy5jaGVjayhbMHg0N10sIHtvZmZzZXQ6IDE4OH0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdtdHMnLFxuXHRcdFx0XHRtaW1lOiAndmlkZW8vbXAydCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIEJsdS1yYXkgRGlzYyBBdWRpby1WaWRlbyAoQkRBVikgTVBFRy0yIHRyYW5zcG9ydCBzdHJlYW0gaGFzIDQtYnl0ZSBUUF9leHRyYV9oZWFkZXIgYmVmb3JlIGVhY2ggMTg4LWJ5dGUgcGFja2V0XG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4NDddLCB7b2Zmc2V0OiA0fSkgJiYgdGhpcy5jaGVjayhbMHg0N10sIHtvZmZzZXQ6IDE5Nn0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdtdHMnLFxuXHRcdFx0XHRtaW1lOiAndmlkZW8vbXAydCcsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDQyLCAweDRGLCAweDRGLCAweDRCLCAweDRELCAweDRGLCAweDQyLCAweDQ5XSwge29mZnNldDogNjB9KSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAnbW9iaScsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LW1vYmlwb2NrZXQtZWJvb2snLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHg0NCwgMHg0OSwgMHg0MywgMHg0RF0sIHtvZmZzZXQ6IDEyOH0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdkY20nLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vZGljb20nLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHg0QywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgMHgxNCwgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHhDMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHg0Nl0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdsbmsnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veC5tcy5zaG9ydGN1dCcsIC8vIEludmVudGVkIGJ5IHVzXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrKFsweDYyLCAweDZGLCAweDZGLCAweDZCLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDZELCAweDYxLCAweDcyLCAweDZCLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSkpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2FsaWFzJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3guYXBwbGUuYWxpYXMnLCAvLyBJbnZlbnRlZCBieSB1c1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVja1N0cmluZygnS2F5ZGFyYSBGQlggQmluYXJ5ICBcXHUwMDAwJykpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV4dDogJ2ZieCcsXG5cdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi94LmF1dG9kZXNrLmZieCcsIC8vIEludmVudGVkIGJ5IHVzXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdHRoaXMuY2hlY2soWzB4NEMsIDB4NTBdLCB7b2Zmc2V0OiAzNH0pXG5cdFx0XHQmJiAoXG5cdFx0XHRcdHRoaXMuY2hlY2soWzB4MDAsIDB4MDAsIDB4MDFdLCB7b2Zmc2V0OiA4fSlcblx0XHRcdFx0fHwgdGhpcy5jaGVjayhbMHgwMSwgMHgwMCwgMHgwMl0sIHtvZmZzZXQ6IDh9KVxuXHRcdFx0XHR8fCB0aGlzLmNoZWNrKFsweDAyLCAweDAwLCAweDAyXSwge29mZnNldDogOH0pXG5cdFx0XHQpXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdlb3QnLFxuXHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jaGVjayhbMHgwNiwgMHgwNiwgMHhFRCwgMHhGNSwgMHhEOCwgMHgxRCwgMHg0NiwgMHhFNSwgMHhCRCwgMHgzMSwgMHhFRiwgMHhFNywgMHhGRSwgMHg3NCwgMHhCNywgMHgxRF0pKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICdpbmRkJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtaW5kZXNpZ24nLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBJbmNyZWFzZSBzYW1wbGUgc2l6ZSBmcm9tIDI1NiB0byA1MTJcblx0XHRhd2FpdCB0b2tlbml6ZXIucGVla0J1ZmZlcih0aGlzLmJ1ZmZlciwge2xlbmd0aDogTWF0aC5taW4oNTEyLCB0b2tlbml6ZXIuZmlsZUluZm8uc2l6ZSksIG1heUJlTGVzczogdHJ1ZX0pO1xuXG5cdFx0Ly8gUmVxdWlyZXMgYSBidWZmZXIgc2l6ZSBvZiA1MTIgYnl0ZXNcblx0XHRpZiAodGFySGVhZGVyQ2hlY2tzdW1NYXRjaGVzKHRoaXMuYnVmZmVyKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAndGFyJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3gtdGFyJyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2hlY2soWzB4RkYsIDB4RkVdKSkgeyAvLyBVVEYtMTYtQk9NLUJFXG5cdFx0XHRpZiAodGhpcy5jaGVjayhbNjAsIDAsIDYzLCAwLCAxMjAsIDAsIDEwOSwgMCwgMTA4LCAwXSwge29mZnNldDogMn0pKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXh0OiAneG1sJyxcblx0XHRcdFx0XHRtaW1lOiAnYXBwbGljYXRpb24veG1sJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuY2hlY2soWzB4RkYsIDB4MEUsIDB4NTMsIDB4MDAsIDB4NkIsIDB4MDAsIDB4NjUsIDB4MDAsIDB4NzQsIDB4MDAsIDB4NjMsIDB4MDAsIDB4NjgsIDB4MDAsIDB4NTUsIDB4MDAsIDB4NzAsIDB4MDAsIDB4MjAsIDB4MDAsIDB4NEQsIDB4MDAsIDB4NkYsIDB4MDAsIDB4NjQsIDB4MDAsIDB4NjUsIDB4MDAsIDB4NkMsIDB4MDBdLCB7b2Zmc2V0OiAyfSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdza3AnLFxuXHRcdFx0XHRcdG1pbWU6ICdhcHBsaWNhdGlvbi92bmQuc2tldGNodXAuc2twJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDsgLy8gU29tZSB0ZXh0IGJhc2VkIGZvcm1hdFxuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNoZWNrU3RyaW5nKCctLS0tLUJFR0lOIFBHUCBNRVNTQUdFLS0tLS0nKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXh0OiAncGdwJyxcblx0XHRcdFx0bWltZTogJ2FwcGxpY2F0aW9uL3BncC1lbmNyeXB0ZWQnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBNUEVHIDEgb3IgMiBMYXllciAzIGhlYWRlciwgb3IgJ2xheWVyIDAnIGZvciBBRFRTIChNUEVHIHN5bmMtd29yZCAweEZGRSlcblx0XHRpZiAodGhpcy5idWZmZXIubGVuZ3RoID49IDIgJiYgdGhpcy5jaGVjayhbMHhGRiwgMHhFMF0sIHtvZmZzZXQ6IDAsIG1hc2s6IFsweEZGLCAweEUwXX0pKSB7XG5cdFx0XHRpZiAodGhpcy5jaGVjayhbMHgxMF0sIHtvZmZzZXQ6IDEsIG1hc2s6IFsweDE2XX0pKSB7XG5cdFx0XHRcdC8vIENoZWNrIGZvciAoQURUUykgTVBFRy0yXG5cdFx0XHRcdGlmICh0aGlzLmNoZWNrKFsweDA4XSwge29mZnNldDogMSwgbWFzazogWzB4MDhdfSkpIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZXh0OiAnYWFjJyxcblx0XHRcdFx0XHRcdG1pbWU6ICdhdWRpby9hYWMnLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBNdXN0IGJlIChBRFRTKSBNUEVHLTRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdhYWMnLFxuXHRcdFx0XHRcdG1pbWU6ICdhdWRpby9hYWMnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNUEVHIDEgb3IgMiBMYXllciAzIGhlYWRlclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIE1QRUcgbGF5ZXIgM1xuXHRcdFx0aWYgKHRoaXMuY2hlY2soWzB4MDJdLCB7b2Zmc2V0OiAxLCBtYXNrOiBbMHgwNl19KSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGV4dDogJ21wMycsXG5cdFx0XHRcdFx0bWltZTogJ2F1ZGlvL21wZWcnLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayBmb3IgTVBFRyBsYXllciAyXG5cdFx0XHRpZiAodGhpcy5jaGVjayhbMHgwNF0sIHtvZmZzZXQ6IDEsIG1hc2s6IFsweDA2XX0pKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXh0OiAnbXAyJyxcblx0XHRcdFx0XHRtaW1lOiAnYXVkaW8vbXBlZycsXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIGZvciBNUEVHIGxheWVyIDFcblx0XHRcdGlmICh0aGlzLmNoZWNrKFsweDA2XSwge29mZnNldDogMSwgbWFzazogWzB4MDZdfSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdtcDEnLFxuXHRcdFx0XHRcdG1pbWU6ICdhdWRpby9tcGVnJyxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyByZWFkVGlmZlRhZyhiaWdFbmRpYW4pIHtcblx0XHRjb25zdCB0YWdJZCA9IGF3YWl0IHRoaXMudG9rZW5pemVyLnJlYWRUb2tlbihiaWdFbmRpYW4gPyBUb2tlbi5VSU5UMTZfQkUgOiBUb2tlbi5VSU5UMTZfTEUpO1xuXHRcdHRoaXMudG9rZW5pemVyLmlnbm9yZSgxMCk7XG5cdFx0c3dpdGNoICh0YWdJZCkge1xuXHRcdFx0Y2FzZSA1MF8zNDE6XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXh0OiAnYXJ3Jyxcblx0XHRcdFx0XHRtaW1lOiAnaW1hZ2UveC1zb255LWFydycsXG5cdFx0XHRcdH07XG5cdFx0XHRjYXNlIDUwXzcwNjpcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRleHQ6ICdkbmcnLFxuXHRcdFx0XHRcdG1pbWU6ICdpbWFnZS94LWFkb2JlLWRuZycsXG5cdFx0XHRcdH07XG5cdFx0XHRkZWZhdWx0OlxuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHJlYWRUaWZmSUZEKGJpZ0VuZGlhbikge1xuXHRcdGNvbnN0IG51bWJlck9mVGFncyA9IGF3YWl0IHRoaXMudG9rZW5pemVyLnJlYWRUb2tlbihiaWdFbmRpYW4gPyBUb2tlbi5VSU5UMTZfQkUgOiBUb2tlbi5VSU5UMTZfTEUpO1xuXHRcdGZvciAobGV0IG4gPSAwOyBuIDwgbnVtYmVyT2ZUYWdzOyArK24pIHtcblx0XHRcdGNvbnN0IGZpbGVUeXBlID0gYXdhaXQgdGhpcy5yZWFkVGlmZlRhZyhiaWdFbmRpYW4pO1xuXHRcdFx0aWYgKGZpbGVUeXBlKSB7XG5cdFx0XHRcdHJldHVybiBmaWxlVHlwZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyByZWFkVGlmZkhlYWRlcihiaWdFbmRpYW4pIHtcblx0XHRjb25zdCB2ZXJzaW9uID0gKGJpZ0VuZGlhbiA/IFRva2VuLlVJTlQxNl9CRSA6IFRva2VuLlVJTlQxNl9MRSkuZ2V0KHRoaXMuYnVmZmVyLCAyKTtcblx0XHRjb25zdCBpZmRPZmZzZXQgPSAoYmlnRW5kaWFuID8gVG9rZW4uVUlOVDMyX0JFIDogVG9rZW4uVUlOVDMyX0xFKS5nZXQodGhpcy5idWZmZXIsIDQpO1xuXG5cdFx0aWYgKHZlcnNpb24gPT09IDQyKSB7XG5cdFx0XHQvLyBUSUZGIGZpbGUgaGVhZGVyXG5cdFx0XHRpZiAoaWZkT2Zmc2V0ID49IDYpIHtcblx0XHRcdFx0aWYgKHRoaXMuY2hlY2tTdHJpbmcoJ0NSJywge29mZnNldDogOH0pKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGV4dDogJ2NyMicsXG5cdFx0XHRcdFx0XHRtaW1lOiAnaW1hZ2UveC1jYW5vbi1jcjInLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWZkT2Zmc2V0ID49IDggJiYgKHRoaXMuY2hlY2soWzB4MUMsIDB4MDAsIDB4RkUsIDB4MDBdLCB7b2Zmc2V0OiA4fSkgfHwgdGhpcy5jaGVjayhbMHgxRiwgMHgwMCwgMHgwQiwgMHgwMF0sIHtvZmZzZXQ6IDh9KSkpIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZXh0OiAnbmVmJyxcblx0XHRcdFx0XHRcdG1pbWU6ICdpbWFnZS94LW5pa29uLW5lZicsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRhd2FpdCB0aGlzLnRva2VuaXplci5pZ25vcmUoaWZkT2Zmc2V0KTtcblx0XHRcdGNvbnN0IGZpbGVUeXBlID0gYXdhaXQgdGhpcy5yZWFkVGlmZklGRChiaWdFbmRpYW4pO1xuXHRcdFx0cmV0dXJuIGZpbGVUeXBlID8/IHtcblx0XHRcdFx0ZXh0OiAndGlmJyxcblx0XHRcdFx0bWltZTogJ2ltYWdlL3RpZmYnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodmVyc2lvbiA9PT0gNDMpIHtcdC8vIEJpZyBUSUZGIGZpbGUgaGVhZGVyXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRleHQ6ICd0aWYnLFxuXHRcdFx0XHRtaW1lOiAnaW1hZ2UvdGlmZicsXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsZVR5cGVTdHJlYW0ocmVhZGFibGVTdHJlYW0sIG9wdGlvbnMgPSB7fSkge1xuXHRyZXR1cm4gbmV3IEZpbGVUeXBlUGFyc2VyKCkudG9EZXRlY3Rpb25TdHJlYW0ocmVhZGFibGVTdHJlYW0sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRXh0ZW5zaW9ucyA9IG5ldyBTZXQoZXh0ZW5zaW9ucyk7XG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkTWltZVR5cGVzID0gbmV3IFNldChtaW1lVHlwZXMpO1xuIiwiaW1wb3J0IHtmaWxlVHlwZUZyb21CdWZmZXJ9IGZyb20gJ2ZpbGUtdHlwZSc7XG5cbmNvbnN0IGltYWdlRXh0ZW5zaW9ucyA9IG5ldyBTZXQoW1xuXHQnanBnJyxcblx0J3BuZycsXG5cdCdnaWYnLFxuXHQnd2VicCcsXG5cdCdmbGlmJyxcblx0J2NyMicsXG5cdCd0aWYnLFxuXHQnYm1wJyxcblx0J2p4cicsXG5cdCdwc2QnLFxuXHQnaWNvJyxcblx0J2JwZycsXG5cdCdqcDInLFxuXHQnanBtJyxcblx0J2pweCcsXG5cdCdoZWljJyxcblx0J2N1cicsXG5cdCdkY20nLFxuXHQnYXZpZicsXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaW1hZ2VUeXBlKGlucHV0KSB7XG5cdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZpbGVUeXBlRnJvbUJ1ZmZlcihpbnB1dCk7XG5cdHJldHVybiBpbWFnZUV4dGVuc2lvbnMuaGFzKHJlc3VsdD8uZXh0KSAmJiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBtaW5pbXVtQnl0ZXMgPSA0MTAwO1xuIiwiaW1wb3J0IHsgZXh0bmFtZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSBcInN0cmVhbVwiO1xyXG5pbXBvcnQgdHlwZSB7IEFwcCwgVEZpbGUgfSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdHJpbmdLZXlNYXA8VD4ge1xyXG4gIFtrZXk6IHN0cmluZ106IFQ7XHJcbn1cclxuXHJcbmNvbnN0IElNQUdFX0VYVF9MSVNUID0gW1xyXG4gIFwiLnBuZ1wiLFxyXG4gIFwiLmpwZ1wiLFxyXG4gIFwiLmpwZWdcIixcclxuICBcIi5ibXBcIixcclxuICBcIi5naWZcIixcclxuICBcIi5zdmdcIixcclxuICBcIi50aWZmXCIsXHJcbiAgXCIud2VicFwiLFxyXG4gIFwiLmF2aWZcIixcclxuXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FuSW1hZ2UoZXh0OiBzdHJpbmcpIHtcclxuICByZXR1cm4gSU1BR0VfRVhUX0xJU1QuaW5jbHVkZXMoZXh0LnRvTG93ZXJDYXNlKCkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0Fzc2V0VHlwZUFuSW1hZ2UocGF0aDogc3RyaW5nKTogQm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlzQW5JbWFnZShleHRuYW1lKHBhdGgpKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN0cmVhbVRvU3RyaW5nKHN0cmVhbTogUmVhZGFibGUpIHtcclxuICBjb25zdCBjaHVua3MgPSBbXTtcclxuXHJcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBzdHJlYW0pIHtcclxuICAgIGNodW5rcy5wdXNoKEJ1ZmZlci5mcm9tKGNodW5rKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQnVmZmVyLmNvbmNhdChjaHVua3MpLnRvU3RyaW5nKFwidXRmLThcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmxBc3NldCh1cmw6IHN0cmluZykge1xyXG4gIHJldHVybiAodXJsID0gdXJsLnN1YnN0cmluZygxICsgdXJsLmxhc3RJbmRleE9mKFwiL1wiKSkuc3BsaXQoXCI/XCIpWzBdKS5zcGxpdChcclxuICAgIFwiI1wiXHJcbiAgKVswXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExhc3RJbWFnZShsaXN0OiBzdHJpbmdbXSkge1xyXG4gIGNvbnN0IHJldmVyc2VkTGlzdCA9IGxpc3QucmV2ZXJzZSgpO1xyXG4gIGxldCBsYXN0SW1hZ2U7XHJcbiAgcmV2ZXJzZWRMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpZiAoaXRlbSAmJiBpdGVtLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XHJcbiAgICAgIGxhc3RJbWFnZSA9IGl0ZW07XHJcbiAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBsYXN0SW1hZ2U7XHJcbn1cclxuXHJcbmludGVyZmFjZSBBbnlPYmoge1xyXG4gIFtrZXk6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Q8VCBleHRlbmRzIEFueU9iaj4oXHJcbiAgYXJyOiBUW10sXHJcbiAga2V5OiBzdHJpbmdcclxuKTogeyBba2V5OiBzdHJpbmddOiBUIH0ge1xyXG4gIGNvbnN0IG9iajogeyBba2V5OiBzdHJpbmddOiBUIH0gPSB7fTtcclxuICBhcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgIG9ialtlbGVtZW50W2tleV1dID0gZWxlbWVudDtcclxuICB9KTtcclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUltYWdlRmlsZShhcHA6IEFwcCwgcmF3TGluazogc3RyaW5nKTogVEZpbGUgfCBudWxsIHtcclxuICBpZiAoIXJhd0xpbmspIHJldHVybiBudWxsO1xyXG5cclxuICBsZXQgcGF0aCA9IHJhd0xpbmsudHJpbSgpO1xyXG5cclxuICBjb25zdCBtZE1hdGNoID0gcGF0aC5tYXRjaCgvIVxcWy4qP1xcXVxcKCguKj8pXFwpLyk7XHJcbiAgaWYgKG1kTWF0Y2gpIHBhdGggPSBtZE1hdGNoWzFdO1xyXG5cclxuICBjb25zdCB3aWtpTWF0Y2ggPSBwYXRoLm1hdGNoKC9eIT9cXFtcXFsoLio/KVxcXVxcXSQvKTtcclxuICBpZiAod2lraU1hdGNoKSBwYXRoID0gd2lraU1hdGNoWzFdO1xyXG5cclxuICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eIS8sICcnKS50cmltKCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBpZiAoLyVbMC05QS1GYS1mXXsyfS8udGVzdChwYXRoKSkgcGF0aCA9IGRlY29kZVVSSUNvbXBvbmVudChwYXRoKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ1tyZXNvbHZlSW1hZ2VGaWxlXSBkZWNvZGVVUklDb21wb25lbnQgZmFpbGVkOicsIGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWN0aXZlUGF0aCA9IGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpPy5wYXRoIHx8ICcnO1xyXG4gIGNvbnN0IGZpbGUgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChwYXRoLCBhY3RpdmVQYXRoKTtcclxuXHJcbiAgcmV0dXJuIGZpbGU7XHJcbn0iLCJpbXBvcnQgeyBBcHAsIFRGaWxlLCBub3JtYWxpemVQYXRoIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7IFBsdWdpblNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ1wiO1xyXG5cclxudHlwZSBVcGxvYWRSZXN1bHQgPSB7XHJcbiAgc3VjY2VzczogYm9vbGVhbjtcclxuICB1cmw/OiBzdHJpbmc7XHJcbiAgcmVzdWx0Pzogc3RyaW5nW107XHJcbiAgbXNnPzogc3RyaW5nIHwgbnVsbDtcclxufTtcclxuXHJcbmludGVyZmFjZSBMc2t5QXBpUmVzcG9uc2Uge1xyXG4gIHN0YXR1czogYm9vbGVhbiB8IHN0cmluZyB8IG51bWJlcjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIGRhdGE/OiB7XHJcbiAgICBwdWJsaWNfdXJsPzogc3RyaW5nOyAgICAgICAgLy8gdjJcclxuICAgIGxpbmtzPzogeyB1cmw/OiBzdHJpbmcgfTsgICAvLyB2MVxyXG4gIH07XHJcbn1cclxuXHJcbmludGVyZmFjZSBQYXJzZWRSZXN1bHQge1xyXG4gIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIHVybDogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VVcGxvYWRSZXN1bHQocmVzcG9uc2U6IExza3lBcGlSZXNwb25zZSk6IFBhcnNlZFJlc3VsdCB7XHJcbiAgaWYgKCFyZXNwb25zZSkge1xyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwi5ZON5bqU5Li656m6XCIsIHVybDogbnVsbCB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBzdGF0dXMsIG1lc3NhZ2UsIGRhdGEgfSA9IHJlc3BvbnNlO1xyXG5cclxuICBjb25zdCBzdWNjZXNzID1cclxuICAgIHN0YXR1cyA9PT0gdHJ1ZSB8fFxyXG4gICAgc3RhdHVzID09PSBcInN1Y2Nlc3NcIiB8fFxyXG4gICAgc3RhdHVzID09PSAyMDA7XHJcblxyXG4gIGNvbnN0IHVybCA9IGRhdGE/LnB1YmxpY191cmwgfHwgZGF0YT8ubGlua3M/LnVybCB8fCBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3VjY2VzcyxcclxuICAgIG1lc3NhZ2U6IG1lc3NhZ2UgfHwgKHN1Y2Nlc3MgPyBcIuS4iuS8oOaIkOWKn1wiIDogXCLkuIrkvKDlpLHotKVcIiksXHJcbiAgICB1cmwsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExza3lQcm9VcGxvYWRlciB7XHJcbiAgcHJpdmF0ZSBzZXR0aW5nczogUGx1Z2luU2V0dGluZ3M7XHJcbiAgcHJpdmF0ZSBsc2t5VXJsOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBsc2t5VG9rZW46IHN0cmluZztcclxuICBwcml2YXRlIGFwcDogQXBwO1xyXG4gIHByaXZhdGUgdmVyc2lvbjogXCJ2MVwiIHwgXCJ2MlwiO1xyXG5cclxuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogUGx1Z2luU2V0dGluZ3MsIGFwcDogQXBwLCB2ZXJzaW9uOiBcInYxXCIgfCBcInYyXCIgPSBcInYyXCIpIHtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcclxuICAgIFxyXG4gICAgLy8g5Yid5aeL5YyW6YWN572uXHJcbiAgICB0aGlzLmluaXRpYWxpemVDb25maWcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWIneWni+WMluaIluabtOaWsOmFjee9rlxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUNvbmZpZygpIHtcclxuICAgIGNvbnN0IGFwaVBhdGggPSB0aGlzLnZlcnNpb24gPT09IFwidjFcIiA/IFwiYXBpL3YxL3VwbG9hZFwiIDogXCJhcGkvdjIvdXBsb2FkXCI7XHJcbiAgICB0aGlzLmxza3lVcmwgPSB0aGlzLnNldHRpbmdzLnVwbG9hZFNlcnZlci5lbmRzV2l0aChcIi9cIilcclxuICAgICAgPyB0aGlzLnNldHRpbmdzLnVwbG9hZFNlcnZlciArIGFwaVBhdGhcclxuICAgICAgOiB0aGlzLnNldHRpbmdzLnVwbG9hZFNlcnZlciArIFwiL1wiICsgYXBpUGF0aDtcclxuXHJcbiAgICB0aGlzLmxza3lUb2tlbiA9IFwiQmVhcmVyIFwiICsgdGhpcy5zZXR0aW5ncy50b2tlbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOabtOaWsOmFjee9ruW5tumHjeaWsOWIneWni+WMllxyXG4gICAqIEBwYXJhbSBzZXR0aW5ncyDmlrDnmoTorr7nva7lr7nosaFcclxuICAgKi9cclxuICB1cGRhdGVTZXR0aW5ncyhzZXR0aW5nczogUGx1Z2luU2V0dGluZ3MpIHtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUNvbmZpZygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXF1ZXN0T3B0aW9ucyhmaWxlOiBGaWxlKTogUmVxdWVzdEluaXQge1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5sc2t5VG9rZW4pO1xyXG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUpO1xyXG5cclxuICAgIGlmICh0aGlzLnZlcnNpb24gPT09IFwidjFcIiAmJiB0aGlzLnNldHRpbmdzLnN0cmF0ZWd5X2lkKSB7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChcInN0cmF0ZWd5X2lkXCIsIHRoaXMuc2V0dGluZ3Muc3RyYXRlZ3lfaWQpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnZlcnNpb24gPT09IFwidjJcIiAmJiB0aGlzLnNldHRpbmdzLnN0b3JhZ2VfaWQpIHtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKFwic3RvcmFnZV9pZFwiLCB0aGlzLnNldHRpbmdzLnN0b3JhZ2VfaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IGZvcm1EYXRhLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOe7n+S4gOS4iuS8oOaOpeWPo++8jOi/lOWbnuWwgeijheWQjueahOe7k+aehOS9k1xyXG4gICAqL1xyXG5wcml2YXRlIGFzeW5jIHVwbG9hZFJhd0ZpbGUoZmlsZTogRmlsZSk6IFByb21pc2U8VXBsb2FkUmVzdWx0PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gdGhpcy5nZXRSZXF1ZXN0T3B0aW9ucyhmaWxlKTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHRoaXMubHNreVVybCwgcmVxdWVzdE9wdGlvbnMpO1xyXG5cclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtc2c6IGBIVFRQ6ZSZ6K+vOiAke3Jlcy5zdGF0dXN9YCB9O1xyXG4gICAgfVxyXG4gICAgbGV0IGpzb246IExza3lBcGlSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGpzb24gPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtc2c6IFwi5ZON5bqU6Kej5p6Q5aSx6LSl77yI6Z2eSlNPTu+8iVwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VVcGxvYWRSZXN1bHQoanNvbik7XHJcblxyXG4gICAgaWYgKHBhcnNlZC5zdWNjZXNzICYmIHBhcnNlZC51cmwpIHtcclxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdXJsOiBwYXJzZWQudXJsIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDkuI3ovpPlh7rorablkYrvvIzlj6rov5Tlm57lpLHotKXkv6Hmga9cclxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1zZzogcGFyc2VkLm1lc3NhZ2UgfTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAvLyDkuI3miZPljbDplJnor6/ml6Xlv5fvvIzorqnkuIrlsYLnu5/kuIDlpITnkIZcclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtc2c6IGVycm9yPy5tZXNzYWdlIHx8IFwi5LiK5Lyg6K+35rGC5byC5bi4XCIgfTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOWwhuacrOWcsCBWYXVsdCDmlofku7bot6/lvoTovazkuLogRmlsZSDlr7nosaFcclxuICAgKi9cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZUZpbGVPYmplY3RGcm9tUGF0aChmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxGaWxlPiB7XHJcbiAgICBjb25zdCBhYnN0cmFjdEZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgobm9ybWFsaXplUGF0aChmaWxlUGF0aCkpO1xyXG4gICAgaWYgKCEoYWJzdHJhY3RGaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB0aHJvdyBuZXcgRXJyb3IoXCLmlofku7bot6/lvoTml6DmlYhcIik7XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWRCaW5hcnkoYWJzdHJhY3RGaWxlKTtcclxuICAgIGNvbnN0IGZpbGVFeHQgPSBhYnN0cmFjdEZpbGUuZXh0ZW5zaW9uIHx8IFwicG5nXCI7XHJcbiAgICBjb25zdCBmaWxlID0gbmV3IEZpbGUoW25ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiBgaW1hZ2UvJHtmaWxlRXh0fWAgfSldLCBhYnN0cmFjdEZpbGUubmFtZSk7XHJcbiAgICByZXR1cm4gZmlsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS4iuS8oOWNleS4quaWh+S7tu+8iOaUr+aMgSBGaWxlIOaIlui3r+W+hCBzdHJpbmfvvIlcclxuICAgKi9cclxuICBhc3luYyB1cGxvYWRTaW5nbGVGaWxlKGZpbGVPclBhdGg6IEZpbGUgfCBzdHJpbmcpOiBQcm9taXNlPFVwbG9hZFJlc3VsdD4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZmlsZSA9IHR5cGVvZiBmaWxlT3JQYXRoID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgPyBhd2FpdCB0aGlzLmNyZWF0ZUZpbGVPYmplY3RGcm9tUGF0aChmaWxlT3JQYXRoKVxyXG4gICAgICAgIDogZmlsZU9yUGF0aDtcclxuXHJcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnVwbG9hZFJhd0ZpbGUoZmlsZSk7XHJcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbXNnOiBlcnI/Lm1lc3NhZ2UgfHwgXCLkuIrkvKDplJnor69cIiB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5om56YeP5LiK5Lyg5paH5Lu277yI5pSv5oyB6Lev5b6E5pWw57uE5oiWIEZpbGUg5pWw57uE77yJXHJcbiAgICovXHJcbiAgYXN5bmMgdXBsb2FkRmlsZXMoaW5wdXRzOiBBcnJheTxGaWxlIHwgc3RyaW5nPik6IFByb21pc2U8VXBsb2FkUmVzdWx0PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICAgIGlucHV0cy5tYXAoYXN5bmMgKGlucHV0KSA9PlxyXG4gICAgICAgICAgdHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiID8gYXdhaXQgdGhpcy5jcmVhdGVGaWxlT2JqZWN0RnJvbVBhdGgoaW5wdXQpIDogaW5wdXRcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKChmaWxlKSA9PiB0aGlzLnVwbG9hZFJhd0ZpbGUoZmlsZSkpKTtcclxuXHJcbiAgICAgIGNvbnN0IGZhaWxlZCA9IHJlc3VsdHMuZmluZCgocmVzKSA9PiAhcmVzLnN1Y2Nlc3MpO1xyXG4gICAgICBpZiAoZmFpbGVkKSB0aHJvdyBuZXcgRXJyb3IoZmFpbGVkLm1zZyB8fCBcIumDqOWIhuaWh+S7tuS4iuS8oOWksei0pVwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHVybHMgPSByZXN1bHRzLm1hcCgocmVzKSA9PiByZXMudXJsIHx8IFwiXCIpLmZpbHRlcihCb29sZWFuKTtcclxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgcmVzdWx0OiB1cmxzIH07XHJcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbXNnOiBlcnI/Lm1lc3NhZ2UgfHwgXCLmibnph4/kuIrkvKDlpLHotKVcIiB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5LiK5Lyg5Ymq6LS05p2/5Lit55qE5Zu+54mHXHJcbiAgICovXHJcbiAgYXN5bmMgdXBsb2FkRnJvbUNsaXBib2FyZChldnQ6IENsaXBib2FyZEV2ZW50KTogUHJvbWlzZTxVcGxvYWRSZXN1bHQ+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGZpbGUgPSBldnQuY2xpcGJvYXJkRGF0YT8uZmlsZXM/LlswXTtcclxuICAgICAgaWYgKCFmaWxlKSB0aHJvdyBuZXcgRXJyb3IoXCLliarotLTmnb/kuK3ml6Dlm77niYfmlofku7ZcIik7XHJcblxyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy51cGxvYWRTaW5nbGVGaWxlKGZpbGUpO1xyXG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyPy5tZXNzYWdlIHx8IFwi5LiK5Lyg5Ymq6LS05p2/5Zu+54mH5aSx6LSlXCIgfTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWFya2Rvd25WaWV3LCBBcHAgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwicGF0aFwiO1xyXG5cclxuaW50ZXJmYWNlIEltYWdlIHtcclxuICBwYXRoOiBzdHJpbmc7XHJcbiAgb2JzcGF0aDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBzb3VyY2U6IHN0cmluZztcclxufVxyXG4vLyAhW10oLi9kc2EvYWEucG5nKSBsb2NhbCBpbWFnZSBzaG91bGQgaGFzIGV4dFxyXG4vLyAhW10oaHR0cHM6Ly9kYXNkYXNkYSkgaW50ZXJuZXQgaW1hZ2Ugc2hvdWxkIG5vdCBoYXMgZXh0XHJcbi8vY29uc3QgUkVHRVhfRklMRSA9IC9cXCFcXFsoLio/KVxcXVxcKChcXFMrXFwuXFx3KylcXCl8XFwhXFxbKC4qPylcXF1cXCgoaHR0cHM/OlxcL1xcLy4qPylcXCkvZztcclxuY29uc3QgUkVHRVhfRklMRSA9IC8hXFxbKC4qPylcXF1cXCgoLio/KVxcKS9nO1xyXG5jb25zdCBSRUdFWF9XSUtJX0ZJTEUgPSAvXFwhXFxbXFxbKC4qPykoXFxzXFx8Lio/KT9cXF1cXF0vZztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVscGVyIHtcclxuICBhcHA6IEFwcDtcclxuXHJcbiAgY29uc3RydWN0b3IoYXBwOiBBcHApIHtcclxuICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gIH1cclxuICBnZXRGcm9udG1hdHRlclZhbHVlKGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSA9IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XHJcbiAgICBpZiAoIWZpbGUpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhdGggPSBmaWxlLnBhdGg7XHJcbiAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Q2FjaGUocGF0aCk7XHJcblxyXG4gICAgbGV0IHZhbHVlID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgaWYgKGNhY2hlPy5mcm9udG1hdHRlciAmJiBjYWNoZS5mcm9udG1hdHRlci5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgIHZhbHVlID0gY2FjaGUuZnJvbnRtYXR0ZXJba2V5XTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldEVkaXRvcigpIHtcclxuICAgIGNvbnN0IG1kVmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XHJcbiAgICBpZiAobWRWaWV3KSB7XHJcbiAgICAgIHJldHVybiBtZFZpZXcuZWRpdG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFZhbHVlKCkge1xyXG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5nZXRFZGl0b3IoKTtcclxuICAgIHJldHVybiBlZGl0b3IuZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIHNldFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuZ2V0RWRpdG9yKCk7XHJcbiAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gZWRpdG9yLmdldFNjcm9sbEluZm8oKTtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cclxuICAgIGVkaXRvci5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICBlZGl0b3Iuc2Nyb2xsVG8obGVmdCwgdG9wKTtcclxuICAgIGVkaXRvci5zZXRDdXJzb3IocG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0IGFsbCBmaWxlIHVybHMsIGluY2x1ZGUgbG9jYWwgYW5kIGludGVybmV0XHJcbiAgZ2V0QWxsRmlsZXMoKTogSW1hZ2VbXSB7XHJcbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmdldEVkaXRvcigpO1xyXG4gICAgbGV0IHZhbHVlID0gZWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRJbWFnZUxpbmsodmFsdWUpO1xyXG4gIH1cclxuICBnZXRJbWFnZUxpbmsodmFsdWU6IHN0cmluZyk6IEltYWdlW10ge1xyXG4gICAgY29uc3QgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoQWxsKFJFR0VYX0ZJTEUpO1xyXG4gICAgY29uc3QgV2lraU1hdGNoZXMgPSB2YWx1ZS5tYXRjaEFsbChSRUdFWF9XSUtJX0ZJTEUpO1xyXG5cclxuICAgIGxldCBmaWxlQXJyYXk6IEltYWdlW10gPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIG1hdGNoZXMpIHtcclxuICAgICAgY29uc3Qgc291cmNlID0gbWF0Y2hbMF07XHJcblxyXG4gICAgICBsZXQgbmFtZSA9IG1hdGNoWzFdO1xyXG4gICAgICBsZXQgcGF0aCA9IG1hdGNoWzJdO1xyXG4gICAgICBpZiAoIW5hbWUmJm1hdGNoLmxlbmd0aD4zKSB7XHJcbiAgICAgICAgbmFtZSA9IG1hdGNoWzNdO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcGF0aCYmbWF0Y2gubGVuZ3RoPjQpIHtcclxuICAgICAgICBwYXRoID0gbWF0Y2hbNF07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgbmFtZSA9IHBhdGg/LnN1YnN0cmluZyhwYXRoPy5sYXN0SW5kZXhPZignLycpKzEpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZpbGVBcnJheS5wdXNoKHtcclxuICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgIG9ic3BhdGg6IHBhdGgsXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiBXaWtpTWF0Y2hlcykge1xyXG4gICAgICBjb25zdCBuYW1lID0gcGFyc2UobWF0Y2hbMV0pLm5hbWU7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBtYXRjaFsxXTtcclxuICAgICAgY29uc3Qgc291cmNlID0gbWF0Y2hbMF07XHJcbiAgICAgIGZpbGVBcnJheS5wdXNoKHtcclxuICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgIG9ic3BhdGg6IHBhdGgsXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZUFycmF5O1xyXG4gIH1cclxuXHJcbiAgaGFzQmxhY2tEb21haW4oc3JjOiBzdHJpbmcsIGJsYWNrRG9tYWluczogc3RyaW5nKSB7XHJcbiAgICBpZiAoYmxhY2tEb21haW5zLnRyaW0oKSA9PT0gXCJcIikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCBibGFja0RvbWFpbkxpc3QgPSBibGFja0RvbWFpbnMuc3BsaXQoXCIsXCIpLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IFwiXCIpO1xyXG4gICAgbGV0IHVybCA9IG5ldyBVUkwoc3JjKTtcclxuICAgIGNvbnN0IGRvbWFpbiA9IHVybC5ob3N0bmFtZTtcclxuXHJcbiAgICByZXR1cm4gYmxhY2tEb21haW5MaXN0LnNvbWUoYmxhY2tEb21haW4gPT4gZG9tYWluLmluY2x1ZGVzKGJsYWNrRG9tYWluKSk7XHJcbiAgfVxyXG59XHJcbiIsIi8vINin2YTYudix2KjZitipXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTtcclxuIiwiLy8gxI1lxaF0aW5hXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTtcclxuIiwiLy8gRGFuc2tcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9O1xyXG4iLCIvLyBEZXV0c2NoXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTsiLCIvLyBFbmdsaXNoXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLy8gc2V0dGluZy50c1xyXG4gIFwiUGx1Z2luIFNldHRpbmdzXCI6IFwiUGx1Z2luIFNldHRpbmdzXCIsXHJcbiAgXCJBdXRvIHBhc3RlZCB1cGxvYWRcIjogXCJBdXRvIHBhc3RlZCB1cGxvYWRcIixcclxuICBcIklmIHlvdSBzZXQgdGhpcyB2YWx1ZSB0cnVlLCB3aGVuIHlvdSBwYXN0ZSBpbWFnZSwgaXQgd2lsbCBiZSBhdXRvIHVwbG9hZGVkXCI6XHJcbiAgICBcIklmIHlvdSBzZXQgdGhpcyB2YWx1ZSB0cnVlLCB3aGVuIHlvdSBwYXN0ZSBpbWFnZSwgaXQgd2lsbCBiZSBhdXRvIHVwbG9hZGVkXCIsXHJcbiAgXCJEZWZhdWx0IHVwbG9hZGVyXCI6IFwiRGVmYXVsdCB1cGxvYWRlclwiLFxyXG4gIFwiUGljTGlzdCBkZXNjXCI6IFwiU2VhcmNoIFBpY0xpc3Qgb24gR2l0aHViIHRvIGRvd25sb2FkIGFuZCBpbnN0YWxsXCIsXHJcbiAgXCJEZWxldGUgaW1hZ2UgdXNpbmcgUGljTGlzdFwiOiBcIkRlbGV0ZSBpbWFnZSB1c2luZyBQaWNMaXN0XCIsXHJcbiAgXCJEZWxldGUgc3VjY2Vzc2Z1bGx5XCI6IFwiRGVsZXRlIHN1Y2Nlc3NmdWxseVwiLFxyXG4gIFwiRGVsZXRlIGZhaWxlZFwiOiBcIkRlbGV0ZSBmYWlsZWRcIixcclxuICBcIkltYWdlIHNpemUgc3VmZml4XCI6IFwiSW1hZ2Ugc2l6ZSBzdWZmaXhcIixcclxuICBcIkltYWdlIHNpemUgc3VmZml4IERlc2NyaXB0aW9uXCI6IFwibGlrZSB8MzAwIGZvciByZXNpemUgaW1hZ2UgaW4gb2IuXCIsXHJcbiAgXCJQbGVhc2UgaW5wdXQgaW1hZ2Ugc2l6ZSBzdWZmaXhcIjogXCJQbGVhc2UgaW5wdXQgaW1hZ2Ugc2l6ZSBzdWZmaXhcIixcclxuICBcIkVycm9yLCBjb3VsZCBub3QgZGVsZXRlXCI6IFwiRXJyb3IsIGNvdWxkIG5vdCBkZWxldGVcIixcclxuICBcIldvcmsgb24gbmV0d29ya1wiOiBcIldvcmsgb24gbmV0d29ya1wiLFxyXG4gIFwiV29yayBvbiBuZXR3b3JrIERlc2NyaXB0aW9uXCI6XHJcbiAgICBcIkFsbG93IHVwbG9hZCBuZXR3b3JrIGltYWdlIGJ5ICdVcGxvYWQgYWxsJyBjb21tYW5kLlxcbiBPciB3aGVuIHlvdSBwYXN0ZSwgbWQgc3RhbmRhcmQgaW1hZ2UgbGluayBpbiB5b3VyIGNsaXBib2FyZCB3aWxsIGJlIGF1dG8gdXBsb2FkLlwiLFxyXG4gIGZpeFBhdGg6IFwiZml4UGF0aFwiLFxyXG4gIFwiVXBsb2FkIHdoZW4gY2xpcGJvYXJkIGhhcyBpbWFnZSBhbmQgdGV4dCB0b2dldGhlclwiOlxyXG4gICAgXCJVcGxvYWQgd2hlbiBjbGlwYm9hcmQgaGFzIGltYWdlIGFuZCB0ZXh0IHRvZ2V0aGVyXCIsXHJcbiAgXCJXaGVuIHlvdSBjb3B5LCBzb21lIGFwcGxpY2F0aW9uIGxpa2UgRXhjZWwgd2lsbCBpbWFnZSBhbmQgdGV4dCB0byBjbGlwYm9hcmQsIHlvdSBjYW4gdXBsb2FkIG9yIG5vdC5cIjpcclxuICAgIFwiV2hlbiB5b3UgY29weSwgc29tZSBhcHBsaWNhdGlvbiBsaWtlIEV4Y2VsIHdpbGwgaW1hZ2UgYW5kIHRleHQgdG8gY2xpcGJvYXJkLCB5b3UgY2FuIHVwbG9hZCBvciBub3QuXCIsXHJcbiAgXCJOZXR3b3JrIERvbWFpbiBCbGFjayBMaXN0XCI6IFwiTmV0d29yayBEb21haW4gQmxhY2sgTGlzdFwiLFxyXG4gIFwiTmV0d29yayBEb21haW4gQmxhY2sgTGlzdCBEZXNjcmlwdGlvblwiOlxyXG4gICAgXCJJbWFnZSBpbiB0aGUgZG9tYWluIGxpc3Qgd2lsbCBub3QgYmUgdXBsb2FkLHVzZSBjb21tYSBzZXBhcmF0ZWRcIixcclxuICBcIkRlbGV0ZSBzb3VyY2UgZmlsZSBhZnRlciB5b3UgdXBsb2FkIGZpbGVcIjpcclxuICAgIFwiRGVsZXRlIHNvdXJjZSBmaWxlIGFmdGVyIHlvdSB1cGxvYWQgZmlsZVwiLFxyXG4gIFwiRGVsZXRlIHNvdXJjZSBmaWxlIGluIG9iIGFzc2V0cyBhZnRlciB5b3UgdXBsb2FkIGZpbGUuXCI6XHJcbiAgICBcIkRlbGV0ZSBzb3VyY2UgZmlsZSBpbiBvYiBhc3NldHMgYWZ0ZXIgeW91IHVwbG9hZCBmaWxlLlwiLFxyXG59O1xyXG4iLCIvLyBCcml0aXNoIEVuZ2xpc2hcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9O1xyXG4iLCIvLyBFc3Bhw7FvbFxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307XHJcbiIsIi8vIGZyYW7Dp2Fpc1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge307XHJcbiIsIi8vIOCkueCkv+CkqOCljeCkpuClgFxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307XHJcbiIsIi8vIEJhaGFzYSBJbmRvbmVzaWFcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9O1xyXG4iLCIvLyBJdGFsaWFub1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge307XHJcbiIsIi8vIOaXpeacrOiqnlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307IiwiLy8g7ZWc6rWt7Ja0XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTtcclxuIiwiLy8gTmVkZXJsYW5kc1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge307XHJcbiIsIi8vIE5vcnNrXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTtcclxuIiwiLy8gasSZenlrIHBvbHNraVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307XHJcbiIsIi8vIFBvcnR1Z3XDqnNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9O1xyXG4iLCIvLyBQb3J0dWd1w6pzIGRvIEJyYXNpbFxyXG4vLyBCcmF6aWxpYW4gUG9ydHVndWVzZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307IiwiLy8gUm9tw6JuxINcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHt9O1xyXG4iLCIvLyDRgNGD0YHRgdC60LjQuVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge307XHJcbiIsIi8vIFTDvHJrw6dlXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTtcclxuIiwiLy8g566A5L2T5Lit5paHXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLy8gc2V0dGluZy50c1xyXG4gIFwiUGx1Z2luIFNldHRpbmdzXCI6IFwi5o+S5Lu26K6+572uXCIsXHJcbiAgXCJBdXRvIHBhc3RlZCB1cGxvYWRcIjogXCLliarliIfmnb/oh6rliqjkuIrkvKBcIixcclxuICBcIklmIHlvdSBzZXQgdGhpcyB2YWx1ZSB0cnVlLCB3aGVuIHlvdSBwYXN0ZSBpbWFnZSwgaXQgd2lsbCBiZSBhdXRvIHVwbG9hZGVkXCI6XHJcbiAgICBcIuWQr+eUqOivpemAiemhueWQju+8jOm7j+i0tOWbvueJh+aXtuS8muiHquWKqOS4iuS8oFwiLFxyXG4gIFwiRGVmYXVsdCB1cGxvYWRlclwiOiBcIum7mOiupOS4iuS8oOWZqFwiLFxyXG4gIFwiRGVsZXRlIGltYWdlIHVzaW5nIFBpY0xpc3RcIjogXCLkvb/nlKggUGljTGlzdCDliKDpmaTlm77niYdcIixcclxuICBcIkRlbGV0ZSBzdWNjZXNzZnVsbHlcIjogXCLliKDpmaTmiJDlip9cIixcclxuICBcIkRlbGV0ZSBmYWlsZWRcIjogXCLliKDpmaTlpLHotKVcIixcclxuICBcIkVycm9yLCBjb3VsZCBub3QgZGVsZXRlXCI6IFwi6ZSZ6K+v77yM5peg5rOV5Yig6ZmkXCIsXHJcbiAgXCJJbWFnZSBzaXplIHN1ZmZpeFwiOiBcIuWbvueJh+Wkp+Wwj+WQjue8gFwiLFxyXG4gIFwiSW1hZ2Ugc2l6ZSBzdWZmaXggRGVzY3JpcHRpb25cIjogXCLmr5TlpoLvvJp8MzAwIOeUqOS6juiwg+aVtOWbvueJh+Wkp+Wwj1wiLFxyXG4gIFwiUGxlYXNlIGlucHV0IGltYWdlIHNpemUgc3VmZml4XCI6IFwi6K+36L6T5YWl5Zu+54mH5aSn5bCP5ZCO57yAXCIsXHJcbiAgXCJXb3JrIG9uIG5ldHdvcmtcIjogXCLlupTnlKjnvZHnu5zlm77niYdcIixcclxuICBcIldvcmsgb24gbmV0d29yayBEZXNjcmlwdGlvblwiOlxyXG4gICAgXCLlvZPkvaDkuIrkvKDmiYDmnInlm77niYfml7bvvIzkuZ/kvJrkuIrkvKDnvZHnu5zlm77niYfjgILku6Xlj4rlvZPkvaDov5vooYzpu4/otLTml7bvvIzliarliIfmnb/kuK3nmoTmoIflh4YgbWQg5Zu+54mH5Lya6KKr5LiK5LygXCIsXHJcbiAgZml4UGF0aDogXCLkv67mraNQQVRI5Y+Y6YePXCIsXHJcbiAgXCJVcGxvYWQgd2hlbiBjbGlwYm9hcmQgaGFzIGltYWdlIGFuZCB0ZXh0IHRvZ2V0aGVyXCI6XHJcbiAgICBcIuW9k+WJquWIh+adv+WQjOaXtuaLpeacieaWh+acrOWSjOWbvueJh+WJquWIh+adv+aVsOaNruaXtuaYr+WQpuS4iuS8oOWbvueJh1wiLFxyXG4gIFwiV2hlbiB5b3UgY29weSwgc29tZSBhcHBsaWNhdGlvbiBsaWtlIEV4Y2VsIHdpbGwgaW1hZ2UgYW5kIHRleHQgdG8gY2xpcGJvYXJkLCB5b3UgY2FuIHVwbG9hZCBvciBub3QuXCI6XHJcbiAgICBcIuW9k+S9oOWkjeWItuaXtu+8jOafkOS6m+W6lOeUqOS+i+WmgiBFeGNlbCDkvJrlnKjliarliIfmnb/lkIzml7bmlofmnKzlkozlm77lg4/mlbDmja7vvIznoa7orqTmmK/lkKbkuIrkvKDjgIJcIixcclxuICBcIk5ldHdvcmsgRG9tYWluIEJsYWNrIExpc3RcIjogXCLnvZHnu5zlm77niYfln5/lkI3pu5HlkI3ljZVcIixcclxuICBcIk5ldHdvcmsgRG9tYWluIEJsYWNrIExpc3QgRGVzY3JpcHRpb25cIjpcclxuICAgIFwi6buR5ZCN5Y2V5Z+f5ZCN5Lit55qE5Zu+54mH5bCG5LiN5Lya6KKr5LiK5Lyg77yM55So6Iux5paH6YCX5Y+35YiG5YmyXCIsXHJcbiAgXCJEZWxldGUgc291cmNlIGZpbGUgYWZ0ZXIgeW91IHVwbG9hZCBmaWxlXCI6IFwi5LiK5Lyg5paH5Lu25ZCO56e76Zmk5rqQ5paH5Lu2XCIsXHJcbiAgXCJEZWxldGUgc291cmNlIGZpbGUgaW4gb2IgYXNzZXRzIGFmdGVyIHlvdSB1cGxvYWQgZmlsZS5cIjpcclxuICAgIFwi5LiK5Lyg5paH5Lu25ZCO56e76Zmk5Zyob2LpmYTku7bmlofku7blpLnkuK3nmoTmlofku7ZcIixcclxufTtcclxuIiwiLy8g57mB6auU5Lit5paHXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7fTtcclxuIiwiaW1wb3J0IHsgbW9tZW50IH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5cclxuaW1wb3J0IGFyIGZyb20gJy4vbG9jYWxlL2FyJztcclxuaW1wb3J0IGN6IGZyb20gJy4vbG9jYWxlL2N6JztcclxuaW1wb3J0IGRhIGZyb20gJy4vbG9jYWxlL2RhJztcclxuaW1wb3J0IGRlIGZyb20gJy4vbG9jYWxlL2RlJztcclxuaW1wb3J0IGVuIGZyb20gJy4vbG9jYWxlL2VuJztcclxuaW1wb3J0IGVuR0IgZnJvbSAnLi9sb2NhbGUvZW4tZ2InO1xyXG5pbXBvcnQgZXMgZnJvbSAnLi9sb2NhbGUvZXMnO1xyXG5pbXBvcnQgZnIgZnJvbSAnLi9sb2NhbGUvZnInO1xyXG5pbXBvcnQgaGkgZnJvbSAnLi9sb2NhbGUvaGknO1xyXG5pbXBvcnQgaWQgZnJvbSAnLi9sb2NhbGUvaWQnO1xyXG5pbXBvcnQgaXQgZnJvbSAnLi9sb2NhbGUvaXQnO1xyXG5pbXBvcnQgamEgZnJvbSAnLi9sb2NhbGUvamEnO1xyXG5pbXBvcnQga28gZnJvbSAnLi9sb2NhbGUva28nO1xyXG5pbXBvcnQgbmwgZnJvbSAnLi9sb2NhbGUvbmwnO1xyXG5pbXBvcnQgbm8gZnJvbSAnLi9sb2NhbGUvbm8nO1xyXG5pbXBvcnQgcGwgZnJvbSAnLi9sb2NhbGUvcGwnO1xyXG5pbXBvcnQgcHQgZnJvbSAnLi9sb2NhbGUvcHQnO1xyXG5pbXBvcnQgcHRCUiBmcm9tICcuL2xvY2FsZS9wdC1icic7XHJcbmltcG9ydCBybyBmcm9tICcuL2xvY2FsZS9ybyc7XHJcbmltcG9ydCBydSBmcm9tICcuL2xvY2FsZS9ydSc7XHJcbmltcG9ydCB0ciBmcm9tICcuL2xvY2FsZS90cic7XHJcbmltcG9ydCB6aENOIGZyb20gJy4vbG9jYWxlL3poLWNuJztcclxuaW1wb3J0IHpoVFcgZnJvbSAnLi9sb2NhbGUvemgtdHcnO1xyXG5cclxuY29uc3QgbG9jYWxlTWFwOiB7IFtrOiBzdHJpbmddOiBQYXJ0aWFsPHR5cGVvZiBlbj4gfSA9IHtcclxuICBhcixcclxuICBjczogY3osXHJcbiAgZGEsXHJcbiAgZGUsXHJcbiAgZW4sXHJcbiAgJ2VuLWdiJzogZW5HQixcclxuICBlcyxcclxuICBmcixcclxuICBoaSxcclxuICBpZCxcclxuICBpdCxcclxuICBqYSxcclxuICBrbyxcclxuICBubCxcclxuICBubjogbm8sXHJcbiAgcGwsXHJcbiAgcHQsXHJcbiAgJ3B0LWJyJzogcHRCUixcclxuICBybyxcclxuICBydSxcclxuICB0cixcclxuICAnemgtY24nOiB6aENOLFxyXG4gICd6aC10dyc6IHpoVFcsXHJcbn07XHJcblxyXG5jb25zdCBsb2NhbGUgPSBsb2NhbGVNYXBbbW9tZW50LmxvY2FsZSgpXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0KHN0cjoga2V5b2YgdHlwZW9mIGVuKTogc3RyaW5nIHtcclxuICByZXR1cm4gKGxvY2FsZSAmJiBsb2NhbGVbc3RyXSkgfHwgZW5bc3RyXTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IGltYWdlQXV0b1VwbG9hZFBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XHJcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi9sYW5nL2hlbHBlcnNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGx1Z2luU2V0dGluZ3Mge1xyXG4gIHVwbG9hZEJ5Q2xpcFN3aXRjaDogYm9vbGVhbjtcclxuICB1cGxvYWRTZXJ2ZXI6IHN0cmluZztcclxuICB0b2tlbjogc3RyaW5nO1xyXG4gIHN0b3JhZ2VfaWQ6IHN0cmluZztcclxuICBzdHJhdGVneV9pZDogc3RyaW5nOyAvLyDkuLp2MeeJiOacrOa3u+WKoOeahOWtl+autVxyXG4gIGltYWdlU2l6ZVN1ZmZpeDogc3RyaW5nO1xyXG4gIHVwbG9hZGVyOiBzdHJpbmc7XHJcbiAgd29ya09uTmV0V29yazogYm9vbGVhbjtcclxuICBuZXdXb3JrQmxhY2tEb21haW5zOiBzdHJpbmc7XHJcbiAgZml4UGF0aDogYm9vbGVhbjtcclxuICBhcHBseUltYWdlOiBib29sZWFuO1xyXG4gIGRlbGV0ZVNvdXJjZTogYm9vbGVhbjtcclxuICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFBsdWdpblNldHRpbmdzID0ge1xyXG4gIHVwbG9hZEJ5Q2xpcFN3aXRjaDogdHJ1ZSxcclxuICB1cGxvYWRlcjogXCJMc2t5UHJvLVYyXCIsXHJcbiAgdG9rZW46IFwiXCIsXHJcbiAgc3RvcmFnZV9pZDpcIlwiLFxyXG4gIHN0cmF0ZWd5X2lkOiBcIlwiLCAvLyB2MeeJiOacrOeahOm7mOiupOWtmOWCqElEXHJcbiAgdXBsb2FkU2VydmVyOiBcImh0dHBzOi8vbHNreS54eHh4XCIsXHJcbiAgaW1hZ2VTaXplU3VmZml4OiBcIlwiLFxyXG4gIHdvcmtPbk5ldFdvcms6IGZhbHNlLFxyXG4gIGZpeFBhdGg6IGZhbHNlLFxyXG4gIGFwcGx5SW1hZ2U6IHRydWUsXHJcbiAgbmV3V29ya0JsYWNrRG9tYWluczogXCJcIixcclxuICBkZWxldGVTb3VyY2U6IGZhbHNlLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG4gIHBsdWdpbjogaW1hZ2VBdXRvVXBsb2FkUGx1Z2luO1xyXG5cclxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBpbWFnZUF1dG9VcGxvYWRQbHVnaW4pIHtcclxuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcclxuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheSgpOiB2b2lkIHtcclxuICAgIGxldCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xyXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiB0KFwiUGx1Z2luIFNldHRpbmdzXCIpIH0pO1xyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKHQoXCJBdXRvIHBhc3RlZCB1cGxvYWRcIikpXHJcbiAgICAgIC5zZXREZXNjKFxyXG4gICAgICAgIFwi5ZCv55So6K+l6YCJ6aG55ZCO77yM6buP6LS05Zu+54mH5pe25Lya6Ieq5Yqo5LiK5Lyg5YiwbHNreeWbvuW6ilwiXHJcbiAgICAgIClcclxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT5cclxuICAgICAgICB0b2dnbGVcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51cGxvYWRCeUNsaXBTd2l0Y2gpXHJcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51cGxvYWRCeUNsaXBTd2l0Y2ggPSB2YWx1ZTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICApO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSh0KFwiRGVmYXVsdCB1cGxvYWRlclwiKSlcclxuICAgICAgLnNldERlc2ModChcIkRlZmF1bHQgdXBsb2FkZXJcIikpXHJcbiAgICAgIC5hZGREcm9wZG93bihjYiA9PlxyXG4gICAgICAgICAgY2JcclxuICAgICAgICAgICAgLmFkZE9wdGlvbihcIkxza3lQcm8tVjJcIiwgXCJMc2t5UHJvIHYyXCIpXHJcbiAgICAgICAgICAgIC5hZGRPcHRpb24oXCJMc2t5UHJvLVYxXCIsIFwiTHNreVBybyB2MVwiKVxyXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXBsb2FkZXIpXHJcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyB2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudXBsb2FkZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAvLyDph43mlrDliJ3lp4vljJbkuIrkvKDlmajku6XlupTnlKjmlrDniYjmnKxcclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWluaXRVcGxvYWRlcigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgLy8g5peg6K666YCJ5oup5ZOq5Liq54mI5pys77yM6YO95pi+56S65Z+65pys6K6+572uXHJcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZShcIkxza3lQcm8g5Z+f5ZCNXCIpXHJcbiAgICAgIC5zZXREZXNjKFwiTHNreVBybyDln5/lkI3vvIjkuI3pnIDopoHloavlhpnlrozmlbTnmoRBUEnot6/lvoTvvIlcIilcclxuICAgICAgLmFkZFRleHQodGV4dCA9PlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIuivt+i+k+WFpUxza3lQcm8g5Z+f5ZCNXCIpXHJcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXBsb2FkU2VydmVyKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jIGtleSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVwbG9hZFNlcnZlciA9IGtleTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIC8vIOmHjeaWsOWIneWni+WMluS4iuS8oOWZqOS7peW6lOeUqOaWsOWfn+WQjVxyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWluaXRVcGxvYWRlcigpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKFwiTHNreVBybyBUb2tlblwiKVxyXG4gICAgICAuc2V0RGVzYyhcIkxza3lQcm8gVG9rZW5cIilcclxuICAgICAgLmFkZFRleHQodGV4dCA9PlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIuivt+i+k+WFpUxza3lQcm8gVG9rZW5cIilcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50b2tlbilcclxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyBrZXkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50b2tlbiA9IGtleTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIC8vIOmHjeaWsOWIneWni+WMluS4iuS8oOWZqOS7peW6lOeUqOaWsFRva2VuXHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlaW5pdFVwbG9hZGVyKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgICBcclxuICAgIC8vIOagueaNrueJiOacrOaYvuekuuWvueW6lOeahOWtmOWCqElE6K6+572uXHJcbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MudXBsb2FkZXIgPT09IFwiTHNreVByby1WMlwiKSB7XHJcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZShcIkxza3lQcm8gU3RvcmFnZSBJRFwiKVxyXG4gICAgICAuc2V0RGVzYyhcIkxza3lQcm8gdjLniYjmnKznmoTlrZjlgqhJRFwiKVxyXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwi6K+36L6T5YWlTHNreVBybyBTdG9yYWdlIElEXCIpXHJcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RvcmFnZV9pZClcclxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyBrZXkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdG9yYWdlX2lkID0ga2V5O1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgLy8g6YeN5paw5Yid5aeL5YyW5LiK5Lyg5Zmo5Lul5bqU55So5paw5a2Y5YKoSURcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4ucmVpbml0VXBsb2FkZXIoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLnVwbG9hZGVyID09PSBcIkxza3lQcm8tVjFcIikge1xyXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgLnNldE5hbWUoXCJMc2t5UHJvIFN0cmF0ZWd5IElE77yI5Y+v6YCJ77yJXCIpXHJcbiAgICAgIC5zZXREZXNjKFwiTHNreVBybyB2MeeJiOacrOeahOWCqOWtmOetlueVpUlE77yI5Y+v6YCJ77yJXCIpXHJcbiAgICAgIC5hZGRUZXh0KHRleHQgPT5cclxuICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCLor7fovpPlhaVMc2t5UHJvIFN0cmF0ZWd5IElEXCIpXHJcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RyYXRlZ3lfaWQpXHJcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMga2V5ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RyYXRlZ3lfaWQgPSBrZXk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAvLyDph43mlrDliJ3lp4vljJbkuIrkvKDlmajku6XlupTnlKjmlrDnrZbnlaVJRFxyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWluaXRVcGxvYWRlcigpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKHQoXCJJbWFnZSBzaXplIHN1ZmZpeFwiKSlcclxuICAgICAgLnNldERlc2ModChcIkltYWdlIHNpemUgc3VmZml4IERlc2NyaXB0aW9uXCIpKVxyXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKHQoXCJQbGVhc2UgaW5wdXQgaW1hZ2Ugc2l6ZSBzdWZmaXhcIikpXHJcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaW1hZ2VTaXplU3VmZml4KVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jIGtleSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmltYWdlU2l6ZVN1ZmZpeCA9IGtleTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICApO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSh0KFwiV29yayBvbiBuZXR3b3JrXCIpKVxyXG4gICAgICAuc2V0RGVzYyh0KFwiV29yayBvbiBuZXR3b3JrIERlc2NyaXB0aW9uXCIpKVxyXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PlxyXG4gICAgICAgIHRvZ2dsZVxyXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLndvcmtPbk5ldFdvcmspXHJcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy53b3JrT25OZXRXb3JrID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKHQoXCJOZXR3b3JrIERvbWFpbiBCbGFjayBMaXN0XCIpKVxyXG4gICAgICAuc2V0RGVzYyh0KFwiTmV0d29yayBEb21haW4gQmxhY2sgTGlzdCBEZXNjcmlwdGlvblwiKSlcclxuICAgICAgLmFkZFRleHRBcmVhKHRleHRBcmVhID0+XHJcbiAgICAgICAgdGV4dEFyZWFcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5uZXdXb3JrQmxhY2tEb21haW5zKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jIHZhbHVlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubmV3V29ya0JsYWNrRG9tYWlucyA9IHZhbHVlO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKHQoXCJVcGxvYWQgd2hlbiBjbGlwYm9hcmQgaGFzIGltYWdlIGFuZCB0ZXh0IHRvZ2V0aGVyXCIpKVxyXG4gICAgICAuc2V0RGVzYyhcclxuICAgICAgICB0KFxyXG4gICAgICAgICAgXCJXaGVuIHlvdSBjb3B5LCBzb21lIGFwcGxpY2F0aW9uIGxpa2UgRXhjZWwgd2lsbCBpbWFnZSBhbmQgdGV4dCB0byBjbGlwYm9hcmQsIHlvdSBjYW4gdXBsb2FkIG9yIG5vdC5cIlxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PlxyXG4gICAgICAgIHRvZ2dsZVxyXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFwcGx5SW1hZ2UpXHJcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcHBseUltYWdlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKHQoXCJEZWxldGUgc291cmNlIGZpbGUgYWZ0ZXIgeW91IHVwbG9hZCBmaWxlXCIpKVxyXG4gICAgICAuc2V0RGVzYyh0KFwiRGVsZXRlIHNvdXJjZSBmaWxlIGluIG9iIGFzc2V0cyBhZnRlciB5b3UgdXBsb2FkIGZpbGUuXCIpKVxyXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PlxyXG4gICAgICAgIHRvZ2dsZVxyXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGV0ZVNvdXJjZSlcclxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyB2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGV0ZVNvdXJjZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIE1hcmtkb3duVmlldyxcclxuICBQbHVnaW4sXHJcbiAgRmlsZVN5c3RlbUFkYXB0ZXIsXHJcbiAgRWRpdG9yLFxyXG4gIE1lbnUsXHJcbiAgTm90aWNlLFxyXG4gIGFkZEljb24sXHJcbiAgcmVxdWVzdFVybCxcclxuICBNYXJrZG93bkZpbGVJbmZvLFxyXG59IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuaW1wb3J0IHsgam9pbiwgcGFyc2UsIGJhc2VuYW1lLCBkaXJuYW1lIH0gZnJvbSBcInBhdGhcIjtcclxuXHJcbmltcG9ydCBpbWFnZVR5cGUgZnJvbSBcImltYWdlLXR5cGVcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgaXNBc3NldFR5cGVBbkltYWdlLFxyXG4gIGdldFVybEFzc2V0LFxyXG4gIGFycmF5VG9PYmplY3QsXHJcbiAgcmVzb2x2ZUltYWdlRmlsZVxyXG59IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IExza3lQcm9VcGxvYWRlciB9IGZyb20gXCIuL3VwbG9hZFwiOyAvLyDnu5/kuIDmlK/mjIF2MeWSjHYy54mI5pys55qE5LiK5Lyg5ZmoXHJcbmltcG9ydCBIZWxwZXIgZnJvbSBcIi4vaGVscGVyXCI7XHJcblxyXG5pbXBvcnQgeyBTZXR0aW5nVGFiLCBQbHVnaW5TZXR0aW5ncywgREVGQVVMVF9TRVRUSU5HUyB9IGZyb20gXCIuL3NldHRpbmdcIjtcclxuXHJcbmludGVyZmFjZSBJbWFnZSB7XHJcbiAgcGF0aDogc3RyaW5nO1xyXG4gIG9ic3BhdGg6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgc291cmNlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGltYWdlQXV0b1VwbG9hZFBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XHJcbiAgc2V0dGluZ3M6IFBsdWdpblNldHRpbmdzO1xyXG4gIGhlbHBlcjogSGVscGVyO1xyXG4gIGVkaXRvcjogRWRpdG9yO1xyXG4gIHVwbG9hZGVyOiBMc2t5UHJvVXBsb2FkZXI7IC8vIOe7n+S4gOeahOS4iuS8oOWZqOWunuS+i1xyXG5cclxuICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcclxuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgfVxyXG5cclxuICAvLyDph43mlrDliJ3lp4vljJbkuIrkvKDlmajvvIjlvZPorr7nva7mm7TmlLnml7bosIPnlKjvvIlcclxuICByZWluaXRVcGxvYWRlcigpIHtcclxuICAgIC8vIOWmguaenOS4iuS8oOWZqOW3suWtmOWcqO+8jOebtOaOpeabtOaWsOiuvue9ruiAjOS4jeaYr+WIm+W7uuaWsOWunuS+i1xyXG4gICAgaWYgKHRoaXMudXBsb2FkZXIpIHtcclxuICAgICAgdGhpcy51cGxvYWRlci51cGRhdGVTZXR0aW5ncyh0aGlzLnNldHRpbmdzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIOWmguaenOS4iuS8oOWZqOS4jeWtmOWcqO+8jOWIm+W7uuaWsOWunuS+i1xyXG4gICAgICBjb25zdCB2ZXJzaW9uID0gdGhpcy5zZXR0aW5ncy51cGxvYWRlciA9PT0gXCJMc2t5UHJvLVYxXCIgPyAndjEnIDogJ3YyJztcclxuICAgICAgdGhpcy51cGxvYWRlciA9IG5ldyBMc2t5UHJvVXBsb2FkZXIodGhpcy5zZXR0aW5ncywgdGhpcy5hcHAsIHZlcnNpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb251bmxvYWQoKSB7IH1cclxuXHJcbiAgYXN5bmMgb25sb2FkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuICAgIHRoaXMuaGVscGVyID0gbmV3IEhlbHBlcih0aGlzLmFwcCk7XHJcbiAgICBcclxuICAgIC8vIOagueaNruiuvue9rumAieaLqeS4iuS8oOWZqOeJiOacrFxyXG4gICAgY29uc3QgdmVyc2lvbiA9IHRoaXMuc2V0dGluZ3MudXBsb2FkZXIgPT09IFwiTHNreVByby1WMVwiID8gJ3YxJyA6ICd2Mic7XHJcbiAgICB0aGlzLnVwbG9hZGVyID0gbmV3IExza3lQcm9VcGxvYWRlcih0aGlzLnNldHRpbmdzLCB0aGlzLmFwcCwgdmVyc2lvbik7XHJcbiAgICBcclxuICAgIGlmICghWydMc2t5UHJvLVYyJywgJ0xza3lQcm8tVjEnXS5pbmNsdWRlcyh0aGlzLnNldHRpbmdzLnVwbG9hZGVyKSkge1xyXG4gICAgICBuZXcgTm90aWNlKFwi5pyq55+l55qE5LiK5Lyg5Zmo54mI5pysXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEljb24oXHJcbiAgICAgIFwidXBsb2FkXCIsXHJcbiAgICAgIGA8c3ZnIHQ9XCIxNjM2NjMwNzgzNDI5XCIgY2xhc3M9XCJpY29uXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgdmVyc2lvbj1cIjEuMVwiIHAtaWQ9XCI0NjQ5XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICA8cGF0aCBkPVwiTSA3MS42MzggMzUuMzM2IEwgNzkuNDA4IDM1LjMzNiBDIDgzLjcgMzUuMzM2IDg3LjE3OCAzOC42NjIgODcuMTc4IDQyLjc2NSBMIDg3LjE3OCA4NC44NjQgQyA4Ny4xNzggODguOTY5IDgzLjcgOTIuMjk1IDc5LjQwOCA5Mi4yOTUgTCAxNy4yNDkgOTIuMjk1IEMgMTIuOTU3IDkyLjI5NSA5LjQ3OSA4OC45NjkgOS40NzkgODQuODY0IEwgOS40NzkgNDIuNzY1IEMgOS40NzkgMzguNjYyIDEyLjk1NyAzNS4zMzYgMTcuMjQ5IDM1LjMzNiBMIDI1LjAxOSAzNS4zMzYgTCAyNS4wMTkgNDIuNzY1IEwgMTcuMjQ5IDQyLjc2NSBMIDE3LjI0OSA4NC44NjQgTCA3OS40MDggODQuODY0IEwgNzkuNDA4IDQyLjc2NSBMIDcxLjYzOCA0Mi43NjUgTCA3MS42MzggMzUuMzM2IFogTSA0OS4wMTQgMTAuMTc5IEwgNjcuMzI2IDI3LjY4OCBMIDYxLjgzNSAzMi45NDIgTCA1Mi44NDkgMjQuMzUyIEwgNTIuODQ5IDU5LjczMSBMIDQ1LjA3OCA1OS43MzEgTCA0NS4wNzggMjQuNDU1IEwgMzYuMTk0IDMyLjk0NyBMIDMwLjcwMiAyNy42OTIgTCA0OS4wMTIgMTAuMTgxIFpcIiBwLWlkPVwiNDY1MFwiIGZpbGw9XCIjOGE4YThhXCI+PC9wYXRoPlxyXG4gICAgPC9zdmc+YFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogXCJVcGxvYWQgYWxsIGltYWdlc1wiLFxyXG4gICAgICBuYW1lOiBcIlVwbG9hZCBhbGwgaW1hZ2VzXCIsXHJcbiAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcclxuICAgICAgICBpZiAobGVhZikge1xyXG4gICAgICAgICAgaWYgKCFjaGVja2luZykge1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZEFsbEZpbGUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiBcIkRvd25sb2FkIGFsbCBpbWFnZXNcIixcclxuICAgICAgbmFtZTogXCJEb3dubG9hZCBhbGwgaW1hZ2VzXCIsXHJcbiAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcclxuICAgICAgICBpZiAobGVhZikge1xyXG4gICAgICAgICAgaWYgKCFjaGVja2luZykge1xyXG4gICAgICAgICAgICB0aGlzLmRvd25sb2FkQWxsSW1hZ2VGaWxlcygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0dXBQYXN0ZUhhbmRsZXIoKTtcclxuICAgIHRoaXMucmVnaXN0ZXJTZWxlY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyU2VsZWN0aW9uKCkge1xyXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxyXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXHJcbiAgICAgICAgXCJlZGl0b3ItbWVudVwiLFxyXG4gICAgICAgIChtZW51OiBNZW51LCBlZGl0b3I6IEVkaXRvciwgaW5mbzogTWFya2Rvd25WaWV3IHwgTWFya2Rvd25GaWxlSW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoXCJtYXJrZG93blwiKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgaWYgKHNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAvLyAxLiDmo4Dmn6XmmK/lkKbkuLpNYXJrZG93bumTvuaOpeagvOW8jyAhW10oKVxyXG4gICAgICAgICAgICBjb25zdCBtYXJrZG93blJlZ2V4ID0gLyFcXFsuKlxcXVxcKCguKilcXCkvZztcclxuICAgICAgICAgICAgY29uc3QgbWFya2Rvd25NYXRjaCA9IG1hcmtkb3duUmVnZXguZXhlYyhzZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKG1hcmtkb3duTWF0Y2ggJiYgbWFya2Rvd25NYXRjaC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbWFya2Rvd25VcmwgPSBtYXJrZG93bk1hdGNoWzFdO1xyXG4gICAgICAgICAgICAgIC8vIOajgOafpeaYr+WQpuS4uuacrOWcsOi3r+W+hO+8iOS4jeS7pWh0dHDlvIDlpLTvvIlcclxuICAgICAgICAgICAgICBpZiAoIW1hcmtkb3duVXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5re75Yqg5LiK5Lyg5Yiw5Zu+5bqK55qE6I+c5Y2V6aG5XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE1lbnUobWVudSwgbWFya2Rvd25VcmwsIGVkaXRvcik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvLyAyLiDmo4Dmn6XmmK/lkKbkuLpXaWtp6ZO+5o6l5qC85byPICFbWy4uLl1dIOaIliBbWy4uLl1dXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHdpa2lMaW5rUmVnZXggPSAvXiE/XFxbXFxbKC4qPylcXF1cXF0kLztcclxuICAgICAgICAgICAgICBjb25zdCB3aWtpTGlua01hdGNoID0gd2lraUxpbmtSZWdleC5leGVjKHNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgaWYgKHdpa2lMaW5rTWF0Y2ggJiYgd2lraUxpbmtNYXRjaC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3aWtpTGlua1BhdGggPSB3aWtpTGlua01hdGNoWzFdO1xyXG4gICAgICAgICAgICAgICAgLy8g5qOA5p+l5piv5ZCm5Li65pys5Zyw6Lev5b6E77yI5LiN5LulaHR0cOW8gOWktO+8iVxyXG4gICAgICAgICAgICAgICAgaWYgKCF3aWtpTGlua1BhdGguc3RhcnRzV2l0aCgnaHR0cCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIOa3u+WKoOS4iuS8oOWIsOWbvuW6iueahOiPnOWNlemhuVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmFkZE1lbnUobWVudSwgd2lraUxpbmtQYXRoLCBlZGl0b3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIOa3u+WKoOWPs+mUruiPnOWNlemhuVxyXG4gIGFkZE1lbnUobWVudTogTWVudSwgaW1hZ2VVcmw6IHN0cmluZywgZWRpdG9yOiBFZGl0b3IpIHtcclxuICAgIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgICBpdGVtXHJcbiAgICAgICAgLnNldFRpdGxlKCfkuIrkvKDliLDlm77luoonKVxyXG4gICAgICAgIC5zZXRJY29uKCd1cGxvYWQnKVxyXG4gICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSByZXNvbHZlSW1hZ2VGaWxlKHRoaXMuYXBwLCBpbWFnZVVybCk7XHJcbiAgICAgICAgICBpZiAoIWZpbGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihg5pyq5om+5Yiw5Zu+54mH5paH5Lu2OiAke2ltYWdlVXJsfWApO1xyXG4gICAgICAgICAgICAgbmV3IE5vdGljZShcIuacquaJvuWIsOWbvueJh+aWh+S7tlwiKTtcclxuICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMudXBsb2FkZXIudXBsb2FkU2luZ2xlRmlsZShmaWxlLnBhdGgpO1xyXG4gICAgICAgICAgaWYgKHJlc3VsdD8uc3VjY2VzcyAmJiByZXN1bHQ/LnVybCkge1xyXG4gICAgICAgICAgICBuZXcgTm90aWNlKGDkuIrkvKDmiJDlip9gKTtcclxuICAgICAgICAgICAgZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oYCFbXSgke3Jlc3VsdC51cmx9KWApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvclxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGDkuIrkvKDlpLHotKU6ICR7cmVzdWx0Py5tc2d9YCk7XHJcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoJ+S4iuS8oOWksei0pe+8jOivt+ajgOafpee9kee7nOaIlumFjee9ricpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBkb3dubG9hZEFsbEltYWdlRmlsZXMoKSB7XHJcbiAgICBjb25zdCBmaWxlQXJyYXkgPSB0aGlzLmhlbHBlci5nZXRBbGxGaWxlcygpO1xyXG4gICAgY29uc3QgZm9sZGVyUGF0aEFicyA9IHRoaXMuZ2V0QXR0YWNobWVudEZvbGRlclBhdGgoKTtcclxuICAgIGlmIChmb2xkZXJQYXRoQWJzPT1udWxsfHwhZm9sZGVyUGF0aEFicykge1xyXG4gICAgICBuZXcgTm90aWNlKFxyXG4gICAgICBgR2V0IGF0dGFjaG1lbnQgZm9sZGVyIHBhdGggZmFpbGQuYFxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gO1xyXG4gICAgfVxyXG4gICAgbGV0IGFic2ZvbGRlciA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChmb2xkZXJQYXRoQWJzKTtcclxuICAgIGlmICghYWJzZm9sZGVyKSB7XHJcbiAgICAgIHRoaXMuYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihmb2xkZXJQYXRoQWJzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaW1hZ2VBcnJheSA9IFtdO1xyXG4gICAgbGV0IGNvdW50Om51bWJlciA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZUFycmF5KSB7XHJcbiAgICAgIGlmICghZmlsZS5wYXRoLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgY291bnQrKztcclxuICAgICAgY29uc3QgdXJsID0gZmlsZS5wYXRoO1xyXG4gICAgICBjb25zdCBhc3NldCA9IGdldFVybEFzc2V0KHVybCk7XHJcbiAgICAgIGxldCBbbmFtZSwgZXh0XSA9IFtcclxuICAgICAgICBkZWNvZGVVUkkocGFyc2UoYXNzZXQpLm5hbWUpLnJlcGxhY2VBbGwoL1tcXFxcXFxcXC86Kj9cXFwiPD58XS9nLCBcIi1cIiksXHJcbiAgICAgICAgcGFyc2UoYXNzZXQpLmV4dCxcclxuICAgICAgXTtcclxuXHJcbiAgICAgIC8vIOWmguaenOaWh+S7tuWQjeW3suWtmOWcqO+8jOWImeeUqOmaj+acuuWAvOabv+aNolxyXG4gICAgICBpZiAodGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZvbGRlclBhdGhBYnMrXCIvXCIrYXNzZXQpKSB7XHJcbiAgICAgICAgbmFtZSA9IChNYXRoLnJhbmRvbSgpICsgMSkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA3KTtcclxuICAgICAgfVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5kb3dubG9hZCh1cmwsIGZvbGRlclBhdGhBYnMsIG5hbWUsIGV4dCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICBpbWFnZUFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICBzb3VyY2U6IGZpbGUuc291cmNlLFxyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICBwYXRoOiByZXNwb25zZS5wYXRoLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgbGV0IHZhbHVlID0gdGhpcy5oZWxwZXIuZ2V0VmFsdWUoKTtcclxuICAgIGltYWdlQXJyYXkubWFwKGltYWdlID0+IHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFxyXG4gICAgICAgIGltYWdlLnNvdXJjZSxcclxuICAgICAgICBgIVske2ltYWdlLm5hbWV9JHt0aGlzLnNldHRpbmdzLmltYWdlU2l6ZVN1ZmZpeCB8fCBcIlwifV0oJHtlbmNvZGVVUkkoXHJcbiAgICAgICAgICBpbWFnZS5wYXRoXHJcbiAgICAgICAgKX0pYFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5oZWxwZXIuc2V0VmFsdWUodmFsdWUpO1xyXG5cclxuICAgIG5ldyBOb3RpY2UoXHJcbiAgICAgIGBhbGw6ICR7Y291bnR9XFxuc3VjY2VzczogJHtpbWFnZUFycmF5Lmxlbmd0aH1cXG5mYWlsZWQ6ICR7Y291bnQgLSBpbWFnZUFycmF5Lmxlbmd0aFxyXG4gICAgICB9YFxyXG4gICAgKTtcclxuICB9XHJcbiAgLy/ojrflj5bpmYTku7bot6/lvoTvvIjnm7jlr7not6/lvoTvvIlcclxuICBnZXRBdHRhY2htZW50Rm9sZGVyUGF0aCgpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGxldCBhc3NldEZvbGRlcjogc3RyaW5nID0gdGhpcy5hcHAudmF1bHQuY29uZmlnLmF0dGFjaG1lbnRGb2xkZXJQYXRoO1xyXG4gICAgaWYgKCFhc3NldEZvbGRlcikge1xyXG4gICAgICBhc3NldEZvbGRlciA9IFwiL1wiXHJcbiAgICB9XHJcbiAgICBjb25zdCBhY3RpdmVGaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKFxyXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpPy5wYXRoXHJcbiAgICApO1xyXG4gICAgaWYgKGFjdGl2ZUZpbGU9PW51bGx8fCFhY3RpdmVGaWxlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyZW50UGF0aCA9IGFjdGl2ZUZpbGUucGFyZW50LnBhdGg7XHJcbiAgICAvLyDlvZPliY3mlofku7blpLnkuIvnmoTlrZDmlofku7blpLlcclxuICAgIGlmIChhc3NldEZvbGRlci5zdGFydHNXaXRoKFwiLi9cIikpIHtcclxuICAgICAgYXNzZXRGb2xkZXIgPSBhc3NldEZvbGRlci5zdWJzdHJpbmcoMSk7XHJcbiAgICAgIGxldCBwYXRoVGVtID0gcGFyZW50UGF0aCArIChhc3NldEZvbGRlcj09PVwiL1wiP1wiXCI6YXNzZXRGb2xkZXIpO1xyXG4gICAgICB3aGlsZShwYXRoVGVtLnN0YXJ0c1dpdGgoXCIvXCIpKSB7XHJcbiAgICAgICAgcGF0aFRlbSA9IHBhdGhUZW0uc3Vic3RyaW5nKDEpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwYXRoVGVtO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGFzc2V0Rm9sZGVyO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBhc3luYyBkb3dubG9hZCh1cmw6IHN0cmluZywgZm9sZGVyUGF0aDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGV4dDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoeyB1cmwgfSk7XHJcbiAgICBjb25zdCB0eXBlID0gYXdhaXQgaW1hZ2VUeXBlKG5ldyBVaW50OEFycmF5KHJlc3BvbnNlLmFycmF5QnVmZmVyKSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogXCJlcnJvclwiLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCF0eXBlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogXCJlcnJvclwiLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOebtOaOpeS9v+eUqEFycmF5QnVmZmVy6ICM5LiN5piv6L2s5o2i5Li6QnVmZmVyXHJcbiAgICBjb25zdCBhcnJheUJ1ZmZlciA9IHJlc3BvbnNlLmFycmF5QnVmZmVyO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBwYXRoID0gZm9sZGVyUGF0aCsnLycrYCR7bmFtZX0ke2V4dH1gO1xyXG5cclxuICAgICAgaWYgKCFleHQpIHtcclxuICAgICAgICBwYXRoID0gZm9sZGVyUGF0aCArJy8nKyBgJHtuYW1lfS4ke3R5cGUuZXh0fWA7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5hcHAudmF1bHQuY3JlYXRlQmluYXJ5KHBhdGgsYXJyYXlCdWZmZXIse1xyXG4gICAgICAgIGN0aW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgIG10aW1lOiBEYXRlLm5vdygpXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb2s6IHRydWUsXHJcbiAgICAgICAgbXNnOiBcIm9rXCIsXHJcbiAgICAgICAgcGF0aDogcGF0aCxcclxuICAgICAgICB0eXBlLFxyXG4gICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogZXJyLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRmlsZShmaWxlQXJyYXk6IEltYWdlW10pIHtcclxuICAgIGNvbnN0IGltYWdlTGlzdDogSW1hZ2VbXSA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgZmlsZUFycmF5KSB7XHJcbiAgICAgIGlmIChtYXRjaC5wYXRoLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mud29ya09uTmV0V29yaykge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAhdGhpcy5oZWxwZXIuaGFzQmxhY2tEb21haW4oXHJcbiAgICAgICAgICAgICAgbWF0Y2gucGF0aCxcclxuICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm5ld1dvcmtCbGFja0RvbWFpbnNcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGltYWdlTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICBwYXRoOiBtYXRjaC5wYXRoLFxyXG4gICAgICAgICAgICAgIG9ic3BhdGg6IG1hdGNoLnBhdGgsXHJcbiAgICAgICAgICAgICAgbmFtZTogbWF0Y2gubmFtZSxcclxuICAgICAgICAgICAgICBzb3VyY2U6IG1hdGNoLnNvdXJjZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGltYWdlTGlzdC5wdXNoKHtcclxuICAgICAgICAgIHBhdGg6IG1hdGNoLnBhdGgsXHJcbiAgICAgICAgICBvYnNwYXRoOiBtYXRjaC5vYnNwYXRoLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2gubmFtZSxcclxuICAgICAgICAgIHNvdXJjZTogbWF0Y2guc291cmNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGltYWdlTGlzdDtcclxuICB9XHJcbiAgZ2V0RmlsZShmaWxlTmFtZTogc3RyaW5nLCBmaWxlTWFwOiBhbnkpIHtcclxuICAgIGlmICghZmlsZU1hcCkge1xyXG4gICAgICBmaWxlTWFwID0gYXJyYXlUb09iamVjdCh0aGlzLmFwcC52YXVsdC5nZXRGaWxlcygpLCBcIm5hbWVcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZU1hcFtmaWxlTmFtZV07XHJcbiAgfVxyXG4gIC8vIHVwbG9kYSBhbGwgZmlsZVxyXG4gIHVwbG9hZEFsbEZpbGUoKSB7XHJcbiAgICBsZXQgY29udGVudCA9IHRoaXMuaGVscGVyLmdldFZhbHVlKCk7XHJcblxyXG4gICAgY29uc3QgYmFzZVBhdGggPSAoXHJcbiAgICAgIHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIgYXMgRmlsZVN5c3RlbUFkYXB0ZXJcclxuICAgICkuZ2V0QmFzZVBhdGgoKTtcclxuICAgIGNvbnN0IGFjdGl2ZUZpbGUgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xyXG4gICAgY29uc3QgZmlsZU1hcCA9IGFycmF5VG9PYmplY3QodGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKSwgXCJuYW1lXCIpO1xyXG4gICAgY29uc3QgZmlsZVBhdGhNYXAgPSBhcnJheVRvT2JqZWN0KHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCksIFwicGF0aFwiKTtcclxuICAgIGxldCBpbWFnZUxpc3Q6IEltYWdlW10gPSBbXTtcclxuICAgIGNvbnN0IGZpbGVBcnJheSA9IHRoaXMuZmlsdGVyRmlsZSh0aGlzLmhlbHBlci5nZXRBbGxGaWxlcygpKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIGZpbGVBcnJheSkge1xyXG4gICAgICBjb25zdCBpbWFnZU5hbWUgPSBtYXRjaC5uYW1lO1xyXG4gICAgICBjb25zdCBlbmNvZGVkVXJpID0gbWF0Y2gucGF0aDtcclxuXHJcbiAgICAgIGlmICghZW5jb2RlZFVyaS5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoUGF0aCA9IGRlY29kZVVSSShlbmNvZGVkVXJpKTtcclxuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGJhc2VuYW1lKG1hdGNoUGF0aCk7XHJcbiAgICAgICAgbGV0IGZpbGU7XHJcbiAgICAgICAgLy8g57ud5a+56Lev5b6EXHJcbiAgICAgICAgaWYgKGZpbGVQYXRoTWFwW21hdGNoUGF0aF0pIHtcclxuICAgICAgICAgIGZpbGUgPSBmaWxlUGF0aE1hcFttYXRjaFBhdGhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g55u45a+56Lev5b6EXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKCFmaWxlICYmIG1hdGNoUGF0aC5zdGFydHNXaXRoKFwiLi9cIikpIHx8XHJcbiAgICAgICAgICBtYXRjaFBhdGguc3RhcnRzV2l0aChcIi4uL1wiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgbGV0IGFic29QYXRoID0gXCJcIjtcclxuICAgICAgICAgIC8v5p+l5om+55u45a+56Lev5b6EXHJcbiAgICAgICAgICBpZiAobWF0Y2hQYXRoLnN0YXJ0c1dpdGgoXCIuL1wiKSkge1xyXG4gICAgICAgICAgICBhYnNvUGF0aCA9IGRpcm5hbWUoYWN0aXZlRmlsZS5wYXRoKSttYXRjaFBhdGguc3Vic3RyaW5nKDEpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+WvueS6ji4uLy4uL+W8gOWktOeahOi3r+W+hO+8jOmcgOimgeWQkeS4iuafpeaJvuWMuemFjVxyXG4gICAgICAgICAgICBsZXQgbnVtID0gbWF0Y2hQYXRoLnNwbGl0KFwiLi4vXCIpLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICBhYnNvUGF0aCA9IG1hdGNoUGF0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8bnVtO2krKykge1xyXG4gICAgICAgICAgICAgIGFic29QYXRoID0gYWJzb1BhdGguc3Vic3RyaW5nKDAsYWJzb1BhdGgubGFzdEluZGV4T2YoXCIvXCIpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGFic29QYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5bC95Y+v6IO955+t6Lev5b6EXHJcbiAgICAgICAgaWYgKCFmaWxlKSB7XHJcbiAgICAgICAgICBmaWxlID0gdGhpcy5nZXRGaWxlKGZpbGVOYW1lLCBmaWxlTWFwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmaWxlKSB7XHJcbiAgICAgICAgICBjb25zdCBhYnN0cmFjdEltYWdlRmlsZSA9IGpvaW4oYmFzZVBhdGgsIGZpbGUucGF0aCk7XHJcblxyXG4gICAgICAgICAgaWYgKGlzQXNzZXRUeXBlQW5JbWFnZShhYnN0cmFjdEltYWdlRmlsZSkpIHtcclxuICAgICAgICAgICAgbGV0IHB1c2hPYmogPSB7XHJcbiAgICAgICAgICAgICAgcGF0aDogYWJzdHJhY3RJbWFnZUZpbGUsXHJcbiAgICAgICAgICAgICAgb2JzcGF0aDogZmlsZS5wYXRoLFxyXG4gICAgICAgICAgICAgIG5hbWU6IGltYWdlTmFtZSxcclxuICAgICAgICAgICAgICBzb3VyY2U6IG1hdGNoLnNvdXJjZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy/lpoLmnpzmlofku7bkuK3mnInph43lpI3lvJXnlKjnmoTlm77niYfvvIzlj6rkuIrkvKDkuIDmrKFcclxuICAgICAgICAgICAgaWYgKCFpbWFnZUxpc3QuZmluZChpdGVtPT5pdGVtLnBhdGg9PT1hYnN0cmFjdEltYWdlRmlsZSYmaXRlbS5uYW1lPT09aW1hZ2VOYW1lJiZpdGVtLnNvdXJjZT09PW1hdGNoLnNvdXJjZSkpIHtcclxuICAgICAgICAgICAgICBpbWFnZUxpc3QucHVzaChwdXNoT2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbWFnZUxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIG5ldyBOb3RpY2UoXCLmsqHmnInop6PmnpDliLDlm77lg4/mlofku7ZcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ldyBOb3RpY2UoYOWFseaJvuWIsCR7aW1hZ2VMaXN0Lmxlbmd0aH3kuKrlm77lg4/mlofku7bvvIzlvIDlp4vkuIrkvKBgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwbG9hZGVyLnVwbG9hZEZpbGVzKGltYWdlTGlzdC5tYXAoaXRlbSA9PiBpdGVtLm9ic3BhdGgpKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgIGxldCB1cGxvYWRVcmxMaXN0ID0gcmVzLnJlc3VsdDtcclxuICAgICAgICBjb25zdCB1cGxvYWRVcmxGdWxsUmVzdWx0TGlzdCA9IHJlcy5yZXN1bHQgfHwgW107XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMgPSBbXHJcbiAgICAgICAgICAuLi4odGhpcy5zZXR0aW5ncy51cGxvYWRlZEltYWdlcyB8fCBbXSksXHJcbiAgICAgICAgICAuLi51cGxvYWRVcmxGdWxsUmVzdWx0TGlzdCxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgaW1hZ2VMaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICAgIGNvbnN0IHVwbG9hZEltYWdlID0gdXBsb2FkVXJsTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZUFsbChcclxuICAgICAgICAgICAgaXRlbS5zb3VyY2UsXHJcbiAgICAgICAgICAgIGAhWyR7aXRlbS5uYW1lfSR7dGhpcy5zZXR0aW5ncy5pbWFnZVNpemVTdWZmaXggfHwgXCJcIlxyXG4gICAgICAgICAgICB9XSgke3VwbG9hZEltYWdlfSlgXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaGVscGVyLnNldFZhbHVlKGNvbnRlbnQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kZWxldGVTb3VyY2UpIHtcclxuICAgICAgICAgIGltYWdlTGlzdC5tYXAoaW1hZ2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWltYWdlLnBhdGguc3RhcnRzV2l0aChcImh0dHBcIikpIHtcclxuICAgICAgICAgICAgICBsZXQgZmlsZURlbCA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChpbWFnZS5vYnNwYXRoKTtcclxuICAgICAgICAgICAgICBpZiAoZmlsZURlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAudmF1bHQuZGVsZXRlKGZpbGVEZWwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ldyBOb3RpY2UoXCJVcGxvYWQgZXJyb3JcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0dXBQYXN0ZUhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXHJcbiAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbihcclxuICAgICAgICBcImVkaXRvci1wYXN0ZVwiLFxyXG4gICAgICAgIChldnQ6IENsaXBib2FyZEV2ZW50LCBlZGl0b3I6IEVkaXRvciwgbWFya2Rvd25WaWV3OiBNYXJrZG93blZpZXcpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGFsbG93VXBsb2FkID0gdGhpcy5oZWxwZXIuZ2V0RnJvbnRtYXR0ZXJWYWx1ZShcclxuICAgICAgICAgICAgXCJpbWFnZS1hdXRvLXVwbG9hZFwiLFxyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnVwbG9hZEJ5Q2xpcFN3aXRjaFxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBsZXQgZmlsZXMgPSBldnQuY2xpcGJvYXJkRGF0YS5maWxlcztcclxuICAgICAgICAgIGlmICghYWxsb3dVcGxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8g5Ymq6LS05p2/5YaF5a655pyJbWTmoLzlvI/nmoTlm77niYfml7ZcclxuICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLndvcmtPbk5ldFdvcmspIHtcclxuICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkVmFsdWUgPSBldnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VMaXN0ID0gdGhpcy5oZWxwZXJcclxuICAgICAgICAgICAgICAuZ2V0SW1hZ2VMaW5rKGNsaXBib2FyZFZhbHVlKVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoaW1hZ2UgPT4gaW1hZ2UucGF0aC5zdGFydHNXaXRoKFwiaHR0cFwiKSlcclxuICAgICAgICAgICAgICAuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgaW1hZ2UgPT5cclxuICAgICAgICAgICAgICAgICAgIXRoaXMuaGVscGVyLmhhc0JsYWNrRG9tYWluKFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5uZXdXb3JrQmxhY2tEb21haW5zXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGltYWdlTGlzdC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICB0aGlzLnVwbG9hZGVyXHJcbiAgICAgICAgICAgICAgICAudXBsb2FkRmlsZXMoaW1hZ2VMaXN0Lm1hcChpdGVtID0+IGl0ZW0ucGF0aCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmhlbHBlci5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXBsb2FkVXJsTGlzdCA9IHJlcy5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VMaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwbG9hZEltYWdlID0gdXBsb2FkVXJsTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlQWxsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYCFbJHtpdGVtLm5hbWV9JHt0aGlzLnNldHRpbmdzLmltYWdlU2l6ZVN1ZmZpeCB8fCBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dKCR7dXBsb2FkSW1hZ2V9KWBcclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWxwZXIuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwbG9hZFVybEZ1bGxSZXN1bHRMaXN0ID0gcmVzLnJlc3VsdCB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnVwbG9hZGVkSW1hZ2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uKHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLi4udXBsb2FkVXJsRnVsbFJlc3VsdExpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJVcGxvYWQgZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8g5Ymq6LS05p2/5Lit5piv5Zu+54mH5pe26L+b6KGM5LiK5LygXHJcbiAgICAgICAgICBpZiAodGhpcy5jYW5VcGxvYWQoZXZ0LmNsaXBib2FyZERhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkRmlsZUFuZEVtYmVkSW1ndXJJbWFnZShcclxuICAgICAgICAgICAgICBlZGl0b3IsXHJcbiAgICAgICAgICAgICAgYXN5bmMgKGVkaXRvcjogRWRpdG9yLCBwYXN0ZUlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLnVwbG9hZGVyLnVwbG9hZEZyb21DbGlwYm9hcmQoZXZ0KTtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVGYWlsZWRVcGxvYWQoZWRpdG9yLCBwYXN0ZUlkLCByZXMubXNnKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gcmVzLnVybCB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkVXJsRnVsbFJlc3VsdExpc3QgPSByZXMucmVzdWx0IHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy51cGxvYWRlZEltYWdlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgLi4uKHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAuLi51cGxvYWRVcmxGdWxsUmVzdWx0TGlzdCxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGV2dC5jbGlwYm9hcmREYXRhXHJcbiAgICAgICAgICAgICkuY2F0Y2goKTtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxyXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXHJcbiAgICAgICAgXCJlZGl0b3ItZHJvcFwiLFxyXG4gICAgICAgIGFzeW5jIChldnQ6IERyYWdFdmVudCwgZWRpdG9yOiBFZGl0b3IsIG1hcmtkb3duVmlldzogTWFya2Rvd25WaWV3KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBhbGxvd1VwbG9hZCA9IHRoaXMuaGVscGVyLmdldEZyb250bWF0dGVyVmFsdWUoXHJcbiAgICAgICAgICAgIFwiaW1hZ2UtYXV0by11cGxvYWRcIixcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy51cGxvYWRCeUNsaXBTd2l0Y2hcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBsZXQgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xyXG4gICAgICAgICAgaWYgKCFhbGxvd1VwbG9hZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCAhPT0gMCAmJiBmaWxlc1swXS50eXBlLnN0YXJ0c1dpdGgoXCJpbWFnZVwiKSkge1xyXG4gICAgICAgICAgICBsZXQgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnVwbG9hZGVyLnVwbG9hZEZpbGVzKEFycmF5LmZyb20oZmlsZXMpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICBjb25zdCB1cGxvYWRVcmxGdWxsUmVzdWx0TGlzdCA9IGRhdGEucmVzdWx0ID8/IFtdO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAuLi4odGhpcy5zZXR0aW5ncy51cGxvYWRlZEltYWdlcyA/PyBbXSksXHJcbiAgICAgICAgICAgICAgICAuLi51cGxvYWRVcmxGdWxsUmVzdWx0TGlzdCxcclxuICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgZGF0YS5yZXN1bHQubWFwKCh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFzdGVJZCA9IChNYXRoLnJhbmRvbSgpICsgMSkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA3KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0VGVtcG9yYXJ5VGV4dChlZGl0b3IsIHBhc3RlSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWJlZE1hcmtEb3duSW1hZ2UoZWRpdG9yLCBwYXN0ZUlkLCB2YWx1ZSwgZmlsZXNbMF0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlVwbG9hZCBlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNhblVwbG9hZChjbGlwYm9hcmREYXRhOiBEYXRhVHJhbnNmZXIpIHtcclxuICAgIHRoaXMuc2V0dGluZ3MuYXBwbHlJbWFnZTtcclxuICAgIGNvbnN0IGZpbGVzID0gY2xpcGJvYXJkRGF0YS5maWxlcztcclxuICAgIGNvbnN0IHRleHQgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG5cclxuICAgIGNvbnN0IGhhc0ltYWdlRmlsZSA9XHJcbiAgICAgIGZpbGVzLmxlbmd0aCAhPT0gMCAmJiBmaWxlc1swXS50eXBlLnN0YXJ0c1dpdGgoXCJpbWFnZVwiKTtcclxuICAgIGlmIChoYXNJbWFnZUZpbGUpIHtcclxuICAgICAgaWYgKCEhdGV4dCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmFwcGx5SW1hZ2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwbG9hZEZpbGVBbmRFbWJlZEltZ3VySW1hZ2UoXHJcbiAgICBlZGl0b3I6IEVkaXRvcixcclxuICAgIGNhbGxiYWNrOiBGdW5jdGlvbixcclxuICAgIGNsaXBib2FyZERhdGE6IERhdGFUcmFuc2ZlclxyXG4gICkge1xyXG4gICAgbGV0IHBhc3RlSWQgPSAoTWF0aC5yYW5kb20oKSArIDEpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgNyk7XHJcbiAgICB0aGlzLmluc2VydFRlbXBvcmFyeVRleHQoZWRpdG9yLCBwYXN0ZUlkKTtcclxuICAgIGNvbnN0IG5hbWUgPSBjbGlwYm9hcmREYXRhLmZpbGVzWzBdLm5hbWU7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1cmwgPSBhd2FpdCBjYWxsYmFjayhlZGl0b3IsIHBhc3RlSWQpO1xyXG4gICAgICB0aGlzLmVtYmVkTWFya0Rvd25JbWFnZShlZGl0b3IsIHBhc3RlSWQsIHVybCwgbmFtZSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHRoaXMuaGFuZGxlRmFpbGVkVXBsb2FkKGVkaXRvciwgcGFzdGVJZCwgZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnNlcnRUZW1wb3JhcnlUZXh0KGVkaXRvcjogRWRpdG9yLCBwYXN0ZUlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBwcm9ncmVzc1RleHQgPSBpbWFnZUF1dG9VcGxvYWRQbHVnaW4ucHJvZ3Jlc3NUZXh0Rm9yKHBhc3RlSWQpO1xyXG4gICAgZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24ocHJvZ3Jlc3NUZXh0ICsgXCJcXG5cIik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBwcm9ncmVzc1RleHRGb3IoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGAhW1VwbG9hZGluZyBmaWxlLi4uJHtpZH1dKClgO1xyXG4gIH1cclxuXHJcbiAgZW1iZWRNYXJrRG93bkltYWdlKFxyXG4gICAgZWRpdG9yOiBFZGl0b3IsXHJcbiAgICBwYXN0ZUlkOiBzdHJpbmcsXHJcbiAgICBpbWFnZVVybDogYW55LFxyXG4gICAgbmFtZTogc3RyaW5nID0gXCJcIlxyXG4gICkge1xyXG4gICAgbGV0IHByb2dyZXNzVGV4dCA9IGltYWdlQXV0b1VwbG9hZFBsdWdpbi5wcm9ncmVzc1RleHRGb3IocGFzdGVJZCk7XHJcbiAgICBjb25zdCBpbWFnZVNpemVTdWZmaXggPSB0aGlzLnNldHRpbmdzLmltYWdlU2l6ZVN1ZmZpeCB8fCBcIlwiO1xyXG4gICAgbGV0IG1hcmtEb3duSW1hZ2UgPSBgIVske25hbWV9JHtpbWFnZVNpemVTdWZmaXh9XSgke2ltYWdlVXJsfSlgO1xyXG5cclxuICAgIGltYWdlQXV0b1VwbG9hZFBsdWdpbi5yZXBsYWNlRmlyc3RPY2N1cnJlbmNlKFxyXG4gICAgICBlZGl0b3IsXHJcbiAgICAgIHByb2dyZXNzVGV4dCxcclxuICAgICAgbWFya0Rvd25JbWFnZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUZhaWxlZFVwbG9hZChlZGl0b3I6IEVkaXRvciwgcGFzdGVJZDogc3RyaW5nLCByZWFzb246IGFueSkge1xyXG4gICAgbmV3IE5vdGljZShyZWFzb24pO1xyXG4gICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCByZXF1ZXN0OiBcIiwgcmVhc29uKTtcclxuICAgIGxldCBwcm9ncmVzc1RleHQgPSBpbWFnZUF1dG9VcGxvYWRQbHVnaW4ucHJvZ3Jlc3NUZXh0Rm9yKHBhc3RlSWQpO1xyXG4gICAgaW1hZ2VBdXRvVXBsb2FkUGx1Z2luLnJlcGxhY2VGaXJzdE9jY3VycmVuY2UoXHJcbiAgICAgIGVkaXRvcixcclxuICAgICAgcHJvZ3Jlc3NUZXh0LFxyXG4gICAgICBcIuKaoO+4j3VwbG9hZCBmYWlsZWQsIGNoZWNrIGRldiBjb25zb2xlXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVwbGFjZUZpcnN0T2NjdXJyZW5jZShcclxuICAgIGVkaXRvcjogRWRpdG9yLFxyXG4gICAgdGFyZ2V0OiBzdHJpbmcsXHJcbiAgICByZXBsYWNlbWVudDogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBsZXQgbGluZXMgPSBlZGl0b3IuZ2V0VmFsdWUoKS5zcGxpdChcIlxcblwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGNoID0gbGluZXNbaV0uaW5kZXhPZih0YXJnZXQpO1xyXG4gICAgICBpZiAoY2ggIT0gLTEpIHtcclxuICAgICAgICBsZXQgZnJvbSA9IHsgbGluZTogaSwgY2g6IGNoIH07XHJcbiAgICAgICAgbGV0IHRvID0geyBsaW5lOiBpLCBjaDogY2ggKyB0YXJnZXQubGVuZ3RoIH07XHJcbiAgICAgICAgZWRpdG9yLnJlcGxhY2VSYW5nZShyZXBsYWNlbWVudCwgZnJvbSwgdG8pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIkJ1ZmZlciIsInN0cnRvazMuZnJvbUJ1ZmZlciIsInN0cnRvazMuZnJvbVN0cmVhbSIsInN0cnRvazMuRW5kT2ZTdHJlYW1FcnJvciIsIlRva2VuLlN0cmluZ1R5cGUiLCJUb2tlbi5VSU5UOCIsIlRva2VuLklOVDMyX0JFIiwiVG9rZW4uVUlOVDY0X0xFIiwiVG9rZW4uVUlOVDE2X0JFIiwiVG9rZW4uVUlOVDE2X0xFIiwiVG9rZW4uVUlOVDMyX0JFIiwiVG9rZW4uVUlOVDMyX0xFIiwicGF0aCIsImV4dG5hbWUiLCJub3JtYWxpemVQYXRoIiwiVEZpbGUiLCJNYXJrZG93blZpZXciLCJwYXJzZSIsIm1vbWVudCIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIiwiTm90aWNlIiwiYWRkSWNvbiIsInJlcXVlc3RVcmwiLCJiYXNlbmFtZSIsImRpcm5hbWUiLCJqb2luIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQW9GRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFVBQVUsR0FBRyxRQUFRLEdBQUcsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3JNLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hLLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUk7QUFDdEQsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFD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LENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7R0FDNUIsQ0FBQyxNQUFNLENBQUMsS0FBSztBQUNmLEdBQUUsS0FBSyxJQUFJO0dBQ1QsT0FBTyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQTs7R0FFMUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7R0FDNUIsQ0FBQyxNQUFNLENBQUMsS0FBSztBQUNmLEdBQUUsS0FBSyxJQUFJO0dBQ1QsT0FBTyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQTs7QUFFNUUsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7S0FDWCxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1osR0FBQSxDQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQ3pCLEtBQUksT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksUUFBUTtBQUM3QyxHQUFBLENBQUcsTUFBTTtLQUNMLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSTtLQUN4QixDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1osR0FBQTtBQUNBLEdBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSTtBQUNoRCxDQUFBOztBQUVBLENBQUEsT0FBQSxDQUFBLEtBQWEsR0FBRyxVQUFVLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ3JFLEdBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0dBQ1YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRztBQUNuQyxHQUFFLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSTtBQUMzQixHQUFFLElBQUksS0FBSyxHQUFHLElBQUksSUFBSTtHQUNwQixJQUFJLEVBQUUsSUFBSSxJQUFJLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUM7R0FDL0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUNoQyxHQUFFLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUc7QUFDckIsR0FBRSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUc7O0FBRTVELEdBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSzs7R0FFdEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtLQUN0QyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRztBQUMzQixLQUFJLENBQUMsR0FBRztBQUNSLEdBQUEsQ0FBRyxNQUFNO0FBQ1QsS0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUss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LEVBQUU7QUFDL0QsRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN0QixDQUFDOztBQUVELENBQUMsT0FBTyxPQUFPLEtBQUssR0FBRztBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sbUJBQW1CLEdBQUc7QUFDbkMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDN0ksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLENBQUM7O0FDckNNLE1BQU0sVUFBVSxHQUFHO0FBQzFCLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsSUFBSTtBQUNMLENBQUMsS0FBSztBQUNOLENBQUMsSUFBSTtBQUNMLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsT0FBTztBQUNSLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsT0FBTztBQUNSLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsSUFBSTtBQUNMLENBQUMsSUFBSTtBQUNMLENBQUMsUUFBUTtBQUNULENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsSUFBSTtBQUNMLENBQUMsS0FBSztBQUNOLENBQUMsR0FBRztBQUNKLENBQUMsSUFBSTtBQUNMLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsT0FBTztBQUNSLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsSUFBSTtBQUNMLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsT0FBTztBQUNSLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsT0FBTztBQUNSLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsSUFBSTtBQUNMLENBQUMsS0FBSztBQUNOLENBQUMsSUFBSTtBQUNMLENBQUMsSUFBSTtBQUNMLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsU0FBUztBQUNWLENBQUMsT0FBTztBQUNSLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENB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O0FBQ2hDLEdBQUcsT0FBTztBQUNWLElBQUksR0FBRyxFQUFFLElBQUk7QUFDYixJQUFJLElBQUksRUFBRSxZQUFZO0FBQ3RCLElBQUk7QUFDSixFQUFFOztBQUVGLEVBQUU7QUFDRixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUN4QyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxJQUFJO0FBQ0osR0FBRyxPQUFPO0FBQ1YsSUFBSSxHQUFHLEVBQUUsS0FBSztBQUNkLElBQUksSUFBSSxFQUFFLDhCQUE4QjtBQUN4QyxJQUFJO0FBQ0osRUFBRTs7QUFFRjtBQUNBLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUM1QztBQUNBLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN0RCxJQUFJLE9BQU87QUFDWCxLQUFLLEdBQUcsRUFBRSxLQUFLO0FBQ2YsS0FBSyxJQUFJLEVBQUUsWUFBWTtBQUN2QixLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN0RCxJQUFJLE9BQU87QUFDWCxLQUFLLEdBQUcsRUFBRSxLQUFLO0FBQ2YsS0FBSyxJQUFJLEVBQUUsWUFBWTtBQUN2QixLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUU7O0FBRUYsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDaEMsR0FBRyxPQUFPO0FBQ1YsSUFBSSxHQUFHLEVBQUUsS0FBSztBQUNkLElBQUksSUFBSSxFQUFFLDZCQUE2QjtBQUN2QyxJQUFJO0FBQ0osRUFBRTs7QUFFRixFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDNUMsR0FBRyxPQUFPO0FBQ1YsSUFBSSxHQUFHLEVBQUUsT0FBTztBQUNoQixJQUFJLElBQUksRUFBRSxxQkFBcUI7QUFDL0IsSUFBSTtBQUNKLEVBQUU7O0FBRUY7O0FBRUEsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDeEQsR0FBRyxPQUFPO0FBQ1YsSUFBSSxHQUFHLEVBQUUsSUFBSTtBQUNiLElBQUksSUFBSSxFQUFFLGtCQUFrQjtBQUM1QixJQUFJO0FBQ0osRUFBRTs7QUFFRixFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNsQyxHQUFHLE9BQU87QUFDVixJQUFJLEdBQUcsRUFBRSxLQUFLO0FBQ2QsSUFBSSxJQUFJLEVBQUUsaUJBQWlCO0FBQzNCLElBQUk7QUFDSixFQUFFOztBQUVGLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3hELEdBQUcsT0FBTztBQUNWLElBQUksR0FBRyxFQUFFLElBQUk7QUFDYixJQUFJLElBQUksRUFBRSw2QkFBNkI7QUFDdkMsSUFBSTtBQUNKLEVBQUU7O0FBRUYsRUFBRTtBQUNGLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO0FBQ2pELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO0FBQ3ZELElBQUk7QUFDSixHQUFHLE9BQU87QUFDVixJQUFJLEdBQUcsRUFBRSxLQUFLO0FBQ2QsSUFBSSxJQUFJLEVBQUUsOEJBQThCO0FBQ3hDLElBQUk7QUFDSixFQUFFOztBQUVGLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ2xDLEdBQUcsT0FBTztBQUNWLElBQUksR0FBRyxFQUFFLEtBQUs7QUFDZCxJQUFJLElBQUksRUFBRSxXQUFXO0FBQ3JCLElBQUk7QUFDSixFQUFFOztBQUVGLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzlCLEdBQUcsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdkQsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQ25FLElBQUksT0FBTztBQUNYLEtBQUssR0FBRyxFQUFFLEtBQUs7QUFDZixLQUFLLElBQUksRUFBRSxlQUFlO0FBQzFCLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTs7QUFFRixFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNsQyxHQUFHLE9BQU87QUFDVixJQUFJLEdBQUcsRUFBRSxNQUFNO0FBQ2YsSUFBSSxJQUFJLEVBQUUsb0JBQW9CO0FBQzlCLElBQUk7QUFDSixFQUFFOztBQUVGOztBQUVBLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQ25DLEdBQUcsT0FBTztBQUNWLElBQUksR0FBRyxFQUFFLE9BQU87QUFDaEIsSUFBSSxJQUFJLEVBQUUsdUJBQXVCO0FBQ2pDLElBQUk7QUFDSixFQUFFOztBQUVGLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQ25DLEdBQUcsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1QixHQUFHLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJQSxVQUFnQixDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM5RSxHQUFHLElBQUksTUFBTSxLQUFLLGVBQWUsRUFBRTtBQUNuQyxJQUFJLE9BQU87QUFDWCxLQUFLLEdBQUcsRUFBRSxLQUFLO0FBQ2YsS0FBSyxJQUFJLEVBQUUsbUJBQW1CO0FBQzlCLEtBQUs7QUFDTCxHQUFHOztBQUVILEdBQUcsT0FBTztBQUNWLElBQUksR0FBRyxFQUFFLElBQUk7QUFDYixJQUFJLElBQUksRUFBRSw0QkFBNEI7QUFDdEMsSUFBSTtBQUNKLEVBQUU7O0FBRUYsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDOUMsR0FBRyxNQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pFLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQzdDLElBQUksT0FBTztBQUNYLEtBQUssR0FBRyxFQUFFLEtBQUs7QUFDZixLQUFLLElBQUksRUFBRSw4QkFBOEI7QUFDekMsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFOztBQUVGOztBQUVBLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDcEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0IsR0FBRyxlQUFlLGVBQWUsR0FBRztBQUNwQyxJQUFJLE9BQU87QUFDWCxLQUFLLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUNFLFFBQWMsQ0FBQztBQUN0RCxLQUFLLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSUYsVUFBZ0IsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkUsS0FBSztBQUNMLEdBQUc7O0FBRUgsR0FBRyxHQUFHO0FBQ04sSUFBSSxNQUFNLEtBQUssR0FBRyxNQUFNLGVBQWUsRUFBRTtBQUN6QyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDMUIsS0FBSyxPQUFPO0FBQ1osSUFBSTs7QUFFSixJQUFJLFFBQVEsS0FBSyxDQUFDLElBQUk7QUFDdEIsS0FBSyxLQUFLLE1BQU07QUFDaEIsTUFBTSxPQUFPO0FBQ2IsT0FBTyxHQUFHLEVBQUUsS0FBSztBQUNqQixPQUFPLElBQUksRUFBRSxXQUFXO0FBQ3hCLE9BQU87QUFDUCxLQUFLLEtBQUssTUFBTTtBQUNoQixNQUFNLE9BQU87QUFDYixPQUFPLEdBQUcsRUFBRSxNQUFNO0FBQ2xCLE9BQU8sSUFBSSxFQUFFLFlBQVk7QUFDekIsT0FBTztBQUNQLEtBQUs7QUFDTCxNQUFNLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9DO0FBQ0EsR0FBRyxDQUFDLFFBQVEsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJOztBQUU1RCxHQUFHLE9BQU87QUFDVixJQUFJLEdBQUcsRUFBRSxLQUFLO0FBQ2QsSUFBSSxJQUFJLEVBQUUsV0FBVztBQUNyQixJQUFJO0FBQ0osRUFBRTs7QUFFRixFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3BFLEdBQUcsT0FBTztBQUNWLElBQUksR0FBRyxFQUFFLE9BQU87QUFDaEIsSUFBSSxJQUFJLEVBQUUsNEJBQTRCO0FBQ3RDLElBQUk7QUFDSixFQUFFOztBQUVGLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDcEUsR0FBRyxPQUFPO0FBQ1YsSUFBSSxHQUFHLEVBQUUsS0FBSztBQUNkLElBQUksSUFBSSxFQUFFLG1CQUFtQjtBQUM3QixJQUFJO0FBQ0osRUFBRTs7QUFFRjtBQUNBLEVBQUU7QUFDRixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwRCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2RCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2RCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2RCxJQUFJO0FBQ0osR0FBRyxPQUFPO0FBQ1YsSUFBSSxHQUFHLEVBQUUsS0FBSztBQUNkLElBQUksSUFBSSxFQUFFLGlCQUFpQjtBQUMzQixJQUFJO0FBQ0osRUFBRTs7QUFFRjs7QUFFQSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUMxRSxHQUFHLE9BQU87QUFDVixJQUFJLEdBQUcsRUFBRSxLQUFLO0FBQ2QsSUFBSSxJQUFJLEVBQUUscUJBQXFCO0FBQy9CLElBQUk7QUFDSixFQUFFOztBQUVGLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQ3JDLEdBQUcsT0FBTztBQUNWLElBQUksR0FBRyxFQUFFLEtBQUs7QUFDZCxJQUFJLElBQUksRUFBRSxhQUFhO0FBQ3ZCLElBQUk7QUFDSixFQUFFOztBQUVGOztBQUVBLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQzVGLEdBQUcsT0FBTztBQUNWLElBQUksR0FBRyxFQUFFLEtBQUs7QUFDZCxJQUFJLElBQUksRUFBRSx1QkFBdUI7QUFDakMsSUFBSTtBQUNKLEVBQUU7O0FBRUY7QUFDQSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDaEYsR0FBRyxlQUFlLFVBQVUsR0FBRztBQUMvQixJQUFJLE1BQU0sSUFBSSxHQUFHSixrQkFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFDakMsSUFBSSxNQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQ3BDLElBQUksT0FBTztBQUNYLEtBQUssRUFBRSxFQUFFLElBQUk7QUFDYixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDTyxTQUFlLENBQUMsQ0FBQztBQUM3RCxLQUFLO0FBQ0wsR0FBRzs7QUFFSCxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDN0I7QUFDQSxHQUFHLE9BQU8sU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDN0QsSUFBSSxNQUFNLE1BQU0sR0FBRyxNQUFNLFVBQVUsRUFBRTtBQUNyQyxJQUFJLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRTtBQUNsQyxJQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQzdIO0FBQ0EsS0FBSyxNQUFNLE1BQU0sR0FBR1Asa0JBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQ3BDLEtBQUssT0FBTyxJQUFJLE1BQU0sU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7O0FBRWxELEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUMzSDtBQUNBLE1BQU0sT0FBTztBQUNiLE9B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LElBQUksRUFBRSxXQUFXO0FBQ3RCLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdEQsSUFBSSxPQUFPO0FBQ1gsS0FBSyxHQUFHLEVBQUUsS0FBSztBQUNmLEtBQUssSUFBSSxFQUFFLFlBQVk7QUFDdkIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdEQsSUFBSSxPQUFPO0FBQ1gsS0FBSyxHQUFHLEVBQUUsS0FBSztBQUNmLEtBQUssSUFBSSxFQUFFLFlBQVk7QUFDdkIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdEQsSUFBSSxPQUFPO0FBQ1gsS0FBSyxHQUFHLEVBQUUsS0FBSztBQUNmLEtBQUssSUFBSSxFQUFFLFlBQVk7QUFDdkIsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0YsQ0FBQzs7QUFFRCxDQUFDLE1BQU0sV0FBVyxDQUFDLFNBQVMsRUFBRTtBQUM5QixFQUFFLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHSSxTQUFlLEdBQUdDLFNBQWUsQ0FBQztBQUM3RixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUMzQixFQUFFLFFBQVEsS0FB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QUEsSUFBQSxJQUFBLEtBQUEsTUFBQSxFQUFBLEVBQUEsSUFBQSxHQUFBLEVBQWlCLENBQUEsQ0FBQTtRQUVqQixJQUFJLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1FBQ2pFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxJQUFJLEVBQUU7UUFDM0QsSUFBSSxhQUFhLEdBQUcsSUFBQSxDQUFBLE1BQUEsQ0FBSyxJQUFJLFNBQUcsZUFBZSxFQUFBLElBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBSyxRQUFRLEVBQUEsR0FBQSxDQUFHO1FBRS9ELHFCQUFxQixDQUFDLHNCQUFzQixDQUMxQyxNQUFNLEVBQ04sWUFBWSxFQUNaLGFBQWEsQ0FDZDtJQUNILENBQUM7QUFFRCxJQUFBLHFCQUFBLENBQUEsU0FBQSxDQUFBLGtCQUFrQixHQUFsQixVQUFtQixNQUFjLEVBQUUsT0FBZSxFQUFFLE1BQVcsRUFBQTtBQUM3RCxRQUFBLElBQUlBLGVBQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsUUFBQSxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQztRQUN6QyxJQUFJLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1FBQ2pFLHFCQUFxQixDQUFDLHNCQUFzQixDQUMxQyxNQUFNLEVBQ04sWUFBWSxFQUNaLG9DQUFvQyxDQUNyQztJQUNILENBQUM7QUFFTSxJQUFBLHFCQUFBLENBQUEsc0JBQXNCLEdBQTdCLFVBQ0UsTUFBYyxFQUNkLE1BQWMsRUFDZCxXQUFtQixFQUFBO1FBRW5CLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3pDLFFBQUEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDakMsWUFBQSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDOUIsZ0JBQUEsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDNUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDMUM7WUFDRjtRQUNGO0lBQ0YsQ0FBQztJQUNILE9BQUEscUJBQUM7QUFBRCxDQXRvQkEsQ0FBbURNLGVBQU0sQ0FBQTs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNF19
