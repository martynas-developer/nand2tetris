const Parser = require('./Parser.js');
const CodeWriter = require('./CodeWriter.js');

global.C_ARITHMETIC = 1;
global.C_PUSH = 2;
global.C_POP = 3;
global.C_LABEL = 4;
global.C_GOTO = 5;
global.C_IF = 6;
global.C_FUNCTION = 7;
global.C_RETURN = 8;
global.C_CALL = 9;

(function main() {
    const filePath = process.argv.slice(2).pop();
    const outputFile = filePath.substr(0, filePath.lastIndexOf(".")) + ".asm";

    const parser = new Parser(filePath);
    const codeWriter = new CodeWriter(outputFile);

    do {
        const currentCommand = parser.advance();
        const commandType = parser.commandType();
        const arg1 = parser.arg1();
        const arg2 = parser.arg2();

        if (commandType === C_ARITHMETIC) {
            codeWriter.writeArithmetic(currentCommand);
        } else if (commandType === C_POP) {
            codeWriter.writePop(arg1, arg2);
        } else if (commandType === C_PUSH) {
            codeWriter.writePush(arg1, arg2);
        }

    } while (parser.hasMoreCommands());

    codeWriter.close();
})();







