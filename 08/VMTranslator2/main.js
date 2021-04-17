const Parser = require('./Parser.js');
const CodeWriter = require('./CodeWriter.js');
const fs = require('fs');
const path = require('path')

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
    if (fs.lstatSync(filePath).isDirectory()) {
        this.inputFiles = fs.readdirSync(filePath).filter(file => {
            return path.extname(file) === '.vm'
        }).map(file => filePath + '\\' + file);
        this.outputFile = filePath + '\\' + path.basename(filePath) + '.asm';
    } else {
        this.inputFiles = [filePath];
        this.outputFile = filePath.substr(0, filePath.lastIndexOf('.')) + '.asm';
    }

    const codeWriter = new CodeWriter(outputFile);

    codeWriter.writeInit();

    for (let i = 0; i < inputFiles.length; i++) {
        let parser = new Parser(inputFiles[i]);
        codeWriter.setFileName(i);

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
            } else if (commandType === C_LABEL) {
                codeWriter.writeLabel(arg1);
            } else if (commandType === C_GOTO) {
                codeWriter.writeGoto(arg1);
            } else if (commandType === C_IF) {
                codeWriter.writeIf(arg1);
            } else if (commandType === C_FUNCTION) {
                codeWriter.writeFunction(arg1, arg2);
            } else if (commandType === C_CALL) {
                codeWriter.writeCall(arg1, arg2);
            } else if (commandType === C_RETURN) {
                codeWriter.writeReturn(arg1);
            }
        } while (parser.hasMoreCommands());
    }


    codeWriter.close();
})();







