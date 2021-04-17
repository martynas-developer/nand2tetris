const fs = require('fs');

module.exports = class VMWriter {
    // creates a new output file and prepares it for writing
    constructor(filepath) {
        this.data = [];
        // write file
        // let outputFile = inputFiles[i].substr(0, inputFiles[i].lastIndexOf(".")) + "_mano.vm";
        // fs.writeFile(outputFile, compiled.getData().join('\r\n'), function (err) {
        //     if (err) return console.log(err);
        // });
    }

    writePush(segment, index) {
        this.data.push(`push ${segment} ${index}`);
    }

    writePop(segment, index) {
        this.data.push(`pop ${segment} ${index}`);
    }

    writeArithmetic(command) {
        //change to symbols
        this.data.push(`${command}`);
    }

    writeLabel(label) {
        this.data.push(`label ${label}`);
    }

    writeGoto(label) {
        this.data.push(`goto ${label}`);
    }

    writeIf(label) {
        this.data.push(`if-goto ${label}`);
    }

    writeCall(name, nArgs) {
        this.data.push(`call ${name} ${nArgs}`);
    }

    writeFunction(name, nLocals) {
        this.data.push(`function ${name} ${nLocals}`);
    }

    writeReturn() {
        this.data.push(`return`);
    }

    close() {

    }
};