import {saveEvento, getEvento, updateEvent, deletEvent } from '../Controller/EventoController.js'
import { Router } from 'express';
import {CategoriaModel} from '../Model/CategoriaModel.js';
import {EventoModel} from '../Model/EventoModel.js'

const router = Router();

router.post('/create', saveEvento);
router.get('/obtener', getEvento);
router.post('/update/:id', updateEvent);
router.get('/delete/:id', deletEvent);

router.get('/EventoP',async(rep, res)=>{
    const categorias = await CategoriaModel.findAll();
    res.render('evento', {categorias: categorias});
 })

 router.get('/EventoUpdate/:id',async(rep, res)=>{
    const id = rep.params.id
    const categorias = await CategoriaModel.findAll();
    res.render('updateE', {categorias: categorias, id: id});
 })

router.get('/',async(req, res)=>{
   const buscar = req.query.buscar;

   if(buscar){
    const evento = await EventoModel.findAll({
        where:{'status':false},
        include: {
            model: CategoriaModel,
            as: 'categoria',
            where: {'categoria': buscar},
            attributes: ['categoria']
        }
    })
    res.render('index', {evento:evento});
   }else{
    const evento = await EventoModel.findAll({
        where:{'status':false},
        include: {
            model: CategoriaModel,
            as: 'categoria',
            attributes: ['categoria']
        }
    })
    res.render('index', {evento:evento});
   }


 })

export const routerEvent = router;