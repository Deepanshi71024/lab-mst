import React, { useState } from "react";
import "./App.css";

function App() {
  // Login states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Post states
  const [post, setPost] = useState("");
  const [createdPost, setCreatedPost] = useState("");

  // User accounts
  const accounts = {
    admin: {
      password: "admin123",
      role: "Admin"
    },
    viewer: {
      password: "viewer123",
      role: "Viewer"
    }
  };

  // Login function
  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter username and password");
      return;
    }

    const account = accounts[username];

    if (!account || account.password !== password) {
      alert("Invalid username or password");
      return;
    }

    setUser({
      username: username,
      role: account.role
    });

    setUsername("");
    setPassword("");
  };

  // Create post
  const handleCreatePost = () => {
    if (post.trim() === "") {
      alert("Please write something first");
      return;
    }

    setCreatedPost(post);
    setPost("");
  };

  // Delete post
  const handleDeletePost = () => {
    setCreatedPost("");
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setPost("");
  };

  return (
    <div className="container">

      {/* LOGIN FORM */}
      {!user ? (
        <div className="login-box">

          <h2>Login Form</h2>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>
            Login
          </button>

        </div>
      ) : (

        /* AFTER LOGIN */
        <div className="welcome-box">

          <h2>
            Welcome, {user.username} ({user.role})
          </h2>

          {/* POSTS SECTION */}
          <div className="post-section">

            <h3>Posts</h3>

            {createdPost ? (
              <div className="post">

                <p>{createdPost}</p>

                {/* ONLY ADMIN CAN DELETE */}
                {user.role === "Admin" && (
                  <button onClick={handleDeletePost}>
                    Delete Post
                  </button>
                )}

              </div>
            ) : (
              <p>No posts available.</p>
            )}

          </div>

          {/* ADMIN SECTION */}
          {user.role === "Admin" ? (
            <div className="admin-section">

              <h3>Create a Post</h3>

              <textarea
                placeholder="Write your post..."
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />

              <br />

              <button onClick={handleCreatePost}>
                Create Post
              </button>

            </div>
          ) : (

            /* VIEWER SECTION */
            <p>Read-only access</p>

          )}

          <br />

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default App;