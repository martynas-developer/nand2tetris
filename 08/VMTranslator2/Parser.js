const fs = require('fs');

module.exports = class Parser {

    constructor(filePath) {
        this.data = fs.readFileSync(filePath, {encoding: 'utf-8'}, function(err,data) {
            if (err) throw err;
            return data;
        })
            .split('\r\n')
            .filter(command => !command.startsWith('//') && command);
    }

    advance() {
        if (typeof this.index === 'undefined') {
            this.index = 0;
        } else {
            this.index++;
        }
        return this.data[this.index];
    }

    hasMoreCommands() {
        return typeof this.data[this.index + 1] !== 'undefined';
    }

    commandType() {
        const command = this.data[this.index];
        if (command.startsWith('push')) return C_PUSH;
        if (command.startsWith('pop')) return C_POP;
        if (['add', 'sub', 'neg', 'eq', 'gt', 'lt', 'and', 'or', 'not'].some(word => command.startsWith(word))) return C_ARITHMETIC;
        if (command.startsWith('label')) return C_LABEL;
        if (command.startsWith('if-goto')) return C_IF;
        if (command.startsWith('goto')) return C_GOTO;
        if (command.startsWith('function')) return C_FUNCTION;
        if (command.startsWith('call')) return C_CALL;
        if (command.startsWith('return')) return C_RETURN;
    }

    arg1() {
        const command = this.data[this.index];
        return command.split(' ')[1];
    }

    arg2() {
        const command = this.data[this.index];
        return command.split(' ')[2];
    }
};