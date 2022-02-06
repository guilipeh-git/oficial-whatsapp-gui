class Msg_bot{
    constructor(){
        this.msg;
        this.listaNum = [];
        this.block = null;
        this.sobraLista = [];
        document.querySelector("#number-phone").style.background = "rgba(255, 255, 255, .500)";
        this.mostraNaNums();
        this.plvExist = "";
        
    }
    btnSubmit(){
        const valida = document.querySelector("#number-phone").value
        const btnEditar = document.querySelector("#btnEditar").value
        const btnEnviar = document.querySelector("#btnEnviar").value
        const file = document.querySelector("#file").value
        
        if(btnEditar.toLowerCase() == "editar" && btnEnviar.toLowerCase() == "editar"){
            if(valida.length != 0 && valida != "" || file != "" && file.length > 0){   
                document.querySelector("#submitBtn").setAttribute("type","submit")
            }else{
                alert("Nenhum número inserido. bot não inicializado !")
            }
        }else{
            alert("O bot só será iniciado quando todos os campos estiverem salvos!!!")
        }   
    }
    fun(x){
        const msg = document.querySelector("#msg");
        msg.setAttribute(x,"");

    }
    criaElement(result){
        document.querySelector("#textarea").innerHTML = "";
        if(result == "nulo"){
            const textarea = document.createElement("textarea");
            const appendTextarea = document.querySelector("#textarea");
            appendTextarea.appendChild(textarea);
            textarea.setAttribute("id","msg");
        }
        else{
            
            const textarea = document.createElement("p");
            textarea.innerHTML = this.msg;
            const appendTextarea = document.querySelector("#textarea");
            appendTextarea.appendChild(textarea);
            textarea.setAttribute("id","msg");
        }
    }
    funInicial(){
        this.msg = document.querySelector("#hidden").value;
        this.criaElement(this.block);
        this.fun(this.block);
        document.querySelector("#contador").innerHTML = `${this.listaNum.length}/150`;
        
        
    }
    
    csv(){
        let cont = 0;
        
        const file = document.querySelector("#file")
        file.click();
        
        
        setInterval(()=>{
            
            if(file.value.substring(12).toLowerCase().search(".xlsx") != -1 ){
                
                document.querySelector("#namefile").innerHTML = file.value.substring(12)
                cont = 0;
                
            }else{
               
            if(file.value.substring(12) != "" && cont == 0 && this.plvExist != file.value.substring(12) ){
                    alert(file.value.substring(12) + " Não é um arquivo excel ou não termina com a extensão .xlsx \nArquivo não importado!")
                    cont = 1;
                    this.plvExist = file.value.substring(12).toLowerCase();
                    
                    console.log(this.plvExist != file.value.substring(12))
                    
                }
            }
            
            console.log(this.plvExist)
        },500)
        
        
    }
    mostraNaNums(){
        const number_phone = document.querySelector("#number-phone").value
        const btnEnviar = document.querySelector("#btnEnviar").value
        if(number_phone.length == 0 || number_phone == "" && btnEnviar.toLowerCase() != "editar"){
            document.querySelector("#number-phone").setAttribute("placeholder","Click em Editar para adicionar os números de telefone.")
        }
        const numHidden =  document.querySelector("#np").value.split(",");
        for(let pos in numHidden){
            if(numHidden[pos] != ""){
            this.listaNum.push(String(numHidden[pos]).substring(2));
            }
        }


        this.cancelarNum()
    }
    editar(){
        
        const btn = document.querySelector("#btnEditar");
        if(btn.value == "Editar"){
            const msgBot = document.querySelector("#msg");
            msgBot.value = this.msg
            btn.value = "Salvar"
            let msg = document.querySelector("#msg");
            msg.removeAttribute(this.block);
            this.criaElement("nulo");
            document.querySelector("#msg").innerHTML = this.msg;
            document.querySelector("#msg").focus();

        }else if(btn.value == "Salvar"){
            btn.value = "Editar";
            document.querySelector("#hidden").value = msg.value;
            this.funInicial();
            
            
            this.cancelar();
        }
        
        
    
        
    }
    cancelar(){
        this.fun(this.block);
        this.criaElement(null);
        document.querySelector("#btnEditar").value = "Editar";
    }
    cancelarNum(){
        const cNum = document.querySelector("#btnEnviar");
        const textNum = document.querySelector("#number-phone");
        cNum.value = "Editar";
        textNum.value = ""
        for(let c = 0; c < this.listaNum.length;c++){
            textNum.value += this.listaNum[c] + ",\n";
        }
        
        textNum.setAttribute("readonly","");

    }

    listaNumero(nums){
        this.listaErro = []
        let lista = [];

        nums = nums.split(";").join(",");
        nums = nums.split(",");
        
        
        for(let n = 0;n < nums.length;n++){
            nums[n] = nums[n].replace("\n","").replace(/\s/g, '');
            nums[n] = nums[n].replace("-","");
            const num = String(nums[n]).length >7 && String(nums[n]).length <16 
            if(nums[n].length == 8){
                nums[n] = `9${nums[n]}`
            }
            if(nums[n] != "" && !isNaN(nums[n]) && num){
                lista.push(nums[n]);
                
            }else{
                if(nums[n] != ""){
                    this.listaErro.push(nums[n] + "\n");
                    
                }
            }
            
        }
        
        return lista;
        
    }

    enviarNum(){
        const number_phone = document.querySelector("#number-phone").value
        const btnEnviar = document.querySelector("#btnEnviar").value
        if(number_phone.length == 0 || number_phone == "" && btnEnviar.toLowerCase() != "editar"){
            document.querySelector("#number-phone").setAttribute("placeholder","Insira os numero")
        }
        const btnNum = document.querySelector("#btnEnviar");
        const textNum = document.querySelector("#number-phone");
        
        
        if(btnNum.value == "Editar"){   
            textNum.style.background = "white";
            textNum.removeAttribute("readonly");

            if(textNum.value.length == 0){
                textNum.focus();
            }
            
            btnNum.value = "Salvar";
            const groupBtn = document.querySelector(".group-btn");
            
            
        }else if(btnNum.value == "Salvar"){
            textNum.style.background = "rgba(214, 214, 214, 0.508)";
            textNum.setAttribute("readonly","");
            btnNum.value = "Editar";
            this.listaNum = []
            
        
        for(let c=0;c<this.listaNumero(textNum.value).length;c++){
            if(c < 150){
                this.listaNum.push(this.listaNumero(textNum.value)[c]);
            }
            else{
                this.sobraLista.push(this.listaNumero(textNum.value)[c])
            }
        }
        textNum.value = ""
        document.querySelector("#np").value = this.listaNum
        
        for(let c = 0; c < this.listaNum.length; c++){
            textNum.value += this.listaNum[c] + ",\n";
        }
        if(this.listaErro.length != 0 && this.listaErro != ""){
            alert(`Número invalido:\n${this.listaErro}`);
        }
    
        }
        
        this.funInicial();
   
    }
   
}

const msg_bot = new Msg_bot;