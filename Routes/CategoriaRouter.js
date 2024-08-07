import { saveCategoria, getCategoria} from '../Controller/CategoriaController.js'
import { Router } from 'express';

const router = Router();

// router.get('/', getCategoria);
router.post('/createC', saveCategoria);
router.get('/traer', getCategoria);

router.get('/categoriaP',(rep, res)=>{
    res.render('categoria');
 })

export const routerCategoria = router;