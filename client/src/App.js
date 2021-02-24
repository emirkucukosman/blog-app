import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import routes, { renderRoutes } from './routes'
import { SnackbarProvider } from 'notistack'

const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider dense maxSnack={3}>
        {renderRoutes(routes)}
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;