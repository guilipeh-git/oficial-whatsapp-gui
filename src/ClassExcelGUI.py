class ExcelGUI:
    def __init__(self,nomeExcel="src/tabelaa.xlsx"):
        self.excel = ""
        self.nomeExcel = nomeExcel
        import pandas as pd 
        try:
            self.excel = pd.read_excel(nomeExcel)
            self.dictNumeros = self.dictExcelGUI()
        except:
            print("Excel nao encontrado")
            self.dictNumeros = ""
        
        self.existeExcel = str(self.excel)
        
    def lerExcelGUI(self,palavraHead):
        headEx = [ex for ex in self.excel]
        hq = str(headEx).lower().find(palavraHead)
        headResp = str(headEx)[hq:hq+len(palavraHead)]
        
        argEx = lambda arg : str(self.excel).lower().find(str(arg).lower()) != -1
        
        try:
            """Essa função ela le o excel e busca uma palavra em expecifico.
            e mostra todos os elementos abaixo daquele argumenta procurado""" 
            ErroReturn = palavraHead
            palavraHead = str(palavraHead).lower()
            lista = []
            argument = False
            if(argEx(palavraHead)):
                try:
                    for resp in self.excel[headResp]:
                        lista.append(resp)
                except:
                    pass
                for head in self.excel:
                    if(str(self.excel[head]).lower().find(palavraHead) != -1):
                        for cell in self.excel[head]:
                            if str(cell).lower() == palavraHead:
                                argument = True
                            if argument:
                                lista.append(cell)
                                
            
            else:
                return print(f"valor {ErroReturn} Não encontrado na planilha excel.")
            if len(lista) > 0:
                return lista[1:]
        except:
            print("...")
            raise ValueError("Invalid")
    
    def dictExcelGUI(self):
        NumDicionario = []
        self.nomes = self.lerExcelGUI("nome") or self.lerExcelGUI("nomes")
        self.numeros = self.lerExcelGUI("numero") or self.lerExcelGUI("numeros")
        
        for c in range(len(self.numeros)):
            if str(self.numeros[c]).replace(".0","").isnumeric() and len(str(self.numeros[c]).replace(".0","")) >= 8 and len(str(self.numeros[c]).replace(".0","")) <=15:
                if self.nomes == None:
                    n = "nan"
                else:
                    n = str(self.nomes[c])
                                        
                NumDicionario.append(f"{str(n)}:{str(self.numeros[c]).replace('.0','')}".split(":"))
        
        return NumDicionario
    
x = ExcelGUI("src/tabelaa.xlsx")
if __name__ == "__main__" and x.existeExcel != "":
      
    #print(x.nomes)
    #print(x.numeros)
    print(x.dictNumeros)
if str(x.excel) != "":
    print("existe excel")
else:
    print("nao existe excel")

