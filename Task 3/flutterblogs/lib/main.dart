import 'package:flutter/material.dart';
import 'pages/login_signup.dart';
import 'pages/home.dart';
import 'pages/add_post.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Blog App',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: '/login',
      routes: {
        '/login': (context) => LoginSignup(),
        '/home': (context) => Home(),
        '/add-post': (context) => AddPost(),
      },
    );
  }
}
