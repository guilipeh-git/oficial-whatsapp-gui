from selenium import webdriver
from selenium.webdriver.common.keys import Keys 
from webdriver_manager.chrome import ChromeDriverManager as cdm
from time import sleep
from random import randint
import pyautogui as pg

def esperePath(path_pg):
    contPath = 0; 
    while contPath < 1:
        contPath = len(driver.find_elements_by_xpath(path_pg))
        sleep(1)
        
def espere(id_pg):
    cont = 0; 
    while cont < 1:
        try:
            cont = len(driver.find_elements_by_id(id_pg))
        except:
            print(f"erro ao ler {id_pg}")
        sleep(1)
  
def numero_erro():
    erro = True; 
    while erro:
        espere('side'); 
        sleep(2); 
        print(len(driver.find_elements_by_xpath('//*[@id="app"]/div[1]/span[2]/div[1]/span/div[1]/div/div/div')))
        if(len(driver.find_elements_by_xpath('//*[@id="app"]/div[1]/span[2]/div[1]/span/div[1]/div/div/div')) > 0):
            sleep(1); 
            if (len(driver.find_elements_by_xpath('//*[@id="app"]/div[1]/span[2]/div[1]/span/div[1]/div/div/div/div/div[2]/div')) > 0):
                click('//*[@id="app"]/div[1]/span[2]/div[1]/span/div[1]/div/div/div/div/div[2]/div'); 
        else:
            erro = False; 
        sleep(1)

        
click = lambda x : driver.find_element_by_xpath(x).click(); 
enter = lambda enterPath: driver.find_element_by_xpath(enterPath).send_keys(Keys.ENTER); 

sendMensage = lambda number,text="": f"https://web.whatsapp.com/send?phone={str(number)}&text={str(text)}"; 

def espereFull():
    sleep(3)
    espere("side"); 
    esperePath('//*[@id="main"]/header/div[3]/div/div[1]/div'); 


def envia_mensagem(num,msg):
    driver.get(sendMensage(num,msg)); 
    espereFull(); 
    #sleep(randint(2,3))
    click('//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[2]'); 
    sleep(randint(1,5)); 
    pg.press("enter");  #pyautogui apertando enter
    sleep(randint(3,7))
    
def send_file(number,caminhoFile):
    driver.get(sendMensage(number))
    espereFull(); 
    click('//*[@id="main"]/footer/div[1]/div/span[2]/div/div[1]/div[2]/div/div/span'); 
    file = driver.find_element_by_css_selector("input[type='file']"); #campo arquivos do whatsapp 
    sleep(1); 
    file.send_keys(caminhoFile)
    sleep(3)
    send = driver.find_element_by_css_selector("span[data-icon='send']")
    send.click()    
    
    
    
def finalizeWhatsapp():
    espere('side'); 
    sleep(3); 
    click('//*[@id="side"]/header/div[2]/div/span/div[3]/div/span')
    sleep(1)
    click('//*[@id="side"]/header/div[2]/div/span/div[3]/span/div[1]/ul/li[4]/div[1]')
    sleep(3); 
    driver.close()

#======================================================================================
#inicio do bot
if __name__=="__main__":
    numero = "55629slkvnsl98080215"; 

    driver = webdriver.Chrome(cdm().install());  # abre o google
    #send_file(numero,r"C:\Users\guilh\OneDrive\Documentos\oficial-whatsapp-gui\src\tabelaa.xlsx"); 
    #envia_mensagem(numero,"oiiies"); 
    #finalizeWhatsapp(); 
    driver.get(f"https://web.whatsapp.com/send?phone={str(numero)}&text=oiiis"); 
    numero_erro(); 
    finalizeWhatsapp(); 
    while True:
        sleep(1);      