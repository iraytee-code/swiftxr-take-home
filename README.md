# SwiftXR 3D Model Editor

A lightweight, user-friendly 3D model editor that allows users to import GLB files, view them in 3D space, and add interactive hotspots with custom labels and descriptions.

## Features

- **3D Model Import**: Drag & drop or browse to upload GLB files
- **Interactive Viewing**: Rotate, pan, and zoom around 3D models
- **Hotspot Creation**: Add interactive labels directly on the model
- **Hotspot Management**: Edit labels, descriptions, and positions


## Technologies Used

- **React**: Frontend framework
- **Three.js**: 3D rendering engine
- **React Three Fiber**: React renderer for Three.js
- **Drei**: Helper components for React Three Fiber
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library

## Getting Started

### Prerequisites

- Node.js
- npm 

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/iraytee-code/swiftxr-take-home.git
   cd swiftxr-3d-editor
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser to `http://localhost:3000`

## Usage Guide

### Importing a 3D Model

1. Drag and drop a GLB file onto the upload area, or click "Browse Files" to select from your device
2. The model will automatically load and center in the viewport

### Navigating the 3D Space

- **Rotate**: Click and drag with the mouse
- **Zoom**: Scroll up/down or pinch on touchscreens
- **Pan**: Right-click and drag (or two-finger drag on touchscreens)

### Working with Hotspots

1. Click "Add Hotspot" button
2. Fill in title and description
3. Click "Place on Model" 
4. Click anywhere on the model to place the hotspot
5. Select existing hotspots to edit their details
6. Use the edit panel to modify title, description, or delete the hotspot

### Saving Your Work

- Click the "Save" button to persist your work (stored in browser storage)
- The "Reset" button clears all hotspots and removes the model

## Project Structure

```
/components
  /file-upload     # Model import components
  /hot-spot        # Hotspot creation and management
  /model-viewer    # 3D viewer implementation
  /ui              # UI components from shadcn/ui
/hooks
  model-context.ts # State management for models and hotspots
/types             # TypeScript type definitions
/utils             # Helper utilities
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Three.js](https://threejs.org/) for the 3D rendering capabilities
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for the React integration
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components