// push constant 3030
@12345
@3030
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 0
@12345
@3
D=A
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@R13
M=0
// push constant 3040
@12345
@3040
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 1
@12345
@4
D=A
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@R13
M=0
// push constant 32
@12345
@32
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop this 2
@12345
@2
D=A
@THIS
D=M+D
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@R13
M=0
// push constant 46
@12345
@46
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop that 6
@12345
@6
D=A
@THAT
D=M+D
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@R13
M=0
// push pointer 0
@12345
@3
D=M
@SP
A=M
M=D
@SP
M=M+1
// push pointer 1
@12345
@4
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@543
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
@SP
A=M
M=D+M
@SP
M=M+1
// push this 2
@12345
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// sub
@543
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
@SP
A=M
M=M-D
@SP
M=M+1
// push that 6
@12345
@6
D=A
@THAT
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@543
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
@SP
A=M
M=D+M
@SP
M=M+1
// Terminate
(END)
@END
0;JMP