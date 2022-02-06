import re # vem de expressao regular => ler documentação

# funções que irei usar do modulo re

# findall == encontre todas as ocorrências 
# search == encontre a primeira ocorrência 
# sub == substitui essas ocorrências pelo que eu quiser
# compile == compilar as expressões regulares#

# obs  sempre que for escrever espressões regulares,
# coloca o r antes de começar a string pois nos vamos usar a contra barra.

ex =  "carai cade mano cade vc"
print(re.search(r"vc",ex))
print(re.findall(r"cade",ex))
print(re.sub(r"cade",r"tadoido",ex))