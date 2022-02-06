def links(contatos = ["","",""]):
    print(contatos)
    links = list()
    lista = []
    resSite = [contatos]
    
    for dados in resSite:
        lista.append(dados)
    

    
    
    for i in range(len(lista)):
        
        if(len(lista[i][1]) >= 8):
            if(lista[i][2] != "nan"):
                msg = lista[i][2]
            lista[i][1] = str(f"{lista[i][1]}").replace(" ","").replace("-","")
            if len(lista[i][1]) == 8:
                lista[i][1] = f"55629{lista[i][1]}"
            if len(lista[i][1]) == 9:
                lista[i][1] = f"5562{lista[i][1]}"
            if len(lista[i][1]) == 11:
                lista[i][1] = f"55{lista[i][1]}"
                
            if str(lista[i][0]) == "nan":
                lista[i][0]=""
            try:
                with open("mensagem.txt","r") as mensagem:
                    msg = mensagem.read()
                    if(msg.find("{nome}") != -1):
                        if(lista[i][0] == ""):
                            texto = msg.replace("{nome}","")
                            
                        else:
                            texto = msg.replace("{nome}",lista[i][0])
                    else:
                        texto = lista[i][0] +" "+msg 
            except:
                print("Erro ao ler mensagem")
                
            links.append(f'''https://web.whatsapp.com/send?phone={lista[i][1]}&text={texto}''')
    
    return links
    

if __name__=="__main__":
    resp = [link for link in links(["","99819788","hello world!"])]
    print(resp)
    #print(links()[1])
    

            
        