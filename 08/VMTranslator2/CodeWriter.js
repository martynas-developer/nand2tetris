const fs = require('fs');

module.exports = class codeWriter {
    constructor(file) {
        this.file = file;
        this.data = [];

        this.comparisonIndex = 0;
        this.commandIndex = 0;
    }

    setFileName(fileName) {
        this.fileName = fileName;
    }

    writeInit() {
        this.data.push('@256');
        this.data.push('D=A');
        this.data.push('@SP');
        this.data.push('M=D');
        this.writeCall('Sys.init', 0);
    }

    incrementStackPointer() {
        this.data.push('@SP');
        this.data.push('M=M+1');
    }

    decrementStackPointer() {
        this.data.push('@SP');
        this.data.push('M=M-1');
    }

    writeComparison(comparison) {
        this.data.push(`@TRUE_${this.comparisonIndex}`);
        this.data.push(`D;${comparison}`);

        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('M=0');
        this.data.push(`@CONTINUE_${this.comparisonIndex}`);
        this.data.push('0;JMP');

        this.data.push(`(TRUE_${this.comparisonIndex})`);
        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('M=-1');

        this.data.push(`(CONTINUE_${this.comparisonIndex})`);
        this.comparisonIndex++;
    }

    selectLastTwo () {
        //select last 2 numbers in the stack
        this.decrementStackPointer();
        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('D=M');
        this.decrementStackPointer();
        this.data.push('@SP');
        this.data.push('A=M');
        // D=M[SP-1]
        // M=M[SP-2]
    }

    selectLast () {
        this.decrementStackPointer();
        this.data.push('@SP');
        this.data.push('A=M');
    }

    writeArithmetic(command) {
        this.data.push('// '.concat(command));
        this.data.push('@112');
        this.data.push('@112');
        if (command.startsWith('add')) {
            this.selectLastTwo();
            this.data.push('M=D+M');
        } else if (command.startsWith('sub')) {
            this.selectLastTwo();
            this.data.push('M=M-D');
        } else if (command.startsWith('neg')) {
            this.selectLast();
            this.data.push('M=-M');
        } else if (command.startsWith('eq')) {
            this.selectLastTwo();
            this.data.push('D=M-D');
            this.writeComparison('JEQ')
        } else if (command.startsWith('gt')) {
            this.selectLastTwo();
            this.data.push('D=M-D');
            this.writeComparison('JGT')
        } else if (command.startsWith('lt')) {
            this.selectLastTwo();
            this.data.push('D=M-D');
            this.writeComparison('JLT')
        } else if (command.startsWith('and')) {
            this.selectLastTwo();
            this.data.push('M=D&M');
        } else if (command.startsWith('or')) {
            this.selectLastTwo();
            this.data.push('M=D|M');
        } else if (command.startsWith('not')) {
            this.selectLast();
            this.data.push('M=!M');
        }
        this.incrementStackPointer();
    }

    writePush(segment, index) {
        this.data.push(`// push ${segment} ${index}`);
        this.data.push('@5113');
        this.data.push('@5113');
        if (segment === 'constant') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
        } else if (segment === 'local') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
            this.data.push(`@LCL`);
            this.data.push(`A=M+D`);
            this.data.push(`D=M`);
        } else if (segment === 'argument') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
            this.data.push(`@ARG`);
            this.data.push(`A=M+D`);
            this.data.push(`D=M`);
        } else if (segment === 'this') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
            this.data.push(`@THIS`);
            this.data.push(`A=M+D`);
            this.data.push(`D=M`);
        } else if (segment === 'that') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
            this.data.push(`@THAT`);
            this.data.push(`A=M+D`);
            this.data.push(`D=M`);
        } else if (segment === 'temp') {
            this.data.push(`@${parseInt(index)  + 5}`);
            this.data.push('D=M');
        } else if (segment === 'pointer') {
            if (index == 0) {
                this.data.push(`@3`);
            } else {
                this.data.push(`@4`);
            }
            this.data.push('D=M');
        } else if (segment === 'static') {
            this.data.push(`@static${this.fileName + index}`);
            this.data.push(`D=M`);
        }
        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('M=D');
        this.incrementStackPointer();
    }

    writePop(segment, index) {
        this.data.push(`// 505 ${segment} ${index}`);
        this.data.push('@12345');
        if (segment === 'local') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
            this.data.push('@LCL');
            this.data.push('D=M+D');
        } else if (segment === 'argument') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
            this.data.push('@ARG');
            this.data.push('D=M+D');
        } else if (segment === 'this') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
            this.data.push('@THIS');
            this.data.push('D=M+D');
        } else if (segment === 'that') {
            this.data.push(`@${index}`);
            this.data.push(`D=A`);
            this.data.push('@THAT');
            this.data.push('D=M+D');
        } else if (segment === 'temp') {
            this.data.push(`@${parseInt(index) + 5}`);
            this.data.push('D=A');
        } else if (segment === 'pointer') {
            if (index == 0) {
                this.data.push(`@3`);
            } else {
                this.data.push(`@4`);
            }
            this.data.push('D=A');
        } else if (segment === 'static') {
            this.data.push(`@static${this.fileName + index}`);
            this.data.push(`D=A`);
        }

        this.data.push('@R13');
        this.data.push('M=D');
        this.decrementStackPointer();
        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('D=M');
        this.data.push('@R13');
        this.data.push('A=M');
        this.data.push('M=D');

        this.data.push('@R13');
        this.data.push('M=0');
    }

    writeLabel(label) {
        this.data.push(`// label ${label}`);
        this.data.push('@111');
        this.data.push('@111');
        this.data.push(`(${label})`);
    }

    writeGoto(label) {
        this.data.push(`// goto ${label}`);
        this.data.push('@222');
        this.data.push('@222');
        this.data.push(`@${label}`);
        this.data.push(`0;JMP`);
    }

    writeIf(label) {
        this.data.push(`// if ${label}`);
        this.data.push('@16');
        this.data.push('@16');
        this.decrementStackPointer();
        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('D=M');
        this.data.push(`@${label}`);
        this.data.push('D;JNE');
    }

    writeFunction(functionName, numVars) {
        this.data.push(`// function ${functionName} ${numVars}`);
        this.data.push('@5151');
        this.data.push('@5151');
        this.data.push(`(${functionName})`);
        //initialize local variables to 0
        for (let i = 0; i < numVars; i++) {
            this.data.push('@LCL');
            this.data.push('D=M');
            this.data.push(`@${i}`);
            this.data.push(`A=A+D`);
            this.data.push(`M=0`);
            this.incrementStackPointer()
        }
    }

    writeCall(functionName, numArgs) {
        this.commandIndex++;
        this.data.push(`// call ${functionName} ${numArgs}`);
        this.data.push('@5252');
        this.data.push('@5252');
        // save state
        this.data.push(`@return_here_${this.commandIndex}`);
        this.data.push(`D=A`);
        this.data.push(`@SP`);
        this.data.push(`A=M`);
        this.data.push(`M=D`);
        this.incrementStackPointer();
        // LCL
        this.data.push(`@LCL`);
        this.data.push(`D=M`);
        this.data.push(`@SP`);
        this.data.push(`A=M`);
        this.data.push(`M=D`);
        this.data.push('@SP');
        this.data.push('D=M');
        this.data.push(`@4`);
        this.data.push(`D=D+A`);
        this.data.push(`@LCL`);
        this.data.push(`M=D`);

        this.incrementStackPointer();
        // ARG
        this.data.push(`@ARG`);
        this.data.push(`D=M`);
        this.data.push(`@SP`);
        this.data.push(`A=M`);
        this.data.push(`M=D`);
        this.data.push('@SP');
        this.data.push('D=M');
        this.data.push(`@${parseInt(numArgs)+2}`);
        this.data.push(`D=D-A`);
        this.data.push(`@ARG`);
        this.data.push(`M=D`);
        this.incrementStackPointer();
        // THIS
        this.data.push(`@THIS`);
        this.data.push(`D=M`);
        this.data.push(`@SP`);
        this.data.push(`A=M`);
        this.data.push(`M=D`);
        this.incrementStackPointer();
        // THAT
        this.data.push(`@THAT`);
        this.data.push(`D=M`);
        this.data.push(`@SP`);
        this.data.push(`A=M`);
        this.data.push(`M=D`);
         this.incrementStackPointer();


         this.data.push('@9999');
         this.data.push(`@${functionName}`);
         this.data.push(`0;JMP`);
        this.data.push(`(return_here_${this.commandIndex})`);
    }

    writeReturn() {
        this.data.push(`// return`);
        this.data.push('@666');
        this.data.push('@666');

        // remember return address
        this.data.push('@LCL');
        this.data.push('D=M');
        this.data.push('@5');
        this.data.push('A=D-A');
        this.data.push('D=M');
        this.data.push('@R13');
        this.data.push('M=D');
        // push last value on to the stack
        this.decrementStackPointer();
        this.data.push('A=M');
        this.data.push('D=M');
        this.data.push('@ARG');
        this.data.push('A=M');
        this.data.push('M=D');
        // reset SP
        this.data.push('@6677');
        this.data.push('@ARG');
        this.data.push('D=M+1');
        this.data.push('@SP');
        this.data.push('M=D');
        this.data.push('@6677');
        // reset THAT
        this.data.push('@LCL');
        this.data.push('D=M');
        this.data.push('@1');
        this.data.push('A=D-A');
        this.data.push('D=M');
        this.data.push('@THAT');
        this.data.push('M=D');
        // reset THIS
        this.data.push('@LCL');
        this.data.push('D=M');
        this.data.push('@2');
        this.data.push('A=D-A');
        this.data.push('D=M');
        this.data.push('@THIS');
        this.data.push('M=D');
        // reset ARG
        this.data.push('@LCL');
        this.data.push('D=M');
        this.data.push('@3');
        this.data.push('A=D-A');
        this.data.push('D=M');
        this.data.push('@ARG');
        this.data.push('M=D');
        // reset LCL
        this.data.push('@LCL');
        this.data.push('D=M');
        this.data.push('@4');
        this.data.push('A=D-A');
        this.data.push('D=M');
        this.data.push('@LCL');
        this.data.push('M=D');
        // return
        this.data.push('@R13');
        this.data.push('A=M');
        this.data.push(`0;JMP`);
    }

    close() {
        fs.writeFile(this.file, this.data.join('\r\n'), function (err) {
            if (err) return console.log(err);
        });
    }
};