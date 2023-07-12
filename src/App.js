import './App.css';
import autocomplete from 'autocompleter';

let listDiagnosis = [];
var icdDiagnoses = []

async function autocompleteList(){
    var input = document.getElementById('lookupDiagnosis');

    let uri = `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${input.value}`
           
    const response = await fetch(uri);
    const jsonRes = await response.json();
    icdDiagnoses = Array.from(jsonRes[3]).map(function(i){
      return {icd10Code: i[0], codeDescription: i[1]}
    })

    let text = input.value;

    text = text.toLowerCase();
    // you can also use AJAX requests instead of preloaded data
    var suggestions = icdDiagnoses.filter(n => n.codeDescription.toLowerCase().includes(text))
    document.querySelector(".listItems").innerHTML = ""

    for (let i = 0; i<suggestions.length; i++){
      document.querySelector(".listItems").innerHTML += `<p>${suggestions[i].icd10Code} :  ${suggestions[i].codeDescription}</p>`;
  }

  document.querySelectorAll('p').forEach(button=>{
    if (button!=undefined){
      button.addEventListener("click", (event) => {
        listDiagnosis.push(button.innerHTML.split(" ")[0])
        document.querySelector(".selectedItems").children[2].innerHTML += `<li>${button.innerHTML}</li>`
      });
    }
  }
    )
}

function clearList(){
    document.querySelector("ul").innerHTML = ""
    listDiagnosis = [];
}

function copyList(){
    navigator.clipboard.writeText(listDiagnosis.join("\n"))
}

function App() {

  return (
    <html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet"/>
        <title>ICD 10 Lookup Tool</title>
        <link rel="stylesheet" href="styles.css"/>
    </head>
    <body>
        <h2>ICD10 Lookup Tool</h2>
        <h4>Created by Christine</h4>
        <div className="divs">
        <div className="searchItems">
        <label for="textlookup">Enter description:</label>
        <input type="text" name="textlookup" id="lookupDiagnosis" onChange={()=>{
          autocompleteList()
          }}/>
          <div className="listItems">
          </div>
        </div>
        <div class="selectedItems">
            <input type="button" name="copy" value="Copy Diagnoses" onClick={()=>copyList()}/>
            <input type="button" name="delete" value="Clear Diagnoses" onClick={()=>clearList()}/>
            <ul>
            </ul>
        </div>
        </div>
    </body>
</html>
  );
}

export default App;
