//CREAR LAS PROPIEDADES DEL OBJETO

let p = {
    
    teclas:document.querySelectorAll("#calculadora ul li"),
    accion:null,
    digito:null,
    operaciones:document.querySelector("#operaciones"),
    cantisignos:0,
    cantdecimal:false,
    resultado:false, 
}

//Crear los metodos
let m = {
    inicio:function()
    {
        for(let i = 0; i < p.teclas.length; i++ )
        {
            p.teclas[i].addEventListener("click",m.oprimirtecla)
        }

        document.addEventListener("keydown", function(e){
            let tecla = e.key;

            if(!isNaN(tecla)){
                m.calculadora("numero", tecla);
            }

            else if(["+", "-", "*", "/"].includes(tecla)){

            m.calculadora("simbolo", tecla);
        }

             else if(tecla == "."){

            m.calculadora("decimal", tecla);

        }

        else if(tecla == "r"){
            m.calculadora("simbolo", "√")
        }

        else if(tecla == "s"){
            m.calculadora("simbolo", "sin")
        }

        else if(tecla == "c"){
            m.calculadora("simbolo", "cos")
        }

         else if(tecla == "p"){
            m.calculadora("simbolo", "^")
        }



        else if(tecla == "Enter"){

            m.calculadora("igual", "=");

        }
        else if(tecla == "Backspace"){

            p.operaciones.innerHTML =
            p.operaciones.innerHTML.slice(0, -1);

            if(p.operaciones.innerHTML == ""){
                p.operaciones.innerHTML = "0";
            }

        }
        else if(tecla == "Escape"){

            m.borrarCalculadora();

 }

    });

    },
    oprimirtecla: function(tecla)
    {
        p.accion = tecla.target.getAttribute("class");
        p.digito = tecla.target.innerHTML;
        console.log(p.digito);
        m.calculadora(p.accion,p.digito);

    },
    calculadora: function(accion,digito)
    {
        switch(accion)
        {
            case "numero":

    p.cantisignos = 0;

    if(p.resultado){
        p.operaciones.innerHTML = digito;
        p.resultado = false;
    }
    else if(p.operaciones.innerHTML == "0"){
        p.operaciones.innerHTML = digito;
    }
    else{
        p.operaciones.innerHTML += digito;
    }

break;



    case "simbolo":

    if(digito == "√"){

        p.operaciones.innerHTML =
        Math.sqrt(Number(p.operaciones.innerHTML));

        p.resultado = true;
        p.cantdecimal = false;
        p.cantisignos = 0;

        return;
    }

    if(digito == "sin"){

        p.operaciones.innerHTML =
        Math.sin(Number(p.operaciones.innerHTML) * Math.PI / 180);

        p.resultado = true;
        p.cantdecimal = false;
        p.cantisignos = 0;

        return;
    }

    if(digito == "cos"){

        p.operaciones.innerHTML =
        Math.cos(Number(p.operaciones.innerHTML) * Math.PI / 180);

        p.resultado = true;
        p.cantdecimal = false;
        p.cantisignos = 0;

        return;
    }

    if(digito == "^"){

        p.operaciones.innerHTML =
        Number(p.operaciones.innerHTML) ** 2;

        p.resultado = true;
        p.cantdecimal = false;
        p.cantisignos = 0;

        return;
    }
    p.cantisignos++;

    if(p.cantisignos == 1){

        if(p.operaciones.innerHTML != "0"){

            p.operaciones.innerHTML += digito;
            p.cantdecimal = false;
        }
    }

break;

            case"decimal":
            if(!p.cantdecimal){
                p.operaciones.innerHTML += digito;
                p.cantdecimal = true;
            }
            //console.log("decimal");
            break;

            case "igual":

    if (p.operaciones.innerHTML.includes("/0")) {
        p.operaciones.innerHTML = "No se puede dividir";
    } else {
        p.operaciones.innerHTML = eval(p.operaciones.innerHTML);
        p.resultado = true;
    }

break;

    }
},
    borrarCalculadora: function(){
        p.operaciones.innerHTML = "0";
    }
}

m.inicio();