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
// function Class1.set 0
@5151
@5151
(Class1.set)
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
// 505 static 0
@12345
@static00
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
// push argument 1
@5113
@5113
@1
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// 505 static 1
@12345
@static01
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
// push constant 0
@5113
@5113
@0
D=A
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
// function Class1.get 0
@5151
@5151
(Class1.get)
// push static 0
@5113
@5113
@static00
D=M
@SP
A=M
M=D
@SP
M=M+1
// push static 1
@5113
@5113
@static01
D=M
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
// function Class2.set 0
@5151
@5151
(Class2.set)
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
// 505 static 0
@12345
@static10
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
// push argument 1
@5113
@5113
@1
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// 505 static 1
@12345
@static11
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
// push constant 0
@5113
@5113
@0
D=A
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
// function Class2.get 0
@5151
@5151
(Class2.get)
// push static 0
@5113
@5113
@static10
D=M
@SP
A=M
M=D
@SP
M=M+1
// push static 1
@5113
@5113
@static11
D=M
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
// push constant 6
@5113
@5113
@6
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 8
@5113
@5113
@8
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Class1.set 2
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
@4
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
@Class1.set
0;JMP
(return_here_2)
// 505 temp 0
@12345
@5
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
// push constant 23
@5113
@5113
@23
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 15
@5113
@5113
@15
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Class2.set 2
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
@4
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
@Class2.set
0;JMP
(return_here_3)
// 505 temp 0
@12345
@5
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
// call Class1.get 0
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
@Class1.get
0;JMP
(return_here_4)
// call Class2.get 0
@5252
@5252
@return_here_5
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
@Class2.get
0;JMP
(return_here_5)
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