package com.example.authbackend

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class MainActivity : AppCompatActivity() {

    private  val baseUrl = "http://10.0.2.2:3000"
    private lateinit var retrofitInstance : Auth_Interface
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val retrofit = Retrofit.Builder().baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        retrofitInstance = retrofit.create(Auth_Interface::class.java)

        findViewById<View>(R.id.login).setOnClickListener(object : View.OnClickListener {
            override fun onClick(view: View?) {
                handleLoginDialog()
            }
        })

        findViewById<View>(R.id.signup).setOnClickListener(object : View.OnClickListener {
            override fun onClick(view: View?) {
                handleSignupDialog()
            }
        })
    }

    fun handleLoginDialog() {
//        val logINIntent = Intent(this, LoginResult::class.java)
//        startActivity(logINIntent)


        val view: View = layoutInflater.inflate(R.layout.login_dialog, null)

        val builder: AlertDialog.Builder = AlertDialog.Builder(this)

        builder.setView(view).show()

        val loginBtn: Button = view.findViewById(R.id.login)
        val emailEdit = view.findViewById<EditText>(R.id.emailEdit)
        val passwordEdit = view.findViewById<EditText>(R.id.passwordEdit)

        loginBtn.setOnClickListener(View.OnClickListener {
            val map: HashMap<String, String> = HashMap()
            map["email"] = emailEdit.text.toString()
            map["password"] = passwordEdit.text.toString()
            val call: Call<LoginResult?>? = retrofitInstance.executeLogin(map)
            if (call != null) {
                call.enqueue(object : Callback<LoginResult?> {
                    override fun onResponse(call: Call<LoginResult?>?, response: Response<LoginResult?>) {
                        if (response.code() === 200) {
                            val result: LoginResult? = response.body()
                            val builder1: AlertDialog.Builder =
                                AlertDialog.Builder(this@MainActivity)
                            if (result != null) {
                                builder1.setTitle(result.getName())
                            }
                            if (result != null) {
                                builder1.setMessage(result.getEmail())
                            }
                            builder1.show()
                        } else if (response.code() === 404) {
                            Toast.makeText(
                                this@MainActivity, "Wrong Credentials",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                    }

                    override fun onFailure(call: Call<LoginResult?>?, t: Throwable) {
                        Toast.makeText(
                            this@MainActivity, t.message,
                            Toast.LENGTH_LONG
                        ).show()
                    }
                })
            }
        })
    }

    fun handleSignupDialog() {
//        val signUPIntent = Intent(this, LoginResult::class.java)
//        startActivity(signUPIntent)

        val view: View = layoutInflater.inflate(R.layout.signup_dialog, null)

        val builder = AlertDialog.Builder(this)
        builder.setView(view).show()

        val signupBtn = view.findViewById<Button>(R.id.signup)
        val nameEdit = view.findViewById<EditText>(R.id.nameEdit)
        val emailEdit = view.findViewById<EditText>(R.id.emailEdit)
        val passwordEdit = view.findViewById<EditText>(R.id.passwordEdit)

        signupBtn.setOnClickListener {
            val map: HashMap<String, String> = HashMap()
            map["name"] = nameEdit.text.toString()
            map["email"] = emailEdit.text.toString()
            map["password"] = passwordEdit.text.toString()
            val call: Call<Void?>? = retrofitInstance.executeSignup(map)
            if (call != null) {
                call.enqueue(object : Callback<Void?> {
                    override fun onResponse(
                        call: Call<Void?>,
                        response: Response<Void?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                this@MainActivity,
                                "Signed up successfully", Toast.LENGTH_LONG
                            ).show()
                        } else if (response.code() == 400) {
                            Toast.makeText(
                                this@MainActivity,
                                "Already registered", Toast.LENGTH_LONG
                            ).show()
                        }
                    }

                    override fun onFailure(call: Call<Void?>, t: Throwable) {
                        Toast.makeText(
                            this@MainActivity, t.message,
                            Toast.LENGTH_LONG
                        ).show()
                    }
                })
            }
        }


    }

}