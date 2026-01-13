# Portfolio Website Guide

Congratulations on your new portfolio website! Here is a guide on how to customize it and put it online.

## 1. How to Replace Images
Currently, the website uses placeholder images (gray boxes). You need to replace them with your own photos.

1.  **Prepare your images:**
    -   Rename your photos to match the code (e.g., `profile.jpg`, `project1.jpg`) OR just know their names.
    -   Place all your images in the same folder as `index.html`.

2.  **Edit `index.html`:**
    -   Open `index.html` in your code editor.
    -   Search for `src="https://placehold.co/..."`.
    -   Replace the URL with your filename.
    -   **Example:**
        -   *Before:* `<img src="https://placehold.co/150x150..." alt="Me">`
        -   *After:* `<img src="my-photo.jpg" alt="Me">`

## 2. How to Edit Text
-   **SOP:** Search for "STATEMENT OF PURPOSE" in `index.html` and replace the placeholder text with your actual SOP.
-   **Projects/Activities:** Search for "Project Name 01" or "Activity Name 01" and fill in your real details.

## 3. How to Deploy to GitHub Pages (Free Hosting)
To show your website to the world, follow these steps:

1.  **Create a GitHub Repository:**
    -   Go to [github.com](https://github.com) and sign in.
    -   Click **New Repository**.
    -   Name it `portfolio` (or anything you like).
    -   Make sure it is **Public**.
    -   Click **Create repository**.

2.  **Upload Your Files:**
    -   In your new repository, click **uploading an existing file**.
    -   Drag and drop `index.html`, `style.css`, `script.js`, and all your image files.
    -   Click **Commit changes**.

3.  **Activate GitHub Pages:**
    -   Go to the repository **Settings** tab.
    -   Scroll down (or look in the sidebar) for **Pages**.
    -   Under **Build and deployment** > **Branch**, select `main` (or `master`) and click **Save**.
    -   Wait a minute, and GitHub will give you a link (e.g., `https://yourname.github.io/portfolio/`).

**Enjoy your new website!**
