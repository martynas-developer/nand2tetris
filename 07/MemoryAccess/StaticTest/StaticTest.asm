// push constant 111
@12345
@111
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 333
@12345
@333
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 888
@12345
@888
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop static 8
@12345
@24
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
// pop static 3
@12345
@19
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
// pop static 1
@12345
@17
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
// push static 3
@12345
@19
D=M
@SP
A=M
M=D
@SP
M=M+1
// push static 1
@12345
@17
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
// push static 8
@12345
@24
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