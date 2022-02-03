# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Componente Skeleton

Para usar el componente Skeleton personalizado seguir estos pasos.

Importar el componente Skeleton, está ubicado en carpeta /features/skeleton/Skeleton.

    import Skeleton from './features/skeleton/Skeleton'

El componente recibe el parametro 'mode' para responder varios tipos de estructuras.
Adicional en el caso de usar el modo 'groupCards', se puede enviar por props la cantidad de tarjetas que se quiere renderizar, en el parametro 'quantity'. Ej:

    <Skeleton mode='groupCards' quantity='5'>
    ó
    <Skeleton mode='groupCards' quantity={5}>

Listado de modos del componente:

    -singleCard : Renderiza una sola tarjeta en carga
    -groupCards : Renderiza un grupo de tarjetas en carga
    -list : Renderiza una lista o tabla en carga
    -form: Renderiza un formulario en carga

El objetivo es renderizar este componente según la necesidad mientras hay una espera o carga por una respuesta de peticiones.


