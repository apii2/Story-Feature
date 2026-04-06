# Story Feature App

A modern web application that recreates the Instagram Stories experience, allowing users to upload, edit, and view images in an auto-progressing story format. Built with React, TypeScript, and Vite.

## ✨ Features

- **📸 Image Upload & Editing**: Upload images via drag-and-drop or file picker with built-in image editing capabilities
- **🎨 Advanced Image Editor**: Powered by Pintura, featuring crop, rotate, flip, filters, and adjustment tools
- **🗜️ Smart Compression**: Automatic image compression to optimize storage and performance
- **🔄 Auto-Progression**: Stories automatically advance every 5 seconds with a visual progress bar
- **⏰ 24-Hour Expiry**: Images automatically expire after 24 hours, just like Instagram Stories
- **📱 Responsive Design**: Fully responsive layout with mobile-first approach
- **🌙 Dark Mode Support**: Built-in dark/light theme toggle
- **💾 Local Storage**: All images are stored locally in browser storage
- **🎛️ Navigation Controls**: Manual navigation between stories with arrow buttons

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: TailwindCSS 4 with PostCSS
- **Image Editing**: Pintura Editor
- **Image Compression**: browser-image-compression
- **Icons**: Lucide React
- **Carousel**: Swiper.js
- **Linting**: ESLint with React hooks and TypeScript support

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/apii2/Story-Feature.git
   cd story-feature
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

## 📜 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build the app for production (outputs to `dist/` folder)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ImageAddModal.tsx    # Modal for uploading and editing images
│   ├── ImageSwiper.tsx      # Carousel component for story navigation
│   └── themeSelector.tsx    # Dark/light mode toggle component
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css               # Global styles and Tailwind imports
```

## 🎯 How It Works

1. **Upload Images**: Click the "+" button to open the upload modal
2. **Drag & Drop**: Simply drag images onto the upload area
3. **Edit Images**: Use the built-in Pintura editor to crop, rotate, adjust colors, and apply filters
4. **View Stories**: Click on any uploaded image thumbnail to start viewing
5. **Auto-Progress**: Stories automatically advance every 5 seconds
6. **Manual Navigation**: Use left/right arrow buttons to navigate manually
7. **Auto-Expire**: Images automatically disappear after 24 hours

## ⚙️ Configuration

### Image Settings
- **Maximum file size**: 5MB per image
- **Supported formats**: JPG, PNG, GIF, WebP
- **Compression**: Automatically applied to reduce file size
- **Storage**: Browser localStorage (limited by browser quota)

### Story Settings
- **Auto-progress duration**: 5 seconds per image
- **Expiry time**: 24 hours from upload
- **Progress bar**: Visual indicator shows remaining time

## 🔧 Development

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Images are stored in browser localStorage, which has size limitations
- No user authentication or cloud storage integration
- Stories are only visible on the same device/browser where they were uploaded

## 🔮 Future Enhancements

- Cloud storage integration
- User authentication
- Story sharing capabilities
- Story analytics and insights
- Multiple story collections
- Video story support
