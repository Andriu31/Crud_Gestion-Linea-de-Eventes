import { EventoModel } from '../Model/EventoModel.js';

export const saveEvento = async(req, res)=> {
    let message;
    const {evento, hora, categoria_id} = req.body;

    if(!evento || !hora || !categoria_id){
        res.redirect('/')
    }

    const evt = await EventoModel.create({
        evento: evento,
        hora: hora,
        categoria_id: categoria_id
    })

    res.redirect('/EventoP')

}

 export const getEvento = async(req, res)=>{
    const {filtro} = req.body;
    if(!filtro){
        const eventos = await EventoModel.findAll({
            attributes: {exclude:['status']},
            where: { status: false },
            include: {
                model: CategoriaModel,
                attributes: ['categoria']
            }

        });
    
        res.render('index', {resultados : eventos});
    }

    const encontrado = await EventoModel.findAll({
        attributes: {exclude:['status']},
        where: {status: false},
        include: {
            model: CategoriaModel,
            attributes: ['categoria'],
            where: {categoria: filtro}
        }
    });

    res.render('index', {resultados : encontrado});

        
}

export const updateEvent = async(req, res)=> {
    const id = req.params.id;
    const {evento, hora, categoria_id} = req.body;

    if(!evento || !hora || !categoria_id){
        res.redirect('/')
    }

    const retornado = await EventoModel.findByPk(id);

    if(retornado){
        retornado.set({
            evento: evento,
            hora: hora,
            categoria_id: categoria_id
        });

        retornado.save(); 

        res.redirect('/')
    }
}

export const deletEvent = async(req, res)=> {
    const id = req.params.id;

    const retornado = await EventoModel.findByPk(id);

    if(retornado){
        retornado.set({
            'status': true
        });

        retornado.save(); 
        res.redirect('/')
    }
}

