@256
D=A
@SP
M=D
// call Sys.init 0
@555
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
// function Sys.init 0
@444
(Sys.init)
// push constant 4000	//
@12345
@4000	//
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
// push constant 5000
@12345
@5000
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
// call Sys.main 0
@555
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
@Sys.main
0;JMP
(return_here_2)
// pop temp 1
@12345
@6
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
// label LOOP
@111
(LOOP)
// goto LOOP
@222
@LOOP
0;JMP
// function Sys.main 5
@444
(Sys.main)
@LCL
D=M
@0
A=A+D
M=0
@SP
M=M+1
@LCL
D=M
@1
A=A+D
M=0
@SP
M=M+1
@LCL
D=M
@2
A=A+D
M=0
@SP
M=M+1
@LCL
D=M
@3
A=A+D
M=0
@SP
M=M+1
@LCL
D=M
@4
A=A+D
M=0
@SP
M=M+1
// push constant 4001
@12345
@4001
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
// push constant 5001
@12345
@5001
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
// push constant 200
@12345
@200
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 1
@12345
@1
D=A
@LCL
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
// push constant 40
@12345
@40
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 2
@12345
@2
D=A
@LCL
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
// push constant 6
@12345
@6
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 3
@12345
@3
D=A
@LCL
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
// push constant 123
@12345
@123
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Sys.add12 1
@555
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
@Sys.add12
0;JMP
(return_here_3)
// pop temp 0
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
// push local 0
@12345
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 1
@12345
@1
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 2
@12345
@2
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 3
@12345
@3
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 4
@12345
@4
D=A
@LCL
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
// return
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
@1212
@1212
@1212
@1212
@1212
@1212
@R13
A=M
0;JMP
// function Sys.add12 0
@444
(Sys.add12)
// push constant 4002
@12345
@4002
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
// push constant 5002
@12345
@5002
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
// push argument 0
@12345
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
// push constant 12
@12345
@12
D=A
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
// return
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
@1212
@1212
@1212
@1212
@1212
@1212
@R13
A=M
0;JMP
// Terminate
(END)
@END
0;JMP