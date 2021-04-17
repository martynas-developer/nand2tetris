const fs = require('fs');

module.exports = class JackTokenizer {

    constructor(inputFile) {
        this.data = fs.readFileSync(inputFile, {encoding: 'utf-8'}, function(err,data) {
            if (err) throw err;
            return data;
        });
        this.pointer = 0;
        this.tokenType = '';
        this.token = '';
    }

    hasMoreTokens() {
        return this.pointer < this.data.length;
    }

    peekNextToken() {
        const pointer = this.pointer;
        const tokenType = this.tokenType;
        const token = this.token;

        const nextToken = this.getNextToken();

        this.pointer = pointer;
        this.tokenType = tokenType;
        this.token = token;
        return nextToken;
    }

    advance() {
        return this.getNextToken();
    }

    getNextToken () {
        let token = '';
        while (this.hasMoreTokens()) {
            let character = this.data[this.pointer++];
            let nextCharacter = this.data[this.pointer];
            if (character === '\r' || character === '\n') {
                //  character = '';
            }
            token += character;

            //dont trim strings
            if (!token.startsWith("\"")) {
                token = token.trim();
            }

            // we are in a comment
            if (token.startsWith('//')
                || token.startsWith('/*')
                || character === '/' && nextCharacter === '/'
                || character === '/' && nextCharacter === '*'
            ) {
                if ((token.startsWith('//') && nextCharacter === '\n')
                    || (token.startsWith('/*') &&  this.data[this.pointer - 2] === '*' && character === '/')
                ) {
                    token = '';
                }
                // we are not in a comment
            } else {
                if (KEYWORDS.some(word => token.startsWith(word))) {
                    this.tokenType = TOKEN_KEYWORD;
                    this.token = token;
                    return token;
                }
                if (/^[a-zA-Z]+$/.test(token) && !/^[a-zA-Z]+$/.test(nextCharacter)) {
                    this.tokenType = TOKEN_IDENTIFIER;
                    this.token = token;
                    return token;
                }
                if (/^[0-9]+$/.test(token) && !/^[0-9]+$/.test(nextCharacter)) {
                    this.tokenType = TOKEN_INT_CONST;
                    this.token = token;
                    return token;
                }
                if (['{', '}', '(', ')', '[', ']', ',', '.', ';', '+', '-', '*', '/', '&', '|', '<', '>', '=', '~'].some(symbol => token.startsWith(symbol))) {
                    this.tokenType = TOKEN_SYMBOL;
                    this.token = token;
                    return token;
                }
                if (token.startsWith("\"") && character === '"' && token.split('"').length > 2) {
                    this.tokenType = TOKEN_STRING_CONST;
                    this.token = token;
                    return token;
                }
            }
        }
    }

    getTokenType() {
        return this.tokenType;
    }

    keyWord() {
        return this.token;
    }

    symbol() {
        return this.token;
    }

    identifier() {
        return this.token;
    }

    intVal() {
        return this.token;
    }

    stringVal() {
        return this.token.slice(1,-1);
    }
};