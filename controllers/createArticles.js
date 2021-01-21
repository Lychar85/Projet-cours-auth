module.exports = (req, res) =>{
        if(req.session.userId){

        return res.render('article/add')

        }else {
             return res.redirect('/user/connect')
        }


}