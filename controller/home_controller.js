module.exports.home = function(req,res)
{
    console.log(req.cookies);
    res.cookie('user_id',1010)
    return res.render('home',
    {
        title:'Codial | Home'
    })
}