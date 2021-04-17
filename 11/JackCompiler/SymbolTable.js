module.exports = class SymbolTable {

    constructor() {
        this.classSymbolTable = {};
        this.subroutineSymbolTable = {};
    }

    startSubroutine() {
        this.subroutineSymbolTable = {};
    }

    define(name, type, kind) {
        const index = this.varCount(kind);
        if (kind === 'static' || kind === 'field') {
            this.classSymbolTable[name.toLowerCase()] = { name:name, type: type, kind:kind, index:index }
        } else if (kind === 'arg' || kind === 'var') {
            this.subroutineSymbolTable[name] = { name:name, type: type, kind:kind, index:index }
        }
    }

    varCount(kind) {
        let count = 0;
        if (kind === 'static' || kind === 'field') {
            for (const [key, value] of Object.entries(this.classSymbolTable)) {
                if (value.kind === kind) {
                    count++;
                }
            }
        } else if (kind === 'arg' || kind === 'var') {
            for (const [key, value] of Object.entries(this.subroutineSymbolTable)) {
                if (value.kind === kind) {
                    count++;
                }
            }
        }
        return count;
    }

    segment(kind) {
        if (kind === 'var') {
            return 'local'
        }
        if (kind === 'static') {
            return 'static'
        }
        if (kind === 'field') {
            return 'this'
        }
        if (kind === 'arg') {
            return 'argument'
        }
    }

    kindOf(name) {
        if (this.classSymbolTable[name.toLowerCase()]) {
            return this.classSymbolTable[name.toLowerCase()].kind
        }
        return this.subroutineSymbolTable[name].kind
    }

    typeOf(name) {
        if (this.classSymbolTable[name.toLowerCase()]) {
            return this.classSymbolTable[name.toLowerCase()].type
        }

        if (this.subroutineSymbolTable[name]) {
            return this.subroutineSymbolTable[name].type
        }
        return null;
    }

    indexOf(name) {
        if (this.classSymbolTable[name.toLowerCase()]) {
            return this.classSymbolTable[name.toLowerCase()].index
        }
        return this.subroutineSymbolTable[name].index
    }
};