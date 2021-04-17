require('./Constants');
const JackTokenizer = require('./JackTokenizer');
const CompilationEngine = require('./CompilationEngine');
const fs = require('fs');
const path = require('path');

//node 'C:\\projects\\JackCompiler\\JackCompiler.js' 'C:\\Users\\mar7i\\Desktop\\nand2tetris\\projects\\12\\ArrayTest'



(function main() {
    const filePath = process.argv.slice(2).pop();
    if (fs.lstatSync(filePath).isDirectory()) {
        this.inputFiles = fs.readdirSync(filePath).filter(file => {
            return path.extname(file) === '.jack'
        }).map(file => filePath + '\\' + file);
    } else {
        this.inputFiles = [filePath];
    }

    for (let i = 0; i < inputFiles.length; i++) {
        let tokenizer = new JackTokenizer(inputFiles[i]);
        new CompilationEngine(tokenizer, inputFiles[i]);
    }
})();