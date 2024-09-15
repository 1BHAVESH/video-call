import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import {Meeting} from "../models/meeting.model.js"
import bcrypt, {hash} from "bcrypt";
import { json } from "express";
import crypto from "crypto";

const login = async(req, res) =>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({message: "please provide username and password"})
    }

    try{

        const user  = await User.findOne({username});

        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message: "user not found"});
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(isPasswordCorrect){
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token: token});
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid username and password"});
        }
       

    }catch(err){

        return res.status(500).json({message: "something went wrong"});

    }
}

const register = async(req, res) =>{
    const {name, username, password} = req.body;


    try{

        const existingUser = await User.findOne({username});

        if(existingUser) {
            return res.status(httpStatus.FOUND).json({message: "User already exist"})
        }

        const hashdPassword = await bcrypt.hash(password,  10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashdPassword,
        })

        await newUser.save();

        res.status(httpStatus.CREATED).json({message: "user registerd"});

    }catch(err){

        res.json({message: "something went wrong"});

    }
}

const getUserHistory = async(req, res) => {
    const {token} = req.query;

    try{
        const user = await User.findOne({token: token});
        const meetings = await Meeting.find({user_id: user.username});
        res.json(meetings)

    }catch(err){

        res.json({message: `something went wrong ${err}`})

    }
}

const addHistory = async(req, res) => {
    const {token, meeting_code} = req.body;

    try{

        const user = await User.findOne({token: token});

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({message: "Added Code To History"});

    }catch(err){
        res.json({message: `something went wrong ${err}`})
    }
}

export {register, login, getUserHistory, addHistory}