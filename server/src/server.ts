import { Application } from 'express'
import configureApp from './app'

const PORT = process.env.PORT || 9090;

(async () => {
    configureApp()
        .then((app: Application) => {
            app.listen(PORT, () => {
                console.log(`App is running at http://localhost:${PORT}`);
                console.log('CTRL+C to stop');                
            })
        })
        .catch((error) => {
            console.error(`Error while configuring app: ${error}`);            
        })
})();