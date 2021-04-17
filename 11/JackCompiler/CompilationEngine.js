const VMWriter = require('./VMWriter');
const SymbolTable = require('./SymbolTable');
const fs = require('fs');

module.exports = class CompilationEngine {

    constructor(tokenizer, filepath) {
        this.labelIndex = 0;
        this.data = [];
        this.tokenizer = tokenizer;
        this.indendation = 0;
        this.VMWriter = new VMWriter(filepath);
        this.compileClass();

        let outputFile = filepath.substr(0, filepath.lastIndexOf(".")) + ".vm";
        fs.writeFile(outputFile, this.VMWriter.data.join('\r\n'), function (err) {
            if (err) return console.log(err);
        });
    }

    compileClass() {
        while (this.tokenizer.hasMoreTokens()) {
            if (this.tokenizer.token === KEYWORD_CLASS) {
                this.symbolTable = new SymbolTable();

                this.eat('class');

                this.currentclass = this.tokenizer.identifier();
                this.tokenizer.advance();
                this.eat('{');

                while ([KEYWORD_FUNCTION, KEYWORD_CONSTRUCTOR, KEYWORD_METHOD, KEYWORD_STATIC, KEYWORD_STATIC, KEYWORD_FIELD].some(symbol => this.tokenizer.token.startsWith(symbol))) {
                    this.symbolTable.startSubroutine();
                    if (this.tokenizer.token === KEYWORD_FUNCTION) {
                        this.compileSubroutineDec();
                    } else if (this.tokenizer.token === KEYWORD_CONSTRUCTOR) {
                        this.compileSubroutineDec();
                    } else if (this.tokenizer.token === KEYWORD_METHOD) {
                        this.symbolTable.define('this', this.currentclass, 'arg');
                        this.compileSubroutineDec();
                    } else if (this.tokenizer.token === KEYWORD_STATIC) {
                        this.compileClassVarDec();
                    } else if (this.tokenizer.token === KEYWORD_VAR) {
                        this.compileClassVarDec();
                    } else if (this.tokenizer.token === KEYWORD_FIELD) {
                        this.compileClassVarDec();
                    }
                }

                this.eat('}');
            }
            this.tokenizer.advance();
        }
    }

    compileClassVarDec() {
        const kind = this.tokenizer.keyWord();
        this.tokenizer.advance();
        const type = this.tokenizer.identifier();
        this.tokenizer.advance();

        while (this.tokenizer.token !== ';') {

            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                const name = this.tokenizer.identifier();
                this.symbolTable.define(name, type, kind);
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {

            }
            this.tokenizer.advance();
        }

        this.eat(';');
    }

    compileSubroutineDec() {
        const type = this.tokenizer.token;

        this.tokenizer.advance();

        this.tokenizer.advance();

        const subroutineIdentifier = this.tokenizer.keyWord();

        this.tokenizer.advance();

        this.eat('(');

        this.compileParameterList();

        this.eat(')');


        this.compileSubroutineBody(subroutineIdentifier, type);
    }

    compileParameterList() {
        let nArgs = 0;

        if (this.tokenizer.token !== ')') {
            const type = this.tokenizer.identifier();
            this.tokenizer.advance();
            const name = this.tokenizer.identifier();
            this.tokenizer.advance();
            this.symbolTable.define(name, type, 'arg');
            nArgs++;
            while (this.tokenizer.token === ',') {
                this.tokenizer.advance();
                const type = this.tokenizer.identifier();
                this.tokenizer.advance();
                const name = this.tokenizer.identifier();
                this.tokenizer.advance();
                this.symbolTable.define(name, type, 'arg');
                nArgs++;
            }
        }
        return nArgs;
    }

    compileSubroutineBody(subroutineIdentifier, type) {
        this.eat('{');

        while (this.tokenizer.token === KEYWORD_VAR) {
            this.compileVarDec();
        }
        this.VMWriter.writeFunction(`${this.currentclass}.${subroutineIdentifier}`, this.symbolTable.varCount('var'));

        if (type === 'method'){
            this.VMWriter.writePush('argument', 0);
            this.VMWriter.writePop('pointer', 0)
        }
        if (type === 'constructor'){
            const varCount = this.symbolTable.varCount('field');
            if (varCount > 0) {
                this.VMWriter.writePush('constant', varCount);
                this.VMWriter.writeCall('Memory.alloc', 1);
                this.VMWriter.writePop('pointer',0);
            }
        }
        this.compileStatements();

        this.eat('}');
    }

    compileVarDec() {
        const kind = this.tokenizer.keyWord();

        this.eat('var');
        const type = this.tokenizer.identifier();
        this.tokenizer.advance();

        while (this.tokenizer.token !== ';') {
            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                const name = this.tokenizer.identifier();

                this.symbolTable.define(name, type, kind);
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {

            }
            this.tokenizer.advance();
        }

        this.eat(';');
    }

    compileStatements() {
        while ([KEYWORD_LET, KEYWORD_RETURN, KEYWORD_WHILE, KEYWORD_DO, KEYWORD_IF].some(symbol => this.tokenizer.token.startsWith(symbol))) {
            if (this.tokenizer.token === KEYWORD_LET) {
                this.compileLet();
            } else if (this.tokenizer.token === KEYWORD_RETURN) {
                this.compileReturn();
            } else if (this.tokenizer.token === KEYWORD_WHILE) {
                this.compileWhile();
            } else if (this.tokenizer.token === KEYWORD_DO) {
                this.compileDo();
            } else if (this.tokenizer.token === KEYWORD_IF) {
                this.compileIf();
            }
        }
    }

    compileLet() {
        this.eat('let');

        const varName = this.tokenizer.token;
        let array = false;
        let isMethod = true;

        while (this.tokenizer.token !== '=') {
            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                if (this.tokenizer.peekNextToken() === '.') {
                    isMethod = false;
                }
                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                array = true;
                this.VMWriter.writePush(
                    this.symbolTable.segment(this.symbolTable.kindOf(varName)),
                    this.symbolTable.indexOf(varName)
                );
                this.tokenizer.advance();
                this.compileExpression();

                this.tokenizer.advance();
                this.VMWriter.writeArithmetic('add');
            }
        }

        this.eat('=');

        this.compileExpression();

        this.eat(';');

        if (array) {
            this.VMWriter.writePop('temp',0);
            //pop base+index into 'that'
            this.VMWriter.writePop('pointer',1);
            //pop expression value into *(base+index)
            this.VMWriter.writePush('temp',0);
            this.VMWriter.writePop('that',0);
        } else {
            this.VMWriter.writePop(
                this.symbolTable.segment(this.symbolTable.kindOf(varName)),
                this.symbolTable.indexOf(varName)
            )
        }

    }

    compileIf() {
        this.eat('if');

        this.eat('(');

        this.compileExpression();

        const ifTrue = `IF_TRUE` + this.labelIndex++;
        const ifFalse = `IF_FALSE` + this.labelIndex++;

        this.VMWriter.writeIf(ifTrue);
        this.VMWriter.writeGoto(ifFalse);

        this.VMWriter.writeLabel(ifTrue);

        this.eat(')');

        this.eat('{');

        this.compileStatements();

        this.eat('}');

        if (this.tokenizer.token === KEYWORD_ELSE) {
            this.eat('else');
            this.eat('{');

            const ifEnd = `IF_END` + this.labelIndex++;
            this.VMWriter.writeGoto(ifEnd);
            this.VMWriter.writeLabel(ifFalse);
            this.compileStatements();
            this.VMWriter.writeLabel(ifEnd);
            this.eat('}');
        } else {
            this.VMWriter.writeLabel(ifFalse)
        }
    }

    compileWhile() {
        this.eat('while');

        const whileContinue = `WHILE_CONTINUE` + this.labelIndex++;
        const whileEnd = `WHILE_END` + this.labelIndex++;
        this.VMWriter.writeLabel(whileContinue);
        this.eat('(');


        this.compileExpression();

        this.eat(')');
        this.VMWriter.writeArithmetic('not');
        this.VMWriter.writeIf(whileEnd);
        this.eat('{');


        this.compileStatements();


        this.eat('}');
        this.VMWriter.writeGoto(whileContinue);
        this.VMWriter.writeLabel(whileEnd);
    }

    compileDo() {
        let name = '';
        let nArgs = 0;
        let isMethod = true;
        this.eat('do');

        while (this.tokenizer.token !== ';') {
            if (['('].some(symbol => this.tokenizer.token.startsWith(symbol))) {
                this.tokenizer.advance();
                if (isMethod) {
                    this.VMWriter.writePush('pointer', 0);
                    name = this.currentclass + '.' + name;
                    nArgs++;
                }
                nArgs += this.compileExpressionList();

                this.tokenizer.advance();
                break;
            } else if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                if (this.tokenizer.peekNextToken() === '.') {
                    isMethod = false;
                }

                if (this.symbolTable.typeOf(this.tokenizer.token)) {
                    this.VMWriter.writePush(
                        this.symbolTable.segment(this.symbolTable.kindOf(this.tokenizer.token)),
                        this.symbolTable.indexOf(this.tokenizer.token)
                    );
                    name += this.symbolTable.typeOf(this.tokenizer.token);
                    nArgs++;
                } else {
                    name += this.tokenizer.identifier();
                }

            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {
                name += this.tokenizer.symbol();
            }
            this.tokenizer.advance();
        }

        this.VMWriter.writeCall(name, nArgs);
        this.VMWriter.writePop('temp', 0);
        this.eat(';');

    }

    compileReturn() {
        this.eat('return');

        if (this.tokenizer.token === ';') {
            this.VMWriter.writePush('constant', 0)
        }

        while (this.tokenizer.token !== ';') {
            this.compileExpression();
        }

        this.eat(';');

        this.VMWriter.writeReturn();
    }

    compileExpressionList() {
        let nArgs = 0;
        while (this.tokenizer.token !== ')') {
            this.compileExpression();
            nArgs++;
            while (this.tokenizer.token === ',') {
                this.eat(',');
                this.compileExpression();
                nArgs++;
            }
        }
        return nArgs;
    }

    compileExpression() {
        this.compileTerm();

        while (['+', '-', '*', '/', '&', '|', '<', '>', '='].some(symbol => this.tokenizer.token.startsWith(symbol))) {
            const token = this.tokenizer.symbol();
            this.tokenizer.advance();

            this.compileTerm();

            if (token === '*') {
                this.VMWriter.writeCall('Math.multiply', 2)
            } else if (token === '/') {
                this.VMWriter.writeCall('Math.divide', 2)
            } else if (token === '-') {
                this.VMWriter.writeArithmetic(`sub`)
            } else if (token === '+') {
                this.VMWriter.writeArithmetic(`add`)
            } else if (token === '&') {
                this.VMWriter.writeArithmetic(`and`)
            } else if (token === '|') {
                this.VMWriter.writeArithmetic(`or`)
            } else if (token === '<') {
                this.VMWriter.writeArithmetic(`lt`)
            } else if (token === '>') {
                this.VMWriter.writeArithmetic(`gt`)
            } else if (token === '=') {
                this.VMWriter.writeArithmetic(`eq`)
            }
        }
    }

    compileTerm() {

        if ((this.tokenizer.getTokenType() === TOKEN_IDENTIFIER && ['(', '[', '.'].some(symbol => this.tokenizer.peekNextToken().startsWith(symbol)))
            || this.tokenizer.token === '(') {
            let compileParameterList = this.tokenizer.getTokenType() === TOKEN_IDENTIFIER && (this.tokenizer.peekNextToken() === '{' || this.tokenizer.peekNextToken() === '(' || this.tokenizer.peekNextToken() === '.');

            let name = '';
            let newKeyword = false;
            let typeOf = '';
            let nArgs = 0;
            while (![')', ']'].some(symbol => this.tokenizer.token.startsWith(symbol))) {

                if (this.tokenizer.token === 'new' && this.symbolTable.typeOf(name.slice(0, -1))) {
                    newKeyword = true;
                }

                if (this.symbolTable.typeOf(this.tokenizer.token)) {
                    name += this.symbolTable.typeOf(this.tokenizer.token);
                    typeOf = this.symbolTable.typeOf(this.tokenizer.token);
                    nArgs++;
                } else {
                    name += this.tokenizer.token;
                }

                if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {
                    this.tokenizer.advance();
                } else if (this.tokenizer.getTokenType() === TOKEN_INT_CONST) {
                    this.tokenizer.advance();
                } else if (this.tokenizer.getTokenType() === TOKEN_STRING_CONST) {

                    this.tokenizer.advance();
                } else if (this.tokenizer.getTokenType() === TOKEN_KEYWORD) {

                    this.tokenizer.advance();
                } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {

                    if (this.tokenizer.token === '(') {
                        if (newKeyword) {
                            const varCount = this.symbolTable.varCount('field');
                            if (varCount > 0 && !this.symbolTable.typeOf(name.slice(0, -5).toLowerCase())) {
                                this.VMWriter.writePush('constant', varCount);
                                this.VMWriter.writeCall('Memory.alloc', 1);
                                this.VMWriter.writePop('pointer', 0);
                            }

                        }
                        this.tokenizer.advance();
                        if (compileParameterList) {
                            nArgs = this.compileExpressionList();
                        } else {
                             this.compileExpression();
                        }
                        if (name.slice(0, -1)) {
                            if (typeOf && nArgs === 0) {
                                nArgs++;
                                this.VMWriter.writePush('this', this.symbolTable.indexOf(typeOf))
                            }
                            this.VMWriter.writeCall(name.slice(0, -1), nArgs)
                        }

                    } else if (this.tokenizer.token === '[') {
                        this.VMWriter.writePush(
                            this.symbolTable.segment(this.symbolTable.kindOf(name.slice(0, -1))),
                            this.symbolTable.indexOf(name.slice(0, -1))
                        );
                        this.tokenizer.advance();
                        this.compileExpression();
                        this.VMWriter.writeArithmetic('add');

                        this.VMWriter.writePop('pointer',1);

                        this.VMWriter.writePush('that',0);
                    } else {
                        this.tokenizer.advance();
                    }
                }
            }

            this.tokenizer.advance();
        } else {
            if (this.tokenizer.getTokenType() === TOKEN_IDENTIFIER) {

                this.VMWriter.writePush(
                    this.symbolTable.segment(this.symbolTable.kindOf(this.tokenizer.identifier())),
                    this.symbolTable.indexOf(this.tokenizer.identifier())
                );
                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_INT_CONST) {
                this.VMWriter.writePush('constant', this.tokenizer.intVal());
                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_STRING_CONST) {
                const str = this.tokenizer.stringVal();
                this.VMWriter.writePush('constant', str.split('').length);
                this.VMWriter.writeCall('String.new',1);
                for (let i = 0; i < str.length; i++){
                    this.VMWriter.writePush('constant',str[i].charCodeAt(0));
                    this.VMWriter.writeCall("String.appendChar",2);
                }

                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_KEYWORD) {
                if (this.tokenizer.keyWord() === 'true') {
                    this.VMWriter.writePush('constant', 0);
                    this.VMWriter.writeArithmetic('not');
                }
                if (this.tokenizer.keyWord() === 'false' || this.tokenizer.keyWord() === 'null') {
                    this.VMWriter.writePush('constant', 0);
                }
                if (this.tokenizer.keyWord() === 'this') {
                    this.VMWriter.writePush('pointer',0);
                }

                this.tokenizer.advance();
            } else if (this.tokenizer.getTokenType() === TOKEN_SYMBOL) {


                if (this.tokenizer.token === '~' || this.tokenizer.token === '-') {
                    let token = this.tokenizer.token;
                    this.tokenizer.advance();
                    this.compileTerm();
                    if (token === '~') {
                        this.VMWriter.writeArithmetic('not')
                    }
                    if (token === '-') {
                        this.VMWriter.writeArithmetic('neg')
                    }

                }
            }

        }
    }

    eat(string) {
        if (string !== this.tokenizer.token) {
            throw `incorrect token: '${this.tokenizer.token}'. Expected '${string}' `;
        } else {
            this.tokenizer.advance()
        }
    }
};