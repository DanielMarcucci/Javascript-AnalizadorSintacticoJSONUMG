let listadoGramatica = [
  { Exp: 'BA;' },
  { A: '*BA|e'},
  { B: 'numC' },
  { C: '+numC|e' }
]

const regexGramatica = RegExp('[a-z]+|[A-Z]|[-+*/();]', 'g');
const regexMatematica = RegExp('[0-9]+|[-+*/();]', 'g');
let result;

window.addEventListener('load', () => {
  const ramas = construirRamas()
  const arbol = construirArbol(ramas)

  render(listadoGramatica)

  document.getElementById("txtArbol").innerHTML = JSON.stringify(arbol, undefined, 4)
  $('#modalGramatica').modal('show')
})

const construirRamas = () => {
  let ramas = {}
  listadoGramatica.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      const orValue = value.split('|')
      ramas[key] = []
      orValue.forEach((orValueItem, orValueIndex) => {
        ramas[key].push([])
        while ((result = regexGramatica.exec(orValueItem)) !== null) {
          ramas[key][orValueIndex].push(result[0])
        }
      })
    })
  })
  console.log(ramas);
  return ramas
}

const construirArbol = (params) => {
  const ramas = params
  let arbol = {}
  Object.entries(params).forEach(([key, values], index) => {
    arbol[key] = {}
    values.forEach((orValues, orValuesIndex) => {
      orValues.forEach(item => {
        if (orValuesIndex == 0) {
          arbol[key][item] = {}
        }
        if (item == key) {
          arbol[key][item][ramas[key][orValuesIndex+1]] = {}
        }
      })
    })
  })
  console.log(arbol)
  return arbol
}

const addToken = () => {
    data = {
      Id: document.getElementById("numId").value,
      Name: document.getElementById("txtToken").value,
      Operadores: (document.getElementsByName("rdOperadores")[0].checked) ? "Sí" : "No"
    };

    tokens.push(data);
    render();

    return;
}

const render = (list) => {
  $tbody = document.getElementById("tbodyTokens")
  $badge = document.getElementById("spanMaximo")

  $tbody.innerHTML = ''
  $badge.innerHTML = list.length

  list.forEach((element, index) => {
    const tr = (`
      <tr>
        <td>${index+1}</td>
        <td>${Object.keys(element)} <span>&#8594;</span> ${Object.values(element)}</td>
      </tr>
    `)

    $tbody.innerHTML += tr
  });

  return;
}

const handleAdd = () => {
  document.getElementById('numId').focus();
  document.getElementsByName('rdOperadores')[1].checked = true;
}