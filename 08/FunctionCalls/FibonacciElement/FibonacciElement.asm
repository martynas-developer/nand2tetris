@256
D=A
@SP
M=D
// call Sys.init 0
@5252
@5252
@return_here_1
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
D=M
@4
D=D+A
@LCL
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
D=M
@2
D=D-A
@ARG
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@9999
@Sys.init
0;JMP
(return_here_1)
// function Main.fibonacci 0
@5151
@5151
(Main.fibonacci)
// push argument 0
@5113
@5113
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push constant 2
@5113
@5113
@2
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt                     // checks if n<2
@112
@112
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
@SP
A=M
D=M-D
@TRUE_0
D;JLT
@SP
A=M
M=0
@CONTINUE_0
0;JMP
(TRUE_0)
@SP
A=M
M=-1
(CONTINUE_0)
@SP
M=M+1
// if IF_TRUE
@16
@16
@SP
M=M-1
@SP
A=M
D=M
@IF_TRUE
D;JNE
// goto IF_FALSE
@222
@222
@IF_FALSE
0;JMP
// label IF_TRUE
@111
@111
(IF_TRUE)
// push argument 0
@5113
@5113
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// return
@666
@666
@LCL
D=M
@5
A=D-A
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@ARG
A=M
M=D
@6677
@ARG
D=M+1
@SP
M=D
@6677
@LCL
D=M
@1
A=D-A
D=M
@THAT
M=D
@LCL
D=M
@2
A=D-A
D=M
@THIS
M=D
@LCL
D=M
@3
A=D-A
D=M
@ARG
M=D
@LCL
D=M
@4
A=D-A
D=M
@LCL
M=D
@R13
A=M
0;JMP
// label IF_FALSE
@111
@111
(IF_FALSE)
// push argument 0
@5113
@5113
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push constant 2
@5113
@5113
@2
D=A
@SP
A=M
M=D
@SP
M=M+1
// sub
@112
@112
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
// call Main.fibonacci 1
@5252
@5252
@return_here_2
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
D=M
@4
D=D+A
@LCL
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
D=M
@3
D=D-A
@ARG
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@9999
@Main.fibonacci
0;JMP
(return_here_2)
// push argument 0
@5113
@5113
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push constant 1
@5113
@5113
@1
D=A
@SP
A=M
M=D
@SP
M=M+1
// sub
@112
@112
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
// call Main.fibonacci 1
@5252
@5252
@return_here_3
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
D=M
@4
D=D+A
@LCL
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
D=M
@3
D=D-A
@ARG
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@9999
@Main.fibonacci
0;JMP
(return_here_3)
// add                    // returns fib(n-1) + fib(n-2)
@112
@112
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
// return
@666
@666
@LCL
D=M
@5
A=D-A
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@ARG
A=M
M=D
@6677
@ARG
D=M+1
@SP
M=D
@6677
@LCL
D=M
@1
A=D-A
D=M
@THAT
M=D
@LCL
D=M
@2
A=D-A
D=M
@THIS
M=D
@LCL
D=M
@3
A=D-A
D=M
@ARG
M=D
@LCL
D=M
@4
A=D-A
D=M
@LCL
M=D
@R13
A=M
0;JMP
// function Sys.init 0
@5151
@5151
(Sys.init)
// push constant 4
@5113
@5113
@4
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Main.fibonacci 1
@5252
@5252
@return_here_4
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
D=M
@4
D=D+A
@LCL
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
D=M
@3
D=D-A
@ARG
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@9999
@Main.fibonacci
0;JMP
(return_here_4)
// label WHILE
@111
@111
(WHILE)
// goto WHILE
@222
@222
@WHILE
0;JMP
// Terminate
(END)
@END
0;JMP