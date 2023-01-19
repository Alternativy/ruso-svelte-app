<script>
	import { nominativeToInstrumental } from "./Instrumental";
	let traslated = "";
	let respuesta = "";
	async function traslate(input){
		let res = await fetch("https://libretranslate.com/translate", {
	method: "POST",
	body: JSON.stringify({
		q: "inputado",
		source: "ru",
		target: "es",
		format: "text",
		api_key: ""
	}),
		headers: { "Content-Type": "application/json" }
	});

	console.log(await res.json());
	}
	//declarando variables
	let inputado = "";
	let prepositionalExceptions = {"шкаф":"шкафу",
									"сад":"саду",
									"лес":"лесу",
									"аэропорт":"аэропорту",
									"угол":"уголу",
									"пола":"полу",
									"мост":"мосту",
									"берег":"берегу",
									"дочь":"дочери",
									"мать":"матери"};
	let caso = ["nominativo","genitivo","dativo","acusativo","instrumental","preposicional"];
	let genericException = ["время","имя","папа","дедучка","кофе","мужчина","дядя"]
	let testInput = "nada"
	let genero = ["masculino","femenino","neutro"];
	$: filteredInput = filtrarCilirico(testInput);
	//retorna si tiene caracteres ciliricos
	let word = false;
	$: word = { animated: false };

	function toggle() {
		word.animated = !word.animated;
	}
	function comprobarCilirico(input){
		if(input.match(/[\Ёёа-я]+/ig)==null){
			return false
		}else{
			return true
		}
	}
	function filtrarCilirico(input) {
		if(input.match(/[\а-я]+/ig)==""){
			return false
		}else{
			return input.match(/[\а-я]+/ig)
		}
	}
	//sirve para comprobar el genero de palabras en caso genitivo singular
	function comprobarGenero(input){
		if(genericException.includes(input)){
			switch(input){
				case genericException[0]:
				case genericException[1]:
					return genero[2]
				case genericException[2]:
				case genericException[3]:
				case genericException[4]:
				case genericException[5]:
				case genericException[6]:
					return genero[0]
			}
		}else{
		let arrayInput = input.split("")
		if(input != ""){
		switch(arrayInput[input.length-1]){
			case "а":
			case "я":
			 	return genero[1]
			case "о":
			case "е":
				return genero[2] 
			case "ь":
				if(input.endsWith("арь")||input.endsWith("тель")){
					return genero[0]
				}else if (input == "голубь"||"лебедь"||"дождь"||"гвоздь"){
					return genero[0]
				}else if (input.endsWith("чь")||input.endsWith("шь")||input.endsWith("щь")||input.endsWith("ость")||input.endsWith("бь")||input.endsWith("вь")||input.endsWith("дь")||input.endsWith("зь")||input.endsWith("сь")||input.endsWith("ть")){
					return genero[1]
				}else{
				return "este programa todavia no sabe distinguir bien el genero de las palabras terminadas en signo blando"}
			default:
				return genero[0]
				}
			}
		}
	}
	//pasa un sustantivo de nominativo a cualquiera de los otros casos
	function casos(input,caso){
		switch (caso){
			//pag 53 libro 2do año
			case "genitivo":
				switch (comprobarGenero(input)){
					case "masculino":
						if(input.endsWith("й" || "ь")){
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("я");
							return resultadoGenitivo.join("");
						}else{
							return input + "а"
						}
					case "femenino": 
						if(input.endsWith( "га" || "ка" ||"ша" || "жа" || "ха" || "ча" || "ь"|| "я" )){
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("и");
							return resultadoGenitivo.join("");
						} else{
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("ы");
							return resultadoGenitivo.join("");
						}
					case "neutro":
					if(input.endsWith("о")){
						let resultadoGenitivo = input.split("");
						resultadoGenitivo.pop();
						resultadoGenitivo.push("а");
						return resultadoGenitivo.join("");
					}else{
						let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("я");
							return resultadoGenitivo.join("");
					}
				}
			case "dativo":
				//pag 89 del libro
				switch (comprobarGenero(input)) {
					case "masculino":
						if(input.endsWith("ь" || "й")){
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("ю");
							return resultadoGenitivo.join("");
						}else{
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("у");
							return resultadoGenitivo.join("");
						}
					case "femenino":
						if(input.endsWith("а"||"я")){
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("е");
							return resultadoGenitivo.join("");
						}else {
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("и");
							return resultadoGenitivo.join("");
						}
					case "neutro":
						if(input.endsWith("o")){
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("у");
							return resultadoGenitivo.join("");
						} else if (input.endsWith("e")){
							let resultadoGenitivo = input.split("");
							resultadoGenitivo.pop();
							resultadoGenitivo.push("ю");
							return resultadoGenitivo.join("");
						}
				}
				//hacer pluralizador dativo
			case "acusativo"://solo funciona con objetos inanimados
				//pag 82 del libro de primer año
				//si es femenino, termina con у о ю. sino queda igual
				if(word.animated){
					let exceptions = {
						"ребенок": "ребенка",
						"птенец": "птенца",
						"дочь": "дочери"
					};
				  let inputArray = input.split("");
				  switch (comprobarGenero(input)) {
				    case "femenino":
				      if(exceptions[input]){
				        return exceptions[input];
				      }
				      if(input.endsWith("а") || input.endsWith("я")){
				        inputArray.pop();
				        return inputArray.join("") + "у";
				      } 
				      return input + "у";
				    case "masculino":
				      if(exceptions[input]){
				        return exceptions[input];
				      }
				      if(input.endsWith("о")){
				        inputArray.pop();
				        return inputArray.join("") + "а";
				      }
				      return input + "а";
				    case "neutro":
				      //In this case this shouldn't happen, since neutro nouns are inanimate
				      return input;
				  }
				}
				//if is animated
				if(comprobarGenero(input)=="femenino"){
					let resultadoAcusativo = input.split("")
					if(resultadoAcusativo.pop()=="я"){
						resultadoAcusativo.push("ю")
						return resultadoAcusativo.join("")
					}else{
						resultadoAcusativo.push("у")
						return resultadoAcusativo.join("")
					}
				}else{
					return input
				}
			case "instrumental":
				//pag 77 del libro de segundo año
				switch (comprobarGenero(input)) {
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
                        }   else {
							let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("ой")
							return resultadoPrepositivo.join("")
					}
                    case "neutro":
                        let resultadoPrepositivo = input.split("")
                        resultadoPrepositivo.push("м")
                        return resultadoPrepositivo.join("");
                        }			
			case "preposicional":
				//pag 7 segundo año
				if(prepositionalExceptions[input]){
					return exceptions[input];
				}
					switch(comprobarGenero(input)){
						case genero[1]://femenino
						if(input.endsWith("ия")){
							let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("и")
							return resultadoPrepositivo.join("")
						}else /*if (resultadoPrepositivo.pop()=="а"||"я")*/{
							let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("е")
							return resultadoPrepositivo.join("")
						}
						case genero[2]://neutro
							if(input.endsWith("ие")){
							let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("и")
							return resultadoPrepositivo.join("")
							}else{ /*if (resultadoPrepositivo.pop()=="е"||"о")*/
							let resultadoPrepositivo = input.split("")
							resultadoPrepositivo.pop()
							resultadoPrepositivo.push("е")
							return resultadoPrepositivo.join("")
							}
						case genero[0]://masculino
							let resultadoPrepositivo = input.split("")
							if (resultadoPrepositivo.pop()=="й"){
								resultadoPrepositivo.push("е")
								return resultadoPrepositivo.join("")
							}else{
								resultadoPrepositivo.push("е")
								return resultadoPrepositivo.join("")
							}
				}
				//pag 7 libro de segundo año
				
			default://"nominativo"
				return input
		}
	}
	//plurales en pagina 51 del libro de primer año
	function pluralizer(input){
		switch(input){
			case "ябоко":
				return "ябоки"
			case "город":
				return "города"
			case "дом": 
				return "дома"
			case "глаз":
				return "глаза"
			case "паспорт":
				return "паспорта"
			case "сестра":
				return "сёстры"
			case "день":
				return "дни"
			case "иностранец":
				return "иностранцы"
			case "брат":
				return "братья"
			case "друг":
				return "друзья"
			case "стул":
				return "стулья"
			case "дерево":
				return "деревья"
			case "лист":
				return "листья"
			case "ребёнок":
				return "дети"
			case "человек":
				return "люди"
			}
		switch(comprobarGenero(input)){
			// case numberException.includes(input):
			// 	return numberException.filter(number => input==number)
	 		//mostrar plural almacenado en el array asociativo(to do)
		 	//	return 
			case genero[1]:
			//por ahora agrega "и" pero despues le agrego para que agregue "ы" cuando sea necesario 
				let pluralized = input.split("")
				pluralized.pop()
				pluralized.push("и")
				return pluralized.join("")
			case genero[2]:
				//checkear que el condicional sirva para mayusculas y minusculas
				if(input.endsWith("о")){
					let pluralized = input.split("")
					pluralized.pop()
					pluralized.push("а")
					return pluralized.join("")
				}else if(input.endsWith("мя")){
					let pluralized = input.split("")
					pluralized.pop()
					pluralized.push("ена")
					return pluralized.join("")}
					else{
				let pluralized = input.split("")
				pluralized.pop()
				pluralized.push("я")
				return pluralized.join("")
				}
			case genero[0]:
				if(input.endsWith("й")){
					let pluralized = input.split("")
					pluralized.pop()
					pluralized.push("и")
					return pluralized.join("")
					}else if(input[input.lenght-1] == "г" || "к" ||"ш" || "ж" || "х" || "ч" ){
					let pluralized = input.split("")
					pluralized.push("и")
					return pluralized.join("")
				} else{
					let pluralized = input.split("")
					pluralized.push("ы")
					return pluralized.join("")
				}
			default:
				return ``
		}
	}
	function pluralizadorPreposicional(input) {
		if (pluralizer(input).endsWith("ы")){
			let pluralPreposicional = pluralizer(input);
			pluralPreposicional = pluralPreposicional.split("");
			pluralPreposicional.pop();
			pluralPreposicional.push("ах");
			return pluralPreposicional.join("");
		}else{
			let pluralPreposicional = pluralizer(input)
			pluralPreposicional = pluralPreposicional.split("")
			pluralPreposicional.pop()
			pluralPreposicional.push("ях")
			return pluralPreposicional.join("")
		}
	}
	function forTesting(input,functionName,functionToTest,expectedResult) {
		if(functionToTest!=expectedResult){console.error("Test failed")}
		return `For the input: ${input} to the function ${functionName} the output is: ${functionToTest}, and the expected output was: ${expectedResult}`
	}
	console.assert(casos("слово","instrumental") == "словом", "Falló el test de слово , en caso instrumental")
	console.assert(casos("брат", "instrumental") === "братом", "Test case 1 failed: 'брат' in instrumental should be 'братом'");
	console.assert(casos("дом", "genitivo") === "дома", "Test case 2 failed: 'дом' in genitivo should be 'дома'");
	console.assert(casos("жена", "dativo") === "жене", "Test case 3 failed: 'жена' in dativo should be 'жене'");
	console.assert(casos("окно", "preposicional") === "окне", "Test case 5 failed: 'окно' in preposicional should be 'окне'");

	
	//Test exceptions for gender
	console.assert(comprobarGenero("голубь") === "masculino", "Test case 1 failed: 'голубь' should be masculine");
	console.assert(comprobarGenero("время") === "neutro", "Test case 2 failed: 'время' should be neuter");
	console.assert(comprobarGenero("имя") === "neutro", "Test case 3 failed: 'имя' should be neuter");
	console.assert(comprobarGenero("слово") === "neutro", "Test case 4 failed: 'слово' should be neuter");
	console.assert(comprobarGenero("рука") === "femenino", "Test case 5 failed: 'рука' should be feminine");

	//console.assert(casos("брат", "acusativo") === "брата", "Test case 1 failed: 'брат' in acusativo should be 'брата'");
	//console.assert(casos("друг", "acusativo") === "друга", "Test case 2 failed: 'друг' in acusativo should be 'друга'");
	//console.assert(casos("жена", "acusativo") === "жену", "Test case 3 failed: 'жена' in acusativo should be 'жену'");
	//console.assert(casos("ребенок", "acusativo") === "ребенка", "Test case 4 failed: 'ребенок' in acusativo should be 'ребенка'");
	//console.assert(casos("окно", "acusativo") === "окно", "Test case 5 failed: 'окно' in acusativo should be 'окно'");

</script>

<main>
	<!-- <div class="testing">
		<p>{forTesting("имя","comprobarGenero",comprobarGenero("имя"),"neutro")}</p>
		<p>{forTesting("дедучка","comprobarGenero",comprobarGenero("дедучка"),"masculino")}</p>
		<p>{forTesting("книга","comprobarGenero",comprobarGenero("книга"),"femenino")}</p>
		<p>{forTesting("музей","comprobarGenero",comprobarGenero("музей"),"masculino")}</p>
		<p>{forTesting("музей","pluralizer",pluralizer("музей"),"музеи")}</p>
		<p>{forTesting("дом","pluralizer",pluralizer("дом"),"дома")}</p>
		<p>{forTesting("книга","casos",casos("книга","acusativo"),"книгу")}</p>
		<p>{forTesting("книга","casos",casos("книга","acusativo"),"книгу")}</p>
		<p>{comprobarCilirico("input")}</p>
		<p>{comprobarCilirico("статья")}</p>
		<p>{comprobarCilirico("статьяinput ")}</p>
		<p>comprobar genero para excepción <b>{comprobarGenero("имя")}</b> expected output = <b>neutro</b></p>
		<p>casos para acusativo <b>{casos("книга","acusativo")}</b> expected output = <b>книгу</b> </p>
		<p>casos para acusativo <b>{casos("статья","acusativo")}</b> expected output = <b>статью</b> </p>
		<p>casos para acusativo <b>{casos("музей","acusativo")}</b> expected output = <b>музей</b> </p>
		<p>pluralizer para masculino <b>{pluralizer("диалог")}</b> expected output = <b>диалоги</b> </p>
		<p>comprobar numero para excepción en pluralizer <b>{pluralizer("дом")}</b> expected output = <b>дома</b></p>
		<p>comprobar pluralizador <b>{pluralizer("имя")}</b> expected output = <b>имена</b></p>
		<p>casos para preposicional <b>{casos("статья","preposicional")}</b> expected output = <b>статье</b></p>
		<p>casos para preposicional <b>{casos("музей","preposicional")}</b> expected output = <b>музее</b></p>
		<p>casos para preposicional plural <b>{pluralizadorPreposicional("музей")}</b> expected output = <b>музеях</b></p> 
		<p>casos para genitivo <b>{casos("музей","genitivo")}</b> expected output = <b>музея</b> </p>
		<p><input bind:value={testInput} type="text" name="testtext" id="164"></p>
		<p>{filteredInput}</p>
	</div> -->
	<!-- <h2>¿De que genero es la palabra en ruso?</h2> -->
		<!--<p>Para saber el genero de una palabra en ruso debes de tener en cuenta la terminación de la palabra</p>
			<table>
				<tr>
					<th>Masculino</th>
					<th>Femenino</th>
					<th>neutro</th>
				</tr>
				<tr>
					<td>consonante<br>й<br>ь</td>
					<td>а<br>я<br>ь</td>
					<td>о<br>е</td>
				</tr>
			</table>
		<p>Eso si, las palabras que terminan en "ь" pueden ser tanto femeninas como masculinas, así que ahi no queda otra que memorizarlo y/o googlearlo ¿Es mucho quilombo? no te preocupes que aqui tengo un programa que te lo averiguará al instante</p>
		-->
	<input type="text" bind:value={inputado} placeholder="poné un sustantivo en nominativo singular">
		{#if inputado != "" && comprobarCilirico(inputado) == false}
			<p class="warning">tenes que ponerlo en cilirico</p>
		{/if}
	<!-- <p>la palabra esta en cilirico?: <b>{comprobarCilirico(inputado)}!</b></p> -->
	{#if word.animated}
	indica si está vivo o no: <button type="checkbox" on:click={toggle}>
		Animado
	</button>
	{:else}
	indica si está vivo o no: <button type="checkbox" on:click={toggle}>
			Inanimado
		</button>
	{/if}
	<p>el genero de la palabra es: <b>{comprobarGenero(inputado.toLowerCase()) || ''}</b></p>
		<!-- <h2>Pasar sustantivos de singular a plural en ruso</h2> -->
			<!--<p>Para convertir sustantivos en plural, se debe de seguir las reglas que estan en este cuadro</p> 
			<p>¿Es mucho quilombo? no te preocupes que aqui tengo un programa que te lo convertira al instante</p>
	-->
	<!-- <input bind:value={inputado} placeholder="poné un sustantivo en nominativo singular"> -->
	<p>en plural es: <b>{pluralizer(inputado.toLowerCase()) || ''}</b></p>
<!-- <h2>Pasar un sustantivo a caso Acusativo</h2> -->
	<!--<p>Lo que hay que tener en cuenta a la hora de usar el caso acusativo, es que este solo cambiará si este esta en femenino.</p>
	<p>cuadro no disponible</p>
	<p>¿Es mucho quilombo? no te preocupes que aqui tengo un programa que te lo convertira al instante</p>
	-->
	<!-- <input bind:value={inputado} placeholder="poné un sustantivo en nominativo"> -->
	<p>en caso genitivo la palabra es: <b>{casos(inputado.toLowerCase(),"genitivo") || ''}</b></p>	
	<p>en caso dativo la palabra es: <b>{casos(inputado.toLowerCase(),"dativo") || ''}</b></p>	
	<p>en caso acusativo la palabra es: <b>{casos(inputado.toLowerCase(),"acusativo") || ''}</b></p>
	<p>en caso instrumental la palabra es: <b>{casos(inputado.toLowerCase(),"instrumental") || ''}</b></p>	
	<p>en caso preposicional la palabra es: <b>{casos(inputado.toLowerCase(),"preposicional") || ''}</b></p>	
	<p>La palabra en español significa:
		{#if traslated != ""}
			<p>{traslated}</p>
		{/if}
		<button on:click={traslate(inputado)}>traducir</button></p>
	<footer>esta app aun esta en beta, por lo que puede haber cosas erroneas</footer>
		<!--<h1>
		el genero de la palabra es {comprobarGenero("книга")}<br>
		en acusativo la palabra es {casos("книга","acusativo")}
	</h1> -->
<!-- <Preguntas /> -->
</main>

<style>
	.warning{
		padding-top: 0;
		color: rgb(200,0,0);
		font-weight: bold;
	}
	/* h1,summary{
		margin: 1%;
		padding: 0;
		display: inline-block;
		text-align: center;
		width: 97%;
		background-color: rgb(255, 183, 88);
	} */
		/* border-radius: 25%; */
	/* details{
		margin: 0;
		padding: 0;
		background-color: rgb(134, 134, 175);
	} */
	/* h2{
		font-size: 20px;
	} */
	main{
		background-color: rgba(255, 238, 0, 0.6);
		backdrop-filter: blur(6px);
		padding: 2%;
		box-shadow: solid 0px 0px 12px;
	}
	input{
		width: 90vw;
	}
	/* table,td,th{
		border: 1px rgb(39, 25, 25) solid;
		border-collapse: collapse;
		margin: 2px;
		padding: 2px;
		text-align: center;
	} */
	footer{
		text-align: center;
	}
</style>