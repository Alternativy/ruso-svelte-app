<!-- <script>
function comprobarGenero(input){
//retorna "masculino","femenino" o "neutro"
//}

function casos(input,caso){
			case "genitivo":
                //retorna el input en caso genitivo
			case "dativo":
                //retorna el input en caso dativo
			case "acusativo":
                //retorna el input en caso acusativo
			case "instrumental":
                //retorna el input en caso acusativo
            switch (input) {
					case "masculino":
						if(input.endsWith("ь"|| "й")){
							let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("ем")
							return resultadoPrepositivo.join("")
						}else if(input.endsWith("ец")){
                            let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("ем")
							return resultadoPrepositivo.join("")
                        }//Masculine nouns ending in a consonant take "-ом" in the instrumental case. 
                            //For example: "брат" (brother) becomes "братом" (with a brother).
                        return input + "ом";
                    case "femenino":
                        if (input.endsWith("ь")){
                            let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("ю")
							return resultadoPrepositivo.join("")
                        } else if(input.endsWith("я")){
                            let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("ей")
							return resultadoPrepositivo.join("")
                        } else if(input.endsWith("щ"||"ц"||"ш"||"ж"||"ч")){
                            let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("ей")
							return resultadoPrepositivo.join("")
                        }   let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("ой")
							return resultadoPrepositivo.join("")
                    case "neutro":
                        let resultadoPrepositivo = input.split("")
                        resultadoPrepositivo.push("м")
                        return resultadoPrepositivo.join("");
                        }
			case "preposicional":
                //retorna el input en caso preposicional
			default://"nominativo"
                return input
}
}
</script> -->