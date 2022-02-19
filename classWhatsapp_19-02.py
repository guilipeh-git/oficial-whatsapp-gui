from selenium import webdriver
from selenium.webdriver.common.keys import Keys 
from webdriver_manager.chrome import ChromeDriverManager as cdm 
from time import sleep 
from random import randint


class WhatsappGUI:
    def __init__(self):
        self.envia = True
        
    def startBot(self):
        self.driver = webdriver.Chrome(cdm().install())
        
    def click(self,x ): 
        self.driver.find_element_by_xpath(x).click(); 
        
    def enter(self,enterPath):
        self.driver.find_element_by_xpath(enterPath).send_keys(Keys.ENTER); 

    
    def linkMensagem (self,numero,msg):
        try:
            self.driver.get(f"https://web.whatsapp.com/send?phone={str(numero)}&text={msg}")
        except:
            print("erro comando get")


    def espere(self,id_pg="side"):
        cont = 0; 
        while cont < 1:
            try:
                cont = len(self.driver.find_elements_by_id(id_pg))
                self.envia = True
            except:
                self.envia = False
                return print(f"erro ao ler {id_pg}")
            
                

    def sendMensage(self,cont):
        self.espere("side")
        try:
            if self.envia == False:
                return print("fim")
        except:...
        sleep(2)
        self.numero_erro()
        # o contador mostra  quantas vezes o codigo vai se repetir se tiver um erro
        try:
            area = self.driver.find_element_by_xpath('//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[2]')
            area.click()
            sleep(randint(1,2))
            area.send_keys(Keys.ENTER)
            
        except:
            if(cont <= 0):
                return print(f"erro click na msg")
            #print(cont)
            return self.sendMensage(cont-1)
        sleep(randint(1,2))
        
        
        
    def numero_erro(self):
        erro = True; 
        try:
            while erro:
                self.espere('side'); 
                sleep(2); 
                #print(len(self.driver.find_elements_by_xpath('//*[@id="app"]/div[1]/span[2]/div[1]/span/div[1]/div/div/div')))
                if(len(self.driver.find_elements_by_xpath('//*[@id="app"]/div[1]/span[2]/div[1]/span/div[1]/div/div/div')) > 0):
                    sleep(2); 
                    if (len(self.driver.find_elements_by_xpath('//*[@id="app"]/div[1]/span[2]/div[1]/span/div[1]/div/div/div/div/div[2]/div')) > 0):
                        self.click('//*[@id="app"]/div[1]/span[2]/div[1]/span/div[1]/div/div/div/div/div[2]/div'); 
                else:
                    erro = False; 
                sleep(1)
        except:
            print("erro na funcao numero_erro")
    
    def sendAqvMensage(self,number,text=""): 
        return f"https://web.whatsapp.com/send?phone={str(number)}&text={str(text)}"; 
    
    def send_file(self,number,caminhoFile):
        try:
            self.driver.get(self.sendAqvMensage(number))
            self.espere("side")
            sleep(2)
            self.click('//*[@id="main"]/footer/div[1]/div/span[2]/div/div[1]/div[2]/div/div/span'); 
            file = self.driver.find_element_by_css_selector("input[type='file']"); #campo arquivos do whatsapp 
            sleep(1); 
            file.send_keys(caminhoFile)
            sleep(2)
            send = self.driver.find_element_by_css_selector("span[data-icon='send']")
            send.click()    
        except:
            print("erro na funcao send_file")   
    
    
    
    
    def finalizeWhatsapp(self):
        try:
            self.espere('side');  
            sleep(1)
            self.click('//*[@id="side"]/header/div[2]/div/span/div[3]/div/span')
            sleep(1)
            self.click('//*[@id="side"]/header/div[2]/div/span/div[3]/span/div[1]/ul/li[7]/div[1]')
            sleep(3); 
            self.driver.close()
        except:
            print("erro na funcao  finalizeWhatsapp")
    
    
    def envia_msg(self,num,msg):
        if(self.envia == False):return print("parei")
        self.linkMensagem(num,msg)
        sleep(randint(1,3))
        self.numero_erro()
        #self.espere("side")
        self.sendMensage(3)
            
##################################################################

zap = WhatsappGUI() #chamda class 
zap.startBot() # inicia bot
zap.envia_msg("567","456789")
zap.envia_msg("5562998080215","hello world")
#zap.send_file("5562998080215",r"C:\Users\guilh\OneDrive\Documentos\oficial-whatsapp-gui\src\tabelaa.xlsx")
zap.finalizeWhatsapp() # bot desloga e fecha chrome