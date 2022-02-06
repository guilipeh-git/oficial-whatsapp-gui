import pandas as pd
class ExcelGUI:
    def __init__(self,nomeTabela):
        
        self.nomeTabela = nomeTabela
        
    def lendoHeadExcel(self):
        #lendo se existe nome(s) e Numero(s) na head do excel
        try:
            excel = pd.read_excel(self.nomeTabela)
            print("aaaaaaaaaaaa")
            lista = list(x for x in excel)
        except:
            #print("aaaaaaaaaaaa")
            lista = []
            
        print(lista)
        existeNome = lambda value : str(value).casefold() in lista
        nome = "nome"
        nomes = "nomes"
        numero = "numero"
        numeros = "numeros"
        mensagem = "mensagem"
        if existeNome(mensagem):
            res = str(lista).lower().find(mensagem)
            res = str(lista)[res:res+len(mensagem)]
            print(res)
            print(excel[res])
            
        elif existeNome(nomes):
            res = str(lista).lower().find(nomes)
            res = str(lista)[res:res+len(nomes)]
            print(res)
            print(excel[res])
            
        if existeNome(numero):
            res = str(lista).lower().find(numero)
            res = str(lista)[res:res+len(numero)]
            print(res)
            print(excel[res])
            
        elif existeNome(numeros):
            res = str(lista).lower().find(numeros)
            res = str(lista)[res:res+len(numeros)]
            print(res)
            print(excel[res])
            
        else:
            pass
        
    

if __name__ == "__main__":
    import sys
    excel = ExcelGUI("src/tabelaa.xlsx")
    excel.lendoHeadExcel()
    #print(sys.getsizeof(excel.lendoHeadExcel()))