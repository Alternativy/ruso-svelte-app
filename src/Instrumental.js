module.exports = { 
  nominativeToInstrumental: function(input) {
    // Create an object to store the irregular forms
    const irregularForms = {
      "папа": "папой",
      "рука": "рукой",
      "хороший": "хорошим",
      "большой": "большим"
    };
  
    // Check for irregular forms
    if (irregularForms[word]) {
      return irregularForms[word];
    }
  
    // Create an array of endings for masculine nouns in the nominative case
    const masculines = ["а", "е", "о", "у", "я", "ь"];
    // Create an array of endings for feminine nouns in the nominative case
    const feminines = ["я", "ь"];
    // Create an array of endings for neuter nouns in the nominative case
    const neuters = ["е", "о", "ё"];
  
    // Check if the word ends in any of the endings for masculine nouns
    if (masculines.some(ending => word.endsWith(ending))) {
      // If it does, remove the ending and add "ом"
      return word.slice(0, -1) + "ом";
    }
    // Check if the word ends in any of the endings for feminine nouns
    else if (feminines.some(ending => word.endsWith(ending))) {
      // If it does, remove the ending and add "ой"
      return word.slice(0, -1) + "ой";
    }
    // Check if the word ends in any of the endings for neuter nouns
    else if (neuters.some(ending => word.endsWith(ending))) {
      // If it does, remove the ending and add "ым"
      return word.slice(0, -1) + "ым";
    } else {
      // If the word doesn't end in any of the above endings, it is not in the nominative case
      return "Error: word is not in nominative case";
    }
  }
}