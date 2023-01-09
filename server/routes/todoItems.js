const router = require('express').Router();
//import todo model 
const todoItemsModel = require('../models/todoItems');


//create first route --add Todo Item to database
router.post('/api/item', async (req, res)=>{
  try{
    const newItem = new todoItemsModel({
      item: req.body.item
    })
    //guardar este elemento en la base de datos
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})

//  VAMOS a crear una segunda ruta: obtener datos de la base de datos

router.get('/api/items', async (req,res)=>{
  try{
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
    }
    catch(err){
      req.json(err); 
    }
})

//update item
router.put('/api/item/:id', async (req, res)=>{
  try{
    //encuentra el artículo por su id y actualízalo
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json(updateItem);
  }catch(err){
    res.json(err);
  }
})


//Delete item from database
router.delete('/api/item/:id', async (req, res)=>{
  try{
    //encuentre el elemento por su id y elimínelo
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  }catch(err){
    res.json(err);
  }
})


//export router
module.exports = router;