const express = require('express'); //importing express module
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app  = express(); // using it in application
const PORT = 3000;

const connection =() =>{
    mongoose.connect('mongodb+srv://deepti:deepti1310@blog.vb4ho.mongodb.net/BlogApp?retryWrites=true&w=majority'
    ,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log('connected')
}
connection();

app.set('view engine', 'ejs') ;
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));
// route
app.get('/', async(req,res)=> {// handler function
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles:articles});
}); 


app.use('/articles',articleRouter);
app.listen(PORT);// to render the application data/files on the server


