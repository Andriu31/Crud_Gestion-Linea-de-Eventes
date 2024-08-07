import {CategoriaModel} from '../Model/CategoriaModel.js';

export const getCategoria =async(req, res)=> {
        return categorias
};


export const saveCategoria = async(req, res)=> {
    const { categoria } = req.body;

    if(!categoria){
        res.redirect('/')
    }

    const cat = await CategoriaModel.create({
        categoria: categoria
    });

    res.redirect('/categoriaP')


}
