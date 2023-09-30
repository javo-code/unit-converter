### CONVERSOR DE MONEDAS:

Este conversor de monedas utiliza una API externa para obtener las tasas de cambio y realizar la conversión. Cuando se seleccionan las monedas de origen y destino, y se ingresa una cantidad, al hacer clic en el botón "Convertir", se llama a la API, se obtiene el resultado de la conversión y se muestra en la interfaz de usuario.

1. Se importan los módulos necesarios: React, useEffect, useState, y el archivo de hoja de estilos converter.css.

2. Se define el componente Converter como una función. Este componente es un componente funcional, lo que significa que se utiliza la sintaxis de función en lugar de una clase para definir el componente.

3. Se definen varios estados utilizando el hook useState. Los estados son variables que pueden almacenar datos y serán reactivos, lo que significa que cuando cambian, el componente se renderizará nuevamente. Los estados definidos son:

monedas: Un array para almacenar las monedas obtenidas de la API.
moneda1 y moneda2: Cadenas para almacenar las monedas seleccionadas en los selectores.
monto: Una cadena para almacenar la cifra ingresada en el input.
result: Una cadena para almacenar el resultado de la conversión.

4. Se utilizan dos efectos (useEffect) para realizar acciones adicionales en el componente:

El primer efecto se ejecuta cuando moneda1 cambia. Realiza una llamada a la API para obtener las monedas disponibles y las almacena en el estado monedas.

El segundo efecto se ejecuta cuando moneda1 o moneda2 cambian. Resetea los valores de monto y result a una cadena vacía.

5. Se define la función handleConvert, que se ejecuta cuando se hace clic en el botón "Convertir". Esta función realiza una llamada a la API utilizando la moneda de origen (moneda1), la moneda de destino (moneda2) y la cantidad a convertir (monto). Luego, procesa la respuesta de la API y actualiza el estado result con el resultado de la conversión.

6. En la URL de la llamada fetch, se utilizó https://${host}/latest?amount=${monto}&from=${moneda1}&to=${moneda2} para obtener los datos de conversión entre moneda1 y moneda2 con la cantidad monto.

En el primer then, se verificó si la llamada fue exitosa usando resp.ok. Si no es exitosa, se lanza un error con el mensaje "Error: No se pudo obtener los datos.".

En el segundo then, se verifica si existen los datos necesarios (data, data.rates, y data.rates[moneda2]) para mostrar el resultado de la conversión. Si alguno de estos datos falta, se lanza un error con el mismo mensaje "Error: No se pudo obtener los datos.".

En el bloque .catch, capturamos cualquier error que pueda ocurrir durante la llamada fetch o el procesamiento de la respuesta y establecemos el mensaje de error en el estado result.

### La interfaz contiene:

Un título <h1> con el texto "Money Converter".
Dos selectores <select> para seleccionar las monedas de origen y destino. Los options se generan a partir de las monedas disponibles en el estado monedas.
Un input <input> para ingresar la cantidad a convertir, cuyo valor está enlazado con el estado monto.
Un párrafo <p> que muestra el resultado de la conversión con la moneda de destino (moneda2) y el valor almacenado en el estado result.
Un botón <button> con el texto "Convertir", que al hacer clic ejecuta la función handleConvert.
