import  express  from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { sequelize } from './DB/conexion.js';
import { routerCategoria } from './Routes/CategoriaRouter.js';
import { routerEvent } from './Routes/EventoRouter.js';
import { PORT } from './config/config.js';

import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.resolve();
const port = PORT



app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('port',process.env.PORT||3000)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Routes
app.use('/', routerEvent);
app.use('/', routerCategoria);

const conexion = async()=> {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
          console.log(`Servidor corriendo en el puerto http://localhost:${port}`)
        })
    } catch (error) {
        console.error(`Error ${error}`);
    }
}

conexion()