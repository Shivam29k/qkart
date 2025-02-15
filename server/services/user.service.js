const { User } = require("../models/")
const bcrypt = require("bcrypt")
const ApiError = require("../utils/ApiError")
const httpStatus = require("http-status")



const createUser = async (userBody)=>{
    if(await User.isEmailTaken(userBody.email)){
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")
    }
    // const hashedPassword = await bcrypt.hash(userBody.password,10)
    const user = await User.create({...userBody})
    return user
}

const getUserByEmail=async (email)=>{
    return User.findOne({email})
}

const getUserById = async (id)=>{
    return User.findById(id)
}

const setAddress = async (user,newAddress)=>{
    user.address = newAddress
    await user.save()
    return user.address
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    setAddress
}