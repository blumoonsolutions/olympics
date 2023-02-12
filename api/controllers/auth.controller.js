const { sendEmail } = require('../../utils/mailer')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

exports.login = async (req,res) => {
    console.log(req.body)
    const { email, password } = req.body
    let search = await User.find({email})
    if(search.length == 0){
        // INVALID CREDENTIALS
        res.render('pages/error',{message:"invalid credentials"})
    }
    else{
        let user = search[0]
        if(user.password == password){
            // AUTH SUCCESS
            req.session.user = {user:user.email,role:user.role}
            req.session.save()
            res.redirect('../dashboard')
        }
        else{
            // INVALID CREDENTIALS
            res.render('pages/error',{message:"invalid credentials"})
        }
    }
}

exports.register = async (req,res) => {
    const { email, password, repeat } = req.body
    let search = await User.find({email})
    if(search.length !== 0){
        // USER ALREADY REGISTERED
        res.render('pages/error',{message:"user already registered"})
    }
    else{
        if(password == repeat){
            let user = await User.create({email,password})
            req.session.user = {user:user.email,role:user.role}
            req.session.save()
            res.redirect('../login')
        }
        else{
            res.render('error',{message:"passwords do not match"})
        }
    }
}

exports.reset = async (req,res) => {
    const email = req.body.email
    const token = jwt.sign(email,"secret")
    sendEmail(email,token)
    res.render('pages/recovery-step',{email})
}

exports.updatePassword = async (req,res) => {
    console.log(req.session)
    const email = jwt.verify(req.session.token,"secret")
    console.log(email)
    
    if(req.body.repeat == req.body.password){
        await User.findOneAndUpdate({email:email},{$set:req.body},{new: true})
        res.redirect('../login')
    }
    else{
        res.redirect('../home')
    }
}

exports.logout = async (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } else {
      res.end()
    }
  }