import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class LoginSignup extends StatefulWidget {
  @override
  _LoginSignupState createState() => _LoginSignupState();
}

class _LoginSignupState extends State<LoginSignup> {
  bool isLogin = true;
  TextEditingController usernameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  String error = '';

  Future<void> handleSubmit() async {
    final url = isLogin
        ? 'http://127.0.0.1:8000/api/login/'
        : 'http://127.0.0.1:8000/api/signup/';
    final response = await http.post(Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': usernameController.text,
          'password': passwordController.text
        }));

    if (response.statusCode == 200) {
      if (isLogin) {
        Navigator.pushReplacementNamed(context, '/home');
      } else {
        setState(() {
          error = '';
        });
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Account created! Please login.'),
        ));
        setState(() {
          isLogin = true;
        });
      }
    } else {
      setState(() {
        error = jsonDecode(response.body)['detail'] ?? 'Invalid credentials';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(isLogin ? 'Login' : 'Sign Up')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: usernameController,
              decoration: InputDecoration(labelText: 'Username'),
            ),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(labelText: 'Password'),
            ),
            ElevatedButton(
              onPressed: handleSubmit,
              child: Text(isLogin ? 'Login' : 'Sign Up'),
            ),
            if (error.isNotEmpty) Text(error, style: TextStyle(color: Colors.red)),
            TextButton(
              onPressed: () {
                setState(() {
                  isLogin = !isLogin;
                });
              },
              child: Text(isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'),
            ),
          ],
        ),
      ),
    );
  }
}
