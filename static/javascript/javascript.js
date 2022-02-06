class Msg_bot{
    constructor (){
        this.listaNums = [];
        const lista = this.dqs("#np").value.split(";")
        for(let c in lista){
            if(!isNaN(lista[c].split(",")[1]-0)){
                this.listaNums.push(lista[c].split(","))
            }
        }
        
        this.linhaTable();
        this.editar = "nulo";
        this.startBot = true;
        this.btnTbl();
        
    }
    btnTbl(){
        if(this.listaNums.length <= 0){
            this.dqs("#btnNovoC").value = "Adicionar Número"
            this.dqs("table").style.display="none";
        }
        else{
            this.dqs("#btnNovoC").value = "Novo Número"
            this.dqs("table").style.display="";
        }
    }
    toCapitalize(str){
        str = str.toLowerCase();
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }

    dqs(x){
        return document.querySelector(x);
    }
    init(){
        
        const textMsg = this.dqs("#textarea");
        if(this.dqs("#hidden").value.split(" ").join("") == ""){
            textMsg.innerHTML = "Click em Editar para adicionar uma mensagem.";
        }else{
            textMsg.innerHTML = this.dqs("#hidden").value;
        }

    }
    editarMsg(){
        let msg = this.dqs("#msg");
        let btnMsg = this.dqs('#btnEditar');
        const textMsg = this.dqs("#textarea");
        let hidden = this.dqs("#hidden");

        if(btnMsg.value.toLowerCase() == "editar"){
            btnMsg.value = "Salvar";
            textMsg.innerHTML = "";
            const textarea = document.createElement("textarea");
            textMsg.appendChild(textarea);
            textarea.setAttribute("id","msg");
            this.dqs("#msg").value = hidden.value

            if(this.dqs("#msg").value.toLowerCase() == ""){
                textarea.setAttribute("placeholder","Digite sua mensagem.");
                
            }
            textarea.focus();
            
        }else if(btnMsg.value.toLowerCase() == "salvar"){

            hidden.value = msg.value;
            if(this.dqs("#msg").value.split(" ").join("").length <= 0){
                textMsg.innerHTML = "Click em Editar para adicionar uma mensagem.";
                hidden.value = "";
            }
            else{
                textMsg.innerHTML = hidden.value;
            }
            btnMsg.value = "Editar";
        }
      
    }
    cancelar(x){
        const btnEdit1 = this.dqs("#btnEditar");
        const btnEdit2 = this.dqs("#btnNovoC");
        const textMsg = this.dqs("#textarea");
        if(x == 1){
            textMsg.innerHTML = this.dqs("#hidden").value;
            btnEdit1.value = "Editar";
        }else if(x == 2){
            this.dqs("#inputNome").value = "";
            this.dqs("#inputNumero").value = "";
            this.dqs("#inputNovoNum").style.display = "none";
            this.editar = "nulo";
            this.startBot = true;
        }
        
    } 
    
    fileExcel(){
        let cont = 0
        const file = this.dqs("#file")
        file.click();
        setInterval(()=>{
            if(file.value.toLowerCase().search(".xlsx") != -1){
                this.dqs("#namefile").innerHTML = file.value.substring(12);
            }
            else{
                if(file.value != "" && cont == 0){
                    alert(file.value.substring(12) + " Não é um arquivo excel. \nArquivo não importado!");
                    file.value = "";
                    this.dqs("#namefile").innerHTML = "";
                    cont = 1;
                }
                
                
                
                }
        },500);
    }
    novoNum(){
        this.startBot = false;
        if(this.editar == "nulo"){
            this.dqs("#inputNovoNum").style.display = "block"
            this.linhaTable()
        }
        else{
            alert("Saia do mode de edição para adicionar um novo número.")
        }
    }
    linhaTable(){
        this.dqs("#tbody").innerHTML = "";
        for(let i=1;i<=this.listaNums.length;i++){
            let tbody = this.dqs("#tbody");
            let linha = tbody.insertRow();
            linha.classList.add(`center`)

            let indice = linha.insertCell();
            let nome = linha.insertCell();
            nome.setAttribute("placeholder","Opcional")
            let numero = linha.insertCell();
            let acao = linha.insertCell();
            
            indice.innerHTML = i;
            nome.innerHTML = this.toCapitalize(this.listaNums[i-1][0])    
            numero.innerHTML = this.listaNums[i-1][1]

            let imgEdit = document.createElement("img")
            imgEdit.src = "static/images/editar.png"
            imgEdit.alt = "Editar"
            imgEdit.setAttribute("onclick",`msg_bot.editarTable(${i})`)
            acao.appendChild(imgEdit)

            let imgDel = document.createElement("img")
            imgDel.src = "static/images/lixo.png"
            imgDel.alt = "Deletar"
            imgDel.setAttribute("onclick",`msg_bot.deletar(${i})`)
            
            acao.appendChild(imgDel)
            //this.dqs("#qtdNum").innerHTML = `${i-1}/150`
            
        }
        this.dqs("#qtdNum").innerHTML = `${this.listaNums.length}/150`
    }
    adicionaLista(x){
        this.listaNums.push([this.toCapitalize(this.dqs("#inputNome").value) || "",x]);

                    this.linhaTable();
                    this.dqs("#inputNome").value = "";
                    this.dqs("#inputNumero").value = "";
                    this.dqs("#inputNovoNum").style.display = "none";
    }
    npFun(){
        if(this.listaNums.length <=0){
            this.dqs("table").style.display = "none";
        }
        this.dqs("#np").value  = ""
            for(let resp in this.listaNums){
                this.dqs("#np").value += `${this.listaNums[resp]};`;
            }
    }
    salvaInput(){
        this.startBot = true;
        

        if(this.editar == "nulo"){
            
            let iptNum = this.dqs("#inputNumero"); 
            
            const x = String(iptNum.value).split(" ").join("")
            
            if(isNaN(x-0) || x.length <8 || x.length >= 15){
                if(iptNum.value == ""){
                    alert("Número de Telefone Obrigatório!");
                }
                else{
                    alert("Digite um Número valido!!!");}
            }else if(String(iptNum.value).split(" ").join("").length > 7 && String(iptNum.value).split(" ").join("").length <15){
                
                if(String(this.listaNums).indexOf(x) != -1){
                    let res = confirm("Numero já existe na tabela abaixo, deseja adicionar esse número novamente? ");
                
                    if(res){
                        this.adicionaLista(x);
                    }
                }else{
                    this.adicionaLista(x);
                }

            }
            this.btnTbl();
            this.npFun();
        }
        else if(this.editar != 'nulo'){
            let iptNum = this.dqs("#inputNumero"); 
            
            const x = String(iptNum.value).split(" ").join("")
            if(isNaN(x-0) || x.length <8 || x.length >= 15){
                if(iptNum.value == ""){
                    alert("Número de Telefone Obrigatório!");
                }
                else{
                    alert("Digite um Número valido!!!");}
            }else if(String(iptNum.value).split(" ").join("").length > 7 && String(iptNum.value).split(" ").join("").length <15){

                this.listaNums[this.editar-1] = [this.toCapitalize(this.dqs("#inputNome").value),this.dqs("#inputNumero").value];
                this.linhaTable();
                this.cancelar(2);
                
                this.editar = "nulo";
                this.npFun();
        }}
    }
    
    editarTable(indice){
        this.startBot = false;
        this.dqs("#inputNovoNum").style.display = "block";
        this.dqs("#inputNumero").focus();
        this.dqs("#inputNome").value = this.listaNums[indice-1][0];
        this.dqs("#inputNumero").value = String(this.listaNums[indice-1][1]).split(" ").join("");
        this.editar = indice;
    }
    deletar(x){
        if(this.editar == 'nulo'){
            const comf = confirm(`Deseja realmente Deletar linha ${x} ?`);
            if(comf){
                this.listaNums.splice(x-1,1);
                this.linhaTable();
            }
        }else if(this.editar != 'nulo'){
            alert("Linha não pode ser deletada enquanto você estiver em modo de edição!");
        
        }
        this.npFun();
    }
    btnSubmit(){
        const btnEditar = this.dqs("#btnEditar");
        const inputNovoNum = this.dqs("#inputNovoNum");
        const namefile = this.dqs("#namefile");
        const msg = this.dqs("#hidden").value.split(" ").join("");
        //console.log(namefile.innerText)
        if(this.listaNums.length <= 0 && namefile.innerText.split(" ").join("") == ""){
            alert("Adicione algum número de telefone para que o bot sejá iniciado!");
        
        }else{
            if(msg.length == 0 && this.startBot == true && this.dqs("#btnEditar").value.toLowerCase() == "editar"){
                alert("O bot não pode ser iniciado enquanto o campo  de mensagem estiver vazio!");
            }
            if(btnEditar.value.toLowerCase() == "salvar" || this.startBot == false){
                
                alert("O bot só será iniciado quando todos os campos estiverem salvos!");
            }else if(btnEditar.value.toLowerCase() == "editar" && this.startBot == true && msg.length !=0 ){
                this.dqs("#submitBtn").setAttribute("type","submit");
                this.dqs("body").style.visibility="hidden";
                this.dqs("#loud").style.display="block";
                
                
            }
        }
        
    }
    
    
}

const msg_bot = new Msg_bot()