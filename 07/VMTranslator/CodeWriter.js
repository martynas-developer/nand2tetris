const fs = require('fs');

module.exports = class codeWriter {
    constructor(file) {
        this.file = file;
        this.data = [];

        this.comparison_index = 0;
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

        this.data.push(`@TRUE_${this.comparison_index}`);
        this.data.push(`D;${comparison}`);

        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('M=0');
        this.data.push(`@CONTINUE_${this.comparison_index}`);
        this.data.push('0;JMP');

        this.data.push(`(TRUE_${this.comparison_index})`);
        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('M=-1');

        this.data.push(`(CONTINUE_${this.comparison_index})`);
        this.comparison_index++;
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
        if (command === 'add') {
            this.selectLastTwo();
            this.data.push('M=D+M');
        } else if (command === 'sub') {
            this.selectLastTwo();
            this.data.push('M=M-D');
        } else if (command === 'neg') {
            this.selectLast();
            this.data.push('M=-M');
        } else if (command === 'eq') {
            this.selectLastTwo();
            this.data.push('D=M-D');
            this.writeComparison('JEQ')
        } else if (command === 'gt') {
            this.selectLastTwo();
            this.data.push('D=M-D');
            this.writeComparison('JGT')
        } else if (command === 'lt') {
            this.selectLastTwo();
            this.data.push('D=M-D');
            this.writeComparison('JLT')
        } else if (command === 'and') {
            this.selectLastTwo();
            this.data.push('M=D&M');
        } else if (command === 'or') {
            this.selectLastTwo();
            this.data.push('M=D|M');
        } else if (command === 'not') {
            this.selectLast();
            this.data.push('M=!M');
        }
        this.incrementStackPointer();
    }

    writePush(segment, index) {
        this.data.push(`// push ${segment} ${index}`);
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
            const staticBase = 16;
            this.data.push(`@${16 + parseInt(index)}`);
            this.data.push(`D=M`);
        }
        this.data.push('@SP');
        this.data.push('A=M');
        this.data.push('M=D');
        this.incrementStackPointer();
    }

    writePop(segment, index) {
        this.data.push(`// pop ${segment} ${index}`);
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
            this.data.push(`@${parseInt(index)  + 5}`);
            this.data.push('D=A');
        } else if (segment === 'pointer') {
            if (index == 0) {
                this.data.push(`@3`);
            } else {
                this.data.push(`@4`);
            }
            this.data.push('D=A');
        } else if (segment === 'static') {
            const staticBase = 16;
            this.data.push(`@${16 + parseInt(index)}`);
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

    close() {
        this.data.push('// Terminate');
        this.data.push('(END)');
        this.data.push('@END');
        this.data.push('0;JMP');

        fs.writeFile(this.file, this.data.join('\r\n'), function (err) {
            if (err) return console.log(err);
        });
    }
};