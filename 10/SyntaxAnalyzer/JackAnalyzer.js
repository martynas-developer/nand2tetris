require('./Constants');
const JackTokenizer = require('./JackTokenizer');
const CompilationEngine = require('./CompilationEngine');
const fs = require('fs');
const path = require('path');

(function main() {
    const filePath = process.argv.slice(2).pop();
    if (fs.lstatSync(filePath).isDirectory()) {
        this.inputFiles = fs.readdirSync(filePath).filter(file => {
            return path.extname(file) === '.jack'
        }).map(file => filePath + '\\' + file);
    } else {

        this.inputFiles = [filePath];
    }

    for (let i = 1; i < inputFiles.length; i++) {
        let tokenizer = new JackTokenizer(inputFiles[i]);
        let compiled = new CompilationEngine(tokenizer);

        // write file
        let outputFile = inputFiles[i].substr(0, inputFiles[i].lastIndexOf(".")) + "_mano.xml";
        fs.writeFile(outputFile, compiled.getData().join('\r\n'), function (err) {
            if (err) return console.log(err);
        });
    }
})();