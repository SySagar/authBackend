package com.example.authbackend

import com.google.gson.annotations.SerializedName

class LoginResult {

    @SerializedName("name")
    private val name : String = ""

    @SerializedName("email")
    private val email : String = ""

    fun getName(): String {
        return name
    }

    fun getEmail(): String {
        return email
    }

}