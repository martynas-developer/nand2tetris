module.exports = class CompilationEngine {

    constructor(tokenizer) {
        this.data = [];
        this.tokenizer = tokenizer;
        this.indendation = 0;
        this.compileClass();
    }

    getData() {
        return this.data;
    }

    pushWithIndentationIncrease(data) {
        this.pushData(data);
        this.indendation++;
    }

    pushWithIndentationDecrease(data) {
        this.indendation--;
        this.pushData(data);
    }

    pushData(data) {
        this.data.push(' '.repeat(this.indendation * 4) + data);
    }

    compileClass() {
        while (this.tokenizer.hasMoreTokens()) {
            if (this.tokenizer.token === KEYWORD_CLASS) {
                this.eat('class');
                this.pushWithIndentationIncrease('<class>');
                this.pushData(`<keyword>class</keyword>`);
                this.pushData(`<indentifier>${this.tokenizer.identifier()}</indentifier>`);
                this.tokenizer.advance();
                this.eat('{');
                this.compileSymbol('{');

                while (this.tokenizer.token !== '}') {
                    if (this.tokenizer.token === KEYWORD_FUNCTION) {
                        this.compileSubroutineDec();
                    } else if (this.tokenizer.token === KEYWORD_CONSTRUCTOR) {
                        this.compileSubroutineDec();
                    } else if (this.tokenizer.token === KEYWORD_METHOD) {
                        this.compileSubroutineDec();
                    } else if (this.tokenizer.token === KEYWORD_STATIC) {
                        this.compileClassVarDec();
                    } else if (this.tokenizer.token === KEYWORD_FIELD) {
                        this.compileClassVarDec();
                    } else {
                        this.tokenizer.advance();
                    }
                }

                this.eat('}');
                this.compileSymbol('}');
                this.pushWithIndentationDecrease('</class>');
            }
            this.tokenizer.advance();
        }
    }

    compileClassVarDec() {
        this.pushWithIndentationIncrease('<classVarDec>');

        this.pushData(`<keyword>${this.tokenizer.keyWord()}</keyword>`);
        this.tokenizer.advance();
        this.pushData(`<identifier>${this.tokenizer.identifier()}</identifier>`);
        this.tokenizer.advance();

        while (this.tokenizer.token !== ';') {

            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                this.pushData(`<identifier>${this.tokenizer.identifier()}</identifier>`);
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                this.compileSymbol(this.tokenizer.symbol())
            }
            this.tokenizer.advance();
        }

        this.eat(';');
        this.compileSymbol(';');

        this.pushWithIndentationDecrease('</classVarDec>');
    }

    compileSubroutineDec() {
        this.pushWithIndentationIncrease('<subroutineDec>');

        this.pushData(`<keyword>${this.tokenizer.keyWord()}</keyword>`);
        this.tokenizer.advance();
        this.pushData(`<keyword>${this.tokenizer.keyWord()}</keyword>`);
        this.tokenizer.advance();
        this.pushData(`<indentifier>${this.tokenizer.identifier()}</indentifier>`);
        this.tokenizer.advance();

        this.eat('(');
        this.compileSymbol('(');

        this.compileParameterList();

        this.eat(')');
        this.compileSymbol(')');

        this.compileSubroutineBody();

        this.pushWithIndentationDecrease('</subroutineDec>');
    }

    compileParameterList() {
        this.pushWithIndentationIncrease('<parameterList>');
        while (this.tokenizer.token !== ')') {
            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                this.pushData(`<identifier>${this.tokenizer.identifier()}</identifier>`);
            } else if (this.tokenizer.getTokenType() === TOKEN_KEYWORD) {
                this.pushData(`<keyword>${this.tokenizer.keyWord()}</keyword>`);
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                this.compileSymbol(this.tokenizer.symbol())
            }
            this.tokenizer.advance();
        }
        this.pushWithIndentationDecrease('</parameterList>');
    }

    compileSubroutineBody() {
        this.pushWithIndentationIncrease('<subroutineBody>');

        this.eat('{');
        this.compileSymbol('{');

        while (this.tokenizer.token === KEYWORD_VAR) {
            this.compileVarDec();
        }

        this.compileStatements();

        this.eat('}');
        this.compileSymbol('}');

        this.pushWithIndentationDecrease('</subroutineBody>');
    }

    compileVarDec() {
        this.pushWithIndentationIncrease('<varDec>');

        this.eat('var');
        this.pushData(`<keyword>var</keyword>`);

        this.pushData(`<identifier>${this.tokenizer.keyWord()}</identifier>`);
        this.tokenizer.advance();

        while (this.tokenizer.token !== ';') {
            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                this.pushData(`<identifier>${this.tokenizer.identifier()}</identifier>`);
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                this.compileSymbol(this.tokenizer.symbol())
            }
            this.tokenizer.advance();
        }

        this.eat(';');
        this.compileSymbol(';');

        this.pushWithIndentationDecrease('</varDec>');
    }

    compileStatements() {
        this.pushWithIndentationIncrease('<statements>');

        while (this.tokenizer.token !== '}') {
            if (this.tokenizer.token === KEYWORD_LET) {
                this.compileLet();
            }
            if (this.tokenizer.token === KEYWORD_RETURN) {
                this.compileReturn();
            }
            if (this.tokenizer.token === KEYWORD_WHILE) {
                this.compileWhile();
            }
            if (this.tokenizer.token === KEYWORD_DO) {
                this.compileDo();
            }
            if (this.tokenizer.token === KEYWORD_IF) {
                this.compileIf();
            }
        }

        this.pushWithIndentationDecrease('</statements>');
    }

    compileLet() {
        this.pushWithIndentationIncrease('<letStatment>')

        this.eat('let');
        this.pushData(`<keyword>let</keyword>`);

        while (this.tokenizer.token !== '=') {
            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                this.pushData(`<identifier>${this.tokenizer.identifier()}</identifier>`);
                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                this.compileSymbol(this.tokenizer.token);
                this.tokenizer.advance();
                this.compileExpression();

                this.compileSymbol(this.tokenizer.token);
                this.tokenizer.advance();
            }
        }

        this.eat('=');
        this.compileSymbol('=');

        this.compileExpression();

        this.eat(';');
        this.compileSymbol(';');

        this.pushWithIndentationDecrease('</letStatment>')
    }

    compileIf() {
        this.eat('if');
        this.pushWithIndentationIncrease('<ifStatement>');
        this.pushData(`<keyword>if</keyword>`);

        this.eat('(');
        this.compileSymbol('(');

        this.compileExpression();

        this.eat(')');
        this.compileSymbol(')');

        this.eat('{');
        this.compileSymbol('{');

        this.compileStatements();

        this.eat('}');
        this.compileSymbol('}');

        if (this.tokenizer.token === KEYWORD_ELSE) {
            this.eat('else');
            this.pushData(`<keyword>else</keyword>`);
            this.eat('{');
            this.compileSymbol('{');

            this.compileStatements();

            this.eat('}');
            this.compileSymbol('}');
        }

        this.pushWithIndentationDecrease('</ifStatement>');
    }

    compileSymbol(symbol) {
        this.pushData(`<symbol>${symbol
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')}</symbol>`);
    }

    compileWhile() {
        this.eat('while');
        this.pushWithIndentationIncrease('<whileStatement>');
        this.pushData(`<keyword>while</keyword>`);

        this.eat('(');
        this.compileSymbol('(');

        this.compileExpression();

        this.eat(')');
        this.compileSymbol(')');

        this.eat('{');
        this.compileSymbol('{');

        this.compileStatements();


        this.eat('}');
        this.compileSymbol('}');

        this.pushWithIndentationDecrease('</whileStatement>');
    }

    compileDo() {
        this.eat('do');
        this.pushWithIndentationIncrease('<doStatement>');
        this.pushData(`<keyword>do</keyword>`);

        while (this.tokenizer.token !== ';') {
            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                this.pushData(`<identifier>${this.tokenizer.identifier()}</identifier>`);
            }
            if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                this.compileSymbol(this.tokenizer.symbol());
            }
            if (['('].some(symbol => this.tokenizer.token.startsWith(symbol))) {
                this.tokenizer.advance();
                this.compileExpressionList();
                this.compileSymbol(this.tokenizer.symbol());
                this.tokenizer.advance();

                break;
            }

            this.tokenizer.advance();
        }

        this.eat(';');
        this.compileSymbol(';');

        this.pushWithIndentationDecrease('</doStatement>');
    }

    compileReturn() {
        this.pushWithIndentationIncrease('<returnStatement>');
        this.eat('return');
        this.pushData(`<keyword>return</keyword>`);

        while (this.tokenizer.token !== ';') {
            this.compileExpression();
        }

        this.eat(';');
        this.compileSymbol(';');

        this.pushWithIndentationDecrease('</returnStatement>');
    }

    compileExpressionList() {
        this.pushWithIndentationIncrease('<expressionList>');

        while (this.tokenizer.token !== ')') {
            if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                if (this.tokenizer.token === '(') {
                    this.compileExpression();
                } else {
                    this.compileSymbol(this.tokenizer.symbol());
                    this.tokenizer.advance();
                }
            } else {
                this.compileExpression();
            }
        }

        this.pushWithIndentationDecrease('</expressionList>');
    }

    compileExpression() {
        this.pushWithIndentationIncrease('<expression>');

        while (![';', ')', '}', ',', ']'].some(symbol => this.tokenizer.token.startsWith(symbol))) {
            if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                if (this.tokenizer.token === '(' || this.tokenizer.token === '~' || (this.tokenizer.token === '-' && this.tokenizer.peekNextTokenType() !== TOKEN_INT_CONST)) {
                    this.compileTerm();
                } else {
                    this.compileSymbol(this.tokenizer.symbol());
                    this.tokenizer.advance();
                }
            } else {
                this.compileTerm();
            }
        }
        this.pushWithIndentationDecrease('</expression>');
    }

    compileTerm() {
        this.pushWithIndentationIncrease('<term>');

        // This is unreadable :////////////

        if ((this.tokenizer.getTokenType() === TOKEN_IDENTIFIER && ['(', '[', '.'].some(symbol => this.tokenizer.peekNextToken().startsWith(symbol)))
            || this.tokenizer.token === '(') {
            let compileParameterList=this.tokenizer.getTokenType() === TOKEN_IDENTIFIER && (this.tokenizer.peekNextToken() === '{' || this.tokenizer.peekNextToken() === '(' || this.tokenizer.peekNextToken() === '.');

            while (![')', ']'].some(symbol => this.tokenizer.token.startsWith(symbol))) {
                if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                    this.pushData(`<identifier>${this.tokenizer.identifier()}</identifier>`);
                    this.tokenizer.advance();
                } else if (this.tokenizer.getTokenType() === TOKEN_INT_CONST) {
                    this.pushData(`<integerConstant>${this.tokenizer.intVal()}</integerConstant>`);
                    this.tokenizer.advance();
                } else if (this.tokenizer.getTokenType() === TOKEN_STRING_CONST) {
                    this.pushData(`<stringConstant>${this.tokenizer.stringVal()}</stringConstant>`);
                    this.tokenizer.advance();
                } else if (this.tokenizer.getTokenType() === TOKEN_KEYWORD) {
                    this.pushData(`<keyword>${this.tokenizer.keyWord()}</keyword>`);
                    this.tokenizer.advance();
                } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                    this.compileSymbol(this.tokenizer.symbol());
                    if (this.tokenizer.token === '(') {
                        this.tokenizer.advance();
                        if (compileParameterList) {
                            this.compileExpressionList();
                        } else {
                            this.compileExpression();
                        }
                    } else if (this.tokenizer.token === '[') {
                        this.tokenizer.advance();
                        this.compileExpression();
                    } else {
                        this.tokenizer.advance();
                    }
                }
            }

            this.compileSymbol(this.tokenizer.symbol());
            this.tokenizer.advance();
        } else {
            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                this.pushData(`<identifier>${this.tokenizer.identifier()}</identifier>`);
                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_INT_CONST) {
                this.pushData(`<integerConstant>${this.tokenizer.intVal()}</integerConstant>`);
                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_STRING_CONST) {
                this.pushData(`<stringConstant>${this.tokenizer.stringVal()}</stringConstant>`);
                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_KEYWORD) {
                this.pushData(`<keyword>${this.tokenizer.keyWord()}</keyword>`);
                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                this.compileSymbol(this.tokenizer.symbol());
                if (this.tokenizer.token === '~' || (this.tokenizer.token === '-' && this.tokenizer.peekNextTokenType() !== TOKEN_INT_CONST)) {
                    this.tokenizer.advance();
                    this.compileTerm();
                }
            }

        }

        this.pushWithIndentationDecrease('</term>');
    }

    eat(string) {
        if (string !== this.tokenizer.token) {
            throw `incorrect token: '${this.tokenizer.token}'. Expected '${string}' `;
        } else {
            this.tokenizer.advance()
        }
    }
};