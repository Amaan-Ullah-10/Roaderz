import express from "express";
import wrapasync from "../utils/wrapasync.js";
import passport from "passport";
import {savedRedirectUrl} from "../middlewares/logedin.js"
const router=express.Router();
import userController from "../controller/user.js"

router.route("/signup")
.get(userController.renderSignup)
.post(wrapasync(userController.signup));

router.route("/login")
.get(userController.renderLogin)
.post(savedRedirectUrl,passport.authenticate('local',{
    failureRedirect:"/users/login",
    failureFlash:true,
}),userController.login)


router.get("/logout",userController.logout)

export default router;