const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/messageboard_db', {useNewUrlParser: true});
// mongoose.set('useFindandModify', false);
const CommentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 25},
    comment: {type: String, required: true, minlength: 7}
}, {timestamps: true})
const MessageSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 25},
    message: {type: String, required: true, minlength: 7},
    comment: [CommentSchema]
}, {timestamps: true})
const Message = mongoose.model('Message', MessageSchema);
const Comment = mongoose.model('Comment', CommentSchema);
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    Message.find()
        .then(messages => {
            res.render("index", {messages});
            // Comment.find()
            // .then(comments => {
            //     res.render("index", {comments});
            // })
            // .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    
})

app.post('/messages', (req, res) => {
    const message = new Message();
    message.name = req.body.name;
    message.message = req.body.message;
    message.save()
        .then(newMessageData => console.log("message created: ", newMessageData))
        .catch(err => console.log(err))
    res.redirect("/");
})

app.post('/comments/:id', (req, res) => {
    // const comment = Comment.create(req.body, function(err, comment){
    //     if(err){
    //         console.log("*******error*******")
    //     }
    //     else {
    //         comment.save()
    //         // console.log(comment)
    //         const message = Message.findOne({_id: req.params.id})
    //         .then(message => {
    //                 message.comment.push({comment: comment})
    //                 console.log("Message: ", message)
    //                 return message.save();
    //             })
    //             .then(saveResult => res.json(saveResult))
    //             .catch(err => res.json(err))
    //             console.log("Message2: ", message)
    //             console.log("Comment: ", comment)
    //             res.redirect("/")
    //     }
    // })
    newComment = req.body;
    Comment.create(newComment)
        .then(comment => {
            Message.update({_id: req.params.id}, {$push: {comment: comment}})
            .then(res.redirect("/"))
            .catch(err => {res.json(err)})
        })
        .catch(err => {res.json(err)})

})









app.listen(8000, () => console.log("listening on port 8000"));