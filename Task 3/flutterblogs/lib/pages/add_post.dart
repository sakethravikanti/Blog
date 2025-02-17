import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class AddPost extends StatefulWidget {
  @override
  _AddPostState createState() => _AddPostState();
}

class _AddPostState extends State<AddPost> {
  TextEditingController titleController = TextEditingController();
  TextEditingController contentController = TextEditingController();
  TextEditingController authorController = TextEditingController();
  bool isEditing = false;
  int? postId;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Check if post data is passed as arguments
    final Map<String, dynamic>? post =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
    if (post != null) {
      isEditing = true;
      postId = post['id'];
      titleController.text = post['title'];
      contentController.text = post['content'];
      authorController.text = post['author'];
    }
  }

  Future<void> handleSubmit() async {
    final post = {
      'title': titleController.text,
      'content': contentController.text,
      'author': authorController.text,
    };

    final response = isEditing
        ? await http.put(
            Uri.parse('http://127.0.0.1:8000/blog/api/posts/$postId/update'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode(post),
          )
        : await http.post(
            Uri.parse('http://127.0.0.1:8000/blog/api/posts/add'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode(post),
          );

    if (response.statusCode == (isEditing ? 200 : 201)) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(isEditing
            ? 'Post updated successfully!'
            : 'Post added successfully!'),
      ));
      Navigator.pop(context);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Failed to ${isEditing ? 'update' : 'add'} post.'),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(isEditing ? 'Edit Post' : 'Add Post'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: titleController,
              decoration: InputDecoration(labelText: 'Title'),
            ),
            TextField(
              controller: contentController,
              decoration: InputDecoration(labelText: 'Content'),
            ),
            TextField(
              controller: authorController,
              decoration: InputDecoration(labelText: 'Author'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: handleSubmit,
              child: Text(isEditing ? 'Update Post' : 'Submit Post'),
            ),
          ],
        ),
      ),
    );
  }
}
